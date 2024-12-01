var express = require('express');
var router = express.Router();
var db = require('../database');
var bcrypt = require('bcrypt');
var hal = require('../hal');
var jwt = require('../jwt');
// var session = require('express-session');


/**
* @param {} suspect
* @param {*} message
* @returnsbcrypt
*/

function identify(suspect, message) {
    const some_guy = db.personnages.find((some_guy) => {
        return some_guy.name.toLowerCase() === suspect.toLowerCase();
    });

    const key = db.codes.find((code) => {
        const key = bcrypt.compareSync(message, code.key);
        console.log(key);
        console.log(code.key);
        return key;
    });

    if (some_guy === undefined) return false;
    if (key === undefined) return false;

    return true;
}


function findSuspectByName(name){
    return db.personnages.find(suspect=>suspect.name.toLowerCase() === name.toLowerCase());
}
function findCodeByKey(key){
    return  db.codes.find((code) => {
        return bcrypt.compareSync(key, encodeURI(code.key));
    });
}

/**
* @param {} name
* @param {} key
* @returns
*/

function isGuilty(name){
    const suspect = findSuspectByName(name);
    return suspect && suspect.isGuilty;
}
function isRepair(key){
    const code = findCodeByKey(key);
    return code && code.isWorking;
}

router.get('/accuse', function(req, res, next){
    res.status(200).send(`Trouvez le coupable et son message pour obtenir le code de réparation du GPS`);
})

router.post('/accuse', function(req, res, next){
    var message = req.body.message;
    const suspect = req.body.suspect;

    if (!message || !suspect){
        res.status(400).json({erreur : "message ou suspect introuvable(s).", indice : "/accusation"});
        return
    }
    
    if(identify(suspect, message)){
        // req.session.failedAttempts = req.session.failedAttempts || 0;
        // if (req.session.failedAttempts > 5) {
        //     return res.status(403).send('Trop de tentatives échouées, veuillez réessayer plus tard.');
        // }

        if(!isGuilty(suspect)){
            req.session.failedAttempts += 1;
            res.status(401).send(`Erreur : ${suspect} n'est pas le coupable !`)
        }
        if(!isRepair(message)){
            req.session.failedAttempts += 1;
            res.status(401).send(`Erreur : ${message} n'est pas le message de réparation !`)
        }

        const accessToken = jwt.createJWT(message, true, '1 day');

        let responseObject = {
            "_links": [{
                "self": hal.halLinkObject('/accuse'),
                "navigation": hal.halLinkObject(`/gps`)
            }],
            message: `Bravo ! Le coupable était bien le ${suspect.charAt(0).toUpperCase() + suspect.slice(1)}! Heureusement que vous avez trouvé son message '${message}', vous avez maintenant le code pour réparer le système de navigation du traineau !`,
            code: accessToken,
        }
        res.status(200).format({
            'application/hal+json': function(){
                res.send(responseObject);
            }
        })
        // req.session.failedAttempts = 0;
    }
    else{
        res.status(403).json({erreur:'Mauvais message ou suspect.', indice:'message_suspect', reponse:{
            message : "/clues/reponse_message",
            suspect : "/clues/reponse_suspect"
        }})
    }
});

module.exports = router;
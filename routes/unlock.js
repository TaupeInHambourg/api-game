var express = require('express');
var router = express.Router();
var db = require('../database');
var bcrypt = require('bcrypt');
var hal = require('../hal');
var jwt = require('../jwt');


/**
* @param {} suspect
* @param {*} message
* @returnsbcrypt
*/

function identify(suspect, message) {
    const some_guy = db.suspects.find((some_guy) => {
        return some_guy.name === suspect;
    });
    const key = db.codes.find((code) => {
        return bcrypt.compareSync(message, code.key);
    });
    if (some_guy === undefined) return false;

    if (key === undefined) return false;

    return true;
}

function findSuspectByName(name){
    return db.suspects.find(suspect=>suspect.name === name);
}
function findCodeByKey(key){
    return  db.codes.find((code) => {
        return bcrypt.compareSync(key, code.key);
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
    console.log('isRepair ',key);
    const code = findCodeByKey(key);
    console.log('findCodeByKey is find ',code);
    return code && code.isWorking;
}

router.get('/unlock', function(req, res, next){
    res.status(200).send(`Trouvez le coupable et le message caché pour obtenir le code de réparation du GPS`);
})

router.post('/unlock', function(req, res, next){
    const code = req.body.message;
    const suspect = req.body.suspect;

    if (!code || !suspect){
        res.status(400).send("Code de réparation ou suspect introuvable(s).");
        return
    }
    if(identify(suspect, code)){
        if(!isGuilty(suspect)){
            res.status(401).send(`Erreur : ${suspect} n'est pas le coupable !`)
        }
        if(!isRepair(code)){
            res.status(401).send(`Erreur : ${code} n'est pas le code de réparation !`)
        }

        const accessToken = jwt.createJWT(code, true, '1 day');

        let responseObject = {
            "_links": [{
                "self": hal.halLinkObject('/unlock'),
                "navigation": hal.halLinkObject(`/gps`, 'string', '', true)
            }],
            jwt: accessToken,
            message: `Bravo ! Le coupable était bien ${suspect}! Heureusement que vous avez trouvé le code caché '${code}', vous pouvez maintenant réparer le système de navigation du traineau !`,
        }
        res.status(200).format({
            'application/hal+json': function(){
                res.send(responseObject);
            }
        })
    }
    else{
        res.status(403).send('Mauvais code de réparation ou suspect.')
    }
});

module.exports = router;
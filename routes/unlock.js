var express = require('express');
var router = express.Router();
var db = require('../database');
var bcrypt = require('bcrypt');
var hal = require('../hal');
var jwt = require('../jwt');


/**
* @param {} culprit
* @param {*} message
* @returnsbcrypt
*/

function identify(culprit, message) {
    const user = db.suspects.find((suspect) => {
        return suspect.name === culprit;
    });

    const key = db.codes.find((code) => {
        return code.key === message;
    });

    if (user === undefined) return false;

    if (key === undefined) return false;

    return true;
}

function findSuspectByName(name){
    return db.suspects.find(suspect=>suspect.name === name);
}
function findCodeByKey(key){
    return db.codes.find(code=>code.key === key);
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

router.get('/unlock', function(req, res, next){
    res.status(200).send(`Trouvez le coupable et le message caché pour obtenir le code de réparation du GPS`);
})

router.post('/unlock', function(req, res, next){
    const code = req.body.message;
    const suspect = req.body.culprit;

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
            message: `Bravo ! Le coupable était bien ${suspect} !
            Heureusement que vous avez trouvé le code caché '${code}', vous pouvez maintenant réparer le système de navigation du traineau !`,
        }
        res.status(200).format({
            'application/hal+json': function(){
                res.send(responseObject);
            }
        })
    }
});

module.exports = router;
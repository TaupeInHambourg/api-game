var express = require('express');
var router = express.Router();
var db = require('../database');
var bcrypt = require('bcrypt');
var hal = require('../hal');
var jwt = require('../jwt');


/**
* @param {} login
* @param {*} password
* @returnsbcrypt
*/

function authenticate(login, password) {
    const user = db.users.find((user) => {
        return user.pseudo === login && bcrypt.compareSync(password, user.password);
    });

    if (user === undefined) return false;

    return true;
}

function findUserByPseudo(pseudo){
    return db.users.find(user=>user.pseudo === pseudo);
}

/**
* @param {} pseudo
* @returns
*/

function isAdmin(pseudo){
    const user = findUserByPseudo(pseudo);
    return user && user.isAdmin;
}

router.post('/unlock', function(req, res, next){
    const password = req.body.password;
    const login = req.body.login;

    if (!password || !login){
        res.status(400).send("Identifiants introuvables.");
        return
    }

    if(authenticate(login, password)){

        if(!isAdmin(login, password)){
            res.status(401).send("GrinchByte- 'Hehehe, vous n'êtes plus administrateur, pensiez vous que ce serait si simple ?!'")
        }
        const accessToken = jwt.createJWT(password, true, '1 day');

        let responseObject = {
            "_links": [{
                "self": hal.halLinkObject('/unlock'),
                "navigation": hal.halLinkObject(`/gps`, 'string', '', true)
            }],
            jwt: accessToken,
            message: `Bienvenue ${login} !`,
        }
        res.status(200).format({
            'application/hal+json': function(){
                res.send(responseObject);
            }
        })
    }
});

module.exports = router;
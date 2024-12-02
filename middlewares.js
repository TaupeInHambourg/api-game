const jwt = require('jsonwebtoken');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

const EXPIRATION = '1 day';
const SECRET = fs.readFileSync('private.key');

const extractBearerToken = headervalue => {

    if(typeof headervalue !== 'string'){
        return false;
    }
    const matches = headervalue.match(/(bearer)\s+(\S+)/i);
    return matches && matches[2];
}

const checkTokenMiddleware = (req, res, next) => {

    const token  = req.headers.authorization && extractBearerToken(req.headers.authorization);
    
    if(!token){
        return res.status(401).json({"msg":"Le système GPS est vérouillé."})
    }
    
    //vérification du jwt
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if(err){
            return res.status(401).json({"msg":"Vous n'êtes pas authorisé à acceder à cette ressource."})
        }
        console.log("Token vérifié!")
    })
    next();
}

/**
** Retourne un jwt signé avec une date d'expiration
* @param {*} login
* @param {*} isAdmin
* @returns
*/

function createJWT(login, isAdmin, expiration = EXPIRATION){

    return jwt.sign({
        login: login,
        isAdmin: isAdmin,
    },
    SECRET, {
        expiresIn:expiration
    }
    );
}

const limiterMiddleware = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: 'Trop de tentatives échouées.',
});

module.exports = {createJWT, checkTokenMiddleware, limiterMiddleware}
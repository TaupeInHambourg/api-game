const jwt = require('jsonwebtoken');
const fs = require('fs');

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
        return res.status(401).json({"msg":"GrinchByte est passé par ici. Bonne chance pour déverouiller ça !"})
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

module.exports = {createJWT, checkTokenMiddleware}
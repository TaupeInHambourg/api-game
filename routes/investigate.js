var express = require('express');
var router = express.Router();
var db = require('../database');
var hal = require('../hal');

/* GET investigate page. */
router.get('/investigate', function(req, res, next) {
    res.status(200).send(`Le père Noël, Nicolas, s'approche de vous. C'est surement un bon point de départ pour votre enquête.`)
});

router.get('/investigate/:pnj', function(req, res, next) {

    const pnjName = req.params.pnj;
    const personnage = db.personnages.find((pnj) => pnj.name.toLowerCase() === pnjName.toLowerCase());

    if(!personnage){
    res.status(404).send({ message : `Le personnage ${pnjName} n'existe pas`})
    }

    const subjects = db.investigations.filter(investigation => investigation.id_pnj === personnage.id);

    const investigateRessourceObject = hal.mapInvestigationListToResourceObject(subjects, personnage);

    const filteredSubjects = investigateRessourceObject._embedded.subjects.map(subject => {
        return {
            href: subject._links.self.href,
            subject: subject.subject
        };
    });

    res.status(200).json({ message : `Sur quel sujet souaitez-vous me parler ?`, sujets : filteredSubjects });

});

router.get('/investigate/:idPNJ/:subject', function(req, res, next){
    const pnjId = parseInt(req.params.idPNJ, 10);
    const pnjSubject = req.params.subject;

    const subject = db.investigations.find((talk) => talk.id_pnj === pnjId && talk.subject === pnjSubject);

    if(!subject){
        res.status(404).send({ message : `Aucune question possible sur le sujet '${pnjSubject}'.`})
    }

    const talkRessourceObject = hal.mapQuestionRessourceObject(subject);

    res.status(200).json(talkRessourceObject);
});

module.exports = router;
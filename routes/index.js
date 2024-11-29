var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const message = `
    La veille de Noël, un hacker a pris le contrôle du système de navigation GPS du traîneau du Père Noël, mettant en péril la livraison des cadeaux aux enfants du monde entier.
    Le hacker n'a pas eu le temps d'effacer ses traces, vous devrez trouver une solution en fouillant dans les systèmes du traîneau.

    Vous, un enquêteur spécialisé en cybersécurité, avez été appelé en urgence pour identifier le coupable et restaurer le contrôle du traîneau avant que minuit ne sonne.
  `;
  res.status(200).send(message);
});

module.exports = router;

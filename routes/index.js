var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const message = `
    La veille de Noël, un hacker a pris le contrôle du système de navigation GPS du traîneau du Père Noël, mettant en péril la livraison des cadeaux aux enfants du monde entier.

    Vous, un enquêteur spécialisé en cybersécurité, avez été appelé en urgence pour identifier le coupable et restaurer le contrôle du traîneau.
    Pour vous aider, vous pouvez compter sur Watson, votre fidèle assistant, ainsi que sur les habitants de la Laponie qui sont prêts à vous aider.

    Commencer donc par les interroger /investigate.
  `;
  res.status(200).send(message);
});

module.exports = router;

var express = require('express');
var router = express.Router();
var db = require('../database');
var hal = require('../hal');

/* GET clues page. */
router.get('/clues', function(req, res, next) {
  res.status(200).json({message : `A propos de quel sujet souhaitez vous un indice ? -gps -coupable -enquete`, delete : "Vous pouvez supprimer un indice indésirable."})
});

router.get('/clues/:name', function(req, res, next) {

  const name = req.params.name;
  const clue = db.clues.find((clue) => clue.name.toLowerCase() == name.toLowerCase());

  if(clue === undefined){
    res.status(404).send(`Il n'y a pas d'indice concernant ${name}`)
  }

  const clueRessourceObject = hal.mapCluetoResourceObject(clue);

  res.status(200).json(clueRessourceObject.description);

});

router.delete('/clues/:name', function(req, res, next) {
  const name = req.params.name;
  const clueIndex = db.clues.findIndex((clue) => clue.name.toLowerCase() === name.toLowerCase());

  if (clueIndex === -1 || clueIndex === undefined) {
    return res.status(404).send(`Il n'y a pas d'indice sur le sujet ${name}.`);
  }

  db.clues.splice(clueIndex, 1);
  res.status(200).send(`L'indice concernant ${name} a été supprimé avec succès.`);
});

module.exports = router;
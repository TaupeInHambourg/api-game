var express = require('express');
var router = express.Router();
var db = require('../database');
var hal = require('../hal');

/* GET clues page. */
router.get('/clues', function(req, res, next) {
  //TODO : a propos de quoi souhaitez vous un indice ? /gps, /grinchbyte......
  res.status(200).send(`A propos de quel sujet souhaitez vous un indice ? -gps -grinchbyte`)
});

router.get('/clues/:name', function(req, res, next) {

  const name = req.params.name;
  const clue = db.clues.find((clue) => clue.name == name);

  if(clue === undefined){
    res.status(404).send(`Il n'y a pas d'indice concernant ${name}`)
  }

  const clueRessourceObject = hal.mapCluetoResourceObject(clue);

  res.status(200).json(clueRessourceObject);

});

router.delete('/clues/:name', function(req, res, next) {
  const name = req.params.name;
  const clueIndex = db.clues.findIndex((clue) => clue.name === name);

  if (clueIndex === -1) {
    return res.status(404).send(`Il n'y a pas d'indice sur le sujet ${name}.`);
  }
  if (clueIndex === undefined) {
    return res.status(404).send(`Il n'y a pas d'indice sur le sujet ${name}.`);
  }


  db.clues.splice(clueIndex, 1);
  res.status(200).send(`L'indice concernant ${name} a été supprimé avec succès.`);
});

module.exports = router;
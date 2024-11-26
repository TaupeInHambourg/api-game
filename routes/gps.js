var express = require('express');
var router = express.Router();
var db = require('../database')

/* GET gps page. */
router.get('/gps', function(req, res, next) {
  // TODO: if JWT => data else error msg
  grinchbyteResponse = {
    "status": "compromised",
    "message": "GrinchByte est passé par ici. Bonne chance pour réparer ça !",
    "hint": "Regardez dans /clues."
  }

  res.status(200).json(grinchbyteResponse);
});

module.exports = router;
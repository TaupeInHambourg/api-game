var express = require('express');
var router = express.Router();
var db = require('../database');
var { checkTokenMiddleware } = require("../jwt");

/* GET gps -> page protégée. */
router.get(
  '/gps', 
  checkTokenMiddleware, 
  function(req, res, next) {
  // TODO: créer le secret + une page "auth" où user doit donner le bon code
  // TODO: donner plus d'indices
    res.status(200).json(db.navigations);
});

module.exports = router;
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index')
var gpsRouter = require('./routes/gps');
var cluesRouter = require('./routes/clues');
var unlockRouter = require('./routes/unlock');
var investigateRouter = require('./routes/investigate');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/', gpsRouter);
app.use('/', cluesRouter);
app.use('/', unlockRouter);
app.use('/', investigateRouter);

app.use(function(req, res, next){
    res.status(404).send("Il n'y a rien à voir par ici.");
});

module.exports = app;

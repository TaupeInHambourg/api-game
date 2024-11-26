var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var gpsRouter = require('./routes/gps');
var cluesRouter = require('./routes/clues');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', gpsRouter);
app.use('/', cluesRouter);

module.exports = app;

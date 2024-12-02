const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index')
const gpsRouter = require('./routes/gps');
const cluesRouter = require('./routes/clues');
const accuseRouter = require('./routes/accuse');
const investigateRouter = require('./routes/investigate');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/', gpsRouter);
app.use('/', cluesRouter);
app.use('/', accuseRouter);
app.use('/', investigateRouter);

app.use(function(req, res, next){
    res.status(404).send("Il n'y a rien à voir par ici.");
});

module.exports = app;

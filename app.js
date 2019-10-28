const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');

const passport = require('passport');
require('./auth/auth')(passport);

const {
  connectDb
} = require('./db/connect');


const indexRouter = require('./routes/index');

// const aws = require('aws-sdk');

const app = express();

app.use(logger('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser());

//config passport
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

//Handle errors
app.use(function (err, req, res, next) {
  console.log('error:', err);
  res.status(err.status || 500);
  res.json({
    error: err
  });
});

connectDb();

module.exports = app;

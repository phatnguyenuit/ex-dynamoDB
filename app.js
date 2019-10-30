const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan');

const connectDb = require('./db/connect');
const indexRouter = require('./routes/index');

// Connect to the database
connectDb();

const app = express();
app.use(logger('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser());

// serve static
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//Handle errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err
  });
});
module.exports = app;

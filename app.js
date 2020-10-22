var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var configLoader = require('./configLoader');

/**
 * Loads environment variables
 */
const appConfig = configLoader.GetAppConfig();

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);

app.listen(appConfig.port, () => {
  console.log(`listening on port ${appConfig.port}`);
});

module.exports = app;

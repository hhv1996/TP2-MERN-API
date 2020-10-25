var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var configLoader = require('./infrastructure/config-loader');

const appConfig = configLoader.GetAppConfig();

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var app = express();

const { initClientDbConnection } = require('./infrastructure/db-util');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/usuarios', usuariosRouter);

global.clientConnection = initClientDbConnection();

global.appRoot = path.resolve(__dirname);

app.listen(appConfig.port, () => {
  console.log(`listening on port ${appConfig.port}`);
});

module.exports = app;

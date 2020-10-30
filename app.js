var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var configLoader = require('./infrastructure/config-loader');

const appConfig = configLoader.GetAppConfig();

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var licenciasRouter = require('./routes/licencias');
var asistenciasRouter = require('./routes/asistencias');
var app = express();

const { initClientDbConnection } = require('./infrastructure/db-util');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/licencias', licenciasRouter);
app.use('/api/asistencias', asistenciasRouter);

global.clientConnection = initClientDbConnection();

// app.listen(appConfig.port, () => {
//   console.log(`listening on port ${appConfig.port}`);
// });

module.exports = app;

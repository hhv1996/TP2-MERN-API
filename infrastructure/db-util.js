const mongoose = require('mongoose');
const url_builder = require('./url-builder');

const initClientDbConnection = () => {
  const db = mongoose.createConnection(url_builder.build(), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  db.on('error', console.error.bind(console, 'MongoDB Connection Error>> : '));
  db.once('open', function () {
    console.log('Connected to mongoDB!');
    // require('../models/usuario.js');
  });

  return db;
};

module.exports = { initClientDbConnection };

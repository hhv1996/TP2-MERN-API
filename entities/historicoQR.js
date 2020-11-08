const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historicalQRSchema = new Schema({
  secret: String,
  created: Date,
  expire: Date,
});

module.exports = mongoose.model('HistoricalQR', historicalQRSchema);

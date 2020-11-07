const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const institutionSchema = new Schema({
  name: String,
  adress: { street: String, number: Number, floor: Number, apartment: String },
  logoPatch: String,
});

module.exports = mongoose.model('Institution', institutionSchema);

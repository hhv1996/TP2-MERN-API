const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  employeeNbr: Number,
  start: Date,
  end: Date,
});

module.exports = mongoose.model('Leave', leaveSchema);

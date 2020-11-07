const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveSchema = new Schema({
  userId: String,
  start: Date,
  end: Date,
});

module.exports = mongoose.model('Leave', leaveSchema);

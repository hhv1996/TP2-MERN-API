const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  userId: String,
  checkIn: Date,
  checkOut: Date,
});

module.exports = mongoose.model('Attendance', attendanceSchema);

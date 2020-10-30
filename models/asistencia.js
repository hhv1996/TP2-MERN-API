const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  employeeNbr: Number,
  checkIn: Date,
  checkOut: Date,
});

module.exports = mongoose.model('Attendance', attendanceSchema);

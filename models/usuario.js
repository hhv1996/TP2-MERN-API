const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  employeeNbr: Number,
  name: { first: String, last: String },
  isAdmin: Boolean,
  checkIn: Number,
  checkOut: Number,
});

userSchema.virtual('fullName').get(function () {
  return this.name.first + ' ' + this.name.last;
});

module.exports = mongoose.model('User', userSchema);

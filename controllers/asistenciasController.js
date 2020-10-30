const mongoose = require('mongoose');
const Attendance = require('../models/asistencia');
const User = require('../models/usuario');

/**
 * Returns an array of Attendances
 */
async function Get() {
  const Attendance = await getDB();
  return await Attendance.find({});
}

/**
 * Returns a Attendance that matches the employeeNbr
 * @param number {} nbr
 */
async function GetById(id) {
  const Attendance = await getDB();
  let result = null;

  try {
    result = await Attendance.findById(id);
  } catch (err) {}
  return result;
}

async function GetByEmployeeNbr(nbr) {
  const Attendance = await getDB();
  let result = null;

  try {
    if (await EmployeeExists(nbr))
      result = await Attendance.find({ employeeNbr: nbr });
  } catch (err) {}
  return result;
}

/**
 * Creates a new Attendance
 * @param Attendance {} Attendance object
 */
async function Create(attendance) {
  const Attendance = await getDB();
  let result = null;

  try {
    if (await EmployeeExists(attendance.employeeNbr)) {
      const newAttendance = await new Attendance({
        employeeNbr: attendance.employeeNbr,
        checkIn: attendance.checkIn,
        checkOut: attendance.checkOut,
      }).save();

      result = newAttendance;
    }
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Updates a given Attendance
 * @param number nbr
 * @param Attendance attendance
 */
async function Update(id, attendance) {
  const Attendance = await getDB();
  let result = null;

  try {
    if (await AttendanceExists(id))
      result = await Attendance.updateOne(
        { _id: id },
        {
          employeeNbr: attendance.employeeNbr,
          checkIn: attendance.checkIn,
          checkOut: attendance.checkOut,
        }
      );
  } catch (err) {
    console.log(err);
  }

  return result;
}
/**
 * Deletes a given Attendance
 * @param number nbr
 * @param Attendance attendance
 */
async function Delete(id) {
  const Attendance = await getDB();
  let result = null;

  try {
    if (await AttendanceExists(id))
      result = await Attendance.deleteOne({ _id: id });
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Checks for attendance existance
 * @param number nbr
 */
async function AttendanceExists(id) {
  return (await GetById(id)) !== null ? true : false;
}

/**
 * Checks if a Attendance is valid by comparing Nbr and employeeNbr
 * @param number a
 * @param number b
 */

async function EmployeeExists(nbr) {
  const User = await getUserDB();

  return User.findOne({ employeeNbr: nbr } !== null) ? true : false;
}

async function getDB() {
  return await global.clientConnection.useDb('asistencias').model('Attendance');
}

/**
 * Gets the User DB for validation purposes
 */
async function getUserDB() {
  return await global.clientConnection.useDb('usuarios').model('User');
}

module.exports = { Get, GetById, GetByEmployeeNbr, Create, Update, Delete };

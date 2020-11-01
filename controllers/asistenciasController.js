const mongoose = require('mongoose');
const Attendance = require('../models/asistencia');
const Users = require('./usuariosController');
const Util = require('./util/controller-util');

/**
 * Returns an array of Attendances
 */
async function Get() {
  const Attendance = await getDB();
  return await Attendance.find({});
}

/**
 * Returns a Attendance that matches the employeeNbr
 * @param string {} id
 */
async function GetById(id) {
  const Attendance = await getDB();
  let result = null;

  try {
    if (Util.IsObjectId(id)) result = await Attendance.findById(id);
    else throw `>>> Error: id cannot be casted to ObjectId`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Returns a Attendance that matches the UserId
 * @param string {} id
 */
async function GetByUserId(id) {
  const Attendance = await getDB();
  let result = null;

  try {
    if (Util.IsObjectId(id))
      if (Users.UserExists(id)) result = await Attendance.find({ userId: id });
      else throw `>>> Error: user with id "${id}" not found`;
    else throw `>>> Error: id cannot be casted to ObjectId`;
  } catch (err) {
    console.log(err);
  }

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
    if (await Users.UserExists(attendance.userId))
      result = await new Attendance({
        userId: attendance.userId,
        checkIn: attendance.checkIn,
        checkOut: attendance.checkOut,
      }).save();
    else throw `>>> Error: user with id "${id}" not found`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Updates a given Attendance
 * @param string id
 * @param Attendance attendance
 */
async function Update(id, attendance) {
  const Attendance = await getDB();
  let result = null;

  try {
    if (Util.IsEqual(id, attendance._id))
      if (Util.IsObjectId(id))
        if (await AttendanceExists(id))
          result = await Attendance.findByIdAndUpdate(
            id,
            {
              userId: attendance.userId,
              checkIn: attendance.checkIn,
              checkOut: attendance.checkOut,
            },
            { useFindAndModify: false }
          );
        else throw `>>> Error: attendance with id "${id}" not found`;
      else throw `>>> Error: id cannot be casted to ObjectId`;
    else throw `>>> Error: mismatching ids`;
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
async function Delete(id, attendance) {
  const Attendance = await getDB();
  let result = null;

  try {
    if (Util.IsEqual(id, attendance._id))
      if (Util.IsObjectId(id))
        if (await AttendanceExists(id))
          result = await Attendance.findByIdAndDelete(id, {
            useFindAndModify: false,
          });
        else throw `>>> Error: attendance with id "${id}" not found`;
      else throw `>>> Error: id cannot be casted to ObjectId`;
    else throw `>>> Error: mismatching ids`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Checks for attendance existance
 * @param id string
 */
async function AttendanceExists(id) {
  return (await GetById(id)) !== null ? true : false;
}

async function getDB() {
  return await global.clientConnection.useDb('asistencias').model('Attendance');
}

module.exports = { Get, GetById, GetByUserId, Create, Update, Delete };

const mongoose = require('mongoose');
const Leave = require('../models/licencia');

/**
 * Returns an array of Leaves
 */
async function Get() {
  try {
    const Leave = await getDB();
    return Leave.find({});
  } catch (err) {}
}

/**
 * Returns a Leave that matches the employeeNbr
 * @param number {} nbr
 */
async function GetByNbr(nbr) {
  const Leave = await getDB();
  return Leave.findOne({ employeeNbr: nbr });
}

/**
 * Creates a new Leave
 * @param Leave {} Leave object
 */
async function Create(leave) {
  const Leave = await getDB();
  let result = null;

  try {
    // if (!(await LeaveExists(leave.employeeNbr))) {
    const newLeave = await new Leave({
      employeeNbr: leave.employeeNbr,
      start: leave.start,
      end: leave.end,
    }).save();

    result = newLeave;
    // } else throw 'Employee number already registered';
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Updates a given Leave
 * @param number nbr
 * @param Leave leave
 */
async function Update(nbr, leave) {
  const Leave = await getDB();
  let result = null;

  try {
    // if (IsLeaveValid(nbr, leave.employeeNbr))
    result = await Leave.updateOne(
      { employeeNbr: nbr },
      {
        employeeNbr: leave.employeeNbr,
        start: leave.start,
        end: leave.end,
      }
    );
  } catch (err) {
    console.log(err);
  }

  return result;
}
/**
 * Deletes a given Leave
 * @param number nbr
 * @param Leave leave
 */
async function Delete(nbr, leave) {
  const Leave = await getDB();
  let result = null;

  try {
    // if (IsLeaveValid(nbr, leave.employeeNbr))
    result = await Leave.findOneAndDelete({ employeeNbr: nbr });
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Checks for leave existance
 * @param number nbr
 */
// async function LeaveExists(nbr) {
//   return (await GetByNbr(nbr)) !== null ? true : false;
// }

/**
 * Checks if a Leave is valid by comparing Nbr and employeeNbr
 * @param number a
 * @param number b
 */
// function IsLeaveValid(a, b) {
//   return parseInt(a) === parseInt(b);
// }

async function getDB() {
  return await global.clientConnection.useDb('licencias').model('Leave');
}

module.exports = { Get, GetByNbr, Create, Update, Delete };

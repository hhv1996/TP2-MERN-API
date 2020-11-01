const mongoose = require('mongoose');
const Leave = require('../models/licencia');
const Users = require('./usuariosController');
const Util = require('./util/controller-util');

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
 * Returns a Leave that matches the Id
 * @param string {} Id
 */
async function GetById(id) {
  const Leave = await getDB();
  let result = null;

  try {
    if (Util.IsObjectId(id)) result = await Leave.findById(id);
    else throw `>>> Error: id cannot be casted to ObjectId`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Returns an array of Leaves that matches the UserId
 * @param string {} Id
 */
async function GetByUserId(id) {
  const Leave = await getDB();
  let result = null;

  try {
    if (Util.IsObjectId(id))
      if (Users.UserExists(id)) result = await Leave.find({ userId: id });
      else throw `>>> Error: user with id "${id}" not found`;
    else throw `>>> Error: id cannot be casted to ObjectId`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Creates a new Leave
 * @param Leave {} Leave object
 */
async function Create(leave) {
  const Leave = await getDB();
  let result = null;

  try {
    if (await Users.UserExists(leave.userId))
      result = await new Leave({
        userId: leave.userId,
        start: leave.start,
        end: leave.end,
      }).save();
    else throw `>>> Error: user with id "${id}" not found`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Updates a given Leave
 * @param string id
 * @param Leave leave
 */
async function Update(id, leave) {
  const Leave = await getDB();
  let result = null;

  try {
    if (Util.IsEqual(id, leave._id))
      if (Util.IsObjectId(id))
        if (await LeaveExists(id))
          result = await Leave.findByIdAndUpdate(
            id,
            {
              userId: leave.userId,
              start: leave.start,
              end: leave.end,
            },
            { useFindAndModify: false }
          );
        else throw `>>> Error: leave with id "${id}" not found`;
      else throw `>>> Error: id cannot be casted to ObjectId`;
    else throw `>>> Error: mismatching ids`;
  } catch (err) {
    console.log(err);
  }

  return result;
}
/**
 * Deletes a given Leave
 * @param string id
 * @param Leave leave
 */
async function Delete(id, leave) {
  const Leave = await getDB();
  let result = null;

  try {
    if (Util.IsEqual(id, leave._id))
      if (Util.IsObjectId(id))
        if (await LeaveExists(id))
          result = await Leave.findByIdAndDelete(id, {
            useFindAndModify: false,
          });
        else throw `>>> Error: leave with id "${id}" not found`;
      else throw `>>> Error: id cannot be casted to ObjectId`;
    else throw `>>> Error: mismatching ids`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Checks for leave existance
 * @param string id
 */
async function LeaveExists(id) {
  return (await GetById(id)) !== null ? true : false;
}

async function getDB() {
  return await global.clientConnection.useDb('licencias').model('Leave');
}

module.exports = { Get, GetById, GetByUserId, Create, Update, Delete };

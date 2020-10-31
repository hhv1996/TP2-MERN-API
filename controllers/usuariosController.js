const mongoose = require('mongoose');
const User = require('../models/usuario');
const Util = require('./util/controller-util');

/**
 * Returns an array of Users
 */
async function Get() {
  try {
    const User = await getDB();
    return await User.find({});
  } catch (err) {}
}

/**
 * Returns a User that matches the id
 * @param number {} id
 */
async function GetById(id) {
  const User = await getDB();
  let result = null;

  try {
    if (Util.IsObjectId(id)) result = await User.findById(id);
    else throw `>>> Error: id cannot be casted to ObjectId`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Returns a User that matches the email
 * @param string {} email
 */
async function GetByEmail(email) {
  const User = await getDB();
  let result = null;
  try {
    result = await User.findOne({ email: email });

    if (result === null)
      throw `>>> Error: user with email "${email}" not found`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Creates a new User
 * @param User {} User object
 */
async function Create(user) {
  const User = await getDB();
  let result = null;

  try {
    if (!(await IsEmailOnUse(user.email))) {
      const newUser = await new User({
        name: { first: user.name.first, last: user.name.last },
        adress: {
          street: user.adress.street,
          number: user.adress.number,
          floor: user.adress.floor,
          apartment: user.adress.aparment,
        },
        phone: user.phone,
        email: user.email,
        jwt: user.jwt,
        imagePatch: user.imagePatch,
        isAdmin: false,
        checkIn: user.checkIn,
        checkOut: user.checkOut,
      }).save();

      result = newUser;
    } else throw `>>> Error: user email "${user.email}" already claimed`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Updates a given User
 * @param number id
 * @param User user
 */
async function Update(id, user) {
  const User = await getDB();
  let result = null;

  try {
    if (Util.IsEqual(id, user._id))
      if (Util.IsObjectId(id))
        if (await UserExists(id))
          result = await User.findByIdAndUpdate(
            id,
            {
              name: { first: user.name.first, last: user.name.last },
              adress: {
                street: user.adress.street,
                number: user.adress.number,
                floor: user.adress.floor,
                apartment: user.adress.aparment,
              },
              phone: user.phone,
              email: user.email,
              jwt: user.jwt,
              imagePatch: user.imagePatch,
              isAdmin: false,
              checkIn: user.checkIn,
              checkOut: user.checkOut,
            },
            { useFindAndModify: false }
          );
        else throw `>>> Error: user does not exist with id: ${id}`;
      else throw `>>> Error: id cannot be casted to ObjectId`;
    else throw `>>> Error: mismatching ids`;
  } catch (err) {
    console.log(err);
  }

  return result;
}
/**
 * Deletes a given User
 * @param number id
 * @param User user
 */
async function Delete(id, user) {
  const User = await getDB();
  let result = null;

  try {
    if (Util.IsEqual(id, user._id))
      if (Util.IsObjectId(id))
        if (await UserExists(id))
          result = await User.findByIdAndDelete(id, {
            useFindAndModify: false,
          });
        else throw `>>> Error: user does not exist with id: ${id}`;
      else throw `>>> Error: id cannot be casted to ObjectId`;
    else throw `>>> Error: mismatching ids`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Checks for user existance by id
 * @param number id
 */
async function UserExists(id) {
  return (await GetById(id)) !== null ? true : false;
}

/**
 * Checks if the email is already on use
 * @param string email
 */
async function IsEmailOnUse(email) {
  return (await GetByEmail(email)) !== null ? true : false;
}

async function getDB() {
  return await global.clientConnection.useDb('usuarios').model('User');
}

module.exports = {
  Get,
  GetById,
  GetByEmail,
  Create,
  Update,
  Delete,
  UserExists,
};

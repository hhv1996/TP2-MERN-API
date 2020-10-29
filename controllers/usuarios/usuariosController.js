const mongoose = require('mongoose');
const User = require('../../models/usuario');

/**
 * Returns an array of Users
 */
async function Get() {
  try {
    const User = await getDB();
    return User.find({});
  } catch (err) {}
}

/**
 * Returns a User that matches the employeeNbr
 * @param number {} nbr
 */
async function GetByNbr(nbr) {
  const User = await getDB();
  return User.findOne({ employeeNbr: nbr });
}

/**
 * Creates a new User
 * @param User {} User object
 */
async function Create(user) {
  const User = await getDB();
  let result = null;

  try {
    if (!(await UserExists(user.employeeNbr))) {
      const newUser = await new User({
        employeeNbr: user.employeeNbr,
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
    } else throw 'Employee number already registered';
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Updates a given User
 * @param number nbr
 * @param User user
 */
async function Update(nbr, user) {
  const User = await getDB();
  let result = null;

  try {
    if (IsUserValid(nbr, user.employeeNbr))
      result = await User.updateOne(
        { employeeNbr: nbr },
        {
          employeeNbr: user.employeeNbr,
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
        }
      );
  } catch (err) {
    console.log(err);
  }

  return result;
}
/**
 * Deletes a given User
 * @param number nbr
 * @param User user
 */
async function Delete(nbr, user) {
  const User = await getDB();
  let result = null;

  try {
    if (IsUserValid(nbr, user.employeeNbr))
      result = await User.findOneAndDelete({ employeeNbr: nbr });
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Checks for user existance
 * @param number nbr
 */
async function UserExists(nbr) {
  return (await GetByNbr(nbr)) !== null ? true : false;
}

/**
 * Checks if a User is valid by comparing Nbr and employeeNbr
 * @param number a
 * @param number b
 */
function IsUserValid(a, b) {
  return parseInt(a) === parseInt(b);
}

async function getDB() {
  return await global.clientConnection.useDb('usuarios').model('User');
}

module.exports = { Get, GetByNbr, Create, Update, Delete };

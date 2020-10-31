const mongoose = require('mongoose');
const isValid = mongoose.Types.ObjectId.isValid;

/**
 * Checks if id is a valid ObjectId id
 * @param string a
 * @param string b
 * @return return true if all ids are valid
 */
function IsObjectId(a, b) {
  return b === undefined ? isValid(a) : isValid(a) && isValid(b);
}

/**
 * Checks if two values are stricly equal
 * @param any a
 * @param any b
 */
function IsEqual(a, b) {
  return a === b;
}

module.exports = { IsObjectId, IsEqual };

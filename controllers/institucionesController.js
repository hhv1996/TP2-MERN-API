const mongoose = require('mongoose');
const Institution = require('../entities/institucion');
const Util = require('./util/controller-util');

/**
 * Returns an array of Institutions
 */
async function Get() {
  try {
    const Institution = await getDB();
    return await Institution.find({});
  } catch (err) {}
}

/**
 * Returns an Institution that matches the id
 * @param number {} id
 */
async function GetById(id) {
  const Institution = await getDB();
  let result = null;

  try {
    if (Util.IsObjectId(id)) result = await Institution.findById(id);
    else throw `>>> Error: id cannot be casted to ObjectId`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Creates a new Institution
 * @param Institution {} Institution object
 */
async function Create(institution) {
  const Institution = await getDB();
  let result = null;

  try {
    const newInstitution = await new Institution({
      name: institution.name,
      adress: {
        street: institution.adress.street,
        number: institution.adress.number,
        floor: institution.adress.floor,
        apartment: institution.adress.apartment,
      },
      logoPatch: institution.logoPatch,
      latitude: institution.latitude,
      longitude: institution.longitude,
    }).save();

    result = newInstitution;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Updates a given Institution
 * @param number id
 * @param Institution institution
 */
async function Update(id, institution) {
  const Institution = await getDB();
  let result = null;

  try {
    if (Util.IsEqual(id, institution._id))
      if (Util.IsObjectId(id))
        if (await InstitutionExists(id))
          result = await Institution.findByIdAndUpdate(
            id,
            {
              name: institution.name,
              adress: {
                street: institution.adress.street,
                number: institution.adress.number,
                floor: institution.adress.floor,
                apartment: institution.adress.apartment,
              },
              logoPatch: institution.logoPatch,
              latitude: institution.latitude,
              longitude: institution.longitude,
            },
            { useFindAndModify: false }
          );
        else throw `>>> Error: institution does not exist with id: ${id}`;
      else throw `>>> Error: id cannot be casted to ObjectId`;
    else throw `>>> Error: mismatching ids`;
  } catch (err) {
    console.log(err);
  }

  return result;
}
/**
 * Deletes a given Institution
 * @param number id
 * @param Institution institution
 */
async function Delete(id, institution) {
  const Institution = await getDB();
  let result = null;

  try {
    if (Util.IsEqual(id, institution._id))
      if (Util.IsObjectId(id))
        if (await InstitutionExists(id))
          result = await Institution.findByIdAndDelete(id, {
            useFindAndModify: false,
          });
        else throw `>>> Error: institution does not exist with id: ${id}`;
      else throw `>>> Error: id cannot be casted to ObjectId`;
    else throw `>>> Error: mismatching ids`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Checks for institution existance by id
 * @param number id
 */
async function InstitutionExists(id) {
  return (await GetById(id)) !== null ? true : false;
}

async function getDB() {
  return await global.clientConnection
    .useDb('instituciones')
    .model('Institution');
}

module.exports = {
  Get,
  GetById,
  Create,
  Update,
  Delete,
  InstitutionExists,
};

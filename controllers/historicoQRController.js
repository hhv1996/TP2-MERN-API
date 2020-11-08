const mongoose = require('mongoose');
const HistoricalQR = require('../entities/historicoQR');
const Util = require('./util/controller-util');

/**
 * Returns an array of HistoricalQRs
 */
async function Get() {
  try {
    const HistoricalQR = await getDB();
    return await HistoricalQR.find({});
  } catch (err) {}
}

/**
 * Returns the latest HistoricalQR generated
 */
async function GetLatest() {
  try {
    const HistoricalQR = await getDB();
    return await HistoricalQR.findOne().sort({ _id: -1 });
  } catch (err) {}
}

/**
 * Returns a HistoricalQR that matches the id
 * @param number {} id
 */
async function GetById(id) {
  const HistoricalQR = await getDB();
  let result = null;

  try {
    if (Util.IsObjectId(id)) result = await HistoricalQR.findById(id);
    else throw `>>> Error: id cannot be casted to ObjectId`;
  } catch (err) {
    console.log(err);
  }

  return result;
}

/**
 * Creates a new HistoricalQR
 */

async function Create() {
  const HistoricalQR = await getDB();
  let result = null;

  const dateNow = new Date();
  const expireTime = 5;

  try {
    result = await new HistoricalQR({
      secret: Math.trunc(dateNow.valueOf() * Math.random()),
      created: dateNow.valueOf(),
      expire: new Date(dateNow.getTime() + expireTime * 60000).valueOf(),
    }).save();
  } catch (err) {
    console.log(err);
  }

  return result;
}

async function getDB() {
  return await global.clientConnection
    .useDb('historicoQR')
    .model('HistoricalQR');
}

module.exports = {
  Get,
  GetLatest,
  GetById,
  Create,
};

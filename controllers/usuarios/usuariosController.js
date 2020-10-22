var MongoClient = require('mongodb').MongoClient;
var configLoader = require('../../configLoader');
var urlBuilder = require('../../infrastructure/url_builder');

const config = configLoader.GetDBConfig();

const dbName = config.dbs['usuarios'];
const collectionName = config.cols[dbName];
const uri = urlBuilder.build(dbName);

/**
 * Returns an array of users
 */
async function GetAllUsers() {
  let client;
  let docs = {};

  try {
    client = await MongoClient.connect(uri, { useUnifiedTopology: true });

    const db = client.db(dbName);
    const col = db.collection(collectionName);

    docs = await col.find({}).toArray();
  } catch (err) {
    console.error(err);
  } finally {
    if (typeof client !== 'undefined') {
      await client.close();
    }
  }
  return docs;
}

/**
 * Returns a user object that matches the id
 * @param int {} id
 */
async function GetUserById(id) {
  return { name: 'test', id: id };
}

module.exports = { GetAllUsers, GetUserById };

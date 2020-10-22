var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var configLoader = require('../configLoader');
var urlBuilder = require('../infrastructure/url_builder');

const config = configLoader.GetDBConfig();

const dbName = config.dbs['usuarios'];
const collectionName = config.cols['usuarios'];
const uri = urlBuilder.buildUrl('usuarios');

router.get('/', async function (req, res, next) {
  res.send(await GetAllUsers());
});

async function GetAllUsers() {
  let client;
  let docs;

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

      return docs;
    }
  }
}

module.exports = router;

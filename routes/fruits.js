const express = require('express');
const router = express.Router();
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./mockdata.json'));

const stringify = (content) => {
  return JSON.stringify(content);
};

router.get('/', (req, res) => {
  console.log('this is an "all" request!');
  const body = stringify(data);
  res.statusCode = 200;
  res.send(body);
});

router.get('/:name', (req, res) => {
  console.log(
    `this is a specific request for ${req.params.name.toUpperCase()}`
  );

  let body = data.find(
    (f) => f.name.toUpperCase() === req.params.name.toUpperCase()
  );

  if (body === undefined) {
    body = 'Fruit not found :(';
    res.statusCode = 404;
  } else res.statusCode = 200;

  res.send(stringify(body));
});

module.exports = router;

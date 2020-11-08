var express = require('express');
var router = express.Router();

var historical = require('../controllers/historicoQRController');

router.get('/', async (req, res) => {
  res.send(await historical.Get());
});

router.get('/:id', async (req, res) => {
  const result = await historical.GetById(req.params.id);
  if (result !== null) res.json(result);
  else res.sendStatus(403);
});

module.exports = router;

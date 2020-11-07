var express = require('express');
var router = express.Router();

var institutions = require('../controllers/institucionesController');

router.get('/', async (req, res) => {
  res.send(await institutions.Get());
});

router.get('/:id', async (req, res) => {
  const result = await institutions.GetById(req.params.id);

  if (result !== null) res.status(200).json(result);
  else res.sendStatus(403);
});

router.post('/', async (req, res) => {
  const result = await institutions.Create(req.body);
  if (result !== null) res.status(201).json(result);
  else res.sendStatus(403);
});

router.put('/:id', async (req, res) => {
  const result = await institutions.Update(req.params.id, req.body);
  if (result !== null) res.status(200).json(result);
  else res.sendStatus(403);
});

router.delete('/:id', async (req, res) => {
  const result = await institutions.Delete(req.params.id, req.body);
  if (result !== null) res.sendStatus(200);
  else res.sendStatus(403);
});

module.exports = router;

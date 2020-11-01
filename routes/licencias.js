var express = require('express');
var router = express.Router();

var leaves = require('../controllers/licenciasController');

router.get('/', async (req, res) => {
  res.send(await leaves.Get());
});

router.get('/:id', async (req, res) => {
  const result = await leaves.GetById(req.params.id);
  if (result !== null) res.json(result);
  else res.sendStatus(403);
});

router.get('/usuario/:id', async (req, res) => {
  const result = await leaves.GetByUserId(req.params.id);
  if (result !== null) res.json(result);
  else res.sendStatus(403);
});

router.post('/', async (req, res) => {
  const result = await leaves.Create(req.body);
  if (result !== null) res.status(201).json(result);
  else res.sendStatus(403);
});

router.put('/:id', async (req, res) => {
  const result = await leaves.Update(req.params.id, req.body);
  if (result !== null) res.status(200).json(result);
  else res.sendStatus(403);
});

router.delete('/:id', async (req, res) => {
  const result = await leaves.Delete(req.params.id, req.body);
  if (result !== null) res.sendStatus(200);
  else res.sendStatus(403);
});

module.exports = router;

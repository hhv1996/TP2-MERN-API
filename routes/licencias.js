var express = require('express');
var router = express.Router();

var leaves = require('../controllers/licenciasController');

router.get('/', async (req, res) => {
  res.send(await leaves.Get());
});

router.get('/:nbr', async (req, res) => {
  const result = await leaves.GetByNbr(req.params.nbr);
  if (result !== null) res.json(result);
  else res.sendStatus(404);
});

router.post('/', async (req, res) => {
  const result = await leaves.Create(req.body);
  if (result !== null) res.sendStatus(201);
  else res.sendStatus(403);
});

router.put('/:nbr', async (req, res) => {
  const result = await leaves.Update(req.params.nbr, req.body);
  if (result !== null) res.sendStatus(200);
  else res.sendStatus(404);
});

router.delete('/:nbr', async (req, res) => {
  const result = await leaves.Delete(req.params.nbr, req.body);
  if (result !== null) res.sendStatus(200);
  else res.sendStatus(404);
});

module.exports = router;

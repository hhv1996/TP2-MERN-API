var express = require('express');
var router = express.Router();

var users = require('../controllers/usuariosController');

router.get('/', async (req, res) => {
  res.send(await users.Get());
});

router.get('/:nbr', async (req, res) => {
  const result = await users.GetByNbr(req.params.nbr);
  if (result !== null) res.json(result);
  else res.sendStatus(404);
});

router.post('/', async (req, res) => {
  const result = await users.Create(req.body);
  if (result !== null) res.sendStatus(201);
  else res.sendStatus(403);
});

router.put('/:nbr', async (req, res) => {
  const result = await users.Update(req.params.nbr, req.body);
  if (result !== null) res.sendStatus(200);
  else res.sendStatus(403);
});

router.delete('/:nbr', async (req, res) => {
  const result = await users.Delete(req.params.nbr, req.body);
  if (result !== null) res.sendStatus(200);
  else res.sendStatus(403);
});

module.exports = router;

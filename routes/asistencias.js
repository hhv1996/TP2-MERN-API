var express = require('express');
var router = express.Router();

var attendances = require('../controllers/asistenciasController');

router.get('/', async (req, res) => {
  let result = null;
  const nbr = req.query.nbr;

  result =
    nbr !== undefined
      ? await attendances.GetByEmployeeNbr(nbr)
      : await attendances.Get();

  if (result !== null) res.json(result);
  else res.sendStatus(403);
});

router.get('/:id', async (req, res) => {
  const result = await attendances.GetById(req.params.id);
  if (result !== null) res.json(result);
  else res.sendStatus(404);
});

router.post('/', async (req, res) => {
  const result = await attendances.Create(req.body);
  if (result !== null) res.sendStatus(201);
  else res.sendStatus(403);
});

router.put('/:id', async (req, res) => {
  const result = await attendances.Update(req.params.id, req.body);
  if (result !== null) res.sendStatus(200);
  else res.sendStatus(403);
});

router.delete('/:id', async (req, res) => {
  const result = await attendances.Delete(req.params.id, req.body);
  if (result !== null) res.sendStatus(200);
  else res.sendStatus(403);
});

module.exports = router;

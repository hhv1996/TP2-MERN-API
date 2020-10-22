var express = require('express');
var router = express.Router();

var users = require('../controllers/usuarios/usuariosController');

router.get('/', async (req, res) => {
  res.send(await users.GetAllUsers());
});

router.get('/:id', async (req, res) => {
  res.send(await users.GetUserById(req.params.id));
});

module.exports = router;

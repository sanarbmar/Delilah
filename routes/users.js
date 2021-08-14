var express = require('express');
const { findUsers, crearUsuario, updateUsuario } = require('../models/usuarios');
var router = express.Router();

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const users = await findUsers();
  res.send({users});
});

router.post('/', async(req, res, next) => {
  const nuevoUsuario = req.body;
  console.log(nuevoUsuario);
  const usuarioGuardado = await crearUsuario(nuevoUsuario);
  res.send(usuarioGuardado);
});

router.put('/', async(req, res, next) => {
  if (req.body.id) {
    const usuarioActualizado = await updateUsuario(req.body);
    res.status(200).send({usuarioActualizado})
  }else {
    res.status(404).json({
      error: 'datos enviados erroneos'
    })
  }
});

module.exports = router;

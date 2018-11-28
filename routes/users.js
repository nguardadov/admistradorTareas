var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');
  //mostrar todos los usuarios
  router.get('/', userController.index);
  //mostrar un usuario
  router.get('/:id',userController.findUser);
  //insertar usuario
  router.post('/',userController.store);
  //actualizar usuarios
  router.put('/:id',userController.update);
  //eliminando usarios
  router.delete('/:id',userController.delete);
module.exports = router;

var express = require('express');
var router = express.Router();
const { login, formulario, password, processFormulario}=require('../controllers/usersController');
const validacionRegistroUser = require('../validators/val_users/validacionRegistroUsers')

/* GET home page. */
router
      .get('/login', login)
      .get('/formulario', formulario)
      .post('/formulario', validacionRegistroUser, processFormulario)
      .get('/password-lost', password)

module.exports = router;

var express = require('express');
var router = express.Router();
const { login, formulario, password, processFormulario, processLogin, logout}=require('../controllers/usersController');
const validacionRegistroUser = require('../validators/val_users/validacionRegistroUsers');
const validacionLoginUser = require('../validators/val_users/validacionLoginUsers');

/* GET home page. */
router
      .get('/login', login)
      .get('/formulario', formulario)
      .post('/formulario', validacionRegistroUser, processFormulario)
      .get('/password-lost', password)
      .post('/login', validacionLoginUser, processLogin)
      .get("/logout", logout)
      
module.exports = router;

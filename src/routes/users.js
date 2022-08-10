var express = require('express');
var router = express.Router();

const { login, formulario, password }=require('../controllers/usersController')

/* GET home page. */
router
      .get('/login', login)
      .get('/formulario', formulario)
      .get('/password-lost', password)

module.exports = router;

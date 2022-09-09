var express = require('express');
var router = express.Router();

const { home, ofertas, destacados, notAdmin }=require('../controllers/homeController')

/* GET home page. */
router
      .get('/', home)
      .get('/ofertas', ofertas)
      .get('/productosDestacados', destacados)
      .get('/notAdmin', notAdmin)

module.exports = router;

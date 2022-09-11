var express = require('express');
var router = express.Router();

const { home, ofertas, destacados, notAdmin,search}=require('../controllers/homeController')

/* GET home page. */
router
      .get('/', home)
      .get('/ofertas', ofertas)
      .get('/productosDestacados', destacados)
      .get('/notAdmin', notAdmin)
      .get('/search',search)

module.exports = router;

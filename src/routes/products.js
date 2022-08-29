var express = require('express');
var router = express.Router();

const { carrito, crearProducto, detalle, editarProducto,products,store} = require('../controllers/productsController');

/* GET home page. */
router
      .get('/carrito', carrito)
      .get('/crearProducto', crearProducto)
      .get('/detail/:id', detalle)
      .get('/editarProducto/:id', editarProducto)
      .get('/catalogo', products)
      .post('/store',store)

module.exports = router;
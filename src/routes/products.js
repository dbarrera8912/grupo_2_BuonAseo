var express = require('express');
var router = express.Router();

const { carrito, crearProducto, detalle, editarProducto,products,store, modificarProducto} = require('../controllers/productsController');

/* GET home page. */
router
      .get('/carrito', carrito)
      .get('/crearProducto', crearProducto)
      .get('/detail/:id', detalle)
      .get('/catalogo', products)
      .post('/store',store)
      .get('/editarProducto/:id', editarProducto)
      .put('/modificarProducto/:id', modificarProducto)

module.exports = router;
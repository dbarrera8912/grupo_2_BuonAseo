var express = require('express');
var router = express.Router();

const { carrito, crearProducto, detalle, editarProducto } = require('../controllers/productsController');

/* GET home page. */
router
      .get('/carrito', carrito)
      .get('/crearProducto', crearProducto)
      .get('/detalle', detalle)
      .get('/editarProducto', editarProducto)

module.exports = router;
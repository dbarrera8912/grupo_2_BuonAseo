// ************ Require's ************
var express = require('express');
var router = express.Router();

// ************ Middleware Require ************
const {uploadProducts} = require("../middlewares/mw_products/uploadProducts")
const validacionesProducts = require("../validators/val_products/productsValidator")

// ************ Controller Require ************
const { carrito, crearProducto, detalle, editarProducto,products,store, modificarProducto, destroy} = require('../controllers/productsController');

/* /products */
router
      .get('/carrito', carrito)
      .get('/detail/:id', detalle)
      .get('/catalogo', products)
      .get('/crearProducto', crearProducto)
      .post('/crearProducto', uploadProducts.single("imagen"), validacionesProducts, store)
      .get('/editarProducto/:id', editarProducto)
      .put('/modificarProducto/:id', uploadProducts.single("imagen"), validacionesProducts, modificarProducto)
      .delete('/eliminarProducto/:id', destroy)

module.exports = router;
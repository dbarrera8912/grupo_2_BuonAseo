// ************ Require's ************
var express = require('express');
var router = express.Router();

// ************ Middleware Require ************
const {uploadProducts} = require("../middlewares/mw_products/uploadProducts")
const validacionesProducts = require("../validators/val_products/productsValidator")
const guestMiddleware = require("../middlewares/mw_users/guestMiddleware")/* Middleware para no permitir ingresar a vistas si estamos logueado */
const authMiddleware = require("../middlewares/mw_users/authMiddleware")/* Middleware para no permitir ingresar a vistas si no estamos logueado */
const adminMiddleware = require("../middlewares/mw_users/adminMiddleware")/* Middleware para no permitir ingresar a vistas si no eres admin */

// ************ Controller Require ************
const { carrito, crearProducto, detalle, editarProducto,products,store, modificarProducto, destroy} = require('../controllers/productsController');

/* /products */
router
      .get('/carrito', authMiddleware, carrito)
      .get('/detail/:id', detalle)
      .get('/catalogo', products)
      .get('/crearProducto',authMiddleware, adminMiddleware, crearProducto)
      .post('/crearProducto', uploadProducts.single("imagen"), validacionesProducts, store)
      .get('/editarProducto/:id', authMiddleware, adminMiddleware, editarProducto)
      .put('/modificarProducto/:id', uploadProducts.single("imagen"), validacionesProducts, modificarProducto)
      .delete('/eliminarProducto/:id', authMiddleware, adminMiddleware, destroy)

module.exports = router;
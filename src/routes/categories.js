// ************ Require's ************
var express = require('express');
var router = express.Router();

// ************ Middleware Require ************
const validacionesCategories = require("../validators/val_categories/categoriesValidator")
const guestMiddleware = require("../middlewares/mw_users/guestMiddleware")/* Middleware para no permitir ingresar a vistas si estamos logueado */
const authMiddleware = require("../middlewares/mw_users/authMiddleware")/* Middleware para no permitir ingresar a vistas si no estamos logueado */
const adminMiddleware = require("../middlewares/mw_users/adminMiddleware")/* Middleware para no permitir ingresar a vistas si no eres admin */

// ************ Controller Require ************
const { crearCategoria,store,lista, editarCategoria, modificarCategoria, destroy,habilitarCategoria} = require('../controllers/categoriesController');

/* /products */
router
      .get('/crearCategoria',authMiddleware, adminMiddleware, crearCategoria)
      .post('/crearCategoria',authMiddleware, adminMiddleware, validacionesCategories, store)
      .get('/lista', authMiddleware, adminMiddleware, lista)
      .get('/editarCategoria/:id', authMiddleware, adminMiddleware, editarCategoria)
      .put('/modificarCategoria/:id', authMiddleware, adminMiddleware,validacionesCategories, modificarCategoria)
      .put('/eliminarCategoria', authMiddleware, adminMiddleware, destroy)
      .put('/habilitarCategoria', authMiddleware, adminMiddleware, habilitarCategoria)
module.exports = router;
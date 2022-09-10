// ************ Require's ************
var express = require('express');
var router = express.Router();

// ************ Middleware Require ************
const {uploadMetodos} = require("../middlewares/mw_footer/uploadFiles")
const validacionesAddMetodos = require("../validators/val_Footer/metodosAddValidator")
const validacionesPreguntas = require("../validators/val_Footer/preguntasValidator")
const guestMiddleware = require("../middlewares/mw_users/guestMiddleware")/* Middleware para no permitir ingresar a vistas si estamos logueado */
const authMiddleware = require("../middlewares/mw_users/authMiddleware")/* Middleware para no permitir ingresar a vistas si no estamos logueado */
const adminMiddleware = require("../middlewares/mw_users/adminMiddleware")/* Middleware para no permitir ingresar a vistas si no eres admin */

// ************ Controller Require ************
const { nosotros, puntos, terminos, boton, reclamos, comprar, politicas,
      preguntas, searchPregunta, agregarPregunta, escribirPregunta, editarPregunta, modificarPregunta, eliminarPregunta,
      pagos, agregarPagos, escribirPagos, editarPagos, modificarPagos, eliminarPagos } = require('../controllers/footerController')

// ************ Rutas ************
/* /footer/... */
router
      .get('/nosotros', nosotros)
      .get('/politicas', politicas)
      .get('/puntos', puntos)
      .get('/terminos', terminos)
      .get('/boton', boton)
      .get('/reclamos', reclamos)
      .get('/comprar', comprar)

      /* PAGOS */
      .get('/pagos', pagos)
      .get("/pagos/agregar", authMiddleware, adminMiddleware, agregarPagos)/* pagina agregar metodo de pago */
      .post("/pagos/agregar", uploadMetodos.array("img"), validacionesAddMetodos, escribirPagos)
      .get('/pagos/editar/:id', authMiddleware, adminMiddleware, editarPagos)/* pagina editar metodo */
      .put('/pagos/modificar/:id', uploadMetodos.array("img"), validacionesAddMetodos, modificarPagos)/* RUTA PUT editar metodo */
      .delete('/pagos/eliminar/:id', authMiddleware, adminMiddleware, eliminarPagos)/* RUTA DELETE eliminar metodo desde pagos*/

      /* PREGUNTAS */
      .get('/preguntas', preguntas)
      .get('/preguntas/search', searchPregunta) /* pagina de preguntas encontradas */
      .get('/preguntas/agregar', authMiddleware, adminMiddleware, agregarPregunta) /* pagina agregar pregunta */
      .post('/preguntas/agregar', validacionesPreguntas, escribirPregunta)/* RUTA POST agregar pregunta */
      .get('/preguntas/editar/:id', authMiddleware, adminMiddleware, editarPregunta)/* pagina editar pregunta */
      .put('/preguntas/modificar/:id', validacionesPreguntas, modificarPregunta)/* RUTA PUT editar pregunta */
      .delete('/preguntas/eliminar/:id', authMiddleware, adminMiddleware, eliminarPregunta)/* RUTA DELETE eliminar pregunta desde preguntasFrecuentes*/


module.exports = router;
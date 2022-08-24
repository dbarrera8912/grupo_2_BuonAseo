// ************ Require's ************
var express = require('express');
var router = express.Router();

// ************ Middleware Require ************
const {uploadMetodos} = require("../middlewares/mw_footer/uploadFiles")

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
      .get("/pagos/agregar", agregarPagos)/* pagina agregar metodo de pago */
      .post("/pagos/agregar", uploadMetodos.array("img"), escribirPagos)
      .get('/pagos/editar/:id', editarPagos)/* pagina editar metodo */
      .put('/pagos/modificar/:id', uploadMetodos.array("img"), modificarPagos)/* RUTA PUT editar metodo */
      .delete('/pagos/eliminar/:id', eliminarPagos)/* RUTA DELETE eliminar metodo desde pagos*/

      /* PREGUNTAS */
      .get('/preguntas', preguntas)
      .get('/preguntas/search', searchPregunta) /* pagina de preguntas encontradas */
      .get('/preguntas/agregar', agregarPregunta) /* pagina agregar pregunta */
      .post('/preguntas/agregar', escribirPregunta)/* RUTA POST agregar pregunta */
      .get('/preguntas/editar/:id', editarPregunta)/* pagina editar pregunta */
      .put('/preguntas/modificar/:id', modificarPregunta)/* RUTA PUT editar pregunta */
      .delete('/preguntas/eliminar/:id', eliminarPregunta)/* RUTA DELETE eliminar pregunta desde preguntasFrecuentes*/


module.exports = router;
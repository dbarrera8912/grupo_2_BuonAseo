var express = require('express');
var router = express.Router();

const { nosotros, puntos, terminos, boton, reclamos, comprar, pagos, preguntas, politicas, searchPregunta, agregarPregunta, escribirPregunta, editarPregunta, modificarPregunta, eliminarPregunta }=require('../controllers/footerController')

/* GET home page. */
router
      .get('/nosotros', nosotros)
      .get('/politicas', politicas)
      .get('/puntos', puntos)
      .get('/terminos', terminos)
      .get('/boton', boton)
      .get('/reclamos', reclamos)
      .get('/comprar', comprar)
      .get('/pagos', pagos)
      
      /* PREGUNTAS */
      .get('/preguntas', preguntas) 
      .get('/preguntas/search', searchPregunta) /* pagina de preguntas encontradas */
      .get('/preguntas/agregar', agregarPregunta) /* pagina agregar pregunta */
      .post('/preguntas/agregar', escribirPregunta)/* RUTA POST agregar pregunta */
      .get('/preguntas/editar/:id', editarPregunta)/* pagina editar pregunta */
      .put('/preguntas/modificar/:id', modificarPregunta)/* RUTA PUT editar pregunta */
      .delete('/preguntas/eliminar/:id', eliminarPregunta)/* RUTA DELETE eliminar pregunta desde preguntasFrecuentes*/


module.exports = router;
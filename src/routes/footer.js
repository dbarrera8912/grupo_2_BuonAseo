var express = require('express');
var router = express.Router();

const { nosotros, puntos, terminos, boton, reclamos, comprar, pagos, preguntas, politicas, searchPregunta, agregarPregunta, escribirPregunta, editarPregunta }=require('../controllers/footerController')

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
      .get('/preguntas', preguntas)
      .get('/preguntas/search', searchPregunta)
      .get('/preguntas/agregar', agregarPregunta)
      .post('/preguntas/agregar', escribirPregunta)
      .get('/preguntas/editar/:id', editarPregunta)


module.exports = router;
var express = require('express');
var router = express.Router();
const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({/* sirve para trabajar con imagenes */
      destination: (req, file, cb) => {/* Permite especificar el destino de la imagen */
            cb(null, path.join(__dirname, "../../public/img/footerImgs/metodosDePago"));
      },
      filename: (req, file, cb) => {/* Permite especificar el nombre de la imagen */
            cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);/* Date.now da un numero unico, contando en milisegundos a partir del 1970 // path.extname te da la extension del archivo */
      }
})
const uploadFile = multer ({storage});/* esta variable va a cargar con la funcion definida arriba */

const { nosotros, puntos, terminos, boton, reclamos, comprar, politicas,
      preguntas, searchPregunta, agregarPregunta, escribirPregunta, editarPregunta, modificarPregunta, eliminarPregunta,
      pagos, agregarPagos, escribirPagos, editarPagos, modificarPagos, eliminarPagos } = require('../controllers/footerController')

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
      .post("/pagos/agregar", uploadFile.array("img"), escribirPagos)
      .get('/pagos/editar/:id', editarPagos)/* pagina editar metodo */
      .put('/pagos/modificar/:id', uploadFile.array("img"), modificarPagos)/* RUTA PUT editar metodo */
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
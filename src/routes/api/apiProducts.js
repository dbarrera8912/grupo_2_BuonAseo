

const { all, getOne, getImagen } = require('../../controllers/api/apiProductsController');

const router = require('express').Router();

/* /api/products */

router
    .get('/',all)
    .get('/detail/:id',getOne)
    .get('/img/fotos-productos/:nameFolder/:image',getImagen)


module.exports = router




const { all, getOne, getAvatar } = require('../../controllers/api/apiProductsController');

const router = require('express').Router();

/* /api/products */

router
    .get('/',all)
    .get('/:id',getOne)
    .get('/imagen/:img',getAvatar)


module.exports = router


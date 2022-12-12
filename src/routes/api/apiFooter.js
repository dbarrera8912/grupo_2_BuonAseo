
const {questionAll,questionOne,paymentAll,paymentOne} = require('../../controllers/api/apiFooterController')
const router = require('express').Router();

/* /api/users */

router
    .get('/question/',questionAll)
    .get('/question/detail/:id',questionOne)
    .get('/payment/',paymentAll)
    .get('/payment/detail/:id',paymentOne)


module.exports = router
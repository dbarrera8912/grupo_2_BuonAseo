

const {addCart } = require('../../controllers/Api/apiCartController');

const router = require('express').Router();


/* /api/apiCart */

router
    .post('/',  addCart)


module.exports = router
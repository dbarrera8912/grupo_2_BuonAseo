

const {addCart,list} = require('../../controllers/Api/apiCartController');

const router = require('express').Router();


/* /api/apiCart */

router
    .post('/',  addCart)
    .get('/',  list)


module.exports = router
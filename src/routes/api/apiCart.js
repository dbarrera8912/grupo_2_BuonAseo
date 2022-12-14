

const {addCart,list,removeCart} = require('../../controllers/Api/apiCartController');

const router = require('express').Router();


/* /api/apiCart */

router
    .get('/',  list)
    .post('/',  addCart)
    .delete('/:id',  removeCart)
    


module.exports = router
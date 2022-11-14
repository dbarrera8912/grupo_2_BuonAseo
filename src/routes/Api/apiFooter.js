
const {all} = require('../../controllers/Api/apiFooterController')
const router = require('express').Router();

/* /api/users */

router
    .get('/',all)
   


module.exports = router
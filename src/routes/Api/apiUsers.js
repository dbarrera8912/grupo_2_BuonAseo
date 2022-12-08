const { all, getOne, getAvatar } = require('../../controllers/Api/apiUsersController');

const router = require('express').Router();

/* /api/users */

router
    .get('/',all)
    .get('/:id',getOne)
    .get('/avatar/:avatar',getAvatar)

    


module.exports = router


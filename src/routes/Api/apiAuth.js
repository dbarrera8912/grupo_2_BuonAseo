

const { signIn, signUp } = require('../../controllers/api/apiAuthController');

const router = require('express').Router();

/* /api/users */

router
    .get('/signin',signIn)
    .get('/signup',signUp)

module.exports = router
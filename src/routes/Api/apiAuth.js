

const { signIn, signUp } = require('../../controllers/api/apiAuthController');

const router = require('express').Router();

/* /api/users */

router
    .post('/signin',signIn)
    .post('/signup',signUp)

module.exports = router
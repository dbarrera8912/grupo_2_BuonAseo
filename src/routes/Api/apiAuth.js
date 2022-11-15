
const { signIn, signUp } = require('../../controllers/Api/apiAuthController');

const router = require('express').Router();

/* /api/auth */

router
    .post('/signin',signIn)
    .post('/signup',signUp)

module.exports = router
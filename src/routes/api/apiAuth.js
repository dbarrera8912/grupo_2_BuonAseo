

const { signIn, signUp, verifyEmail, verifyPassword, verifyName } = require('../../controllers/Api/apiAuthController');

const router = require('express').Router();
const authLogin = require('../../validators/api/loginAuth')
const authRegister = require('../../validators/api/registerAuth')
const checkAdminToken = require('../../middlewares/api/checkAdminToken')

/* /api/apiAuth */

router
    .post('/signin', authLogin, signIn)
    .post('/signup',authRegister,signUp)
    .post('/verify-email', verifyEmail)
    .post('/verify-password', verifyPassword)
    .post('/verify-name', verifyName)

module.exports = router
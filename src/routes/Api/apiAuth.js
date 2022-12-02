

const { signIn, signUp, verifyEmail, verifyPassword, verifyName, verifyEmailAndPassword } = require('../../controllers/Api/apiAuthController');

const router = require('express').Router();
const authLogin = require('../../validators/Api/loginAuth')
const authRegister = require('../../validators/Api/registerAuth')
const checkAdminToken = require('../../middlewares/Api/checkAdminToken')

/* /api/apiAuth */

router
    .post('/signin', authLogin, signIn)
    .post('/signup',authRegister,signUp)
    .post('/verify-email', verifyEmail)
    .post('/verify-passAndEmail', verifyEmailAndPassword)
    .post('/verify-name', verifyName)

module.exports = router
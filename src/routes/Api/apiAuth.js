

const { signIn, signUp } = require('../../controllers/Api/apiAuthController');

const router = require('express').Router();
const authLogin = require('../../validators/Api/loginAuth')
const authRegister = require('../../validators/Api/registerAuth')
const checkAdminToken = require('../../middlewares/Api/checkAdminToken')

/* /api/users */

router
    .post('/signin', authLogin,checkAdminToken, signIn)
    .post('/signup',authRegister,signUp)

module.exports = router
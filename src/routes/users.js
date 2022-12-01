// ************ Require's ************
var express = require('express');
var router = express.Router();

// ************ Middleware Require ************
const validacionRegistroUser = require('../validators/val_users/validacionRegistroUsers');
const validacionPerfilUser = require('../validators/val_users/validacionPerfilUser');
const validacionLoginUser = require('../validators/val_users/validacionLoginUsers');
const guestMiddleware = require("../middlewares/mw_users/guestMiddleware")/* Middleware para no permitir ingresar a vistas si estamos logueado */
const authMiddleware = require("../middlewares/mw_users/authMiddleware")/* Middleware para no permitir ingresar a vistas si no estamos logueado */
const {uploadAvatar} = require('../middlewares/mw_users/uploadAvatar')

// ************ Controller Require ************
const { login, formulario, password, processFormulario,processLoginGoogle,processLoginFacebook, processLogin, logout, profile, update, deleteAcc, remove}=require('../controllers/usersController');

// ************ Rutas ************
/* /users/... */
router
      .get('/formulario',guestMiddleware, formulario)
      .post('/formulario', validacionRegistroUser, processFormulario)
      .get('/login',guestMiddleware, login)
      .post('/login', validacionLoginUser, processLogin)
      .post('/facebookLogin', processLoginFacebook)
      .post('/googleLogin', processLoginGoogle)
      .get("/logout", authMiddleware, logout)
      .get('/password-lost', guestMiddleware, password)
      .get("/profile", authMiddleware, profile)
      .put('/update/:id',uploadAvatar.single('avatar'), validacionPerfilUser, update)
      .get("/delete", authMiddleware, deleteAcc)
      .delete("/delete/:id", authMiddleware, remove)
      
module.exports = router;

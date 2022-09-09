const {check, body} = require('express-validator');
const {cargarUsers} = require('../../data/db_users/db_users');


module.exports = [

    check('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un email válido'),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
]
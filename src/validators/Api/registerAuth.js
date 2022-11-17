const {check, body} = require('express-validator');
const db = require('../../database/models');

module.exports = [
    check('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio'),
    
    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ser un email válido')
        .custom( (value,{req}) => {
          return db.User.findOne({
            where : {
                email : value
            }
          }).then( user => {
                if(user) {
                    return Promise.reject()
                }
          }).catch( () => Promise.reject('El email ya se encuentra registrado'))
        })
        ,
    check('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
]
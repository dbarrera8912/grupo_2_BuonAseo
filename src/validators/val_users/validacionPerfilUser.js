const {check, body} = require('express-validator');

const db = require("../../database/models");

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min : 2
        }).withMessage('Mínimo 2 caracteres').bail()
        .isAlpha('es-ES').withMessage('Solo caracteres alfabéticos').bail()
        .custom((value, {req}) => {
            return db.User.findOne({
                where : {
                    name : value
                }
              }).then( user => {
                    if(user && user.id  === req.session.userLogged.id ? null : user) {
                        return Promise.reject()
                    }
              }).catch( () => Promise.reject('El nombre ya existe. Por favor, selecciona otro.'))
        }),
        
    check('password')
        .custom((value,{req})=>{
            if (value == "") {
                return true
            }else if(value.length >= 6 && value.length <= 12){
                return true
            }
            return false
        })
        .withMessage('La contraseña debe tener entre 6 y 12 caracteres'),

    body('password2')
        .custom((value,{req}) => {
            if(value !== req.body.password){
                return false
            }
            return true
        }).withMessage('Las contraseñas no coinciden')
    ]
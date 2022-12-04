const objectValidate = require("./objectValidate") 

module.exports = {
    notNull : objectValidate(true,"El campo es obligatorio (nulo)" ),
    notEmpty :objectValidate(true,"El campo no puede estar vacío" )
} 
<<<<<<< HEAD
//  traemos objectValidate y le asignamos mensajes por default
=======
//  traemos objectValidate y le asignamos mensajes por defaul
>>>>>>> home

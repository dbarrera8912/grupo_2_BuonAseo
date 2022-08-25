const {check} = require("express-validator")

module.exports = [
    check("icono")
        .notEmpty().withMessage("Debes ingresar un icono de fontAwesone").bail(),
    check("title")
        .notEmpty().withMessage("Debes ingresar un subtitulo").bail()
        .isLength({min : 5,max : 20}).withMessage('El subtitulo debe tener entre 5 y 20 caracteres'),
    check("letraAbajoS")
        .notEmpty().withMessage("Debes ingresar una breve descripcion").bail()
        .isLength({min : 5,max : 50}).withMessage('La descripcion debe tener entre 5 y 50 caracteres'),
]
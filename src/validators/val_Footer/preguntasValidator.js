const { check } = require("express-validator")

module.exports = [
    check("title")
        .notEmpty().withMessage("Debes ingresar una pregunta").bail()
        .isLength({ min: 5, max: 50 }).withMessage('La pregunta debe tener entre 5 y 50 caracteres'),
    check("response")
        .notEmpty().withMessage("Debes ingresar una respuesta").bail()
        .isLength({ min: 5, max: 100 }).withMessage('La respuesta debe tener entre 5 y 100 caracteres'),
]
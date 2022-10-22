const { check } = require("express-validator")

module.exports = [
    check("name")
        .notEmpty().withMessage("Debes ingresar un nombre").bail()
        .isLength({ min: 4, max: 100}).withMessage('Entre 4 y 100 caracteres')
]
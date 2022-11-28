const { check } = require("express-validator")

module.exports = [
    check("name")
        .notEmpty().withMessage("Debes ingresar un nombre").bail()
        .isLength({ min: 5, max: 100}).withMessage('Entre 5 y 100 caracteres'),

    check("idCode")
        .isNumeric({no_symbols : true,}).withMessage('Debe ser un número entero positivo'),

    check("price")
        .notEmpty().withMessage("Debes ingresar un precio").bail()
        .isNumeric({no_symbols : true,}).withMessage('Debe ser un número entero positivo'),

    check("discount")
        .isInt({min : 0,max: 100}).withMessage('El descuento no puede ser mayor que 100').bail()
        .isNumeric({no_symbols : true,}).withMessage('Debe ser un número entero positivo'),

    check("volume")
        .isNumeric({no_symbols : true,}).withMessage('Debe ser un número entero positivo'),   

    check("stock")
        .notEmpty().withMessage("Debes poner stock").bail()
        .isNumeric({no_symbols : true,}).withMessage('Debe ser un número entero positivo'),

    check("smell")
        .isLength({min:3,max: 100}).withMessage('Maximo 100 caracteres'),

    check("dimensions")
        .isLength({max: 100}).withMessage('Maximo 100 caracteres'),

    check("quantity")
        .notEmpty().withMessage("Debes poner una cantidad").bail()
        .isNumeric({no_symbols : true,}).withMessage('Debe ser un número entero positivo'),

    check("type")
        .isLength({max: 100}).withMessage('Maximo 100 caracteres'),

    check("description")
        .isLength({max: 200}).withMessage('Maximo 200 caracteres'),
]
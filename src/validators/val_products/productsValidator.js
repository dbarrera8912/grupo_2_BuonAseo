const { check } = require("express-validator")

module.exports = [
    check("name")
        .notEmpty().withMessage("Debes ingresar un nombre").bail()
        .isLength({ min: 5, max: 100}).withMessage('Entre 5 y 100 caracteres'),

    check("codigoid")
        .isNumeric({no_symbols : true,}).withMessage('Debe ser un número entero positivo'),

    check("precio")
        .notEmpty().withMessage("Debes ingresar un precio").bail()
        .isNumeric({no_symbols : true,}).withMessage('Debe ser un número entero positivo'),

    check("descuento")
        .isInt({min : 0,max: 100}).withMessage('El descuento no puede ser mayor que 100').bail()
        .isNumeric({no_symbols : true,}).withMessage('Debe ser un número entero positivo'),

    check("volumen")
        .isNumeric({no_symbols : true,}).withMessage('Debe ser un número entero positivo'),   

    check("stock")
        .notEmpty().withMessage("Debes poner stock").bail()
        .isNumeric({no_symbols : true,}).withMessage('Debe ser un número entero positivo'),

    check("aroma")
        .isLength({max: 100}).withMessage('Maximo 100 caracteres'),

    check("dimenciones")
        .isLength({max: 100}).withMessage('Maximo 100 caracteres'),

    check("cantidad")
        .notEmpty().withMessage("Debes poner una cantidad").bail()
        .isNumeric({no_symbols : true,}).withMessage('Debe ser un número entero positivo'),

    check("tipo")
        .isLength({max: 100}).withMessage('Maximo 100 caracteres'),

    check("descripcion")
        .isLength({max: 200}).withMessage('Maximo 200 caracteres'),
]
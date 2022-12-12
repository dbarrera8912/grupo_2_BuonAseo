const { addProduct, removeProduct, updateProduct} = require('../../controllers/api/apiCrudControllers');
const router = require('express').Router();

const {uploadProducts} = require("../../middlewares/mw_products/uploadProducts");
const validacionesProducts = require("../../validators/val_products/productsValidator");
const checkAdminToken = require('../../middlewares/api/checkAdminToken')

/* /api/crud */

    router.post('/agregarProducto', uploadProducts.single('image'), validacionesProducts,checkAdminToken, addProduct)
    router.put('/editarProducto/:id', uploadProducts.single('image'), validacionesProducts,checkAdminToken, updateProduct)
    router.delete('/eliminarProducto/:id',checkAdminToken, removeProduct)


module.exports = router
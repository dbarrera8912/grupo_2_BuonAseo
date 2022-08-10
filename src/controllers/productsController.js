module.exports={
    carrito : (req,res) => {
        return res.render('./products/carrito')
    },

    crearProducto : (req,res) => {
        return res.render('./products/crearProducto')
    },
    
    detalle : (req,res) => {
        return res.render('./products/detalle')
    },

    editarProducto : (req,res) => {
        return res.render('./products/editarProducto')
    }
}
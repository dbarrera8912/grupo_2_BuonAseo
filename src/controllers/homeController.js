const { loadProducts } = require('../data/dbModule');
module.exports = {
    home: (req, res) => {
        let products = loadProducts();

        let productosDescuento = products.filter(product => product.Descuento > 0)/* filtra productos con descuento */
        let productosEnOferta = productosDescuento.sort(() => {/* Desordena los productos para no mostrar siempre los mismos en home */
            return Math.random() - 0.5
        })

        let productosDestacados = products.sort(() => {/* Desordena los productos para no mostrar siempre los mismos en home */
            return Math.random() - 0.5
        })

        return res.render('./home/home', {
            productosDestacados,
            productosEnOferta
        })
    },

    ofertas: (req, res) => {
        return res.render('./home/oferta')
    },

    destacados: (req, res) => {
        return res.render('./home/productosDestacados')
    }
}
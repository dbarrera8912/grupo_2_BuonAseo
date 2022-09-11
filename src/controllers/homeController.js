const { loadProducts } = require('../data/db_productos/dbModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
module.exports = {
    home: (req, res) => {
        let userLogin = req.session.userLogin;
        let products = loadProducts();
        console.log(userLogin);
        let productosDescuento = products.filter(product => product.Descuento > 0)/* filtra productos con descuento */
        let productosEnOferta = productosDescuento.sort(() => {/* Desordena los productos para no mostrar siempre los mismos en home */
            return Math.random() - 0.5
        })

        let productosDestacados = products.sort(() => {/* Desordena los productos para no mostrar siempre los mismos en home */
            return Math.random() - 0.5
        })

        return res.render('./home/home', {
            productosDestacados,
            productosEnOferta,
            userLogin
        })
    },

    ofertas: (req, res) => {
        let products = loadProducts();
        let productosEnOferta = products.filter(product => product.Descuento > 0)
        return res.render('./home/oferta',{
            productosEnOferta
        })
    },

    destacados: (req, res) => {
        let products = loadProducts();
        return res.render('./home/productosDestacados',{
            products
        })
    },
    notAdmin: (req, res) => {
        return res.render('./home/notAdmin')
    },
    search: (req, res) => {
		// Do the magic
		let keywords = req.query.keywords;
		let products = loadProducts();
		let result = products.filter(produc => produc.Nombre.toLowerCase().includes(keywords.toLowerCase()));
	    return res.render('./home/results', {
			result,
			toThousand,
			keywords
		})
	}


}
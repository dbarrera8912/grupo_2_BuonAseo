const { loadProducts } = require('../data/db_productos/dbModule');
const db = require("../database/models/");
const { Op } = require("sequelize");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    home: (req, res) => {
        let userLogin = req.session.userLogin;
        console.log(userLogin);
        
        let products = loadProducts();
        
       /* let productosDescuento =  db.Product.findAll({
			where: {
				discount: {
					[Op.gt]: 0,
				},
			}
		});

        let productosEnOferta = db.Product.findAll({
			order: [["discount", "DESC"]],
		});

        let productosDestacados = db.Product.findAll({
			order: [["createdAt", "DESC"]],
		});

        Promise.all([productosDescuento, productosEnOferta, productosDestacados])
			.then(([productosDescuento, productosEnOferta, productosDestacados]) => {
				return res.render("./home/home", {
					productosEnOferta,
					productosDescuento,
                    productosDestacados,
					toThousand
				});
			})
			.catch((error) => console.log(error)); */

        
         let productosDescuento = products.filter(product => product.Descuento > 0) //filtra productos con descuento 
        
       let productosEnOferta = productosDescuento.sort(() => { //Desordena los productos para no mostrar siempre los mismos en home 
            return Math.random() - 0.5
        }) 

        let productosDestacados = products.sort(() => { //Desordena los productos para no mostrar siempre los mismos en home 
            return Math.random() - 0.5
        }) 

        return res.render('./home/home', {
            productosDestacados,
            productosEnOferta,
            userLogin
        }) 
    },

    ofertas: async (req, res) => {
        try {
            
        let productosEnOferta = await db.Product.findAll({
            where: {
				discount: {
					[Op.gt]: 0,
				},
			}
    })
        return res.render('./home/oferta',{
            productosEnOferta
        })
        } catch (error) {
            return console.log(error)
        }
        
    },

    destacados: async (req, res) => {
        
        try {
            let products = await db.Product.findAll()
            
            return res.render("./home/productosDestacados", {
					products,
					toThousand,
				});
			
        } catch (error) {
           return console.log(error)
        }
        
        
			
        /*let products = loadProducts();
        return res.render('./home/productosDestacados',{
            products
        })*/
    },
    notAdmin: (req, res) => {
        return res.render('./home/notAdmin')
    },
    search: (req, res) => {
		let { keywords } = req.query;
        
        try {
            let result = db.Product.findAll({
                where: {
                    [Op.or]: [
                        {
                            name: {
                                [Op.substring]: keywords,
                            },
                        },
                        {
                            description: {
                                [Op.substring]: keywords,
                            },
                        },
                    ],
                },
            })
                    return res.render("./home/results", {
                        toThousand,
                        keywords,
                        result
                    })
                }
        catch (error) {
        return console.log(error)
        }	
}
}	
        /* let keywords = req.query.keywords;
		let products = loadProducts();
		let result = products.filter(produc => produc.Nombre.toLowerCase().includes(keywords.toLowerCase()));
	    return res.render('./home/results', {
			result,
			toThousand,
			keywords
		})
	*/

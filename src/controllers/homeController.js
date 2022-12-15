const db = require("../database/models");
const { Op, Sequelize} = require("sequelize");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  home: async (req, res) => {
    let userLogin = req.session.userLogin;
    console.log(userLogin);

    //let products = loadProducts();

    try {
        /*let productosDescuento = products.filter(
      (product) => product.Descuento > 0
    ); //filtra productos con descuento

    let productosEnOferta = productosDescuento.sort(() => {
      //Desordena los productos para no mostrar siempre los mismos en home
      return Math.random() - 0.5;
    });

    let productosDestacados = products.sort(() => {
      //Desordena los productos para no mostrar siempre los mismos en home
      return Math.random() - 0.5;
    });*/

      let productosEnOferta = await db.Product.findAll({
        where: {
          discount: {
            [Op.gt]: 0,
          },
        },
        limit: 4,
      });

      let productosDestacados = await db.Product.findAll({
        order: [["createdAt", "ASC"]],
        limit: 4,
        offset: 4
      });

      return res.render("./home/home", {
        productosEnOferta,
        productosDestacados,
        userLogin,
        toThousand,
      });
    } catch (error) {
      console.log(error);
    }
  },

  ofertas: async (req, res) => {
    try {
      let productosEnOferta1 = await db.Product.findAll({
        where: {
          discount: {
            [Op.gt]: 0,
          },
        },
        limit: 4,
      });
      let productosEnOferta2 = await db.Product.findAll({
        where: {
          discount: {
            [Op.gt]: 0,
          },
        },
        limit: 4,
        offset: 4
      });
      let productosEnOferta3 = await db.Product.findAll({
        where: {
          discount: {
            [Op.gt]: 0,
          },
        },
        limit: 4,
        offset: 8
      });

      return res.render("./home/oferta", {
        productosEnOferta1,
        productosEnOferta2,
        productosEnOferta3,
        toThousand,
      });
    } catch (error) {
      return console.log(error);
    }
  },

  destacados: async (req, res) => {
    try {
      let productosDestacados1 = await db.Product.findAll({
        order : [['createdAt','DESC']],
        limit: 4,
      });
      let productosDestacados2 = await db.Product.findAll({
        order : [['createdAt','DESC']],
        limit: 4,
        offset: 4
      });
      let productosDestacados3 = await db.Product.findAll({
        order : [['createdAt','DESC']],
        limit: 4,
        offset: 8
      });
      return res.render("./home/productosDestacados", {
        productosDestacados1,
        productosDestacados2,
        productosDestacados3,
        toThousand,
      });
    } catch (error) {
      return console.log(error);
    }
    /*let products = loadProducts();
        return res.render('./home/productosDestacados',{
            products
        })*/
  },
  notAdmin: (req, res) => {
    return res.render("./home/notAdmin");
  },
  search: async (req, res) => {
    let { keywords } = await req.query;

    try {
      let result = await db.Product.findAll({
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
            {
              smell: {
                [Op.substring]: keywords,
              },
            },
          ],
        },
        include: ["category"],
      });

      return res.render("./home/results", {
        result,
        keywords,
        toThousand,
      });
    } catch (error) {
      return console.log(error);
    }
  },
};
/* let keywords = req.query.keywords;
		let products = loadProducts();
		let result = products.filter(produc => produc.Nombre.toLowerCase().includes(keywords.toLowerCase()));
	    return res.render('./home/results', {
			result,
			toThousand,
			keywords
		})
	*/

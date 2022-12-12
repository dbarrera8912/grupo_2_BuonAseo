const db = require("../../database/models");
module.exports = {
  list: async (req, res) => {
    try {
      let categories = await db.Category.findAll();

      return res.status(200).json({
        ok: true,
        data: categories,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Comunicate con el administrador",
      });
    }
  },
  listCount: async (req, res) => {
    try {
      /* Para el count de cantidad de categorias */
      let offset = ((req.query.pagina && req.query.pagina > 0 ? req.query.pagina : 1) * 6) - 6;
      let {count:countByCategories,rows:categories} = await db.Category.findAndCountAll({
        limit:6,
        offset:offset,
        
      });
      /* Count de cantidad de productos por categorias */
      let categorias = await db.Category.findAll({
        limit:6,
        offset:offset,
        include:[{association:"products"}],
      });

      categorias = categorias.map(category => {
        return {
          totalProducts : category.products.length,
          ...category.dataValues
        }
      })
      

      return res.status(200).json({
        ok: true,
        meta:{count:countByCategories},
        data:{categorias} 
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Comunicate con el administrador",
      });
    }
  },
};
const db = require("../../database/models");
module.exports = {
  getTotals: async (req, res) => {
    try {
      let usersTotal = await db.User.count();
      let productsTotal = await db.Product.count();
      let categoriesTotal = await db.Category.count();

      return res.status(200).json({
        ok: true,
        data: {
          usersTotal,
          productsTotal,
          categoriesTotal,
        },
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Comunicate con el administrador",
      });
    }
  },
};
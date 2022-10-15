'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_featured extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_featured.belongsTo(models.Product,{
        as : 'product',
        foreignKey : 'id_product'
      })
    }
  }
  Product_featured.init({
    id_product: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_featured',
    paranoid : true
  });
  return Product_featured;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    id_code: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    volume: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    smell: DataTypes.STRING,
    dimensions: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    date: DataTypes.DATE,
    id_category: DataTypes.INTEGER,
    id_brand: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
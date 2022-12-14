'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Carts.belongsTo(models.Cart_order,{
        as : 'cartOrder',
        foreignKey : 'cartOrderId',
      });

      Carts.belongsTo(models.Product, {
        as : 'product',
        foreignKey : 'productId'
      })
    }
  }
  Carts.init({
    quantity : DataTypes.INTEGER,
    cartOrderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Carts',
    paranoid : false
  });
  return Carts;
};
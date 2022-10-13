'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Detail_order.init({
    quantity: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    id_order: DataTypes.INTEGER,
    id_product: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detail_order',
    paranoid : true
  });
  return Detail_order;
};
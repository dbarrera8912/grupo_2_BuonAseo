const moment = require("moment");

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShippingPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
  }
  ShippingPrice.init({
    province: DataTypes.STRING,
    price: DataTypes.INTEGER,
    createdAt: {
      type:DataTypes.DATEONLY,
      get() {
        return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY');
      }
    }
  }, {
    sequelize,
    modelName: 'shipping_price',
    paranoid : true
  });
  return ShippingPrice;
};
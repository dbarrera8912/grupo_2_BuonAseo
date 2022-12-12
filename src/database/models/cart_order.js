'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart_order.hasMany(models.Carts,{
        foreignKey : 'cartOrderId',
        as : 'carts',
      })
      Cart_order.belongsTo(models.User, {
        foreignKey : 'userId',
        as : 'user'
      });
    }
  }
  Cart_order.init({
    date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status : DataTypes.STRING,
    createdAt: {
      type:DataTypes.DATEONLY,
      get() {
        return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY');
      }
    }
  }, {
    sequelize,
    modelName: 'Cart_order',
    paranoid : true
  });
  return Cart_order;
};
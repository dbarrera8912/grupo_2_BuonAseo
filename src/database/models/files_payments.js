'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Files_payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Files_payments.belongsTo(models.Payment_method,{
        as : 'payment_methods',
        foreignKey : 'id_payment'
      })
    }
  }
  Files_payments.init({
    file: DataTypes.STRING,
    id_payment: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Files_payments',
    paranoid : true
  });
  return Files_payments;
};
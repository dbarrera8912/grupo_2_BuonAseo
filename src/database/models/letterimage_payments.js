'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LetterImage_payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LetterImage_payments.belongsTo(models.Payment_method,{
        as : 'payment_methods',
        foreignKey : 'id_payment'
      })
    }
  }
  LetterImage_payments.init({
    letter: DataTypes.STRING,
    id_payment: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LetterImage_payments',
    paranoid : true
  });
  return LetterImage_payments;
};
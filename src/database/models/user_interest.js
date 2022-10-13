'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_interest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_interest.init({
    id_user: DataTypes.INTEGER,
    id_interest: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_interest',
    paranoid : true
  });
  return User_interest;
};
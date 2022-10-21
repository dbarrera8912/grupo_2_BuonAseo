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
      
      User_interest.belongsTo(models.Interest, {
        as : 'interest',
        foreignKey : 'id_interest'
      })
      User_interest.belongsTo(models.User, {
        as : 'user',
        foreignKey : 'id_user'
      })
    }
  }
  User_interest.init({
    id_user: DataTypes.INTEGER,
    id_interest: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_interest'
  });
  return User_interest;
};
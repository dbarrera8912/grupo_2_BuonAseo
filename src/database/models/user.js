'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    dni: DataTypes.INTEGER,
    birthday: DataTypes.DATE,
    nationality: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    avatar: DataTypes.STRING,
    is_admin: DataTypes.INTEGER,
    id_type_user: DataTypes.INTEGER,
    id_gender: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    paranoid : true
  });
  return User;
};
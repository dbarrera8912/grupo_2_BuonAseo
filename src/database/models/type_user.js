'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Type_user.hasMany(models.User,{
        as : 'user',
        foreignKey : 'id_type_user'
      })
    }
  }
  Type_user.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Type_user',
    paranoid : true
  });
  return Type_user;
};
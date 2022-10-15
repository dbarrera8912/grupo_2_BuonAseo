'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Interest.belongsTo(models.User_interest,{
        as : 'user_interest',
        foreignKey : 'id_interest'
      })
  }
  }
  Interest.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Interest',
    paranoid : true
  });
  return Interest;
};
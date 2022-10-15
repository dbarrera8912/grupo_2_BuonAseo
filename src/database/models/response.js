'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Response.hasMany(models.Question, {
        as : 'question',
        foreignKey : 'id_question'
      })
    }
  }
  Response.init({
    name: DataTypes.TEXT,
    id_question: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Response',
    paranoid : true
  });
  return Response;
};
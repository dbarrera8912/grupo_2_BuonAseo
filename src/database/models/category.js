const moment = require("moment");

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product,{
        as : 'products',
        foreignKey : 'id_category'
      })
    }
  }
  Category.init({
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    createdAt: {
      type:DataTypes.DATEONLY,
      get() {
        return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY');
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    paranoid : true
  });
  return Category;
};
'use strict';

const categoriesJson = require('../../data/db_productos/categorias.json');

const categories = categoriesJson.map(category => {
    return {
        name : category,
        createdAt : new Date()
    }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', categories, {})
 },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
 }
};

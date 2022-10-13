'use strict';

const brandsJson = require('../../data/db_productos/marcas.json');

const brands = brandsJson.map(brand => {
    return {
        name : brand,
        image: "",
        createdAt : new Date()
    }
})

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Brands', brands, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Brands', null, {});
  }
};

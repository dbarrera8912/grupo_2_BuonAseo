'use strict';

const categoryUserJson = require('../../data/db_users/categoriaUsuario.json');

const categoryUser = categoryUserJson.map(category => {
    return {
        name : category,
        createdAt : new Date()
    }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('type_users', categoryUser, {})
 },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('type_users', null, {});
 }
};

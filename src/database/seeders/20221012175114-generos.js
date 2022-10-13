'use strict';

const genderUserJson = require('../../data/db_users/genderUsers.json');

const genderUser = genderUserJson.map(gender => {
    return {
        name : gender,
        createdAt : new Date()
    }
})
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Genders', genderUser, {})
 },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Genders', null, {});
 }
};

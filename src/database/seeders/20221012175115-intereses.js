'use strict';

let interestsArray = [
  "jabones",
  "suavisantes",
  "lavandinas"]

const interests = interestsArray.map(interest => {
    return {
        name: interest,
        createdAt : new Date()
    }
})
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Interests', interests, {})
 },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Interests', null, {});
 }
};

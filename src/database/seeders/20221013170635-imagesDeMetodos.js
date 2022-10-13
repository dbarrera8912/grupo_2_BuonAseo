'use strict';

const imagesToPaymentsJson = require('../../data/db_footer/metodosImages.json');

const images = imagesToPaymentsJson.map(({file,id}) => {
    return {
        file,
        id_payment: id,
        createdAt : new Date()
    }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Files_payments', images, {})
 },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Files_payments', null, {});
 }
};

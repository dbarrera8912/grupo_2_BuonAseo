'use strict';

const letterImageToPaymentsJson = require('../../data/db_footer/metodosLetraAbajoImagen.json');

const letter = letterImageToPaymentsJson.map(({letter,id}) => {
    return {
        letter,
        id_payment: id,
        createdAt : new Date()
    }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('LetterImage_payments', letter, {})
 },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('LetterImage_payments', null, {});
 }
};

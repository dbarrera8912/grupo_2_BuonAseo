'use strict';

const metodosJson = require('../../data/db_footer/metodosDePago.json');

const metodos = metodosJson.map(({icono,titulo,letraAbajoTitulo,letraFullAbajo,letraAbajoDeImagen}) => {
    return {
        icon: icono,
        title: titulo,
        bottom_letter_title: letraAbajoTitulo,
        bottom_letter_full: letraFullAbajo,
        createdAt : new Date()
    }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('payment_methods', metodos, {})
 },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payment_methods', null, {});
 }
};

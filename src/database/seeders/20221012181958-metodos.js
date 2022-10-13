'use strict';

const metodosJson = require('../../data/db_footer/metodosDePago.json');

const metodos = metodosJson.map(({icono,titulo,letraAbajoTitulo,img,letraFullAbajo,letraAbajoDeImagen}) => {
    return {
        icon: icono,
        title: titulo,
        botton_letter_title: letraAbajoTitulo,
        image: img,
        botton_letter_full: letraFullAbajo,
        botton_letter_image: letraAbajoDeImagen,
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

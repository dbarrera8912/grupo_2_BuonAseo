'use strict';

const preguntasJson = require('../../data/db_footer/preguntas.json');

const preguntas = preguntasJson.map(({title,href,a}) => {
    return {
        title,
        href,
        a,
        createdAt : new Date()
    }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Questions', preguntas, {})
 },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
 }
};

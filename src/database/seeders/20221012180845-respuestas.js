'use strict';

const responsesToQuestionsJson = require('../../data/db_footer/responsesToQuestions.json');

const responses = responsesToQuestionsJson.map(({response,id}) => {
    return {
        name: response,
        id_question: id,
        createdAt : new Date()
    }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Responses', responses, {})
 },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Responses', null, {});
 }
};

'use strict';

const usersJson = require('../../data/db_users/users.json');

const typesUsersJson = require('../../data/db_users/categoriaUsuario.json');

const genderUsersJson = require('../../data/db_users/genderUsers.json');

const users = usersJson.map(({name, email, password,gender,phone, dni,birthday,
  nationality,postalCode,domicile,city,avatar}) => {
    return {
        name,
        email,
        password,
        phone,
        dni,
        birthday,
        nationality,
        postal_code: postalCode,
        address: domicile,
        city,
        avatar,
        is_admin: 0,
        id_type_user: 1,
        id_gender: gender ? genderUsersJson.indexOf(gender) + 1 : null,
        createdAt : new Date()
    }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', users, {})
 },

 async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
 }
};

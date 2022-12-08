'use strict';

const provinciasAndPrice = [ 
    {
   'province': "Neuquen",
   'price' : '50'
},
{
    'province': "Jujuy",
    'price' : '200'
 },
 {
    'province': "Tucumán",
    'price' : '400'
 },
 {
    'province': "Tierra del Fuego",
    'price' : '1500'
 },
 {
    'province': "Santiago del Estero",
    'price' : '400'
 },
 {
    'province': "Santa Fe",
    'price' : '200'
 },
 {
    'province': "Santa Cruz",
    'price' : '200'
 },
 {
    'province': "San Luis",
    'price' : '400'
 },
 {
    'province': "San Juan",
    'price' : '300'
 },
 {
    'province': "Salta",
    'price' : '300'
 }
 ,
 {
    'province': "Río Negro",
    'price' : '100'
 }
 ,
 {
    'province': "Misiones",
    'price' : '300'
 }
 ,
 {
    'province': "Mendoza",
    'price' : '200'
 }
 ,
 {
    'province': "La Rioja",
    'price' : '400'
 }
 ,
 {
    'province': "La Pampa",
    'price' : '300'
 }
 ,
 {
    'province': "Formosa",
    'price' : '300'
 }
 ,
 {
    'province': "Catamarca",
    'price' : '400'
 }
 ,
 {
    'province': "Chaco",
    'price' : '300'
 }
 ,
 {
    'province': "Chubut",
    'price' : '300'
 }
 ,
 {
    'province': "Córdoba",
    'price' : '300'
 }
 ,
 {
    'province': "Corrientes",
    'price' : '200'
 }
 ,
 {
    'province': "Entre Ríos",
    'price' : '400'
 }

]

const provinces = provinciasAndPrice.map(({province, price}) => {
    return {
        province,
        price,
        createdAt : new Date(),  
        updatedAt: null,
        deletedAt: null
    }
})

console.log(">>>>>>>>>>>>" + provinces)
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Shipping_prices', provinces, {})
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Shipping_prices', null, {});
  }
};

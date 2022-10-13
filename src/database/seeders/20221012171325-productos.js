'use strict';

const productsJson = require('../../data/db_productos/productos.json');

const categoriesJson = require('../../data/db_productos/categorias.json');


const products = productsJson.map(({Nombre, Codigoid,Precio,Categoria,Descuento,Volumen,Stock,Aroma,Dimenciones,
  Cantidad,tipo,Descripcion,Image}) => {
    return {
        name: Nombre,
        idCode: Codigoid,
        price: Precio,
        discount: Descuento,
        volume: Volumen,
        stock: Stock,
        smell: Aroma,
        dimensions: Dimenciones,
        quantity: Cantidad,
        type: tipo,
        description : Descripcion,
        image: Image,
        id_category : categoriesJson.indexOf(Categoria) + 1,
        createdAt : new Date()
    }
})

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Products', products, {});
    
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Products', null, {});
    
  }
};

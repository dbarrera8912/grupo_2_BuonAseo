const db = require("../../database/models");
const path = require('path')
const {validationResult} = require('express-validator')
const { sendSequelizeError, createError, createErrorExpress } = require('../../helpers');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


module.exports = {
  addProduct: async (req, res) => {
  
    const {name, idCode, price, discount, volume, stock, smell, dimensions, quantity, type, description, status, image, id_Category} = req.body
    try {

        let errors = validationResult(req)
        errors = errors.mapped()

        if (req.fileValidationError) {
            errors = { ...errors, img: { msg: req.fileValidationError } }
        }
       
      let product = await db.Product.create(
        {
            name : name,
            idCode : idCode,
            price: price,
            discount : discount,
            volume: volume,
            stock: stock,
            smell : smell,
            dimensions: dimensions,
            quantity: quantity,
            type: type,
            description: description,
            status : 1,
            image : image,
            id_Category : id_Category
        }
      );
    
      return res.status(201).json({
        ok: true,
        data: product
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Comunicate con el administrador",
      });
    }
  },
  updateProduct: async (req, res) => {
    const {name, idCode, price, discount, volume, stock, smell, dimensions, quantity, type, description, status, image, id_Category} = req.body
    const {id} = req.params.id
    try {
    
        let errors = validationResult(req)
        errors = errors.mapped()

        if (req.fileValidationError) {
            errors = { ...errors, img: { msg: req.fileValidationError } }
        }
        if (Object.entries(errors).length === 0) {

          const {name, idCode, price, discount, description, categoryId, volume, stock, smell, image, quantity, dimensions, type} = req.body;

          let productModify = await db.Product.findByPk(req.params.id);

          productModify.name = name?.trim() || productModify.name;
          productModify.price = price || productModify.price;
          productModify.discount = discount || productModify.discount;
          productModify.description = description?.trim() || productModify.description;
          productModify.type = type || productModify.type;
          productModify.idCode = idCode || productModify.idCode;
          productModify.volume = volume || productModify.volume;
          productModify.stock = stock || productModify.stock;
          productModify.smell = smell || productModify.smell;
          productModify.image = image || productModify.image;
          productModify.quantity = quantity || productModify.quantity;
          productModify.dimensions = categoryId || productModify.categoryId;
          productModify.categoryId = categoryId || productModify.categoryId;

        }
          await productModify.save();

          if(req.files && req.files.length){
              req.files.forEach(async (file, index) => {
                  if(product.image[index]){
                      fs.existsSync(path.join(__dirname,'..','..','public','img','fotos-productos',product.image[index].file)) && fs.unlinkSync(path.join(__dirname,'..','..','public','images','products',product.images[index].file))

                      product.image[index].file = file.filename;
                      product.image[index].dataValues.url = `${req.protocol}://${req.get('host')}/products/image/${file.filename}`
                      await product.image[index].save();

                  }
              });
          }


        
    
      return res.status(201).json({
        ok: true,
        data: productModify
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Comunicate con el administrador",
      });
    }
  },
  removeProduct: async (req, res) => {
    const {id} = req.params
    try {

        let productoRemove = await db.Product.findByPk(id);

        await productoRemove.destroy()

        return res.status(200).json({
            ok : true,
            msg : 'Producto eliminado con éxito!',
        })
        
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || "Comunicate con el administrador",
      });
    }
  },
};

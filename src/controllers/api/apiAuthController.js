const db = require("../../database/models");
const { Op } = require('sequelize');
const {validationResult} = require('express-validator');
const { sendSequelizeError, createError, createErrorExpress } = require("../../helpers");


module.exports = {
  crearMensaje: async (req, res) => {
    try {

     
      let errors = await validationResult(req);
      console.log(errors)
      if(!errors.isEmpty()){
        throw createErrorExpress(errors, req)
      }
      

      const { name, email, message} = req.body;
// traemos el name, el email y el password del body

/* con el metodo create creamos un nuevo usuario
y le pasamos las propiedades que vengan por body 
*/
let id=[];
      const mensajeCreado = await db.User.create({ 
        id : id.find(),
        name: name && name.trim(),                               
        email: email && email.trim(),
        message: message && message.trim(),
      });

      /* retornamos el status y el token del usuario */
      return res.status(201).json({
        ok: true,
        status: 201,
        data: {
          mensajeCreado,
        },
      });
    } catch (error) { // atrapamos los errores que vengan de las validaciones y los retornamos
      let errors = sendSequelizeError(error);
      return res.status(error.status || 500).json({
        ok: false,
        errors,
      });
    }
  }, 
}

const { hashSync, compareSync } = require("bcryptjs");
const db = require("../../database/models");
const {validationResult} = require('express-validator');
const { sendSequelizeError, createError, createErrorExpress } = require("../../helpers");
const { sign } = require("jsonwebtoken");

module.exports = {
  signUp: async (req, res) => {
    try {

     
      let errors = await validationResult(req);
      console.log(errors)
      if(!errors.isEmpty()){
        throw createErrorExpress(errors, req)
      }
      

      const { name, email, password } = req.body;
// traemos el name, el email y el password del body

/* con el metodo create creamos un nuevo usuario
y le pasamos las propiedades que vengan por body 
y pasamos por defecto null a las que se cambiaran en update*/
      const { id, is_admin } = await db.User.create({ 
        name: name && name.trim(),                               
        email: email && email.trim(),
        password: hashSync(password.trim(), 10),
        gender: null,
        interests: null,
        phone: null,
        dni: null,
        birthday: null,
        nationality: null,
        postalCode: null,
        domicile: null,
        city: null,
        avatar: null,
        id_type_user: 1,
        is_admin: 0,
      });

      /*
     si pasa la validacion con sign() se crea un token cuando se crea un usuario con expiracion de 1hs
       */
      const token = sign(
        {
          id,
          is_admin,
        },
        process.env.SECRET_KEY_JWT,
        {
          expiresIn: "1h",
        }
      );
      /* retornamos el status y el token del usuario */
      return res.status(201).json({
        ok: true,
        status: 201,
        data: {
          token,
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
  signIn: async (req, res) => {
    try {
      let errors = await validationResult(req);
      console.log(errors)
      if(!errors.isEmpty()){
        throw createErrorExpress(errors, req)
      }
      
      const { email, password} = req.body;
/*validamos si el email o el password es falso y si es falso mandamos el error */
      if (!email || !password ) {
        throw createError(404, "Se require email y password");
      }
/* si pasa la validacion buscamos el usuario por email */
      let user = await db.User.findOne({
        where: {
          email
        },
      });

      /*   if(!user){
                    throw createError(401, 'El usuario no se encuentra registrado');
                }
                if(!compareSync(password, user.password)){
                    throw createError(401, 'La contraseña es incorrecta');
                } */

                /* validamos si el usuario o el password son falsos y mandamos el error */
      if (!user || !compareSync(password, user.password)) {
        throw createError(401, "Credenciales inválidas");
      }

      /*
      si pasa la validacion con sign() se crea un token cuando se crea un usuario con expiracion de 1hs
       */
      const token = sign(
        {
          id: user.id,
          is_admin: user.is_admin,
        },
        process.env.SECRET_KEY_JWT,
        {
          expiresIn: "1h",
        }
      );
    /* retornamos el status y el token del usuario */
      return res.status(200).json({
        ok: true,
        status: 200,
        data: token,
      });
    } catch (error) { // atrapamos los errores que vengan de las validaciones y los retornamos
      let errors = sendSequelizeError(error);
      return res.status(error.status || 500).json({
        ok: false,
        errors,
      });
    }
  },
};

const { sendSequelizeError, createError } = require("../../helpers");
const {verify} = require('jsonwebtoken')

const checkAdminToken = (req,res,next) => {

    try {

        const token = req.header('Authorization');

        if(!token){
            throw createError(401, 'El Token es requerido')
        }

        verify(token, process.env.SECRET_KEY_JWT,  function(err, decoded) {
            if(err){

                throw createError(403, "Token inválido")
            }
            
                req.userToken = decoded;

                if(req.userToken.rolId !== 1){
                    throw createError(403, "Acceso restringido solo a administradores.")
                }

          });


        next()
        
    } catch (error) {
        let errors = sendSequelizeError(error);
        return res.status(error.status || 500).json({
            ok: false,
            errors,
        });
    }

}

module.exports = checkAdminToken
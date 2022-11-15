const { hashSync, compareSync } = require("bcryptjs");
const db = require("../../database/models");
const { sendSequelizeError, createError } = require("../../helpers");
const { sign } = require("jsonwebtoken");


module.exports = {
    signUp: async (req, res) => {
        try {
          
            const {
                name,
                email,
                password
            } = req.body;

console.log(req.body)

            const { id, id_type_user } = await db.User.create({
                name: name.trim(),
                email: email.trim(),
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
                is_admin: 0
            });

        
            const token = sign(
                {
                    id,
                    id_type_user,
                },
                process.env.SECRET_KEY_JWT,
                {
                    expiresIn: "1h",
                }
            );

            return res.status(201).json({
                ok: true,
                status: 201,
                data: {
                    token},
            });
        } catch (error) {
            let errors = sendSequelizeError(error);
            return res.status(error.status || 500).json({
                ok: false,
                errors,
            });
        }
    },
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;

            if(!email || !password) {
                throw createError(404, 'Se require email y password');
            }

            let user = await db.User.findOne({
                where : {
                    email
                }
            });

          /*   if(!user){
                throw createError(401, 'El usuario no se encuentra registrado');
            }
            if(!compareSync(password, user.password)){
                throw createError(401, 'La contraseña es incorrecta');
            } */

            if(!user || !compareSync(password, user.password)){
                throw createError(401, 'Credenciales inválidas');
            }

            const token = sign(
                {
                    id : user.id,
                    id_type_user : user.id_type_user,
                },
                process.env.SECRET_KEY_JWT,
                {
                    expiresIn: "1h",
                }
            );

            return res.status(200).json({
                ok: true,
                status: 200,
                data: token,
            });


        } catch (error) {
            let errors = sendSequelizeError(error);
            return res.status(error.status || 500).json({
                ok: false,
                errors,
            });
        }
    },
};

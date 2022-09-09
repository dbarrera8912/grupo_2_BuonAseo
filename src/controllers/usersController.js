const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs')
const { crearUsers, cargarUsers, loadCategoriasUser } = require("../data/db_users/db_users");

module.exports = {
    login: (req, res) => {
        return res.render('./users/login', { req })
    },

    formulario: (req, res) => {
        const users = cargarUsers();
        const categorias = loadCategoriasUser();
        return res.render('./users/formulario', {
            users,
            categorias
        })
    },
    processFormulario: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const users = cargarUsers();

            const { name, email, password, password2 } = req.body;
            const newUser = {
                id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
                name: name.trim(),
                email: email.trim(),
                password: bcryptjs.hashSync(password.trim(), 10),
                password2: bcryptjs.hashSync(password.trim(), 10),
                category: null,
                avatar: null

            }

            const usersModify = [...users, newUser];

            crearUsers(usersModify);
            return res.redirect('/users/login')
        } else {
            return res.render('./users/formulario', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

    password: (req, res) => {
        return res.render('./users/password-lost')
    },

    processLogin: (req, res) => {
        let errors = validationResult(req).mapped();
        const users = cargarUsers();
        let userToLogin = users.find(oneUser => oneUser["email"] === req.body.email)/* buscamos si el email es igual a un email de nuestra base de datos */

        if (userToLogin) {
            let isOkTheClave = bcryptjs.compareSync(req.body.password, userToLogin.password)/* Comparamos si la clave es igual a la guardada con hash */
            
            if (isOkTheClave) {
                delete userToLogin.password;/* eliminamos la clave */
                delete userToLogin.password2;/* eliminamos la clave */
                req.session.userLogged = userToLogin;/* Guardamos el resto de datos del usuario en session */
                
                if (req.body.perdio) {/* preguntamos si marco la opcion de recordar */
                    res.cookie("buonaseo", req.body.email, {maxAge: (24000 * 60) * 60})/* implementamos cookie para guardar la sesion del usuario */
                }

                return res.redirect("/users/profile")
            }
            return res.render('./users/login', {
                errors: {
                    ...errors,
                    email: {
                        msg: "Las credenciales son invalidas"
                    }
                },
                old: req.body
            })
        } else {
            return res.render('./users/login', {
                errors:{
                    ...errors,
                    email: {
                        msg: "No se encuentra este email"
                    },
                },
                old: req.body
            })
        }
    },
    logout: (req, res) => {
        res.clearCookie("buonaseo")/* borra la cookie para mantener sesion */
        req.session.destroy(); /* borra automaticamente todo registro en session */
        return res.redirect("/");
    },
    profile: (req, res) => {
        return res.render("./users/profile");
    },
}
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

            const { name, email, password } = req.body;
            const newUser = {
                id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
                name: name.trim(),
                email: email.trim(),
                password: bcryptjs.hashSync(password.trim(), 10),
                gender: null,
                interests: null,
                phone: null,
                dni: null,
                birthday: null,
                nationality: null,
                postalCode: null,
                domicile: null,
                city: null,
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
                let { id, name, interests, avatar } = userToLogin
                req.session.userLogged = { id, name, interests, avatar };/* Guardamos el resto de datos del usuario en session */

                if (req.body.perdio) {/* preguntamos si marco la opcion de recordar */
                    res.cookie("buonaseo", req.session.userLogged, { maxAge: (24000 * 60) * 60 })/* implementamos cookie para guardar la sesion del usuario */
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
                errors: {
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
        let user = cargarUsers().find(user => user.id === req.session.userLogged.id)
        return res.render("./users/profile", {
            user/* guardamos los datos del usuario de session */
        });
    },
    update: (req, res) => {
        let errors = validationResult(req)
        errors = errors.mapped()

        if (req.fileValidationError) {
            errors = { ...errors, avatar: { msg: req.fileValidationError } }
        }
        if (Object.entries(errors).length === 0) {
            const { name, email, password, gender, interests, phone, dni, birthday, nationality, postalCode, domicile, city } = req.body;
            let usersModify = cargarUsers().map(user => {
                if (user.id === +req.params.id) {
                    return {
                        ...user,
                        ...req.body,
                        password: password ? bcryptjs.hashSync(password.trim(), 10) : user.password,
                        password2 :  password2 = () => {if(password2 == true || password2 == false){
                            return delete password2
                            }},
                        interests: interests && interests.length > 1 ? interests : [interests],
                        avatar: req.file ? req.file.filename : req.session.userLogged.avatar
                    }
                }
                return user
            });

            if (req.file && req.session.userLogged.avatar) {
                if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'img', 'fotos-users', req.session.userLogged.avatar))) {
                    fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'img', 'fotos-users', req.session.userLogged.avatar))
                }
            }
            
            req.session.userLogged = {
                ...req.session.userLogged,
                name,
                interests: interests ? interests:null,
                avatar: req.file ? req.file.filename : req.session.userLogged.avatar
            }
            
            res.cookie("buonaseo", req.session.userLogged, { maxAge: (24000 * 60) * 60 })
            crearUsers(usersModify);
            return res.redirect('/users/profile')
        }else {
            if (req.file) {
                if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'img', 'fotos-users', req.file.filename))) {
                    fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'img', 'fotos-users', req.file.filename))
                }
            }
           
            let user = cargarUsers().find(user => user.id === req.session.userLogged.id)
            return res.render('./users/profile', {
                user,
                errors,
            })
        }
    },
}
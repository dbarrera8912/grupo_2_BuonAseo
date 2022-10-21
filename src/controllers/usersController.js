const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs')
const moment = require("moment")

const db = require("../database/models");

module.exports = {
    login: (req, res) => {
        return res.render('./users/login', { req })
    },

    formulario: async (req, res) => {
        try {
            const categorias = await db.Type_user.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
            })

            return res.render('./users/formulario', {
                categorias
            })
        } catch (error) {
            return console.log(error)
        }
    },
    processFormulario: async (req, res) => {
        try {
            let errors = validationResult(req).mapped();

            if (Object.entries(errors).length === 0) {
                const { name, email, password } = req.body;

                db.User.create({
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
                })

                return res.redirect('/users/login')
            } else {
                return res.render('./users/formulario', {
                    errors: errors,
                    old: req.body
                })
            }
        } catch (error) {
            return console.log(error)
        }
    },

    password: (req, res) => {
        return res.render('./users/password-lost')
    },

    processLogin: async (req, res) => {

        try {
            let errors = validationResult(req).mapped();

            const users = await db.User.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
            })
            const interests = await db.Interest.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
            })
            const user_interest = await db.User_interest.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
            })
            let userToLogin = req.body.email.includes("@") ? users.find(oneUser => oneUser["email"] === req.body.email) : users.find(oneUser => oneUser["name"] === req.body.email)/* buscamos si el email es igual a un email de nuestra base de datos */

            if (userToLogin) {
                interestsToLogin = []
                user_interest.forEach(userInterest => {
                    userInterest.dataValues.id_user === userToLogin.id && userInterest.dataValues.id_interest === 1 && interestsToLogin.push("jabones")
                    userInterest.dataValues.id_user === userToLogin.id && userInterest.dataValues.id_interest === 2 && interestsToLogin.push("suavisantes")
                    userInterest.dataValues.id_user === userToLogin.id && userInterest.dataValues.id_interest === 3 && interestsToLogin.push("lavandinas")
                });

                let isOkTheClave = bcryptjs.compareSync(req.body.password, userToLogin.password)/* Comparamos si la clave es igual a la guardada con hash */

                if (isOkTheClave) {

                    let { id, name, avatar } = userToLogin
                    req.session.userLogged = { id, name, avatar, interestsToLogin };/* Guardamos el resto de datos del usuario en session */

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
        } catch (error) {
            return console.log(error)
        }
    },
    logout: (req, res) => {
        res.clearCookie("buonaseo")/* borra la cookie para mantener sesion */
        req.session.destroy(); /* borra automaticamente todo registro en session */
        return res.redirect("/");
    },
    profile: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.session.userLogged.id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
            })
            const user_interest = await db.User_interest.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
            })

            interestsToLogin = []
            user_interest.forEach(userInterest => {
                userInterest.dataValues.id_user === user.id && userInterest.dataValues.id_interest === 1 && interestsToLogin.push("jabones")
                userInterest.dataValues.id_user === user.id && userInterest.dataValues.id_interest === 2 && interestsToLogin.push("suavisantes")
                userInterest.dataValues.id_user === user.id && userInterest.dataValues.id_interest === 3 && interestsToLogin.push("lavandinas")
            });

            return res.render("./users/profile", {
                user,/* guardamos los datos del usuario de session */
                interestsToLogin,
                moment
            });
        } catch (error) {
            return console.log(error)
        }
    },
    update: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.session.userLogged.id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
            })

            let errors = validationResult(req)
            errors = errors.mapped()

            if (req.fileValidationError) {
                errors = { ...errors, avatar: { msg: req.fileValidationError } }
            }

            if (Object.entries(errors).length === 0) {
                let { name, password, phone, dni, birthday, nationality, postalCode, domicile, city, interests, gender } = req.body;
                db.User.update({
                    name: name.trim(),
                    password: password ? bcryptjs.hashSync(password.trim(), 10): user.password,
                    phone: phone ? +phone :  user.phone,
                    dni: +dni,
                    birthday: birthday ? birthday : user.birthday,
                    nationality: nationality.trim(),
                    postal_code: postalCode.trim(),
                    address: domicile.trim(),
                    city: city.trim(),
                    avatar: req.file ? req.file.filename : req.session.userLogged.avatar,
                    id_gender: gender === "m" ? 1 : gender === "f" ? 2 : gender === "o" ? 3 : null
                }, {
                    where: {
                        id: +req.params.id
                    }
                })

                await db.User_interest.destroy({
                    where: { 
                        id_user: req.session.userLogged.id,
                    }
                })
                if (interests) {
                    interestsToArray = typeof interests === "string" ? [interests] : interests

                    interestsToArray.forEach(interest => {
                        db.User_interest.create({
                            id_user: req.session.userLogged.id,
                            id_interest: interest === 'jabones' ? 1 : interest === 'suavisantes' ? 2 : interest === 'lavandinas' ? 3 : null
                        }, {
                            where: {
                                id_user: req.session.userLogged.id
                            }
                        })
                    });
                }

                if (req.file && req.session.userLogged.avatar) {
                    if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'img', 'fotos-users', req.session.userLogged.avatar))) {
                        fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'img', 'fotos-users', req.session.userLogged.avatar))
                    }
                }

                req.session.userLogged = {
                    ...req.session.userLogged,
                    name,
                    interestsToLogin: interests ? interests : null,
                    avatar: req.file ? req.file.filename : req.session.userLogged.avatar
                }

                res.cookie("buonaseo", req.session.userLogged, { maxAge: (24000 * 60) * 60 })
                return res.redirect('/users/profile')
            } else {
                if (req.file) {
                    if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'img', 'fotos-users', req.file.filename))) {
                        fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'img', 'fotos-users', req.file.filename))
                    }
                }

                const user = await db.User.findByPk(req.session.userLogged.id, {
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "deletedAt"],
                    },
                })
                const user_interest = await db.User_interest.findAll({
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "deletedAt"],
                    },
                })

                interestsToLogin = []
                user_interest.forEach(userInterest => {
                    userInterest.dataValues.id_user === user.id && userInterest.dataValues.id_interest === 1 && interestsToLogin.push("jabones")
                    userInterest.dataValues.id_user === user.id && userInterest.dataValues.id_interest === 2 && interestsToLogin.push("suavisantes")
                    userInterest.dataValues.id_user === user.id && userInterest.dataValues.id_interest === 3 && interestsToLogin.push("lavandinas")
                });

                return res.render("./users/profile", {
                    user,/* guardamos los datos del usuario de session */
                    interestsToLogin,
                    errors,
                    moment
                });
            }
        } catch (error) {
            return console.log(error)
        }
    },
    deleteAcc: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.session.userLogged.id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                },
            })
            return res.render("./users/deleteAcc", {
                user/* guardamos los datos del usuario de session */
            });
        } catch (error) {
            return console.log(error)
        }
    },
    remove: async (req, res) => {
        try {
            if (req.session.userLogged.avatar) {
                if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'img', 'fotos-users', req.session.userLogged.avatar))) {
                    fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'img', 'fotos-users', req.session.userLogged.avatar))
                }
            }
            await db.User.destroy({
                where: { id: req.session.userLogged.id }
            })

            res.clearCookie("buonaseo")/* borra la cookie para mantener sesion */
            req.session.destroy(); /* borra automaticamente todo registro en session */
            return res.redirect('/');
        } catch (error) {
            return console.log(error)
        }
    },
}
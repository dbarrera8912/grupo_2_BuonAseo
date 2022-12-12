const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs');
const moment = require("moment");

const db = require("../database/models");

const {consultasDBOptionData, consultasDBOptionUser, eliminarAvatarToUser, interestsToDBFunction} 
= require("../resources/users");

/* OPTIONS para consultas a database */
const optionUser = consultasDBOptionUser;
const optionData = consultasDBOptionData;

module.exports = {
    formulario: (req, res) => {
        return res.render('./users/formulario')
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

    login: (req, res) => {
        return res.render('./users/login')
    },

    processLoginFacebook: async (req, res) => {
        try {
            let email = (req.body.facebookEmail).replaceAll('"', "");
        const user = await db.User.findOne({
            where: {
                email:email
            },
            attributes: optionData,
            include: optionUser
        });
        const { id, name, avatar,  } = user;
        req.session.userLogged = { id, name, avatar, interestsToLogin };/* Guardamos el resto de datos del usuario en session */ 

       return res.redirect("/users/profile");
        }catch (error) {
            return console.log(error)
        }
    },
    processLoginGoogle: async (req, res) => {
        try {
            let email = (req.body.googleEmail).replaceAll('"', "");
        const user = await db.User.findOne({
            where: {
                email:email
            },
            attributes: optionData,
            include: optionUser
        });
        const { id, name, avatar, interestsToLogin } = user;
        req.session.userLogged = { id, name, avatar, interestsToLogin };/* Guardamos el resto de datos del usuario en session */ 

       return res.redirect("/users/profile");
        }catch (error) {
            return console.log(error)
        }
    },
    processLogin: async (req, res) => {
        try {
                let errors = validationResult(req).mapped();
            
                const user = req.body.email.includes("@") ? 
                await db.User.findOne({
                    where: {
                        email : req.body.email
                    },
                    attributes: optionData,
                    include: optionUser
                }) 
                :
                await db.User.findOne({
                    where: {
                        name : req.body.email
                    },
                    attributes: optionData,
                    include: optionUser
                })
                

                if (Object.entries(errors).length === 0) {
                    interestsToLogin = interestsToDBFunction(user.dataValues.interest)
                    
                    let { id, name, avatar } = user;
                      
                    /* carrito */
                    const cart = await db.Cart_order.findOne({
                        where : {
                        userId : id,
                        },
                        include : [
                        {
                            association : 'carts',
                            attributes : ['id','quantity'],
                            include : [
                            {
                                association : 'product',
                                attributes : ['id','name','price','discount','image'],

                            }
                            ]
                        }
                        ]
                    });
                    let cartOrder;
                    if(cart) {
                
                        cartOrder = {
                        id : cart.id,
                        total : cart.total,
                        items : cart.carts
                        }
                    }else {
        
                        db.Cart_order.create({
                        date : new Date(),
                        total : 0,
                        userId : id,
                        status : "inicial"
                        }).then(order => {
                        
                        cartOrder = {
                            id : order.id,
                            total : order.total,
                            items : []
                        }
                        })
                    }

                    req.session.userLogged = { id, name, avatar, interestsToLogin,cartOrder};/* Guardamos el resto de datos del usuario en session */
                    
                    if (req.body.perdio) {/* preguntamos si marco la opcion de recordar */
                        res.cookie("buonaseo", req.session.userLogged, { maxAge: (24000 * 60) * 60 })/* implementamos cookie para guardar la sesion del usuario */
                    }
                    
                    return res.redirect("/users/profile")
                } else {
                    return res.render('./users/login', {
                        errors,
                        old: req.body
                    })
            }
        } catch (error) {
            return console.log(error)
        }
    },

    profile: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.session.userLogged.id, {
                attributes: optionData,
                include: optionUser
            })

            interestsToLogin = interestsToDBFunction(user.dataValues.interest)

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
                attributes: optionData,
            })
            const interestsToDatabase = await db.Interest.findAll({
                attributes: optionData,
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
                    password: password ? bcryptjs.hashSync(password.trim(), 10) : user.password,
                    phone: phone ? +phone : user.phone,
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
                    let interestsToArray = typeof interests === "string" ? [interests] : interests
                    interestsToDatabase.forEach(interest => {
                        if (interestsToArray.includes(interest.dataValues.name)) {
                            db.User_interest.create({
                                id_user: req.session.userLogged.id,
                                id_interest: interest.dataValues.id
                            }, {
                                where: {
                                    id_user: req.session.userLogged.id
                                }
                            })
                        }
                    });
                }

                if (req.file && req.session.userLogged.avatar) {
                    eliminarAvatarToUser(req.session.userLogged.avatar)
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
                    eliminarAvatarToUser(req.file.filename)
                }

                const user = await db.User.findByPk(req.session.userLogged.id, {
                    attributes: optionData,
                    include: optionUser
                })

                interestsToLogin = interestsToDBFunction(user.dataValues.interest)

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
                attributes: optionData,
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
                eliminarAvatarToUser(req.session.userLogged.avatar)
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

    password: (req, res) => {
        return res.render('./users/password-lost')
    },

    logout: (req, res) => {
        res.clearCookie("buonaseo")/* borra la cookie para mantener sesion */
        req.session.destroy(); /* borra automaticamente todo registro en session */
        return res.redirect("/");
    },
}
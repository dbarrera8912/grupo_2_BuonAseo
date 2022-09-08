const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs')
const { crearUsers, cargarUsers, loadCategoriasUser} = require("../data/db_users/db_users");

module.exports={
    login : (req,res) => {
        return res.render('./users/login', {req})
    },

    formulario : (req,res) => {
        const users = cargarUsers();
        const categorias = loadCategoriasUser();
        return res.render('./users/formulario', {
            users,
            categorias
        })
    },
    processFormulario : (req,res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
        const users = cargarUsers();

        const {name, email,password, password2} = req.body;
           const newUser = {
                id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
                name : name.trim(),
                email : email.trim(),
                password : bcryptjs.hashSync(password.trim(),10),
                password2 : bcryptjs.hashSync(password.trim(),10),
                category: null,
                avatar : null
                                
           }

           const usersModify = [...users, newUser];
    
           crearUsers(usersModify);
           return res.redirect('/users/login')
        }else {
            return res.render('./users/formulario', {
                errors : errors.mapped(),
                old : req.body
            })
        }
    },
    
    password : (req,res) => {
        return res.render('./users/password-lost')
    },

    processLogin : (req,res) => {
        let errors = validationResult(req);
        console.log(errors)
        if(errors.isEmpty()){

            let user = cargarUsers().find(user => user.email === req.body.email && user.password == req.body.password);
            if(typeof user == 'undefined'){
                return res.render('./users/login',{
                    errors : 'incorrecto'
                })
            }
            let id = user.id;
            let name = user.name;
            let category = user.category;
            let avatar = user.avatar;
            req.session.userLogin = {
                id,
                name,
                category,
                avatar
            }
            //console.log(req.session.userLogin);
            if(req.body.perdio){
                res.cookie('buonaseo',req.session.userLogin,{
                    maxAge : 1000 * 60
                })
            }

            return res.redirect('/')
        }else {
            return res.render('./users/login',{
                errors : errors.mapped()
            })
        }
    }
}
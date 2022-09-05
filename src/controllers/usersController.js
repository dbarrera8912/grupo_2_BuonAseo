const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const bcryptjs = require('bcryptjs')
const { crearUsers, cargarUsers, loadCategoriasUser} = require("../data/db_users/db_users");

module.exports={
    login : (req,res) => {
        return res.render('./users/login')
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
    }
}
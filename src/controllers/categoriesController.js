const db = require("../database/models");
const { Op, Sequelize} = require("sequelize");
const { validationResult } = require("express-validator") /* Requerimos check de express-validador, body es lo mismo que check */


module.exports = { 
    crearCategoria: (req, res) => {
        res.render('./categories/crearCategoria');
    },
    
    lista: (req, res) => {
        let Category = db.Category.findAll();
        Promise.all([Category])
            .then(([categories]) => {console.log(categories);res.render('./categories/lista', {
                categories
            })})
            .catch(error => console.log(error))
    },
    // Crear Categorias
    store: (req, res) => {
        let errors = validationResult(req)
        errors = errors.mapped()

        if (Object.entries(errors).length === 0) {
            const { name} = req.body;


            db.Category.create({
                name : name.trim(),

            })
                .then(category => {
                    return res.redirect('/categories/lista')
                })
                .catch(error => console.log(error))
        } else {
            console.log(req.body)
            //Error de validation
            res.render('./categories/crearCategoria', {errors,old: req.body});
        }
    },
    editarCategoria: (req, res) => {
        let Category = db.Category.findByPk(req.params.id);
        Promise.all([Category])
            .then(([category]) => {console.log(category);res.render('./categories/editarCategoria', {
                category
            })})
            .catch(error => console.log(error))
    },
    modificarCategoria: (req, res) => {
        let errors = validationResult(req)
        errors = errors.mapped()
        //Si no hay error
        if (Object.entries(errors).length === 0) {
            const {name} = req.body;

            db.Category.update({
                name : name.trim(),
                
            },
                {where:{id:req.params.id}})
                .then(product => {
                    //Si subio una imagen al formulario , vuelve a hacer update para editar la ruta.
                    return res.redirect('/categories/lista/')
                })
                .catch(error => console.log(error))
        }
        //Si HAY errores
        else {
            let Category = db.Category.findByPk(req.params.id);
            Promise.all([Category])
            .then(([category]) => res.render('./categories/editarCategoria', {
                category,errors
            }))
            .catch(error => console.log(error))
        }
    },
    destroy: (req, res) => {

        db.Category.update({
            status:0
        },{where:{id:req.body.id}})
            .then( () => {
                return res.redirect('/categories/lista')
            })
            .catch(error => console.log(error))
    },
    habilitarCategoria: (req, res) => {

        db.Category.update({
            status:1
        },{where:{id:req.body.id}})
            .then( () => {
                return res.redirect('/categories/lista')
            })
            .catch(error => console.log(error))
    }
}
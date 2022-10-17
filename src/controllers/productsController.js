const { loadProducts, insertProduct, eliminarImg, loadCategorias} = require('../data/db_productos/dbModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models");
const { validationResult } = require("express-validator") /* Requerimos check de express-validador, body es lo mismo que check */

module.exports = { 
    products: (req, res) => {
        let products = db.Product.findAll({
			include : ['category']
		});
        Promise.all([products])
			.then(([products]) => res.render('./products/catalogo', {
				products,
				toThousand
			}))
			.catch(error => console.log(error))
        console.log(products)
    },
    carrito: (req, res) => {
        return res.render('./products/carrito')
    },

    crearProducto: (req, res) => {
        let Category = db.Category.findAll();
        Promise.all([Category])
            .then(([categories]) => res.render('./products/crearProducto', {
                categories
            }))
            .catch(error => console.log(error))
    },

    // Crear producto
    store: (req, res) => {
        let errors = validationResult(req)
        errors = errors.mapped()

        if (req.fileValidationError) {
            errors = { ...errors, img: { msg: req.fileValidationError } }
        }

        if (Object.entries(errors).length === 0) {
            const { name, category, idCode, dimensions, price, volume, smell, quantity, stock, type, description, discount } = req.body;

            /*const newProduct = {
                Id: products[products.length - 1].Id + 1,
                Nombre: name.trim(),
                Codigoid: codigoid ? +codigoid : null,
                Precio: +precio,
                Categoria: categoria ? categoria : null,
                Descuento: descuento ? +descuento : 0,
                Volumen: volumen ? +volumen : null,
                Stock: +stock,
                Aroma: aroma ? aroma.trim() : "---",
                Dimenciones: dimenciones ? dimenciones : null,
                Cantidad: +cantidad,
                tipo: tipo ? tipo.trim() : null,
                Descripcion: descripcion ? descripcion.trim() : null,
                Image: req.file ? `/img/fotos-productos/productsAdd/${req.file.filename}` : null
            }*/

            db.Product.create({
                name : name.trim(),
                price,
                idCode,
                dimensions,
                volume, 
                smell, 
                quantity, 
                stock, 
                type,
                discount,
                description,
                image:`/img/fotos-productos/productsAdd/${req.file.filename}`,
                id_category : category
            })
                .then(product => {
                    return res.redirect('/products/catalogo')
                })
                .catch(error => console.log(error))
        } else {
            //Error de validation
            if (req.file) {
                eliminarImg(`/img/fotos-productos/productsAdd/${req.file.filename}`)
            }
            let Category = db.Category.findAll();
            Promise.all([Category])
                .then(([categories]) => res.render('./products/crearProducto', {
                    errors,
                    old: req.body,
                    categories
                }))
                .catch(error => console.log(error))
        }
    },

    detalle: (req, res) => {
        let product = db.Product.findByPk(req.params.id,{
			include : ['category']
		});
        Promise.all([product])
        .then(([product]) => res.render('./products/detalle', {
            product,
            toThousand
        }))
        .catch(error => console.log(error))
    },

    editarProducto: (req, res) => {
        let product = db.Product.findByPk(req.params.id,{
			include : ['category']
		});
        let Category;
        
        Promise.all([product])
        .then(([productToEdit]) => {
            Category = db.Category.findAll();
            Promise.all([Category])
            .then(([categorias]) => res.render('./products/editarProducto', {
                productToEdit,categorias
                }))
            .catch(error => console.log(error))
            }
        )
    },
    modificarProducto: (req, res) => {
        let errors = validationResult(req)
        errors = errors.mapped()
        if (req.fileValidationError) {
            errors = { ...errors, img: { msg: req.fileValidationError } }
        }

        if (Object.entries(errors).length === 0) {
            const { name, category, idCode, dimensions, price, volume, smell, quantity, stock, type, description, discount, } = req.body;
            if (req.file) {
                let product = db.Product.findByPk(req.params.id,{
                    include : ['category']
                });
                Promise.all([product])
                .then(([prod]) => 
                    eliminarImg(prod.image)
                )
                .catch(error => console.log(error))
            }
            db.Product.update({
                name : name.trim(),
                price,
                idCode,
                dimensions,
                volume, 
                smell, 
                quantity, 
                stock, 
                type,
                discount,
                description,
                image:`/img/fotos-productos/productsAdd/${req.file.filename}`,
                id_category : category
            },{where:{id:req.params.id}})
                .then(product => {
                    return res.redirect('/products/detail/'+ req.params.id)
                })
                .catch(error => console.log(error))
        } else {
            if (req.file) {
                eliminarImg(`/img/fotos-productos/productsAdd/${req.file.filename}`)
            }

            let product = db.Product.findByPk(req.params.id,{
                include : ['category']
            });
            let Category;
            Promise.all([product])
            .then(([productToEdit]) => {
                Category = db.Category.findAll();
                Promise.all([Category])
                .then(([categorias]) => res.render('./products/editarProducto', {
                    productToEdit,categorias,errors
                    }))
                .catch(error => console.log(error))
                }
            )
        }
    },

    destroy: (req, res) => {
        loadProducts().forEach(product => {
            if (product.Id === +req.params.id) {
                eliminarImg(product.Image)
            }
        });
        let productsModify = loadProducts().filter(produc => produc.Id !== +req.params.id)
        insertProduct(productsModify);
        return res.redirect('/products/catalogo')

    }


}
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
                categoryId : category
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
        let productToEdit = loadProducts().find(produc => produc.Id === +req.params.id)
        return res.render('./products/editarProducto', {
            productToEdit,
            categorias: loadCategorias().sort()
        })
    },
    modificarProducto: (req, res) => {
        let errors = validationResult(req)
        errors = errors.mapped()
        
        if (req.fileValidationError) {
            errors = { ...errors, img: { msg: req.fileValidationError } }
        }

        if (Object.entries(errors).length === 0) {
            let products = loadProducts()
            const { name, categoria, codigoid, dimenciones, precio, volumen, aroma, cantidad, stock, tipo, descripcion, descuento } = req.body;

            let productsModify = products.map(products => {
                if (products.Id === +req.params.id) {
                    if (req.file) {
                        eliminarImg(products.Image)
                    }

                    return {
                        Id: products.Id,
                        Nombre: name.trim(),
                        Codigoid: +codigoid,
                        Precio: +precio,
                        Categoria: categoria,
                        Descuento: +descuento,
                        Volumen: +volumen,
                        Stock: +stock,
                        Aroma: aroma.trim(),
                        Dimenciones: dimenciones,
                        Cantidad: +cantidad,
                        tipo: tipo.trim(),
                        Descripcion: descripcion.trim(),
                        Image: req.file ? `/img/fotos-productos/productsAdd/${req.file.filename}` : products.Image
                    }
                }
                return products
            })
            insertProduct(productsModify);
            return res.redirect('/products/detail/' + req.params.id)
        } else {
            if (req.file) {
                eliminarImg(`/img/fotos-productos/productsAdd/${req.file.filename}`)
            }

            let productToEdit = loadProducts().find(produc => produc.Id === +req.params.id)
            return res.render('./products/editarProducto', {
                productToEdit,
                errors,
                categorias: loadCategorias().sort()
            })
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
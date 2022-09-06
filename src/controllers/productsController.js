const { loadProducts, insertProduct, eliminarImg, loadCategorias} = require('../data/db_productos/dbModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const { validationResult } = require("express-validator") /* Requerimos check de express-validador, body es lo mismo que check */

module.exports = { 
    products: (req, res) => {
        let products = loadProducts();
        return res.render('./products/catalogo', {
            products,
            toThousand
        })
    },
    carrito: (req, res) => {
        return res.render('./products/carrito')
    },

    crearProducto: (req, res) => {
        return res.render('./products/crearProducto',{
            categorias: loadCategorias().sort()
        })
    },

    // Crear producto
    store: (req, res) => {
        let errors = validationResult(req)
        errors = errors.mapped()

        if (req.fileValidationError) {
            errors = { ...errors, img: { msg: req.fileValidationError } }
        }

        if (Object.entries(errors).length === 0) {
            const { name, categoria, codigoid, dimenciones, precio, volumen, aroma, cantidad, stock, tipo, descripcion, descuento } = req.body;
            let products = loadProducts();

            const newProduct = {
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
            }

            const newProducts = [...products, newProduct];
            insertProduct(newProducts);
            return res.redirect("/products/catalogo")
        } else {
            if (req.file) {
                eliminarImg(`/img/fotos-productos/productsAdd/${req.file.filename}`)
            }

            return res.render('./products/crearProducto', {
                errors,
                old: req.body,
                categorias: loadCategorias().sort()
            })
        }

    },

    detalle: (req, res) => {
        let products = loadProducts();
        let product;
        products.forEach((item) => {
            if (item.Id == req.params.id) {
                product = item;
            }
        });
        console.log(product.Nombre);
        return res.render('./products/detalle', {
            product,
            toThousand
        })
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
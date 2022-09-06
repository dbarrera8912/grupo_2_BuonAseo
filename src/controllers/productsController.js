const { loadProducts, insertProduct, eliminarImg } = require('../data/db_productos/dbModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
        return res.render('./products/crearProducto')
    },

    // Crear producto
    store: (req, res) => {
        let errors
        if (req.fileValidationError) {
            errors = { ...errors, img: { msg: req.fileValidationError } }
        }

        if (!req.fileValidationError) {
            const { name, categoría, codigoid, dimenciones, precio, volumen, aroma, cantidad, stock, tipo, descripcion, descuento } = req.body;
            let products = loadProducts();

            const newProduct = {
                Id: products[products.length - 1].Id + 1,
                Nombre: name.trim(),
                Codigoid: codigoid ? codigoid : null,
                Precio: +precio,
                Categoria: categoría ? categoría : null,
                Descuento: descuento ? descuento : null,
                Volumen: volumen ? volumen : null,
                Stock: stock,
                Aroma: aroma ? aroma.trim() : null,
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
            
            return res.render('./products/crearProducto', {
                errors
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
            productToEdit
        })
    },
    modificarProducto: (req, res) => {
        let errors
        if (req.fileValidationError) {
            errors = { ...errors, img: { msg: req.fileValidationError } }
        }

        if (!req.fileValidationError) {
            let products = loadProducts()
            const { name, imagen, categoría, codigoid, dimenciones, precio, volumen, aroma, cantidad, stock, tipo, descripcion, descuento } = req.body;

            let productsModify = products.map(products => {
                if (products.Id === +req.params.id) {
                    if (req.file) {
                        eliminarImg(products.Image)
                    }

                    return {
                        Id: products.Id,
                        Nombre: name.trim(),
                        Codigoid: codigoid,
                        Precio: precio,
                        Categoria: categoría,
                        Descuento: descuento,
                        Volumen: volumen,
                        Stock: stock,
                        Aroma: aroma,
                        Dimenciones: dimenciones,
                        Cantidad: cantidad,
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
            let productToEdit = loadProducts().find(produc => produc.Id === +req.params.id)
            return res.render('./products/editarProducto', {
                productToEdit,
                errors
            })
        }
    },

    destroy: (req, res) => {
        let productsModify = loadProducts().filter(produc => produc.Id !== +req.params.id)
        insertProduct(productsModify);
        return res.redirect('/products/catalogo')

    }


}
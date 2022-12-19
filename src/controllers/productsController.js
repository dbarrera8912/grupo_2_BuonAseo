const { loadProducts, insertProduct, eliminarImg, loadCategorias} = require('../data/db_productos/dbModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require("../database/models");
const { Op, Sequelize} = require("sequelize");
const { validationResult } = require("express-validator") /* Requerimos check de express-validador, body es lo mismo que check */
const querystring = require('querystring');  
const { ofertas } = require('./homeController');
module.exports = { 
    products: (req, res) => {

        let options = {status:1}
        if(req.query.cat && req.query.cat > 0){
            options = {status:1,id_category:req.query.cat};
        }
        let products = db.Product.findAll({
            include : ['category'],
            where:options
        });
        
        Promise.all([products])
			.then(([products]) => res.render('./products/catalogo', {
				products,
				toThousand
			}))
			.catch(error => console.log(error))
    },
    //Es igual al catalogo pero cuando viene desde el borrar o crear producto (ALERTAS)
    productsAlert: (req, res) => {
        
        let products = db.Product.findAll({
			include : ['category'],
            where:{status:1}
		});
        
        let product = db.Product.findByPk(req.params.id);
        
        Promise.all([products,product])
			.then(([products,product]) => {
                
                res.render('./products/catalogo', {
                    products,
                    toThousand,
                    product,
                    type:req.query.type,
                })
                
        })
			.catch(error => console.log(error))
    },
    productsDeleted: (req, res) => {
        let products = db.Product.findAll({
			include : ['category'],
            where:{status:0}
		});
        Promise.all([products])
			.then(([products]) => res.render('./products/productosEliminados', {
				products,
				toThousand
			}))
			.catch(error => console.log(error))
    },
    
    carrito: async (req, res) => {
        
        let ShippingPrice = await db.shipping_price.findAll();
        return res.render('./products/carrito',{ShippingPrice})
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


            db.Product.create({
                name : name.trim(),
                price,
                idCode,
                dimensions: dimensions ? dimensions : null,
                volume, 
                smell, 
                quantity, 
                stock, 
                type,
                discount,
                description,
                image: req.file ? `/img/fotos-productos/productsAdd/${req.file.filename}` : null,
                status : 1,
                id_category : category ? category : null
            })
                .then(product => {
                    const query = new URLSearchParams('type=create');
                    return res.redirect('/products/catalogo/'+product.id+'?'+ query)
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

    detalle: async (req, res) => {
        console.log(req.session);
        let product = db.Product.findOne({
			include : ['category'],
            where:{id:req.params.id,status:1}
		});
        let productosEnOferta = await db.Product.findAll({
            where: {
              discount: {
                [Op.gt]: 0,
              },
            },
          });
    
        let productosDestacados = await db.Product.findAll({
            order: [["createdAt", "ASC"]],
          });
        //randomizar un array de objetos
        //cantidad tiene el indice maximo ej: 15
        //el indice minimo es obviamente 0 
        let maxOferta = productosEnOferta.length - 1;
        let maxDestacados = productosDestacados.length - 1;
        //va a guardar 3 numeros aleatorios , pero arranca vacio
        let arrayOfertas = [];
        let arrayDestacados = [];
        
        //While pasa tantas veces hasta que el arrayOfertas tenga 3 numeros        
        while (arrayOfertas.length != 3) {
            //Un numero aleatorio entre el minimo:0 y el maximo:15
            let indiceAleatorio = Math.floor(Math.random() * (maxOferta - 0 + 1) + 0);
            //                                  0.3423123  *    15
            //Si no existe el numero aleatorio en el array, entonces lo agregamos
            if(arrayOfertas.includes(indiceAleatorio) == false  && req.params.id != productosEnOferta[indiceAleatorio].dataValues.id){
                arrayOfertas.push(indiceAleatorio);
            }
        }
        while (arrayDestacados.length != 3) {
            //Un numero aleatorio entre el minimo:0 y el maximo:15
            let indiceAleatorio = Math.floor(Math.random() * (maxDestacados - 0 + 1) + 0);
            //                                  0.3423123  *    15
            //Si no existe el numero aleatorio en el array Y el productoAletorio es distinto al producto del detalle , entonces lo agregamos
            if(arrayDestacados.includes(indiceAleatorio) == false && req.params.id != productosDestacados[indiceAleatorio].dataValues.id){
                arrayDestacados.push(indiceAleatorio);
            }
        }
        //termina el while, y tenemos 3 numeros aleatorios 

        //Traeme los 3 indices aleatorios en forma de un nuevo array, usando filter
        const ofertasAleatorias = productosEnOferta.filter((element,index) => arrayOfertas.includes(index)!= false);
        const destacadosAleatorios = productosDestacados.filter((element,index) => arrayDestacados.includes(index) != false);


        let type = req.query.type ?? "";
        Promise.all([product])
        .then(
            function(product){
                product = product[0];
                res.render('./products/detalle', {product,toThousand,type,destacadosAleatorios,ofertasAleatorias})
            }
        )
        .catch(error => console.log(error))
    },
    enableProduct:(req,res)=>{

        const {id} = req.body;
        db.Product.update({
            status:1
        },
            {where:{id:id}})
            .then(product => {
                const query = new URLSearchParams('type=enable');
                return res.redirect('/products/catalogo/'+id+'?'+ query)
            })
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
        //Si no hay error
        if (Object.entries(errors).length === 0) {
            const { name, category, idCode, dimensions, price, volume, smell, quantity, stock, type, description, discount, } = req.body;
            //Encuentra el producto por editar para tener la ruta de image y elimina la image
            //SOLAMENTE lo hace si se sube un archivo en el formulario.
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
                id_category : category
            },
                {where:{id:req.params.id}})
                .then(product => {
                    //Si subio una imagen al formulario , vuelve a hacer update para editar la ruta.
                    if(req.file){
                        db.Product.update({
                            
                            image:`/img/fotos-productos/productsAdd/${req.file.filename}`},
                            {where:{id:req.params.id}})
                        .then(product => {});
                    }
                    const query = new URLSearchParams('type=edit');
                    return res.redirect('/products/detail/'+ req.params.id+'?'+ query)
                })
                .catch(error => console.log(error))
        }
        //Si HAY errores
        else {
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

        db.Product.update({
            status:0
        },{where:{id:req.params.id}})
            .then( () => {
                const query = new URLSearchParams('type=delete');
                return res.redirect('/products/catalogo/'+req.params.id+'?'+ query)
            })
            .catch(error => console.log(error))
    }


}
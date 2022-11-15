const { render } = require("ejs")
const db = require('../../database/models');
const path = require('path');
const category = require("../../database/models/category");
module.exports = {
    all : async (req,res) => {
        /* devuelve todos los productos */
        try {
            //opcion1 es la configuracion para el findAndCountAll que va a traer cantidad de productos por categoria.
            let opcion1 = {
                group:"id_category",
                include:[{association:"category",attributes:["name"]}]
                };
            //a diferencia del FindAll que trae todas las filas
            //findAndCountAll trae el count(cantidad de resultados NUMERICO) y rows(Filas) 
            const {count,rows} = await db.Product.findAndCountAll(opcion1);

            //La otra opcion2, es exclusivo para traer todos los productos
            let opcion2 = {
                include:[{association:"category"}]
                };
            const {count:countByProducts,rows:products} = await db.Product.findAndCountAll(opcion2);
            
            //Todo esto es para juntar por un lado 
            // la cantidad de productos por categorias [    5,      2,      7,      3]
            // + el nombre de la categoria          ["lavandina","jabon","trapos","escobas"]
            //Vienen separados y los juntamos en el for creando un nuevo array. categorias
            let categorias = [];
            for (let index = 0; index < count.length; index++) {
                let objeto = {count:count[index].count,categoria:rows[index].category.dataValues.name}
                categorias.push(objeto);//Empuja un elemento nuevo al array
            }
            return res.status(200).json({
				ok : true,
				meta : {
					count : countByProducts,
					countByCategory : categorias,
				},
				data : products
			})
        } catch (error) {
            //let errors = sendSequelizeError(error);

            return res.status(error.status || 500).json({
                ok: false,
                error,
            });
        }
    },
    getOne : async (req,res) => {
        /* devuelve solo un producto */
        try {
            let options = {
                where:[
                    {id : req.params.id}
                ],
                include:[
                    {
                        association : 'category',

                    }
                ]
            };
            //FindByPk solamente recibe un id findByPk(req.params.id)
            //FindOne es muy similar a ByPk(trae uno) pero hay que escribirle el where (condicion) 
            //y tambien puede recibir include, y otras opciones de consultas

            //Si queres una consulta simple de traer uno por id, findByPk
            //Si queres una consulta mas amplia y con mas configuraciones (excluir columnas,incluir asociacion, etc)
            //Hay que usar findOne
            let product = await db.Product.findOne(options);
            return res.status(200).json({
                ok: true,
                meta: {
                    status : 200,
                    url: "api/products/id",
                    
                },
                data: {
                    product,
                }
            });
            }   
            catch (error) {
                return res.status(error.status || 500).json({
                meta:{
                    status: 500,
                    msg: error.message
                }
                });
            }
    },
    getImagen : async (req,res) => {
        /* devuelve la imagen del producto */
        /*let imagen = path.join(__dirname, '..','..','public','images','products',"1" );
        return res.status(200).json({
            ok: true,
            meta: {
                status : 200,
                url: "api/products/imagen",
                
            },
            data: {
                imagen,
            }
        });*/
        //console.log(path.join(__dirname, '..','..','public','images','products',"1" ));
        console.log(res.sendFile(path.join(__dirname, '..','..','public','images','products',"1" )))
        return res.sendFile(path.join(__dirname, '..','..','public','images','products',"1" ))
    }
}
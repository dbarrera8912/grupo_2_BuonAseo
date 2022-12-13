const { render } = require("ejs")
const db = require('../../database/models');
const path = require('path');
const { literal, Op } = require('sequelize');
const category = require("../../database/models/category");
module.exports = {
    all : async (req,res) => {
        /* devuelve todos los productos */
        try {
            let {page = 1} = req.query;
            let limit = 6;
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
                limit:limit,
                offset: (page - 1)*limit,
                include:[{association:"category"}],
                attributes:{
                    include: [
                        [literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products',image)`), 'avatarURL'],
                    ]
                },
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
            let next = parseInt(page) + 1;
            let previous = parseInt(page) - 1;
            previous_path = "http://localhost/api/products/?page="+ previous;
            next_path = "http://localhost/api/products/?page="+ next;
            if(previous == 0){
                previous_path = "404 not found";
            }
            return res.status(200).json({
				ok : true,
				meta : {
					count : countByProducts,
					countByCategory : categorias,
                    next: next_path,
                    previous:previous_path,
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
                ],
                attributes:{
                    include: [
                        [literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products',image)`), 'avatarURL'],
                    ]
                }
            };
            //FindByPk solamente recibe un id findByPk(req.params.id)
            //FindOne es muy similar a ByPk(trae uno) pero hay que escribirle el where (condicion) 
            //y tambien puede recibir include, y otras opciones de consultas

            //Si queres una consulta simple de traer uno por id, findByPk
            //Si queres una consulta mas amplia y con mas configuraciones (excluir columnas,incluir asociacion, etc)
            //Hay que usar findOne
            let product = await db.Product.findOne(options);
            let image_path = product.image;
            
            return res.status(200).json({
                ok: true,
                meta: {
                    status : 200,
                    url: "api/products/detail",
                    category:  product.category,
                    image_path: image_path
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
        return res.sendFile(path.join(__dirname, '..', '..', '..', 'public', 'img', 'fotos-productos', req.params.nameFolder, req.params.image))
        /*
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
            let product = await db.Product.findOne(options);
            let nombre_carpeta = "";
            let nombre_archivo = "";
            if(product.category.id == 3 || product.category.id == 2 || product.category.id == 4){
                nombre_carpeta = product.category.name+"s";
                nombre_archivo = product.category.name+"-imagen-";
            }
            else if(product.category.id == 5){
                nombre_carpeta = "liquido-para-pisos";
                nombre_archivo = "liquidoP-imagen-";
            }
            else if(product.category.id == 1){
                nombre_carpeta = "jabones";
                nombre_archivo = product.category.name+"-imagen-";
            }
            let image_path = path.join(__dirname, '..', '..','..','public','img','fotos-productos',nombre_carpeta,nombre_archivo+req.params.id+".png").toLowerCase();
            console.log(image_path);
            return res.sendFile(path.join(image_path))
            }   
            catch (error) {
                return res.status(error.status || 500).json({
                meta:{
                    status: 500,
                    msg: error.message
                }
                });
            }*/
        
        
    }
}
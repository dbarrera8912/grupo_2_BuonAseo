const { render } = require("ejs")
const db = require('../../database/models');
const path = require('path');
module.exports = {
    all : async (req,res) => {
        /* devuelve todos los productos */
        try {
            return res.status(200).json({
				ok : true,
				meta : {
					total : count,
					quantity : products.length,
					page,
					prev, 
					next
				},
				data : products
			})
        } catch (error) {
            let errors = sendSequelizeError(error);

            return res.status(error.status || 500).json({
                ok: false,
                errors,
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
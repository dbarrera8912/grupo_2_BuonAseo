const db = require('../../database/models');

module.exports = {
    list : async (req,res) => {
        try {

            return res.status(200).json({
                ok: true,
                data : req.session.orderCart || null
            })
            
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || ''
            })
        }
    },
    addCart : async (req,res) => {
        try {
            console.log(req.body);
            const {id} = req.body;
            console.log(req.session);
            //Buscar un producto en el carrito DB que coincida con el que quiere agregar.
            let item = req.session.orderCart.items.find(item => item.product.id === +id);

            //Si ya existe el producto en el carrito
            if(item) {
                //Lo modifica le suma +1 en cantidad
                await db.Cart.update(
                    {
                        quantity : item.quantity + 1
                    },
                    {
                      where : {
                        id : item.id
                      }  
                    }
                )

                //Busca el producto en la session y le suma +1
                const itemsModify = req.session.orderCart.items.map(element => {
                    if(element.id === item.id){
                        element.quantity = element.quantity + 1;
                        return element
                    }

                    return element
                })

                //Modifica la session para que tenga un producto +1 en cantidad
                req.session.orderCart = {
                    ...req.session.orderCart,
                    items : itemsModify
                }

            }
            //Si no existe el producto en el carritoDB
            else {
                //Lo crea 
               const newCart = await db.Cart.create({
                    quantity : 1,
                    productId : id,
                    orderId : req.session.orderCart.id
               });
               //Busca la nueva fila del carrito
               const cartItem = await db.Cart.findByPk(newCart.id, {
                attributes : ['id','quantity'],
                include : [
                  {
                    association : 'product',
                    attributes : ['id','name','price','discount'],
                    include : ['image']
                  }
                ]
               });
               //Agrega la nueva fila de carrito(nuevo producto) a la session
               req.session.orderCart = {
                ...req.session.orderCart,
                items : [
                    ...req.session.orderCart.items,
                    cartItem
                ]
               }

            }

            return res.status(201).json({
                ok : true,
            })

            
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || 'Comunicate con Buonaseo'
            })
        }
    },
    removeQuantity : async (req,res) => {

        try {

            const {id} = req.params;

            let item = req.session.orderCart.items.find(item => item.product.id === +id);

            if(item.quantity === 1){
                await db.Cart.destroy({
                    where :{
                        id : item.id
                    }
                });

                const itemsModify = req.session.orderCart.items.filter(element => element.id !== +item.id)

                req.session.orderCart = {
                    ...req.session.orderCart,
                    items : itemsModify
                   }
            }else{

                await db.Cart.update(
                    {
                        quantity : item.quantity - 1
                    },
                    {
                        where : {
                            id : item.id
                        }
                    }
                )

                const itemsModify = req.session.orderCart.items.map(element => {
                    if(element.id === item.id){
                        element.quantity = element.quantity - 1;
                        return element
                    }

                    return element
                })

                req.session.orderCart = {
                    ...req.session.orderCart,
                    items : itemsModify
                   }

            }

            return res.status(201).json({
                ok : true,
                data : req.session.orderCart || null
            })
            
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok : false,
                msg : error.message || ''
            })
        }
    },
    removeAllItems : async (req,res) => {

    }
}
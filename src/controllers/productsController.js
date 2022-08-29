const {loadProducts,insertProduct} = require('../data/dbModule');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
module.exports={
    products: (req, res) => {
		let products = loadProducts();
		return res.render('./products/catalogo', {
			products,
			toThousand
		})
	},
    carrito : (req,res) => {
        return res.render('./products/carrito')
    },

    crearProducto : (req,res) => {
        return res.render('./products/crearProducto')
    },
    
    // Crear producto
	store: (req, res) => {
		const {name, imagen, categoria, codigoid, dimenciones,precio,volumen,aroma,cantidad,stock,tipo,descripcion,descuento} = req.body;
		let products = loadProducts();

		const newProduct = {
			Id : products[products.length -1].Id + 1,
			Nombre : name.trim(),
            Codigoid:codigoid,
			Precio : precio,
			Categoria : categoria,
			Descuento:descuento,
            Volumen:volumen,
			Stock : stock,
            Tipo:tipo.trim(),
			Aroma : aroma,
            Dimenciones:dimenciones,
            Cantidad:cantidad,
            Descripcion:descripcion.trim(),
            Image: imagen
		}

		products = [...products, newProduct];
        let respuesta = insertProduct(products);
        if(respuesta){
            return res.render('./products/crearProducto')
        }
        else{
            return res.render('./products/crearProducto?error=si')
        }
        
	},

    detalle : (req,res) => {
        let products = loadProducts();
        let product;
        products.forEach( (item)=>{
            if(item.Id == req.params.id){
                product = item;
            }
        });
        console.log(product.Nombre);
		return res.render('./products/detalle', {
			product,
			toThousand
		})
    },

    editarProducto : (req,res) => {
        let productToEdit = loadProducts().find(produc => produc.Id === +req.params.id)    
        return res.render('./products/editarProducto',{
            productToEdit
        })
    }


    
}
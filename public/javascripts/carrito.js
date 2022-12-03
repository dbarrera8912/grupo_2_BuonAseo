//1. addCartBtn es el boton de agregar al carrito
let addCartBtn = document.querySelector(".addCartBtn") ?? null;
(addCartBtn != null) //2.si existe
?
addCartBtn.addEventListener("click",()=>{addToCart(this)})//3. capturar el evento y agregar al carrito
: console.log("nada");//sino no hace nada, en el caso de que el usuario no este en la pantalla de detalle.

//El proceso de agregar al carrito
async function addToCart(){
    let product = addCartBtn.value;//captura el id del producto que quiere agregar
    let addedProduct = [];
    if(localStorage.getItem("cart")){//Si existe ya un carrito en el localstorage
        addedProduct = JSON.parse(localStorage.getItem("cart"));//lo trae
    }

    alreadyAdded = false;//Pregunta si el producto ya existe en el carrito
    addedProduct.forEach((prod)=>{
        if(prod.id == product){
            alreadyAdded = true;
        }
    });
    //Si ya no existe el carrito hacie lo de abajo
    if (alreadyAdded == false) {
        let productos;
        //Traemos todo el detalle del producto por agregar
        const productDb = await fetch('http://localhost:3030/api/products/detail/'+product)
        .then(respo => respo.json())
        .then(data => { 
            productos = data;
          })
        console.log(productos);
        let img = productos.meta.image_path;
        let price = productos.data.product.price;
        let name = productos.data.product.name;
        //Creamos un objeto para el producto por agregar
        let newProduct = {id:product,quantity:1,price,imgPath:img,name};
        //Lo ponemos al final del array de la lista de productos proveniente del localstorage
        addedProduct.push(newProduct);

        //Lo agregamos al localstorage para que impacte el agregarAlCarrito
        localStorage.setItem("cart",JSON.stringify(addedProduct));
        //Si no lo sumamos al localstorage no lo podemos mostrar en el carrito.
        Swal.fire(
            'Se agrego al carrito!',
            productos.data.product.name,
            'success'
            );
    }
}

let carrito = document.querySelector("#carrito") ?? "";
//Si esta en el carrito hace lo siguiente
if (carrito != "") {
    let sectionParaCopiar = carrito.querySelector(".carrito__primer__producto");
    //Traemos todos productos del localstorage
    let cartProducts = JSON.parse(localStorage.getItem("cart")) ?? null;
    //Si localstorage vacio, muestra "no hay productos"
    (cartProducts == null) ? productosView.innerHTML = "no hay productos en el carrito" :

    //Si hay producto/s
    cartProducts.forEach((cart)=>{
        //En el carrito hay una seccion que es solo para copiar y que esta display:none
        //La usamos para clonarla y tener el mismo HTML para cada producto.
        let sectionPrimer = sectionParaCopiar.cloneNode(true);
        //Lo hacemos visible porque por defecto tiene display:none
        sectionPrimer.style.display = "flex";
        //finalmente agregamos los datos provenientes del localstorage a la visual X cada producto.
        
        sectionPrimer.dataset.productId = cart.id;
        sectionPrimer.querySelector(".carrito__producto__articulo").innerHTML = cart.name;
        sectionPrimer.querySelector(".carrito__imagen__producto").src = cart.imgPath;
        sectionPrimer.querySelector(".carrito__precio__numero").innerHTML = cart.price;
        sectionPrimer.querySelector(".carrito__cantidad__general input").value = cart.quantity;
        sectionPrimer.querySelector(".carrito__cantidad").innerHTML = cart.quantity;
        sectionPrimer.querySelector(".carrito__subtotal__numero").innerHTML = (cart.quantity * cart.price);
        
        document.getElementById("carrito_localstorage").appendChild(sectionPrimer);
    });
    updateTotal();
}
function updateTotal(){
    let total = 0;
    let cartProducts = JSON.parse(localStorage.getItem("cart")) ?? null;
    //Si localstorage vacio, muestra "no hay productos"
    if(cartProducts != null){
        //Si hay producto/s
        cartProducts.forEach((cart)=>{
            total += (cart.quantity * cart.price);
        });
    }
    document.querySelector(".carrito__corresponde__subtotal").innerHTML = total;
    document.querySelector(".carrito__numero__total").innerHTML = total;
}

function deleteCart(element){
    let id = element.parentNode.dataset.productId;
    let cartProducts = JSON.parse(localStorage.getItem("cart"));
    let c = 0;
    cartProducts.forEach((cart)=>{
        if(cart.id == id){
            cartProducts.splice(c,1);
            localStorage.setItem("cart",JSON.stringify(cartProducts));
            element.parentNode.remove();
        }
        c++;
    });
    updateTotal();
}
function quantityCart(element){

    let id = element.parentNode.parentNode.dataset.productId;
    console.log(element.parentNode.parentNode);
    let cartProducts = JSON.parse(localStorage.getItem("cart"));
    let c = 0;
    cartProducts.forEach((cart)=>{

        if(cart.id == id){
            cartProducts[c].quantity = element.value;
            console.log(cartProducts[c]);
            localStorage.setItem("cart",JSON.stringify(cartProducts));
        }
        c++;
    });
    updateTotal();
}
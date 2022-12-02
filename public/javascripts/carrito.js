let addCartBtn = document.querySelector(".addCartBtn") ?? null;
(addCartBtn != null) 
?
addCartBtn.addEventListener("click",()=>{addToCart(this)})
: console.log("nada");

async function addToCart(){

    let product = addCartBtn.value;
    let addedProduct = [];
    if(localStorage.getItem("cart")){
        addedProduct = JSON.parse(localStorage.getItem("cart"));
    }
    alreadyAdded = false;
    addedProduct.forEach((prod)=>{
        if(prod.id == product){
            alreadyAdded = true;
        }
    });
    if (alreadyAdded == false) {
        let productos;
        const productDb = await fetch('http://localhost:3030/api/products/detail/'+product)
        .then(respo => respo.json())
        .then(data => { 
            productos = data;
          })
        console.log(productos);
        let img = productos.meta.image_path;
        let price = productos.data.product.price;
        let name = productos.data.product.name;
        let newProduct = {id:product,quantity:1,price,imgPath:img,name};
        console.log(newProduct);
        addedProduct.push(newProduct);
        localStorage.setItem("cart",JSON.stringify(addedProduct));
    }
}

let carrito = document.querySelector("#carrito") ?? "";
let sectionParaCopiar = carrito.querySelector(".carrito__primer__producto");
sectionParaCopiar.style.display = "none";
if (carrito != "") {
    let cartProducts = JSON.parse(localStorage.getItem("cart")) ?? null;
    let productosView = "";
    (cartProducts == null) ? productosView.innerHTML = "no hay productos en el carrito" :
    cartProducts.forEach((cart)=>{
        let sectionPrimer = sectionParaCopiar.cloneNode(true);
        sectionPrimer.querySelector(".carrito__producto__articulo").innerHTML = cart.quantity;
        sectionPrimer.querySelector(".carrito__imagen__producto").innerHTML = cart.imgPath;
        sectionPrimer.querySelector(".carrito__precio__numero").innerHTML = cart.price;
        sectionPrimer.querySelector(".carrito__cantidad__general input").value = cart.quantity;
        sectionPrimer.querySelector(".carrito__cantidad").innerHTML = cart.quantity;
        sectionPrimer.querySelector(".carrito__subtotal__numero").innerHTML = (cart.quantity * cart.price);
        document.getElementById("carrito_localstorage").appendChild(sectionPrimer);
    });
    
}
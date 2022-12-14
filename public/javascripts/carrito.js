

//1. addCartBtn es el boton de agregar al carrito
let addCartBtn = document.querySelector(".addCartBtn") ?? null;
(addCartBtn != null) //2.si existe
?
addCartBtn.addEventListener("click",()=>{addToCart(this)})//3. capturar el evento y agregar al carrito
: console.log("nada");//sino no hace nada, en el caso de que el usuario no este en la pantalla de detalle.

//El proceso de agregar al carrito
async function addToCart(){
    try{
        let product = addCartBtn.value;//captura el id del producto que quiere agregar

        let response = await fetch('http://localhost:3030/api/carts/', {
            method : 'POST',
            body : JSON.stringify({
                id:product
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        });
        let result = await response.json();
        if(result.ok){
            Swal.fire(
                'Se agrego al carrito!',
                result.data.product.name,
                'success'
            );
        }
    }catch (error) {
        console.error(error);
    }
}

let carrito = document.querySelector("#carrito");
//Si esta en el carrito hace lo siguiente
async function cargarCarrito(){
    
    let sectionParaCopiar = carrito.querySelector(".carrito__primer__producto");
    //Traemos todos productos del localstorage
    let response = await fetch('/api/carts');
    let result = await response.json();
    //Si localstorage vacio, muestra "no hay productos"
    (result == null) ? productosView.innerHTML = "no hay productos en el carrito" :
    console.log(result);
    //Si hay producto/s
    result.data.items.forEach((cart)=>{
        //En el carrito hay una seccion que es solo para copiar y que esta display:none
        //La usamos para clonarla y tener el mismo HTML para cada producto.
        let sectionPrimer = sectionParaCopiar.cloneNode(true);
        //Lo hacemos visible porque por defecto tiene display:none
        sectionPrimer.style.display = "flex";
        //finalmente agregamos los datos provenientes del localstorage a la visual X cada producto.
        
        sectionPrimer.dataset.productId = cart.id;
        sectionPrimer.querySelector(".carrito__producto__articulo").innerHTML = cart.product.name;
        sectionPrimer.querySelector(".carrito__imagen__producto").src = cart.product.image;
        sectionPrimer.querySelector(".carrito__precio__numero").innerHTML = "$"+cart.product.price;
        sectionPrimer.querySelector(".carrito__cantidad__general input").value = cart.quantity;
        sectionPrimer.querySelector(".carrito__cantidad").innerHTML = cart.quantity;
        sectionPrimer.querySelector(".carrito__subtotal__numero").innerHTML = (cart.quantity * cart.product.price);
        
        document.getElementById("carrito_localstorage").appendChild(sectionPrimer);
    });
    updateTotal();
}
cargarCarrito();
    


    

async function updateTotal(envio = 0){
    let subtotal = 0;
    let response = await fetch('/api/carts');
    let result = await response.json();
    //Si localstorage vacio, muestra "no hay productos"
    if(result != null){
        //Si hay producto/s
        result.data.items.forEach((cart)=>{
            subtotal += (cart.quantity * cart.product.price);
        });
    }
    
    document.querySelector(".carrito__corresponde__subtotal").innerHTML = subtotal;
    document.querySelector(".carrito__numero__total").innerHTML = (subtotal + parseInt(envio));
    
}

async function deleteCart(element){
    let id = element.parentNode.dataset.productId;
    let response = await fetch('/api/carts');
    let result = await response.json();
    let c = 0;
 
    result.data.items.forEach((cart)=>{
        if(cart.id == id){
            fetch('/api/carts/' + id, {
                method : 'DELETE'
            })
            .then((result)=>{return result.json()})
            .then((data)=>{
                if(data.ok == true){
                    element.parentNode.remove();
                }
            })
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
function calcularEnvio(element){
    let opcion_sel = element.options[element.selectedIndex];
    if(opcion_sel.value != -1){
        let precio = opcion_sel.value;
        document.querySelector("#carrito__precio__envio").textContent = "$"+precio;
        updateTotal(precio);
    }
}
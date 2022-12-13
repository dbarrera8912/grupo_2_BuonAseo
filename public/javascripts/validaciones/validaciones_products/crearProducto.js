//const { stringify } = require("querystring");

let form = document.querySelector("#formCrearEditarProducto") ?? null;
let nombre = document.querySelector("#formProducto_name") ?? null;
let image = document.querySelector("#formProducto_image") ?? null;
let idCode = document.querySelector("#formProducto_idCode") ?? null;
let smell = document.querySelector("#formProducto_smell") ?? null;
let dimensions = document.querySelector("#formProducto_dimensions") ?? null;
let discount = document.querySelector("#formProducto_discount") ?? null;
let price = document.querySelector("#formProducto_price") ?? null;
let volume = document.querySelector("#formProducto_volume") ?? null;
let quantity = document.querySelector("#formProducto_quantity") ?? null;
let stock = document.querySelector("#formProducto_stock") ?? null;
let type = document.querySelector("#formProducto_type") ?? null;
let description = document.querySelector("#formProducto_description") ?? null;
let pattern = /([0-9])+/;
const msgError = (element, msg, target) => {
    document.getElementById(element).innerHTML = msg;
    target.classList.add("is-invalid");
};
const validField = (element, target) => {
    document.getElementById(element).innerHTML = null;
    target.classList.remove("is-invalid");
    target.classList.add("is-valid");
};

nombre.addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value.trim():
        msgError("errorName", "El nombre es obligatorio", target);
        break;
      case this.value.trim().length < 5 || this.value.trim().length > 100:
        msgError(
          "errorName",
          "El nombre debe tener entre 5 y  100 caracteres",
          target
        );
        break;
      default:
        validField("errorName", target);
        break;
    }
});
idCode.addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value:
        msgError("errorIdCode", "Codigo Id es obligatorio", target);
        break;
      case !pattern.test(this.value):
        msgError(
          "errorIdCode",
          "El codigo debe ser un número entero positivo",
          target
        );
        break;
      default:
        validField("errorIdCode", target);
        break;
    }
});
price.addEventListener("blur", function ({ target }) {
    switch (true) {
      case !this.value:
        msgError("errorPrice", "Precio es obligatorio", target);
        break;
      case !pattern.test(this.value):
        msgError(
          "errorPrice",
          "El precio debe ser número entero positivo",
          target
        );
        break;
      default:
        validField("errorPrice", target);
        break;
    }
});
discount.addEventListener("blur", function ({ target }) {
    switch (true) {
      case  this.value < 1 || this.value > 100:
        msgError("errorDiscount", "Descuento debe ser entre 0 y 100", target);
        break;
      case !pattern.test(this.value):
        msgError(
          "errorDiscount",
          "El precio debe ser un valor numérico positivo",
          target
        );
        break;
      default:
        validField("errorDiscount", target);
        break;
    }
});
volume.addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value:
          msgError("errorVolume", "El Volumen es obligatorio", target);
          break;
        case !pattern.test(this.value):
          msgError(
            "errorVolume",
            "El volumen debe ser un valor numérico positivo",
            target
          );
          break;
        default:
          validField("errorVolume", target);
          break;
      }
});
stock.addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value:
          msgError("errorStock", "El Stock es obligatorio", target);
          break;
        case !pattern.test(this.value):
          msgError(
            "errorStock",
            "El stock debe ser un valor numérico positivo",
            target
          );
          break;
        default:
          validField("errorStock", target);
          break;
      }
});
smell.addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value:
          msgError("errorSmell", "El Aroma es obligatorio", target);
          break;
        case  this.value.trim().length < 3 || this.value.trim().length > 100:
          msgError(
            "errorSmell",
            "El Aroma debe ser entre 3 y 100 caracteres",
            target
          );
          break;
        default:
          validField("errorSmell", target);
          break;
      }
});
dimensions.addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value:
          msgError("errorDimensions", "Dimension es obligatorio", target);
          break;
        case  this.value.trim().length > 100:
          msgError(
            "errorDimensions",
            "La Dimension debe ser menor a 100 caracteres",
            target
          );
          break;
        default:
          validField("errorDimensions", target);
          break;
      }
});
quantity.addEventListener("blur", function ({ target }) {
    switch (true) {
        case !this.value:
          msgError("errorQuantity", "Cantidad es obligatorio", target);
          break;
        case !pattern.test(this.value):
          msgError(
            "errorQuantity",
            "La Cantidad debe ser número entero positivo",
            target
          );
          break;
        default:
          validField("errorQuantity", target);
          break;
      }
});
type.addEventListener("blur", function ({ target }) {
    switch (true) {
        case  this.value.trim().length > 100:
          msgError(
            "errorType",
            "El Tipo debe ser menor a 100 caracteres",
            target
          );
          break;
        default:
          validField("errorType", target);
          break;
      }
});
description.addEventListener("blur", function ({ target }) {
    switch (true) {
        case  this.value.trim().length > 200:
          msgError(
            "errorDescription",
            "Descripcion debe ser menor a 200 caracteres",
            target
          );
          break;
        default:
          validField("errorDescription", target);
          break;
      }
});
image.addEventListener('change', function ({ target }) {
    let allowed_type = ["jpg","png","jpeg","gif","webp"];
    var extension = target.files[0].name.split('.').pop().toLowerCase(),
    isSuccess = allowed_type.indexOf(extension) > -1;
    if(isSuccess){
      let reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    
    reader.onload = () => {
      console.log(reader.result);
      document.querySelector(".imagePreview").setAttribute("src",reader.result)
      validField("errorImage", target)
    }
    }else{
      msgError(
        "errorImage",
        "El formato de la imagen debe ser Jpg, Png, Jpeg, Gif, Webp",
        target
      );
    }
    
})
let success = false;
form.addEventListener("submit", function (e) {
    if(success == false){
        e.preventDefault();
    }
    
   success = true
    const elements = this.elements;
      for (let i = 0; i < elements.length - 1; i++) {

          if((!elements[i].value.trim() || elements[i].classList.contains('is-invalid')) && elements[i].getAttribute("type") != "reset"){
            let name = elements[i].getAttribute("name");
            name = name.charAt(0).toUpperCase()+ name.slice(1);
            let label = elements[i].parentNode.querySelector("label");
            console.log(label.textContent);
            console.log(name);
            console.log("--------");
                msgError(`error${name}`, `El ${label.textContent} es obligatorio`, elements[i]);
                success = false;
          }
      }

      if(success == true){
        //form.submit();
      }else{
        document.querySelector("#errorForm").innerHTML = 'El formulario no se ha llenado correctamente!';
      }

  });
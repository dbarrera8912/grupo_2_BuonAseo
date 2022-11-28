let form = document.querySelector("#formCrearProducto") ?? null;
let nombre = document.querySelector("#formCrearProducto_name") ?? null;
let image = document.querySelector("#formCrearProducto_image") ?? null;
let idCode = document.querySelector("#formCrearProducto_idCode") ?? null;
let smell = document.querySelector("#formCrearProducto_smell") ?? null;
let dimensions = document.querySelector("#formCrearProducto_dimensions") ?? null;
let discount = document.querySelector("#formCrearProducto_discount") ?? null;
let price = document.querySelector("#formCrearProducto_price") ?? null;
let volume = document.querySelector("#formCrearProducto_volume") ?? null;
let quantity = document.querySelector("#formCrearProducto_quantity") ?? null;
let stock = document.querySelector("#formCrearProducto_stock") ?? null;
let type = document.querySelector("#formCrearProducto_type") ?? null;
let description = document.querySelector("#formCrearProducto_description") ?? null;
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
        msgError("errorNombre", "El nombre es obligatorio", target);
        break;
      case this.value.trim().length < 5 || this.value.trim().length > 100:
        msgError(
          "errorNombre",
          "El nombre debe tener entre 5 y  100 caracteres",
          target
        );
        break;
      default:
        validField("errorNombre", target);
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
          "El codigo debe ser numerico positivo",
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
          "El precio debe ser numerico positivo",
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
          "El precio debe ser numerico positivo",
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
          msgError("errorVolume", "Volumen es obligatorio", target);
          break;
        case !pattern.test(this.value):
          msgError(
            "errorVolume",
            "El volumen debe ser numerico positivo",
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
          msgError("errorStock", "Stock es obligatorio", target);
          break;
        case !pattern.test(this.value):
          msgError(
            "errorStock",
            "El stock debe ser numerico positivo",
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
          msgError("errorSmell", "Aroma es obligatorio", target);
          break;
        case  this.value.trim().length < 3 || this.value.trim().length > 100:
          msgError(
            "errorSmell",
            "Aroma debe ser entre 3-100 caracteres",
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
            "Dimension debe ser menor a 100 caracteres",
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
            "Cantidad debe ser numero entero positivo",
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
            "tipo debe ser menor a 100 caracteres",
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
        case  this.value.trim().length > 100:
          msgError(
            "errorDescription",
            "Descripcion debe ser menor a 100 caracteres",
            target
          );
          break;
        default:
          validField("errorDescription", target);
          break;
      }
});
/*image.addEventListener('change', function ({ target }) {
    
    let reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    reader.onload = () => {
        $('imagePreview').src = reader.result
    }
})*/
let success = false;
form.addEventListener("submit", function (e) {
    if(success == false){
        e.preventDefault();
    }
    
   success = true
    const elements = this.elements;
      for (let i = 0; i < elements.length - 1; i++) {
          if((!elements[i].value.trim() || elements[i].classList.contains('is-invalid')) && elements[i].getAttribute("type") != "reset"){
                console.log(elements[i]);
                document.querySelector("#errorForm").innerHTML = 'Llená bien formulario men!';
                success = false;
          }
      }
      console.log(success)
      if(success == true){
        form.submit();
      }

  });
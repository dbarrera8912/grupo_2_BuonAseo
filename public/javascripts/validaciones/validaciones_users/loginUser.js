window.addEventListener('load', ()=> {

let formulario = document.getElementById('registro-main-form');
let email = document.getElementById('registro-main-form-email');
let password = document.getElementById('registro-main-form-password');
let boton = document.getElementById('registro-main-form-boton');
let emailErrores = document.getElementById('registro-text-errores-email');
let passwordErrores = document.getElementById('registro-text-errores-password');
let formularioError = document.getElementById('registro-text-errores-formulario')

const exRegex = {
    exRegexAlfa : /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegexEmail : /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
    exRegexPass : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,12}/
}

console.log('JAVASCRIPT CONECTADOOOO')



const verifieldName = async (name) => {
  try {
      
      let response = await fetch('/api/auth/verify-name', {
          method:'POST',
          body: JSON.stringify({name: name}),
          headers: {
              'Content-Type' : "Application/json"
          }

      })
      let result = await response.json();
     return result.verified
  } catch (error) {
      console.error
  }
}
let passwordApi
let emailApi
const verifieldEmail = async (email, password) => {
  try {
      let response = await fetch('/api/auth/verify-email', {
          method:'POST',
          body: JSON.stringify({email: email},
            {password: password}),
          headers: {
              'Content-Type' : "Application/json"
          }

      })
      let result = await response.json();
       passwordApi = result.user.password
       emailApi = result.user.email
      result.user.email
     console.log(result)
     console.log(result.user)
     console.log(result.user.email)
     console.log(result.user.password)
     return passwordApi && emailApi
  } catch (error) {
      console.error
  }
}




email.addEventListener("blur", async function() {
  switch (true) {
      case !this.value:
         emailErrores.innerText = "El campo email es obligatorio";
         email.classList.add('registro__email__container-inValid')
          
        break;
        case !exRegex.exRegexEmail.test(this.value) || await verifieldName(this.value):
            emailErrores.innerText = "Debes ingresar tu nombre o email correcto";
        email.classList.add('registro__email__container-inValid')
        
        break;
        case await verifieldEmail(this.value) != await emailApi:
           formularioError.innerText = "Credenciales Invalidas2" 
        
        break;
      default:
       
        email.classList.remove('registro__email__container-inValid')
        
        formularioError.innerText = "  "
  }});

  password.addEventListener("blur", async function( ) {
    switch (true) {
      case !this.value:
         passwordErrores.innerText = "No puedes dejar el campo vacio";
         password.classList.add('registro__email__container-inValid')
         
        break;
        
            case await verifieldEmail(this.value) != await passwordApi:
              formularioError.innerText = "Credenciales Invalidas1"
            break;
      default:
       
        password.classList.remove('registro__email__container-inValid')
      
        formularioError.innerText = "  "
  }});




  formulario.addEventListener("submit", function(e) {
    e.preventDefault();


    const elements = this.elements;
  for (let i = 0; i < elements.length - 1; i++) {
      if((!elements[i].value.trim() || elements[i].classList.contains('registro__email__container-inValid')) && elements[i].getAttribute("type") != "reset"){
            formularioError.innerHTML = 'No puedes dejar el formulario vacio';
      }
  else {

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logueado con exito',
      showConfirmButton: false,
      timer: 1500
    }) 

  formulario.submit()
    
  }}

});

});
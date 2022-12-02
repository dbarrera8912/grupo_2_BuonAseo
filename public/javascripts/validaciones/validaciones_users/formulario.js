window.addEventListener("load", () => {
  let formulario = document.getElementById("registro-main-form");
  let name = document.getElementById("registro-main-form-name");
  let email = document.getElementById("registro-main-form-email");
  let password = document.getElementById("registro-main-form-password");
  let password2 = document.getElementById("registro-main-form-password2");
  let boton = document.getElementById("registro-main-form-boton");
  let nameErrores = document.getElementById('registro-text-errores-name');
  let emailErrores = document.getElementById('registro-text-errores-email');
  let passwordErrores = document.getElementById('registro-text-errores-password');
  let password2Errores = document.getElementById('registro-text-errores-password2');
  let formularioError = document.getElementById('registro-text-errores-formulario')
let mayu = document.getElementById('mayu')
let minu = document.getElementById('minu')
let num = document.getElementById('num')
let sim = document.getElementById('sim')
let minSeis = document.getElementById('minSeis')
let maxOcho = document.getElementById('maxOcho')
  
  console.log("JAVASCRIPT CONECTADOOOO");

  const exRegex = {
    exRegexAlfa : /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegexEmail : /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
    exRegexPass : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,8}/,
    exRegMayu :  /[A-Z]/,
  exRegMinu : /[a-z]/,
  exRegNum : /[0-9]/,
  exRegEsp : /[$@$!%*?&]/,
  exRegMin : /.{6}/,
  exRegMax : /.{12}/ 
}




const verifieldEmail = async (email) => {
        try {
            
            console.log(email)
            let response = await fetch('/api/auth/verify-email', {
                method:'POST',
                body: JSON.stringify({email: email}),
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

const verifieldName = async (name) => {
  try {
      
      console.log(name)
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





  name.addEventListener("blur", async function() {
    switch (true) {
      case !this.value.trim():
        nameErrores.innerText = "El campo nombre es obligatorio";
        name.classList.add('registro__email__container-inValid')
        break;
        case this.value.trim().length < 3:
        nameErrores.innerText = "El minimo de caracteres es 3 letras";
        name.classList.add('registro__email__container-inValid')
        break;
        case !exRegex.exRegexAlfa.test(this.value):
            nameErrores.innerText = "Solo caracteres alfabeticos";
            name.classList.add('registro__email__container-inValid')
        break;
        case await verifieldName(this.value):
            nameErrores.innerText = "El nombre ya se encuentra registrado";
            name.classList.add('registro__email__container-inValid')
        break;

      default:
        nameErrores.innerText = null
        name.classList.remove('registro__email__container-inValid')
        break;
    }
  });

  email.addEventListener("blur", async function() {
    switch (true) {
      case !this.value:
         emailErrores.innerText = "El campo email es obligatorio";
         email.classList.add('registro__email__container-inValid')
        break;
        case !exRegex.exRegexEmail.test(this.value):
            emailErrores.innerText = "Email invalido";
        email.classList.add('registro__email__container-inValid')
        break;
        case await verifieldEmail(this.value):
            emailErrores.innerText = "El email ya se encuentra registrado";
        email.classList.add('registro__email__container-inValid')
        break;

      default:
        email.classList.remove('registro__email__container-inValid')
        emailErrores.innerText = null
        break;
    }
  });

  password.addEventListener("blur", function() {
    document.getElementById('passUl').hidden = true
    switch (true) {
      case !this.value:
         passwordErrores.innerText = "No puedes dejar el campo vacio";
         password.classList.add('registro__email__container-inValid')
        break;
        case !exRegex.exRegexPass.test(this.value):
            passwordErrores.innerText = "Contrasenia es invalida, debe contener una mayuscula, una minuscula, un numero, un simbolo y debe tener entre 6 y 8 caracteres";
            password.classList.add('registro__email__container-inValid')
            break;
      default:
        password.classList.remove('registro__email__container-inValid')
        passwordErrores.innerText = null
        break;
    }
  });

  password2.addEventListener("blur", function() {
    switch (true) {
      case !this.value:
         password2Errores.innerText = "No puedes dejar el campo vacio";
         password2.classList.add('registro__email__container-inValid')
        break;
        case this.value.trim() !== password.value.trim():
            password2Errores.innerText = "Contrasenia no coincide";
            password2.classList.add('registro__email__container-inValid')
        break;
      default:
        password2.classList.remove('registro__email__container-inValid')
        password2Errores.innerText = null
        break;
    }
  });
  password.addEventListener("focus", function() {
    document.getElementById('passUl').hidden = false
  });

  password.addEventListener("keyup", function({target}) {
    switch (true) {
        case exRegex.exRegMayu.test(target.value):
               mayu.classList.add('registro-text-succes')
            break;
        default:
               mayu.classList.add('registro-text-danger')
               mayu.classList.remove('registro-text-succes')
            break;
       }
    })
  password.addEventListener("keyup", function({target}) {
    switch (true) {
     case exRegex.exRegMinu.test(target.value):
            minu.classList.add('registro-text-succes')
         break;
     default:
            minu.classList.add('registro-text-danger')
            minu.classList.remove('registro-text-succes')
         break;
    }
    
   });

   password.addEventListener("keyup", function({target}) {
    switch (true) {
     case exRegex.exRegNum.test(target.value):
            num.classList.add('registro-text-succes')
         break;
     default:
            num.classList.add('registro-text-danger')
            num.classList.remove('registro-text-succes')
         break;
    }
    
   });

   password.addEventListener("keyup", function({target}) {
    switch (true) {
     case exRegex.exRegNum.test(target.value):
            num.classList.add('registro-text-succes')
         break;
     default:
            num.classList.add('registro-text-danger')
            num.classList.remove('registro-text-succes')
         break;
    }
    
   });

   password.addEventListener("keyup", function({target}) {
    switch (true) {
     case exRegex.exRegEsp.test(target.value):
            sim.classList.add('registro-text-succes')
         break;
     default:
            sim.classList.add('registro-text-danger')
            sim.classList.remove('registro-text-succes')
         break;
    }
    
   });

   password.addEventListener("keyup", function({target}) {
    switch (true) {
     case exRegex.exRegMin.test(target.value):
            minSeis.classList.add('registro-text-succes')
         break;
     default:
            minSeis.classList.add('registro-text-danger')
            minSeis.classList.remove('registro-text-succes')
         break;
    }
    
   });

   password.addEventListener("keyup", function({target}) {
    
    switch (true) {
     case exRegex.exRegMax.test(target.value):
        maxOcho.classList.add('registro-text-succes')
         break;
     default:
            maxOcho.classList.add('registro-text-danger')
            maxOcho.classList.remove('registro-text-succes')
         break;
    }
    
   });

  
   formulario.addEventListener("submit", function(e) {
           e.preventDefault();
       const elements = this.elements;
         for (let i = 0; i < elements.length - 1; i++) {
             if((!elements[i].value.trim() || elements[i].classList.contains('registro__email__container-inValid')) && elements[i].getAttribute("type") != "reset"){
                   formularioError.innerHTML = 'Debes completar los campos';
             }
         else {
         return formulario.submit()
         }}
   
  });
});

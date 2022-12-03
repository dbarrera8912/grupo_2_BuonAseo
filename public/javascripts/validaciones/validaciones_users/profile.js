window.addEventListener("load", () => {
  console.log("JAVASCRIPT CONECTADOOOO");
  let formulario = document.getElementById("registro-main-form");
    let name = document.getElementById("registro-main-form-name");
    let password = document.getElementById("registro-main-form-password");
    let password2 = document.getElementById("registro-main-form-password2");
    let nameErrores = document.getElementById('registro-text-errores-name');
    let passwordErrores = document.getElementById('registro-text-errores-password');
    let password2Errores = document.getElementById('registro-text-errores-password2');
    let avatarErrores = document.getElementById('registro-text-errores-avatar')
    let formularioError = document.getElementById('registro-text-errores-formulario')
    let avatar = document.getElementById('avatar')
    
    
    let exRegAvatar =  /(.jpg|.jpeg|.png|.gif|.webp)$/i;
    const exRegex = {
      exRegexAlfa : /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
      exRegexEmail : /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
      exRegexPass : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,8}/,
      exRegMayu :  /[A-Z]/,
    exRegMinu : /[a-z]/,
    exRegNum : /[0-9]/,
    exRegEsp : /[$@$!%*?&]/,
    exRegMin : /.{6}/,
    exRegMax : /.{12}/,
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
  

  
  
  
    name.addEventListener("change", async function() {
      switch (true) {
        case !this.value.trim():
          nameErrores.innerText = "El campo nombre es obligatorio";
          nameErrores.style.visibility = 'visible'
          nameErrores.style.display = "block" 
          name.style.color = "red"
          break;
          case this.value.trim().length < 3:
          nameErrores.innerText = "El minimo de caracteres es 3 letras";
          nameErrores.style.visibility = 'visible'
          nameErrores.style.display = "none" 
           name.style.color = "red"
          break;
          
          case await verifieldName(this.value):
              nameErrores.innerText = "El nombre ya se encuentra registrado";
              nameErrores.style.display = "block" 
          nameErrores.style.visibility = 'visible'
              name.style.color = "red"
          break;
        default:
          
          nameErrores.style.display = "none" 
          nameErrores.style.visibility = 'hidden'
          break;
      }
    });
  
    password.addEventListener("change", function() {
      switch (true) {
          case !exRegex.exRegexPass.test(this.value):
              passwordErrores.innerText = "Contrasenia es invalida, debe contener una mayuscula, una minuscula, un numero, un simbolo y debe tener entre 6 y 8 caracteres";
              password.style.color = "red"
              break;
            
        default:
            password.style.color = null
            passwordErrores.innerText = null
          break;
      }
    });
  
    password2.addEventListener("change", function() {
      switch (true) {
          case this.value.trim() !== password.value.trim():
              password2Errores.innerText = "Contrasenia no coincide";
              password.style.color = "red"
          break;
        default:
            password.style.color = null
          password2Errores.innerText = '  '
          break;
      }
    });
   


   

  avatar.addEventListener('change', ({target}) => {
     
     switch (true) {
      case !exRegAvatar.exec(target.value):
        avatarErrores.innerText = "Solo se permite imágenes jpg, jpeg, png, gif, webp";
        target.value = null;
        break;
      default:
        let reader = new FileReader()
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => {
        avatar.src = reader.result
        }
        break;
    }})

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
        title: 'Se actualizaron tus cambios con exito',
        showConfirmButton: false,
        timer: 1500
      }) 
  
    formulario.submit()
      
    }}
  
  });
  }); 
  
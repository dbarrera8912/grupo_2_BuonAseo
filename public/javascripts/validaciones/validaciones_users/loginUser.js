window.addEventListener("load", () => {
  let formulario = document.getElementById("registro-main-form");
  let formFace = document.getElementById("facebook-login");
  let formGoogle = document.getElementById("google-login");
  let email = document.getElementById("registro-main-form-email");
  let password = document.getElementById("registro-main-form-password");
  let boton = document.getElementById("registro-main-form-boton");
  let emailErrores = document.getElementById("registro-text-errores-email");
  let passwordErrores = document.getElementById(
    "registro-text-errores-password"
  );
  let formularioError = document.getElementById(
    "registro-text-errores-formulario"
  );

  const exRegex = {
    exRegexAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegexEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
    exRegexPass:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,12}/,
  };

  console.log("JAVASCRIPT CONECTADOOOO");

  

  const verifieldEmail = async (email) => {
    try {
      let response = await fetch(
        "http://localhost:3030/api/auth/verify-email",
        {
          method: "POST",
          body: JSON.stringify({ email: email }),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      let result = await response.json();
      console.log('>>>>>' + result.verified)
      return result.verified;
    } catch (error) {
      console.error;
    }
  };

  const verifieldPassword = async (email,password) => {
    try {
      let response = await fetch(
        "http://localhost:3030/api/auth/verify-password",
        {
          method: "POST",
          body: JSON.stringify({email : await verifieldEmail(email), password: password}),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      let result = await response.json();
      console.log('>>>>>' + result.verifica)
      return result.verifica;
    } catch (error) {
      console.error;
    }
  };

  email.addEventListener("blur", async function () {
    console.log(await verifieldEmail(this.value));
    switch (true) {
      case !this.value:
        emailErrores.innerText = "El campo email es obligatorio";
        email.classList.add("registro__email__container-inValid");
        email.style.border = "solid 1px red";
        password.style.border = "solid 1px red";
        break;
      case !exRegex.exRegexEmail.test(this.value):
        emailErrores.innerText = "Debes completar el campo correctamente";
        email.classList.add("registro__email__container-inValid");
        email.style.border = "solid 1px red";
        password.style.border = "solid 1px red";
        break;
      case await verifieldEmail(this.value):
        formularioError.innerText = "Credenciales Invalidas";
        email.style.border = "solid 1px red";
        password.style.border = "solid 1px red";
        break;
      default:
        email.classList.remove("registro__email__container-inValid");
        email.style.border = "solid 1px black";
        password.style.border = "solid 1px black";
        formularioError.innerText = "  ";
    }
  });

  password.addEventListener("blur", async function () {
    email = document.getElementById("registro-main-form-email").value
    password = document.getElementById("registro-main-form-password").value
    console.log(await verifieldPassword(email.nodeValue, password.nodeValue))
    switch (true) {
      case !this.value:
        passwordErrores.innerText = "No puedes dejar el campo vacio";
        password.classList.add("registro__email__container-inValid");

        break;
      case await verifieldPassword(email.nodeValue,password.nodeValue) : 
        formularioError.innerText = "Credenciales Invalidas";
        break;
      default:
        password.classList.remove("registro__email__container-inValid");
        formularioError.innerText = "  ";
    }
  });



  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    let elements = this.elements
    let error = false;
    for (let i = 0; i < elements.length - 1; i++) {
      console.log(">>>>>>>" + elements[i])
      if (
        !elements[i].value.trim() ||
        elements[i].classList.contains("registro__email__container-inValid")
      ) {
        elements[i].classList.add("registro__email__container-inValid");
        formularioError.innerText = "Hay campos con errores o están vacíos";
        error = true;
      }
    }
    if (!error) {
      formulario.submit();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logueado con exito",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
});

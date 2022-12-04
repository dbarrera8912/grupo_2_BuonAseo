window.addEventListener("load", () => {
  let formulario = document.getElementById("registro-main-form");
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

  const verifieldName = async (name) => {
    try {
      let response = await fetch("/api/auth/verify-name", {
        method: "POST",
        body: JSON.stringify({ name: name }),
        headers: {
          "Content-Type": "Application/json",
        },
      });
      let result = await response.json();
      return result.verified;
    } catch (error) {
      console.error;
    }
  };

  const verifieldEmail = async (email, password) => {
    try {
      let response = await fetch(
        "http://localhost:3030/api/auth/verify-email",
        {
          method: "POST",
          body: JSON.stringify({ email: email }, { password: password }),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      let result = await response.json();
      console.log(result);
      console.log(result.user);
      return result.user;
    } catch (error) {
      console.error;
    }
  };

  email.addEventListener("blur", async function () {
    console.log(await verifieldEmail(email.value));
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
      case (await verifieldEmail(this.value)) == null:
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
    console.log(await verifieldEmail(password.value));
    switch (true) {
      case !this.value:
        passwordErrores.innerText = "No puedes dejar el campo vacio";
        password.classList.add("registro__email__container-inValid");

        break;
      case (await verifieldEmail(this.value)) == null:
        formularioError.innerText = "Credenciales Invalidas";
        break;
      default:
        password.classList.remove("registro__email__container-inValid");
        formularioError.innerText = "  ";
    }
  });

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
    let error = false;

    const elements = this.elements;
    for (let i = 0; i < elements.length - 1; i++) {
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
        title: "Registrado con exito",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
});

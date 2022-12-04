window.addEventListener("load", () => {
  console.log("JAVASCRIPT CONECTADOOOO");
  let formulario = document.getElementById("registro-main-form");
  let name = document.getElementById("registro-main-form-name");
  let password = document.getElementById("registro-main-form-password");
  let password2 = document.getElementById("registro-main-form-password2");
  let nameErrores = document.getElementById("registro-text-errores-name");
  let passwordErrores = document.getElementById(
    "registro-text-errores-password"
  );
  let password2Errores = document.getElementById(
    "registro-text-errores-password2"
  );
  let avatarErrores = document.getElementById("registro-text-errores-avatar");
  let formularioError = document.getElementById(
    "registro-text-errores-formulario"
  );
  let avatar = document.getElementById("avatar");

  let exRegAvatar = /(.jpg|.jpeg|.png|.gif|.webp)$/i;
  const exRegex = {
    exRegexAlfa: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
    exRegexEmail: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
    exRegexPass:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,8}/,
    exRegMayu: /[A-Z]/,
    exRegMinu: /[a-z]/,
    exRegNum: /[0-9]/,
    exRegEsp: /[$@$!%*?&]/,
    exRegMin: /.{6}/,
    exRegMax: /.{12}/,
  };

  //Función que se ejecuta al detectar un cambio en el input tipo password
  function clearInputs() {
    // enableClear en este caso es la bandera que me indicará si es el
    // primer cambio del input (Cuando el navegador lo autocompleta)

    if (this.password.value) {
      //cambiar el valor del input a ''
      this.password.value = false;
      // se deshabilita la bandera para que no se
      // elimine el valor en los proximos cambios
    }
  }

  const verifieldName = async (name) => {
    try {
      console.log(name);
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

  name.addEventListener("change", async function () {
    switch (true) {
      case !this.value.trim():
        nameErrores.innerText = "El campo nombre es obligatorio";
        nameErrores.style.visibility = "visible";
        nameErrores.style.display = "block";
        break;
      case this.value.trim().length < 3:
        nameErrores.innerText = "El minimo de caracteres es 3 letras";
        nameErrores.style.visibility = "visible";
        nameErrores.style.display = "none";
        break;

      case await verifieldName(this.value):
        nameErrores.innerText = "El nombre ya se encuentra registrado";
        nameErrores.style.display = "block";
        nameErrores.style.visibility = "visible";

        break;
      default:
        nameErrores.style.display = "none";
        nameErrores.style.visibility = "hidden";
        break;
    }
  });
  console.log(password.value);
  password.addEventListener("change", function () {
    switch (true) {
      case !exRegex.exRegexPass.test(this.value):
        passwordErrores.innerText =
          "Contrasenia es invalida, debe contener una mayuscula, una minuscula, un numero, un simbolo y debe tener entre 6 y 8 caracteres";
        break;
      default:
        passwordErrores.innerText = "  ";
        break;
    }
  });

  password2.addEventListener("change", function () {
    switch (true) {
      case this.value.trim() != password.value.trim():
        password2Errores.innerText = "Contrasenia no coincide";
        break;
      default:
        password.value;
        password2Errores.innerText = "  ";
        break;
    }
  });

  avatar.addEventListener("change", ({ target }) => {
    switch (true) {
      case !exRegAvatar.exec(target.value):
        avatarErrores.innerText =
          "Solo se permite imágenes jpg, jpeg, png, gif, webp";
        target.value = null;
        break;
      default:
        let reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        reader.onload = () => {
          avatar.src = reader.result;
        };
        break;
    }
  });

  password.value = " ";
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    let error = false;

    const elements = this.elements;

    if (
      !elements[0].value.trim() ||
      elements[0].classList.contains("registro__email__container-inValid")
    ) {
      elements[0].classList.add("registro__email__container-inValid");
      formularioError.innerText = "Hay campos con errores o están vacíos";
      error = true;
    } else {
      elements[0].classList.remove("registro__email__container-inValid");
      formularioError.innerText = " ";
      error = false;
    }

    if (
      !elements[1].value.trim() ||
      elements[1].classList.contains("registro__email__container-inValid")
    ) {
      elements[1].classList.add("registro__email__container-inValid");
      formularioError.innerText = "Hay campos con errores o están vacíos";
      error = true;
    } else {
      elements[1].classList.remove("registro__email__container-inValid");
      formularioError.innerText = " ";
      error = false;
    }

    if (elements[2].classList.contains("registro__email__container-inValid")) {
      elements[2].classList.add("registro__email__container-inValid");
      formularioError.innerText = "Hay campos con errores o están vacíos";
      error = true;
    } else {
      elements[2].classList.remove("registro__email__container-inValid");
      formularioError.innerText = " ";
      error = false;
    }
    if (elements[16].classList.contains("registro__email__container-inValid")) {
      elements[16].classList.add("registro__email__container-inValid");
      formularioError.innerText = "Hay campos con errores o están vacíos";
      error = true;
    } else {
      elements[16].classList.remove("registro__email__container-inValid");
      formularioError.innerText = " ";
      error = false;
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

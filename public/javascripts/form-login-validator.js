
const formulario = document.getElementById('form-login-validator');

const expresiones = { /* validaciones para comparar lo ingresado */
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{4,12}$/, // 4 a 12 digitos.
}

let campos = { /* cargamos false para que si el form va vacio, lo tome como error */
    name: false,
    password: false,
    email: false
}

const validarFormulario = (e) => {/* funcion para validar un campo en especifico */
    switch (e.target.name) {
        case "name": 
        console.log(e.target)
            validarCampo(expresiones.name, e.target, 'name', "Entre 1 a 41 dígitos y solo letras.");
            break;
        case "email":
            if (e.target.id === "emailRegister") {
                validarCampo(expresiones.email, e.target, 'emailRegister', "Solo puede contener letras, numeros, puntos, guiones y guion bajo");
            } else if (e.target.value.includes("@")) {
                validarCampo(expresiones.email, e.target, 'email', "Solo puede contener letras, numeros, puntos, guiones y guion bajo");
            } else {
                validarCampo(expresiones.name, e.target, 'email', "Entre 1 a 41 dígitos y solo letras.");
            }
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password', "Tiene que ser de 4 a 12 dígitos");
            break;
    }
}

const validarCampo = (expresion, input, campo, msg) => {/* funcion para validar a detalle cada campo */
    if (expresion.test(input.value)) {
        document.getElementById(`${campo}`).classList.remove('registro__email__container-inValid');
        document.getElementById(`${campo}`).classList.add('registro__email__container-Valid');
        document.querySelector(`.registro__email__container #small-${campo}`).innerHTML = ``;
        campos[campo] = true;
    } else {
        document.getElementById(`${campo}`).classList.add('registro__email__container-inValid');
        document.getElementById(`${campo}`).classList.remove('registro__email__container-Valid');
        document.querySelector(`.registro__email__container #small-${campo}`).innerHTML = `${msg}`;
        campos[campo] = false;
    }
}

function inputParaValidar(input) {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
}

function formParaValidar(id) {
    const formulario = document.getElementById(`${id}`);

    campos["email"] = document.querySelector(`#${id} #email`).value === "" ? false : true
    campos["password"] = document.querySelector(`#${id} #password`).value === "" ? false : true

    formulario.addEventListener('submit', (e) => {/* evento para cuando se envia el form */
        
        if (campos.email && campos.password) {/* si no hay errores entra */

            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
            document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');

            setTimeout(() => {
                formulario.reset();

                document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
                document.getElementById(`email`).classList.remove('registro__email__container-Valid');
                document.getElementById(`password`).classList.remove('registro__email__container-Valid');
                campos["email"] = false;
                campos["password"] = false;
            }, 10000);

        } else {
            e.preventDefault();

            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
            document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
            setTimeout(() => {
                document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
            }, 5000);
        }
    });
}

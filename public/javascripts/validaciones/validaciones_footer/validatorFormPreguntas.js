const validarCampo = (input, campo, msg, espVal) => {/* funcion para validar a detalle cada campo */
    if (input.value === "" || espVal) {
        document.getElementById(`${campo}`).classList.add('registro__email__container-inValid');
        document.getElementById(`${campo}`).classList.remove('registro__email__container-Valid');
        document.querySelector(`.registro__email__container #smallFormPreguntas-${campo}`).innerHTML = `${msg}`;
    } else {
        document.getElementById(`${campo}`).classList.remove('registro__email__container-inValid');
        document.getElementById(`${campo}`).classList.add('registro__email__container-Valid');
        document.querySelector(`.registro__email__container #smallFormPreguntas-${campo}`).innerHTML = ``;
    }
}

const validarFormulario = (e) => {/* funcion para validar un campo en especifico */
    switch (e.target.name) {
        case "title":

            if (+e.target.value.length > 0 && +e.target.value.length < 5 || +e.target.value.length > 50) {
                validarCampo(e.target, 'title', "Entre 5 y 50 caracteres", true);
            } else {
                validarCampo(e.target, 'title', "Debes completar este campo");
            }
            break;
        case "response":
            console.log(+e.target.value.length)
            if (+e.target.value.length > 0 && +e.target.value.length < 5 || +e.target.value.length > 100) {
                validarCampo(e.target, 'response', "Entre 5 y 100 caracteres", true);
            } else {
                validarCampo(e.target, 'response', "Debes completar este campo");
            }
            break;
    }
}

function inputParaValidar(input) {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
}

function formParaValidar(id) {
    const formulario = document.getElementById(`${id}`);

    console.log(formulario)
    document.getElementById(`${id}`).addEventListener("submit", (e) =>{
        let errores = []
        for (let x = 0; x < 2; x++) {
            console.log(e.target[x].classList.contains("registro__email__container-inValid"))
            if (e.target[x].value === "" || e.target[x].classList.contains("registro__email__container-inValid")) {
                if (e.target[x].value === "") {
                    validarCampo(e.target[x], e.target[x].name, "Debes completar este campo")
                    errores.push( `${e.target[x].name}: Debes completar este campo`)
                }else if (e.target[x].name === "title"){
                    validarCampo(e.target[x], e.target[x].name, "Entre 5 y 50 caracteres", true)
                    errores.push( `${e.target[x].name}: Debes completar este campo`)
                }else if (e.target[x].name === "response"){
                    validarCampo(e.target[x], e.target[x].name, "Entre 5 y 100 caracteres", true)
                    errores.push( `${e.target[x].name}: Debes completar este campo`)
                }
            }
        }
       
        if (errores.length > 0) {
            e.preventDefault()
        }else{
            document.getElementById("form-preguntas-exito").innerHTML = "Formulario enviado con exito."
            document.getElementById("form-preguntas-exito").classList.add("form-preguntas-exito-activo")
        }
    })
}

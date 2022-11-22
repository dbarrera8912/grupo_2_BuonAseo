function password_visible(tipo,element){
    if(tipo == "mostrar"){
        element.classList.remove("active");
        document.querySelector(".fa-eye").classList.add("active");
        document.querySelector("[name='password']").setAttribute("type","text");
    }
    if(tipo == "ocultar"){
        element.classList.remove("active");
        document.querySelector(".fa-eye-slash").classList.add("active");
        document.querySelector("[name='password']").setAttribute("type","password");
    }
}

function password_visible2(tipo,element){
    if(tipo == "mostrar"){
        element.classList.remove("active");
        document.querySelector(".fa-eye").classList.add("active");
        document.querySelector("[name='password2']").setAttribute("type","text");
    }
    if(tipo == "ocultar"){
        element.classList.remove("active");
        document.querySelector(".fa-eye-slash").classList.add("active2");
        document.querySelector("[name='password2']").setAttribute("type","password2");
    }
}
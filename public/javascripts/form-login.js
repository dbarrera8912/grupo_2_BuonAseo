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



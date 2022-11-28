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
/*function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
} */


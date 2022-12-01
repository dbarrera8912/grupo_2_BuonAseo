let url = window.location.href;
url = url.split("products/detail");
let newUrl = url[0] + "products/detail/" + id;
window.history.pushState({page: "another"}, "another page", newUrl);
if(type == "edit"){
    Swal.fire(
    'Producto editado!',
    name,
    'success'
    );
}
function alert_eliminar(id,name){
    Swal.fire({
        title:`Esta seguro que quiere borrar ${name}`,
        html:`<form id="form_eliminarProducto" action="/products/eliminarProducto/${id}?_method=DELETE" method="POST">  
        </form>
        <div class="swal_botones">
            <button type="submit" form="form_eliminarProducto" class="swal2-confirm swal2-styled eliminar" style="display: inline-block;">ELIMINAR</button>
            <button type="button" onclick="cerrar_swal_eliminar(this)" class="swal2-confirm swal2-styled cancelar" aria-label="" style="display: inline-block;">Cancelar</button>
        </div>
        `,
        icon:'error',
        showCloseButton: false,
        showConfirmButton: false,
        showCancelButton: false,
    });
}
function cerrar_swal_eliminar(element){
    element.parentNode.parentNode.parentNode.parentNode.remove();
}
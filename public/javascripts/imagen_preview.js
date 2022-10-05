function foto_change(foto){

	if (foto.files[0].size > 0) {
        if(document.querySelector(".preview") != null){
            document.querySelector(".preview").remove();
        }
		var reader  = new FileReader();
		readFile(foto.files[0],foto);
	}
}
function readFile(file,foto) {                                                       
    var reader = new FileReader();
    reader.onload = readSuccess;                                          
    function readSuccess(evt) { 
        let preview = document.createElement("img");
		preview.src = evt.target.result;
		preview.classList.add("preview");
		document.querySelector(".contenedor-preview").appendChild(preview);                                        
    };
    reader.readAsDataURL(file);                                              
}
function formSearchProducts() {
    let form = document.getElementById("header_formSearchProducts")
    let input = document.getElementById("header_inputSearchProducts")

    form.addEventListener("submit", e =>{
        if (input.value === "") {
            e.preventDefault()
        }
    })
}


const formulario = document.querySelector("#login")
const inputUser = document.querySelector("#input-user")
const inputPass = document.querySelector("#input-pass")
const loginIncorrecto = document.querySelector("#logint")
const contenedorForm = document.querySelector(".container-login")
const logout = document.querySelector("#logout")
const contenedorProductos = document.querySelector(".container-productos")
const tabla = document.querySelector("table")

const datosUsuario = {
    user: "lalo",
    password: "lalo123"
}

//SUBIR AL LOCALSTORAGE
const subirAlLs = (clave, valor) => {
    localStorage.setItem(clave, JSON.stringify(valor))
}

//CONVERTIR Y DEVOLVER VALOR DEL LS
const obtenerDelLs = (clave) => {
    return JSON.parse(localStorage.getItem(clave))
}

//EVENTO AL ENVIAR EL FORMULARIO
formulario.onsubmit = (event) => {
    event.preventDefault()
    if (inputUser.value === datosUsuario.user && inputPass.value === datosUsuario.password) {
        subirAlLs("login", true)
        contenedorForm.style.display = "none"
        logout.style.display = "block"
        contenedorProductos.style.display = "block"
        productosAHtml(productos)
        tabla.style = "border: 1px solid red"


    } else {
        loginIncorrecto.style.display = "block"
        inputPass.style.border = "1px solid red"
        inputUser.style.border = "1px solid red"
        contenedorProductos.style.display = "flex"
        formulario.reset()


    }
}

//FUNCION QUE VERIFICADORA DEL TOKEN EN EL LOCALSTORE
function validarLogin(clave) {
    if (clave !== true) {
        contenedorForm.style.display = "flex"
        logout.style.display = "none"
        contenedorProductos.style.display = "none"

    } else {
        contenedorForm.style.display = "none"
        logout.style.display = "block"
        contenedorProductos.style.display = "flex"
    }
}

validarLogin(obtenerDelLs("login"))


// EVENTO PARA DESLOGEAR Y BORRAR CLAVE Y VALOR GUARDADA EN EL LOCALSTORE

logout.onclick = () => {
    localStorage.removeItem("login")
    validarLogin(obtenerDelLs("login"))
    formulario.reset()
}

// CREA LA TABLA DE PRODUCTOS EN EL HTML DESDE UN ARRAY (PRODUCTOS)
function productosAHtml(array) {
    const arrayReduce = array.reduce((acc, elemento) => {
        return acc + `
        <tbody>
            <tr>
                <td>
                    ${elemento.nombre}
                </td>
                <td>
                    ${elemento.precio}
                </td>
                <td>
                    ${elemento.descripcion}
                </td>
                <td>
                    ${elemento.categoria}
                </td>
                <td>
                    ${elemento.oferta}
                </td>
            </tr>
        </tbody>       
        `
    }, `
    <thead>
    <tr>
        <th>
            Nombre
        </th>
        <th>
            Precio
        </th>
        <th>
            Descripción
        </th>
        <th>
            Categoría
        </th>
        <th>
            Oferta
        </th>
        <tr>
    </thead>
    `)
    tabla.innerHTML = arrayReduce
}


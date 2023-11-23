/* Mostrar un formulario u otro */

const btnlog = document.getElementById("btn-log");
const btnreg = document.getElementById("btn-reg");
const formlog = document.getElementById("form-log");
const formreg = document.getElementById("form-reg");
const btn = document.getElementById("btn");

btnlog.addEventListener("click", function () {
    changeLog();
});

btnreg.addEventListener("click", () => {
    changeReg();
});

/* Adaptar el fondo según el tamaño de la pantalla */
const background = document.getElementsByTagName("body")[0];

function cambiarFondo() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width > height) {
        background.style.background =
            'url("../img/Fondo_login.png"), linear-gradient(to left, #ff914d, #ff3131)';
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundSize = "contain";
    } else {
        background.style.background =
            'url("../img/fondo_login_sm.jpg"), linear-gradient(to left, #ff914d, #ff6740)';
        background.style.backgroundRepeat = "no-repeat";
        background.style.backgroundSize = "contain";
    }
}

window.addEventListener("load", cambiarFondo);
window.addEventListener("resize", cambiarFondo);

let actualizarTiempoReal = false;
const validFeedback = "valid-feedback";
const invalidFeedback = "invalid-feedback";
const isValid = "is-valid";
const isInvalid = "is-invalid";

const nuser = document.getElementById("New-User");
const nemail = document.getElementById("New-Mail");
const nphone = document.getElementById("New-Phone");
const npass = document.getElementById("newpass");
const confpass = document.getElementById("confpass");
const ncity = document.getElementById("New-City");
const ndir = document.getElementById("New-Dir");
const nnum = document.getElementById("New-Num");
const nname = document.getElementById("New-Name");
const nsurn = document.getElementById("New-Surn");

const ndep = document.getElementById("Departamento");
const infoad = document.getElementById("infoadd");
const typedom = document.getElementsByName("dirtype");


function validar(div) {
    div.classList.remove(isInvalid);
    div.classList.add(isValid);
    let p = div.nextElementSibling;
    if (p != null && p.tagName === "P") {
        p.classList.remove(invalidFeedback);
        p.classList.add(validFeedback);
        p.innerHTML = "";
    }
}

function invalidar(div, mensaje) {
    div.classList.remove(isValid);
    div.classList.add(isInvalid);
    let p = div.nextElementSibling;
    if (p != null && p.tagName === "P") {
        p.classList.remove(validFeedback);
        p.classList.add(invalidFeedback);
        p.innerHTML = mensaje;
    }
}

function validarCantidad(div, cantidad, mensajeError) {
    if (div.value.length > cantidad) {
        validar(div);
        return true;
    }
    else {
        invalidar(div, mensajeError);
        return false;
    }
}

function validarUsuario() {
    return validarCantidad(nuser, 0, "El usuario no puede estar vacio");
}

function validarEmail() {
    if (!nemail.value.includes("@")) {
        invalidar(nemail, "Email invalido");
        return false;
    }
    else {
        return validarCantidad(nemail, 0, "El mail no puede estar vacio");
    }
}

function validarTelefono() {
    if (validarCantidad(nphone, 0, "El campo no puede estar vacio") == false) {
        return false;
    }
    else if (!(/^[0-9]+$/.test(nphone.value))) {
        invalidar(nphone, "Solo puede contener numeros");
        return false;
    }
    else {
        return validarCantidad(nphone, 8, "El numero es muy corto");
    }
}

function validarPass1() {
    return validarCantidad(npass, 5, "La contraseña debe tener almenos 6 caracteres");
}

function validarPass2() {
    if (confpass.value !== npass.value) {
        invalidar(confpass, "Las contraseñas debe ser iguales");
        return false;
    }
    else {
        return validarCantidad(confpass, 5, "La contraseña debe tener almenos 6 caracteres");
    }

}

function validarCiudad() {
    return validarCantidad(ncity, 0, "La ciudad no puede quedar vacia");
}

function validarDireccion() {
    return validarCantidad(ndir, 0, "La direccion no puede quedar vacia");
}

function validarNombre() {
    return validarCantidad(nname, 0, "El nombre no puede quedar vacio");
}

function validarApellido() {
    return validarCantidad(nsurn, 0, "El apellido no puede quedar vacio");
}

function validarNumCalle() {
    if (!(/^[0-9]+$/.test(nnum.value))) {
        invalidar(nnum, "Solo numeros");
        return false;
    }
    else {
        return validarCantidad(nnum, 3, "4 numeros");
    }
}

function validarDepartamento() {
    console.log(ndep.value);
    if (ndep.value == "Departamento" || ndep.value == "") {
        invalidar(ndep, "EEEEEEEEEE");
        return false;
    }
    else {
        validar(ndep);
        return true;
    }
}

function validarResidenciaTipo() {
    for (const type of typedom) {
        if (type.checked) {
            return true;
        }
    }
    return false;
}

function validarFormularioRegistro() {

    return (validarUsuario() && validarEmail() && validarPass1() && validarPass2()
        && validarTelefono() && validarCiudad() && validarDireccion()
        && validarNombre() && validarApellido() && validarNumCalle() &&
        validarDepartamento() && validarResidenciaTipo());
}

/* Redireccion a index con login realizado */

document.addEventListener("DOMContentLoaded", function () {
    cambiarFondo();
    const formlog = document.querySelector("#form-log");

    formlog.addEventListener("submit", function (event) {
        event.preventDefault();
        const user = formlog.querySelector("#User");
        const pass = formlog.querySelector("#Pass");
        const mantsesion = formlog.querySelector("#manteneriniciado");
        const usuarios = JSON.parse(localStorage.getItem("Usuariosdb"));

        /* Creamos en el registro una "base de datos local" para los usuarios y el login 
                ahora revisa si el usuario existe */
        let usuarioinlog;
        let existe = false;

        if (Array.isArray(usuarios)) {
            for (const usuario of usuarios) {
                if (
                    usuario.nombreUsuario === user.value ||
                    usuario.email === user.value
                ) {
                    existe = true;
                    usuarioinlog = usuario;
                    break;
                }
            }
        }

        /*Verifica si el usuario existe en la "base de datos": Si éste no existe, emite un mensaje para registarlo.
                Si el usuario existe, verifica los datos en la "base de datos" */
        if (existe) {
            /*Verifica la contraseña ingresada con la contraseña de la "Base de datos" */
            if (pass.value === usuarioinlog.contraseña) {
                /* Verifica si el usuario quiere mantener la sesión abierta aún así se cierre el navegador */
                if (mantsesion.checked) {
                    alert("Logueado correctamente");
                    localStorage.setItem("dataLocation", true);
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("UsuarioActivo", usuarioinlog.nombreUsuario);

                    let jsondata = {
                        username: user.value,
                        password: pass.value
                    };
                    fetch('http://localhost:3000/verifylogin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(jsondata)
                    })
                        .then(response => response.json())
                        .then(data => {
                            localStorage.setItem("token", JSON.stringify(data.token))
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });
                    setTimeout(function () {
                        window.location.href = "index.html";
                    }, 2000);
                } else {
                    alert("Logueado correctamente");
                    sessionStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("UsuarioActivo", usuarioinlog.nombreUsuario);
                    setTimeout(function () {
                        window.location.href = "index.html";
                    }, 2000);
                }
                /* Emite una alerta si la contraseña no es correcta */
            } else {
                alert("La contraseña es incorrecta");
            }
        } else {
            /* Emite un mensaje si el usuario no existe y redirige al login si el nuevo usuario desea registrarse */
            if (confirm("El usuario ingresado no existe.\n¿Desea registrarse?")) {
                changeReg();
                formlog.reset();
            }
        }
    });
    /* Verificación formulario de Registro */


    document.getElementById("submitButton").addEventListener("click", function (event) {
        event.preventDefault();
        const usuarios = JSON.parse(localStorage.getItem("Usuariosdb"));
        let nuevosdatosUsuario = {};

        let selectedirtype;

        for (const type of typedom) {
            if (type.checked) {
                selectedirtype = type.value;
                break;
            }
        }


        // Agregar verificacion en tiempo real despues del primer submit
        if (actualizarTiempoReal === false) {
            nuser.oninput = () => {
                validarUsuario();
            }
            nemail.oninput = () => {
                validarEmail()
            };
            nphone.oninput = () => {
                validarTelefono();
            }
            npass.oninput = () => {
                validarPass1();
                validarPass2();
            }
            confpass.oninput = () => {
                validarPass2();
            }
            ncity.oninput = () => {
                validarCiudad();
            }
            ndir.oninput = () => {
                validarDireccion();
            }
            nname.oninput = () => {
                validarNombre();
            }
            nsurn.oninput = () => {
                validarApellido();
            }
            nnum.oninput = () => {
                validarNumCalle();
            }
            ndep.oninput = () => {
                validarDepartamento();
            }

            actualizarTiempoReal = true;

            // valido todos la primera vez
            validarUsuario();
            validarEmail();
            validarPass1();
            validarPass2();
            validarTelefono();
            validarCiudad();
            validarDireccion();
            validarNombre();
            validarApellido();
            validarNumCalle();
            validarDepartamento();
            validarResidenciaTipo();
        }

        /*Verificación de datos para registro de nuevo usuario correcto */
        if (!validarFormularioRegistro()) return;

        /* Verificación que el usuario a registrar no exista en la base de datos */
        let existe = false;
        if (Array.isArray(usuarios)) {
            for (const usuario of usuarios) {
                if (
                    usuario.nombreUsuario === nuser.value ||
                    usuario.email === nemail.value
                ) {
                    existe = true;
                    break;
                }
            }
        }
        if (existe) {
            alert("El usuario ingresado ya existe");
            return;
        }

        /*Se crea el nuevo usuario */
        alert("Registrado con éxito");
        nuevosdatosUsuario = {
            nombreUsuario: nuser.value,
            nombre: nname.value,
            snombre: "",
            apellido: nsurn.value,
            sapellido: "",
            email: nemail.value,
            telefonos: [nphone.value],
            direcciones: [{
                default: true,
                tipo: selectedirtype,
                departamento: ndep.value,
                ciudad: ncity.value,
                calle: ndir.value,
                numero: nnum.value,
                indicaciones: infoad.value,
            }],
            imagen_perfil: {
                selected: 0,
                image_source: ['img/img_perfil.png', 'img/iconos/icon 1.jpg', 'img/iconos/icon 2.jpg', 'img/iconos/icon 3.jpg', 'img/iconos/icon 4.jpg', 'img/iconos/icon 5.jpg', 'img/iconos/icon 6.jpg', 'img/iconos/icon 7.jpg'],
            },
            contraseña: confpass.value,
            selectedtheme: false,
            carrito: [],
        };

        let jsondata = {
            username: nuser.value,
            password: confpass.value
        };

        fetch('http://localhost:3000/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsondata)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error("Error:", error);
            });
        /* Se verifica que la base de datos esté creada, sino la crea */
        if (Array.isArray(usuarios)) {
            usuarios.push(nuevosdatosUsuario);
            localStorage.setItem("Usuariosdb", JSON.stringify(usuarios));
            changeLog();
            formreg.reset();
        } else {
            let iniciarUsuarios = [nuevosdatosUsuario];
            localStorage.setItem("Usuariosdb", JSON.stringify(iniciarUsuarios));
            changeLog();
            formreg.reset();
        }
    });
});

function changeLog() {
    formlog.classList.add("form-activo");
    formlog.classList.remove("form-inactivo");
    formreg.classList.remove("form-activo");
    formreg.classList.add("form-inactivo");
    btn.style.transform = "translateX(0%)";
}

function changeReg() {
    formreg.classList.add("form-activo");
    formreg.classList.remove("form-inactivo");
    formlog.classList.remove("form-activo");
    formlog.classList.add("form-inactivo");
    btn.style.transform = "translateX(100%)";
}

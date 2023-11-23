function changeDataState(inputGroup) {
    inputGroup.forEach(input => {
        if (input.classList.contains("datosfijos")) {
            input.classList.remove("datosfijos");
            input.disabled = false;
        } else {
            input.classList.add("datosfijos");
            input.disabled = true;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const baseDatos = JSON.parse(localStorage.getItem("Usuariosdb"));
    let usuarioActivo = undefined;
    const dataLocation = localStorage.getItem("dataLocation");
    if (dataLocation) {
        usuarioActivo = baseDatos.find(usuario => usuario.nombreUsuario === localStorage.getItem("UsuarioActivo"));
    } else {
        usuarioActivo = baseDatos.find(usuario => usuario.nombreUsuario === sessionStorage.getItem("UsuarioActivo"));
    }

    const pnombre = document.getElementById("user-name");
    const snombre = document.getElementById("user-sname");
    const papellido = document.getElementById("user-srname");
    const sapellido = document.getElementById("user-ssrname");
    const cemail = document.getElementById("user-mail");
    const ctelefono = document.getElementById("user-phone");
    const profileimg = document.getElementById("profilesimg");

    /* Imputs y manejo para cambiar datos */
    const btneditinfo = document.getElementById("edit-userinfo");
    const userdatabox = document.getElementById("userdata");
    const datadisplay = userdatabox.querySelectorAll("input");
    const savechanges = document.getElementById("save-userchanges");

    /* Precargar los imput y la imagen de perfil*/
    pnombre.value = usuarioActivo.nombre;
    snombre.vaule = usuarioActivo.snombre;
    papellido.value = usuarioActivo.apellido;
    sapellido.value = usuarioActivo.sapellido;
    cemail.value = usuarioActivo.email;
    ctelefono.value = usuarioActivo.telefonos[0];
    profileimg.src = usuarioActivo.imagen_perfil.image_source[usuarioActivo.imagen_perfil.selected];
    datadisplay.forEach(input => {
        input.disabled = true;
    });


    //LOGICA PARA BOTON DE MODIFICAR   
    btneditinfo.addEventListener("click", () => {
        changeDataState(datadisplay);
        pnombre.value = usuarioActivo.nombre;
        snombre.value = usuarioActivo.snombre;
        papellido.value = usuarioActivo.apellido;
        sapellido.value = usuarioActivo.sapellido;
        cemail.value = usuarioActivo.email;
        ctelefono.value = usuarioActivo.telefonos[0];
        savechanges.classList.remove("oculto");

        btneditinfo.innerHTML = "";

        if (pnombre.value.length > 0) {
            usuarioActivo.nombre = pnombre.value;
            pnombre.classList.remove("is-invalid");
            pnombre.classList.add("is-valid");
            alerterror1userform.innerHTML = "";
            localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
        } else {
            pnombre.classList.remove("is-valid");
            pnombre.classList.add("is-invalid");
            alerterror1userform.classList.add("invalid-feedback");
            alerterror1userform.innerHTML = "Debe de ingresar un valor valido";
        }

        if (papellido.value.length > 0) {
            usuarioActivo.apellido = papellido.value;
            papellido.classList.remove("is-invalid");
            papellido.classList.add("is-valid");
            alerterror3userform.innerHTML = "";
            localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
        } else {
            papellido.classList.remove("is-valid");
            papellido.classList.add("is-invalid");
            alerterror3userform.classList.add("invalid-feedback");
            alerterror3userform.innerHTML = "Debe de ingresar un valor valido";
        }

        usuarioActivo.sapellido = sapellido.value;
        sapellido.classList.remove("is-invalid");
        sapellido.classList.add("is-valid");

        usuarioActivo.snombre = snombre.value;
        snombre.classList.remove("is-invalid");
        snombre.classList.add("is-valid");

        if (cemail.value.includes("@")) {
            usuarioActivo.email = cemail.value;
            cemail.classList.remove("is-invalid");
            cemail.classList.add("is-valid");
            alerterror4userform.innerHTML = "";
        } else {
            cemail.classList.remove("is-valid");
            cemail.classList.add("is-invalid");
            alerterror4userform.classList.add("invalid-feedback");
            alerterror4userform.innerHTML = "Debe ser un correo valido";
        }

        if (ctelefono.value.length > 6) {
            usuarioActivo.telefonos[0] = ctelefono.value;
            ctelefono.classList.remove("is-invalid");
            ctelefono.classList.add("is-valid");
            alerterror2userform.innerHTML = "";
        } else {
            ctelefono.classList.remove("is-valid");
            ctelefono.classList.add("is-invalid");
            alerterror2userform.classList.add("invalid-feedback");
            alerterror2userform.innerHTML = "Debe contar con almenos 6 digitos";
        }
    })


    //LOGICA PARA BOTON DE GUARDAR   
    savechanges.addEventListener("click", () => {
        if (pnombre.classList.contains("is-invalid") || papellido.classList.contains("is-invalid") || sapellido.classList.contains("is-invalid") || snombre.classList.contains("is-invalid") || cemail.classList.contains("is-invalid") || ctelefono.classList.contains("is-invalid")) {

            alert("NO SE PUEDE GUARDAR EL USUARIO SIN DATOS CORRECTOS")

        } else {
            changeDataState(datadisplay);
            savechanges.classList.add("oculto");

            pnombre.classList.remove("is-valid");
            papellido.classList.remove("is-valid");
            sapellido.classList.remove("is-valid");
            snombre.classList.remove("is-valid");
            cemail.classList.remove("is-valid");
            ctelefono.classList.remove("is-valid");

            btneditinfo.innerHTML = "Editar datos de usuario";
        }
    })


    /* Cargar las imágenes del localStorage en el modal cuando abre*/
    const cargarModal = document.getElementById("changebtn");
    const mostrarImg = document.getElementById("profileimgoptions");

    cargarModal.addEventListener("click", () => {
        mostrarImágenes();
    })

    /* Subir una nueva imágen para seleccionar el perfil */
    const inputFileImg = document.getElementById("new-profileimg");
    const guardarImg = document.getElementById("save-img");


    guardarImg.addEventListener("click", (e) => {
        e.preventDefault();
        const newImg = inputFileImg.files[0];
        if (newImg) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const base64img = e.target.result;
                usuarioActivo.imagen_perfil.image_source.push(base64img);
                localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
                mostrarImágenes();
            }
            reader.readAsDataURL(newImg);
        } else {

        }

    })


    function mostrarImágenes() {
        mostrarImg.innerHTML = "";


        /* Líneas de código que manejan la seleccion de las opciones de iconos*/
        for (let i = 0; i < (usuarioActivo.imagen_perfil.image_source).length; i++) {
            let columna = document.createElement("div");
            let imagenTag = document.createElement("img");
            columna.classList.add("col-auto", "mb-3");
            imagenTag.src = usuarioActivo.imagen_perfil.image_source[i];
            imagenTag.classList.add("icono");

            imagenTag.addEventListener("click", () => {
                let ImagenPerfil = document.getElementById("profilesimg");
                ImagenPerfil.src = usuarioActivo.imagen_perfil.image_source[i];
                usuarioActivo.imagen_perfil.selected = i;
                localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
            })

            columna.appendChild(imagenTag);
            mostrarImg.appendChild(columna);
        }
    };

    //LOGICA PARA GUARDAR LOS DATOS EN EL FORMULARIO Y VALIDARLO 
    const alerterror1userform = document.getElementById("alerterror1userform");
    const alerterror2userform = document.getElementById("alerterror2userform");
    const alerterror3userform = document.getElementById("alerterror3userform");
    const alerterror4userform = document.getElementById("alerterror4userform");

    function actimputuser() {
        pnombre.addEventListener("input", function () {
            if (pnombre.value.length > 0) {
                usuarioActivo.nombre = pnombre.value;
                pnombre.classList.remove("is-invalid");
                pnombre.classList.add("is-valid");
                alerterror1userform.innerHTML = "";
                localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
            } else {
                pnombre.classList.remove("is-valid");
                pnombre.classList.add("is-invalid");
                alerterror1userform.classList.add("invalid-feedback");
                alerterror1userform.innerHTML = "Debe de ingresar un valor valido";
            }
        })

        papellido.addEventListener("input", function () {
            if (papellido.value.length > 0) {
                usuarioActivo.apellido = papellido.value;
                papellido.classList.remove("is-invalid");
                papellido.classList.add("is-valid");
                alerterror3userform.innerHTML = "";
                localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
            } else {
                papellido.classList.remove("is-valid");
                papellido.classList.add("is-invalid");
                alerterror3userform.classList.add("invalid-feedback");
                alerterror3userform.innerHTML = "Debe de ingresar un valor valido";

            }
        })

        sapellido.addEventListener("input", function () {

            usuarioActivo.sapellido = sapellido.value;
            sapellido.classList.remove("is-invalid");
            localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
            sapellido.classList.remove("is-invalid")
            sapellido.classList.add("is-valid");
        })

        snombre.addEventListener("input", function () {
            usuarioActivo.snombre = snombre.value;
            snombre.classList.remove("is-invalid");
            snombre.classList.add("is-valid");
            localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
        })

        cemail.addEventListener("input", function () {
            if (cemail.value.includes("@")) {
                usuarioActivo.email = cemail.value;
                cemail.classList.remove("is-invalid");
                cemail.classList.add("is-valid");
                alerterror4userform.innerHTML = "";
                localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
            } else {
                cemail.classList.remove("is-valid");
                cemail.classList.add("is-invalid");
                alerterror4userform.classList.add("invalid-feedback");
                alerterror4userform.innerHTML = "Debe ser un correo valido";
            }
        })

        ctelefono.addEventListener("input", function () {
            if (ctelefono.value.length > 6) {
                usuarioActivo.telefonos[0] = ctelefono.value;
                ctelefono.classList.remove("is-invalid");
                ctelefono.classList.add("is-valid");
                alerterror2userform.innerHTML = "";
                localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
            } else {
                ctelefono.classList.remove("is-valid");
                ctelefono.classList.add("is-invalid");
                alerterror2userform.classList.add("invalid-feedback");
                alerterror2userform.innerHTML = "Debe contar con almenos 6 digitos";
            }
        })
    }
    actimputuser();
});
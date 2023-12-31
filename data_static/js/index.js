document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    const btnligthmode = document.getElementById("btn-lightmode");
    //Cambia el botón "Y mucho más!" según el modo Light/Dark seleccionado
    if (localStorage.getItem("darktheme") === "true") {
        btnligthmode.classList.remove("btn-light");
        btnligthmode.classList.add("btn-dark");
    }

    /* Adaptar el fondo según el tamaño de la pantalla */
    const jumbotron = document.querySelector('.jumbotron');

    function cambiarFondo() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        if (width > height) {
            jumbotron.style.background = 'url("../data_static/img/cover_back.png")';
            jumbotron.style.backgroundRepeat = 'no-repeat';
            jumbotron.style.backgroundPosition = 'center';
            jumbotron.style.backgroundSize = 'contain';
        } else {
            jumbotron.style.background = 'url("../data_static/img/cover_backsm.png")';
            jumbotron.style.backgroundRepeat = 'no-repeat';
            jumbotron.style.backgroundPosition = 'center';
            jumbotron.style.backgroundSize = 'contain';
        }
    }

    window.addEventListener('load', cambiarFondo);
    window.addEventListener('resize', cambiarFondo);

    cambiarFondo();
});


function checkLogin() {
  if (localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn')) {

  } else {
    const usuario = document.getElementById("usuario");

    usuario.remove();
    localStorage.removeItem("darktheme");
    setTimeout(() => {
      alert("¡No estás loggeado!");
      window.location.href = "login.html";
    }, 100);
  }
}

function agregarMenuDespegable(nav) {
  let MenuDesplegable = document.createElement("ul");
  MenuDesplegable.classList.add(
    "dropdown-menu",
    "dropdown-menu-end",
    "back-lgmode",
    "mt-lg-2"
  );
  MenuDesplegable.setAttribute("id", "usermenubox");

  MenuDesplegable.innerHTML = ` 
    <li>
        <a class="dropdown-item" href="my-profile.html">
            <i class="bi bi-person"></i> 
            Mi perfil
        </a>
    </li>
    <li>
        <a class="dropdown-item" href="cart.html">
            <i class="bi bi-cart"></i> 
            Mi carrito
        </a>
    </li>
    <li><hr class="dropdown-divider"></li>
    <li>
    <div class="dropdown-item">
        <span>Modo Claro / Modo Oscuro</span>
        <div class="contain text-center">
            <label class="toggleswitch">
                <input type="checkbox" name="switch" class="form-check-input" id="modeswitch">
                <span>
                    <i class="bi bi-brightness-high-fill off"></i>
                    <i class="bi bi-moon-stars-fill on"></i>
                </span>
            </label>
        </div>
    </div>
    </li>
    <li><hr class="dropdown-divider"></li>
    <li>
        <a class="dropdown-item" href="login.html" id="CerrarSesion">
            <i class="bi bi-door-closed"></i> 
            Cerrar sesión
        </a>
    </li>
    `;

  nav.appendChild(MenuDesplegable);

  // Agregamos eventos
  const userdisp = document.getElementById("userdisplay");
  const showarrow = document.getElementById("showuserm");
  const hidearrow = document.getElementById("hideuserm");

  userdisp.addEventListener("click", () => {
    if (showarrow.style.display === "none") {
      showarrow.style.display = "inline-block";
      hidearrow.style.display = "none";
    } else {
      showarrow.style.display = "none";
      hidearrow.style.display = "inline-block";
    }
  });
}

function CerrarSesion() {
  if (dataLocation) {
    usuarioActivo.carrito = JSON.parse(localStorage.getItem("infoProducto"));
    localStorage.clear();
    localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
  } else {
    usuarioActivo.carrito = JSON.parse(localStorage.getItem("infoProducto"));
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
  }
  window.location.href = "login.html";
}

function agregarModoOscuro() {
  const ligthdarkswitch = document.getElementById("modeswitch");
  const usermenubox = document.getElementById("usermenubox");

  //Cambia en tiempo real el tema seleccionado Light/Dark
  ligthdarkswitch.addEventListener("click", (event) => {
    event.stopPropagation();
    if (ligthdarkswitch.checked) {
      usuarioActivo.selectedtheme = true;
      localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
      localStorage.setItem("darktheme", usuarioActivo.selectedtheme);
      document.documentElement.setAttribute("data-bs-theme", "dark");
      usermenubox.classList.add("back-dkmode");
    } else {
      usuarioActivo.selectedtheme = false;
      localStorage.setItem("Usuariosdb", JSON.stringify(baseDatos));
      localStorage.setItem("darktheme", usuarioActivo.selectedtheme);
      document.documentElement.setAttribute("data-bs-theme", "light");
      usermenubox.classList.remove("back-dkmode");
    }
  });

  //Hace que el switch quede para el lado del tema seleccionado siempre
  const switchstate = localStorage.getItem("darktheme") === "true";
  ligthdarkswitch.checked = switchstate;

  //Cambia el estado del menú de usuario según el tema seleccionado
  const settedmode = localStorage.getItem("darktheme");
  if (settedmode === "true") {
    usermenubox.classList.add("back-dkmode");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  checkLogin();

  baseDatos = JSON.parse(localStorage.getItem("Usuariosdb"));

  dataLocation = localStorage.getItem("dataLocation");

  usuarioActivo = baseDatos.find(
    (usuario) =>
      usuario.nombreUsuario === localStorage.getItem("UsuarioActivo")
  );


  let email = usuarioActivo.nombreUsuario;
  let li_nav = document.getElementById("usuario");

  li_nav.classList.add("nav-item", "dropdown");
  li_nav.innerHTML = `
        <span class ="nav-link ms-lg-0 ms-2" id="userdisplay" role="button" data-bs-toggle="dropdown" 
        aria-expanded="false" data-bs-auto-close="outside">${email}
        <i class="bi bi-caret-up" id="hideuserm" style="display: none;"></i>
        <i class="bi bi-caret-down" id="showuserm"></i>
        </span>
    `;

  agregarMenuDespegable(li_nav);

  agregarModoOscuro();

  const BotonCerrarSesion = document.getElementById("CerrarSesion");

  if (BotonCerrarSesion) {
    BotonCerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      CerrarSesion();
    });
  }
});
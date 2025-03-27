import { cargarHeader } from "./components/header/header.js";
import { cargarLista } from "./components/lista/listado.js";
import { footer } from "./components/footer/footer.js";
import { cargarLogin } from "./registro/login/login.js";

const DOM = document.querySelector("#root");

// Función corregida (sin typo)
function cargarContenidoPrincipal(maestroId, grado_id) {
    DOM.innerHTML = '';
    
    let contenedor = document.createElement("div");
    contenedor.className = "div-contenedor";
    
    // Asegurarse de que cada componente devuelve un Node válido
    contenedor.appendChild(cargarHeader());
    
    // cargarLista ahora es asíncrona, necesitamos manejar la promesa
    cargarLista(maestroId).then(lista => {
        contenedor.appendChild(lista);
        contenedor.appendChild(footer(maestroId, grado_id));
        DOM.appendChild(contenedor);
    }).catch(error => {
        console.error("Error al cargar la lista:", error);
        const errorDiv = document.createElement("div");
        errorDiv.textContent = "Error al cargar la lista de alumnos";
        contenedor.appendChild(errorDiv);
        DOM.appendChild(contenedor);
    });
}

window.addEventListener('volverAlLogin', () => {
    DOM.innerHTML = '';
    cargarLogin(DOM, cargarContenidoPrincipal);
});

// Iniciar con el login
cargarLogin(DOM, cargarContenidoPrincipal);


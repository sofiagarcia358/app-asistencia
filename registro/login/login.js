import { cargarHeader, actualizarUsuario } from "../../components/header/header.js";

export function cargarLogin(DOM, cargarContenidoPrincipal) {
    // Limpiar el contenedor principal
    DOM.innerHTML = '';
    
    // Crear contenedor del login
    const loginContainer = document.createElement("div");
    loginContainer.className = "login-container";

    // Crear caja del formulario
    const loginBox = document.createElement("div");
    loginBox.className = "login-box";

    // Título del formulario
    const titulo = document.createElement("h2");
    titulo.textContent = "Iniciar Sesión";

    // Campo de usuario
    const usuarioInput = document.createElement("input");
    usuarioInput.type = "text";
    usuarioInput.placeholder = "Usuario";
    usuarioInput.id = "usuario";
    usuarioInput.required = true;

    // Campo de contraseña
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Contraseña";
    passwordInput.id = "password";
    passwordInput.required = true;

    // Botón de login
    const loginButton = document.createElement("button");
    loginButton.textContent = "Ingresar";
    loginButton.className = "login-button";

    // Mensaje de error
    const errorMsg = document.createElement("p");
    errorMsg.className = "error-msg";
    errorMsg.style.display = "none";

    // Manejador del evento click
    loginButton.addEventListener("click", async () => {
        const usuario = usuarioInput.value.trim();
        const password = passwordInput.value.trim();

        // Validación básica
        if (!usuario || !password) {
            errorMsg.textContent = "Por favor, ingresa usuario y contraseña.";
            errorMsg.style.display = "block";
            return;
        }

        try {
            // Realizar petición al backend
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    usuario: usuario, 
                    contraseña: password 
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Mapeo de grados
                const GRADOS = {
                    1: "Nursery",
                    2: "Kinder",
                    3: "Pre-kinder",
                    4: "Preparatoria",
                    7: "1ro Primaria",
                    8: "2do Primaria",
                    9: "3ro Primaria",
                    10: "4to Primaria",
                    11: "5to Primaria",
                    12: "6to Primaria",
                    13: "1ro Básico",
                    14: "2do Básico",
                    15: "3ro Básico",
                    16: "4to Computación",
                    17: "4to Biologicas",
                    18: "4to Diseño",
                    19: "4to Perito",
                    20: "5to Computación",
                    21: "5to Biologicas",
                    22: "5to Diseño",
                    23: "5to Perito",
                    24: "6to Perito",
                };

                // Obtener el nombre del grado
                const grado = GRADOS[data.usuario.grado_id] || "Grado no definido";
                
                // Actualizar el header con los datos del usuario
                actualizarUsuario(data.usuario.usuario, grado);
                
                // Cargar el contenido principal pasando el ID del maestro
                if (typeof cargarContenidoPrincipal === 'function') {
                    cargarContenidoPrincipal(data.usuario.id, data.usuario.grado_id);
                } else {
                    console.error('Error: cargarContenidoPrincipal no es una función válida');
                    errorMsg.textContent = "Error interno. Por favor, recarga la página.";
                    errorMsg.style.display = "block";
                }
            } else {
                // Mostrar error del servidor
                errorMsg.textContent = data.error || "Credenciales incorrectas";
                errorMsg.style.display = "block";
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
            errorMsg.textContent = "Error de conexión con el servidor. Inténtalo de nuevo.";
            errorMsg.style.display = "block";
        }
    });

    // También manejar el evento submit con Enter
    loginBox.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            loginButton.click();
        }
    });

    // Construir la estructura del formulario
    loginBox.appendChild(titulo);
    loginBox.appendChild(usuarioInput);
    loginBox.appendChild(passwordInput);
    loginBox.appendChild(loginButton);
    loginBox.appendChild(errorMsg);

    // Agregar todo al DOM
    loginContainer.appendChild(loginBox);
    DOM.appendChild(loginContainer);
}
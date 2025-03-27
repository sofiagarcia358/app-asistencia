// Variable global para almacenar los datos del usuario
let usuarioActual = {
    nombre: "Usuario",
    grado: "Grado no definido"
 };
 
 
 // Función para actualizar los datos del usuario
 export function actualizarUsuario(nuevoUsuario, nuevoGrado) {
    usuarioActual.nombre = nuevoUsuario || "Usuario no encontrado";
    usuarioActual.grado = nuevoGrado || "Grado no encontrado";
   
    // Actualizar el header si ya existe
    const headerExistente = document.querySelector(".div-header");
    if (headerExistente) {
        const h1Usuario = headerExistente.querySelector("h1:nth-of-type(1)");
        const h1Grado = headerExistente.querySelector("h1:nth-of-type(2)");
       
        if (h1Usuario) h1Usuario.textContent = usuarioActual.nombre;
        if (h1Grado) h1Grado.textContent = usuarioActual.grado;
    }
 }
 
 
 // Función principal para cargar el header
 export function cargarHeader() {
    let divHeader = document.createElement("div");
    divHeader.className = "div-header"; // Solo esta clase
 
 
    let logo = document.createElement("img");
    logo.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-nqwS5G2tvPr5nXbz9fsC646akdRq0T_8BCLqaQyzqVe7EpuFJafFHY7wgKsyv-lUnU&usqp=CAU";
    divHeader.appendChild(logo);
 
 
    let h1Usuario = document.createElement("h1");
    h1Usuario.textContent = usuarioActual.nombre;
    divHeader.appendChild(h1Usuario);
 
 
    let h1Grado = document.createElement("h1");
    h1Grado.textContent = usuarioActual.grado;
    divHeader.appendChild(h1Grado);
 
 
    let fecha = document.createElement("h2");
    fecha.className = "fecha-actualizada";
    divHeader.appendChild(fecha);
 
 
    function actualizarFecha() {
        let fechaActual = new Date().toLocaleDateString();
        fecha.textContent = fechaActual;
    }
    actualizarFecha();
    setInterval(actualizarFecha, 1000 * 60 * 60 * 24);
 
 
    return divHeader;
 }
 
 
 // Función para manejar el login
 export async function manejarLogin(usuario, password) {
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario, contraseña: password })
        });
 
 
        const data = await response.json();
 
 
        if (response.ok) {
            const GRADOS = {
                1: "1ro Básico",
                2: "2do Básico",
                3: "3ro Básico",
                4: "4to Computación",
                5: "5to Computación"
               
            };
 
 
            const grado = GRADOS[data.usuario.grado_id] || "Grado no definido";
            actualizarUsuario(data.usuario.usuario, grado);
            return { success: true };
        } else {
            return { success: false, message: data.message || "Credenciales incorrectas" };
        }
    } catch (error) {
        console.error("Error en la conexión:", error);
        return { success: false, message: "Error en la conexión. Inténtalo de nuevo." };
    }
 }
 
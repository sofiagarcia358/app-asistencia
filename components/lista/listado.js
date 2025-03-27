export async function cargarLista(maestroId) {
    let div = document.createElement("div");
    div.className = "div-lista";

    let h1 = document.createElement('h1');
    h1.innerText = "Asistencia de Alumnos: ";
    h1.className = "titulo";
    div.appendChild(h1);

    const listaAlumnos = document.createElement('ul');
    listaAlumnos.className = 'lista-alumnos';
    div.appendChild(listaAlumnos);

    try {
        const response = await fetch(`http://localhost:3000/alumnos-por-maestro/${maestroId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const alumnos = await response.json();
        
        if (alumnos.length === 0) {
            const mensaje = document.createElement('p');
            mensaje.textContent = 'No hay alumnos asignados a este grado.';
            listaAlumnos.appendChild(mensaje);
        } else {
            alumnos.forEach(alumno => {
                const li = crearItemAlumno(alumno.nombre);
                listaAlumnos.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error al cargar alumnos:', error);
        listaAlumnos.innerHTML = '';
        const errorMsg = document.createElement('p');
        errorMsg.className = 'error-msg';
        errorMsg.textContent = 'Error al cargar la lista de alumnos.';
        listaAlumnos.appendChild(errorMsg);
    }

    // Asegurarnos de devolver un Node válido
    return div;
}

function crearItemAlumno(nombre) {
    const li = document.createElement('li');
    li.className = 'alumno-item';
    
    const nombreSpan = document.createElement('span');
    nombreSpan.className = 'alumno-nombre';
    nombreSpan.textContent = nombre;
    li.appendChild(nombreSpan);
    
    const btnPresente = document.createElement('button');
    btnPresente.className = 'estado-btn presente';
    btnPresente.innerHTML = '✓';
    btnPresente.title = 'Marcar como presente';
    li.appendChild(btnPresente);
    
    const btnAusente = document.createElement('button');
    btnAusente.className = 'estado-btn ausente';
    btnAusente.innerHTML = '✗';
    btnAusente.title = 'Marcar como ausente';
    li.appendChild(btnAusente);
    
    btnPresente.addEventListener('click', () => {
        li.classList.add('presente');
        li.classList.remove('ausente');
    });
    
    btnAusente.addEventListener('click', () => {
        li.classList.add('ausente');
        li.classList.remove('presente');
    });
    
    return li;
}
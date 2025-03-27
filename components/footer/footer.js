function footer(maestroId, gradoId) {
    const div = document.createElement('div');
    div.className = "div-footer";

    const guardar = document.createElement('button');
    guardar.className = "btn-guardar";
    guardar.textContent = "Guardar";

    const regresar = document.createElement('button');
    regresar.className = "regresar";
    regresar.textContent = "Regresar";

    guardar.addEventListener('click', async () => {
        const btnOriginalText = guardar.textContent;
        guardar.disabled = true;
        guardar.textContent = "Guardando...";
        
        try {
            // 1. Preparar datos de asistencia
            const asistenciaData = {
                maestro_id: maestroId,
                grado_id: gradoId,
                fecha: new Date().toISOString().split('T')[0],
                alumnos: []
            };

            // 2. Recopilar datos de cada alumno
            const alumnosItems = document.querySelectorAll('.alumno-item');
            
            if (alumnosItems.length === 0) {
                throw new Error("No hay alumnos para guardar");
            }

            alumnosItems.forEach(item => {
                const nombre = item.querySelector('.alumno-nombre').textContent.trim();
                if (!nombre) {
                    throw new Error("Nombre de alumno no puede estar vacío");
                }

                asistenciaData.alumnos.push({
                    nombre: nombre,
                    estado: item.classList.contains('presente') // true/false
                });
            });

            // 3. Mostrar datos en consola para depuración
            console.log("Datos a enviar al servidor:", JSON.stringify(asistenciaData, null, 2));

            // 4. Enviar al servidor
            const response = await fetch('http://localhost:3000/guardar-asistencia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(asistenciaData)
            });

            // 5. Procesar respuesta
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Error ${response.status} al guardar`);
            }

            // 6. Mostrar confirmación
            alert(`Asistencia guardada correctamente para ${asistenciaData.alumnos.length} alumnos`);

        } catch (error) {
            console.error("Error detallado:", {
                message: error.message,
                stack: error.stack,
                maestroId,
                gradoId
            });
            alert(`Error al guardar: ${error.message}`);
        } finally {
            guardar.disabled = false;
            guardar.textContent = btnOriginalText;
        }
    });

    regresar.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('volverAlLogin'));
    });

    div.append(guardar, regresar);
    return div;
}

export { footer };
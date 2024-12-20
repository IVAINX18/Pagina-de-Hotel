document.addEventListener('DOMContentLoaded', () => {
    cargarReservas();

    // Función para cargar reservas desde el servidor
    async function cargarReservas() {
        try {
            const response = await fetch('PHP/reserva_manager.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'accion=listar'
            });

            const result = await response.json();
            if (result.success) {
                mostrarReservas(result.data);
            } else {
                alert('Error al cargar reservas: ' + result.message);
            }
        } catch (error) {
            console.error('Error al cargar reservas:', error);
            alert('Error al cargar reservas.');
        }
    }

    // Función para mostrar reservas en la tabla HTML
    function mostrarReservas(reservas) {
        const tabla = document.getElementById('tabla-reservas').querySelector('tbody');
        tabla.innerHTML = '';

        reservas.forEach(reserva => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${reserva.id}</td>
                <td>${reserva.nombre}</td>
                <td>${reserva.email}</td>
                <td>${reserva.fecha_entrada}</td>
                <td>${reserva.fecha_salida}</td>
                <td>${reserva.tipo_habitacion}</td>
                <td>${reserva.comentarios}</td>
                <td>
                    <button class="btn-actualizar" data-id="${reserva.id}">Actualizar</button>
                    <button class="btn-cancelar" data-id="${reserva.id}">Cancelar</button>
                </td>
            `;
            tabla.appendChild(fila);
        });

        // Eventos de botones
        document.querySelectorAll('.btn-actualizar').forEach(btn => btn.addEventListener('click', actualizarReserva));
        document.querySelectorAll('.btn-cancelar').forEach(btn => btn.addEventListener('click', cancelarReserva));
    }

    // Actualización
    async function actualizarReserva(event) {
        const id = event.target.dataset.id;
        const fila = event.target.closest('tr');
        const datos = Array.from(fila.children).map(celda => celda.textContent);

        document.getElementById('nombre-mostrado').textContent = datos[1];
        document.getElementById('email-mostrado').textContent = datos[2];
        document.getElementById('id-reserva').value = id;
        document.getElementById('fecha_entrada').value = datos[3];
        document.getElementById('fecha_salida').value = datos[4];
        document.getElementById('tipo_habitacion').value = datos[5];

        document.getElementById('formulario-actualizar').style.display = 'block';
    }

    // Envío del formulario de actualización
    document.getElementById('form-actualizar-reserva').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('accion', 'actualizar'); // Add this line to specify the action
    
        try {
            const response = await fetch('PHP/reserva_manager.php', {
                method: 'POST',
                body: new URLSearchParams(formData)
            });
    
            const result = await response.json();
            if (result.success) {
                alert(result.message);
                document.getElementById('formulario-actualizar').style.display = 'none';
                cargarReservas();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error en la actualización:', error);
            alert('Error en la actualización.');
        }
    });

    // Cancelación
    async function cancelarReserva(event) {
        const id = event.target.dataset.id;

        if (confirm('¿Seguro que deseas cancelar esta reserva?')) {
            try {
                const response = await fetch('PHP/reserva_manager.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `accion=cancelar&id=${id}`
                });

                const result = await response.json();
                if (result.success) {
                    alert(result.message);
                    cargarReservas();
                } else {
                    alert('Error al cancelar: ' + result.message);
                }
            } catch (error) {
                console.error('Error al cancelar:', error);
                alert('Error al cancelar la reserva.');
            }
        }
    }
});

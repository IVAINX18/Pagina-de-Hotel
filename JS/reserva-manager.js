document.addEventListener('DOMContentLoaded', () => {
    cargarReservas();

    // Función para cargar todas las reservas
    async function cargarReservas() {
        const response = await fetch('PHP/HANDLERS/reserva_manager.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'accion=listar',
        });
        const reservas = await response.json();
        mostrarReservas(reservas);
    }

    // Función para mostrar reservas en la tabla
    function mostrarReservas(reservas) {
        const tabla = document.getElementById('tabla-reservas').querySelector('tbody');
        tabla.innerHTML = ''; // Limpiar contenido previo

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

        // Añadir eventos a los botones
        document.querySelectorAll('.btn-actualizar').forEach(btn => {
            btn.addEventListener('click', actualizarReserva);
        });
        document.querySelectorAll('.btn-cancelar').forEach(btn => {
            btn.addEventListener('click', cancelarReserva);
        });
    }

    // Función para actualizar una reserva
    async function actualizarReserva(event) {
        const id = event.target.dataset.id;
        // Aquí podrías mostrar un formulario de actualización con los datos existentes
        alert(`Actualizar reserva con ID: ${id}`);
    }

    // Función para cancelar una reserva
    async function cancelarReserva(event) {
        const id = event.target.dataset.id;
        const confirmacion = confirm('¿Estás seguro de que deseas cancelar esta reservación?');
        if (confirmacion) {
            const response = await fetch('PHP/HANDLERS/reserva_manager.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `accion=cancelar&id=${id}`,
            });
            const result = await response.json();
            alert(result.message);
            cargarReservas(); // Recargar la lista
        }
    }
});

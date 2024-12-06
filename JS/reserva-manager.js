// Espera a que el contenido del documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Carga las reservas al iniciar
    cargarReservas();

    // Función para cargar todas las reservas desde el servidor
    async function cargarReservas() {
        try {
            const response = await fetch('PHP/reserva_manager.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'accion=listar'
            });
    
            if (!response.ok) {
                throw new Error('Error en la conexión con el servidor');
            }
    
            const reservas = await response.json();
    
            if (reservas.success) {
                mostrarReservas(reservas.data);
            } else {
                console.error('Error en el servidor:', reservas.message);
                alert('No se pudieron cargar las reservas: ' + reservas.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cargar reservas: ' + error.message);
        }
    }
    

    // Función para mostrar reservas en la tabla HTML
    function mostrarReservas(reservas) {
        // Obtiene el cuerpo de la tabla donde se mostrarán las reservas
        const tabla = document.getElementById('tabla-reservas').querySelector('tbody');
        tabla.innerHTML = ''; // Limpia el contenido previo de la tabla

        // Itera sobre cada reserva y crea una fila en la tabla
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
            // Añade la fila a la tabla
            tabla.appendChild(fila);
        });

        // Añade eventos a los botones de actualizar
        document.querySelectorAll('.btn-actualizar').forEach(btn => {
            btn.addEventListener('click', actualizarReserva);
        });
        // Añade eventos a los botones de cancelar
        document.querySelectorAll('.btn-cancelar').forEach(btn => {
            btn.addEventListener('click', cancelarReserva);
        });
    }

    // Función para actualizar una reserva
    async function actualizarReserva(event) {
        const id = event.target.dataset.id; // Obtiene el ID de la reserva desde el botón
        // Aquí podrías mostrar un formulario de actualización con los datos existentes
        alert(`Actualizar reserva con ID: ${id}`);
    }

    // Función para cancelar una reserva
    async function cancelarReserva(event) {
        const id = event.target.dataset.id; // Obtiene el ID de la reserva desde el botón
        // Confirma si el usuario realmente desea cancelar la reserva
        const confirmacion = confirm('¿Estás seguro de que deseas cancelar esta reservación?');
        if (confirmacion) {
            // Realiza una solicitud POST al archivo PHP para cancelar la reserva
            const response = await fetch('PHP/reserva_manager.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `accion=cancelar&id=${id}`, // Indica la acción y el ID de la reserva
            });
            // Convierte la respuesta en formato JSON
            const result = await response.json();
            // Muestra un mensaje con el resultado de la cancelación
            alert(result.message);
            // Recarga la lista de reservas
            cargarReservas();
        }
    }
});
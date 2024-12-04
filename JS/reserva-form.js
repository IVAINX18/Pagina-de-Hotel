document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reserva-form');
    const fechaEntrada = document.getElementById('fecha_entrada');
    const fechaSalida = document.getElementById('fecha_salida');

    // Set minimum date for check-in
    const today = new Date().toISOString().split('T')[0];
    fechaEntrada.min = today;

    // Update minimum check-out date when check-in date changes
    fechaEntrada.addEventListener('change', function() {
        fechaSalida.min = this.value;
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(form);

        // Validar que todos los campos estén completos
        if (!utils.validateForm(formData)) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            // Enviar los datos al servidor
            const response = await fetch('PHP/HANDLERS/reserva_handler.php', {
                method: 'POST',
                body: formData
            });

            // Convertir la respuesta del servidor a JSON
            const result = await response.json();

            // Mostrar el mensaje correspondiente según el resultado
            if (result.success) {
                alert('Reserva realizada con éxito');
                form.reset(); // Limpiar el formulario
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un problema al procesar la reserva');
        }
    });
});

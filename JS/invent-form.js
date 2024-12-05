// Espera a que el contenido del documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene el formulario del inventario por su ID
    const form = document.getElementById('inventario-form');

    // Añade un evento que se activa al enviar el formulario
    form.addEventListener('submit', async function(e) {
        // Previene el comportamiento predeterminado del formulario (que es recargar la página)
        e.preventDefault();

        // Crea un objeto FormData a partir del formulario para facilitar el envío de datos
        const formData = new FormData(form);

        // Validar que todos los campos del formulario estén completos
        if (!validateForm(formData)) {
            alert('Por favor, complete todos los campos.'); // Muestra un mensaje de alerta si hay campos vacíos
            return; // Sale de la función si la validación falla
        }

        try {
            // Envía los datos del formulario al servidor utilizando fetch
            const response = await fetch('PHP/invent_handler.php', {
                method: 'POST', // Método HTTP que se usará para enviar los datos
                body: formData // Los datos del formulario se envían en el cuerpo de la solicitud
            });

            // Convierte la respuesta del servidor a formato JSON
            const result = await response.json();

            // Muestra un mensaje según el resultado de la operación
            if (result.success) {
                alert('Elemento agregado al inventario con éxito'); // Mensaje de éxito
                form.reset(); // Limpia el formulario para permitir una nueva entrada
            } else {
                alert('Error: ' + result.message); // Muestra un mensaje de error si la operación falla
            }
        } catch (error) {
            // Manejo de errores en caso de que la solicitud falle
            console.error('Error:', error); // Muestra el error en la consola
            alert('Ocurrió un problema al procesar la solicitud'); // Mensaje de alerta para el usuario
        }
    });

    // Función para validar que todos los campos requeridos del formulario estén completos
    function validateForm(formData) {
        // Recorre cada entrada del FormData
        for (let [key, value] of formData.entries()) {
            // Si algún campo está vacío, retorna false
            if (!value) {
                return false; // Indica que la validación ha fallado
            }
        }
        return true; // Todos los campos están completos, retorna true
    }
});
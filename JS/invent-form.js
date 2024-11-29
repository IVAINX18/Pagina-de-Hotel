document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inventario-form');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(form);

        // Validar que todos los campos estén completos
        if (!validateForm(formData)) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            // Enviar los datos al servidor
            const response = await fetch('PHP/invent_handler.php', {
                method: 'POST',
                body: formData
            });

            // Convertir la respuesta del servidor a JSON
            const result = await response.json();

            // Mostrar el mensaje correspondiente según el resultado
            if (result.success) {
                alert('Elemento agregado al inventario con éxito');
                form.reset(); // Limpiar el formulario
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un problema al procesar la solicitud');
        }
    });

    function validateForm(formData) {
        // Validación simple: verificar que todos los campos requeridos estén completos
        for (let [key, value] of formData.entries()) {
            if (!value) {
                return false;
            }
        }
        return true;
    }
});

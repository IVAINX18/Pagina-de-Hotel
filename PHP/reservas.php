<form id="reserva-form" action="PHP/reservas.php" method="POST">
    <input type="text" name="nombre" required>
    <input type="text" name="apellido" required>
    <input type="tel" name="telefono" required>
    <select name="habitacion" required>
        <!-- Opciones de habitaciones -->
    </select>
    <input type="date" name="fecha_entrada" required>
    <input type="date" name="fecha_salida" required>
    <input type="number" name="precio" required>
    <button type="submit">Confirmar Reserva</button>
</form>

<script>
document.getElementById('reserva-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    try {
        const response = await fetch('PHP/reservas.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.text();
        
        if (result.includes("éxito")) {
            alert('Reserva realizada con éxito');
            // Redirigir o actualizar la página según sea necesario
        } else {
            alert('Hubo un problema: ' + result);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al procesar la reserva');
    }
});
</script>
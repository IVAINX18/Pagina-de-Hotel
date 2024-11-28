<?php
// Configuración de la conexión a la base de datos
$host = "localhost"; // Cambiar según la configuración del servidor
$dbname = "mi_base_datos"; // Cambiar por el nombre de tu base de datos
$username = "root"; // Cambiar según tu configuración
$password = ""; // Cambiar según tu configuración

try {
    // Conexión a la base de datos usando PDO
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Obtener datos del formulario
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $telefono = $_POST['telefono'];
    $habitacion = $_POST['habitacion'];
    $fecha_entrada = $_POST['fecha_entrada'];
    $fecha_salida = $_POST['fecha_salida'];
    $precio = $_POST['precio'];

    // Validar datos (opcional)
    if (empty($nombre) || empty($apellido) || empty($telefono) || empty($habitacion) || empty($fecha_entrada) || empty($fecha_salida) || empty($precio)) {
        die("Por favor completa todos los campos.");
    }

    // Insertar datos en la tabla
    $sql = "INSERT INTO reservas (nombre, apellido, telefono, habitacion, fecha_entrada, fecha_salida, precio) 
            VALUES (:nombre, :apellido, :telefono, :habitacion, :fecha_entrada, :fecha_salida, :precio)";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':apellido', $apellido);
    $stmt->bindParam(':telefono', $telefono);
    $stmt->bindParam(':habitacion', $habitacion);
    $stmt->bindParam(':fecha_entrada', $fecha_entrada);
    $stmt->bindParam(':fecha_salida', $fecha_salida);
    $stmt->bindParam(':precio', $precio);

    if ($stmt->execute()) {
        echo "Reserva realizada con éxito.";
    } else {
        echo "Hubo un problema al realizar la reserva.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// Cerrar conexión
$conn = null;
?>

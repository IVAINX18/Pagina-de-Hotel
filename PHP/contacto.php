<?php
// Configuración de la base de datos
$servidor = "localhost"; // Cambiar si el servidor no está en localhost
$usuario = "root";       // Usuario de la base de datos
$password = "";          // Contraseña del usuario
$baseDatos = "hotel_cerrito"; // Cambia "mi_base_datos" por el nombre de tu base

// Conectar a la base de datos
$conn = new mysqli($servidor, $usuario, $password, $baseDatos);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Verificar si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Recibir los datos del formulario
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $correo = $conn->real_escape_string($_POST['correo']);
    $mensaje = $conn->real_escape_string($_POST['mensaje']);

    // Validar que los campos no estén vacíos
    if (!empty($nombre) && !empty($correo) && !empty($mensaje)) {
        // Insertar datos en la base de datos
        $sql = "INSERT INTO contactos (nombre, correo, mensaje) VALUES ('$nombre', '$correo', '$mensaje')";

        if ($conn->query($sql) === TRUE) {
            echo "Mensaje enviado correctamente. Gracias por contactarnos.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Por favor, completa todos los campos.";
    }
}

// Cerrar la conexión
$conn->close();
?>

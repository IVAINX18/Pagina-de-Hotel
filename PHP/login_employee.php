<?php
require 'db.php'; // Archivo de conexión a la base de datos

header('Content-Type: application/json'); // La respuesta será en formato JSON

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Preparar consulta para buscar al empleado por su usuario
    $stmt = $conn->prepare("SELECT * FROM empleados WHERE usuario = :usuario");
    $stmt->bindParam(':usuario', $username);
    $stmt->execute();

    // Obtener el resultado de la consulta
    $empleado = $stmt->fetch();

    // Verificar si el empleado existe y si la contraseña coincide
    if ($empleado && $empleado['contraseña'] === $password) {
        echo json_encode([
            "success" => true,
            "message" => "Bienvenido, " . htmlspecialchars($username) . "!",
            "redirect" => "HTML/inventario.html" // Ruta a redirigir en caso de éxito
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Usuario o contraseña incorrectos. Por favor, verifica tus datos."
        ]);
    }
}
?>

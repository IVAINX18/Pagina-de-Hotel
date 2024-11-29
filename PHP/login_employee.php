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
        // Si el login es exitoso, guardar la sesión
        session_start();
        $_SESSION['empleado'] = [
            'id' => $empleado['id'],
            'usuario' => $empleado['usuario']
        ];

        echo json_encode([
            "success" => true,
            "message" => "Bienvenido, " . htmlspecialchars($username) . "!",
            "userType" => "empleado", // Agrega esta línea
            "redirect" => "inventario.html"
        ]);
        
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Usuario o contraseña incorrectos. Por favor, verifica tus datos."
        ]);
    }
}


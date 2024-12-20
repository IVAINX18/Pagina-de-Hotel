<?php
require 'db.php'; // Archivo de conexión a la base de datos

header('Content-Type: application/json'); // La respuesta será en formato JSON

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    // Validar que los campos no estén vacíos
    if (empty($username) || empty($password)) {
        echo json_encode([
            "success" => false,
            "message" => "Por favor, completa todos los campos."
        ]);
        exit;
    }

    // Preparar consulta para buscar al empleado por su usuario
    $stmt = $conn->prepare("SELECT * FROM empleados WHERE usuario = :usuario");
    $stmt->bindParam(':usuario', $username);
    $stmt->execute();

    // Obtener todos los resultados
    $empleados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Verificar si el empleado existe
    if (count($empleados) > 0) {
        $empleado = $empleados[0]; // Obtener el primer empleado encontrado

        // Verificar si la contraseña coincide (asegúrate de usar password_verify si las contraseñas están hasheadas)
        if ($empleado['contraseña'] === $password) {
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
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Usuario o contraseña incorrectos. Por favor, verifica tus datos."
        ]);
    }
}
?>
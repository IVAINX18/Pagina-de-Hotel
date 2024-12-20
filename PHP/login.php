<?php
require 'db.php'; // Archivo de conexión a la base de datos
session_start();
header('Content-Type: application/json');

// Validación de las credenciales de cliente
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Verificar si se proporcionaron las credenciales
if (empty($username) || empty($password)) {
    echo json_encode([
        'success' => false,
        'message' => 'Por favor, completa todos los campos.'
    ]);
    exit;
}

try {
    // Preparar la consulta para buscar al cliente
    $stmt = $conn->prepare("SELECT * FROM clientes WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();

    // Obtener todos los resultados
    $clientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Verificar si el cliente existe
    if (count($clientes) > 0) {
        $cliente = $clientes[0]; // Obtener el primer cliente encontrado
        if (password_verify($password, $cliente['password'])) {
            // Almacenar información del cliente en la sesión
            $_SESSION['cliente'] = [
                'id' => $cliente['id'],
                'username' => $cliente['username']
            ];
            echo json_encode([
                'success' => true,
                'message' => 'Login exitoso',
                'userType' => 'cliente' // Devolver tipo de usuario
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Contraseña incorrecta'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Usuario no encontrado'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error en la base de datos: ' . $e->getMessage()
    ]);
}
?>
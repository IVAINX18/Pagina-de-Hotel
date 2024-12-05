<?php
require 'db.php'; // Archivo de conexión a la base de datos
session_start();
header('Content-Type: application/json');

// Validación de las credenciales de cliente
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

$stmt = $conn->prepare("SELECT * FROM clientes WHERE username = :username");
$stmt->bindParam(':username', $username);
$stmt->execute();

$cliente = $stmt->fetch();

if ($cliente && password_verify($password, $cliente['password'])) {
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
        'message' => 'Credenciales incorrectas'
    ]);
}
?>

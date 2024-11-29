<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Verificar si las contraseñas coinciden
    if ($password !== $confirm_password) {
        echo json_encode(["success" => false, "message" => "Las contraseñas no coinciden."]);
        exit;
    }

    // Verificar si el usuario ya existe
    $stmt = $conn->prepare("SELECT * FROM clientes WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "El usuario ya está registrado."]);
    } else {
        // Insertar el nuevo cliente con contraseña cifrada
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare("INSERT INTO clientes (username, password) VALUES (:username, :password)");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $hashed_password);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Cliente registrado exitosamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al registrar el cliente."]);
        }
    }
}
?>

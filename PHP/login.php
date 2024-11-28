<?php
// Incluimos el archivo de conexión a la base de datos
require 'db.php';

// Comprobamos si la solicitud es de tipo POST, lo que indica que se está enviando un formulario
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtenemos el nombre de usuario y la contraseña del formulario
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Preparamos una consulta para buscar el usuario en la base de datos
    // Usamos una declaración preparada para evitar inyecciones SQL
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = :username");
    // Vinculamos el parámetro :username con el valor de $username
    $stmt->bindParam(':username', $username);
    // Ejecutamos la consulta
    $stmt->execute();

    // Obtenemos los datos del usuario como un arreglo asociativo
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verificamos si el usuario existe y si la contraseña proporcionada es correcta
    if ($user && password_verify($password, $user['password'])) {
        // Si las credenciales son válidas, mostramos un mensaje de bienvenida
        echo "Bienvenido, " . htmlspecialchars($username) . "!";
    } else {
        // Si las credenciales son incorrectas, mostramos un mensaje de error
        echo "Usuario o contraseña incorrectos.";
    }
}
?>

<?php
// Definimos las credenciales para la conexión a la base de datos
$host = 'localhost'; // El servidor de la base de datos
$dbname = 'hotel_cerrito'; // El nombre de la base de datos a la que nos queremos conectar
$user = 'root'; // El usuario de la base de datos
$password = ''; // La contraseña del usuario de la base de datos (vacía en este caso)

// Intentamos establecer una conexión a la base de datos
try {
    // Creamos una nueva instancia de PDO para conectarnos a la base de datos
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    // Configuramos el modo de error de PDO para lanzar excepciones
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Si hay un error en la conexión, mostramos un mensaje de error y terminamos el script
    die("Error al conectar con la base de datos: " . $e->getMessage());
}
?>

<?php
// Incluir la conexión a la base de datos
require_once 'db.php';

$response = array();

try {
    // Recuperar datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $fecha_entrada = $_POST['fecha_entrada'];
    $fecha_salida = $_POST['fecha_salida'];
    $tipo_habitacion = $_POST['tipo_habitacion'];
    $comentarios = isset($_POST['comentarios']) ? $_POST['comentarios'] : null;

    // Preparar la consulta SQL para insertar los datos
    $sql = "INSERT INTO reservas (nombre, email, fecha_entrada, fecha_salida, tipo_habitacion, comentarios) 
            VALUES (:nombre, :email, :fecha_entrada, :fecha_salida, :tipo_habitacion, :comentarios)";
    $stmt = $conn->prepare($sql);

    // Vincular los valores con los parámetros
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':fecha_entrada', $fecha_entrada);
    $stmt->bindParam(':fecha_salida', $fecha_salida);
    $stmt->bindParam(':tipo_habitacion', $tipo_habitacion);
    $stmt->bindParam(':comentarios', $comentarios);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        // Respuesta de éxito
        $response['success'] = true;
        $response['message'] = 'Reserva realizada con éxito.';
    } else {
        // Respuesta de error
        $response['success'] = false;
        $response['message'] = 'Hubo un error al realizar la reserva.';
    }
} catch (PDOException $e) {
    // Manejar errores de la base de datos
    $response['success'] = false;
    $response['message'] = 'Error en la operación: ' . $e->getMessage();
}

// Enviar la respuesta como JSON
echo json_encode($response);
?>

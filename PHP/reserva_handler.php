<?php
require_once 'db.php';

header('Content-Type: application/json');

$response = array();

try {
    // Recuperar datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $fecha_entrada = $_POST['fecha_entrada'];
    $fecha_salida = $_POST['fecha_salida'];
    $tipo_habitacion = $_POST['tipo_habitacion'];
    $comentarios = $_POST['comentarios'] ?? null;

    // Verificar conflictos de reserva
    $conflictQuery = "SELECT * FROM reservas 
                      WHERE tipo_habitacion = :tipo_habitacion 
                      AND (
                          (fecha_entrada <= :fecha_entrada AND fecha_salida >= :fecha_entrada)
                          OR 
                          (fecha_entrada <= :fecha_salida AND fecha_salida >= :fecha_salida)
                          OR
                          (fecha_entrada >= :fecha_entrada AND fecha_salida <= :fecha_salida)
                      )";
    $conflictStmt = $conn->prepare($conflictQuery);
    $conflictStmt->bindParam(':tipo_habitacion', $tipo_habitacion);
    $conflictStmt->bindParam(':fecha_entrada', $fecha_entrada);
    $conflictStmt->bindParam(':fecha_salida', $fecha_salida);
    $conflictStmt->execute();

    // Verificar si hay conflictos de reserva
    if ($conflictStmt->rowCount() > 0) {
        $response = ['success' => false, 'message' => 'Ya existe una reserva para este tipo de habitación en las fechas seleccionadas.'];
    } else {
        // Preparar la consulta SQL para insertar los datos
        $sql = "INSERT INTO reservas (nombre, email, fecha_entrada, fecha_salida, tipo_habitacion, comentarios) 
                VALUES (:nombre, :email, :fecha_entrada, :fecha_salida, :tipo_habitacion, :comentarios)";
        $stmt = $conn->prepare($sql);

        // Ejecutar la consulta
        $result = $stmt->execute([
            ':nombre' => $nombre,
            ':email' => $email,
            ':fecha_entrada' => $fecha_entrada,
            ':fecha_salida' => $fecha_salida,
            ':tipo_habitacion' => $tipo_habitacion,
            ':comentarios' => $comentarios
        ]);

        $response = $result 
            ? ['success' => true, 'message' => 'Reserva realizada con éxito.']
            : ['success' => false, 'message' => 'Hubo un error al realizar la reserva.'];
    }
} catch (PDOException $e) {
    $response = ['success' => false, 'message' => 'Error en la operación: ' . $e->getMessage()];
}

echo json_encode($response);
?>
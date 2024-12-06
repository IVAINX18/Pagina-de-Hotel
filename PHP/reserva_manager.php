<?php
include 'db.php'; // Archivo de conexión

header('Content-Type: application/json');

$accion = $_POST['accion'] ?? '';

if ($accion === 'listar') {
    try {
        $query = "SELECT * FROM reservas";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'data' => $reservas]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al listar reservas: ' . $e->getMessage()]);
    }
} elseif ($accion === 'actualizar') {
    try {
        $id = $_POST['id'] ?? '';
        $fecha_entrada = $_POST['fecha_entrada'] ?? '';
        $fecha_salida = $_POST['fecha_salida'] ?? '';
        $tipo_habitacion = $_POST['tipo_habitacion'] ?? '';

        if (!$id || !$fecha_entrada || !$fecha_salida || !$tipo_habitacion) {
            throw new Exception('Faltan datos obligatorios.');
        }

        $query = "UPDATE reservas SET fecha_entrada = :fecha_entrada, fecha_salida = :fecha_salida, tipo_habitacion = :tipo_habitacion WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':fecha_entrada', $fecha_entrada);
        $stmt->bindParam(':fecha_salida', $fecha_salida);
        $stmt->bindParam(':tipo_habitacion', $tipo_habitacion);
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Reserva actualizada correctamente.']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar: ' . $e->getMessage()]);
    }
} elseif ($accion === 'cancelar') {
    try {
        $id = $_POST['id'] ?? '';
        $query = "DELETE FROM reservas WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        echo json_encode(['success' => true, 'message' => 'Reserva cancelada correctamente.']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al cancelar: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Acción no válida.']);
}
?>

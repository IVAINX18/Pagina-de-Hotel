<?php
include 'db.php'; // Archivo de conexión a la base de datos

header('Content-Type: application/json');

// Obtener la acción enviada desde el formulario
$accion = $_POST['accion'] ?? '';

if ($accion === 'listar') {
    try {
        // Consultar todas las reservas
        $query = "SELECT * FROM reservas";
        $stmt = $conn->prepare($query);
        $stmt->execute();
        $reservas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'data' => $reservas]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al listar las reservas: ' . $e->getMessage()]);
    }

} elseif ($accion === 'actualizar') {
    try {
        $id = $_POST['id'];
        $nombre = $_POST['nombre'];
        $email = $_POST['email'];
        $fecha_entrada = $_POST['fecha_entrada'];
        $fecha_salida = $_POST['fecha_salida'];
        $tipo_habitacion = $_POST['tipo_habitacion'];
        $comentarios = $_POST['comentarios'];

        // Actualizar una reserva específica
        $query = "UPDATE reservas 
                  SET nombre = :nombre, email = :email, fecha_entrada = :fecha_entrada, fecha_salida = :fecha_salida, 
                      tipo_habitacion = :tipo_habitacion, comentarios = :comentarios 
                  WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':fecha_entrada', $fecha_entrada, PDO::PARAM_STR);
        $stmt->bindParam(':fecha_salida', $fecha_salida, PDO::PARAM_STR);
        $stmt->bindParam(':tipo_habitacion', $tipo_habitacion, PDO::PARAM_STR);
        $stmt->bindParam(':comentarios', $comentarios, PDO::PARAM_STR);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Reservación actualizada exitosamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al actualizar la reservación']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al actualizar la reservación: ' . $e->getMessage()]);
    }

} elseif ($accion === 'cancelar') {
    try {
        $id = $_POST['id'];

        // Eliminar una reserva específica
        $query = "DELETE FROM reservas WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Reservación cancelada exitosamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al cancelar la reservación']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error al cancelar la reservación: ' . $e->getMessage()]);
    }
}
?>

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
} else {
    echo json_encode(['success' => false, 'message' => 'Acción no válida']);
}
?>

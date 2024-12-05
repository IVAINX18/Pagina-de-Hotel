<?php
// Incluir la conexión a la base de datos
require_once 'db.php';

$response = array();

try {
    // Recuperar datos del formulario
    $nombre = $_POST['nombre'];
    $categoria = $_POST['categoria'];
    $cantidad = $_POST['cantidad'];
    $descripcion = isset($_POST['descripcion']) ? $_POST['descripcion'] : null;

    // Preparar la consulta SQL para insertar los datos
    $sql = "INSERT INTO inventario (nombre, categoria, cantidad, descripcion) 
            VALUES (:nombre, :categoria, :cantidad, :descripcion)";
    $stmt = $conn->prepare($sql);

    // Vincular los valores con los parámetros
    $stmt->bindParam(':nombre', $nombre);
    $stmt->bindParam(':categoria', $categoria);
    $stmt->bindParam(':cantidad', $cantidad);
    $stmt->bindParam(':descripcion', $descripcion);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        // Respuesta de éxito
        $response['success'] = true;
        $response['message'] = 'Elemento agregado al inventario con éxito.';
    } else {
        // Respuesta de error
        $response['success'] = false;
        $response['message'] = 'Hubo un error al agregar el elemento.';
    }
} catch (PDOException $e) {
    // Manejar errores de la base de datos
    $response['success'] = false;
    $response['message'] = 'Error en la operación: ' . $e->getMessage();
}

// Enviar la respuesta como JSON
echo json_encode($response);
?>

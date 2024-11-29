<?php
session_start();
session_unset(); // Elimina todas las variables de sesión
session_destroy(); // Destruye la sesión
header('Content-Type: application/json');
echo json_encode(['success' => true, 'message' => 'Sesión cerrada']);
?>

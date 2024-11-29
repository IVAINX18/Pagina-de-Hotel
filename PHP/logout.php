<?php
session_start();  // Inicia la sesión
session_destroy();  // Destruye todas las variables de sesión

// Redirige al usuario a la página de inicio
header('Location: ../index.html');
exit;
?>

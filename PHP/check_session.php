<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['cliente'])) {
    echo json_encode(["authenticated" => true, "userType" => 'cliente']);
} elseif (isset($_SESSION['empleado'])) {
    echo json_encode(["authenticated" => true, "userType" => 'empleado']);
} else {
    echo json_encode(["authenticated" => false]);
}
?>

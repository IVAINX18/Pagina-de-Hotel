<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['empleado'])) {
    echo json_encode(["authenticated" => true, "userType" => 'empleado']);
} elseif (isset($_SESSION['cliente'])) {
    echo json_encode(["authenticated" => true, "userType" => 'cliente']);
} else {
    echo json_encode(["authenticated" => false]);
}
?>
<?php
session_start();
$response = ['authenticated' => false];

if (isset($_SESSION['empleado'])) {
    $response['authenticated'] = true;
    $response['userType'] = 'empleado';
} elseif (isset($_SESSION['cliente'])) {
    $response['authenticated'] = true;
    $response['userType'] = 'cliente';
}

echo json_encode($response);
?>

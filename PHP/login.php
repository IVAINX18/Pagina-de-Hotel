<?php
session_start();
header('Content-Type: application/json');

// In a real application, validate against database
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Demo validation - replace with database validation
if ($username === 'demo' && $password === 'demo') {
    $_SESSION['user'] = [
        'id' => 1,
        'username' => $username
    ];
    echo json_encode([
        'success' => true,
        'message' => 'Login successful'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid credentials'
    ]);
}
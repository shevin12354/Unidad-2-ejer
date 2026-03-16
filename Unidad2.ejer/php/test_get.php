<?php
header("Content-Type: application/json");

// Diagnosticar el problema
$action = $_GET["action"] ?? "";

echo json_encode([
    "GET_contenido" => $_GET,
    "action_recibida" => $action,
    "action_vacia" => empty($action),
    "REQUEST_URI" => $_SERVER["REQUEST_URI"],
    "QUERY_STRING" => $_SERVER["QUERY_STRING"]
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
?>

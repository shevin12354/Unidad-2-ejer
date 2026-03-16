<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// FIX: Mostrar errores de PHP como JSON en lugar de HTML que rompe el JSON
set_error_handler(function($errno, $errstr) {
    echo json_encode(["success" => false, "message" => "PHP Error: $errstr"]);
    exit;
});

$conexion = new mysqli("localhost", "root", "", "crud_docentes");

if ($conexion->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Error de conexión: " . $conexion->connect_error
    ]));
}

// FIX: UTF-8 para evitar problemas con caracteres especiales
$conexion->set_charset("utf8");

$action = $_GET["action"] ?? "";
$rawInput = file_get_contents("php://input");
$input = json_decode($rawInput, true);

switch ($action) {

    // ─── LIST ─────────────────────────────────────────────────────────────────
    case "list":

        $result = $conexion->query("SELECT * FROM docentes ORDER BY id ASC");

        if (!$result) {
            echo json_encode(["success" => false, "message" => $conexion->error]);
            exit;
        }

        $docentes = [];
        while ($row = $result->fetch_assoc()) {
            $docentes[] = $row;
        }

        echo json_encode(["success" => true, "data" => $docentes]);
        break;

    // ─── CREATE ───────────────────────────────────────────────────────────────
    case "create":

        if ($input === null) {
            echo json_encode(["success" => false, "message" => "JSON inválido recibido"]);
            exit;
        }

        // FIX: Verificar que todos los campos lleguen
        $campos = ["id","tipo_documento","nombre","apellido","fecha_nacimiento","nivel","area","grado","eps","salario"];
        foreach ($campos as $campo) {
            if (!isset($input[$campo]) || $input[$campo] === "") {
                echo json_encode(["success" => false, "message" => "Campo faltante: $campo"]);
                exit;
            }
        }

        // FIX: Tipos explícitos para evitar errores de bind_param
        $id              = (int)   $input["id"];
        $tipo_documento  =         $input["tipo_documento"];
        $nombre          =         $input["nombre"];
        $apellido        =         $input["apellido"];
        $fecha_nacimiento=         $input["fecha_nacimiento"];
        $nivel           =         $input["nivel"];
        $area            =         $input["area"];
        $grado           =         $input["grado"];
        $eps             =         $input["eps"];
        $salario         = (float) $input["salario"];

        $stmt = $conexion->prepare("
            INSERT INTO docentes
            (id, tipo_documento, nombre, apellido, fecha_nacimiento, nivel, area, grado, eps, salario)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        if (!$stmt) {
            echo json_encode(["success" => false, "message" => "Prepare error: " . $conexion->error]);
            exit;
        }

        // FIX: i=int, s=string, d=double — en el orden correcto
        $stmt->bind_param(
            "issssssssd",
            $id,
            $tipo_documento,
            $nombre,
            $apellido,
            $fecha_nacimiento,
            $nivel,
            $area,
            $grado,
            $eps,
            $salario
        );

        if (!$stmt->execute()) {
            echo json_encode(["success" => false, "message" => "Execute error: " . $stmt->error]);
            exit;
        }

        echo json_encode(["success" => true]);
        break;

    // ─── UPDATE ───────────────────────────────────────────────────────────────
    case "update":

        if ($input === null) {
            echo json_encode(["success" => false, "message" => "JSON inválido recibido"]);
            exit;
        }

        $tipo_documento  =         $input["tipo_documento"];
        $nombre          =         $input["nombre"];
        $apellido        =         $input["apellido"];
        $fecha_nacimiento=         $input["fecha_nacimiento"];
        $nivel           =         $input["nivel"];
        $area            =         $input["area"];
        $grado           =         $input["grado"];
        $eps             =         $input["eps"];
        $salario         = (float) $input["salario"];
        $original_id     = (int)   $input["original_id"];

        $stmt = $conexion->prepare("
            UPDATE docentes SET
                tipo_documento  = ?,
                nombre          = ?,
                apellido        = ?,
                fecha_nacimiento= ?,
                nivel           = ?,
                area            = ?,
                grado           = ?,
                eps             = ?,
                salario         = ?
            WHERE id = ?
        ");

        if (!$stmt) {
            echo json_encode(["success" => false, "message" => "Prepare error: " . $conexion->error]);
            exit;
        }

        $stmt->bind_param(
            "ssssssssdi",
            $tipo_documento,
            $nombre,
            $apellido,
            $fecha_nacimiento,
            $nivel,
            $area,
            $grado,
            $eps,
            $salario,
            $original_id
        );

        if (!$stmt->execute()) {
            echo json_encode(["success" => false, "message" => "Execute error: " . $stmt->error]);
            exit;
        }

        echo json_encode(["success" => true]);
        break;

    // ─── DELETE ───────────────────────────────────────────────────────────────
    case "delete":

        if ($input === null) {
            echo json_encode(["success" => false, "message" => "JSON inválido recibido"]);
            exit;
        }

        $id = (int) $input["id"];

        $stmt = $conexion->prepare("DELETE FROM docentes WHERE id = ?");

        if (!$stmt) {
            echo json_encode(["success" => false, "message" => "Prepare error: " . $conexion->error]);
            exit;
        }

        $stmt->bind_param("i", $id);

        if (!$stmt->execute()) {
            echo json_encode(["success" => false, "message" => "Execute error: " . $stmt->error]);
            exit;
        }

        echo json_encode(["success" => true]);
        break;

    // ─── DEFAULT ──────────────────────────────────────────────────────────────
    default:
        echo json_encode(["success" => false, "message" => "Acción inválida: '$action'"]);
}

$conexion->close();
?>
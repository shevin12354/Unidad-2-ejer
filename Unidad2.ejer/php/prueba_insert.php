<?php

header("Content-Type: application/json");

$conexion = new mysqli("localhost","root","","crud_docentes");

if($conexion->connect_error){
    die(json_encode([
        "error"=>"Error de conexión: " . $conexion->connect_error
    ]));
}

// Esto simula un INSERT de prueba
$datos = [
    "id" => 123,
    "tipo_documento" => "CC",
    "nombre" => "Test",
    "apellido" => "User",
    "fecha_nacimiento" => "2000-01-01",
    "nivel" => "Pregrado",
    "area" => "Sistemas",
    "grado" => "1er Semestre",
    "eps" => "EPS Test",
    "salario" => 1500000
];

$stmt = $conexion->prepare("
INSERT INTO docentes
(id,tipo_documento,nombre,apellido,fecha_nacimiento,nivel,area,grado,eps,salario)
VALUES (?,?,?,?,?,?,?,?,?,?)
");

if(!$stmt){
    die(json_encode([
        "error" => "Error: " . $conexion->error
    ]));
}

$stmt->bind_param(
"issssssssd",
$datos["id"],
$datos["tipo_documento"],
$datos["nombre"],
$datos["apellido"],
$datos["fecha_nacimiento"],
$datos["nivel"],
$datos["area"],
$datos["grado"],
$datos["eps"],
$datos["salario"]
);

if($stmt->execute()){
    echo json_encode([
        "success" => true,
        "message" => "Registro de prueba insertado correctamente"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "error" => $stmt->error
    ]);
}

$conexion->close();
?>

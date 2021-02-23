<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "steam_cliente";
$usuario   = "root";
$password  = "";

$id_cliente=$_POST["id_cliente"];
$fecha_expiracion=$_POST["fecha_expiracion"];


// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

$sql = "INSERT INTO suscripcion (id_cliente, fecha_expiracion, precio) VALUES ('"; 
$sql.= $id_cliente."','". $fecha_expiracion."',10);";
$resultado = mysqli_query($conexion,$sql);

// echo $sql;


if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
}

echo json_encode($respuesta);

mysqli_close($conexion);
?>
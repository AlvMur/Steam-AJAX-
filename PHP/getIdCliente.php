<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "steam_cliente";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

$email = $_GET["emailBusca"];
// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT id_cliente FROM cliente where email ='".$email."'";

echo $sql;

mysqli_close($conexion);
?>
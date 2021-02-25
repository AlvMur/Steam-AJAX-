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
$sqlTraeId= "SELECT id_cliente FROM cliente WHERE email LIKE '".$email."'";
$resultadoId=mysqli_query($conexion,$sqlTraeId);
$fila=mysqli_fetch_assoc($resultadoId);
$id_cliente_buscado=$fila["id_cliente"];

echo $id_cliente_buscado;

mysqli_close($conexion);
?>
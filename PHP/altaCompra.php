<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "steam_cliente";
$usuario   = "root";
$password  = "";

extract($_POST);

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");

$sqlId="SELECT COUNT(*) FROM compra";
$id_compra=mysqli_query($conexion,$sqlId);
$sql = "INSERT INTO compra (id_cliente,id_juego,id_compra,fecha,coste_compra) VALUES ($id_cliente,$id_juego,$id_compra+1,$fecha,$precio);";
$resultado=mysqli_query($conexion,$sql);

if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Compra realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de compra: ".mysqli_error($conexion);
}

echo $respuesta;

?>
<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "steam_cliente";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT DISTINCT genero FROM juego";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$datos = "<option value='CUALQUIERA'>CUALQUIERA</option>";

while ($fila = mysqli_fetch_array($resultados)) {
    $datos .= '<option value="'.$fila["genero"].'">'.$fila["genero"].'</option>';
}
echo $datos; 

mysqli_close($conexion);
?>
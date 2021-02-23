<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "steam_cliente";
$usuario   = "root";
$password  = "";

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "select id_juego, titulo, genero, anyo_lanzamiento as anyo, precio, pegi from juego";
$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<datos>';

while ($fila = mysqli_fetch_array($resultados)) {
    
    $XML .='<tr>';
        $XML .='<td>'.$fila["titulo"].'</td>';
        $XML .='<td>'.$fila["genero"].'</td>';
        $XML .='<td>'.$fila["anyo"].'</td>';
        $XML .='<td>'.$fila["precio"].'</td>';
        $XML .='<td>'.$fila["pegi"].'</td>';
        $XML .='<td>'.'<button value="1">Comprar</button>'.'</td>';
    $XML .='</tr>';
}

 echo $XML;

mysqli_close($conexion);
?>
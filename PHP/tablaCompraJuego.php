<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "steam_cliente";
$usuario   = "root";
$password  = "";

//print_r($_REQUEST["genero"]);
$id=$_GET["id_juego"];

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT id_juego, titulo, genero, anyo_lanzamiento as anyo, precio, pegi FROM juego WHERE id_juego=$id";


$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));


$XML ='<?xml version="1.0" encoding="UTF-8"?>';
$XML .='<datos>';

while ($fila = mysqli_fetch_array($resultados)) {
    $XML .='<juego>';
    $XML .='<id>'.$fila["id_juego"].'</id>';
        $XML .='<titulo>'.$fila["titulo"].'</titulo>';
        $XML .='<genero>'.$fila["genero"].'</genero>';
        $XML .='<anno>'.$fila["anyo"].'</anno>';
        $XML .='<precio>'.$fila["precio"].'</precio>';
        $XML .='<pegi>'.$fila["pegi"].'</pegi>';
    $XML .='</juego>';
}



$XML .='</datos>';

// Cabecera de respuesta indicando que el contenido de la respuesta es XML
header("Content-Type: text/xml");
// Para que el navegador no haga cache de los datos devueltos por la página PHP.
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

 echo $XML;

mysqli_close($conexion);

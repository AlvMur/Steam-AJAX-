<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "steam_cliente";
$usuario   = "root";
$password  = "";

//print_r($_REQUEST["genero"]);

// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_query($conexion,"utf8");

// Consulta SQL para obtener los datos de los centros.
$sql = "SELECT id_juego, titulo, genero, anyo_lanzamiento as anyo, precio, pegi FROM juego";
if($_REQUEST["genero"]!="CUALQUIERA"){
    $sql.=" WHERE genero LIKE '".$_REQUEST["genero"]."'";
}

$resultados = mysqli_query($conexion,$sql) or die(mysqli_error($conexion));

$res="";

while ($fila = mysqli_fetch_array($resultados)) {
    
    $res .='<tr>';
        $res .='<td>'.$fila["titulo"].'</td>';
        $res .='<td>'.$fila["genero"].'</td>';
        $res .='<td>'.$fila["anyo"].'</td>';
        $res .='<td>'.$fila["precio"].'</td>';
        $res .='<td>'.$fila["pegi"].'</td>';
        $res .='<td>'.'<button onclick="comprar('.$fila["id_juego"].')" value='.$fila["id_juego"].'>Comprar</button>'.'</td>';
    $res .='</tr>';
}

 echo $res;

mysqli_close($conexion);
?>
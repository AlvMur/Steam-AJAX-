<?php

// Configuración BASE DE DATOS MYSQL
$servidor  = "localhost";
$basedatos = "steam_cliente";
$usuario   = "root";
$password  = "";

// Recojo los datos de entrada

$email = $_GET["email"];




// Creamos la conexión al servidor.
$conexion = mysqli_connect($servidor, $usuario, $password,$basedatos) or die(mysqli_error($conexion));
mysqli_set_charset($conexion,"utf8");
mysqli_query($conexion,"utf8");

//Recoge el id del cliente al cual se le introduce su email en el input
$sqlTraeId= "SELECT id_cliente FROM cliente WHERE email LIKE '$email'";
$resultadoId=mysqli_query($conexion,$sqlTraeId);
$fila=mysqli_fetch_assoc($resultadoId);
$id=$fila["id_cliente"];

$sqlTraeSuscripcion="SELECT COUNT(*) as cuenta FROM suscripcion WHERE id_cliente ='$id'";
$resultadoTraeSuscripcion= mysqli_query($conexion,$sqlTraeSuscripcion);
$fila=mysqli_fetch_assoc($resultadoTraeSuscripcion);
$cuenta=$fila["cuenta"];

if($cuenta>0){
    $sqlTodosJuegos="SELECT titulo,genero,anyo_lanzamiento,precio,pegi FROM juego";
    $resultado = mysqli_query($conexion,$sqlTodosJuegos);
    $arrayADevolver=array();
    while($fila= mysqli_fetch_assoc($resultado)){
    $arrayADevolver[]=$fila;
    }
}else{
    $sql = "SELECT titulo,genero,anyo_lanzamiento,precio,pegi FROM juego INNER JOIN compra ON juego.id_juego = compra.id_juego INNER JOIN cliente ON compra.id_cliente=cliente.id_cliente WHERE cliente.email LIKE '$email'";

    $resultado = mysqli_query($conexion,$sql);
    $arrayADevolver=array();
    while($fila= mysqli_fetch_assoc($resultado)){
    $arrayADevolver[]=$fila;
    }
}



if ($resultado){
    $respuesta["error"] = 0;
    $respuesta["mensaje"] = "Alta realizada"; 
} else {
    $respuesta["error"] = 1;
    $respuesta["mensaje"] = "Error en el proceso de alta: ".mysqli_error($conexion);
}
$datosJSON = json_encode($arrayADevolver);
echo $datosJSON;

mysqli_close($conexion);
?>
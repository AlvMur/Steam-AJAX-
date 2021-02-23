"use strict";
//Creamos el objeto tienda para añadirle datos posteriormente
var tienda = new Tienda();
ocultarFormularios();

// console.warn("Objeto global:");
// console.dir(tienda);
// console.warn("Array de clientes:");
// console.table(tienda.clientes);
// console.warn("Array de juegos:");
// console.table(tienda.juegos);
// console.warn("Array de compras:");
// console.table(tienda.compras);
// console.warn("Array de suscripciones:");
// console.table(tienda.suscripciones);
//-------------------------EVENTSLISTENERS----------------------------------------------//
//-----Botonones de navegacion superior-------------------
document.getElementById("btnInicio").addEventListener("click", muestraInicio);
document.getElementById("btnTienda").addEventListener("click", muestraTienda);
document.getElementById("btnBiblioteca").addEventListener("click", muestraBiblioteca);
/* document.getElementById("btnUsuario").addEventListener("click", muestraUsuario); */
//document.getElementById("btnAdministrar").addEventListener("click", muestraAdministracion);
document.getElementById("btnAltaSuscriptor").addEventListener("click", muestraFormSuscriptor);
document.getElementById("btnAltaCliente").addEventListener("click", muestraFormAltaCliente);
document.getElementById("btnAltaJuego").addEventListener("click", muestraFormAltaJuego);
//-----Fin botones de navegacion superior-------------------
 document.getElementById("btnAceptarAltaPersona").addEventListener("click", altaUsuario);
document.getElementById("btnAceptarAltaJuego").addEventListener("click", altaJuego);
document.getElementById("btnDarAltaSuscriptor").addEventListener("click", altaSuscriptor);
document.getElementById("btnBuscaBiblioteca").addEventListener("click", bibliotecaBuscada);


let arrayBotonesTienda = document.getElementsByName("btnMandarTienda");
for (let i = 0; i < arrayBotonesTienda.length; i++) {

    arrayBotonesTienda[i].addEventListener("click", muestraTienda);

}

//--------------------------------------------------------------------------------------//


//Llamada a la Función de Ocultar Formularios para que comiencen ocultos
muestraInicio()

//---------------------------CONTROL VISUAL UI--------------------------------------------//



//Mostrar los formularios

function muestraInicio() {

    ocultarFormularios();
    document.getElementById("main").style.display = "block";
}

function muestraTienda() {
    ocultarFormularios();

    document.getElementById("listadoJuegos").style.display = "block";
    cargarComboGeneros();
    //tienda.listarJuegos();

    let genero = $('#comboBoxGenero').find('option:selected').text();
    muestraJuegos(genero);
}

function muestraBiblioteca() {
    ocultarFormularios();

    document.getElementById("formBiblioteca").style.display = "block";


}

function muestraFormSuscriptor() {

    ocultarFormularios();
    document.getElementById("formAdministracionSuscriptor").style.display = "block";
}

function muestraFormAltaCliente() {
    ocultarFormularios();
    document.getElementById("formAdministracionUsuario").style.display = "block";
}

function muestraFormAltaJuego() {
    ocultarFormularios();
    document.getElementById("formAdministracionJuegos").style.display = "block";
}
//Función para Ocultar los Formularios y el Área de Listado
function ocultarFormularios() {


    //Oculta las tablas
    let oTabla = document.getElementsByTagName("table");
    if (document.querySelector("#listadoJuegos") != null)
    //    document.querySelector("#listadoJuegos").remove();
        document.querySelector("#listadoJuegos").style.display = "none";
    if(document.querySelector("#listadoJuegosCliente")!=null)
    document.querySelector("#listadoJuegosCliente").style.display="none";
    // if (oTabla != null) {
    //     for (let index = 0; index < oTabla.length; index++) {
    //         oTabla[index].remove();

    //     }

    // }


    //Oculta el div con el comboBox
    // let oDiv = document.querySelector("#listadoJuegos");
    // if (oDiv != null) {
    //     oDiv.remove();
    // }


    //Oculta el div del inicio "main"
    document.getElementById("main").style.display = "none";



    let arrayFormularios = document.getElementsByTagName("form");

    //Oculta los formularios
    for (let index = 0; index < arrayFormularios.length; index++) {
        arrayFormularios[index].style.display = "none";
    }

    let arrayInputs = document.getElementsByTagName("input");

    //Vacía los campos de texto de los inputs
    limpiarInputs(arrayInputs);

}



//Limpia todos los inputs menos los botones
function limpiarInputs(inputs) {

    for (let index = 0; index < inputs.length; index++) {
        if (inputs[index].type != "button") {
            inputs[index].value = "";
        }
    }
}



//--------------------------- FIN CONTROL VISUAL UI--------------------------------------------//





//-----------------------------REGISTRAR USUARIOS Y JUEGOS (ADMINISTRACION)---------------------//

function altaUsuario() {

    let dFecha = formAdministracionUsuario.txtFecha.value.trim();
    let arrayFecha = dFecha.split("/");
    let dFechaCambiada = new Date(arrayFecha[2], arrayFecha[1] - 1, arrayFecha[0]);
    let res = validaExpRegUsuario();

    if (res != "") {
        alert(res);

    } else {
    
        let oCliente = {
            id_cliente: formAdministracionUsuario.txtNIFUsuario.value.trim(),
            nombre: formAdministracionUsuario.txtNombre.value.trim(),
            apellidos: formAdministracionUsuario.txtApellidos.value.trim(),
            fecha_nac: dFechaCambiada,
            email: formAdministracionUsuario.txtDireccion.value.trim()
        };
        let sParametros = "datos=" + JSON.stringify(oCliente);

        $.post("PHP/altacliente.php", sParametros, respuestaAltaCliente, 'json');
    }
}

function respuestaAltaCliente(oDatos, sStatus, oXHR) {

    
    if (oDatos.error) {
        alert(oDatos.mensaje);
    } else {
        alert(oDatos.mensaje);
        let form = document.getElementById("formAdministracionUsuario");
        let inputs = form.getElementsByTagName("input");
        limpiarInputs(inputs);
        ocultarFormularios();
    }
}

function altaJuego() {
    let form = document.getElementById("formAdministracionJuegos");
    let inputs = form.getElementsByTagName("input");

    
    let res = validaExpRegJuego();

    if (res != "") {
        alert(res);

    } else {
       
        

        let dFecha =document.getElementById("txtFechaJuego").value.trim();
        let arrayFecha = dFecha.split("/");
        let dFechaCambiada = new Date(arrayFecha[2], arrayFecha[1] - 1, arrayFecha[0]);

        console.log(dFechaCambiada);

       /* let oJuego ={

            titulo: document.getElementById("txtTitulo").value.trim(),
            genero: document.getElementById("txtGenero").value.trim(),
            año_lanzamiento: dFechaCambiada,
            precio:parseFloat(document.getElementById("txtPrecio").value.trim()),
            pegi:document.getElementById("txtPegi").value.trim()
        };*/
       let titulo= document.getElementById("txtTitulo").value.trim();
       let genero= document.getElementById("txtGenero").value.trim();
       let año_lanzamiento= dFechaCambiada;
       console.log(año_lanzamiento);
       let precio=parseFloat(document.getElementById("txtPrecio").value.trim());
       let pegi=document.getElementById("txtPegi").value.trim();


        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        alert("Juego insertado");
        //console.log(xmlhttp);
        //alert(xmlhttp.responseText);
        }
    };
        xmlhttp.open("POST", "PHP/altajuego.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("titulo="+titulo+"&genero="+genero+"&año_lanzamiento="+año_lanzamiento+"&precio="+precio+"&pegi="+pegi);
   
  }

       // let oJuego = new Juego(iPosicion + 1, sTitulo, sGenero, dFechaCambiada, parseFloat(iPrecio), parseInt(iPegi));

        if (tienda.registrarJuego(oJuego)) {
            alert("Juego dado de alta correctamente");
            limpiarInputs(inputs);
            ocultarFormularios();
        } else {
            alert("Ya existe ese juego");
        }


    }

   
/////////////////////////////////Cargar Combo Géneros//////////////////////////////////////////////////////
function cargarComboGeneros() {
    if (localStorage["generos"] != undefined) {
        $("#comboBoxGenero").html(localStorage["generos"]);
    } 
    else {
        $.get("PHP/getGeneros.php", null, tratarGetGeneros, 'html');
    }
}

function tratarGetGeneros(sHTML) {
    localStorage["generos"] = sHTML;

    $("#comboBoxGenero").html(localStorage["generos"]);
}
//////////////////////////////////////////////////////////////////////////////////////
   






function altaSuscriptor() {
    let form = document.getElementById("formAdministracionSuscriptor");
    let inputs = form.getElementsByTagName("input");

    let sNIF = inputs[0].value.trim();

    let res = validarNIF(sNIF);
    if (res != "") {
        alert(res);
    } else {

        var dFechaActual = new Date();
        let dFechaExpiracion = new Date();
        dFechaExpiracion.setMonth(dFechaActual.getMonth() + 1);

        $.ajax({
            url : 'PHP/altasuscriptor.php',
            data : { id_cliente : sNIF , fecha_expiracion :  dFechaExpiracion},
            type : 'POST',
            dataType : 'json',
            success : procesarRespuestaAltaSubcriptor
    });
}


        /* let iPosicion = tienda.suscripciones.length;
        var dFechaActual = new Date();
        let dFechaExpiracion = new Date();

        dFechaExpiracion.setMonth(dFechaActual.getMonth() + 1);



        let iIdCliente = buscaIdCliente(sNIF);

        if (iIdCliente != 0) {
            let oSuscriptorNuevo = new Suscripcion(iPosicion + 1, parseInt(iIdCliente), dFechaExpiracion);


            if (tienda.registrarSuscripcion(oSuscriptorNuevo, dFechaActual)) {
                alert("Suscriptor dado de alta");
                limpiarInputs(inputs);
                ocultarFormularios();
            } else {
                alert("Ya existe esa suscripción");
            }
        } else {
            alert("El cliente no existe para suscribirse");
        } */
    
}
function procesarRespuestaAltaSubcriptor(datos, textStatus, jqXHR){
    console.log(datos);
    if (datos.error == 0) { //Si no hay error
        formAdministracionSuscriptor.reset()
    }

    alert(datos.mensaje);
}

function bibliotecaBuscada() {


    let form = document.getElementById("formBiblioteca");
    let inputs = form.getElementsByTagName("input");
    let sEmail = inputs[0].value.trim();

    let res = validarEmail(sEmail);
    if (res != "") {
        alert(res);
    } else {

       /* var cliente = _buscarCliente(sEmail);
        if (cliente != null) {
            var id = cliente["iId"];
            var fechaActual = Date.now();
            //Si el cliente es suscriptor añado todos los juegos

            var suscripcion = _buscarSuscripcion(id, fechaActual);
            //console.log(suscripcion);
            if (suscripcion != null) {

                tienda.listarJuegosDeCliente(null);
                form.style.display = "none";
            } else {
                var juegosComprados = _buscaJuegosCliente(id);
                var idJuegosComprados = []
                for (var i = 0; i < juegosComprados.length; i++) {
                    idJuegosComprados.push(juegosComprados[i]["idJuego"]);
                }
                form.style.display = "none";
                tienda.listarJuegosDeCliente(idJuegosComprados);
            }*/
            $.getJSON('PHP/recogerbiblioteca.php',{email:sEmail},respuestaBiblioteca);
           
             /* $.ajax({
                dataType: 'json',
                url: 'PHP/recogerbiblioteca.php',
                data: {email:sEmail},
                type:'POST',
                success: function (data) {
                  // begin accessing JSON data here
                  console.log(JSON.stringify(data));
                },
              })*/
            
        } /*else {
            alert("El cliente no existe");
        }*/

    }

function respuestaBiblioteca(data,status,oXHR) {

    console.log(data);
    console.log(status);
    console.log(oXHR);
   
    let divBiblioteca = document.querySelector("#listadoJuegosCliente");
    
    let tabla = divBiblioteca.querySelector("#lista");
    let tBody = tabla.querySelector("tbody");
    tBody.innerHTML="";
<<<<<<< HEAD

    for (let index = 0; index < data.length; index++) {
        
        tBody.innerHTML+="<tr><td>"+data[index].titulo+"</td><td>"+data[index].genero+"</td><td>"+data[index].año_lanzamiento+"</td><td>"+data[index].precio+"</td><td>"+data[index].pegi+"</td></tr>";
        
    }

=======

    for (let index = 0; index < data.length; index++) {
        
        tBody.innerHTML+="<tr><td>"+data[index].titulo+"</td><td>"+data[index].genero+"</td><td>"+data[index].año_lanzamiento+"</td><td>"+data[index].precio+"</td><td>"+data[index].pegi+"</td></tr>";
        
    }

>>>>>>> main
    divBiblioteca.style.display="block";

    
}



//-----------------------------FIN REGISTRAR USUARIOS Y JUEGOS (ADMINISTRACION)---------------------//

function muestraJuegos(genero){

    $('#lista').find('tbody').load("PHP/mostrarjuego.php", "");
}


//-----------------------------METODOS AUXILIARES---------------------------------------------------//
function _buscarCliente(emailBuscado) {
    let oClienteExistente = null;
    oClienteExistente = tienda.clientes.find(oCliente => oCliente.sEmail == emailBuscado);

    return oClienteExistente;
}

function _buscaJuego(titulo, añoLanzamiento) {

    let oJuegoExistente = null;
    oJuegoExistente = tienda.juegos.find(oJuego => oJuego.titulo == titulo && oJuego.año_lanzamiento == añoLanzamiento);

    return oJuegoExistente;

}

function _buscarCompra(idJuego, idCliente) {

    let oCompraExistente = null;
    oCompraExistente = tienda.compras.find(oCompra => oCompra.idCliente == idCliente && oCompra.idJuego == idJuego);

    return oCompraExistente;
}

function _buscarSuscripcion(idCliente, fechaActual) {

    let oSuscripcionExistente = null;

    //Obtenemos la fecha de realización
    //TODO: fechaExp
    oSuscripcionExistente = tienda.suscripciones.find(oSuscripcion => oSuscripcion.idCliente == idCliente && oSuscripcion.fechaExp > (fechaActual));
    return oSuscripcionExistente;
}

function buscaIdCliente(sNIF) {
    let iIdDevuelto = 0;
    //console.log(sNIF);
    for (let index = 0; index < tienda.clientes.length; index++) {
        //console.log(tienda.clientes[index]);
        if (tienda.clientes[index].sNIF == sNIF) {

            iIdDevuelto = tienda.clientes[index].iId;
        }

    }
    return iIdDevuelto;
}

function _buscarJuegoId(id) {

    let oJuegoADevolver = null;

    oJuegoADevolver = tienda.juegos.find(oJuego => oJuego.id_juego == id);

    return oJuegoADevolver;

}

function _buscaJuegosCliente(id) {

    let oComprasExistentes = [];

    oComprasExistentes = tienda.compras.filter(oCompras => oCompras.idCliente == id);

    return oComprasExistentes;
}

function recogeNumCompras() {
    return tienda.compras.length;
}

function introduceCompra(oCompra) {
    tienda.registrarCompra(oCompra);
}
//------------------------------FIN METODOS AUXILIARES-----------------------------------------------//
function loadXMLDoc(filename) {
    if (window.XMLHttpRequest) {
        var xhttp = new XMLHttpRequest();
    } else // code for IE5 and IE6
    {
        var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);

    xhttp.send();

    return xhttp.responseXML;
}
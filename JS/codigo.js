"use strict";
ocultarFormularios();
muestraInicio();

//-------------------------EVENTSLISTENERS----------------------------------------------//
//-----Botonones de navegacion superior-------------------
document.getElementById("btnInicio").addEventListener("click", muestraInicio);
document.getElementById("btnTienda").addEventListener("click", muestraTienda);
document.getElementById("btnBiblioteca").addEventListener("click", muestraBiblioteca);
document.getElementById("btnAltaSuscriptor").addEventListener("click", muestraFormSuscriptor);
document.getElementById("btnAltaCliente").addEventListener("click", muestraFormAltaCliente);
document.getElementById("btnAltaJuego").addEventListener("click", muestraFormAltaJuego);
//-----Fin botones de navegacion superior-------------------
 document.getElementById("btnAceptarAltaPersona").addEventListener("click", altaUsuario);
document.getElementById("btnAceptarAltaJuego").addEventListener("click", altaJuego);
document.getElementById("btnDarAltaSuscriptor").addEventListener("click", altaSuscriptor);
document.getElementById("btnBuscaBiblioteca").addEventListener("click", bibliotecaBuscada);

if(document.getElementById("comboBoxGenero")!=null){
    let oCombo= document.getElementById("comboBoxGenero");
    oCombo.addEventListener("change",filtraJuegos);
}

let arrayBotonesTienda = document.getElementsByName("btnMandarTienda");
for (let i = 0; i < arrayBotonesTienda.length; i++) {
    arrayBotonesTienda[i].addEventListener("click", muestraTienda);
}
//--------------------------------------------------------------------------------------//

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

    let genero = $('#comboBoxGenero').find('option:selected').text();
    //console.log("Genero:"+genero);
    if(genero==""){
        muestraJuegos("CUALQUIERA");
    }else{
        muestraJuegos(genero);
    }
    
   
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
        document.querySelector("#listadoJuegos").style.display = "none";
    if(document.querySelector("#listadoJuegosCliente")!=null)
        document.querySelector("#listadoJuegosCliente").style.display="none";

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
    //let arrayFecha = dFecha.split("/");
    //let dFechaCambiada = new Date(arrayFecha[2], arrayFecha[1] - 1, arrayFecha[0]);
    let res = validaExpRegUsuario();

    if (res != "") {
        alert(res);

    } else {
    
        let oCliente = {
            id_cliente: formAdministracionUsuario.txtNIFUsuario.value.trim(),
            nombre: formAdministracionUsuario.txtNombre.value.trim(),
            apellidos: formAdministracionUsuario.txtApellidos.value.trim(),
            fecha_nac: dFecha,
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
    } 
    else {
        let dFecha =document.getElementById("txtFechaJuego").value.trim();
        let arrayFecha = dFecha.split("/");
       // let dFechaCambiada = new Date(arrayFecha[2], arrayFecha[1] - 1, arrayFecha[0]);
        let titulo= document.getElementById("txtTitulo").value.trim();
        let genero= document.getElementById("txtGenero").value.trim();
       // let anyo_lanzamiento= dFechaCambiada;
        let precio=parseFloat(document.getElementById("txtPrecio").value.trim());
        let pegi=document.getElementById("txtPegi").value.trim();

        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            
            if (this.readyState == 4 && this.status == 200) {
            alert("Juego insertado");
            }
        };

        xmlhttp.open("POST", "PHP/altajuego.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("titulo="+titulo+"&genero="+genero+"&anyo_lanzamiento="+dFecha+"&precio="+precio+"&pegi="+pegi); 
        
        limpiarInputs(inputs);
        ocultarFormularios();
    }         
}

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

function altaSuscriptor() {
    let form = document.getElementById("formAdministracionSuscriptor");
    let inputs = form.getElementsByTagName("input");

    let sNIF = inputs[0].value.trim();

    let res = validarNIF(sNIF);
    if (res != "") {
        alert(res);
    } else {

        let dFechaActual = new Date();
        let dFechaExpiracion = new Date();
        dFechaExpiracion.setMonth(dFechaActual.getMonth() + 1);

        let dFechaExpiracionParseada= dFechaExpiracion.getFullYear()+"-"+dFechaExpiracion.getMonth()+"-"+dFechaExpiracion.getDate();
        console.log("Fecha parseada :"+dFechaExpiracionParseada);

        let oSuscripcion={
            id_cliente : sNIF,
            fecha_expiracion :  dFechaExpiracionParseada
        }
        $.ajax({
            url : 'PHP/altasuscriptor.php',
            data : oSuscripcion,
            type : 'POST',
            dataType : 'json',
            success : procesarRespuestaAltaSubcriptor
        });
    }   
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
    } 
    else {
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
    } 
}

function respuestaBiblioteca(data,status,oXHR) {

    /* console.log(data);
    console.log(status);
    console.log(oXHR); */
   
    let divBiblioteca = document.querySelector("#listadoJuegosCliente");
    
    let tabla = divBiblioteca.querySelector("#lista");
    let tBody = tabla.querySelector("tbody");
    tBody.innerHTML="";

    for (let index = 0; index < data.length; index++) {
        
        tBody.innerHTML+="<tr><td>"+data[index].titulo+"</td><td>"+data[index].genero+"</td><td>"+data[index].año_lanzamiento+"</td><td>"+data[index].precio+"</td><td>"+data[index].pegi+"</td></tr>";
        
    }
    divBiblioteca.style.display="block";
}

function filtraJuegos(oEvento) {
    
    let oE = oEvento || window.event;

    console.log(oE.target.value);

    muestraJuegos(oE.target.value);

}

function muestraJuegos(genero){
    $('#lista').find('tbody').load("PHP/mostrarjuego.php", {genero:genero});
}
//-----------------------------FIN REGISTRAR USUARIOS Y JUEGOS (ADMINISTRACION)---------------------//

function comprar(idJuego) {
    ocultarFormularios();

    $.ajax({
        dataType: 'xml',
        url: 'PHP/tablaCompraJuego.php',
        data: {id_juego:idJuego},
        type:'GET',
        success: muestraTabla
      });  

}

function muestraTabla(data,status,oXHR) {
    
    console.log(data);
    // console.log(status);
    // console.log(oXHR);

    var oOptions = data.querySelectorAll("juego");
    //console.log(oOptions);
    
    var table = "<table border='1'>";
    //console.log(data.querySelector("juego titulo"));
    table+="<tr><th colspan='2'>DATOS COMPRA</th></tr>";
    table+='<tr><td>Email: </td><td><input id="email" type="text" placeholder="Introduzca un email"></td></tr>';
    table+='<tr><td>Nombre: </td><td><input type=text value="'+oOptions[0].querySelector("titulo").textContent+'" readonly></td></tr>';
    table+='<tr><td>Genero: </td><td><input type=text value="'+oOptions[0].querySelector("genero").textContent+'" readonly></td></tr>';
    table+='<tr><td>Año: </td><td><input type=text value="'+oOptions[0].querySelector("anno").textContent+'" readonly></td></tr>';
    table+='<tr><td>Precio: </td><td><input id="precio" type=text value="'+oOptions[0].querySelector("precio").textContent+'" readonly></td></tr>';
    table+='<tr><td>Pegi: </td><td><input type=text value="'+oOptions[0].querySelector("pegi").textContent+'" readonly></td></tr>';
    table+='<tr><td colspan="2" style="text-align: center;"><input class="btn btn-sm" type="button" onclick=realizaCompra() value="Comprar"></td></tr>';
    table += "</table>";

    console.log("La tabla "+table);
    let oDiv = document.createElement("div");
    oDiv.setAttribute("id", "compraTabla");
    
    console.log("oDIV "+oDiv.textContent);
    document.body.appendChild(oDiv);
    $('#compraTabla').html(table);

  }

  function realizaCompra(){
    

    let email = document.getElementById("email").value;
    console.log(email);
    if(email ==""){
        alert("Debe rellenar el campo del correo");
    }else{

        //Primero hay que hacer una llamada AJAX recogiendo email y comprobando que existe en la BD 
        
        $.get("PHP/getIdCliente.php", {emailBusca: email}, respuestaEmail, 'text');
    }
        
    function respuestaEmail(oDatos, sStatus, oXHR){
       
        if (oDatos == "") {
             alert("No existe ese correo");
        } 
        else {
            console.log("El id del cliente es: "+oDatos);
            let precioCompra = document.getElementById("precio").value;
            let id_juegoCompra = oOptions[0].querySelector("id").textContent;
            let fechaCompra = new Date();

            //Una vez confirmamos que existe, realiza el insert en las compras
            $.post("PHP/altaCompra.php", {id_cliente: oDatos,id_juego:id_juegoCompra,fecha: fechaCompra, precio:precioCompra}, respuestaCompra, 'text');
         }
    }
    
    function respuestaCompra(oDatos, sStatus, oXHR){
            alert(oDatos.mensaje);
            ocultarFormularios();
    }

}



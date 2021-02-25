"use strict";

let expRegDNI = /^\d{8}[A-Z]{1}$/;
let expRegNombreCliente = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}$/;
let exRegApellidosCliente = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]{2,48}\s[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]{2,48}$/;
let expRegFecha = /^([0-2][0-9]|[3][0-1])\/([0][1-9]|[1][0-2])\/(19|20)\d{2}$/;
let expRegEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let expRegTitulo = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}$/;
let expRegGenero = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]{2,20}$/;
let expRegPrecio = /^\d{1,3}\.\d{2}$/;
let expRegPegi = /^\d{1,2}$/;


//Función Validar Datos Usuario
function validaExpRegUsuario() {

    let sNIF = document.getElementById("txtNIFUsuario").value.trim();
    let sNombre = document.getElementById("txtNombreCliente").value.trim();
    let sApeliidos = document.getElementById("txtApellidosCliente").value.trim();
    let dNacimiento = document.getElementById("txtFechaCliente").value.trim();
    let sEmail = document.getElementById("txtDireccionCliente").value.trim();
    let bValido = true;
    let sErrores = "";

    //Validar NIF
    if (!expRegDNI.test(sNIF)) {
        if(bValido){
            document.getElementById("txtNIFUsuario").focus();
            bValido = false;
        }
        sErrores += "\nEl nombre no tiene el formato correcto";
        document.getElementById("txtNIFUsuario").classList.add("error");
    }
    else{
        document.getElementById("txtNIFUsuario").classList.remove("error");
    }

    //Validar Nombre
    if (!expRegNombreCliente.test(sNombre)) {
        if(bValido){
            document.getElementById("txtNombreCliente").focus();
            bValido = false;
        }
        sErrores += "\nEl nombre no tiene el formato correcto";
        document.getElementById("txtNombreCliente").classList.add("error");
    }
    else{
        document.getElementById("txtNombreCliente").classList.remove("error");
    }

    //Validar Apellidos
    if (!exRegApellidosCliente.test(sApeliidos)) {
        if(bValido){
            document.getElementById("txtApellidosCliente").focus();
            bValido = false;
        }    
        sErrores += "\nLos apellidos no tienen el formato correcto";
        document.getElementById("txtApellidosCliente").classList.add("error");
    }
    else{
        document.getElementById("txtApellidosCliente").classList.remove("error");
    }       
            
    //Validar Fecha de Nacimiento   
    //!expRegFecha.test(dNacimiento) 
    if (dNacimiento=="") {
        if(bValido){
            document.getElementById("txtFechaCliente").focus();
            bValido = false;
        }        
        sErrores += "\nLa fecha de nacimiento no tienen el formato correcto";
        document.getElementById("txtFechaCliente").classList.add("error");
    }                
    else {
        document.getElementById("txtFechaCliente").classList.remove("error");
    }        
        
    //Validar Email  
    if (!expRegEmail.test(sEmail)) {
        if(bValido){
            document.getElementById("txtDireccionCliente").focus();
            bValido = false;
        }            
        sErrores += "\nEl email no tienen el formato correcto";
        document.getElementById("txtDireccionCliente").classList.add("error");
    }
    else {
        document.getElementById("txtDireccionCliente").classList.remove("error");
    }
    return sErrores;
}



//Función Validar Datos Juego
function validaExpRegJuego() {

    let sTitulo = document.getElementById("txtTitulo").value.trim();
    let sGenero = document.getElementById("txtGenero").value.trim();
    let dLanzamiento = document.getElementById("txtFechaJuego").value.trim();
    let iPrecio = document.getElementById("txtPrecio").value.trim();
    let iPegi = document.getElementById("txtPegi").value.trim();
    let bValido = true;
    let sErrores = "";

    //Validar Titulo
    if (!expRegTitulo.test(sTitulo)) {
        if(bValido){
            document.getElementById("txtTitulo").focus();
            bValido = false;
        }
        sErrores += "\nEl título no tienen el formato correcto";
        document.getElementById("txtTitulo").classList.add("error");
    } 
    else {
        document.getElementById("txtTitulo").classList.remove("error");
    }
        
    //Validar Genero  
    if (!expRegGenero.test(sGenero)) {
        if(bValido){
            document.getElementById("txtGenero").focus();
            bValido = false;
        }    
        sErrores += "\nEl género no tienen el formato correcto";
        document.getElementById("txtGenero").classList.add("error");    
        } 
        else {
            document.getElementById("txtGenero").classList.remove("error");
        }

        //Validar Fecha de Lanzamiento
        //!expRegFecha.test(dLanzamiento)
        if (dLanzamiento=="") {
            if(bValido){
                document.getElementById("txtFechaJuego").focus();
                bValido = false;
            }    
            sErrores += "\nLa fecha de lanzamiento no tienen el formato correcto";
            document.getElementById("txtFechaJuego").classList.add("error");
            } 
            else {
                document.getElementById("txtFechaJuego").classList.remove("error");
            }
             
        //Validar Precio
        if (!expRegPrecio.test(iPrecio)) {
            if(bValido){
                document.getElementById("txtPrecio").focus();
                bValido = false;
            }
            sErrores += "\nEl precio no tienen el formato correcto";
            document.getElementById("txtPrecio").classList.add("error");
            }
            else {
                document.getElementById("txtPrecio").classList.remove("error");
            }

        //Validar Pegi
        if (!expRegPegi.test(iPegi)) {
            if(bValido){
                document.getElementById("txtPegi").focus();
                bValido = false;
            }
            sErrores += "\nEl Pegi no tienen el formato correcto";              
            document.getElementById("txtPegi").classList.add("error");
            } 
            else {
                document.getElementById("txtPegi").classList.remove("error");
            }
    return sErrores;
}

function validarNIF(nif){
    //Validar NIF
    let sNIF = nif;
    let bValido = true;
    let sErrores = "";

    if (!expRegDNI.test(sNIF)) {
        if(bValido){
            document.getElementById("txtNIF").focus();
            bValido = false;
        }
        sErrores += "\nEl NIF no tiene el formato correcto";
        document.getElementById("txtNIF").classList.add("error");
    }
    else{
        document.getElementById("txtNIF").classList.remove("error");
    }
    return sErrores
}
function validarEmail(email){

    let sEmail = email;
    let bValido = true;
    let sErrores = "";

    if (!expRegEmail.test(sEmail)) {

        if(bValido){
            document.getElementById("txtEmail").focus();
            bValido = false;
        }
        sErrores += "\nEl Email no tiene el formato correcto";
        document.getElementById("txtEmail").classList.add("error");
    }
    else{
        document.getElementById("txtEmail").classList.remove("error");
    }
    return sErrores
}
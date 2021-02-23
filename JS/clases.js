//Clase Tienda
class Tienda {
    constructor() {
            this.juegos = [];
            this.clientes = [];
            this.suscripciones = [];
            this.compras = [];
        }
        //Función para añadir juegos
    registrarJuego(juego) {

            let oJuegoExistente = null;

            oJuegoExistente = _buscaJuego(juego.titulo, juego.año_lanzamiento);

            if (oJuegoExistente == null) {
                this.juegos.push(juego);
                return true;
            } else {
                return false;
            }



        }
        //Función para añadir nuevos clientes
    registrarCliente(cliente) {

        let oClienteExistente = null;

        oClienteExistente = _buscarCliente(cliente.sEmail);

        if (oClienteExistente == null) {
            this.clientes.push(cliente);
            return true;
        } else {
            return false;
        }

    }
    registrarCompra(compra) {

        let oCompraExistente = null;

        oCompraExistente = _buscarCompra(compra.idJuego, compra.idCliente);

        if (oCompraExistente == null) {
            this.compras.push(compra);
            return true;
        } else {
            return false;
        }
    }
    registrarSuscripcion(suscripcion, fechaActual) {

            let oSuscripcionExistente = null;


            oSuscripcionExistente = _buscarSuscripcion(suscripcion.idCliente, fechaActual);

            if (oSuscripcionExistente == null) {
                this.suscripciones.push(suscripcion);
                return true;
            } else {
                return false;
            }
        }
        //Funcion para listar los juegos
    listarJuegos() {

        ocultarFormularios();

        var oLabel = document.createElement("LABEL");
        oLabel.textContent = "Filtre por género: ";
        var oCombo = document.createElement("SELECT");
        oCombo.classList.add("browser-default");
        oCombo.classList.add("custom-select");
        oCombo.setAttribute("id", "comboBoxGenero");
        var oOption = document.createElement("OPTION");
        oOption.setAttribute("selected", "");
        oOption.textContent = "CUALQUIERA";
        oCombo.appendChild(oOption);
        var generos = [];
        for (let i = 0; i < this.juegos.length; i++) {

            if (!generos.includes(this.juegos[i]["genero"])) {

                oOption = document.createElement("OPTION");

                oOption.setAttribute("value", this.juegos[i]["genero"]);
                oOption.textContent = this.juegos[i]["genero"];
                oCombo.appendChild(oOption);

                generos.push(this.juegos[i]["genero"]);

            }

        }
        //Creo boton filtrar

        /*  var oBtnFiltra = document.createElement("INPUT");
         oBtnFiltra.classList.add("btn");
         oBtnFiltra.classList.add("btn-primary");
         oBtnFiltra.setAttribute("type", "button");
         oBtnFiltra.setAttribute("value", "Filtra");
         oBtnFiltra.setAttribute("id", "btnFiltra");
         oBtnFiltra.style.marginLeft = "0.5em"; */
        // oBtnFiltra.addEventListener("click", filtraGenero);
        oCombo.addEventListener("change", filtraGenero);


        var oTabla = document.createElement("table");

        oTabla.setAttribute('border', '1');
        oTabla.id = "lista";
        var header = oTabla.createTHead();
        var row = header.insertRow(0);
        var cell = row.insertCell(-1);
        cell.textContent = "TITULO";
        cell = row.insertCell(-1);
        cell.textContent = "GENERO";
        cell = row.insertCell(-1);
        cell.textContent = "AÑO";
        cell = row.insertCell(-1);
        cell.textContent = "PRECIO";
        cell = row.insertCell(-1);
        cell.textContent = "PEGI";
        cell = row.insertCell(-1);
        cell.textContent = "Comprar ";

        var tbody = document.createElement("TBODY");
        oTabla.appendChild(tbody);

        for (var i = 0; i < this.juegos.length; i++) {
            //Filtramos por el genero

            row = tbody.insertRow(-1);
            var btnCompra = document.createElement("button");
            btnCompra.textContent = "Comprar";
            //let juegoIndividual = Object.values(this.juegos[i]);

            cell = row.insertCell(-1);
            cell.textContent = this.juegos[i]["titulo"];
            cell = row.insertCell(-1);
            cell.textContent = this.juegos[i]["genero"];
            cell = row.insertCell(-1);
            cell.textContent = this.juegos[i]["año_lanzamiento"].getFullYear();
            cell = row.insertCell(-1);
            cell.textContent = this.juegos[i]["precio"];
            cell = row.insertCell(-1);
            cell.textContent = "+" + this.juegos[i]["pegi"];
            cell = row.insertCell(-1);
            btnCompra.setAttribute("value", this.juegos[i]["id_juego"]);
            btnCompra.addEventListener("click", this.listarDatosCompra);
            cell.appendChild(btnCompra);

        }
        let oDiv = document.createElement("DIV");
        oDiv.setAttribute("id", "listadoJuegos");
        oDiv.appendChild(oLabel);
        oDiv.appendChild(oCombo);
        // oDiv.appendChild(oBtnFiltra);
        oDiv.appendChild(oTabla);

        document.body.appendChild(oDiv);

    }

    listarJuegosPorGenero(generoFiltrado) {


            //Elimino todos los juegos
            document.querySelector("#listadoJuegos").remove();


            if (generoFiltrado == "CUALQUIERA") {
                tienda.listarJuegos();
            } else {

                var oLabel = document.createElement("LABEL");
                oLabel.textContent = "Filtre por género: ";
                var oCombo = document.createElement("SELECT");
                oCombo.classList.add("browser-default");
                oCombo.classList.add("custom-select");
                oCombo.setAttribute("id", "comboBoxGenero");
                var oOption = document.createElement("OPTION");

                oOption.textContent = "CUALQUIERA";
                oCombo.appendChild(oOption);


                var generos = [];
                for (let i = 0; i < this.juegos.length; i++) {


                    if (!generos.includes(this.juegos[i]["genero"])) {


                        oOption = document.createElement("OPTION");

                        oOption.setAttribute("value", this.juegos[i]["genero"]);
                        oOption.textContent = this.juegos[i]["genero"];

                        if (generoFiltrado == this.juegos[i]["genero"]) {
                            oOption.setAttribute("selected", "");
                        }
                        oCombo.appendChild(oOption);

                        generos.push(this.juegos[i]["genero"]);

                    }
                }
                //Creo boton filtrar

                /* var oBtnFiltra = document.createElement("INPUT");
                oBtnFiltra.classList.add("btn");
                oBtnFiltra.classList.add("btn-primary");
                oBtnFiltra.setAttribute("type", "button");
                oBtnFiltra.setAttribute("value", "Filtra");
                oBtnFiltra.setAttribute("id", "btnFiltra");
                oBtnFiltra.style.marginLeft = "0.5em"; */
                //oBtnFiltra.addEventListener("click", filtraGenero);
                oCombo.addEventListener("change", filtraGenero);

                var oTabla = document.createElement("table");

                oTabla.setAttribute('border', '1');
                oTabla.id = "lista";
                var header = oTabla.createTHead();
                var row = header.insertRow(0);
                var cell = row.insertCell(-1);
                cell.textContent = "TITULO";
                cell = row.insertCell(-1);
                cell.textContent = "GENERO";
                cell = row.insertCell(-1);
                cell.textContent = "AÑO";
                cell = row.insertCell(-1);
                cell.textContent = "PRECIO";
                cell = row.insertCell(-1);
                cell.textContent = "PEGI";
                cell = row.insertCell(-1);
                cell.textContent = "Comprar ";

                var tbody = document.createElement("TBODY");
                oTabla.appendChild(tbody);

                for (var i = 0; i < this.juegos.length; i++) {
                    //Filtramos por el genero
                    if (generoFiltrado == this.juegos[i]["genero"]) {

                        row = tbody.insertRow(-1);
                        var btnCompra = document.createElement("button");
                        btnCompra.textContent = "Comprar";
                        //let juegoIndividual = Object.values(this.juegos[i]);

                        cell = row.insertCell(-1);
                        cell.textContent = this.juegos[i]["titulo"];
                        cell = row.insertCell(-1);
                        cell.textContent = this.juegos[i]["genero"];
                        cell = row.insertCell(-1);
                        cell.textContent = this.juegos[i]["año_lanzamiento"].getFullYear();
                        cell = row.insertCell(-1);
                        cell.textContent = this.juegos[i]["precio"];
                        cell = row.insertCell(-1);
                        cell.textContent = this.juegos[i]["pegi"];
                        cell = row.insertCell(-1);
                        btnCompra.setAttribute("value", this.juegos[i]["id_juego"]);
                        btnCompra.addEventListener("click", this.listarDatosCompra);
                        cell.appendChild(btnCompra);
                    }
                }
                let oDiv = document.createElement("DIV");
                oDiv.setAttribute("id", "listadoJuegos");
                oDiv.appendChild(oLabel);
                oDiv.appendChild(oCombo);
                //  oDiv.appendChild(oBtnFiltra);
                oDiv.appendChild(oTabla);

                document.body.appendChild(oDiv);

            }
        }
        //------------------------LISTAR JUEGOS DE CLIENTE ---------------------------------------------------------------------------------------------------------------------------//
    listarJuegosDeCliente(juegosComprados) {

        var oTabla = document.createElement("table");

        oTabla.setAttribute('border', '1');
        oTabla.id = "lista";
        var header = oTabla.createTHead();
        var row = header.insertRow(0);
        var cell = row.insertCell(-1);
        cell.textContent = "TITULO";
        cell = row.insertCell(-1);
        cell.textContent = "GENERO";
        cell = row.insertCell(-1);
        cell.textContent = "AÑO";
        cell = row.insertCell(-1);
        cell.textContent = "PEGI";

        var tbody = document.createElement("TBODY");
        oTabla.appendChild(tbody);


        for (var i = 0; i < this.juegos.length; i++) {


            if (juegosComprados == null || juegosComprados.includes(this.juegos[i]["id_juego"])) {

                if (juegosComprados == null) {
                    var oDivSus = document.createElement("div");
                    oDivSus.textContent = "El usuario está suscrito. Tiene acceso total a todos los juegos";
                } else {
                    var oDivSus = document.createElement("div");
                    oDivSus.textContent = "El usuario no está suscrito.";
                }
                //Añado el juego
                row = tbody.insertRow(-1);

                cell = row.insertCell(-1);
                cell.textContent = this.juegos[i]["titulo"];
                cell = row.insertCell(-1);
                cell.textContent = this.juegos[i]["genero"];
                cell = row.insertCell(-1);
                cell.textContent = this.juegos[i]["año_lanzamiento"].getFullYear();
                cell = row.insertCell(-1);
                cell.textContent = "+" + this.juegos[i]["pegi"];
            }



        }
        let oDiv = document.createElement("DIV");
        oDiv.setAttribute("id", "listadoJuegos");
        oDiv.appendChild(oDivSus);
        oDiv.appendChild(oTabla);

        document.body.appendChild(oDiv);
    }

    listarDatosCompra(oEvento) {

        ocultarFormularios();

        //DEBE RECOGER EL EVENTO EN EL BOTON, ACTUALMENTE LO RECOGE DEL BODY
        //AVERIGUAR COMO COGER LOS DATOS DEL JUEGO
        //MIRAR CON ALVARO QUE EL BOTON SE DECLARA VARIAS VECES
        let oE = oEvento || window.event;

        console.log(oE);

        let arrayJuego = _buscarJuegoId(oE.target.value);

        console.log(arrayJuego);


        let br = document.createElement("br");

        let labelEmail = document.createElement("label");
        labelEmail.textContent = "EMAIL";

        let inputEmail = document.createElement("input");
        inputEmail.placeholder = "EMAIL";
        inputEmail.classList.add("normal");

        let labelNombreJuego = document.createElement("label");
        labelNombreJuego.textContent = "Titulo:"

        let inputNombreJuego = document.createElement("input");
        inputNombreJuego.value = arrayJuego["titulo"];
        inputNombreJuego.setAttribute("readonly", "true");

        let labelGeneroJuego = document.createElement("label");
        labelGeneroJuego.textContent = "Genero:";

        let inputGeneroJuego = document.createElement("input");
        inputGeneroJuego.value = arrayJuego["genero"];
        inputGeneroJuego.setAttribute("readonly", "true");

        let labelPrecio = document.createElement("label");
        labelPrecio.textContent = "Precio:";

        let inputPrecio = document.createElement("input");
        inputPrecio.value = arrayJuego["precio"];
        inputPrecio.setAttribute("readonly", "true");


        let btnComprarJuego = document.createElement("button");
        btnComprarJuego.value = arrayJuego["id_juego"];
        btnComprarJuego.textContent = "Comprar";
        btnComprarJuego.addEventListener("click", function() {

            let sEmail = inputEmail.value;
            let oCliente = _buscarCliente(sEmail);
            let iNumCompras = recogeNumCompras();
            if (oCliente != null) {

                let oCompra = new Compra(iNumCompras + 1, oCliente["iId"], arrayJuego["id_juego"], new Date(), arrayJuego["precio"]);
                introduceCompra(oCompra);
                alert("Compra Realizada Correctamente");
                ocultarFormularios();
            } else {
                alert("El cliente no existe");
            }

        });






        let oTablaCompra = document.createElement("table");
        var header = oTablaCompra.createTHead();
        var row = header.insertRow(0);
        var cell = row.insertCell(-1);
        cell.setAttribute("colspan", "2");
        cell.setAttribute("style", "text-align:center");
        cell.textContent = "COMPRA";
        var tbody = document.createElement("TBODY");
        oTablaCompra.appendChild(tbody);
        row = tbody.insertRow(-1);
        cell = row.insertCell(-1);
        cell.appendChild(labelEmail);
        cell = row.insertCell(-1);
        cell.appendChild(inputEmail);
        row = tbody.insertRow(-1);
        cell = row.insertCell(-1);
        cell.appendChild(labelNombreJuego);
        cell = row.insertCell(-1);
        cell.appendChild(inputNombreJuego);
        row = tbody.insertRow(-1);
        cell = row.insertCell(-1);
        cell.appendChild(labelGeneroJuego);
        cell = row.insertCell(-1);
        cell.appendChild(inputGeneroJuego);
        row = tbody.insertRow(-1);
        cell = row.insertCell(-1);
        cell.appendChild(labelPrecio);
        cell = row.insertCell(-1);
        cell.appendChild(inputPrecio);
        row = tbody.insertRow(-1);
        cell = row.insertCell(-1);
        cell.setAttribute("colspan", "2");
        cell.setAttribute("align", "center");
        cell.appendChild(btnComprarJuego);

        document.body.appendChild(oTablaCompra);



    }


}
class Juego {
    constructor(id_juego, titulo, genero, año_lanzamiento, precio, pegi) {

        this.id_juego = id_juego;
        this.titulo = titulo;
        this.genero = genero;
        this.año_lanzamiento = año_lanzamiento;
        this.precio = precio;
        this.pegi = pegi;
    }

    //Id Juego
    getId_juego() {
        return this.id_juego;
    }
    setId_juego(id_juego) {
            this.id_juego = id_juego;
        }
        //Titulo
    getTitulo() {
        return this.titulo;
    }
    setTitulo(titulo) {
            this.titulo = titulo;
        }
        //Genero
    getGenero() {
        return this.id_juego;
    }
    setGenero(genero) {
            this.genero = genero;
        }
        //Año lanzamiento
    getAño_lanzamiento() {
        return this.año_lanzamiento;
    }
    setAño_lanzamiento(genero) {
            this.año_lanzamiento = año_lanzamiento;
        }
        //Precio
    getPrecioo() {
        return this.precio;
    }

    setPrecio(precio) {
        this.precio = precio;
    }


    setPrecio(precio) {
        this.precio = precio;
    }

    //Pegi
    getPegi() {
        return this.pegi;
    }
    setPegi(pegi) {
        this.pegi = pegi;
    }

    toHTMLRow() {

        let sCadena = "";
        sCadena += "<tr>";
        sCadena += "<td>";
        sCadena += this.getId_juego();
        sCadena += "</td>";
        sCadena += "<td>";
        sCadena += this.getTitulo();
        sCadena += "</td>";
        sCadena += "<td>";
        sCadena += this.getGenero();
        sCadena += "</td>";
        sCadena += "<td>";
        sCadena += this.getPrecioo();
        sCadena += "</td>";
        sCadena += "<td>";
        sCadena += this.getAño_lanzamiento();
        sCadena += "</td>";
        sCadena += "</tr>";
        return sCadena;

    }

}



class Cliente {
    constructor(iID, sNIF, sNombre, sApellidos, dFecha, sEmail) {

        this.iId = iID;
        this.sNIF = sNIF;
        this.sNombre = sNombre;
        this.sApellidos = sApellidos;
        this.dFecha = dFecha;
        this.sEmail = sEmail;

    }

    getID() {
        return this.iId;
    }
    setID(iID) {
        this.iId = iID;
    }
    getNombre() {
        return this.sNombre;
    }
    setNombre(sNombre) {
        this.sNombre = sNombre;
    }
    getApellidos() {
        return this.sApellidos;
    }
    setApellidos(sApellidos) {
        this.sApellidos = sApellidos;
    }
    getFecha() {
        return this.dFecha;
    }
    setFecha(dFecha) {
        this.dFecha = dFecha;
    }
    getEmail() {
        return this.sEmail;
    }
    setEmail(sEmail) {
        this.sEmail = sEmail;
    }

    toHTMLRow() {

        let sCadena = "";
        sCadena += "<tr>";
        sCadena += "<td>";
        sCadena += this.getID();
        sCadena += "</td>";
        sCadena += "<td>";
        sCadena += this.getNombre();
        sCadena += "</td>";
        sCadena += "<td>";
        sCadena += this.getApellidos();
        sCadena += "</td>";
        sCadena += "<td>";
        sCadena += this.getFecha();
        sCadena += "</td>";
        sCadena += "<td>";
        sCadena += this.getEmail();
        sCadena += "</td>";
        sCadena += "</tr>";
        return sCadena;

    }

}


class Compra {

    constructor(sIdCompra, sIdCliente, sIdJuego, dFecha, dCosteCompra) {

        this.idCompra = sIdCompra;
        this.idCliente = sIdCliente;
        this.idJuego = sIdJuego;
        this.fecha = dFecha;
        this.costeCompra = dCosteCompra;


    }

}
Compra.prototype.toHTMLRow = function() {
    let sFila = "<tr>";
    sFila += "<td>" + this.idCompra + "</td>";
    sFila += "<td>" + this.idCliente + "</td>";
    sFila += "<td>" + this.idJuego + "</td>";
    sFila += "<td>" + this.fecha + "</td>";
    sFila += "<td>" + this.costeCompra + "</td>";

    return sFila;
}

class Suscripcion {

    constructor(sIdsuscripcion, sIdCliente, dFechaExp) {

        this.idsuscripcion = sIdsuscripcion;
        this.idCliente = sIdCliente;
        this.fechaExp = dFechaExp;
        this.precio = parseFloat("10,00");
    }
}

Suscripcion.prototype.toHTMLRow = function() {

    let sFila = "<tr>";
    sFila += "<td>" + this.idsuscripcion + "</td>";
    sFila += "<td>" + this.idCliente + "</td>";
    sFila += "<td>" + this.fechaExp + "</td>";
    sFila += "<td>" + this.precio + "</td>";

    return sFila;
}
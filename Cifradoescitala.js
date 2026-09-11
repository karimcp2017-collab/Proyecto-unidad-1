// Cifrar mensaje
function cifrar() {

    const mensajeOriginal = document
        .getElementById("mensaje")
        .value;

    const columnas = parseInt(
        document.getElementById("clave").value,
        10
    );

    // Comprobar mensaje
    if (mensajeOriginal.trim() === "") {
        alert("Escribe un mensaje.");
        return;
    }

    // Comprobar clave
    if (isNaN(columnas) || columnas <= 0) {
        alert("Introduce una clave válida mayor que 0.");
        return;
    }

    // Quitamos espacios para facilitar el cifrado
    const mensaje = mensajeOriginal.replace(/\s/g, "");

    // Número de filas necesarias
    const filas = Math.ceil(mensaje.length / columnas);

    let resultado = "";
    let pasos = "";

    // ------------------------------------------
    // MOSTRAR TABLA DEL MENSAJE
    // ------------------------------------------

    let tabla = "<table border='1' cellpadding='8'>";

    let indice = 0;

    for (let fila = 0; fila < filas; fila++) {

        tabla += "<tr>";

        for (let columna = 0; columna < columnas; columna++) {

            if (indice < mensaje.length) {
                tabla += "<td>" + mensaje[indice] + "</td>";
                indice++;
            } else {
                tabla += "<td></td>";
            }
        }

        tabla += "</tr>";
    }

    tabla += "</table>";

    // ------------------------------------------
    // LEER POR COLUMNAS
    // ------------------------------------------

    for (let columna = 0; columna < columnas; columna++) {

        for (let fila = 0; fila < filas; fila++) {

            const posicion = fila * columnas + columna;

            if (posicion < mensaje.length) {

                resultado += mensaje[posicion];

            }
        }
    }

    // ------------------------------------------
    // MOSTRAR PROCESO
    // ------------------------------------------

    for (let columna = 0; columna < columnas; columna++) {

        let columnaTexto = "";

        for (let fila = 0; fila < filas; fila++) {

            const posicion = fila * columnas + columna;

            if (posicion < mensaje.length) {
                columnaTexto += mensaje[posicion];
            }
        }

        pasos +=
            "Columna " +
            (columna + 1) +
            ": " +
            columnaTexto +
            "<br>";
    }

    // ------------------------------------------
    // MOSTRAR RESULTADO
    // ------------------------------------------

    document.getElementById("resultado").innerHTML =
        "<b>Cifrado:</b> " +
        resultado +
        "<br><br>" +

        "<b>Clave:</b> " +
        columnas +
        " columnas" +

        "<br><br>" +

        "<b>Tabla utilizada:</b><br><br>" +
        tabla +

        "<br>" +

        "<b>Proceso de cifrado:</b><br>" +
        pasos;
}


function descifrar() {

    let mensaje = document.getElementById("mensaje").value;
    let columnas = parseInt(
        document.getElementById("clave").value,
        10
    );

    // Comprobar mensaje
    if (mensaje.trim() === "") {
        alert("Escribe el mensaje cifrado.");
        return;
    }

    // Comprobar clave
    if (isNaN(columnas) || columnas <= 0) {
        alert("Introduce una clave válida mayor que 0.");
        return;
    }

    // Eliminar espacios
    mensaje = mensaje.replace(/\s/g, "");

    // La clave no puede ser mayor que el mensaje
    if (columnas > mensaje.length) {
        alert("La clave no puede ser mayor que el número de caracteres.");
        return;
    }

    // ==========================================
    // CALCULAR FILAS
    // ==========================================

    const filas = Math.ceil(mensaje.length / columnas);

    // ==========================================
    // CREAR TABLA VACÍA
    // ==========================================

    let tabla = [];

    for (let fila = 0; fila < filas; fila++) {
        tabla[fila] = [];

        for (let columna = 0; columna < columnas; columna++) {
            tabla[fila][columna] = "";
        }
    }

    // ==========================================
    // SABER CUÁNTAS LETRAS TIENE CADA COLUMNA
    // ==========================================

    const caracteresCompletos = Math.floor(
        mensaje.length / columnas
    );

    const sobrantes = mensaje.length % columnas;

    // ==========================================
    // COLOCAR EL CIFRADO EN LA TABLA
    // DE ARRIBA HACIA ABAJO
    // ==========================================

    let posicion = 0;

    for (let columna = 0; columna < columnas; columna++) {

        // Las primeras columnas tienen una letra adicional
        let cantidad = caracteresCompletos;

        if (columna < sobrantes) {
            cantidad++;
        }

        for (let fila = 0; fila < cantidad; fila++) {

            tabla[fila][columna] = mensaje[posicion];

            posicion++;
        }
    }

    // ==========================================
    // LEER LA TABLA POR FILAS
    // ==========================================

    let descifrado = "";

    for (let fila = 0; fila < filas; fila++) {

        for (let columna = 0; columna < columnas; columna++) {

            if (tabla[fila][columna] !== "") {

                descifrado += tabla[fila][columna];
            }
        }
    }

    // ==========================================
    // CREAR TABLA HTML
    // ==========================================

    let tablaHTML = 
        <table class="tabla-escitala">
            <tbody>
    ;

    for (let fila = 0; fila < filas; fila++) {

        tablaHTML += "<tr>";

        for (let columna = 0; columna < columnas; columna++) {

            tablaHTML += 
                <td>${tabla[fila][columna]}</td>
            ;
        }

        tablaHTML += "</tr>";
    }

    tablaHTML += 
            </tbody>
        </table>
    ;

    // ==========================================
    // MOSTRAR RESULTADO
    // ==========================================

    document.getElementById("resultado").innerHTML = 

        <div class="resultado-caja">

            <h3>Resultado del descifrado</h3>

            <p>
                <strong>Descifrado:</strong>
                <span class="descifrado">${descifrado}</span>
            </p>

            <p>
                <strong>Clave:</strong>
                ${columnas} columnas
            </p>

            <h4>Tabla reconstruida:</h4>

            ${tablaHTML}

            <br>

            <p>
                El mensaje se colocó por columnas
                y se leyó nuevamente por filas.
            </p>

        </div>
    ;
}


// ==========================================
// BOTONES
// ==========================================

// Esperamos a que cargue completamente el HTML
document.addEventListener("DOMContentLoaded", function () {

    document
        .getElementById("btnCifrar")
        .addEventListener("click", cifrar);

    document
        .getElementById("btnDescifrar")
        .addEventListener("click", descifrar);

});


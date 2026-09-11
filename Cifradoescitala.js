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


// ==========================================
// DESCIFRAR MENSAJE
// ==========================================

function descifrar() {

    const mensaje = document
        .getElementById("mensaje")
        .value
        .replace(/\s/g, "");

    const columnas = parseInt(
        document.getElementById("clave").value,
        10
    );

    // Comprobar mensaje
    if (mensaje === "") {
        alert("Escribe un mensaje cifrado.");
        return;
    }

    // Comprobar clave
    if (isNaN(columnas) || columnas <= 0) {
        alert("Introduce una clave válida mayor que 0.");
        return;
    }

    // Número de filas
    const filas = Math.ceil(mensaje.length / columnas);

    // ------------------------------------------
    // CREAR TABLA VACÍA
    // ------------------------------------------

    let tabla = [];

    for (let fila = 0; fila < filas; fila++) {

        tabla[fila] = [];

        for (let columna = 0; columna < columnas; columna++) {

            tabla[fila][columna] = "";
        }
    }

    // ------------------------------------------
    // CALCULAR CUÁNTAS LETRAS HAY EN CADA FILA
    // ------------------------------------------

    const letrasPorFila = [];

    for (let fila = 0; fila < filas; fila++) {

        const inicio = fila * columnas;
        const restantes = mensaje.length - inicio;

        letrasPorFila[fila] =
            Math.min(columnas, Math.max(0, restantes));
    }

    // ------------------------------------------
    // COLOCAR EL CIFRADO POR COLUMNAS
    // ------------------------------------------

    let indice = 0;

    for (let columna = 0; columna < columnas; columna++) {

        for (let fila = 0; fila < filas; fila++) {

            // Saber si esta posición existe
            const posicion = fila * columnas + columna;

            if (
                posicion < mensaje.length &&
                indice < mensaje.length
            ) {

                tabla[fila][columna] = mensaje[indice];

                indice++;
            }
        }
    }

    // ------------------------------------------
    // LEER LA TABLA POR FILAS
    // ------------------------------------------

    let resultado = "";

    for (let fila = 0; fila < filas; fila++) {

        for (let columna = 0; columna < columnas; columna++) {

            if (tabla[fila][columna] !== "") {

                resultado += tabla[fila][columna];
            }
        }
    }

    // ------------------------------------------
    // MOSTRAR TABLA
    // ------------------------------------------

    let tablaHTML =
        "<table border='1' cellpadding='8'>";

    for (let fila = 0; fila < filas; fila++) {

        tablaHTML += "<tr>";

        for (
            let columna = 0;
            columna < columnas;
            columna++
        ) {

            tablaHTML +=
                "<td>" +
                tabla[fila][columna] +
                "</td>";
        }

        tablaHTML += "</tr>";
    }

    tablaHTML += "</table>";

    // ------------------------------------------
    // MOSTRAR RESULTADO
    // ------------------------------------------

    document.getElementById("resultado").innerHTML =
        "<b>Descifrado:</b> " +
        resultado +

        "<br><br>" +

        "<b>Clave:</b> " +
        columnas +
        " columnas" +

        "<br><br>" +

        "<b>Tabla reconstruida:</b><br><br>" +
        tablaHTML +

        "<br>" +

        "<b>Proceso:</b><br>" +

        "El mensaje cifrado se colocó por columnas " +
        "y después se leyó por filas.";
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


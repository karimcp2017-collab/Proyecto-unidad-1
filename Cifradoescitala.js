// ==========================================
// ESCÍTALA ESPARTANA
// Equipo 4
// ==========================================

// ------------------------------------------
// Función para mostrar una matriz visualmente
// ------------------------------------------
function mostrarMatriz(matriz, titulo) {

    let html = "<h3>" + titulo + "</h3>";

    html += "<table border='1' cellpadding='10' cellspacing='0'>";

    // Encabezado de columnas
    html += "<tr>";
    html += "<th></th>";

    for (let j = 0; j < matriz[0].length; j++) {
        html += "<th>Col " + (j + 1) + "</th>";
    }

    html += "</tr>";

    // Contenido de la matriz
    for (let i = 0; i < matriz.length; i++) {

        html += "<tr>";

        // Número de fila
        html += "<th>Fila " + (i + 1) + "</th>";

        for (let j = 0; j < matriz[i].length; j++) {

            let caracter = matriz[i][j];

            // Mostrar los espacios como un cuadro
            if (caracter === " ") {
                caracter = "□";
            }

            html += "<td align='center'><b>" + caracter + "</b></td>";
        }

        html += "</tr>";
    }

    html += "</table>";

    return html;
}


// ==========================================
// CIFRAR
// ==========================================

function cifrar() {

    let mensajeInput = document.getElementById("mensaje");
    let claveInput = document.getElementById("clave");
    let resultadoDiv = document.getElementById("resultado");

    if (!mensajeInput || !claveInput || !resultadoDiv) return;

    let mensajeOriginal = mensajeInput.value;
    let ancho = parseInt(claveInput.value, 10);

    // --------------------------------------
    // Validaciones
    // --------------------------------------

    if (isNaN(ancho) || ancho < 1) {

        resultadoDiv.innerHTML =
            "<b>Error:</b> La clave debe ser un número entero mayor o igual a 1.";

        return;
    }

    if (mensajeOriginal.length === 0) {

        resultadoDiv.innerHTML =
            "<b>Error:</b> Ingresa un mensaje para cifrar.";

        return;
    }

    // --------------------------------------
    // Copia del mensaje
    // --------------------------------------

    let mensaje = mensajeOriginal;

    // --------------------------------------
    // Agregar espacios hasta que sea divisible
    // exactamente como en Java
    // --------------------------------------

    let espaciosAgregados = 0;

    while (mensaje.length % ancho !== 0) {

        mensaje += " ";
        espaciosAgregados++;
    }

    // --------------------------------------
    // Calcular filas
    // --------------------------------------

    let filas = mensaje.length / ancho;

    // --------------------------------------
    // Crear matriz
    // --------------------------------------

    let matriz = [];

    for (let i = 0; i < filas; i++) {

        matriz[i] = [];

        for (let j = 0; j < ancho; j++) {

            matriz[i][j] = mensaje.charAt(i * ancho + j);
        }
    }

    // --------------------------------------
    // Leer matriz por columnas
    // --------------------------------------

    let mensajeCifrado = "";

    let pasosColumnas = "";

    for (let col = 0; col < ancho; col++) {

        pasosColumnas +=
            "<b>Columna " + (col + 1) + ":</b> ";

        for (let fila = 0; fila < filas; fila++) {

            mensajeCifrado += matriz[fila][col];

            let caracter = matriz[fila][col];

            if (caracter === " ") {
                caracter = "□";
            }

            pasosColumnas += caracter;

            if (fila < filas - 1) {
                pasosColumnas += " → ";
            }
        }

        pasosColumnas += "<br>";
    }

    // --------------------------------------
    // Mostrar resultado
    // --------------------------------------

    let html = "";

    html += "<h2>🔐 Cifrado Escítala</h2>";

    html += "<p>";
    html += "<b>Mensaje original:</b> ";
    html += mensajeOriginal;
    html += "</p>";

    html += "<p>";
    html += "<b>Ancho / clave:</b> ";
    html += ancho;
    html += "</p>";

    html += "<p>";
    html += "<b>Caracteres originales:</b> ";
    html += mensajeOriginal.length;
    html += "</p>";

    html += "<p>";
    html += "<b>Espacios agregados:</b> ";
    html += espaciosAgregados;
    html += "</p>";

    html += "<p>";
    html += "<b>Número de filas:</b> ";
    html += filas;
    html += "</p>";

    // Mostrar matriz
    html += mostrarMatriz(
        matriz,
        "1️⃣ Matriz escrita por filas"
    );

    html += "<br>";

    // Mostrar lectura por columnas
    html += "<h3>2️⃣ Lectura por columnas</h3>";

    html += "<p>";
    html += pasosColumnas;
    html += "</p>";

    html += "<p>";
    html += "<b>Orden de lectura:</b> ";
    html += "↓ ↓ ↓ → ↓ ↓ ↓ → ...";
    html += "</p>";

    // Resultado final
    html += "<h3>3️⃣ Resultado</h3>";

    html += "<p>";
    html += "<b>Mensaje cifrado:</b>";
    html += "</p>";

    html += "<h2>";
    html += mensajeCifrado;
    html += "</h2>";

    resultadoDiv.innerHTML = html;
}


// ==========================================
// DESCIFRAR
// ==========================================

function descifrar() {

    let mensajeInput = document.getElementById("mensaje");
    let claveInput = document.getElementById("clave");
    let resultadoDiv = document.getElementById("resultado");

    if (!mensajeInput || !claveInput || !resultadoDiv) return;

    let mensajeCifrado = mensajeInput.value;
    let ancho = parseInt(claveInput.value, 10);

    // --------------------------------------
    // Validaciones
    // --------------------------------------

    if (isNaN(ancho) || ancho < 1) {

        resultadoDiv.innerHTML =
            "<b>Error:</b> La clave debe ser un número entero mayor o igual a 1.";

        return;
    }

    if (mensajeCifrado.length === 0) {

        resultadoDiv.innerHTML =
            "<b>Error:</b> Ingresa un mensaje para descifrar.";

        return;
    }

    // --------------------------------------
    // El mensaje cifrado debe ser divisible
    // entre el ancho
    // --------------------------------------

    if (mensajeCifrado.length % ancho !== 0) {

        resultadoDiv.innerHTML =
            "<b>Error:</b> El mensaje cifrado no es válido para esa clave.";

        return;
    }

    // --------------------------------------
    // Calcular filas
    // --------------------------------------

    let columnas = ancho;

    let filas = mensajeCifrado.length / columnas;

    // --------------------------------------
    // Crear matriz
    // --------------------------------------

    let matriz = [];

    for (let i = 0; i < filas; i++) {

        matriz[i] = [];

        for (let j = 0; j < columnas; j++) {

            matriz[i][j] = "";
        }
    }

    // --------------------------------------
    // Colocar el texto cifrado por columnas
    // --------------------------------------

    let index = 0;

    let pasosColumnas = "";

    for (let col = 0; col < columnas; col++) {

        pasosColumnas +=
            "<b>Columna " + (col + 1) + ":</b> ";

        for (let fila = 0; fila < filas; fila++) {

            matriz[fila][col] =
                mensajeCifrado.charAt(index);

            pasosColumnas +=
                matriz[fila][col];

            if (fila < filas - 1) {
                pasosColumnas += " → ";
            }

            index++;
        }

        pasosColumnas += "<br>";
    }

    // --------------------------------------
    // Leer matriz por filas
    // --------------------------------------

    let mensajeDescifrado = "";

    let pasosFilas = "";

    for (let fila = 0; fila < filas; fila++) {

        pasosFilas +=
            "<b>Fila " + (fila + 1) + ":</b> ";

        for (let col = 0; col < columnas; col++) {

            mensajeDescifrado +=
                matriz[fila][col];

            pasosFilas +=
                matriz[fila][col];

            if (col < columnas - 1) {
                pasosFilas += " → ";
            }
        }

        pasosFilas += "<br>";
    }

    // --------------------------------------
    // Eliminar espacios finales
    // exactamente como en Java
    // --------------------------------------

    mensajeDescifrado = mensajeDescifrado.trim();

    // --------------------------------------
    // Mostrar resultado
    // --------------------------------------

    let html = "";

    html += "<h2>🔓 Descifrado Escítala</h2>";

    html += "<p>";
    html += "<b>Mensaje cifrado:</b> ";
    html += mensajeCifrado;
    html += "</p>";

    html += "<p>";
    html += "<b>Ancho / clave:</b> ";
    html += ancho;
    html += "</p>";

    html += "<p>";
    html += "<b>Número de filas:</b> ";
    html += filas;
    html += "</p>";

    // Paso 1
    html += mostrarMatriz(
        matriz,
        "1️⃣ Matriz reconstruida por columnas"
    );

    html += "<br>";

    // Paso 2
    html += "<h3>2️⃣ Lectura por filas</h3>";

    html += "<p>";
    html += pasosFilas;
    html += "</p>";

    // Resultado
    html += "<h3>3️⃣ Resultado</h3>";

    html += "<p>";
    html += "<b>Mensaje original:</b>";
    html += "</p>";

    html += "<h2>";
    html += mensajeDescifrado;
    html += "</h2>";

    resultadoDiv.innerHTML = html;
}

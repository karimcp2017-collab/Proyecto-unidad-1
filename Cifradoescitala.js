function cifrar() {
    let mensajeInput = document.getElementById("mensaje");
    let claveInput = document.getElementById("clave");
    let resultadoDiv = document.getElementById("resultado");

    if (!mensajeInput || !claveInput || !resultadoDiv) return;

    let mensaje = mensajeInput.value;
    let ancho = parseInt(claveInput.value, 10);
    let resultado = "";
    let pasos = "";

    if (isNaN(ancho) || ancho < 1) {
        resultadoDiv.innerHTML =
            "<b>Error:</b> La clave debe ser un número entero mayor o igual a 1.";
        return;
    }

    if (mensaje.length === 0) {
        resultadoDiv.innerHTML =
            "<b>Error:</b> Ingresa un mensaje para cifrar.";
        return;
    }

    // Agregar espacios hasta que sea divisible entre el ancho
    while (mensaje.length % ancho !== 0) {
        mensaje += " ";
    }

    // Calcular número de filas
    let filas = mensaje.length / ancho;

    // Crear matriz
    let matriz = [];

    // Llenar la matriz por filas
    for (let i = 0; i < filas; i++) {
        matriz[i] = [];

        for (let j = 0; j < ancho; j++) {
            matriz[i][j] = mensaje.charAt(i * ancho + j);
        }
    }

    // Mostrar matriz
    pasos += "<b>1. Matriz escrita por filas:</b><br>";

    for (let i = 0; i < filas; i++) {
        pasos += "Fila " + (i + 1) + ": ";

        for (let j = 0; j < ancho; j++) {
            let caracter = matriz[i][j];

            if (caracter === " ") {
                caracter = "□";
            }

            pasos += caracter;

            if (j < ancho - 1) {
                pasos += " | ";
            }
        }

        pasos += "<br>";
    }

    // Leer la matriz por columnas
    pasos += "<br><b>2. Lectura por columnas:</b><br>";

    for (let col = 0; col < ancho; col++) {
        pasos += "Columna " + (col + 1) + ": ";

        for (let fila = 0; fila < filas; fila++) {
            resultado += matriz[fila][col];

            let caracter = matriz[fila][col];

            if (caracter === " ") {
                caracter = "□";
            }

            pasos += caracter;

            if (fila < filas - 1) {
                pasos += " → ";
            }
        }

        pasos += "<br>";
    }

    // Mostrar resultado
    resultadoDiv.innerHTML =
        "<h3>🔐 Proceso de Cifrado</h3>" +
        "<b>Mensaje original:</b> " + mensajeInput.value +
        "<br><b>Ancho:</b> " + ancho +
        "<br><b>Filas:</b> " + filas +
        "<br><br>" +
        pasos +
        "<br><b>🔒 Texto cifrado:</b> " + resultado;
}


function descifrar() {
    let mensajeInput = document.getElementById("mensaje");
    let claveInput = document.getElementById("clave");
    let resultadoDiv = document.getElementById("resultado");

    if (!mensajeInput || !claveInput || !resultadoDiv) return;

    let mensajeCifrado = mensajeInput.value;
    let ancho = parseInt(claveInput.value, 10);
    let resultado = "";
    let pasos = "";

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

    if (mensajeCifrado.length % ancho !== 0) {
        resultadoDiv.innerHTML =
            "<b>Error:</b> El mensaje cifrado no es válido para esa clave.";
        return;
    }

    // Calcular número de filas
    let filas = mensajeCifrado.length / ancho;

    // Crear matriz
    let matriz = [];

    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
    }

    let index = 0;

    // Llenar la matriz por columnas
    for (let col = 0; col < ancho; col++) {

        for (let fila = 0; fila < filas; fila++) {
            matriz[fila][col] = mensajeCifrado.charAt(index);
            index++;
        }
    }

    // Mostrar matriz reconstruida
    pasos += "<b>1. Matriz reconstruida por columnas:</b><br>";

    for (let i = 0; i < filas; i++) {
        pasos += "Fila " + (i + 1) + ": ";

        for (let j = 0; j < ancho; j++) {
            let caracter = matriz[i][j];

            if (caracter === " ") {
                caracter = "□";
            }

            pasos += caracter;

            if (j < ancho - 1) {
                pasos += " | ";
            }
        }

        pasos += "<br>";
    }

    // Leer la matriz por filas
    pasos += "<br><b>2. Lectura por filas:</b><br>";

    for (let fila = 0; fila < filas; fila++) {

        pasos += "Fila " + (fila + 1) + ": ";

        for (let col = 0; col < ancho; col++) {
            resultado += matriz[fila][col];

            let caracter = matriz[fila][col];

            if (caracter === " ") {
                caracter = "□";
            }

            pasos += caracter;

            if (col < ancho - 1) {
                pasos += " → ";
            }
        }

        pasos += "<br>";
    }

    // Eliminar espacios finales
    resultado = resultado.trim();

    // Mostrar resultado
    resultadoDiv.innerHTML =
        "<h3>🔓 Proceso de Descifrado</h3>" +
        "<b>Texto cifrado:</b> " + mensajeCifrado +
        "<br><b>Ancho:</b> " + ancho +
        "<br><b>Filas:</b> " + filas +
        "<br><br>" +
        pasos +
        "<br><b>🔓 Texto descifrado:</b> " + resultado;
}

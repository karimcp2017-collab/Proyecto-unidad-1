function cifrar() {
    let mensajeInput = document.getElementById("mensaje");
    let claveInput = document.getElementById("clave");
    let resultadoDiv = document.getElementById("resultado");

    if (!mensajeInput || !claveInput || !resultadoDiv) return;

    let mensaje = mensajeInput.value;
    let columnas = parseInt(claveInput.value, 10);

    if (isNaN(columnas) || columnas < 1) {
        resultadoDiv.innerHTML = "<b>Error:</b> La clave debe ser un número entero mayor o igual a 1.";
        return;
    }

    if (mensaje.length === 0) {
        resultadoDiv.innerHTML = "<b>Error:</b> Ingresa un mensaje para cifrar.";
        return;
    }

    let filas = Math.ceil(mensaje.length / columnas);
    let resultado = "";
    let pasos = "";

    // Crear matriz vacía
    let matriz = [];
    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < columnas; j++) {
            matriz[i][j] = "";
        }
    }

    // 1. Escribir por FILAS
    let indice = 0;
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (indice < mensaje.length) {
                matriz[i][j] = mensaje[indice];
                indice++;
            }
        }
    }

    // Construir vista de matriz
    pasos += "<b>Matriz armada por filas:</b><br>";
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            pasos += (matriz[i][j] === "" ? "□" : matriz[i][j]) + " ";
        }
        pasos += "<br>";
    }

    // 2. Leer por COLUMNAS (Texto Cifrado)
    pasos += "<br><b>Lectura por columnas:</b><br>";
    for (let j = 0; j < columnas; j++) {
        for (let i = 0; i < filas; i++) {
            if (matriz[i][j] !== "") {
                resultado += matriz[i][j];
                pasos += "Tomando '" + matriz[i][j] + "' de fila " + (i + 1) + ", columna " + (j + 1) + "<br>";
            }
        }
    }

    resultadoDiv.innerHTML = "<b>Cifrado Escítala:</b> " + resultado + "<br><br><b>Proceso:</b><br>" + pasos;
}

function descifrar() {
    let mensajeInput = document.getElementById("mensaje");
    let claveInput = document.getElementById("clave");
    let resultadoDiv = document.getElementById("resultado");

    if (!mensajeInput || !claveInput || !resultadoDiv) return;

    let mensaje = mensajeInput.value;
    let columnas = parseInt(claveInput.value, 10);

    if (isNaN(columnas) || columnas < 1) {
        resultadoDiv.innerHTML = "<b>Error:</b> La clave debe ser un número entero mayor o igual a 1.";
        return;
    }

    if (mensaje.length === 0) {
        resultadoDiv.innerHTML = "<b>Error:</b> Ingresa un mensaje para descifrar.";
        return;
    }

    let filas = Math.ceil(mensaje.length / columnas);
    let resto = mensaje.length % columnas;
    let resultado = "";
    let pasos = "";

    // Crear matriz vacía
    let matriz = [];
    for (let i = 0; i < filas; i++) {
        matriz[i] = [];
        for (let j = 0; j < columnas; j++) {
            matriz[i][j] = "";
        }
    }

    // 1. Colocar texto cifrado por COLUMNAS
    let indice = 0;
    pasos += "<b>Colocación por columnas:</b><br>";

    for (let j = 0; j < columnas; j++) {
        let filasEnEstaColumna = (resto === 0 || j < resto) ? filas : filas - 1;

        for (let i = 0; i < filasEnEstaColumna; i++) {
            if (indice < mensaje.length) {
                matriz[i][j] = mensaje[indice];
                pasos += "Colocando '" + mensaje[indice] + "' en fila " + (i + 1) + ", columna " + (j + 1) + "<br>";
                indice++;
            }
        }
    }

    // Construir vista de matriz
    pasos += "<br><b>Matriz reconstruida:</b><br>";
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            pasos += (matriz[i][j] === "" ? "□" : matriz[i][j]) + " ";
        }
        pasos += "<br>";
    }

    // 2. Leer por FILAS (Texto Original)
    pasos += "<br><b>Lectura por filas (Original):</b><br>";
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (matriz[i][j] !== "") {
                resultado += matriz[i][j];
                pasos += "Recuperando '" + matriz[i][j] + "' de fila " + (i + 1) + ", columna " + (j + 1) + "<br>";
            }
        }
    }

    resultadoDiv.innerHTML = "<b>Descifrado Escítala:</b> " + resultado + "<br><br><b>Proceso:</b><br>" + pasos;
}

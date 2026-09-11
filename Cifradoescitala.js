function cifrar() {

    let mensaje = document.getElementById("mensaje").value;
    let columnas = parseInt(document.getElementById("clave").value, 10);

    let resultado = "";
    let pasos = "";

    // Comprobar que la clave sea válida
    if (isNaN(columnas) || columnas < 1) {
        document.getElementById("resultado").innerHTML =
            "<b>Error:</b> La clave debe ser un número entero mayor o igual a 1.";
        return;
    }

    // Calcular número de filas
    let filas = Math.ceil(mensaje.length / columnas);

    // Crear matriz
    let matriz = [];

    for (let i = 0; i < filas; i++) {
        matriz[i] = [];

        for (let j = 0; j < columnas; j++) {
            matriz[i][j] = "";
        }
    }

    // ------------------------------------------------
    // ESCRIBIR MENSAJE POR FILAS
    // ------------------------------------------------

    let indice = 0;

    for (let i = 0; i < filas; i++) {

        for (let j = 0; j < columnas; j++) {

            if (indice < mensaje.length) {
                matriz[i][j] = mensaje[indice];
                indice++;
            }
        }
    }

    pasos += "<b>Matriz:</b><br>";

    for (let i = 0; i < filas; i++) {

        for (let j = 0; j < columnas; j++) {

            if (matriz[i][j] === "") {
                pasos += "□ ";
            } else {
                pasos += matriz[i][j] + " ";
            }
        }

        pasos += "<br>";
    }

    pasos += "<br><b>Lectura por columnas:</b><br>";

    // ------------------------------------------------
    // LEER MATRIZ POR COLUMNAS
    // ------------------------------------------------

    for (let j = 0; j < columnas; j++) {

        for (let i = 0; i < filas; i++) {

            if (matriz[i][j] !== "") {

                resultado += matriz[i][j];

                pasos +=
                    "Se toma '" +
                    matriz[i][j] +
                    "' de fila " +
                    (i + 1) +
                    ", columna " +
                    (j + 1) +
                    "<br>";
            }
        }
    }

    document.getElementById("resultado").innerHTML =
        "<b>Cifrado Escítala:</b> " +
        resultado +
        "<br><br>" +
        "<b>Proceso:</b><br>" +
        pasos;
}


function descifrar() {

    let mensaje = document.getElementById("mensaje").value;
    let columnas = parseInt(document.getElementById("clave").value, 10);

    let resultado = "";
    let pasos = "";

    // Comprobar que la clave sea válida
    if (isNaN(columnas) || columnas < 1) {
        document.getElementById("resultado").innerHTML =
            "<b>Error:</b> La clave debe ser un número entero mayor o igual a 1.";
        return;
    }

    // Calcular número de filas
    let filas = Math.ceil(mensaje.length / columnas);

    // Calcular sobrante
    let resto = mensaje.length % columnas;

    // Crear matriz
    let matriz = [];

    for (let i = 0; i < filas; i++) {

        matriz[i] = [];

        for (let j = 0; j < columnas; j++) {
            matriz[i][j] = "";
        }
    }

    pasos += "<b>Colocación del texto cifrado:</b><br>";

    let indice = 0;

    // ------------------------------------------------
    // COLOCAR TEXTO CIFRADO POR COLUMNAS
    // ------------------------------------------------

    for (let j = 0; j < columnas; j++) {

        let cantidadFilas;

        if (resto === 0) {
            cantidadFilas = filas;
        } else {
            cantidadFilas = (j < resto) ? filas : filas - 1;
        }

        for (let i = 0; i < cantidadFilas; i++) {

            if (indice < mensaje.length) {

                matriz[i][j] = mensaje[indice];

                pasos +=
                    "Se coloca '" +
                    mensaje[indice] +
                    "' en fila " +
                    (i + 1) +
                    ", columna " +
                    (j + 1) +
                    "<br>";

                indice++;
            }
        }
    }

    pasos += "<br><b>Matriz recuperada:</b><br>";

    for (let i = 0; i < filas; i++) {

        for (let j = 0; j < columnas; j++) {

            if (matriz[i][j] === "") {
                pasos += "□ ";
            } else {
                pasos += matriz[i][j] + " ";
            }
        }

        pasos += "<br>";
    }

    pasos += "<br><b>Lectura por filas:</b><br>";

    // ------------------------------------------------
    // LEER MATRIZ POR FILAS
    // ------------------------------------------------

    for (let i = 0; i < filas; i++) {

        for (let j = 0; j < columnas; j++) {

            if (matriz[i][j] !== "") {

                resultado += matriz[i][j];

                pasos +=
                    "Se recupera '" +
                    matriz[i][j] +
                    "' de fila " +
                    (i + 1) +
                    ", columna " +
                    (j + 1) +
                    "<br>";
            }
        }
    }

    document.getElementById("resultado").innerHTML =
        "<b>Descifrado Escítala:</b> " +
        resultado +
        "<br><br>" +
        "<b>Proceso:</b><br>" +
        pasos;
}


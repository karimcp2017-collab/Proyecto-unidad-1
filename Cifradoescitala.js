function cifrar() {
    let mensaje = document.getElementById("mensaje").value;
    let columnas = parseInt(document.getElementById("clave").value, 10);

    if (isNaN(columnas) || columnas < 1) {
        document.getElementById("resultado").innerHTML =
            "<b>Error:</b> La clave debe ser un número entero mayor o igual a 1.";
        return;
    }

    if (mensaje.length === 0) {
        document.getElementById("resultado").innerHTML = "<b>Error:</b> Ingrese un mensaje.";
        return;
    }

    let filas = Math.ceil(mensaje.length / columnas);
    let resultado = "";
    let pasos = "";

    // 1. Crear matriz vacía
    let matriz = Array.from({ length: filas }, () => Array(columnas).fill(""));

    // 2. Escribir mensaje por FILAS
    let indice = 0;
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (indice < mensaje.length) {
                matriz[i][j] = mensaje[indice];
                indice++;
            }
        }
    }

    // Dibujar matriz en pasos
    pasos += "<b>Matriz armada por filas:</b><br>";
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            pasos += (matriz[i][j] === "" ? "□" : matriz[i][j]) + " ";
        }
        pasos += "<br>";
    }

    // 3. Leer mensaje por COLUMNAS (Texto Cifrado)
    pasos += "<br><b>Lectura por columnas:</b><br>";
    for (let j = 0; j < columnas; j++) {
        for (let i = 0; i < filas; i++) {
            if (matriz[i][j] !== "") {
                resultado += matriz[i][j];
                pasos += `Tomando '${matriz[i][j]}' de fila ${i + 1}, columna ${j + 1}<br>`;
            }
        }
    }

    document.getElementById("resultado").innerHTML =
        "<b>Cifrado Escítala:</b> " + resultado + "<br><br><b>Proceso:</b><br>" + pasos;
}


function descifrar() {
    let mensaje = document.getElementById("mensaje").value;
    let columnas = parseInt(document.getElementById("clave").value, 10);

    if (isNaN(columnas) || columnas < 1) {
        document.getElementById("resultado").innerHTML =
            "<b>Error:</b> La clave debe ser un número entero mayor o igual a 1.";
        return;
    }

    if (mensaje.length === 0) {
        document.getElementById("resultado").innerHTML = "<b>Error:</b> Ingrese un mensaje.";
        return;
    }

    let filas = Math.ceil(mensaje.length / columnas);
    let resto = mensaje.length % columnas; // Huecos ocupados en la última fila
    let resultado = "";
    let pasos = "";

    let matriz = Array.from({ length: filas }, () => Array(columnas).fill(""));

    // 1. Colocar el texto cifrado por COLUMNAS
    let indice = 0;
    pasos += "<b>Colocación por columnas:</b><br>";

    for (let j = 0; j < columnas; j++) {
        // Si hay resto, las primeras 'resto' columnas tienen 'filas' elementos, el resto tiene 'filas - 1'
        let filasEnEstaColumna = (resto === 0 || j < resto) ? filas : filas - 1;

        for (let i = 0; i < filasEnEstaColumna; i++) {
            if (indice < mensaje.length) {
                matriz[i][j] = mensaje[indice];
                pasos += `Colocando '${mensaje[indice]}' en fila ${i + 1}, columna ${j + 1}<br>`;
                indice++;
            }
        }
    }

    // Dibujar matriz recuperada
    pasos += "<br><b>Matriz reconstruida:</b><br>";
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            pasos += (matriz[i][j] === "" ? "□" : matriz[i][j]) + " ";
        }
        pasos += "<br>";
    }

    // 2. Leer mensaje por FILAS (Texto Original)
    pasos += "<br><b>Lectura por filas (Original):</b><br>";
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (matriz[i][j] !== "") {
                resultado += matriz[i][j];
                pasos += `Recuperando '${matriz[i][j]}' de fila ${i + 1}, columna ${j + 1}<br>`;
            }
        }
    }

    document.getElementById("resultado").innerHTML =
        "<b>Descifrado Escítala:</b> " + resultado + "<br><br><b>Proceso:</b><br>" + pasos;
}

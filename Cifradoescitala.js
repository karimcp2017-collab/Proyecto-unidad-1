// ==========================================
// ESCÍTALA ESPARTANA
// ==========================================


// ==========================================
// CIFRAR
// ==========================================

function cifrar() {

    let mensaje = document.getElementById("mensaje").value;
    let columnas = parseInt(
        document.getElementById("clave").value,
        10
    );

    // Comprobar mensaje
    if (mensaje.trim() === "") {
        alert("Escribe un mensaje.");
        return;
    }

    // Comprobar clave
    if (isNaN(columnas) || columnas <= 0) {
        alert("Introduce una clave válida mayor que 0.");
        return;
    }

    // Quitamos los espacios
    mensaje = mensaje.replace(/\s/g, "");

    // Número de filas
    const filas = Math.ceil(mensaje.length / columnas);

    // ==========================================
    // CREAR TABLA
    // ==========================================

    let tabla = [];
    let indice = 0;

    for (let fila = 0; fila < filas; fila++) {

        tabla[fila] = [];

        for (let columna = 0; columna < columnas; columna++) {

            if (indice < mensaje.length) {
                tabla[fila][columna] = mensaje[indice];
                indice++;
            } else {
                tabla[fila][columna] = "";
            }
        }
    }

    // ==========================================
    // CREAR EL CIFRADO
    // LEEMOS POR COLUMNAS
    // ==========================================

    let cifrado = "";

    for (let columna = 0; columna < columnas; columna++) {

        for (let fila = 0; fila < filas; fila++) {

            if (tabla[fila][columna] !== "") {
                cifrado += tabla[fila][columna];
            }
        }
    }

    // ==========================================
    // MOSTRAR TABLA
    // ==========================================

    let tablaHTML = `
        <table class="tabla-escitala">
            <tbody>
    `;

    for (let fila = 0; fila < filas; fila++) {

        tablaHTML += "<tr>";

        for (let columna = 0; columna < columnas; columna++) {

            tablaHTML += `
                <td>
                    ${tabla[fila][columna]}
                </td>
            `;
        }

        tablaHTML += "</tr>";
    }

    tablaHTML += `
            </tbody>
        </table>
    `;

    // ==========================================
    // MOSTRAR PROCESO
    // ==========================================

    let proceso = "";

    for (let columna = 0; columna < columnas; columna++) {

        let textoColumna = "";

        for (let fila = 0; fila < filas; fila++) {

            if (tabla[fila][columna] !== "") {
                textoColumna += tabla[fila][columna];
            }
        }

        proceso += `
            Columna ${columna + 1}: ${textoColumna}<br>
        `;
    }

    // ==========================================
    // MOSTRAR RESULTADO
    // ==========================================

    document.getElementById("resultado").innerHTML = `

        <div class="resultado-caja">

            <h3>Resultado del cifrado</h3>

            <p>
                <strong>Mensaje cifrado:</strong>
                <span class="cifrado">${cifrado}</span>
            </p>

            <p>
                <strong>Clave:</strong>
                ${columnas} columnas
            </p>

            <h4>Tabla de la Escítala:</h4>

            ${tablaHTML}

            <h4>Proceso:</h4>

            ${proceso}

        </div>
    `;
}


// ==========================================
// DESCIFRAR
// ==========================================

function descifrar() {

    let mensaje = document.getElementById("mensaje").value;

    let columnas = parseInt(
        document.getElementById("clave").value,
        10
    );

    // ==========================================
    // COMPROBACIONES
    // ==========================================

    if (mensaje.trim() === "") {
        alert("Escribe el mensaje cifrado.");
        return;
    }

    if (isNaN(columnas) || columnas <= 0) {
        alert("Introduce una clave válida mayor que 0.");
        return;
    }

    // Quitar espacios
    mensaje = mensaje.replace(/\s/g, "");

    // Si la clave es mayor que el mensaje
    if (columnas > mensaje.length) {
        alert(
            "La clave no puede ser mayor que la cantidad de caracteres del mensaje."
        );
        return;
    }

    // ==========================================
    // CALCULAR FILAS
    // ==========================================

    const filas = Math.ceil(mensaje.length / columnas);

    // Cantidad de caracteres de la última fila
    const resto = mensaje.length % columnas;

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
    // CALCULAR CUÁNTOS CARACTERES TIENE
    // CADA COLUMNA
    // ==========================================

    let caracteresPorColumna = [];

    for (let columna = 0; columna < columnas; columna++) {

        if (resto === 0) {

            // Todas las columnas tienen la misma cantidad
            caracteresPorColumna[columna] = filas;

        } else if (columna < resto) {

            // Las primeras columnas tienen una letra extra
            caracteresPorColumna[columna] = filas;

        } else {

            // Las demás tienen una letra menos
            caracteresPorColumna[columna] = filas - 1;
        }
    }

    // ==========================================
    // COLOCAR EL CIFRADO EN LA TABLA
    // COLUMNA POR COLUMNA
    // ==========================================

    let indice = 0;

    for (let columna = 0; columna < columnas; columna++) {

        const cantidad =
            caracteresPorColumna[columna];

        for (let fila = 0; fila < cantidad; fila++) {

            tabla[fila][columna] = mensaje[indice];

            indice++;
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

    let tablaHTML = `
        <table class="tabla-escitala">
            <tbody>
    `;

    for (let fila = 0; fila < filas; fila++) {

        tablaHTML += "<tr>";

        for (let columna = 0; columna < columnas; columna++) {

            tablaHTML += `
                <td>
                    ${tabla[fila][columna]}
                </td>
            `;
        }

        tablaHTML += "</tr>";
    }

    tablaHTML += `
            </tbody>
        </table>
    `;

    // ==========================================
    // MOSTRAR RESULTADO
    // ==========================================

    document.getElementById("resultado").innerHTML = `

        <div class="resultado-caja">

            <h3>Resultado del descifrado</h3>

            <p>
                <strong>Mensaje original:</strong>
                <span class="descifrado">${descifrado}</span>
            </p>

            <p>
                <strong>Clave:</strong>
                ${columnas} columnas
            </p>

            <h4>Tabla reconstruida:</h4>

            ${tablaHTML}

            <h4>Proceso:</h4>

            <p>
                El mensaje cifrado se colocó nuevamente
                por columnas y después se leyó por filas.
            </p>

        </div>
    `;
}


// ==========================================
// CONECTAR LOS BOTONES
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    document
        .getElementById("btnCifrar")
        .addEventListener("click", cifrar);

    document
        .getElementById("btnDescifrar")
        .addEventListener("click", descifrar);

});



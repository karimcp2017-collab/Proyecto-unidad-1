function descifrar() {
    let mensaje = document.getElementById("mensaje").value;
    let columnas = parseInt(document.getElementById("clave").value, 10);

    if (mensaje.trim() === "") {
        alert("Escribe el mensaje cifrado.");
        return;
    }

    if (isNaN(columnas) || columnas <= 0) {
        alert("Introduce una clave válida mayor que 0.");
        return;
    }

    mensaje = mensaje.replace(/\s/g, "");

    if (columnas > mensaje.length) {
        alert("La clave no puede ser mayor que la cantidad de caracteres del mensaje.");
        return;
    }

    const filas = Math.ceil(mensaje.length / columnas);

    // 1. Crear matriz marcando las posiciones válidas exactamente como en el cifrado
    let tabla = [];
    let contador = 0;

    for (let fila = 0; fila < filas; fila++) {
        tabla[fila] = [];
        for (let columna = 0; columna < columnas; columna++) {
            if (contador < mensaje.length) {
                tabla[fila][columna] = "?"; // Marca de posición válida
                contador++;
            } else {
                tabla[fila][columna] = null; // Posición vacía
            }
        }
    }

    // 2. Colocar el mensaje cifrado leyendo por COLUMNAS (solo en posiciones válidas)
    let indice = 0;
    for (let columna = 0; columna < columnas; columna++) {
        for (let fila = 0; fila < filas; fila++) {
            if (tabla[fila][columna] === "?") {
                tabla[fila][columna] = mensaje[indice];
                indice++;
            }
        }
    }

    // 3. Leer la tabla por FILAS para recuperar el mensaje original
    let descifrado = "";
    for (let fila = 0; fila < filas; fila++) {
        for (let columna = 0; columna < columnas; columna++) {
            if (tabla[fila][columna] !== null) {
                descifrado += tabla[fila][columna];
            }
        }
    }

    // 4. Crear tabla HTML
    let tablaHTML = `<table class="tabla-escitala"><tbody>`;
    for (let fila = 0; fila < filas; fila++) {
        tablaHTML += "<tr>";
        for (let columna = 0; columna < columnas; columna++) {
            tablaHTML += `<td>${tabla[fila][columna] !== null ? tabla[fila][columna] : ""}</td>`;
        }
        tablaHTML += "</tr>";
    }
    tablaHTML += `</tbody></table>`;

    // 5. Mostrar Resultado
    document.getElementById("resultado").innerHTML = `
        <div class="resultado-caja">
            <h3>Resultado del descifrado</h3>
            <p><strong>Mensaje original:</strong> <span class="descifrado">${descifrado}</span></p>
            <p><strong>Clave:</strong> ${columnas} columnas</p>
            <h4>Tabla reconstruida:</h4>
            ${tablaHTML}
            <h4>Proceso:</h4>
            <p>El mensaje cifrado se reubicó en la estructura por columnas y se leyó por filas.</p>
        </div>
    `;
}


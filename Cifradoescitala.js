// ==========================================
// CIFRAR
// ==========================================
function cifrar() {
    let mensaje = document.getElementById("mensaje").value;
    let columnas = parseInt(document.getElementById("clave").value, 10);

    if (mensaje.trim() === "") {
        alert("Escribe un mensaje.");
        return;
    }

    if (isNaN(columnas) || columnas <= 0) {
        alert("Introduce una clave válida mayor que 0.");
        return;
    }

    mensaje = mensaje.replace(/\s/g, "");
    const filas = Math.ceil(mensaje.length / columnas);

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

    let cifrado = "";
    for (let columna = 0; columna < columnas; columna++) {
        for (let fila = 0; fila < filas; fila++) {
            if (tabla[fila][columna] !== "") {
                cifrado += tabla[fila][columna];
            }
        }
    }

    let tablaHTML = `<table class="tabla-escitala"><tbody>`;
    for (let fila = 0; fila < filas; fila++) {
        tablaHTML += "<tr>";
        for (let columna = 0; columna < columnas; columna++) {
            tablaHTML += `<td>${tabla[fila][columna]}</td>`;
        }
        tablaHTML += "</tr>";
    }
    tablaHTML += `</tbody></table>`;

    let proceso = "";
    for (let columna = 0; columna < columnas; columna++) {
        let textoColumna = "";
        for (let fila = 0; fila < filas; fila++) {
            if (tabla[fila][columna] !== "") {
                textoColumna += tabla[fila][columna];
            }
        }
        proceso += `Columna ${columna + 1}: ${textoColumna}<br>`;
    }

    document.getElementById("resultado").innerHTML = `
        <div class="resultado-caja">
            <h3>Resultado del cifrado</h3>
            <p><strong>Mensaje cifrado:</strong> <span class="cifrado">${cifrado}</span></p>
            <p><strong>Clave:</strong> ${columnas} columnas</p>
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

    let tabla = [];
    let contador = 0;

    for (let fila = 0; fila < filas; fila++) {
        tabla[fila] = [];
        for (let columna = 0; columna < columnas; columna++) {
            if (contador < mensaje.length) {
                tabla[fila][columna] = "?";
                contador++;
            } else {
                tabla[fila][columna] = null;
            }
        }
    }

    let indice = 0;
    for (let columna = 0; columna < columnas; columna++) {
        for (let fila = 0; fila < filas; fila++) {
            if (tabla[fila][columna] === "?") {
                tabla[fila][columna] = mensaje[indice];
                indice++;
            }
        }
    }

    let descifrado = "";
    for (let fila = 0; fila < filas; fila++) {
        for (let columna = 0; columna < columnas; columna++) {
            if (tabla[fila][columna] !== null) {
                descifrado += tabla[fila][columna];
            }
        }
    }

    let tablaHTML = `<table class="tabla-escitala"><tbody>`;
    for (let fila = 0; fila < filas; fila++) {
        tablaHTML += "<tr>";
        for (let columna = 0; columna < columnas; columna++) {
            tablaHTML += `<td>${tabla[fila][columna] !== null ? tabla[fila][columna] : ""}</td>`;
        }
        tablaHTML += "</tr>";
    }
    tablaHTML += `</tbody></table>`;

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

// ==========================================
// CONECTAR LOS BOTONES
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    let btnCifrar = document.getElementById("btnCifrar");
    let btnDescifrar = document.getElementById("btnDescifrar");

    if (btnCifrar) btnCifrar.addEventListener("click", cifrar);
    if (btnDescifrar) btnDescifrar.addEventListener("click", descifrar);
});

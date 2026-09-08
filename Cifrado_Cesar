// Requerimos el módulo nativo 'readline' de Node.js para leer datos ingresados por el usuario en la terminal
const readline = require('readline');

// Creamos la interfaz de lectura/escritura asociada a la entrada y salida estándar de la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Definición de los alfabetos extendidos en español (27 caracteres, incluyendo la Ñ)
const alfabetoMay = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const alfabetoMin = "abcdefghijklmnñopqrstuvwxyz";

/**
 * Función para cifrar un texto usando el Cifrado César
 * @param {string} texto - El texto original a cifrar
 * @param {number} desplazamiento - El número de posiciones a desplazar (clave)
 * @returns {string} - El texto cifrado resultante
 */
function cifrarTexto(texto, desplazamiento) {
    let salida = "";
    
    // Normalizamos el desplazamiento en Módulo 27 para manejar valores negativos o mayores a 27
    desplazamiento = ((desplazamiento % 27) + 27) % 27;

    // Recorremos cada carácter del texto de entrada
    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];
        let encontrada = false;

        // 1. Verificamos si el carácter es una letra mayúscula
        let posMay = alfabetoMay.indexOf(caracter);
        if (posMay !== -1) {
            // Aplicamos la fórmula matemática: (pos + desplazamiento) mod 27
            salida += alfabetoMay[(posMay + desplazamiento) % 27];
            encontrada = true;
        }

        // 2. Si no fue mayúscula, verificamos si es una letra minúscula
        if (!encontrada) {
            let posMin = alfabetoMin.indexOf(caracter);
            if (posMin !== -1) {
                salida += alfabetoMin[(posMin + desplazamiento) % 27];
                encontrada = true;
            }
        }

        // 3. Si no es letra (espacios, números, signos), se conserva intacto
        if (!encontrada) {
            salida += caracter;
        }
    }
    return salida;
}

/**
 * Función para descifrar un texto previamente cifrado con Cifrado César
 * @param {string} texto - El texto cifrado
 * @param {number} desplazamiento - La clave utilizada para el cifrado
 * @returns {string} - El texto descifrado original
 */
function descifrarTexto(texto, desplazamiento) {
    let salida = "";
    
    // Normalizamos el desplazamiento
    desplazamiento = ((desplazamiento % 27) + 27) % 27;

    // Recorremos cada carácter del texto cifrado
    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];
        let encontrada = false;

        // 1. Verificamos si es letra mayúscula
        let posMay = alfabetoMay.indexOf(caracter);
        if (posMay !== -1) {
            // Aplicamos la fórmula inversa sumando 27 para evitar índices negativos
            salida += alfabetoMay[(posMay - desplazamiento + 27) % 27];
            encontrada = true;
        }

        // 2. Verificamos si es letra minúscula
        if (!encontrada) {
            let posMin = alfabetoMin.indexOf(caracter);
            if (posMin !== -1) {
                salida += alfabetoMin[(posMin - desplazamiento + 27) % 27];
                encontrada = true;
            }
        }

        // 3. Conservamos caracteres especiales, espacios y puntuación
        if (!encontrada) {
            salida += caracter;
        }
    }
    return salida;
}

// --- MENÚ DE INTERACCIÓN EN TERMINAL ---

// Mostramos las opciones disponibles al usuario
console.log("Elija una opcion:");
console.log("1. Cifrar texto");
console.log("2. Descifrar texto");

// Pregunta 1: Opción del menú
rl.question("> ", (opcion) => {
    // Pregunta 2: Cadena de texto a procesar
    rl.question("Ingrese el texto: ", (texto) => {
        // Pregunta 3: Desplazamiento/clave
        rl.question("Ingrese el desplazamiento (numero entero): ", (desplazamientoStr) => {
            // Convertimos la entrada de texto a un número entero
            const desplazamiento = parseInt(desplazamientoStr, 10);

            // Evaluamos la opción elegida por el usuario
            if (opcion === '1') {
                const resultado = cifrarTexto(texto, desplazamiento);
                console.log("Texto cifrado:", resultado);
            } else if (opcion === '2') {
                const resultado = descifrarTexto(texto, desplazamiento);
                console.log("Texto descifrado:", resultado);
            } else {
                console.log("Opcion invalida.");
            }

            // Cerramos la interfaz de readline para finalizar la ejecución del proceso
            rl.close();
        });
    });
});

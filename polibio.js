const polibioGrid = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'K'],
    ['L', 'M', 'N', 'O', 'P'],
    ['Q', 'R', 'S', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z']
];

function cifrar() {
    let input = document.getElementById("texto").value.toUpperCase();
    input = input.replace(/J/g, "I").normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
                 
    let resultado = "";

    for (let char of input) {
        if (char === " ") {
            resultado += " ";
            continue;
        }

        let encontrado = false;
        for (let fila = 0; fila < 5; fila++) {
            for (let col = 0; col < 5; col++) {
                if (polibioGrid[fila][col] === char) {
                    resultado += `${fila + 1}${col + 1} `;
                    encontrado = true;
                    break;
                }
            }
            if (encontrado) break;
        }
        
        if (!encontrado) {
            resultado += char + " ";
        }
    }

    document.getElementById("resultado").innerText = "Resultado: " + resultado.trim();
}

function descifrar() {
    let input = document.getElementById("texto").value.trim();
    let palabras = input.split("  "); 
    let resultadoFinal = [];

    for (let palabra of palabras) {
        let pares = palabra.split(" ");
        let palabraDescifrada = "";

        for (let par of pares) {
            if (par.length === 2 && !isNaN(par)) {
                let fila = parseInt(par[0]) - 1;
                let col = parseInt(par[1]) - 1;

                if (fila >= 0 && fila < 5 && col >= 0 && col < 5) {
                    palabraDescifrada += polibioGrid[fila][col];
                } else {
                    palabraDescifrada += par;
                }
            } else {
                palabraDescifrada += par;
            }
        }
        resultadoFinal.push(palabraDescifrada);
    }

    document.getElementById("resultado").innerText = "Resultado: " + resultadoFinal.join(" ");
}

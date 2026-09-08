// Definición de los alfabetos extendidos en español (27 caracteres, incluyendo la Ñ)
const alfabetoMay = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const alfabetoMin = "abcdefghijklmnñopqrstuvwxyz";

function cifrar() {
  let mensaje = document.getElementById("mensaje").value;
  let desplazamiento = parseInt(document.getElementById("clave").value, 10);
  let resultado = "";
  let pasos = "";

  // Normalizamos el desplazamiento
  desplazamiento = ((desplazamiento % 27) + 27) % 27;

  for (let i = 0; i < mensaje.length; i++) {
    let caracter = mensaje[i];
    let posMay = alfabetoMay.indexOf(caracter);
    let posMin = alfabetoMin.indexOf(caracter);

    if (posMay !== -1) {
      let posCifrado = (posMay + desplazamiento) % 27;
      let letraCifrada = alfabetoMay[posCifrado];
      resultado += letraCifrada;
      pasos += `Letra ${caracter} (${posMay}) + Desplazamiento ${desplazamiento} = ${letraCifrada} (${posCifrado})<br>`;
    } else if (posMin !== -1) {
      let posCifrado = (posMin + desplazamiento) % 27;
      let letraCifrada = alfabetoMin[posCifrado];
      resultado += letraCifrada;
      pasos += `Letra ${caracter} (${posMin}) + Desplazamiento ${desplazamiento} = ${letraCifrada} (${posCifrado})<br>`;
    } else {
      resultado += caracter;
      pasos += `Carácter especial "${caracter}" se mantiene igual<br>`;
    }
  }

  document.getElementById("resultado").innerHTML =
    "<b>Cifrado:</b> " + resultado + "<br><br><b>Proceso:</b><br>" + pasos;
}

function descifrar() {
  let mensaje = document.getElementById("mensaje").value;
  let desplazamiento = parseInt(document.getElementById("clave").value, 10);
  let resultado = "";
  let pasos = "";

  // Normalizamos el desplazamiento
  desplazamiento = ((desplazamiento % 27) + 27) % 27;

  for (let i = 0; i < mensaje.length; i++) {
    let caracter = mensaje[i];
    let posMay = alfabetoMay.indexOf(caracter);
    let posMin = alfabetoMin.indexOf(caracter);

    if (posMay !== -1) {
      let posDescifrado = (posMay - desplazamiento + 27) % 27;
      let letraDescifrada = alfabetoMay[posDescifrado];
      resultado += letraDescifrada;
      pasos += `Letra ${caracter} (${posMay}) - Desplazamiento ${desplazamiento} = ${letraDescifrada} (${posDescifrado})<br>`;
    } else if (posMin !== -1) {
      let posDescifrado = (posMin - desplazamiento + 27) % 27;
      let letraDescifrada = alfabetoMin[posDescifrado];
      resultado += letraDescifrada;
      pasos += `Letra ${caracter} (${posMin}) - Desplazamiento ${desplazamiento} = ${letraDescifrada} (${posDescifrado})<br>`;
    } else {
      resultado += caracter;
      pasos += `Carácter especial "${caracter}" se mantiene igual<br>`;
    }
  }

  document.getElementById("resultado").innerHTML =
    "<b>Descifrado:</b> " + resultado + "<br><br><b>Proceso:</b><br>" + pasos;
}

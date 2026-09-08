const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function cifrar() {
  let mensaje = document.getElementById("mensaje").value.toUpperCase().replace(/\s+/g, "");
  let clave = document.getElementById("clave").value.toUpperCase();
  let resultado = "";
  let pasos = "";

  for (let i = 0; i < mensaje.length; i++) {
    let posMensaje = alfabeto.indexOf(mensaje[i]);
    let posClave = alfabeto.indexOf(clave[i % clave.length]);
    let posCifrado = (posMensaje + posClave) % alfabeto.length;
    let letraCifrada = alfabeto[posCifrado];
    resultado += letraCifrada;

    // Aquí se muestra el proceso paso a paso
    pasos += `Letra ${mensaje[i]} (${posMensaje}) + Clave ${clave[i % clave.length]} (${posClave}) = ${letraCifrada} (${posCifrado})<br>`;
  }

  document.getElementById("resultado").innerHTML = "<b>Cifrado:</b> " + resultado + "<br><br><b>Proceso:</b><br>" + pasos;
}

function descifrar() {
  let mensaje = document.getElementById("mensaje").value.toUpperCase().replace(/\s+/g, "");
  let clave = document.getElementById("clave").value.toUpperCase();
  let resultado = "";
  let pasos = "";

  for (let i = 0; i < mensaje.length; i++) {
    let posCifrado = alfabeto.indexOf(mensaje[i]);
    let posClave = alfabeto.indexOf(clave[i % clave.length]);
    let posDescifrado = (posCifrado - posClave + alfabeto.length) % alfabeto.length;
    let letraDescifrada = alfabeto[posDescifrado];
    resultado += letraDescifrada;

    // Aquí se muestra el proceso paso a paso
    pasos += `Letra ${mensaje[i]} (${posCifrado}) - Clave ${clave[i % clave.length]} (${posClave}) = ${letraDescifrada} (${posDescifrado})<br>`;
  }

  document.getElementById("resultado").innerHTML = "<b>Descifrado:</b> " + resultado + "<br><br><b>Proceso:</b><br>" + pasos;
}

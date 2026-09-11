const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

function cifrar() {
  let mensaje = document.getElementById("mensaje").value.toUpperCase();
  let clave = document.getElementById("clave").value.toUpperCase();

  if (clave.length === 0) {
    document.getElementById("resultado").innerText = "⚠️ Ingresa una clave válida.";
    return;
  }

  let resultado = "";
  let j = 0;

  for (let i = 0; i < mensaje.length; i++) {
    let letra = mensaje[i];
    if (alfabeto.includes(letra)) {
      let posMensaje = alfabeto.indexOf(letra);
      let posClave = alfabeto.indexOf(clave[j % clave.length]);
      if (posClave === -1) {
        document.getElementById("resultado").innerText = "⚠️ La clave contiene caracteres inválidos.";
        return;
      }
      let nuevaPos = (posMensaje + posClave) % alfabeto.length;
      resultado += alfabeto[nuevaPos];
      j++;
    } else {
      resultado += letra;
    }
  }
  document.getElementById("resultado").innerText = "🔒 Texto cifrado: " + resultado;
}

function descifrar() {
  let mensaje = document.getElementById("mensaje").value.toUpperCase();
  let clave = document.getElementById("clave").value.toUpperCase();

  if (clave.length === 0) {
    document.getElementById("resultado").innerText = "⚠️ Ingresa una clave válida.";
    return;
  }

  let resultado = "";
  let j = 0;

  for (let i = 0; i < mensaje.length; i++) {
    let letra = mensaje[i];
    if (alfabeto.includes(letra)) {
      let posMensaje = alfabeto.indexOf(letra);
      let posClave = alfabeto.indexOf(clave[j % clave.length]);
      if (posClave === -1) {
        document.getElementById("resultado").innerText = "⚠️ La clave contiene caracteres inválidos.";
        return;
      }
      let nuevaPos = (posMensaje - posClave + alfabeto.length) % alfabeto.length;
      resultado += alfabeto[nuevaPos];
      j++;
    } else {
      resultado += letra;
    }
  }
  document.getElementById("resultado").innerText = "🔓 Texto descifrado: " + resultado;
}

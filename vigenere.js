document.addEventListener("DOMContentLoaded", () => {
  const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

  const mensajeInput = document.getElementById("mensaje");
  const claveInput = document.getElementById("clave");
  const resultado = document.getElementById("resultado");
  const btnCifrar = document.getElementById("btnCifrar");
  const btnDescifrar = document.getElementById("btnDescifrar");

  function cifrar() {
    let mensaje = mensajeInput.value.toUpperCase();
    let clave = claveInput.value.toUpperCase();

    if (clave.length === 0) {
      resultado.innerText = "⚠️ Ingresa una clave válida.";
      return;
    }

    let textoFinal = "";
    let j = 0;

    for (let i = 0; i < mensaje.length; i++) {
      let letra = mensaje[i];
      if (alfabeto.includes(letra)) {
        let posMensaje = alfabeto.indexOf(letra);
        let posClave = alfabeto.indexOf(clave[j % clave.length]);
        if (posClave === -1) {
          resultado.innerText = "⚠️ La clave contiene caracteres inválidos.";
          return;
        }
        let nuevaPos = (posMensaje + posClave) % alfabeto.length;
        textoFinal += alfabeto[nuevaPos];
        j++;
      } else {
        textoFinal += letra;
      }
    }
    resultado.innerText = "🔒 Texto cifrado: " + textoFinal;
  }

  function descifrar() {
    let mensaje = mensajeInput.value.toUpperCase();
    let clave = claveInput.value.toUpperCase();

    if (clave.length === 0) {
      resultado.innerText = "⚠️ Ingresa una clave válida.";
      return;
    }

    let textoFinal = "";
    let j = 0;

    for (let i = 0; i < mensaje.length; i++) {
      let letra = mensaje[i];
      if (alfabeto.includes(letra)) {
        let posMensaje = alfabeto.indexOf(letra);
        let posClave = alfabeto.indexOf(clave[j % clave.length]);
        if (posClave === -1) {
          resultado.innerText = "⚠️ La clave contiene caracteres inválidos.";
          return;
        }
        let nuevaPos = (posMensaje - posClave + alfabeto.length) % alfabeto.length;
        textoFinal += alfabeto[nuevaPos];
        j++;
      } else {
        textoFinal += letra;
      }
    }
    resultado.innerText = "🔓 Texto descifrado: " + textoFinal;
  }

  // Asignar eventos a los botones
  btnCifrar.addEventListener("click", cifrar);
  btnDescifrar.addEventListener("click", descifrar);
});

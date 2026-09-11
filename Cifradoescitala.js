function cifrar() {
  let mensaje = document.getElementById("mensaje").value;
  let ancho = parseInt(document.getElementById("clave").value, 10);
  let resultado = "";
  let pasos = "";

  if (!mensaje || isNaN(ancho) || ancho < 1) {
    document.getElementById("resultado").innerHTML =
      "<b>Error:</b> Ingresa un mensaje y una clave válida.";
    return;
  }

  // Agregar espacios hasta que sea divisible entre el ancho
  while (mensaje.length % ancho !== 0) {
    mensaje += " ";
  }

  let filas = mensaje.length / ancho;
  let matriz = [];

  // Llenar la matriz por filas
  for (let i = 0; i < filas; i++) {
    matriz[i] = [];

    for (let j = 0; j < ancho; j++) {
      matriz[i][j] = mensaje.charAt(i * ancho + j);
    }
  }

  // Leer la matriz por columnas
  for (let col = 0; col < ancho; col++) {
    pasos += `Columna ${col + 1}: `;

    for (let fila = 0; fila < filas; fila++) {
      resultado += matriz[fila][col];
      pasos += matriz[fila][col] === " "
        ? "□"
        : matriz[fila][col];
    }

    pasos += "<br>";
  }

  // Mostrar resultado
  document.getElementById("resultado").innerHTML =
    "<b>Cifrado:</b> " + resultado +
    "<br><br><b>Matriz:</b><br>" +
    matriz.map(fila => fila.join(" | ")).join("<br>") +
    "<br><br><b>Lectura por columnas:</b><br>" +
    pasos;
}


function descifrar() {
  let mensaje = document.getElementById("mensaje").value;
  let ancho = parseInt(document.getElementById("clave").value, 10);
  let resultado = "";
  let pasos = "";

  if (!mensaje || isNaN(ancho) || ancho < 1) {
    document.getElementById("resultado").innerHTML =
      "<b>Error:</b> Ingresa un mensaje y una clave válida.";
    return;
  }

  if (mensaje.length % ancho !== 0) {
    document.getElementById("resultado").innerHTML =
      "<b>Error:</b> El mensaje cifrado no es válido para esa clave.";
    return;
  }

  let filas = mensaje.length / ancho;
  let matriz = [];
  let index = 0;

  // Crear matriz vacía
  for (let i = 0; i < filas; i++) {
    matriz[i] = [];
  }

  // Llenar la matriz por columnas
  for (let col = 0; col < ancho; col++) {
    pasos += `Columna ${col + 1}: `;

    for (let fila = 0; fila < filas; fila++) {
      matriz[fila][col] = mensaje.charAt(index);
      pasos += matriz[fila][col];
      index++;
    }

    pasos += "<br>";
  }

  // Leer la matriz por filas
  for (let fila = 0; fila < filas; fila++) {
    for (let col = 0; col < ancho; col++) {
      resultado += matriz[fila][col];
    }
  }

  resultado = resultado.trim();

  document.getElementById("resultado").innerHTML =
    "<b>Descifrado:</b> " + resultado +
    "<br><br><b>Matriz:</b><br>" +
    matriz.map(fila => fila.join(" | ")).join("<br>") +
    "<br><br><b>Lectura por columnas:</b><br>" +
    pasos;
}

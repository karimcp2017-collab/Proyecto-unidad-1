function cifrar() {
  let mensaje = document.getElementById("mensaje").value;
  let columnas = parseInt(document.getElementById("clave").value, 10);
  let resultado = "";
  let pasos = "";

  // Validamos la clave
  if (isNaN(columnas) || columnas <= 0) {
    document.getElementById("resultado").innerHTML =
      "<b>Error:</b> La clave debe ser un número mayor que 0.";
    return;
  }

  // Número de filas necesarias
  let filas = Math.ceil(mensaje.length / columnas);

  // Crear matriz
  let matriz = [];

  for (let i = 0; i < filas; i++) {
    matriz[i] = [];

    for (let j = 0; j < columnas; j++) {
      let indice = i * columnas + j;

      if (indice < mensaje.length) {
        matriz[i][j] = mensaje[indice];
      } else {
        matriz[i][j] = "";
      }
    }
  }

  pasos += `<b>Clave:</b> ${columnas} columnas<br>`;
  pasos += `<b>Filas:</b> ${filas}<br><br>`;

  pasos += "<b>1. Escritura en la escítala:</b><br>";

  // Mostrar cómo se escribe el mensaje
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (matriz[i][j] !== "") {
        pasos += matriz[i][j] + " ";
      }
    }
    pasos += "<br>";
  }

  pasos += "<br><b>2. Lectura por columnas:</b><br>";

  // Leer por columnas
  for (let j = 0; j < columnas; j++) {
    for (let i = 0; i < filas; i++) {
      if (matriz[i][j] !== "") {
        resultado += matriz[i][j];

        pasos += `Se toma "${matriz[i][j]}" de fila ${i + 1}, columna ${j + 1}<br>`;
      }
    }
  }

  document.getElementById("resultado").innerHTML =
    "<b>Cifrado Escítala:</b> " +
    resultado +
    "<br><br><b>Proceso:</b><br>" +
    pasos;
}


function descifrar() {
  let mensaje = document.getElementById("mensaje").value;
  let columnas = parseInt(document.getElementById("clave").value, 10);
  let resultado = "";
  let pasos = "";

  // Validamos la clave
  if (isNaN(columnas) || columnas <= 0) {
    document.getElementById("resultado").innerHTML =
      "<b>Error:</b> La clave debe ser un número mayor que 0.";
    return;
  }

  // Número de filas necesarias
  let filas = Math.ceil(mensaje.length / columnas);

  // Número de caracteres que sobran en la última fila
  let resto = mensaje.length % columnas;

  // Crear matriz vacía
  let matriz = [];

  for (let i = 0; i < filas; i++) {
    matriz[i] = [];

    for (let j = 0; j < columnas; j++) {
      matriz[i][j] = "";
    }
  }

  pasos += `<b>Clave:</b> ${columnas} columnas<br>`;
  pasos += `<b>Filas:</b> ${filas}<br><br>`;

  pasos += "<b>1. Colocación del texto cifrado por columnas:</b><br>";

  let indice = 0;

  // Rellenamos la matriz por columnas
  for (let j = 0; j < columnas; j++) {

    // Determinamos cuántos caracteres tiene esta columna
    let cantidadFilas;

    if (resto === 0) {
      cantidadFilas = filas;
    } else {
      cantidadFilas = (j < resto) ? filas : filas - 1;
    }

    for (let i = 0; i < cantidadFilas; i++) {

      if (indice < mensaje.length) {
        matriz[i][j] = mensaje[indice];

        pasos +=
          `Se coloca "${mensaje[indice]}" en fila ${i + 1}, columna ${j + 1}<br>`;

        indice++;
      }
    }
  }

  pasos += "<br><b>2. Lectura por filas:</b><br>";

  // Leer la matriz por filas
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {

      if (matriz[i][j] !== "") {
        resultado += matriz[i][j];

        pasos +=
          `Se recupera "${matriz[i][j]}" de fila ${i + 1}, columna ${j + 1}<br>`;
      }
    }
  }

  document.getElementById("resultado").innerHTML =
    "<b>Descifrado Escítala:</b> " +
    resultado +
    "<br><br><b>Proceso:</b><br>" +
    pasos;
}

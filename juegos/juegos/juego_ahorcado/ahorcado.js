let palabras_mapa_politico;
let palabras_bandera_colombia;
let palabras_parques_nacionales;
let palabras_hidrografia_colombia;
let palabras_etnias_de_colombia;
let palabras_relieve_de_colombia;
let palabras_clima_de_colombia;

function cargarPalabras() {
  $.getJSON("pistas.json", function (data) {
    palabras_mapa_politico = data.mapa_politico;
    palabras_bandera_colombia = data.etapas_bandera_colombia;
    palabras_parques_nacionales = data.parques_nacionales;
    palabras_hidrografia_colombia = data.hidrografia_de_colombia;
    palabras_etnias_de_colombia = data.etnias_de_colombia;
    palabras_relieve_de_colombia = data.relieve_de_colombia;
    palabras_clima_de_colombia = data.clima_de_colombia;
  });
}

var palabras = [];
// Palabra a averiguar
var palabra = "";
// Nº aleatorio
var rand;
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;
// Botones de letras
var buttons = document.getElementsByClassName('letra');

const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U', 'Ü': 'U' };

var numero_palabra = 1;

// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
  rand = numero_palabra - 1;

  palabra = palabras[rand][0].toUpperCase();
  palabra = palabra.split('').map(letra => acentos[letra] || letra).join('').toString();
  console.log(palabra);
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  oculta = [];
  hueco.innerText = "";
  var palabra_array = palabra.split("");
  for (var i = 0; i < num; i++) {
    if (palabra_array[i] != " ") {
      oculta[i] = "_";
    } else {
      oculta[i] = " ";
    }
  }
  hueco.innerText = oculta.join("");
}

//Generar abecedario
function generaABC(a, z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for (i; i <= j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='" + letra + "'>" + letra + "</button>";
    if (i == 110) {
      document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='Ñ'>Ñ</button>";
    }
  }

  for (k = 0; k <= 9; k++) {
    document.getElementById("abcdario").innerHTML += "<button value='" + k + "' onclick='intento(\"" + k + "\")' class='letra' id='" + k + "'>" + k + "</button>";
  }
}

// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;

  var ruta_audio = '';
  if (palabra.indexOf(letra) != -1) {
    ruta_audio = '../sounds/ok.mp3';
    for (var i = 0; i < palabra.length; i++) {
      if (palabra[i] == letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = "Bien!";
    document.getElementById("acierto").className += "acierto verde";
  } else {
    ruta_audio = '../sounds/over.mp3';
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Fallo!";
    document.getElementById("acierto").className += "acierto rojo";

    for (let index = 0; index < 7; index++) {
      document.getElementById("image" + index).style.display = "none";
    }

    for (let index = 0; index < 7; index++) {
      if (index == cont) {
        document.getElementById("image" + index).style.display = "block";
      }
    }
  }


  let audio2 = new Audio(ruta_audio);
  audio2.volume = 0.29;
  audio2.play();


  compruebaFin();
  setTimeout(function () {
    document.getElementById("acierto").className = "";
  }, 800);
}

// Obtener pista
function pista() {
  document.getElementById("pista_palabra").innerHTML = "<strong style='color: red'>Pista: </strong>" + palabras[rand][1] + "";
}

// Compruba si ha finalizado
function compruebaFin() {
  if (oculta.indexOf("_") == -1) {
    mensaje_final(1);
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    btnInicio.onclick = function () { window.location.reload(1) };
  } else if (cont == 0) {
    mensaje_final(0);
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    btnInicio.onclick = function () { window.location.reload(1) };
  }
}

let palabras_adivinadas = 0;
function mensaje_final(tipo) {
  if (tipo == 1) {
    Swal.fire({
      position: "center",
      imageUrl: "../assets/images/correcto.gif",
      imageWidth: 250,
      imageHeight: 250,
      title: "Correcto!",
      text: 'Has adivinado la palabra',
      showConfirmButton: false,
      timer: 2500,
    });
    palabras_adivinadas++;
    setTimeout(() => {
      document.getElementById("palabra").classList.remove("encuadre");
      inicio();
    }, 1500)
  } else {
    Swal.fire({
      position: "center",
      imageUrl: "../assets/images/incorrecto.gif",
      imageWidth: 250,
      imageHeight: 250,
      title: "Incorrecto!",
      text: '¡Sigue intentando!',
      showConfirmButton: false,
      timer: 2500,
    });

    setTimeout(() => {
      document.getElementById("palabra").classList.remove("encuadre");
      inicio();
    }, 2500)
  }
}

// Restablecer juego
function inicio() {
  if (numero_palabra <= 10) {
    generaPalabra();
    pintarGuiones(palabra.length);
    generaABC("a", "z");
    cont = 6;
    document.getElementById("intentos").innerHTML = cont;

    for (let index = 0; index < 7; index++) {
      if (index == 6) {
        document.getElementById("image" + index).style.display = "block";
      } else {
        document.getElementById("image" + index).style.display = "none";
      }
    }
    pista();
    document.getElementById("numero").innerText = "Palabra " + numero_palabra + " de 10"
    numero_palabra++;
  } else {
    var ruta_audio = '';
    var texto_final = "";
    if (palabras_adivinadas < 6) {
      document.getElementById("imagen_final").src = "../assets/images/derrota.gif";
      ruta_audio = '../sounds/game_over.mp3';
      texto_final = "¡Sigue intentando! <br> Has adivinado " + palabras_adivinadas + " palabras de 10";
    } else {
      document.getElementById("imagen_final").src = "../assets/images/victoria.gif";
      ruta_audio = '../sounds/victory.mp3';
      texto_final = "¡Felicidades! <br> Has adivinado " + palabras_adivinadas + " palabras de 10";
    }

    document.getElementById("texto_final").innerHTML = texto_final;
    let audio2 = new Audio(ruta_audio);

    $('#principal').fadeToggle(500);
    $('#final').css('display', 'flex');
    setTimeout(() => {
      $('#final').css('opacity', '1');
    }, 500)

    setTimeout(() => {
      guardar_resultado("Ahorcado", palabras_adivinadas, contador_juego, nivel_seleccionado, palabras_categoria.categoria);  
    }, 500)

    audio2.play();
  }
}

// Iniciar
$(document).ready(function () {
  pantalla_completa('#8a5025', '#422612').then(function (result) {
    iniciar_animacion();
  });
});

function iniciar_animacion() {
  cargarPalabras();
  setTimeout(() => {
    $('#principal').fadeToggle(1000);
    $('#fondo_blanco').fadeToggle(3000);
    setTimeout(() => {
      const divAnimado = document.querySelector('.overlay');
      divAnimado.style.animationName = 'moverDerecha';
      divAnimado.style.animationDirection = 'normal';
      divAnimado.style.display = 'block';
      setTimeout(() => {
        const divAnimado2 = document.querySelector('.nube');
        divAnimado2.style.animationName = 'moverArriba';
        divAnimado2.style.animationDirection = 'normal';
        divAnimado2.style.display = 'block';
        setTimeout(() => {
          divAnimado.style.backgroundImage = "url(../assets/images/normal2.gif)"
          maquina2("bienvenida", 'Hola, soy Genio. <br> A continuación selecciona una categoria y adivina la palabra siguiendo la pista, recuerda que tendras 6 intentos para intentar adivinarla. <br> ¡Tu Puedes!', 50, 1);
        }, 3000)
      }, 2000)
    })
  }, 200)
}

function maquina2(contenedor, texto, intervalo, n) {
  var i = 0,
    // Creamos el timer
    timer = setInterval(function () {
      if (i < texto.length) {
        // Si NO hemos llegado al final del texto..
        // Vamos añadiendo letra por letra y la _ al final.
        $("#" + contenedor).html(texto.substr(0, i++) + "_");
      } else {
        // En caso contrario..
        // Salimos del Timer y quitamos la barra baja (_)
        clearInterval(timer);
        $("#" + contenedor).html(texto);
        if (!cerrardo) {
          document.querySelector('#btnomitir').style.display = "none";
          setTimeout(() => {
            cerrar_anuncio();
          }, 3000)
        }
        // Auto invocamos la rutina n veces (0 para infinito)
        if (--n != 0) {
          setTimeout(function () {
            maquina2(contenedor, texto, intervalo, n);
          }, 3600);
        }
      }
    }, intervalo);
}

let cerrardo = false;
function cerrar_anuncio() {
  if (!cerrardo) {
    cerrardo = true;
    const divAnimado2 = document.querySelector('.nube');
    divAnimado2.style.animationName = 'moverabajo';
    const divAnimado = document.querySelector('.overlay');
    divAnimado.style.backgroundImage = "url(../assets/images/normal1.gif)";
    $('#fondo_blanco').fadeToggle(3000);
    setTimeout(function () {
      divAnimado.style.animationName = 'moverIzquierda';
      divAnimado.style.animationDirection = 'normal';
      setTimeout(() => {
        $('#principal').fadeToggle(1000);
        elegir();
      }, 2000)
    }, 2000);
  }
}


var categorias_array = [];
function cargar_categorias() {
  return $.getJSON("pistas.json", function (data) {
    categorias_array = data;
  });
}

async function elegir() {
  await cargar_categorias();
  var categorias_html = "";
  var index = 1;
  Object.keys(categorias_array).forEach(categoria => {
    categorias_html += '<div style="display: flex; justify-content: center; align-items: center;" class="col-4"><div class="imagen_Vocal" onclick="seleccionar(this, ' + index + ')"><img src="' + categorias_array[categoria].mapa + '" class="img-vocal" alt="' + categorias_array[categoria].categoria + '"> ' + categorias_array[categoria].categoria + '</div></div>';
    index++;
  });

  Swal.fire({
    title: 'Selecciona una Categoria',
    html: '<div style="padding-top: 20px"  class="row">' + categorias_html + '</div>',
    showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
    focusConfirm: false,
  });
}


var palabras_categoria = [];
function seleccionar(elemento, tipo) {
  elemento.classList.add("seleccionado");

  palabras_categoria = [];

  switch (tipo) {
    case 1:
      palabras_categoria = palabras_mapa_politico;
      break;
    case 2:
      palabras_categoria = palabras_bandera_colombia;
      break;
    case 3:
      palabras_categoria = palabras_parques_nacionales;
      break;
    case 4:
      palabras_categoria = palabras_hidrografia_colombia;
      break;
    case 5:
      palabras_categoria = palabras_etnias_de_colombia;
      break;
    case 6:
      palabras_categoria = palabras_relieve_de_colombia;
      break;
    case 7:
      palabras_categoria = palabras_clima_de_colombia;
      break;
  }

  setTimeout(() => {
    modalSeleccionarNivel();
  }, 100)
}

function modalSeleccionarNivel() {
  Swal.fire({
    title: 'Selecciona el nivel de dificultad',
    showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
    focusConfirm: false,
    html: '<div style="padding-top: 20px"  class="row">' +
      '<div class="col-1"></div>' +
      '<div class="col-5"><div class="imagen_Nivel" onclick="seleccionarNivel(this, 1)"><img src="img/nivel_1.png" class="img-nivel" alt="Nivel 1"> Principiante</div></div>' +
      '<div class="col-5"><div class="imagen_Nivel" onclick="seleccionarNivel(this, 2)"><img src="img/nivel_2.png" class="img-nivel" alt="Nivel 2"> Experto</div></div>' +
      '<div class="col-1"></div>' +
      '</div>',
  })
}

var nivel_seleccionado = "";
function seleccionarNivel(elemento, nivel) {
  elemento.classList.add("seleccionado");
  switch (nivel) {
    case 1:
      palabras = palabras_categoria.nivel_1;
      nivel_seleccionado = "Principiante";
      break;
    case 2:
      palabras = palabras_categoria.nivel_2;
      nivel_seleccionado = "Experto";
      break;
  }

  palabras = palabras.sort(() => Math.random() - 0.5);
  document.getElementById("categoria").innerText = palabras_categoria.categoria;


  let audio2 = new Audio('../sounds/fondo_pirata.mp3');
  audio2.play();
  audio2.loop = true;
  audio2.volume = 0.1;

  setTimeout(() => {
    Swal.close();
    iniciar_contador_juego();
    inicio();
  }, 100)
}

var contador_juego = 0;
var intervalo_contador_juego = null;
function iniciar_contador_juego() {
  intervalo_contador_juego = setInterval(() => {
    contador_juego++;
  }, 1000);
}

function detener_contador_juego() {
  clearInterval(intervalo_contador_juego);
}
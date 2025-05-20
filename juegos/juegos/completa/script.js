let datosJuego = null;
let categoriaActual = '';
let nivelActual = '';
let preguntasActuales = [];
let preguntaActualIndex = 0;
let puntuacion = 0;
let respuestaSeleccionada = null;
let temporizadorCambio = null;
let tiempoRestante = 2;

// Elementos del DOM
const seccionCategorias = document.getElementById('seccion-categorias');
const seccionNiveles = document.getElementById('seccion-niveles');
const seccionJuego = document.getElementById('seccion-juego');
const seccionResultados = document.getElementById('seccion-resultados');
const categoriasContainer = document.getElementById('categorias-container');
const nivelesContainer = document.getElementById('niveles-container');
const preguntaActual = document.getElementById('pregunta-actual');
const opcionesContainer = document.getElementById('opciones-container');
const puntuacionNumero = document.getElementById('puntuacion-numero');
const resultadoFinal = document.getElementById('resultado-final');
const btnSiguiente = document.getElementById('btn-siguiente');
const btnReiniciar = document.getElementById('btn-reiniciar');
const gameHeader = document.querySelector('.game-header');
const preguntaActualNumero = document.getElementById('pregunta-actual-numero');
const btnVolver = document.getElementById('btn-volver');
const btnActualizar = document.getElementById('btn-actualizar');

// Cargar los datos del juego
fetch('completa.json')
    .then(response => response.json())
    .then(data => {
        datosJuego = data;
        cargarCategorias();
    })
    .catch(error => console.error('Error cargando los datos:', error));

// Event Listeners
btnSiguiente.addEventListener('click', siguientePregunta);
btnReiniciar.addEventListener('click', reiniciarJuego);

btnVolver.addEventListener('click', () => {
    location.href = '../../index.html';
});

btnActualizar.addEventListener('click', () => {
    window.location.reload(1);
});

function cargarCategorias() {
    categoriasContainer.innerHTML = '';
    Object.keys(datosJuego).forEach(categoria => {
        var col4 = document.createElement('div');
        col4.className = 'col-4';
        var button = document.createElement('button');  
        var imagen = document.createElement('img');
        imagen.className = 'img-categoria';
        imagen.src = datosJuego[categoria].mapa;
        button.appendChild(imagen);
        button.className = 'btn-categoria';

        var p = document.createElement('p');
        p.className = 'nombre-categoria';
        p.textContent = datosJuego[categoria].nombre;
        button.appendChild(p);
        
        button.dataset.categoria = categoria;
        button.addEventListener('click', () => seleccionarCategoria(categoria));
        col4.appendChild(button);
        categoriasContainer.appendChild(col4);
    });
}

function cargarNiveles() {
    nivelesContainer.innerHTML = '';
    const niveles = ['nivel1', 'nivel2'];
    niveles.forEach(nivel => {
        var div = document.createElement('div');
        div.className = 'col-6 btn-nivel-container';
        div.style.position = 'relative';
        const button = document.createElement('button');
        var imagen = document.createElement('img');
        imagen.src = nivel === 'nivel1' ? 'images/nivel1.png' : 'images/nivel2.png';
        imagen.className = 'img-nivel';
        div.appendChild(imagen);
        button.className = 'btn-nivel';
        button.textContent = nivel === 'nivel1' ? 'Principiante' : 'Experto';
        button.dataset.nivel = nivel;
        button.addEventListener('click', () => seleccionarNivel(nivel));
        div.appendChild(button);
        nivelesContainer.appendChild(div);
    });
}

function seleccionarCategoria(categoria) {
    categoriaActual = categoria;
    seccionCategorias.classList.add('oculto');
    seccionNiveles.classList.remove('oculto');
    cargarNiveles();
}

function seleccionarNivel(nivel) {
    nivelActual = nivel;
    seccionNiveles.classList.add('oculto');
    iniciarJuego();
}

function iniciarJuego() {
    reproducir_audio_loop();
    preguntasActuales = obtenerPreguntasAleatorias();
    preguntaActualIndex = 0;
    puntuacion = 0;
    mostrarPregunta();
    seccionJuego.classList.remove('oculto');
    gameHeader.classList.remove('oculto');
    actualizarContadorPreguntas();
}

function obtenerPreguntasAleatorias() {
    const preguntasCategoria = datosJuego[categoriaActual][nivelActual];
    const preguntasAleatorias = [...preguntasCategoria]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
    return preguntasAleatorias;
}

function mostrarPregunta() {
    const pregunta = preguntasActuales[preguntaActualIndex];
    
    // Reemplazar el marcador de espacio en blanco con un contenedor arrastrable
    const textoPregunta = pregunta.oracion.replace('_div_blanco_', '<span class="espacio-arrastrable" id="espacio-respuesta"></span>');
    preguntaActual.innerHTML = textoPregunta;

    // Crear opciones
    opcionesContainer.innerHTML = '';
    
    // Generar opciones falsas basadas en otras preguntas
    const todasLasOpciones = pregunta.opciones;
    const opcionesMezcladas = mezclarOpciones(todasLasOpciones);
    
    opcionesMezcladas.forEach(opcion => {
        const divOpcion = document.createElement('div');
        divOpcion.className = 'opcion';
        divOpcion.textContent = opcion;
        divOpcion.draggable = true;
        
        divOpcion.addEventListener('dragstart', iniciarArrastre);
        opcionesContainer.appendChild(divOpcion);
    });

    // Configurar espacio arrastrable
    const espacioRespuesta = document.getElementById('espacio-respuesta');
    espacioRespuesta.addEventListener('dragover', permitirArrastrar);
    espacioRespuesta.addEventListener('drop', soltarOpcion);

    // Reiniciar estado
    btnSiguiente.disabled = true;
    puntuacionNumero.textContent = puntuacion;

    // Limpiar temporizador anterior si existe
    if (temporizadorCambio) {
        clearInterval(temporizadorCambio);
        temporizadorCambio = null;
    }
}

function mezclarOpciones(opciones) {
    return [...opciones].sort(() => Math.random() - 0.5);
}

function permitirArrastrar(e) {
    e.preventDefault();
}

function iniciarArrastre(e) {
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.target.classList.add('arrastrando');
}

function soltarOpcion(e) {
    e.preventDefault();
    const opcionArrastrada = e.dataTransfer.getData('text/plain');
    const espacioRespuesta = e.target;
    
    // Limpiar espacio anterior si existe
    if (espacioRespuesta.querySelector('.opcion-arrastrada')) {
        espacioRespuesta.innerHTML = '';
    }

    // Crear elemento arrastrado
    const elementoArrastrado = document.createElement('span');
    elementoArrastrado.className = 'opcion-arrastrada';
    elementoArrastrado.textContent = opcionArrastrada;
    espacioRespuesta.appendChild(elementoArrastrado);

    // Verificar respuesta
    verificarRespuesta(opcionArrastrada, espacioRespuesta);
}

function verificarRespuesta(respuesta, espacioRespuesta) {
    const pregunta = preguntasActuales[preguntaActualIndex];
    const esCorrecta = respuesta === pregunta.respuesta;
    
    var ruta_audio = '';
    if (esCorrecta) {
        espacioRespuesta.classList.add('correcta');
        puntuacion += 10;
        ruta_audio = '../sounds/ok.mp3';
    } else {
        espacioRespuesta.classList.add('incorrecta');
        ruta_audio = '../sounds/over.mp3';
    }

    reproducir_audio(ruta_audio);

    // Deshabilitar todas las opciones
    document.querySelectorAll('.opcion').forEach(opcion => {
        opcion.draggable = false;
        if (opcion.textContent === pregunta.respuesta) {
            opcion.classList.add('correcta');
        }
    });

    // Iniciar temporizador para cambio automático
    iniciarTemporizadorCambio();
}

function iniciarTemporizadorCambio() {
    // Limpiar temporizador anterior si existe
    if (temporizadorCambio) {
        clearInterval(temporizadorCambio);
    }

    // Crear contador visual
    const espacioRespuesta = document.getElementById('espacio-respuesta');
    const contador = document.createElement('div');
    contador.className = 'contador-cambio';
    contador.textContent = tiempoRestante;
    espacioRespuesta.appendChild(contador);

    let segundosRestantes = tiempoRestante;
    temporizadorCambio = setInterval(() => {
        segundosRestantes--;
        contador.textContent = segundosRestantes;
        
        if (segundosRestantes <= 0) {
            clearInterval(temporizadorCambio);
            siguientePregunta();
        }
    }, 1000);
}

function siguientePregunta() {
    preguntaActualIndex++;
    if (preguntaActualIndex < preguntasActuales.length) {
        mostrarPregunta();
        actualizarContadorPreguntas();
    } else {
        finalizarJuego();
    }
}

function finalizarJuego() {
    seccionJuego.classList.add('oculto');
    seccionResultados.classList.remove('oculto');
    gameHeader.classList.add('oculto');
    var ruta_audio = '';
    if (puntuacion >= 60) {
        resultadoFinal.textContent = `¡Felicidades! Has completado el juego con ${puntuacion} puntos.`;
        ruta_audio = '../sounds/victory.mp3';
    } else {
        resultadoFinal.textContent = `¡No te rindas! Has completado el juego con ${puntuacion} puntos.`;
        ruta_audio = '../sounds/game_over.mp3';
    }

    reproducir_audio(ruta_audio);
}

function reiniciarJuego() {
    seccionResultados.classList.add('oculto');
    seccionCategorias.classList.remove('oculto');
    gameHeader.classList.add('oculto');
    puntuacion = 0;
    preguntaActualIndex = 0;
}

function actualizarContadorPreguntas() {
    preguntaActualNumero.textContent = preguntaActualIndex + 1;
} 

$(document).ready(function() {
    pantalla_completa('#9f4d2a', '#250d06', '100');
});


var audio_nave = document.createElement('audio');
function reproducir_audio_loop(){
    audio_nave.pause();
    audio_nave.src = '../sounds/fondo_arrastra.mp3';
    audio_nave.loop = true;
    audio_nave.volume = 0.09;
    audio_nave.play();
}

function reproducir_audio(ruta){
    var audio = document.createElement('audio');
    audio.pause();
    audio.src = ruta;
    audio.volume = 0.29;
    audio.play();
}
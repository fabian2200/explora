var numeroPiezas;
var piezasCorrectas = 0;
var PUZZLE_IMAGE = "";

function createPuzzle(nivel, imagen) {
    PUZZLE_IMAGE = imagen;
    var PUZZLE_ROWS = nivel;
    var PUZZLE_COLS = nivel;
    numeroPiezas = PUZZLE_ROWS * PUZZLE_COLS;
    var PIECE_HEIGHT = 540 / PUZZLE_ROWS; // Altura de la pieza
    var PIECE_WIDTH = 700 / PUZZLE_COLS;  // Ancho de la pieza
    let pieces = [];
    let correctPositions = [];


    const $board = $('#puzzle-board');
    const $piecesContainer = $('#pieces-container');

    // Limpiar contenedores
    $board.empty();
    $piecesContainer.empty();
    pieces = [];
    correctPositions = [];

    // Crear el tablero
    for (let i = 0; i < PUZZLE_ROWS; i++) {
        for (let j = 0; j < PUZZLE_COLS; j++) {
            const $slot = $('<div>')
                .addClass('puzzle-slot')
                .attr('data-id', `${i}-${j}`)
                .css({
                    position: 'absolute',
                    left: j * PIECE_WIDTH + 'px',
                    top: i * PIECE_HEIGHT + 'px',
                    width: PIECE_WIDTH + 'px',
                    height: PIECE_HEIGHT + 'px',
                    border: '1px dashed rgb(126, 126, 126)'
                });
            $board.append($slot);
            correctPositions.push({ x: j, y: i });
        }
    }

    // Crear las piezas
    for (let i = 0; i < PUZZLE_ROWS; i++) {
        for (let j = 0; j < PUZZLE_COLS; j++) {
            const $piece = $('<div>')
                .addClass('puzzle-piece')
                .attr('data-correct-id', `${i}-${j}`)
                .css({
                    width: PIECE_WIDTH + 'px',
                    height: PIECE_HEIGHT + 'px',
                    backgroundImage: `url(${PUZZLE_IMAGE})`,
                    backgroundPosition: `-${j * PIECE_WIDTH}px -${i * PIECE_HEIGHT}px`,
                    left: Math.random() * ($piecesContainer.width() - PIECE_WIDTH) + 'px',
                    top: Math.random() * ($piecesContainer.height() - PIECE_HEIGHT) + 'px',
                    zIndex: 1
                })
                .data('correctX', j)
                .data('correctY', i)
                .data('initialLeft', Math.random() * ($piecesContainer.width() - PIECE_WIDTH))
                .data('initialTop', Math.random() * ($piecesContainer.height() - PIECE_HEIGHT));

            pieces.push($piece);
            $piecesContainer.append($piece);
        }
    }

    // Hacer las piezas arrastrables
    $('.puzzle-piece').draggable({
        containment: 'window',
        revert: false,
    });

    // Hacer el tablero receptivo
    $('.puzzle-slot').droppable({
        accept: '.puzzle-piece',
        drop: function (event, ui) {
            const $piece = ui.draggable;
            const $slot = $(this);
            const slotId = $slot.attr('data-id');
            const pieceCorrectId = $piece.attr('data-correct-id');

            if (slotId === pieceCorrectId) {
                $piece.appendTo('#puzzle-board');
                $piece.css({
                    position: 'absolute',
                    left: $slot.css('left'),
                    top: $slot.css('top')
                });
                piezasCorrectas++;
                checkPuzzle();
            } else {
                // Obtener la posición inicial de la pieza
                const initialLeft = $piece.data('initialLeft');
                const initialTop = $piece.data('initialTop');

                // Animar el retorno a la posición inicial
                $piece.animate({
                    left: initialLeft + 'px',
                    top: initialTop + 'px'
                }, 500, 'easeOutBounce');
            }
        }
    });
    iniciarTiempo();
}

function checkPuzzle() {
    if (piezasCorrectas === numeroPiezas) {
        terminar_juego();
        reproducir_audio('../sounds/victory.mp3');

        setTimeout(function () {
            Swal.fire({
                allowOutsideClick: false,
                title: '¡Felicidades!',
                text: 'Felicidades, has completado el rompecabezas en ' + $('#tiempo').text() + ' minutos.',
                icon: 'success',
                confirmButtonText: 'Volver a Jugar',
                confirmButtonColor: '#34230d',
                cancelButtonText: 'Salir',
                showCancelButton: true,
                cancelButtonColor: '#5a391f',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload(1);
                } else {
                    window.location.href = '../../index.html';
                }
            });
        }, 500)
    }
}

var ayuda_mostrada = 1;

$('#btn_ayuda').click(function () {
    if (ayuda_mostrada <= 3) {
        $('#puzzle-board').css('background-image', 'url(' + PUZZLE_IMAGE + ')');
        setTimeout(function () {
            $('#puzzle-board').css('background-image', 'none');
        }, 500);
        ayuda_mostrada++;
    } else {
        alert('No puedes mostrar la ayuda mas de 3 veces');
    }
});


$('#btn_reiniciar').click(function () {
    window.location.reload(1);
});

var intervalo;
var tiempo = 0;
function iniciarTiempo() {
    intervalo = setInterval(function () {
        tiempo++;
        var tiempoFormateado = formatTime(tiempo);
        $('#tiempo').text(tiempoFormateado);
    }, 1000);
}

function formatTime(tiempo) {
    var minutos = Math.floor(tiempo / 60);
    var segundos = tiempo % 60;
    if (segundos < 10) {
        segundos = '0' + segundos;
    }
    if (minutos < 10) {
        minutos = '0' + minutos;
    }
    return minutos + ':' + segundos;
}

pantalla_completa('#8a5025', '#422612').then(function (result) {
    elegir();
});

var categorias = [];

function cargar_categorias() {
    return new Promise((resolve, reject) => {
        $.getJSON("categorias.json", function (data) {
            resolve(data);
        }).fail(function (jqXHR, textStatus, error) {
            reject(error);
        });
    });
}

async function elegir() {
    categorias = await cargar_categorias();

    var categorias_html = "";

    Object.keys(categorias).forEach(key => {
        categorias_html += '<div style="margin-bottom: 10px;" onclick="seleccionar(\'' + key + '\')"  class="col-6"><div class="contenedor_categoria"><img class="imagen_categoria" src="' + categorias[key].mapa + '" alt=""> <p class="nombre_categoria" style="margin: 0px;">' + categorias[key].nombre + '</p> </div></div>';
    });

    $('#categorias').html(categorias_html);

    $('#myModal2').modal('show');
}


var tipo_de_juego = null;
var categoria_seleccionada_nombre = null;
function seleccionar(tipo) {
    tipo_de_juego = tipo;
    $('#myModal2').modal('hide');

    setTimeout(function () {
        $('#myModal').modal('show');
    }, 200);
}

var seleccion_nivel = "";
function seleccionar_nivel(nivel) {

    $('#myModal').modal('hide');

    if (nivel == 4) {
        seleccion_nivel = "Principiante";
    } else if (nivel == 6) {
        seleccion_nivel = "Intermedio";
    } else if (nivel == 8) {
        seleccion_nivel = "Experto";
    }

    var categoria_seleccionada = categorias[tipo_de_juego];
    categoria_seleccionada_nombre = categoria_seleccionada.nombre;
    var imagenes_al_azar = Math.floor(Math.random() * (categoria_seleccionada.imagenes - 1 + 1) + 1);
    var imagen_al_azar = categoria_seleccionada.id + "/" + imagenes_al_azar + ".png";

    createPuzzle(nivel, imagen_al_azar);
    reproducir_audio_loop();
}

var audio_nave = document.createElement('audio');
function reproducir_audio_loop() {
    audio_nave.pause();
    audio_nave.src = '../sounds/fondo_arrastra.mp3';
    audio_nave.loop = true;
    audio_nave.volume = 0.09;
    audio_nave.play();
}

function reproducir_audio(ruta) {
    var audio = document.createElement('audio');
    audio.pause();
    audio.src = ruta;
    audio.volume = 0.29;
    audio.play();
}


function terminar_juego() {
    clearInterval(intervalo);
    guardar_resultado("Rompecabezas", piezasCorrectas, tiempo, seleccion_nivel, categoria_seleccionada_nombre);
}
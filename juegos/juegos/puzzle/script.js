$(document).ready(function(){

    var numeroPiezas;
    var piezasCorrectas = 0;
    const PUZZLE_IMAGE = 'imagen.jpg';

    function createPuzzle(nivel) {
        $('#myModal').modal('hide');
        
        var PUZZLE_ROWS = nivel;
        var PUZZLE_COLS = nivel;
        numeroPiezas = PUZZLE_ROWS * PUZZLE_COLS;
        var PIECE_HEIGHT = 540 / PUZZLE_ROWS; // Altura de la pieza
        var PIECE_WIDTH = 740 / PUZZLE_COLS;  // Ancho de la pieza
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
            alert('¡Felicidades! Has completado el puzzle, tu tiempo fue de: ' + $('#tiempo').text());
            clearInterval(intervalo);
        }
    }

    $('#nivel1').click(function(){
        createPuzzle(4);
    });
    $('#nivel2').click(function(){
        createPuzzle(7);
    });
    $('#nivel3').click(function(){
        createPuzzle(10);
    });

    var ayuda_mostrada = 1;

    $('#btn_ayuda').click(function(){
        if(ayuda_mostrada <= 3){
            $('#puzzle-board').css('background-image', 'url('+PUZZLE_IMAGE+')');
                setTimeout(function(){
                    $('#puzzle-board').css('background-image', 'none');
            }, 500);
            ayuda_mostrada++;
        }else{
            alert('No puedes mostrar la ayuda mas de 3 veces');
        }
    });
    

    $('#btn_reiniciar').click(function(){
        location.reload();
    });

    var intervalo;
    var tiempo = 0;
    function iniciarTiempo(){
        intervalo = setInterval(function(){
            tiempo++;
            var tiempoFormateado = formatTime(tiempo);
            $('#tiempo').text(tiempoFormateado);
        }, 1000);
    }

    function formatTime(tiempo){
        var minutos = Math.floor(tiempo / 60);
        var segundos = tiempo % 60;
        if(segundos < 10){
            segundos = '0' + segundos;
        }
        if(minutos < 10){
            minutos = '0' + minutos;
        }
        return minutos + ':' + segundos;
    }
});
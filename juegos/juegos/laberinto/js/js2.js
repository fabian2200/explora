const mapDataArray = [
    [
        "******************************",
        "W_________****_____________*_W",
        "*_*****___****___*****____**_*",
        "*_____*______________*_______*",
        "*_****_********_*****_**_*****",
        "*_*_________*____________*___*",
        "*_*_*******_*_************___*",
        "*___________*______________***",
        "****_*****_******_**_**_******",
        "*_______**__________**___*___*",
        "*___***_**____o_____**_*_*__**",
        "*___***_**__________**_*____**",
        "**_***__***_******_****___*__*",
        "*___*___*___*____*__**____**_*",
        "*_*_*___*_**____**__**___**__*",
        "*_*_*___*______*____**_______*",
        "*_*_**_*****__*****_******___*",
        "*_*______**___**____**_**__***",
        "*_********_______*___________*",
        "W__________****_____****_____W",
        "******************************"
    ],
    [
        "******************************",
        "W____*__________*______*_____W",
        "*____*___****___*__**___****_*",
        "*__***_____**___*__**________*",
        "*____*__******__**_**_****___*",
        "*___**__*______*____*____*___*",
        "**_****_*_****_*_****_*__**__*",
        "*_______*______________*_____*",
        "*__********_******_**_**_*****",
        "*_______**__________**___*___*",
        "*___***_**_____o____**_*_*__**",
        "*___***_**__________**_*____**",
        "**_***__***_******_****___*__*",
        "*_______________*___**____**_*",
        "*_****___*_****_*_***____**__*",
        "*_*______*______*___**_______*",
        "*_**_____**********_******___*",
        "*_*___**___**___**____**_**__*",
        "*_*_*______________*_________*",
        "W___**___****___******___***_W",
        "******************************"
    ],
    [
        "******************************",
        "W_________****_____________*_W",
        "*_*****___****___*****____**_*",
        "*_____*______________*_______*",
        "*_****_********_*****_*_******",
        "*_*_________*____________*___*",
        "*_*_*******_*_************___*",
        "*___________*______________***",
        "****_*****_******_**_**_******",
        "*_______**__________**___*___*",
        "*___***_**____o_____**_*_*__**",
        "*___***_**__________**_*____**",
        "**_***__***_******_****___*__*",
        "*___*___*___*____*__**____**_*",
        "*_*_*___*_**____**__**___**__*",
        "*_*_*___*______*____**_______*",
        "*_*_**_*****__*****_******___*",
        "*_*______**___**____**_**__***",
        "*_********_______*___________*",
        "W__________****_____****_____W",
        "******************************"
    ]
];

var mapData = mapDataArray[Math.floor(Math.random() * mapDataArray.length)];
var mapaLose = Array(21).fill().map((_, i) => i === 0 || i === 20 ? "******************************" : "*                            *");

const $table = $("#mapa");
const $player = $("#player");
let playerPosition = { row: 0, col: 0 };
let dragonPositions = [];
let intervaloDragones;
let intervaloTimer;
let segundos = 0;
let minutos = 5;
let juego_iniciado = false;

const rotaciones = {
    ArrowUp: "315deg",
    ArrowLeft: "225deg",
    ArrowDown: "135deg",
    ArrowRight: "45deg"
};

function generarMapaLose(tipo) {
    mapData = mapaLose;
    setTimeout(()=>{
        $player.hide();
        dragonPositions.forEach(({ id }) => $(`#dragon${id}`).hide());
        $table.css("opacity", "0");
        setTimeout(() => {
            $table.empty().addClass("fondo");
            mapData.forEach(row => {
                const $tr = $("<tr>");
                row.split("").forEach(cell => {
                    $tr.append($("<td>").addClass(cell === "*" ? "wall" : "vacio"));
                });
                $table.append($tr);
            });

            if(tipo === 1){
                texto_final = 'Te han alcanzado las naves alienigenas, <br> vuelve a intentarlo, esta vez no te alcanzaran';
            } else if(tipo === 2){
                texto_final = 'Se te acabo el tiempo, <br> vuelve a intentarlo, esta vez lo haras mejor';
            }

            var div = $('<div class="texto_final"></div>');
            div.append($('<h1>¡Lo siento!</h1>'));
            div.append($('<h2 id="texto_final_text">'+texto_final+'</h2>'));
            $table.append(div);
            
            setTimeout(() => {
                $table.css("opacity", "1");
            }, 300);
        }, 1000);
    }, 1000)
}

function createMap(numero_dragones) {
    $table.empty();
    mapData.forEach((row, rowIndex) => {
        const $tr = $("<tr>");
        row.split("").forEach((cell, colIndex) => {
            const $td = $("<td>");
            if (cell === "*") $td.addClass("wall");
            else if (cell === "W") $td.addClass("state");
            else if (cell === "o") playerPosition = { row: rowIndex, col: colIndex };
            else if (cell === "D") dragonPositions.push({ row: rowIndex, col: colIndex });
            $tr.append($td);
        });
        $table.append($tr);
    });
    positionPlayer();
    generateDragonCoordinates(numero_dragones);
    seleccionarCoordenadaAzar();
}

function positionPlayer() {
    const $td = $table.find(`tr:eq(${playerPosition.row}) td:eq(${playerPosition.col})`);
    if ($td.length) {
        const rect = $td[0].getBoundingClientRect();
        const tableRect = $table[0].getBoundingClientRect();
        $player.css({
            top: `${rect.top - tableRect.top}px`,
            left: `${rect.left - tableRect.left}px`
        });
    }
}

function generateDragonCoordinates(numero_dragones) {
    let dragonsPlaced = 0;
    let id = 0;

    while (dragonsPlaced < numero_dragones) {
        const x = Math.floor(Math.random() * (mapData[0].length - 1) + 1);
        const y = Math.floor(Math.random() * (mapData.length - 1) + 1);

        if ((y < 9 || y > 11) && (x < 10 || x > 20) && 
            !['*', 'W', 'o', 'D'].includes(mapData[y][x])) {
            mapData[y] = mapData[y].substring(0, x) + 'D' + mapData[y].substring(x + 1);
            dragonPositions.push({ row: y, col: x, id: id++ });
            dragonsPlaced++;
        }
    }
    positionDragons();
}

function positionDragons() {
    dragonPositions.forEach(({ row, col, id }) => {
        const $td = $table.find(`tr:eq(${row}) td:eq(${col})`);
        const rect = $td[0].getBoundingClientRect();
        const tableRect = $table[0].getBoundingClientRect();

        $("<img>", {
            src: "css/fantasma.gif",
            class: "dragon",
            id: "dragon" + id
        }).css({
            top: `${rect.top - tableRect.top}px`,
            left: `${rect.left - tableRect.left}px`
        }).appendTo(".game-container");
    });
}

function mover(newRow, newCol, sigue_igual) {
    if (newRow < 0 || newRow >= mapData.length || newCol < 0 || newCol >= mapData[0].length || mapData[newRow][newCol] === "*") return;
    
    playerPosition = { row: newRow, col: newCol };
    const actualizar = () => {
        positionPlayer();
        actualizarMapa(newRow, newCol);
    };

    sigue_igual ? actualizar() : setTimeout(actualizar, 100);
}

$(document).on("keydown", (event) => {
    if (!juego_iniciado || !rotaciones[event.key]) return;

    const { row, col } = playerPosition;
    let newRow = row;
    let newCol = col;

    switch(event.key) {
        case "ArrowUp": newRow--; break;
        case "ArrowLeft": newCol--; break;
        case "ArrowDown": newRow++; break;
        case "ArrowRight": newCol++; break;
    }

    const sigue_igual = $player.css("transform") === `rotate(${rotaciones[event.key]})`;
    if (!sigue_igual) $player.css("transform", `rotate(${rotaciones[event.key]})`);
    mover(newRow, newCol, sigue_igual);
});


var posiciones_preguntas =  [
    [1,0],
    [1,29],
    [19,0],
    [19,29]
];

var posicion_pregunta_ir = [1,0];

function seleccionarCoordenadaAzar() {
    var td = $("#mapa tr:eq(" + posicion_pregunta_ir[0] + ") td:eq(" + posicion_pregunta_ir[1] + ")");
    td.removeClass("aumentar_disminuir");

    var coordenadas = posiciones_preguntas;
    var indiceAleatorio;
    var coordenadaSeleccionada;

    do {
        indiceAleatorio = Math.floor(Math.random() * coordenadas.length);
        coordenadaSeleccionada = coordenadas[indiceAleatorio];
    } while (coordenadaSeleccionada[0] == posicion_pregunta_ir[0] && coordenadaSeleccionada[1] == posicion_pregunta_ir[1]);
    
    
    posicion_pregunta_ir = coordenadaSeleccionada;
    
    var td = $("#mapa tr:eq(" + posicion_pregunta_ir[0] + ") td:eq(" + posicion_pregunta_ir[1] + ")");
    td.addClass("aumentar_disminuir");
}

function actualizarMapa(nuevaFila, nuevaColumna) {
    mapData[playerPosition.row] = mapData[playerPosition.row].replace("o", "_");
    playerPosition = { row: nuevaFila, col: nuevaColumna };
    mapData[nuevaFila] = mapData[nuevaFila].substring(0, nuevaColumna) + "o" + mapData[nuevaFila].substring(nuevaColumna + 1);

    const preguntas = posicion_pregunta_ir;

    if (preguntas[0] == playerPosition.row && preguntas[1] == playerPosition.col) {
        setTimeout(() => {
            var td = $("#mapa tr:eq(" + posicion_pregunta_ir[0] + ") td:eq(" + posicion_pregunta_ir[1] + ")");
            td.removeClass("aumentar_disminuir");
            mostrar_pregunta();
        }, 700);
        clearInterval(intervaloDragones);
        intervaloDragones = null;
    } else if (!intervaloDragones) {
        moverDragones();
        intervaloDragones = setInterval(moverDragones, 1500);
    }
}

function moverDragones() {
    const nuevaData = mapData.map(row => row.split(""));
    dragonPositions.forEach(({ row, col, id }) => {
        const movimientos = BuscarCaminoMasCercanoAJugador(col, row, nuevaData);
        if (movimientos?.length > 0) {
            const move = movimientos[0];
            const newRow = row + (move === "arriba" ? -1 : move === "abajo" ? 1 : 0);
            const newCol = col + (move === "izquierda" ? -1 : move === "derecha" ? 1 : 0);
            
            if (nuevaData[newRow][newCol] !== "D") {
                nuevaData[row][col] = "_";
                nuevaData[newRow][newCol] = "D";
                actualizarMapadragones(newRow, newCol, row, col, id);
            }
        }
    });
}

function actualizarMapadragones(nuevaFila, nuevaColumna, viejaFila, viejaColumna, id) {
    mapData[viejaFila] = mapData[viejaFila].substring(0, viejaColumna) + "_" + mapData[viejaFila].substring(viejaColumna + 1);
    mapData[nuevaFila] = mapData[nuevaFila].substring(0, nuevaColumna) + "D" + mapData[nuevaFila].substring(nuevaColumna + 1);

    const $dragon = $(`#dragon${id}`);
    const $td = $table.find(`tr:eq(${nuevaFila}) td:eq(${nuevaColumna})`);
    const rect = $td[0].getBoundingClientRect();
    const tableRect = $table[0].getBoundingClientRect();

    $dragon.css({
        top: `${rect.top - tableRect.top}px`,
        left: `${rect.left - tableRect.left}px`
    });

    dragonPositions[id] = { ...dragonPositions[id], col: nuevaColumna, row: nuevaFila };

    setTimeout(() => {
        if (nuevaFila === playerPosition.row && nuevaColumna === playerPosition.col) {
            generarMapaLose(1);
            clearInterval(intervaloDragones);
            clearInterval(intervaloTimer);
        }
    }, 1500);
}

function BuscarCaminoMasCercanoAJugador(xD, yD, map) {
    const queue = [{ x: xD, y: yD, path: [] }];
    const visited = new Set();
    const movimientos = [
        { dx: 0, dy: -1, dir: "arriba" },
        { dx: 0, dy: 1, dir: "abajo" },
        { dx: -1, dy: 0, dir: "izquierda" },
        { dx: 1, dy: 0, dir: "derecha" }
    ];

    while (queue.length > 0) {
        const { x, y, path } = queue.shift();
        if (x === playerPosition.col && y === playerPosition.row) return path;
        
        if (!visited.has(`${x},${y}`)) {
            visited.add(`${x},${y}`);
            movimientos.forEach(({ dx, dy, dir }) => {
                const nx = x + dx, ny = y + dy;
                if (nx >= 0 && nx < map[0].length && ny >= 0 && ny < map.length && 
                    map[ny][nx] !== "*" && !visited.has(`${nx},${ny}`)) {
                    queue.push({ x: nx, y: ny, path: [...path, dir] });
                }
            });
        }
    }
    return null;
}

function playPause() {
    const $play = $('#play_pause');
    if ($play.hasClass('play')) {
        $play.removeClass('play').addClass('pausa');
        iniciarTimer();
        intervaloDragones = setInterval(moverDragones, 1500);
    } else {
        $play.removeClass('pausa').addClass('play');
        pauseTimer();
        clearInterval(intervaloDragones);
    }
}

function iniciarTimer() {
    juego_iniciado = true;
    const $timer = $('#timer_text');

    intervaloTimer = setInterval(() => {
        if (segundos === 0) {
            if (minutos === 0) {
                clearInterval(intervaloTimer);
                return;
            }
            minutos--;
            segundos = 59;
        } else {
            segundos--;
        }

        $timer.html(`${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`);

        if (minutos === 0 && segundos === 0) {
            generarMapaLose(2);
            clearInterval(intervaloTimer);
        }
    }, 1000);
}

function pauseTimer() {
    juego_iniciado = false;
    clearInterval(intervaloTimer);
}

function replay() {
    window.location.reload();
}

var pregunta = 0;
function mostrar_pregunta() {
    const $contenedor_pregunta = $('#pregunta');
    const $pregunta = $('#pregunta_text');
    $pregunta.addClass('pregunta_animacion');
    const $opciones_container = $('#opciones_container');
    
    var pregunta_actual = preguntas_array[pregunta];
    var pregunta_text = pregunta_actual.pregunta;
    var opciones = pregunta_actual.opciones;
    
    $pregunta.html('');
    $pregunta.append(pregunta_text);


    var html_opciones = '';
    opciones.forEach(opcion => {
        html_opciones += `<div class="col-md-6">${opcion.opcion}</div>`;
    })

    $opciones_container.html(html_opciones);

    $contenedor_pregunta.addClass('pregunta_animacion');
    $contenedor_pregunta.css('left', '0');
    setTimeout(() => {
        $contenedor_pregunta.css('background-color', 'rgba(0, 0, 0, 0.6)');
    }, 4000);
    pregunta++;
}

var preguntas = [];
var preguntas_array = [];
function cargarJsonPreguntas() {
    $.getJSON('js/preguntas.json', function(data) {
        preguntas = data;
    });
}

function seleccionar_nivel(nivel) {
    preguntas_array = preguntas.find(pregunta => pregunta.nivel === nivel);
    preguntas_array = desordenar_opciones(preguntas_array.preguntas);
    
    preguntas_array.forEach(pregunta => {
        pregunta.opciones = desordenar_opciones(pregunta.opciones);
    });

    $('#miModal').modal('hide');
    
    createMap(nivel + 3);

    setTimeout(() => {
        $("#contenedor_general").css("opacity", "1");
    }, 500);
}

function desordenar_opciones(opciones) {
    return opciones.sort(() => Math.random() - 0.5);
}


var contador_preguntas = 0;
var preguntas_correctas = 0;
var preguntas_incorrectas = 0;
var $marcador1 = $('#marcador1');
var $marcador2 = $('#marcador2');
function verificarRespuesta(boton, respuesta) {
    contador_preguntas++;
    var clase = "";
    if (respuesta) {
        $(boton).removeClass('btn-secondary');  
        $(boton).addClass('btn-success');

        clase = "state_success";
        preguntas_correctas++;
        $marcador1.html(preguntas_correctas);
    } else {
        $(boton).removeClass('btn-secondary');
        $(boton).addClass('btn-danger');

        clase = "state_danger";
        preguntas_incorrectas++;
        $marcador2.html(preguntas_incorrectas);
    }

    const $contenedor_pregunta = $('#pregunta');
    $contenedor_pregunta.css('background-color', 'rgba(0, 0, 0, 0)');

    setTimeout(() => {
        $contenedor_pregunta.css('left', '-100vw');
        setTimeout(() => {
            $contenedor_pregunta.removeClass('pregunta_animacion');
            $contenedor_pregunta.css('left', '100vw');

            if (contador_preguntas === 4) {
                $player.css("transition", "all 2s linear");
                $player.css("left", "100vw");
                $player.css("top", "50vh");
                setTimeout(() => {
                    mostrar_finalJuego();
                    clearInterval(intervaloDragones);
                    clearInterval(intervaloTimer);
                }, 2000);
            }else{
                seleccionarCoordenadaAzar();
            }
        }, 4000);
    }, 1000);
}

function mostrar_finalJuego() {
    const $contenedor_pregunta = $('#pregunta');
    const $pregunta = $('#pregunta_text');
    $pregunta.addClass('pregunta_animacion');
    const $opciones_container = $('#opciones_container');
    
    var pregunta_text = 'has contestado ' + preguntas_correctas + ' de 4 preguntas correctamente, <br> ¿deseas volver a intentarlo?';
    var opciones = ['Si', 'No'];
    
    $pregunta.html('');
    $pregunta.append(pregunta_text);

    var html_opciones = '';
    html_opciones += `<div class="col-md-6"><button class="btn btn-warning" onclick="replay()">${opciones[0]}</button></div>`;
    html_opciones += `<div class="col-md-6"><button class="btn btn-dark" onclick="replay()">${opciones[1]}</button></div>`;
    

    $opciones_container.html(html_opciones);

    $contenedor_pregunta.addClass('pregunta_animacion');
    $contenedor_pregunta.css('left', '0');
    $pregunta.css('font-size', '20px');
    $pregunta.css('font-weight', 'bold');
    $pregunta.css('text-align', 'center');
    $pregunta.css('font-family', 'DS-Digital');
    setTimeout(() => {
        $contenedor_pregunta.css('background-color', 'rgba(0, 0, 0, 0.6)');
    }, 4000);
}

$(document).ready(function() {
    cargarJsonPreguntas();
    $("#miModal").modal("show"); // Abre el modal
}); 
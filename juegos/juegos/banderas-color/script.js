var banderas = [];
var textoDepartamento = $('#departamento');
var pregunta = $('#pregunta');
var numeroPregunta = 0;

function cargarBanderas() {
    $.getJSON('json_banderas.json', function(data) {
        banderas = data;
        banderas = desordenarBanderas(banderas);

        var Banderas_10 = [];
        for (var i = 0; i < banderas.length; i++) {
            Banderas_10.push(banderas[i]);
        }

        banderas = Banderas_10;

        mostrarBanderas();
    });
}

function mostrarBanderas() {
    if(numeroPregunta < 10) {
        var bandera = banderas[numeroPregunta];
        var secciones = bandera.secciones;
        textoDepartamento.html(bandera.Departamento);
        var div = $("<div class='bandera-" + bandera.bandera + "'></div>");
        pregunta.html(numeroPregunta + 1);
        
        if (bandera.bandera == "especial") {
            $.each(secciones, function(index, seccion) {
                div.append("<div style='background-color: #d2d2d2;' onclick='pintarDiv(this)' data-color='" + seccion[1] + "' class='" + seccion[0] + " seccion_bandera'></div>");
            });

            if (bandera.cuadro_extra) {
                div.append("<div class='" + bandera.cuadro_extra[0] + "' style='background-color: #d2d2d2;'></div>");
            }
        } else {
            $.each(secciones, function(index, seccion) {
                div.append("<div onclick='pintarDiv(this)' data-color='" + seccion[2] + "' style='width: calc((280px / 100) * " + seccion[0] + "); height: calc((180px / 100) * " + seccion[1] + "); border: 1px solid #000000; background-color: #d2d2d2' class='seccion_bandera'></div>");
            });

            if (bandera.cuadro_extra) {
                div.append("<div onclick='pintarDiv(this)' data-color='" + bandera.cuadro_extra[4] + "' class='cuadro-extra seccion_bandera' style='width: calc((280px / 100) * " + bandera.cuadro_extra[0] + "); height: calc((280px / 100) * " + bandera.cuadro_extra[1] + "); border: 1px solid #000000;background-color: #d2d2d2;'></div>");
            }

            if (bandera.extra) {
                $.each(bandera.extra, function(index, extra) {
                    div.append("<div style='background-color: #d2d2d2;' onclick='pintarDiv(this)' data-color='" + extra[1] + "' class='" + extra[0] + " seccion_bandera'></div>");
                });
            }
        }
        
        $('#contenedor_bandera').html(div);
        if(bandera.imagen) {    
            $('#contenedor_bandera').append("<img style='width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; z-index: 102; pointer-events: none;' src='" + bandera.imagen + "' alt='" + bandera.nombre + "' class='bandera-imagen'>");
        }
        numeroPregunta++;
    }else{
        clearInterval(intervalo_contador_juego);
        guardar_resultado("bandera_color", respondidas_correctas, contador_juego, "Normal", "Categoría Única");

        var ruta_audio = '';
        setTimeout(function() {
            if((respondidas_correctas / respondidas) >= 0.6) {
                ruta_audio = '../sounds/victory.mp3';
                Swal.fire({
                    icon: 'success',
                    title: '¡Felicidades!',
                    html: 'Has respondido correctamente correctamente ' + respondidas_correctas + ' de ' + respondidas + ' preguntas.',
                    showConfirmButton: true,
                    confirmButtonText: 'Jugar de nuevo',
                    showCancelButton: true,
                    cancelButtonText: 'Salir',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#3085d6',
                }).then((result) => {
                    if(result.isConfirmed) {
                        window.location.reload(1);
                    }else{
                        location.href = '../../index.html';
                    }
                });
            }else{
                ruta_audio = '../sounds/game_over.mp3';
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    html: 'Has respondido correctamente correctamente ' + respondidas_correctas + ' de ' + respondidas + ' preguntas, animo, puedes intentarlo de nuevo.',
                    showConfirmButton: true,
                    confirmButtonText: 'Intentar de nuevo',
                    showCancelButton: true,
                    cancelButtonText: 'Salir',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#3085d6',
                }).then((result) => {
                    if(result.isConfirmed) {
                        window.location.reload(1);
                    }else{
                        location.href = '../../index.html';
                    }
                });
            }
        }, 300);

        setTimeout(function() {
            reproducir_audio(ruta_audio);
        }, 400);
    }
}

function desordenarBanderas(array) {
    array.sort(function() {
        return Math.random() - 0.5;
    });

    return array;
}

function cargarColores() {
    $.getJSON('colores.json', function(data) {
        var colores = data;

        colores = desordenarBanderas(colores);

        var div = "";
        $.each(colores, function(index, color) {
            div += "<div class='color' onclick='seleccionarColor(this, \"" + color.hex + "\")' style='background-color: " + color.hex + ";'></div>";
        });

        $('.paleta-colores').html(div);
    });
}

var color_clickeado_hexa;
function seleccionarColor(color_clickeado, color) {
    $('.color').removeClass('activo');
    $(color_clickeado).addClass('activo');
    
    color_clickeado_hexa = color;
}


function pintarDiv(div) {
    if(color_clickeado_hexa == undefined || color_clickeado_hexa == null) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No has seleccionado un color, por favor selecciona un color de la paleta de colores que se encuentra en la parte inferior de la pantalla.',
            showConfirmButton: false,
            timer: 2500,
        });
        return;
    }

    $(div).css('background-color', color_clickeado_hexa);
    $(div).attr('data-color-pintado', color_clickeado_hexa);
}

var respondidas = 0;
var respondidas_correctas = 0;
function verificarBanderas() {
    var seccionesPintadas = $('.seccion_bandera');

    var correctas_pintadas = 0;
    for(var i = 0; i < seccionesPintadas.length; i++) {
        if($(seccionesPintadas[i]).attr('data-color-pintado') == undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes pintar todas las secciones de la bandera antes de validar.',
                showConfirmButton: false,
                timer: 2500,
            });
            return;
        }

        if($(seccionesPintadas[i]).attr('data-color-pintado') == $(seccionesPintadas[i]).attr('data-color')) {
            correctas_pintadas++;
        }
    }

    respondidas++;

    var bandera = $('#contenedor_bandera').children().first();
    var ruta_audio = '';
    if(correctas_pintadas == seccionesPintadas.length) {
        respondidas_correctas++;
        bandera.append("<div class='bandera-correcta'><img width='60' height='50' src='assets/bandera_correcta.png' alt='bandera correcta'></div>");
        ruta_audio = '../sounds/ok.mp3';
        setTimeout(function() {
            mostrarBanderas();        
        }, 1500);
        
    }else{
        bandera.append("<div class='bandera-incorrecta'><img width='60' height='50' src='assets/bandera_incorrecta.png' alt='bandera incorrecta'></div>");
        ruta_audio = '../sounds/over.mp3';
        setTimeout(function() {
            mostrarBanderas();        
        }, 1500);
    }

    reproducir_audio(ruta_audio);
}

function limpiarBanderas() {
    var seccionesPintadas = $('.seccion_bandera');
    for(var i = 0; i < seccionesPintadas.length; i++) {
        $(seccionesPintadas[i]).css('background-color', '#d2d2d2');
        $(seccionesPintadas[i]).attr('data-color-pintado', null);
    }
}


$(document).ready(function() {
    pantalla_completa('#201dab', '#e30e0e', 'bold').then(function(result) {
        $('#myModal').modal('show');
    });
});


function iniciarJuego(tipo) {
    $('#myModal').modal('hide');
    reproducir_audio_loop();
    if(tipo == 'pinta') {
        $('#contenedor_juego1').show();
        $('#contenedor_juego2').hide();
        iniciar_contador_juego();
        cargarBanderas();
        cargarColores();
        $("body").css('cursor', 'url(assets/pincel.cur) 16 16, auto');
        $('body').css('background-image', 'url(assets/fondo.png)');
        $('body').css('background-size', '100% 100%');
        $('body').css('background-position', 'center');
        $('body').css('background-repeat', 'no-repeat');
    }else{
        $('#contenedor_juego1').hide();
        $('#contenedor_juego2').show();
        iniciar_contador_juego();
        cargarBanderasAdivinar();
        iniciarTimer();
    }
}



// Adivina la bandera juego 2
var banderas_adivinar_numero = 0;
var todas_banderas = [];
function cargarBanderasAdivinar() {
    $.getJSON('json_banderas_imagenes.json', function(data) {
        banderas = data;
        todas_banderas = data;
        banderas = desordenarBanderas(banderas);
        var banderas_10 = [];
        for(var i = 0; i < banderas.length; i++) {
            banderas_10.push(banderas[i]);
        }

        banderas = banderas_10;
        MapearBanderas();
    });
}

var bandera_adivinar;
function MapearBanderas() {
    bandera_adivinar = banderas[banderas_adivinar_numero];

    var banderas_mostradas = [bandera_adivinar];
    var banderas_opciones = todas_banderas.filter(x => x.nombre != bandera_adivinar.nombre);

    for(var i = 0; i < 3; i++) {
        var bandera_opcion = banderas_opciones[i];
        banderas_mostradas.push(bandera_opcion);
    }

    banderas_mostradas = desordenarBanderas(banderas_mostradas);

    $('#departamento_adivinar').html(bandera_adivinar.nombre);
    $('#contenedor_banderas_row').empty();

    for(var i = 0; i < banderas_mostradas.length; i++) {
        $('#contenedor_banderas_row').append("<div class='col-md-6' style='display: flex; justify-content: center; align-items: center;'><img onclick='seleccionarBandaAdivinar(\"" + banderas_mostradas[i].nombre + "\", this)' class='bandera-adivinar' src='" + banderas_mostradas[i].imagen + "' alt='" + banderas_mostradas[i].nombre + "'></div>");
    }

    $('#pregunta_adivina').html(banderas_adivinar_numero + 1);
    banderas_adivinar_numero++;
}

let segundos = 0;
let minutos = 5;
function iniciarTimer() {
    juego_iniciado = true;
    const $timer = $('#timer_text_adivina');

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
            clearInterval(intervaloTimer);
            Swal.fire({
                allowOutsideClick: false,
                allowEscapeKey: false,
                html: '<img src="../assets/images/derrota.gif" style="width: 400px;"> <br> <h2 style="font-size: 2.2rem; font-weight: bold; text-align: center; line-height: 45px;">¡Oops, se te acabo el tiempo! <br> Has respondido correctamente ' + respondidas_correctas_adivina + ' de ' + (respondidas_correctas_adivina + respondidas_incorrectas_adivina) + ' preguntas, animo, puedes intentarlo de nuevo.</h2>',
                showConfirmButton: true,
                confirmButtonText: 'Intentar de nuevo',
                showCancelButton: true,
                cancelButtonText: 'Salir',
                cancelButtonColor: '#d33',
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                if(result.isConfirmed) {
                    window.location.reload(1);
                }else{
                    location.href = '../../index.html';
                }
            });

            ruta_audio = '../sounds/game_over.mp3';
            reproducir_audio(ruta_audio);
        }
    }, 1000);
}

var respondidas_correctas_adivina = 0;
var respondidas_incorrectas_adivina = 0;

function seleccionarBandaAdivinar(bandera, div) {
    div = $(div).parent();

    var ruta_audio = '';
    if(bandera_adivinar.nombre == bandera) {
        respondidas_correctas_adivina++;
        $('#correctas_adivina').html(respondidas_correctas_adivina);
        $(div).append("<div class='bandera-correcta-adivina'><img src='assets/bandera_correcta.png' alt='bandera correcta'></div>");
        ruta_audio = '../sounds/ok.mp3';
    }else{
        respondidas_incorrectas_adivina++;
        $('#incorrectas_adivina').html(respondidas_incorrectas_adivina);
        $(div).append("<div class='bandera-incorrecta-adivina'><img src='assets/bandera_incorrecta.png' alt='bandera incorrecta'></div>");
        ruta_audio = '../sounds/over.mp3';
    }

    reproducir_audio(ruta_audio);

    if(respondidas_correctas_adivina + respondidas_incorrectas_adivina == 10) {
        clearInterval(intervaloTimer);

        clearInterval(intervalo_contador_juego);
        guardar_resultado("adivina_bandera", respondidas_correctas_adivina, contador_juego, "Normal", "Categoría Única");

        setTimeout(function() {
            if(respondidas_correctas_adivina >= 6) {
                ruta_audio = '../sounds/victory.mp3';   
                Swal.fire({
                    icon: 'success',
                    title: '¡Felicidades!',
                    text: 'Has respondido correctamente ' + respondidas_correctas_adivina + ' de ' + (respondidas_correctas_adivina + respondidas_incorrectas_adivina) + ' preguntas.',
                    showConfirmButton: true,
                    confirmButtonText: 'Jugar de nuevo',
                    showCancelButton: true,
                    cancelButtonText: 'Salir',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#3085d6',
                }).then((result) => {
                    if(result.isConfirmed) {
                        window.location.reload(1);
                    }else{
                        location.href = '../../index.html';
                    }
                });
            }else{
                ruta_audio = '../sounds/game_over.mp3';
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Has respondido correctamente ' + respondidas_correctas_adivina + ' de ' + (respondidas_correctas_adivina + respondidas_incorrectas_adivina) + ' preguntas, animo, puedes intentarlo de nuevo.',
                    showConfirmButton: true,
                    confirmButtonText: 'Intentar de nuevo',
                    showCancelButton: true,
                    cancelButtonText: 'Salir',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    cancelButtonColor: '#d33',
                    confirmButtonColor: '#3085d6',
                }).then((result) => {
                    if(result.isConfirmed) {
                        window.location.reload(1);
                    }else{
                        location.href = '../../index.html';
                    }
                }); 
            }
        }, 300);

        setTimeout(function() {
            reproducir_audio(ruta_audio);
        }, 400);
    }else{
        setTimeout(function() {
            MapearBanderas();
        }, 1300);
    }
}

var audio_nave = document.createElement('audio');
function reproducir_audio_loop(){
    audio_nave.pause();
    audio_nave.src = '../sounds/fondo.mp3';
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

var contador_juego = 0;
var intervalo_contador_juego = null;
function iniciar_contador_juego(){
    intervalo_contador_juego = setInterval(() => {
        contador_juego++;
        console.log(contador_juego);
    }, 1000);
}
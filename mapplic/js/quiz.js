var intervaloContador;
var numeropregunta = 0;
var arrayPreguntas = [];
var buenas = 0;
var departamento = {};
var pregunta = null;

function verTest() {
    $('#loadbar').show();
    $('#boton_comenzar').hide();
    $('#quiz').hide();
    buscarPreguntas();
    $('#contenedorTest').fadeIn(1000, function () {
        buscarPreguntas(function () {
            $('#loadbar').hide();
            $('#boton_comenzar').show().removeClass("animacionLogo");
        });
    });
}

function buscarPreguntas(callback) {
    
    var id_departamento = $("#departamento_seleccionado").val();
    $.getJSON('/mapplic/mapplic/php/buscarPreguntas.php', { id: id_departamento })
        .done(function (response) {
            departamento = response.departamento;
            $("#departamento_nombre").text(departamento.nombre);
            arrayPreguntas = shuffleArray(response.preguntas);
            if (typeof callback === "function") {
                callback();
            }
        })
        .fail(function (xhr, status, error) {
            console.error('Error al realizar la solicitud:', status, error);
        });
}

function cerrarTest() {
    clearInterval(intervaloContador);
    $('#contenedorTest').fadeOut(1000, function () {
        $(".facaritas").removeClass("fa-frown").addClass("fa-smile").css("color", "#6c757d");
        $("#contador").text("00:00");
        $("#contador_preguntas").text("Pregunta 0 de 10");
        numeropregunta = 0;
        buenas = 0;
    });
}

$(function () {
    $("label.btn").on('click', function () {
        $('#loadbar').show();
        $('#quiz').fadeOut().delay(1500).fadeIn();
        $('#loadbar').fadeOut();
    });
});

function comenzarTest() {
    $('#boton_comenzar').addClass("animacionLogo").delay(1500).fadeOut(function () {
        iniciarContador();
        mapearPregunta();
    });
}

function iniciarContador() {
    $(".facaritas").removeClass("fa-frown").addClass("fa-smile");
    let segundos = 0;
    intervaloContador = setInterval(function () {
        segundos++;
        let minutos = Math.floor(segundos / 60);
        let segundosRestantes = segundos % 60;
        $("#contador").text(`${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`);
    }, 1000);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5).slice(0, 10);
}

function mapearPregunta() {
    pregunta = arrayPreguntas[numeropregunta];
    $("#contador_preguntas").text(`Pregunta ${numeropregunta + 1} de 10`);
    
    let html = `<h4 class='element-animation0'><span class='label label-warning'>${pregunta.pregunta}</h4><br>`;
    
    if (pregunta.tipo_pregunta === "multiple") {
        shuffleArray(pregunta.opciones).forEach((element, index) => {
            html += `<label onclick='verificarRespuesta(${element.correcta}, ${index})' id='item_respuesta${index}' class='element-animation${index + 1} btn btn-lg btn-primary btn-block'><span class='btn-label'><i class='fa fa-chevron-right'></i></span>${element.opcion}</label>`;
        });
    } else {
        html += `<label onclick='verificarRespuestaVerdaderaFalsa(1, 1)' id='item_respuesta1' class='element-animation1 btn btn-lg btn-primary btn-block'><span class='btn-label'><i class='fa fa-chevron-right'></i></span>Verdadero</label>`;
        html += `<label onclick='verificarRespuestaVerdaderaFalsa(0, 2)' id='item_respuesta2' class='element-animation2 btn btn-lg btn-primary btn-block'><span class='btn-label'><i class='fa fa-chevron-right'></i></span>Falso</label>`;
    }
    
    $("#quiz").hide().html(html).fadeIn(500);
}

function verificarRespuesta(opcion, id) {
    let $itemRespuesta = $(`#item_respuesta${id}`);
    let $carita = $(`#carita${numeropregunta}`);
    
    if (opcion === 0) {
        $itemRespuesta.addClass("btn-danger").removeClass("btn-primary");
        $carita.css("color", "#bd4141").removeClass("fa-smile").addClass("fa-frown");
    } else {
        $itemRespuesta.addClass("btn-success").removeClass("btn-primary");
        $carita.css("color", "#2c7b36");
        buenas++;
    }

    setTimeout(()=>{
        $('#quiz').fadeOut(800, function () {
            actualizarNumeroPregunta();
            if(verificarFin()){
                mostrarResultado()
            }else{
                mapearPregunta();
                $('#quiz').fadeIn();
            }
        });
    }, 700);
}

function verificarRespuestaVerdaderaFalsa(opcion, id) {
    let correcta = pregunta.opciones[0].respuesta;
    let $itemRespuesta = $(`#item_respuesta${id}`);
    let $carita = $(`#carita${numeropregunta}`);
    
    if (opcion == correcta) {
        $itemRespuesta.addClass("btn-success").removeClass("btn-primary");
        $carita.css("color", "#2c7b36");
        buenas++;
    } else {
        $itemRespuesta.addClass("btn-danger").removeClass("btn-primary");
        $carita.css("color", "#bd4141").removeClass("fa-smile").addClass("fa-frown");
    }
    
    setTimeout(()=>{
        $('#quiz').fadeOut(800, function () {
            actualizarNumeroPregunta();
            if(verificarFin()){
                mostrarResultado()
            }else{
                mapearPregunta();
                $('#quiz').fadeIn();
            }
        });
    }, 700);
}

function verificarFin() {
    return numeropregunta == 10;
}

function actualizarNumeroPregunta() {
    numeropregunta++;
}

function mostrarResultado() {
    cerrarTest();
    $('#final').fadeToggle(1000);
    $("#imagen_final").attr("src", buenas < 6 ? "images/derrota.gif" : "images/victoria.gif");
    $("#texto_final").text(`Has contestado correctamente ${buenas} preguntas de 10.`);
    new Audio(buenas >= 6 ? 'sounds/victory.mp3' : 'sounds/game_over.mp3').play();
    buenas = 0;
}

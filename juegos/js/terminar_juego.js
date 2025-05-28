var nombre_juego_query = '';
var nombre_jugador_query = '';
var grado_jugador_query = '';
var avatar_jugador_query = '';
var preguntas_correctas_query = '';
var tiempo_query = '';
var nivel_query = '';
var categoria_query = '';

var avatar_seleccionado = 1;

function guardar_resultado(nombre_juego, preguntas_correctas, contador_juego, nivel, categoria) {

    nombre_juego_query = nombre_juego;
    preguntas_correctas_query = preguntas_correctas;
    tiempo_query = contador_juego;
    nivel_query = nivel;
    categoria_query = categoria;

    consultar_ranking();

    var tiempo_en_minutos = Math.floor(contador_juego / 60);
    var tiempo_en_segundos = contador_juego % 60;

    var div_avatar = '';
    for (var i = 1; i <= 35; i++) {
        div_avatar += `<div class="col-lg-2" style="padding: 10px;">
            <div class="avatar_container" onclick="seleccionar_avatar(${i})" id="avatar_${i}">
                <img src="../../images/avatars/${i}.png" alt="Avatar ${i}" class="img-fluid">
            </div>
        </div>`;
    }


    const modalHtml = `
        <div class="modal fade" id="modal_guardar_resultado" tabindex="-1" aria-labelledby="miModalLabel" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content" style="overflow: hidden; border-radius: 20px;">
                    <div class="modal-body" style="padding: 0px;">
                        <div class="row" id="row_guardar_resultado" style="margin: 0px; background: linear-gradient(90deg, rgba(224, 242, 255, 1) 57%, rgba(229, 204, 255, 1) 55%, rgba(229, 204, 255, 1) 2%, rgba(229, 204, 255, 1) 100%);">
                            <div class="col-lg-7" style="padding: 20px; padding-right: 60px;">
                                <h2 class="text-color-claro" style="text-align: center;">GUARDA TU RESULTADO</h2>
                                <br>
                                <div class="row" style="margin: 0px;">
                                    <div class="col-lg-6" style="padding: 0px; padding-right: 10px;">
                                        <h5 class="text-color-claro">Ingresa tu nombre: </h5>
                                        <input oninput="validar_guardar_resultado('nombre_jugador')" class="form-control" type="text" id="nombre_jugador" placeholder="Nombre">
                                    </div>
                                    <div class="col-lg-6" style="padding: 0px; padding-left: 10px;">
                                        <h5 class="text-color-claro">Grado: </h5>
                                        <select onchange="validar_guardar_resultado('grado_jugador')" class="form-control" id="grado_jugador">
                                            <option value="">Selecciona tu grado</option>
                                            <option value="1">1° Grado</option>
                                            <option value="2">2° Grado</option>
                                            <option value="3">3° Grado</option>
                                            <option value="4">4° Grado</option>
                                            <option value="5">5° Grado</option>
                                            <option value="6">6° Grado</option>
                                            <option value="7">7° Grado</option>
                                            <option value="8">8° Grado</option>
                                            <option value="9">9° Grado</option>
                                            <option value="10">10° Grado</option>
                                            <option value="11">11° Grado</option>
                                        </select>
                                    </div>
                                </div>
                                <br>
                                <h5 class="text-color-claro">Selecciona tu avatar: </h5>
                                <div class="row" id="div_avatar" style="margin: 0px; margin-top: 10px; max-height: 170px; overflow-y: auto;">
                                    ${div_avatar}
                                </div>
                                <br>
                                <div class="container-stats">
                                    <h5 class="text-primary"><i class="fas fa-check-circle text-color-claro"></i> <span class="text-dark">${preguntas_correctas} Puntos</span></h5>
                                    <h5 class="text-primary"><i class="fas fa-clock text-color-claro"></i> <span class="text-dark">${tiempo_en_minutos} Mts ${tiempo_en_segundos} Seg</span></h5>
                                    <h5 class="text-primary"><i class="fa-solid fa-star text-color-claro"></i><i class="fa-solid fa-star text-color-claro"></i> <span class="text-dark">${nivel}</span></h5>
                                </div>
                                <br>
                                <div style="display: flex; justify-content: center; align-items: center;">
                                    <button type="button" onclick="guardar_resultado_base_datos()" style="width: 160px;" class="btn btn-primary" id="btnGuardar">Guardar <i class="fas fa-save"></i></button>
                                    <button type="button" style="width: 160px; margin-left: 20px;" class="btn btn-danger" onclick="cerrar_modal_guardar_resultado()">Cerrar <i class="fas fa-times-circle"></i></button>
                                </div>
                            </div>
                            <div class="col-lg-5" style="padding: 15px 10px 25px 5px;">
                                <h2 class="text-color" style="text-align: center;">RANKING</h2>
                                <h5 class="text-color" style="text-align: center;">${categoria}</h5>
                                <div id="ranking_container"></div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>`;

    // Agrega el modal al body
    $('body').append(modalHtml);

    // Inicializa el modal
    const modal = new bootstrap.Modal(document.getElementById('modal_guardar_resultado'));
    modal.show();

    setTimeout(() => {
        verificar_usuario_logueado();
    }, 500);
}

function cerrar_modal_guardar_resultado(){
    $('#modal_guardar_resultado').modal('hide');
    $('#modal_guardar_resultado').remove();
    $('.modal-backdrop').remove();
}

function seleccionar_avatar(id) {
    var avatar_seleccionado_container = document.querySelector('.avatar_container.active');
    if (avatar_seleccionado_container) {
        avatar_seleccionado_container.classList.remove('active');
    }

    var avatar_seleccionado_html = document.getElementById('avatar_' + id);
    avatar_seleccionado_html.classList.add('active');

    avatar_seleccionado = id;
}

function guardar_resultado_base_datos() {

    $('#nombre_jugador').removeClass('is-invalid');
    $('#grado_jugador').removeClass('is-invalid');

    var url = '../../php/guardar_resultado.php';

    var nombre_jugador = document.getElementById('nombre_jugador').value;
    var grado_jugador = document.getElementById('grado_jugador').value;
    var avatar_jugador = document.querySelector('.avatar_container.active').id;

    if (nombre_jugador == '') {
       $('#nombre_jugador').addClass('is-invalid');
        return;
    }

    if (grado_jugador == '') {
        $('#grado_jugador').addClass('is-invalid');
        return;
    }

    var data = {
        nombre_juego_query: nombre_juego_query,
        nombre_jugador_query: nombre_jugador,
        grado_jugador_query: grado_jugador,
        avatar_jugador_query: avatar_seleccionado + '.png',
        preguntas_correctas_query: preguntas_correctas_query,
        tiempo_query: tiempo_query,
        nivel_query: nivel_query,
        categoria_query: categoria_query,
        id_usuario_logueado: id_usuario_logueado
    }

    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        beforeSend: function () {
            $('#btnGuardar').attr('disabled', true);
            $('#btnGuardar').html('<i class="fas fa-spinner fa-spin"></i> Guardando...');
        },
        success: function (response) {
            response = JSON.parse(response);
            if (response.status == 'success') {
              
                $('#btnGuardar').attr('disabled', true);
                $('#btnGuardar').html('<i class="fas fa-check-circle"></i> Guardado');
                $('#btnGuardar').addClass('btn-success');
                $('#btnGuardar').removeClass('btn-primary');

                $('#nombre_jugador').attr('disabled', true);
                $('#grado_jugador').attr('disabled', true);
                $('#div_avatar').css('pointer-events', 'none');
                $('#div_avatar').css('opacity', '0.5');
                
                setTimeout(() => {
                    consultar_ranking();
                }, 1000);
            } else {
                $('#btnGuardar').attr('disabled', false);
                $('#btnGuardar').html('Guardar <i class="fas fa-save"></i>');
            }
        }
    });
}

function consultar_ranking() {
    var url = '../../php/consultar_ranking.php';
    var data = {
        nombre_juego: nombre_juego_query,
        nivel: nivel_query,
        categoria: categoria_query
    }

    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: function (response) {
            response = JSON.parse(response);
            mapear_ranking(response);
        }
    });
}

var colores_ranking = ['#3d006b', '#3d006b', '#3d006b', '#9100ff', '#9100ff', '#9100ff'];
function mapear_ranking(response) {
    var ranking_container = document.getElementById('ranking_container');
    ranking_container.innerHTML = '';

    for (var i = 0; i < response.length; i++) {

        var tiempo_minutos = Math.floor(response[i].tiempo / 60);
        var tiempo_segundos = response[i].tiempo % 60;

        if(tiempo_segundos   < 10){
            tiempo_segundos = "0" + tiempo_segundos;
        }

        var ranking_item = document.createElement('div');

        if(i < 3){
            ranking_item.classList.add('ranking_item');
        }else{
            ranking_item.classList.add('ranking_item_2');
        }
        
        if(i < response.length - 1){
            ranking_item.style.marginBottom = "33px";
        }

        var coronita = "";
        var border_avatar_ranking = "";

        if(i == 0 || i == 1 || i == 2){
            coronita = "<img class='item_coronita' src='../../images/avatars/lugar"+(i+1)+".png' alt='Coronita'>";
        }else{
            border_avatar_ranking = "clase_border_avatar";
        }

        var nombre = response[i].jugador.split(' ');
        var nombre_ranking = nombre[0];
        if(nombre.length == 1){
            nombre_ranking = nombre_ranking;
        }else if(nombre.length == 2){
            nombre_ranking += " " + nombre[1];
        }else if(nombre.length == 3){
            nombre_ranking += " " + nombre[2];
        }else if(nombre.length == 4){
            nombre_ranking += " " + nombre[2];
        }

        ranking_item.innerHTML = `
            <div class="ranking_item_avatar ${border_avatar_ranking}">
                ${coronita}
                <img src="../../images/avatars/${response[i].avatar}" alt="Avatar ${response[i].avatar}">
            </div>
            <div class="info_ranking">
                <div class="ranking_item_nombre">
                    <p style="margin-bottom: -3px;">${nombre_ranking}</p>
                    <p style="margin-bottom: -3px; font-size: 0.7rem;">${response[i].grado}° Grado</p>
                </div>
                <div class="ranking_item_puntos">
                    <i class="fas fa-star"></i> ${response[i].puntaje}
                </div>
                <div class="ranking_item_tiempo">
                    <i class="fas fa-clock"></i> ${tiempo_minutos}:${tiempo_segundos} Mts
                </div>
            </div>
        `;
        ranking_container.appendChild(ranking_item);
    }
}

function validar_guardar_resultado(id){
    $('#'+id).removeClass('is-invalid');
}


var logueado = false;
var id_usuario_logueado = '';
function verificar_usuario_logueado(){
    var usuario = localStorage.getItem('usuario');
    if(usuario){
        $('#nombre_jugador').val(localStorage.getItem('nombre')).attr('disabled', true);
        $('#grado_jugador').val(localStorage.getItem('grado')).attr('disabled', true);
        $('#div_avatar').css('pointer-events', 'none');
        $('#div_avatar').css('opacity', '0.5');
        seleccionar_avatar(localStorage.getItem('avatar'));
        logueado = true;
        id_usuario_logueado = localStorage.getItem('id_usuario');
    }else{
        logueado = false;
        seleccionar_avatar(1);
        id_usuario_logueado = '0';
    }
}
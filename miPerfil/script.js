function mostrarSeccion(id, link) {
    // Mostrar/ocultar secciones
    document.getElementById('datos').style.display = (id === 'datos') ? 'block' : 'none';
    document.getElementById('historial').style.display = (id === 'historial') ? 'block' : 'none';

    // Cambiar clase activa en menú
    var links = document.querySelectorAll('#menu-perfil .nav-link');
    links.forEach(function (el) {
        el.classList.remove('active');
    });
    link.classList.add('active');
}


var usuario;
var nombre;
var grado;
var avatar;
var id_usuario;
function verUsuario() {
    usuario = localStorage.getItem('usuario');
    nombre = localStorage.getItem('nombre');
    grado = localStorage.getItem('grado');
    avatar = localStorage.getItem('avatar');
    id_usuario = localStorage.getItem('id_usuario');

    document.getElementById('usuario').value = usuario;
    document.getElementById('nombre').value = nombre;
    document.getElementById('grado').value = grado;
    document.getElementById('avatar-preview').src = "juegos/images/avatars/" + avatar + ".png";
}

$(document).ready(function () {
    verUsuario();
    consultarHistorial();
});

function mostrarModalAvatar() {
    $('#modal-avatar').modal('show');

    $('#modalRegistrar').remove();

    var div_avatar = '';
    for (var i = 1; i <= 35; i++) {
        div_avatar += `<div class="col-lg-1" style="padding: 10px;">
            <div class="avatar_container" onclick="seleccionar_avatar(${i})" id="avatar_${i}">
                <img src="juegos/images/avatars/${i}.png" alt="Avatar ${i}" class="img-fluid">
            </div>
        </div>`;
    }

    $('#avatars-preview').html('');
    $('#avatars-preview').html(div_avatar);

}

var avatar_seleccionado;
function seleccionar_avatar(id) {
    $('#avatar-preview').attr('src', "juegos/images/avatars/" + id + ".png");
    $('#modal-avatar').modal('hide');
    avatar_seleccionado = id;
}


function cargarHistorial(historial) {
    if (historial) {
        $('#historial-body').html('');
        var historial_body = '';
        historial.forEach(function (item) {
            historial_body += `
                <tr>
                    <td>${item.nombre_juego}</td>
                    <td>${item.categoria}</td>
                    <td>${item.nivel}</td>
                    <td><i class="fas fa-star"></i> ${item.puntaje} Pts</td>
                    <td><i class="fas fa-clock"></i> ${segundos_a_tiempo(item.tiempo)}</td>
                    <td>${item.fecha.split(' ')[0]}</td>
                    <td>${formatearHoraDoce(item.fecha.split(' ')[1])}</td>
                </tr>
            `;
        });

        $('#historial-body').html(historial_body);
    }
}

function segundos_a_tiempo(segundos) {
    var minutos = Math.floor(segundos / 60);
    var segundos_restantes = segundos % 60;
    return minutos + ':' + segundos_restantes + ' Mts';
}


function formatearHoraDoce(hora) {
    var hora_array = hora.split(':');
    var hora_doce = hora_array[0] > 12 ? hora_array[0] - 12 : hora_array[0];
    var am_pm = hora_array[0] >= 12 ? 'PM' : 'AM';
    return hora_doce + ':' + hora_array[1] + ' ' + am_pm;
}

function consultarHistorial() {
    $.ajax({
        url: 'juegos/php/consultar_historial.php?id_usuario=' + id_usuario,
        type: 'GET',
        success: function (response) {
            var historial_array = JSON.parse(response);
            cargarHistorial(historial_array);
        }
    });
}

function guardarCambios() {
    var id_usuario = localStorage.getItem('id_usuario');
    $.ajax({
        url: 'mapplic/php/cambiarAvatar.php',
        type: 'POST',
        data: {
            id_usuario: id_usuario,
            avatar: avatar_seleccionado
        },
        success: function (response) {
            var respuesta = JSON.parse(response);
            if(respuesta.status == 'success'){
                swal.fire({
                    title: 'Exito',
                    icon: 'success',
                    text: respuesta.message,
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    localStorage.setItem('avatar', avatar_seleccionado);
                }, 1500);
            }else{
                swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: respuesta.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    });
}

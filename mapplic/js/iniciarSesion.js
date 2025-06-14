var div_contenedor = $(".opciones-accesibilidad");
var avatar_seleccionado = 1;
var tipo_modal = 0;

$(document).ready(function() {
    cargar_opciones_accesibilidad();
    tipo_modal = localStorage.getItem("tipo_modal");
});

function cargar_opciones_accesibilidad() {
    var usuario = localStorage.getItem("usuario");
    $("#opciones_iniciar_sesion").remove();

    var div = "";
    if (!usuario) {
        div = "<div class='row' id='opciones_iniciar_sesion' style='margin: 0px;'>" +
            "<div class='col-12' style='padding-left: 10px; padding-right: 10px;'>" +
            "<button style='width: 100%; text-align: center; display: block;' onclick='mostrarModalIniciarSesion(1)' id='btn_iniciar_sesion' class='btn-opcion'>" +
            "<i class='fa fa-user'></i> Iniciar sesión" +
            "</button>" +
            "</div>" +
        "</div>";
    }else {
        div = "<div class='row' id='opciones_iniciar_sesion' style='margin: 0px;'>" +
            "<div class='col-6' style='padding-left: 10px; padding-right: 10px;'>" +
            "<button onclick='mostrarPerfil()' id='btn_perfil' class='btn-opcion'>" +
            "<i class='fa fa-user'></i>Mi Perfil" +
            "</button>" +
            "</div>" +
            "<div class='col-6' style='padding-left: 10px; padding-right: 10px;'>" +
            "<button onclick='cerrarSesion()' id='btn_cerrar_sesion' class='btn-opcion'>" +
            "<i class='fa fa-sign-out-alt'></i>Cerrar sesión" +
            "</button>" +
            "</div>" +
        "</div>";
    }

    div_contenedor.append(div);
}

function mostrarModalIniciarSesion(tipo) {
    tipo_modal = tipo;
    localStorage.setItem("tipo_modal", tipo_modal);
    if(tipo_modal == 1){
        toggleMenuAccesibilidad();
    }

    $('#modalLogin').remove();

    // Crear modal Bootstrap dinámicamente
    const modalHTML = `<div class="modal fade" id="modalLogin" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-body">
                <div style="text-align: center;">
                    <img src="`+ (tipo_modal == 1 ? `img/logo.png` : `../img/logo.png`) + `" alt="logo" style="width: 200px; height: auto;">
                    <h3 style="font-weight: bold; margin-top: 10px;">Iniciar Sesión</h3>
                </div>
                <br>
                <form id="formLogin">
                    <div class="mb-3">
                        <label style="font-weight: bold;" for="usuario" class="form-label">Usuario</label>
                        <input type="text" class="form-control" id="usuario" required placeholder="Usuario">
                    </div>
                    <div class="mb-3">
                        <label style="font-weight: bold;" for="contrasena" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="contrasena" required placeholder="Contraseña">
                    </div>
                    <div style="display: flex; justify-content: center; gap: 10px;">
                        <button style="width: 45%;" type="button" onclick="iniciarSesion()" class="btn btn-primary">Iniciar sesión <i class="fa fa-sign-in-alt"></i></button>
                        <button style="width: 45%;" type="button" onclick="cerrarModalIniciarSesion()" class="btn btn-danger">Cerrar <i class="fa fa-times"></i></button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    </div>`;

    // Agregar modal al body
    $('body').append(modalHTML);

    // Mostrar modal con Bootstrap
    const modal = new bootstrap.Modal(document.getElementById('modalLogin'));
    modal.show();
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

function cerrarModalIniciarSesion() {
    $('#modalLogin').modal('hide');
    $('#modalLogin').remove();
    $('.modal-backdrop').remove();
    if(tipo_modal == 1){
        toggleMenuAccesibilidad();
    }
}

function iniciarSesion() {
    
    var usuario = $("#usuario").val();
    var contrasena = $("#contrasena").val();

    if (usuario == "" || contrasena == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, ingrese su usuario y contraseña.',
            timer: 1500,
            showConfirmButton: false
        });
        return;
    }

    var data = {
        usuario: usuario,
        contrasena: contrasena
    }

    $.ajax({
        url: tipo_modal == 1 ? "mapplic/php/iniciarSesion.php" : "../mapplic/php/iniciarSesion.php",
        type: "POST",
        data: data, 
        success: function(response) {
            response = JSON.parse(response);
            if (response.success) {
                localStorage.setItem("usuario", response.usuario_objeto.login_usuario);
                localStorage.setItem("grado", response.usuario_objeto.grado_usuario);
                localStorage.setItem("nombre", response.usuario_objeto.nombre_usuario);
                localStorage.setItem("avatar", response.usuario_objeto.avatar_explora);
                localStorage.setItem("id_usuario", response.usuario_objeto.id);

                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Inicio de sesión exitoso.',
                    timer: 1500,
                    showConfirmButton: false
                });

                if(tipo_modal == 1){
                    cargar_opciones_accesibilidad();
                }else{
                    verificarSesion();
                }

                setTimeout(() => {
                   cerrarModalIniciarSesion();
                }, 1500);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.mensaje,
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        },
        error: function(xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al iniciar sesión, por favor intente nuevamente.',
                timer: 1500,
                showConfirmButton: false
            });
        }   
    });
}

function verificarSesion(){
    const usuario = localStorage.getItem('usuario');
    if(usuario){
        document.getElementById('btn-perfil').style.display = 'block';
        document.getElementById('btn-cerrar').style.display = 'block';
        document.getElementById('btn-iniciar').style.display = 'none';
    }else{
        document.getElementById('btn-perfil').style.display = 'none';
        document.getElementById('btn-cerrar').style.display = 'none';
        document.getElementById('btn-iniciar').style.display = 'block';
    }
}

function cerrarSesion() {
    Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro que quieres cerrar sesión?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, salir',
        cancelButtonText: 'No, cancelar',
        allowOutsideClick: false,
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("usuario"); 
            localStorage.removeItem("grado");
            localStorage.removeItem("nombre");
            localStorage.removeItem("avatar");
            localStorage.removeItem("id_usuario");

            if(tipo_modal == 1){
                cargar_opciones_accesibilidad();
                verificarSesion();
                localStorage.removeItem("tipo_modal");
            }	
        }
    });
}

function mostrarPerfil(){
    window.location.href = "miPerfil.html";
}
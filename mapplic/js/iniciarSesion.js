var div_contenedor = $(".opciones-accesibilidad");
var avatar_seleccionado = 1;

$(document).ready(function() {
    cargar_opciones_accesibilidad();
});

function cargar_opciones_accesibilidad() {
    var usuario = localStorage.getItem("usuario");
    $("#opciones_iniciar_sesion").remove();

    var div = "";
    if (!usuario) {
        div = "<div class='row' id='opciones_iniciar_sesion' style='margin: 0px;'>" +
            "<div class='col-6' style='padding-left: 10px; padding-right: 10px;'>" +
            "<button onclick='mostrarModalIniciarSesion()' id='btn_iniciar_sesion' class='btn-opcion'>" +
            "<i class='fa fa-user'></i> Iniciar sesión" +
            "</button>" +
            "</div>" +
            "<div class='col-6' style='padding-left: 10px; padding-right: 10px;'>" +
            "<button onclick='mostrarModalRegistrar()' id='btn_registrar' class='btn-opcion'>" +
            "<i class='fa fa-user-plus'></i> Registrarse" +
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

function mostrarModalIniciarSesion() {
    toggleMenuAccesibilidad();
    $('#modalLogin').remove();

    // Crear modal Bootstrap dinámicamente
    const modalHTML = `<div class="modal fade" id="modalLogin" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-body">
                <div style="text-align: center;">
                    <img src="img/logo.png" alt="logo" style="width: 200px; height: auto;">
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
                        <button style="width: 40%;" type="button" onclick="iniciarSesion()" class="btn btn-primary">Iniciar sesión <i class="fa fa-sign-in-alt"></i></button>
                        <button style="width: 40%;" type="button" onclick="cerrarModalIniciarSesion()" class="btn btn-danger">Cerrar <i class="fa fa-times"></i></button>
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

function mostrarModalRegistrar() {
    toggleMenuAccesibilidad();
    $('#modalRegistrar').remove();

    var div_avatar = '';
    for (var i = 1; i <= 35; i++) {
        div_avatar += `<div class="col-lg-1" style="padding: 10px;">
            <div class="avatar_container" onclick="seleccionar_avatar(${i})" id="avatar_${i}">
                <img src="juegos/images/avatars/${i}.png" alt="Avatar ${i}" class="img-fluid">
            </div>
        </div>`;
    }

    const modalHTML = `<div class="modal fade" id="modalRegistrar" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header" style="display: flex;align-items: center;  justify-content: center; padding: 0.5rem; background-color: #184b84;gap: 12px;">
                    <img src="img/isotipo.png" alt="logo" style="width: 50px; height: auto;">
                    <h3 style="font-weight: bold; margin-top: 10px; color: white;">Registrate en Explora</h3>
                </div>
                <div class="modal-body">
                    <form id="formRegistrar">
                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <label style="font-weight: bold;" for="nombre" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="nombre" required placeholder="Nombre: Ej. Juan Perez">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                    <label style="font-weight: bold;" for="usuario" class="form-label">Usuario</label>
                                    <input type="text" class="form-control" id="usuario" required placeholder="Usuario: juan00000">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <label style="font-weight: bold;" for="contrasena" class="form-label">Contraseña</label>
                                    <input type="password" class="form-control" id="contrasena" required placeholder="Contraseña: *********">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-3">
                                        <label style="font-weight: bold;" for="grado" class="form-label">Selecciona tu grado</label>
                                        <select class="form-control" id="grado" required>
                                            <option value="">Selecciona tu grado</option>
                                            <option value="1">1°</option>
                                            <option value="2">2°</option>
                                            <option value="3">3°</option>
                                            <option value="4">4°</option>
                                            <option value="5">5°</option>
                                            <option value="6">6°</option>
                                            <option value="7">7°</option>
                                            <option value="8">8°</option>
                                            <option value="9">9°</option>
                                            <option value="10">10°</option>
                                            <option value="11">11°</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="mb-3">
                                        <label style="font-weight: bold;" for="avatar" class="form-label">Selecciona tu avatar</label>
                                        <div class="row" id="div_avatar" style="margin: 0px; margin-top: 10px; max-height: 370px; overflow-y: auto;">
                                            ${div_avatar}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex; justify-content: center; gap: 10px;">
                                <button style="width: 40%;" type="button" onclick="registrar()" class="btn btn-warning">Registrar <i class="fa fa-user-plus"></i></button>
                                <button style="width: 40%;" type="button" onclick="cerrarModalRegistrar()" class="btn btn-danger">Cerrar <i class="fa fa-times"></i></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`;

    $('body').append(modalHTML);

    const modal = new bootstrap.Modal(document.getElementById('modalRegistrar'));
    modal.show();

    setTimeout(() => {
        seleccionar_avatar(1);
    }, 500);
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
    toggleMenuAccesibilidad();
}

function cerrarModalRegistrar() {
    $('#modalRegistrar').modal('hide');
    $('#modalRegistrar').remove();
    $('.modal-backdrop').remove();
    toggleMenuAccesibilidad();
}

function registrar() {
    var usuario = $("#usuario").val();
    var contrasena = $("#contrasena").val();
    var grado = $("#grado").val();
    var nombre = $("#nombre").val();

   if (usuario == "" || contrasena == "" || grado == "" || nombre == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, ingrese su usuario, contraseña, grado y nombre.',
            timer: 1500,
            showConfirmButton: false,
            allowOutsideClick: false
        });
        return;
    }

    if(usuario.split(' ').length > 1){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario no puede contener espacios    .',
            timer: 1500,
            showConfirmButton: false,
            allowOutsideClick: false
        });
        return;
    }

    var data = {
        usuario: usuario,
        contrasena: contrasena,
        grado: grado,
        nombre: nombre,
        avatar: avatar_seleccionado
    }

    $.ajax({
        url: "mapplic/php/registrar.php",
        type: "POST",
        data: data,
        success: function(response) {
            response = JSON.parse(response);
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: response.mensaje,
                    timer: 1500,
                    showConfirmButton: false
                });
                setTimeout(() => {
                    cerrarModalRegistrar();
                    mostrarModalIniciarSesion();
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
                text: 'Error al registrar el usuario, por favor intente nuevamente.',
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
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
        url: "mapplic/php/iniciarSesion.php",
        type: "POST",
        data: data, 
        success: function(response) {
            response = JSON.parse(response);
            if (response.success) {
                localStorage.setItem("usuario", response.usuario_objeto.usuario);
                localStorage.setItem("grado", response.usuario_objeto.grado);
                localStorage.setItem("nombre", response.usuario_objeto.nombre);
                localStorage.setItem("avatar", response.usuario_objeto.avatar);
                localStorage.setItem("id_usuario", response.usuario_objeto.id);

                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Inicio de sesión exitoso.',
                    timer: 1500,
                    showConfirmButton: false
                });

                cargar_opciones_accesibilidad();

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
            cargar_opciones_accesibilidad();
        }
    });
}

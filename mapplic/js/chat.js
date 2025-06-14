$(document).ready(function () {
    $('#enviar_mensaje').click(function () {
        sendMessage();
    });

    setTimeout(()=>{
        $('.messages')[0].addEventListener('wheel', function(e) {
            e.preventDefault();
            this.scrollTop += e.deltaY;
        }, { passive: false });

        $('#message_input').on('keypress', function(e) {
            if (e.which === 13) { // 13 es el código de la tecla Enter
              e.preventDefault();
              sendMessage();
            }
        });
    }, 1500);
});

function mostrarChat(){
    document.getElementById('circularMenu').classList.toggle('active');
    document.getElementById("chat").style.display = "block";
    setTimeout(()=>{
        document.getElementById("chat").style.right = "0px";
        setTimeout(()=>{
            sendMessage('Hola, ¿En que puedo ayudarte hoy?', 'left');
            document.getElementById("chat").style.zIndex = "1000";
        }, 800)
    }, 100)
}

function minimizarChat(){
    document.getElementById("chat").style.right = "-40%";
    setTimeout(()=>{
        document.getElementById("chat").style.display = "none";
    }, 700)
}

function cerrarChat(){
    document.getElementById("chat").style.right = "-40%";
    setTimeout(()=>{
        document.getElementById("chat").style.display = "none";
        $('.messages').empty();
    }, 700)
}

var numero_mensaje = 0;
function sendMessage(mensaje, posicion_d) {
    var message = '';
    var posicion = 'right';
    var mio = false;

    if(posicion_d != undefined){
        posicion = posicion_d;
    }

    var respuesta = false;
    var avatar = 'img/avatar.png';
    if(mensaje != undefined){
        message = mensaje;
        avatar = 'img/pensando.png';
    }else{
        mio = true;
        message = $('.message_input').val();
        if(message != ''){
            var numero_palabras = message.split(' ').length;
            if(numero_palabras < 2){
                $('.message_input').val('');
                setTimeout(()=>{
                    sendMessage('Hola, en que puedo ayudarte, por favor ingrese su consulta, incluyendo el departamento que desea consultar', 'left');
                    $('.messages').animate({
                        scrollTop: $('.messages')[0].scrollHeight
                    }, 500);
                }, 1000);
            }else{
                $('.message_input').val('');
                respuesta = true;
                avatar = 'img/avatar.png';
            }
        }else{
            sendMessage('Por favor ingrese su consulta', 'left');
            return;
        }
    }
    
    var mensaje_html = '';
    if(mio){
        mensaje_html = '<li id="mensaje_'+numero_mensaje+'" class="message right">'+
            '<div class="avatar"><img src="'+avatar+'" alt="avatar"></div>'+
            '<div class="text_wrapper">'+
                '<div class="text">'+message+'</div>'+
            '</div>'+
        '</li>';

        numero_mensaje++;
    }else{
        mensaje_html = '<li class="message '+posicion+'">'+
            '<div class="avatar"><img src="'+avatar+'" alt="avatar"></div>'+
            '<div class="text_wrapper">'+
                '<div class="text">'+message+'</div>'+
            '</div>'+
        '</li>';
    }

    $('.messages').append(mensaje_html);
    

    if (respuesta){
        setTimeout(()=>{
            pensando();
            setTimeout(()=>{
                buscarRespuesta(message);
            }, 500);
        }, 500);
    }
}

async function buscarRespuesta(mensaje){
    var respuesta = await fetch('mapplic/php/chat.php?cadena='+mensaje, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async function(response){
        var respuesta = await response.json();
        if(respuesta.success){
            $('#pensando').remove();

            if(respuesta.mensaje != null && respuesta.mensaje != undefined){
                sendMessage(respuesta.mensaje.descripcion, 'left');
            }

            if(respuesta.array_list != null && respuesta.array_list != undefined){
                var ul = '<p style="font-weight: bold;">lista de '+mensaje+': </p> <br> <ul>';
                respuesta.array_list.forEach(element => {
                    ul += '<li style="margin-bottom: 20px;"><p style="font-weight: bold; font-size: 15px; margin-bottom: 10px;">'+element.nombre+'</p><p>'+element.contenido+'</p></li>';
                });
                ul += '</ul>';
                sendMessage(ul, 'left');
            }

            setTimeout(()=>{
                $('.messages').animate({
                    scrollTop: $('#mensaje_'+(numero_mensaje-1)).position().top + $('.messages').scrollTop()
                }, 500);
            }, 700);
        }else{
            $('#pensando').remove();
            sendMessage(respuesta.mensaje, 'left');
        }
    })
}

function pensando(){
    var mensaje = '<li id="pensando" class="message left">'+
        '<div class="avatar"><img src="img/pensando.png" alt="avatar"></div>'+
        '<div class="text_wrapper">'+
            '<div class="text">Estoy buscando la respuesta, por favor espere...</div>'+
        '</div>'+
    '</li>';

    $('.messages').append(mensaje);
}

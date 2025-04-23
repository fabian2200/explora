function pantalla_completa(color_si, color_no, font_weight) {
    return new Promise(function(resolve, reject) {
        Swal.fire({
            allowOutsideClick: false,
            title: '',
            html: '<p style="font-size: 18pt; font-weight: '+font_weight+';">Activa el modo pantalla completa para una experiencia de juego épica 🎮</p> <p style="font-size: 18pt; background-color: #0000003b; padding: 10px; border-radius: 10px; font-weight: '+font_weight+';">Para volver a la pantalla normal, presiona la tecla "ESC"</p>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '¡Sí, vamos!',
            cancelButtonText: 'No, gracias',
            confirmButtonColor: color_si, 
            cancelButtonColor: color_no,
            background: '#1e1e2f',
            color: '#fff',
            timerProgressBar: true,
        }).then((result) => {
            if (result.isConfirmed) {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                    resolve(true);
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                    resolve(true);
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                    resolve(true);
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                    resolve(true);
                }
            } else {
                resolve(true);
            }
        });
    });
}

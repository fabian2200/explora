const driver = window.driver.js.driver;
var driverObj = null;

$(document).ready(function() {
    var tutorial_carga = driver({
        popoverClass: 'driverjs-theme',
        showProgress: false,
        prevBtnText: '← Anterior',
        doneBtnText: 'Cerrar ×',
        steps: [
            { element: '#btn_menu_accesibilidad', popover: { title: 'Botón de accesibilidad', description: 'Este botón te permite acceder a las opciones de accesibilidad.' } },
        ]
    });

    setTimeout(() => {
        tutorial_carga.drive();
    }, 3000);

    setTimeout(() => {
        tutorial_carga.destroy();
    }, 5500);
});


function iniciarTour(pagina) {

    var steps = [
        { element: '#btn_aumentar_fuente', popover: { title: 'Botón de aumentar fuente', description: 'Este botón te permite aumentar el tamaño de la fuente.' } },
        { element: '#btn_disminuir_fuente', popover: { title: 'Botón de disminuir fuente', description: 'Este botón te permite disminuir el tamaño de la fuente.' } },
        { element: '#btn_modo_dislexia', popover: { title: 'Botón de modo dislexia', description: 'Este botón te permite activar el modo dislexia.' } },
        { element: '.mapplic-fullscreen-button', popover: { title: 'Boton pantalla completa', description: 'haciendo click en este boton podras ver el mapa en pantalla completa.' } },
        { element: '.mapplic-zoom-buttons', popover: { title: 'Botones de zoom', description: 'haciendo click en estos botones podras aumentar o disminuir el zoom del mapa, tambien puedes hacerlo con el scroll del mouse.' } },
        { element: '#btn_menu_circular', popover: { title: 'Botón de menú', description: 'Este botón te permite acceder al menú circular.' } },
        { element: '#btn_menu_opciones_atlas', popover: { title: 'Botón de opciones del atlas', description: 'Este botón te permite acceder a las opciones del atlas.' } },
        { element: '#btn_menu_juegos', popover: { title: 'Botón de juegos', description: 'Este botón te permite acceder a los juegos.' } },
        { element: '#btn_menu_test', popover: { title: 'Botón de test', description: 'Este botón te permite acceder al test, de el departamento donde te encuentres actualmente.' } },
        { element: '#btn_menu_chat', popover: { title: 'Botón de chat', description: 'Este botón te permite acceder al chat, donde podrás hablar con un boot y hacer preguntas del departamento que desees.' } },
        { element: '#btn_menu_linea_tiempo', popover: { title: 'Botón de línea de tiempo', description: 'Este botón te permite acceder a una página con la línea de tiempo de momentos históricos de Colombia.' } },
        { element: '#btn_menu_viaja_ped', popover: { title: 'Botón de viaja PED', description: 'Este botón te permite acceder a una página con el viaja PED.' } },
    ];

    if(pagina == 'inicio') {
        steps.splice(3,0, { element: '.mapplic-list', popover: { title: 'Lista de sitios de interes', description: 'Menú de sitios de interes, ordenados por categoría para que puedas navegar por ellos.' } });
        steps.splice(4,0, { element: '.mapplic-search-input', popover: { title: 'Buscador de sitios de interes', description: 'Con este buscador puedes filtrar los sitios de interes por nombre, ingresando palabras clave.' } });
    }else if(pagina == 'hidrografia'){
        steps.splice(3,0,{ element: '.mapplic-list', popover: { title: 'Lista de vertientes', description: 'Menú de vertientes, ordenados por categoría para que puedas navegar por ellas.' } });
        steps.splice(4,0,{ element: '.mapplic-search-input', popover: { title: 'Buscador de vertientes', description: 'Con este buscador puedes filtrar las vertientes por nombre, ingresando palabras clave.' } });
    } else if(pagina == 'sistema montañoso'){
        steps.splice(3,0,{ element: '.mapplic-list', popover: { title: 'Lista de Coordilleras y serranías', description: 'Menú de Coordilleras y serranías, ordenados por categoría para que puedas navegar por ellas.' } });
        steps.splice(4,0,{ element: '.mapplic-search-input', popover: { title: 'Buscador de Coordilleras y serranías', description: 'Con este buscador puedes filtrar las Coordilleras o serranías por nombre, ingresando palabras clave.' } });
    } else if(pagina == 'climatico'){
        steps.splice(3,0,{ element: '.mapplic-list', popover: { title: 'Lista de regiones climáticas', description: 'Menú de regiones climáticas, ordenados por categoría para que puedas navegar por ellas.' } });
        steps.splice(4,0,{ element: '.mapplic-search-input', popover: { title: 'Buscador de regiones climáticas', description: 'Con este buscador puedes filtrar las regiones climáticas por nombre, ingresando palabras clave.' } });
    } else if(pagina == 'parques_naturales'){
        steps.splice(3,0,{ element: '.mapplic-list', popover: { title: 'Lista de parques naturales', description: 'Menú de parques naturales, ordenados por categoría para que puedas navegar por ellos.' } });
        steps.splice(4,0,{ element: '.mapplic-search-input', popover: { title: 'Buscador de parques naturales', description: 'Con este buscador puedes filtrar los parques naturales por nombre, ingresando palabras clave.' } });
    } else if(pagina == 'etnias'){
        steps.splice(3,0,{ element: '.mapplic-list', popover: { title: 'Lista de etnias', description: 'Aca puedes ver las etnias de Colombia, para que puedas navegar por ellas.' } });
        steps.splice(4,0,{ element: '.mapplic-search-input', popover: { title: 'Buscador de etnias', description: 'Con este buscador puedes filtrar las etnias por nombre, ingresando palabras clave.' } });
    }

    driverObj = driver({
        popoverClass: 'driverjs-theme',
        onDestroyStarted: () => {
            console.log("Tour finalizado, mi Rey supremo kaiosama.");
            $('#circularMenu').removeClass('active');
            toggleMenuAccesibilidad()
            driverObj.destroy();
        },
        onHighlightStarted: (element, step) => {
            const currentStepIndex = driverObj.getActiveIndex();
            if (currentStepIndex === 7) { 
               $('#circularMenu').addClass('active');
            }
        },
        showProgress: true,
        nextBtnText: 'Siguiente →',
        prevBtnText: '← Anterior',
        doneBtnText: 'Finalizar ×',
        closeBtnText: 'Cerrar ×',
        steps: steps
    });

    setTimeout(() => {
        driverObj.drive();
    }, 100);
}

const gameArea = document.getElementById('gameArea');
const optionsContainer = document.getElementById('optionsContainer');
const categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'));
const categoriesGrid = document.getElementById('categoriesGrid');
const categoryTitle = document.getElementById('categoryTitle');
const nivelModal = new bootstrap.Modal(document.getElementById('nivelModal'));
let draggedItem = null;


// Crear tarjetas de categorías
gameData.categories.forEach(category => {
    const categoryCard = document.createElement('div');
    categoryCard.className = 'col';

    const cardContent = document.createElement('div');
    cardContent.className = 'category-card';

    const img = document.createElement('img');
    img.src = category.mapa;
    img.classList.add('img-categoria');
    cardContent.appendChild(img);

    const nombre = document.createElement('h3');
    nombre.textContent = category.name;
    nombre.classList.add('nombre-categoria');
    cardContent.appendChild(nombre);

    cardContent.addEventListener('click', () => {
        selectCategory(category);
        categoryModal.hide();
    });

    categoryCard.appendChild(cardContent);
    categoriesGrid.appendChild(categoryCard);
});

function selectCategory(category) {
    gameData.currentCategory = category;
    categoryTitle.textContent = category.name;
    nivelModal.show();
}

function selectNivel(nivel) {
    nivelModal.hide();
    iniciarContador(nivel);
    initializeGame();
}

var locations_array = [];

function initializeGame() {
    reproducir_audio_loop();
    // Limpiar área de juego
    gameArea.innerHTML = '';
    optionsContainer.innerHTML = '';

    // Agregar imagen de fondo
    const backgroundImage = document.createElement('img');
    backgroundImage.className = 'background-image';
    backgroundImage.src = gameData.currentCategory.image;
    gameArea.appendChild(backgroundImage);

    locations_array = gameData.currentCategory.locations;
    locations_array = locations_array.sort(() => Math.random() - 0.5);


    var locations_array_2 = locations_array.slice(0, 8);

    // Crear puntos de destino
    locations_array_2.forEach(location => {
        const targetPoint = document.createElement('div');
        targetPoint.className = 'target-point';
        targetPoint.style.left = `${location.x * 100}%`;
        targetPoint.style.top = `${location.y * 100}%`;
        targetPoint.dataset.name = location.name;
        gameArea.appendChild(targetPoint);
    });

    // Crear elementos arrastrables
    const shuffledNames = [...locations_array_2]
        .sort(() => Math.random() - 0.5)
        .map(location => location.name);

    shuffledNames.forEach(name => {
        const draggable = document.createElement('div');
        draggable.className = 'draggable';
        draggable.classList.add('col-6');
        draggable.dataset.name = name;

        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = name;
        div.draggable = true;

        draggable.appendChild(div);

        draggable.addEventListener('dragstart', (e) => {
            draggedItem = draggable;
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            draggedItem = null;
        });

        optionsContainer.appendChild(draggable);
    });
}

// Configurar eventos de arrastrar y soltar
gameArea.addEventListener('dragover', (e) => {
    e.preventDefault();
});

gameArea.addEventListener('drop', (e) => {
    e.preventDefault();
    if (!draggedItem) return;

    const rect = gameArea.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Encontrar el punto más cercano
    let closestPoint = null;
    let minDistance = Infinity;

    locations_array.forEach(location => {
        const distance = Math.sqrt(
            Math.pow(x - location.x, 2) +
            Math.pow(y - location.y, 2)
        );
        if (distance < minDistance) {
            minDistance = distance;
            closestPoint = location;
        }
    });

    // Verificar si la respuesta es correcta
    if (closestPoint && minDistance < 0.1) {
        const targetPoint = document.querySelector(
            `.target-point[data-name="${closestPoint.name}"]`
        );

        if (draggedItem.dataset.name === closestPoint.name) {
            reproducir_audio('../sounds/ok.mp3');

            targetPoint.classList.remove('target-point');
            targetPoint.classList.add('correct');
            targetPoint.classList.remove('incorrect');
            draggedItem.style.display = 'none';

            // Verificar si se completó el juego
            const remainingDraggables = document.querySelectorAll('.draggable:not([style*="display: none"])');
            if (remainingDraggables.length === 0) {
                reproducir_audio('../sounds/victory.mp3');
                setTimeout(() => {
                    Swal.fire({
                        allowOutsideClick: false,
                        title: '¡Felicidades!',
                        text: 'Has completado el juego antes de que se acabe el tiempo.',
                        icon: 'success',
                        confirmButtonText: 'Volver a Jugar',
                        confirmButtonColor: '#34230d',
                        cancelButtonText: 'Salir',
                        showCancelButton: true,
                        cancelButtonColor: '#5a391f',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            resetGame();
                        } else {
                            window.location.href = '../../index.html';
                        }
                    });
                }, 700);
            }
        } else {
            reproducir_audio('../sounds/over.mp3');

            targetPoint.classList.add('incorrect');
            targetPoint.classList.remove('correct');
            setTimeout(() => {
                targetPoint.classList.remove('incorrect');
            }, 500);
        }
    }
});

// Función para crear nubes
function createCloud() {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';

    // Posición vertical aleatoria
    const top = Math.random() * 100; // 0-30% desde arriba
    cloud.style.top = `${top}%`;

    // Dirección aleatoria
    const direction = Math.random() > 0.5 ? 'left' : 'right';
    cloud.style[direction] = '-100px';

    // Velocidad aleatoria
    const speed = 30 + Math.random() * 40; // 30-70 segundos
    cloud.style.animation = `moveCloud${direction} ${speed}s linear`;

    // Tamaño aleatorio
    const size = 70 + Math.random() * 100; // 50-150px
    cloud.style.width = `${size}px`;
    cloud.style.height = `${size * 0.6}px`;

    document.body.appendChild(cloud);

    // Eliminar la nube después de que termine su animación
    cloud.addEventListener('animationend', () => {
        cloud.remove();
    });
}

// Crear nubes periódicamente
setInterval(createCloud, 3000); // Nueva nube cada 3 segundos


function resetGame() {
    window.location.reload(1);
}


const elem = document.getElementById('gameArea')
const panzoom = Panzoom(elem, {
    minScale: 1,
    maxScale: 5,
    contain: 'outside',
    startScale: 1,
})

$(document).ready(function () {
    pantalla_completa('#34230d', '#5a391f').then(function (result) {
        // Mostrar modal de categorías al cargar
        categoryModal.show();
    });

    document.getElementById('contenedorGameArea').addEventListener('wheel', panzoom.zoomWithWheel);

    panzoom.on('pan', function (e) {
        const scale = panzoom.getScale();
        const pan = panzoom.getPan();

        const containerRect = contenedor.getBoundingClientRect();
        const contentWidth = gameArea.offsetWidth * scale;
        const contentHeight = gameArea.offsetHeight * scale;

        const maxX = 0;
        const maxY = 0;
        const minX = containerRect.width - contentWidth;
        const minY = containerRect.height - contentHeight;

        let x = Math.min(maxX, Math.max(minX, pan.x));
        let y = Math.min(maxY, Math.max(minY, pan.y));

        // Solo corregir si se sale
        if (x !== pan.x || y !== pan.y) {
            panzoom.pan(x, y, { animate: false });
        }
    })
});


const zoomStep = 0.2;
const panStep = 50;

// Botones de zoom
document.getElementById('zoomIn').addEventListener('click', () => {
    panzoom.zoomIn({ animate: true });
});

document.getElementById('zoomOut').addEventListener('click', () => {
    panzoom.zoomOut({ animate: true });
});

// Botones de dirección
document.getElementById('panUp').addEventListener('click', () => {
    const pan = panzoom.getPan();
    panzoom.pan(pan.x, pan.y + panStep, { animate: true });
});

document.getElementById('panDown').addEventListener('click', () => {
    const pan = panzoom.getPan();
    panzoom.pan(pan.x, pan.y - panStep, { animate: true });
});

document.getElementById('panLeft').addEventListener('click', () => {
    const pan = panzoom.getPan();
    panzoom.pan(pan.x + panStep, pan.y, { animate: true });
});

document.getElementById('panRight').addEventListener('click', () => {
    const pan = panzoom.getPan();
    panzoom.pan(pan.x - panStep, pan.y, { animate: true });
});


var audio_nave = document.createElement('audio');
function reproducir_audio_loop() {
    audio_nave.pause();
    audio_nave.src = '../sounds/fondo_arrastra.mp3';
    audio_nave.loop = true;
    audio_nave.volume = 0.09;
    audio_nave.play();
}

function reproducir_audio(ruta) {
    var audio = document.createElement('audio');
    audio.pause();
    audio.src = ruta;
    audio.volume = 0.29;
    audio.play();
}

var minuto_inicial = 5;
var segundo_inicial = 0;

function iniciarContador(minutos) {
    let tiempo = minutos * 60;

    const intervalo = setInterval(() => {
        const min = String(Math.floor(tiempo / 60)).padStart(2, '0');
        const seg = String(tiempo % 60).padStart(2, '0');
        var tiempo_actual = `${min}:${seg}`;
        document.getElementById('contador').innerHTML = tiempo_actual;
        tiempo--;
        
        if (tiempo < 0) {
            reproducir_audio('../sounds/game_over.mp3');
            clearInterval(intervalo);

            Swal.fire({
                title: '¡Opps, se ha acabado el tiempo!',
                text: '¿Quieres volver a intentarlo?',
                icon: 'error',
                confirmButtonText: 'Si, jugar',
                confirmButtonColor: '#34230d',
                cancelButtonText: 'No, salir',
                showCancelButton: true,
                cancelButtonColor: '#5a391f',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    resetGame();
                } else {
                    window.location.href = '../../index.html';
                }
            });
        }
    }, 1000);
}
// Inicializar AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: false,
    offset: 100,
    delay: 100,
    easing: 'ease-in-out',
    anchorPlacement: 'top-bottom'
});

// Función para crear asteroides
function createAsteroids(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const asteroid = document.createElement('div');
        asteroid.className = 'asteroid';
        
        // Posición aleatoria
        const top = Math.random() * 100;
        const delay = Math.random() * 15;
        
        asteroid.style.top = `${top}%`;
        asteroid.style.animationDelay = `${delay}s`;
        
        // Tamaño aleatorio
        const size = 10 + Math.random() * 20;
        asteroid.style.width = `${size}px`;
        asteroid.style.height = `${size}px`;
        
        container.appendChild(asteroid);
    }
}

// Función para mostrar elementos cuando están en el viewport
function showElementsOnScroll() {
    const planetCards = document.querySelectorAll('.planet-card');
    const planetDescriptions = document.querySelectorAll('.planet-description');
    
    planetCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (isVisible) {
            setTimeout(() => {
                card.classList.add('visible');
                
                // Mostrar la descripción después del planeta
                if (planetDescriptions[index]) {
                    setTimeout(() => {
                        planetDescriptions[index].classList.add('visible');
                    }, 300);
                }
            }, index * 500); // Retraso secuencial para cada planeta
        } else {
            card.classList.remove('visible');
            if (planetDescriptions[index]) {
                planetDescriptions[index].classList.remove('visible');
            }
        }
    });
}


function verificarScrollFinal() {
    const totalHeight = document.documentElement.scrollHeight;
    const currentPosition = window.innerHeight + window.scrollY;
    var final = currentPosition >= (totalHeight - 200);
    var puzzlePieces = document.querySelectorAll('.puzzle-piece');

    if(final){
        puzzlePieces[0].style.cssText = 'transform: translate(-60px, -30px) !important;';
        puzzlePieces[1].style.cssText = 'transform: translate(0px, -30px) !important;';
        puzzlePieces[2].style.cssText = 'transform: translate(60px, -30px) !important;';
        puzzlePieces[3].style.cssText = 'transform: translate(-60px, 30px) !important;';
        puzzlePieces[4].style.cssText = 'transform: translate(0px, 30px) !important;';
        puzzlePieces[5].style.cssText = 'transform: translate(60px, 30px) !important;';
        setTimeout(() => {
            document.querySelectorAll('div.puzzle-piece').forEach(div => {
                div.classList.remove('no-action');
              });
        }, 1000);
    }else{
        puzzlePieces[0].style.cssText = 'transform: translate(0px, 0px) !important;';
        puzzlePieces[1].style.cssText = 'transform: translate(0px, 0px) !important;';
        puzzlePieces[2].style.cssText = 'transform: translate(0px, 0px) !important;';
        puzzlePieces[3].style.cssText = 'transform: translate(0px, 0px) !important;';
        puzzlePieces[4].style.cssText = 'transform: translate(0px, 0px) !important;';
        puzzlePieces[5].style.cssText = 'transform: translate(0px, 0px) !important;';

        setTimeout(() => {
            document.querySelectorAll('div.puzzle-piece').forEach(div => {
                div.classList.add('no-action');
              });
        }, 1000);
    }

}   

// Evento de scroll para mostrar el rompecabezas
let scrollTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        verificarScrollFinal(); // Se ejecuta una vez al terminar el scroll
    }, 200); // espera 200ms sin scroll para asumir que se terminó
});
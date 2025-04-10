// Función para generar un número aleatorio entre min y max
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Función para inicializar las posiciones de las nubes
function initializeClouds() {
    const clouds = document.querySelectorAll('.cloud');
    
    clouds.forEach(cloud => {
        // Posición vertical aleatoria entre 0% y 80%
        const topPosition = getRandomNumber(0, 80);
        
        // Decidir si la nube aparecerá en el centro o en los bordes
        const startInCenter = Math.random() > 0.5;
        
        let leftPosition;
        let isReverse;
        
        if (startInCenter) {
            // Posición horizontal aleatoria entre 10% y 90%
            leftPosition = getRandomNumber(10, 90);
            // Dirección aleatoria
            isReverse = Math.random() > 0.5;
        } else {
            // Posición en los bordes
            isReverse = Math.random() > 0.5;
            leftPosition = isReverse ? 100 : -20;
        }
        
        cloud.style.top = `${topPosition}%`;
        cloud.style.left = `${leftPosition}%`;
        
        // Velocidad aleatoria para cada nube
        const duration = getRandomNumber(20, 40);
        cloud.style.animationDuration = `${duration}s`;
        
        // Asignar la dirección de la animación
        cloud.style.animationName = isReverse ? 'float-reverse' : 'float';
    });
}

// Inicializar las nubes cuando el documento esté listo
document.addEventListener('DOMContentLoaded', initializeClouds);

// Reiniciar las posiciones de las nubes cuando terminen su animación
document.querySelectorAll('.cloud').forEach(cloud => {
    cloud.addEventListener('animationend', () => {
        const topPosition = getRandomNumber(0, 80);
        const startInCenter = Math.random() > 0.5;
        
        let leftPosition;
        let isReverse;
        
        if (startInCenter) {
            // Posición horizontal aleatoria entre 10% y 90%
            leftPosition = getRandomNumber(10, 90);
            // Dirección aleatoria
            isReverse = Math.random() > 0.5;
        } else {
            // Posición en los bordes
            isReverse = Math.random() > 0.5;
            leftPosition = isReverse ? 100 : -20;
        }
        
        cloud.style.top = `${topPosition}%`;
        cloud.style.left = `${leftPosition}%`;
        
        // Cambiar la dirección aleatoriamente al reiniciar
        cloud.style.animationName = isReverse ? 'float-reverse' : 'float';
    });
}); 
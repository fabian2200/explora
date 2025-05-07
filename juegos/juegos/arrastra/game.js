document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const optionsContainer = document.getElementById('optionsContainer');
    const categoryModal = new bootstrap.Modal(document.getElementById('categoryModal'));
    const categoriesGrid = document.getElementById('categoriesGrid');
    const categoryTitle = document.getElementById('categoryTitle');
    let draggedItem = null;

    // Mostrar modal de categorías al cargar
    categoryModal.show();

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
        initializeGame();
    }

    function initializeGame() {
        // Limpiar área de juego
        gameArea.innerHTML = '';
        optionsContainer.innerHTML = '';

        // Agregar imagen de fondo
        const backgroundImage = document.createElement('img');
        backgroundImage.className = 'background-image';
        backgroundImage.src = gameData.currentCategory.image;
        gameArea.appendChild(backgroundImage);

        // Crear puntos de destino
        gameData.currentCategory.locations.forEach(location => {
            const targetPoint = document.createElement('div');
            targetPoint.className = 'target-point';
            targetPoint.style.left = `${location.x * 100}%`;
            targetPoint.style.top = `${location.y * 100}%`;
            targetPoint.dataset.name = location.name;
            gameArea.appendChild(targetPoint);
        });

        // Crear elementos arrastrables
        const shuffledNames = [...gameData.currentCategory.locations]
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

        gameData.currentCategory.locations.forEach(location => {
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
                targetPoint.classList.add('correct');
                targetPoint.classList.remove('incorrect');
                draggedItem.style.display = 'none';

                // Verificar si se completó el juego
                const remainingDraggables = document.querySelectorAll('.draggable:not([style*="display: none"])');
                if (remainingDraggables.length === 0) {
                    setTimeout(() => {
                        alert('¡Felicidades! Has completado el juego.');
                    }, 500);
                }
            } else {
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

 
});

function resetGame() {
    location.reload();
}
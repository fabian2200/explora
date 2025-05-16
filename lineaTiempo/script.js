// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Variables globales
let eventosData = [];
let modalOpen = false;

// Función para cargar los datos del JSON
async function cargarDatos() {
    try {
        console.log('Intentando cargar datos desde eventos.json...');
        const response = await fetch('eventos.json');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const datos = await response.json();
        console.log('Datos cargados correctamente:', datos);
        eventosData = datos;
        return datos;
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        mostrarError('Error al cargar los datos. Por favor, recarga la página.');
        return [];
    }
}

// Función para manejar errores de carga de imágenes
function handleImageError(img) {
    img.onerror = null; // Prevenir bucle infinito
    img.src = 'img/placeholder.jpg'; // Imagen por defecto
    console.warn('Error al cargar la imagen:', img.src);
}

// Función para crear el HTML de un evento
function crearEventoHTML(evento, periodoIndex, eventoIndex) {
    //mostrar solo una aprte del texto y poner puntos suspensivos sin slice
    let textoPlano = evento.descripcion.replace(/<[^>]*>/g, ''); // elimina etiquetas HTML
    let descripcion = textoPlano.substring(0, 200) + '...';
    //validar si la imagen existe
    if (evento.imagen) {
        return `
        <div class="evento" data-periodo-index="${periodoIndex}" data-evento-index="${eventoIndex}">
            <img src="${evento.imagen}" 
                alt="${evento.titulo}" 
                class="evento-imagen"
                onerror="handleImageError(this)">
            <div class="evento-contenido">
                <div class="evento-etiqueta" style="background-color: ${evento.color}">${evento.titulo}</div>
                <div class="evento-fecha">${evento.fecha}</div>
                <p class="evento-descripcion">${descripcion}</p>
                <div class="evento-fuente">Fuente: ${evento.fuente}</div>
            </div>
        </div>
    `;
    } else {
        return `
        <div class="evento" data-periodo-index="${periodoIndex}" data-evento-index="${eventoIndex}">
            <div class="evento-contenido">
                <div class="evento-etiqueta" style="background-color: ${evento.color}">${evento.titulo}</div>
                <div class="evento-fecha">${evento.fecha}</div>
                <p class="evento-descripcion">${descripcion}</p>
                <div class="evento-fuente">Fuente: ${evento.fuente}</div>
            </div>
        </div>
    `;
}
}

// Función para crear el HTML de un período
function crearPeriodoHTML(periodo, periodoIndex) {
    return `
        <div class="periodo" data-periodo-index="${periodoIndex}">
            <div class="periodo-header">
                <h2>${periodo.periodo}</h2>
                <div class="rango-fecha">${periodo.rango_fecha}</div>
            </div>
            <div class="eventos-container">
                ${periodo.eventos.map((evento, eventoIndex) => 
                    crearEventoHTML(evento, periodoIndex, eventoIndex)
                ).join('')}
            </div>
        </div>
    `;
}

// Función para abrir el modal
function abrirModal(periodoIndex, eventoIndex) {
    const evento = eventosData[periodoIndex].eventos[eventoIndex];
    const periodo = eventosData[periodoIndex].periodo;
    
    const modalContent = document.getElementById('modalContent');
    //validar si la imagen existe
    if (evento.imagen) {
        modalContent.innerHTML = `
            <img src="${evento.imagen}" 
                alt="${evento.titulo}" 
            class="modal-imagen"
            onerror="handleImageError(this)">
        <div class="modal-parallax-bg" style="background-image: url(${evento.imagen})"></div>
        <div class="modal-info">
            <div class="modal-date">${evento.fecha} - ${periodo}</div>
            <h2>${evento.titulo}</h2>
            <div class="modal-description">${evento.descripcion}</div>
            <div class="modal-source">Fuente: ${evento.fuente}</div>
        </div>
    `;
    } else {
        modalContent.innerHTML = `
            <div class="modal-info">
                <h2>${evento.titulo}</h2>
                <div class="modal-description">${evento.descripcion}</div>
                <div class="modal-source">Fuente: ${evento.fuente}</div>
    `;
    }
    
    document.getElementById('modalOverlay').classList.add('active');
    modalOpen = true;
    inicializarParallax();
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    modalOpen = false;
}

// Función para inicializar el efecto parallax
function inicializarParallax() {
    const modalContent = document.getElementById('modalContent');
    const parallaxBg = modalContent.querySelector('.modal-parallax-bg');
    
    if (parallaxBg) {
        modalContent.addEventListener('scroll', function() {
            const scrollTop = this.scrollTop;
            parallaxBg.style.transform = `translateY(${scrollTop * 0.5}px)`;
        });
    }
}

// Función para inicializar los efectos de parallax
function inicializarParallaxEfectos() {
    // Efecto parallax para el patrón de fondo
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const pattern = document.querySelector('.pattern-overlay');
        if (pattern) {
            pattern.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Efecto parallax para los eventos
    gsap.utils.toArray('.evento').forEach(evento => {
        const imagen = evento.querySelector('.evento-imagen');
        if (imagen) {
            ScrollTrigger.create({
                trigger: evento,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                }
            });
        }
    });
}

// Función para inicializar las animaciones
function inicializarAnimaciones() {
    console.log('Inicializando animaciones...');
    
    // Animación para el patrón de fondo
    gsap.from('.pattern-overlay', {
        opacity: 0,
        duration: 2,
        ease: 'power2.inOut'
    });

    // Animación para los períodos
    gsap.utils.toArray('.periodo').forEach((periodo, i) => {
        gsap.from(periodo, {
            scrollTrigger: {
                trigger: periodo,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.2
        });

        // Animación para el patrón del período
        gsap.from(periodo.querySelector('.periodo-header'), {
            scrollTrigger: {
                trigger: periodo,
                start: "top 80%",
                end: "top 20%",
                toggleActions: "play none none reverse"
            },
            backgroundPosition: '200px 0',
            opacity: 0,
            duration: 1.5,
            ease: 'power2.out'
        });
    });

    // Animación mejorada para los eventos
    gsap.utils.toArray('.evento').forEach((evento, i) => {
        const isEven = i % 2 === 0;
        gsap.from(evento, {
            scrollTrigger: {
                trigger: evento,
                start: "top 85%",
                end: "top 15%",
                toggleActions: "play none none reverse"
            },
            x: isEven ? 100 : -100,
            y: 30,
            rotation: isEven ? 5 : -5,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            delay: i * 0.1
        });
    });
}

// Función para mostrar un mensaje de error
function mostrarError(mensaje) {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-triangle"></i>
            ${mensaje}
        </div>
    `;
}

// Función para inicializar los event listeners
function inicializarEventListeners() {
    document.getElementById('modalClose').addEventListener('click', cerrarModal);
    
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            cerrarModal();
        }
    });
    
    document.addEventListener('click', function(e) {
        const evento = e.target.closest('.evento');
        if (evento) {
            const periodoIndex = parseInt(evento.dataset.periodoIndex);
            const eventoIndex = parseInt(evento.dataset.eventoIndex);
            abrirModal(periodoIndex, eventoIndex);
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOpen) {
            cerrarModal();
        }
    });
}

// Funciones para la navegación
function inicializarNavegacion() {
    const goTopButton = document.getElementById('goTop');
    const toggleMenuButton = document.getElementById('toggleMenu');
    const navMenu = document.getElementById('navMenu');
    const navMenuList = document.getElementById('navMenuList');

    // Mostrar/ocultar botón de ir arriba
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            goTopButton.classList.add('visible');
        } else {
            goTopButton.classList.remove('visible');
        }
    });

    // Función ir arriba
    goTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Toggle menú de navegación
    toggleMenuButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !toggleMenuButton.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Función para generar el menú de navegación
function generarMenuNavegacion(datos) {
    const navMenuList = document.getElementById('navMenuList');
    navMenuList.innerHTML = '';

    datos.forEach((periodo, periodoIndex) => {
        // Agregar título del período
        const periodoItem = document.createElement('li');
        periodoItem.className = 'nav-menu-item';
        periodoItem.innerHTML = `
            <i class="fas fa-clock"></i>
            ${periodo.periodo}
        `;
        periodoItem.addEventListener('click', () => {
            const periodoElement = document.querySelector(`[data-periodo-index="${periodoIndex}"]`);
            if (periodoElement) {
                periodoElement.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('navMenu').classList.remove('active');
            }
        });
        navMenuList.appendChild(periodoItem);

        // Agregar eventos del período
        periodo.eventos.forEach((evento, eventoIndex) => {
            const eventoItem = document.createElement('li');
            eventoItem.className = 'nav-menu-item';
            eventoItem.style.paddingLeft = '30px';
            eventoItem.innerHTML = `
                <i class="fas fa-circle-dot"></i>
                ${evento.titulo}
            `;
            eventoItem.addEventListener('click', () => {
                const eventoElement = document.querySelector(`[data-periodo-index="${periodoIndex}"] [data-evento-index="${eventoIndex}"]`);
                if (eventoElement) {
                    eventoElement.scrollIntoView({ behavior: 'smooth' });
                    document.getElementById('navMenu').classList.remove('active');
                }
            });
            navMenuList.appendChild(eventoItem);
        });
    });
}

// Función para manejar el header fijo
function inicializarHeaderFijo() {
    const header = document.querySelector('.timeline-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Agregar clase cuando se hace scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Ocultar/mostrar header según dirección del scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// Función principal para inicializar la línea de tiempo
async function inicializarTimeline() {
    console.log('Inicializando timeline...');
    const timeline = document.getElementById('timeline');
    
    if (!timeline) {
        console.error('No se encontró el elemento con id "timeline"');
        return;
    }
    
    try {
        const datos = await cargarDatos();
        
        if (datos && datos.length > 0) {
            timeline.innerHTML = datos.map((periodo, index) => 
                crearPeriodoHTML(periodo, index)
            ).join('');
            
            inicializarEventListeners();
            inicializarParallaxEfectos();
            inicializarNavegacion();
            inicializarHeaderFijo(); // Inicializar el header fijo
            generarMenuNavegacion(datos);
            setTimeout(inicializarAnimaciones, 100);
        } else {
            mostrarError('No hay eventos para mostrar en la línea de tiempo.');
        }
    } catch (error) {
        console.error('Error al inicializar la línea de tiempo:', error);
        mostrarError('Ocurrió un error al cargar la línea de tiempo.');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarTimeline); 
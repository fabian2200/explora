document.addEventListener("DOMContentLoaded", () => {
  const eraItems = document.querySelectorAll(".era-item");
  const machine = document.querySelector(".machine");
  const container = document.querySelector(".container");
  const erasSection = document.querySelector(".eras-section");
  const machineContainer = document.querySelector(".machine-container");
  const headerContainer = document.querySelector(".header-container");
  const headerButton = document.querySelector(".header-button");
  const background = document.querySelector(".background-container");
  const headerTitle = document.getElementById("header-title");
  headerButton.style.display = "none";
  let eraData = [];

  // Obtener las dimensiones del contenedor
  const containerRect = container.getBoundingClientRect();

  // Posición inicial de la máquina (centro de la pantalla)
  let machineX = containerRect.width / 2 - 40;
  let machineY = containerRect.height / 2 - 40;

  // Variables para el movimiento continuo
  let targetX = machineX;
  let targetY = machineY;
  let speed = 3; // Velocidad de movimiento en píxeles por frame
  let isMovingToCenter = false; // Indica si la máquina se está moviendo hacia el centro
  let isMoving = true; // Indica si la máquina debe seguir moviéndose

  // Variables para control del tamaño de fuente
  let fontSize = 20; // Tamaño base de la fuente
  const MIN_FONT_SIZE = 12;
  const MAX_FONT_SIZE = 32;

  // Función para mover la máquina a una posición específica
  function moveMachineTo(x, y) {
    machineX = x;
    machineY = y;
    machine.style.left = `${machineX}px`;
    machine.style.top = `${machineY}px`;
  }

  headerButton.addEventListener("click", () => {
    background.style.zIndex = "-1";
    background.style.display = "none";
    currentEra = null;
    headerTitle.innerHTML = "Viaja y explora el tiempo";
    document.body.style.backgroundImage = "url(img/fondo.png)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    headerButton.style.display = "none";

    // Ocultar las secciones de detalles y mostrar la máquina
    eraDetailsSection.style.display = "none";
    machineContainer.style.display = "flex";

    // Mostrar el túnel del tiempo
    timeTunnelContainer.style.display = "flex";
    timeTunnelContainer.style.opacity = "0";

    // Animar la aparición del túnel
    let opacity = 0;
    const fadeInInterval = setInterval(() => {
      opacity += 0.1;
      timeTunnelContainer.style.opacity = opacity;

      if (opacity >= 0.9) {
        clearInterval(fadeInInterval);

        // Después de mostrar el túnel, mover la máquina al centro
        const centerPosition = getCenterPosition();
        setTarget(centerPosition.x, centerPosition.y, true);
        isMoving = true;

        machine.style.position = "absolute";
        machine.style.zIndex = "10";
        machine.style.transition = "none"; // Eliminar cualquier transición que pueda interferir
        headerContainer.style.display = "none";

        const fondoPrevio = document.querySelector(".background-container");
        if (fondoPrevio) fondoPrevio.remove();

        //eliminar svg-container si existe
        const svgContainer = document.querySelector("#svg-container");
        if (svgContainer) svgContainer.remove();

        // Después de un tiempo, ocultar el túnel y mostrar las eras
        setTimeout(() => {
          // Animar la desaparición del túnel

          let tunnelOpacity = 0.9;

          const fadeOutInterval = setInterval(() => {
            tunnelOpacity -= 0.1;
            timeTunnelContainer.style.opacity = tunnelOpacity;

            if (tunnelOpacity <= 0) {
              clearInterval(fadeOutInterval);
              timeTunnelContainer.style.display = "none";
              machine.style.scale = "0.3";
              machine.style.transition = "scale 1s ease-in-out";
              // Mostrar las eras
              erasSection.style.display = "flex";
              erasSection.style.opacity = "0";

              // Animar la aparición de las eras
              let erasOpacity = 0;
              const erasFadeInInterval = setInterval(() => {
                erasOpacity += 0.1;
                erasSection.style.opacity = erasOpacity;
                headerContainer.style.display = "flex";
                if (erasOpacity >= 1) {
                  clearInterval(erasFadeInInterval);

                  // Reactivar el movimiento de la máquina
                  isMovingToCenter = false;
                  isMoving = true;
                  updateMachinePosition(); // Establecer un objetivo aleatorio para que la máquina se mueva
                }
              }, 50);
            }
          }, 50);
        }, 5000);
      }
    }, 50);
  });

  function cargarElementos(imgPng, imgSvg, elementos, descriptionElementos) {
    // Eliminar fondo anterior si existe
    const fondoPrevio = document.querySelector(".background-container");
    if (fondoPrevio) fondoPrevio.remove();

    //eliminar svg-container si existe
    const svgContainer = document.querySelector("#svg-container");
    if (svgContainer) svgContainer.remove();

    // Crear el contenedor del fondo
    const backgroundContainer = document.createElement("div");
    backgroundContainer.classList.add("background-container");
    backgroundContainer.style.position = "fixed";
    backgroundContainer.style.top = "0";
    backgroundContainer.style.left = "0";
    backgroundContainer.style.width = "100vw";
    backgroundContainer.style.height = "100vh";
    backgroundContainer.style.zIndex = "-1";
    backgroundContainer.style.backgroundImage = `url(${imgPng})`;
    backgroundContainer.style.backgroundSize = "cover";
    backgroundContainer.style.backgroundPosition = "center";
    backgroundContainer.style.backgroundRepeat = "no-repeat";
    backgroundContainer.style.zIndex = "-10";

    document.body.appendChild(backgroundContainer);

    // Cargar el SVG como documento interactivo
    fetch(imgSvg)
      .then((response) => response.text())
      .then((svgText) => {
        const svgContainer = document.createElement("div");
        //agregar id a svgContainer
        svgContainer.id = "svg-container";
        svgContainer.style.position = "absolute";
        svgContainer.style.top = "0";
        svgContainer.style.left = "0";
        svgContainer.style.width = "100%";
        svgContainer.style.height = "100%";
        svgContainer.style.overflow = "hidden";
        svgContainer.innerHTML = svgText;
        svgContainer.style.zIndex = "0";

        document.body.appendChild(svgContainer);

        const svgElement = svgContainer.querySelector("svg");
        if (svgElement) {
          svgElement.setAttribute("width", "100%");
          svgElement.setAttribute("height", "100%");
          svgElement.setAttribute("preserveAspectRatio", "xMidYMid slice");

          // Activar interacciones
          interactuarConElementosSVG(
            svgElement,
            elementos,
            descriptionElementos
          );
        }
      });
  }

  function interactuarConElementosSVG(
    svgElement,
    elementos,
    descriptionElementos
  ) {
    const tooltip = document.getElementById("tooltip");

    elementos.forEach(({ id, texto }) => {
      const el = svgElement.querySelector(`#${id}`);
      if (el) {
        // Asegurar que el elemento sea interactivo
        el.setAttribute("fill", "transparent");
        el.setAttribute("stroke", "transparent");
        el.setAttribute("stroke-width", "0");
        el.setAttribute("pointer-events", "all");
        el.style.cursor = "pointer";
        el.classList.add("resaltado");

        // Mostrar tooltip al pasar el mouse
        el.addEventListener("mouseenter", (e) => {
          tooltip.textContent = texto;
          const rect = svgElement.getBoundingClientRect();
          tooltip.style.left = `${e.clientX - rect.left}px`;
          tooltip.style.top = `${e.clientY - rect.top - 40}px`; // 30px arriba del cursor
          tooltip.style.display = "block";
        });

        // Actualizar posición del tooltip si se mueve el mouse
        el.addEventListener("mousemove", (e) => {
          const rect = svgElement.getBoundingClientRect();
          tooltip.style.left = `${e.clientX - rect.left}px`;
          tooltip.style.top = `${e.clientY - rect.top - 70}px`;
        });

        el.addEventListener("mouseleave", () => {
          tooltip.style.display = "none";
        });

        // Abrir modal al hacer click
        el.addEventListener("click", () => {
          el.classList.add("resaltado");
          const modal = document.getElementById("element-modal");
          const modalTitle = document.getElementById("modal-title");
          const modalContent = document.getElementById("modal-content");
          modalTitle.textContent = texto;

          let contentHTML = "";
          contentHTML += `<p>${descriptionElementos[id]}</p>`;

          modalContent.innerHTML = contentHTML;
          modal.style.display = "block";

          updateFontSize(fontSize);
        });
      }
    });
  }

  // Función para establecer un objetivo para el movimiento continuo
  function setTarget(x, y, isCenter = false) {
    targetX = x;
    targetY = y;
    isMovingToCenter = isCenter;
  }

  // Posicionar la máquina inicialmente
  moveMachineTo(machineX, machineY);

  // Función para obtener la posición de un elemento
  function cargarImagen(element) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - 40, // Centrar la máquina en el elemento
      y: rect.top + rect.height / 2 - 40,
    };
  }

  // Función para obtener la posición del centro de la pantalla
  function getCenterPosition() {
    return {
      x: containerRect.width / 2 - 40,
      y: containerRect.height / 2 - 40,
    };
  }

  // Función para obtener una posición aleatoria en toda la pantalla
  function getRandomPosition() {
    // Generar una posición aleatoria dentro del contenedor
    const randomX = Math.random() * (containerRect.width - 80); // 80 es el ancho de la máquina
    const randomY = Math.random() * (containerRect.height - 80); // 80 es el alto de la máquina

    return {
      x: randomX,
      y: randomY,
    };
  }

  // Función para establecer un objetivo aleatorio
  function setRandomTarget() {
    const randomPosition = getRandomPosition();
    setTarget(randomPosition.x, randomPosition.y);
    isMoving = true; // Asegurarse de que la máquina se mueva
  }

  // Establecer un objetivo inicial aleatorio
  const initialPosition = getRandomPosition();
  setTarget(initialPosition.x, initialPosition.y);

  // Referencias a los elementos del túnel del tiempo y detalles
  const timeTunnelContainer = document.querySelector(".time-tunnel-container");
  const eraDetailsSection = document.querySelector(".era-details-section");

  // Función para mostrar el túnel del tiempo
  function showTimeTunnel() {
    console.log("Mostrando túnel del tiempo");

    //MUESTRA EL TUNEL DEL TIEMPO progresivamente
    let opacity = 0;
    for (let i = 0; i < 10; i++) {
      opacity += 0.1;
      timeTunnelContainer.style.opacity = opacity;

      if (opacity >= 0.9) {
        timeTunnelContainer.style.display = "flex";
        erasSection.style.display = "none";
        headerContainer.style.display = "none";
      }
    }

    setTimeout(() => {
      timeTunnelContainer.style.display = "none";
      showEraDetails(currentEra);
    }, 10000);
  }

  // Función para mostrar los detalles de la era
  function showEraDetails(eraId) {
    console.log("Mostrando detalles de la era:", eraId);
    //buscar la era en el array eraData

    // Datos de las eras históricas
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "data.json", true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        eraData = JSON.parse(this.responseText);
        console.log(eraId)
        //buscar la era en el array eraData no tenfo que ser por id
        const era = eraData[0][eraId];

        cargarElementos(
          era.image,
          era.image2,
          era.elementos,
          era.descriptionElementos
        );

        // Actualizar el contenido de los detalles
        document.querySelector(".era-title").textContent = era.title;

        eraDetailsSection.style.display = "block";
        background.style.display = "block";
        machineContainer.style.display = "none";

        // Hacer scroll hasta la sección de detalles
        document.getElementById("header-title").innerHTML = era.title;
        headerButton.style.backgroundImage = `url(${era.btn_atras})`;
      }
    };

    headerContainer.style.display = "flex";
    headerButton.style.display = "flex";
  }

  // Variable para almacenar la era actual
  let currentEra = null;

  // Añadir evento de clic a cada era
  eraItems.forEach((item) => {
    item.addEventListener("click", () => {
      currentEra = item.getAttribute("data-era");
      console.log("Era seleccionada:", currentEra);
      const centerPosition = getCenterPosition();
      setTarget(centerPosition.x, centerPosition.y, true);
      isMoving = true; // Asegurarse de que la máquina se mueva
    });
  });

  // Función para actualizar la posición de la máquina en cada frame
  function updateMachinePosition() {
    // Si la máquina no debe moverse, no hacer nada

    if (!isMoving) {
      return;
    }

    // Calcular la dirección hacia el objetivo
    const dx = targetX - machineX;
    const dy = targetY - machineY;

    // Calcular la distancia al objetivo
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Si estamos lo suficientemente cerca del objetivo
    if (distance < 5) {
      // Si estábamos moviéndose hacia el centro, detener el movimiento y mostrar el túnel
      if (isMovingToCenter) {
        isMoving = false; // Detener completamente el movimiento
        console.log("La máquina ha llegado al centro y se ha detenido");
        machine.style.scale = "1.4";
        machine.style.marginTop = "0px";
        machine.style.transition = "scale 0.5s ease-in-out";
        machine.style.animation = "vueloEspacial 0.5s ease-in-out infinite";
        //DESAPARECE LA SECCION DE LAS ERAS PROGRESIVAMENTE DISMINUYENDO SU OPACIDAD
        let opacity = 1;
        for (let i = 0; i < 10; i++) {
          opacity -= 0.1;
          erasSection.style.opacity = opacity;
          if (opacity <= 0) {
            erasSection.style.display = "none";
          }
        }

        //MUESTRA EL TUNEL DEL TIEMPO
        setTimeout(() => {
          showTimeTunnel();
        }, 500);
      } else {
        // Si no estábamos moviéndose hacia el centro, establecer un nuevo objetivo aleatorio
        setRandomTarget();
      }
    }

    // Mover la máquina hacia el objetivo
    if (distance > 0) {
      // Ajustar la velocidad según si se está moviendo hacia el centro o no
      const currentSpeed = isMovingToCenter ? speed * 1.5 : speed;

      const moveX = (dx / distance) * currentSpeed;
      const moveY = (dy / distance) * currentSpeed;

      machineX += moveX;
      machineY += moveY;

      // Asegurarse de que la máquina no se salga del contenedor
      machineX = Math.max(0, Math.min(containerRect.width - 80, machineX));
      machineY = Math.max(0, Math.min(containerRect.height - 80, machineY));

      machine.style.left = `${machineX}px`;
      machine.style.top = `${machineY - 100}px`;
    }

    // Solicitar el siguiente frame
    requestAnimationFrame(updateMachinePosition);
  }

  // Iniciar el movimiento continuo
  updateMachinePosition();

  // Asegurarse de que la máquina sea visible y tenga el estilo correcto
  machine.style.position = "absolute";
  machine.style.zIndex = "10";
  machine.style.transition = "none"; // Eliminar cualquier transición que pueda interferir

  // Funcionalidad para cerrar el modal
  const modal = document.getElementById("element-modal");
  const closeBtn = document.querySelector(".close-modal");

  // Cerrar modal al hacer clic en el botón de cierre
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar modal al hacer clic fuera del contenido
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Función para actualizar el tamaño de la fuente
  function updateFontSize(newSize) {
    const modalContent = document.getElementById('modal-content');
    if (modalContent) {
      // Seleccionar todos los párrafos y spans dentro del contenido
      const elements = modalContent.getElementsByTagName('*');
      // Aplicar el nuevo tamaño a cada elemento
      for (let element of elements) {
        if (element.tagName === 'P' || element.tagName === 'SPAN') {
          // Convertir el nuevo tamaño de px a pt (1pt ≈ 1.33333px)
          const sizeInPt = Math.round(newSize / 1.33333);
          element.style.fontSize = `${sizeInPt}pt`;
        }
      }
    }
  }

  // Configurar los botones de tamaño de fuente
  const btnAumentar = document.querySelector('.btn-aumentar');
  const btnDisminuir = document.querySelector('.btn-disminuir');

  if (btnAumentar && btnDisminuir) {
    // Agregar estilos inline para asegurar visibilidad

    btnAumentar.addEventListener('click', function() {
      if (fontSize < MAX_FONT_SIZE) {
        fontSize += 2;
        updateFontSize(fontSize);
      }
    });

    btnDisminuir.addEventListener('click', function() {
      if (fontSize > MIN_FONT_SIZE) {
        fontSize -= 2;
        updateFontSize(fontSize);
      }
    });
  }
});

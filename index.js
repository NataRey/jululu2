document.addEventListener('DOMContentLoaded', () => {

  // LÓGICA DEL PRELOADER
  const preloader = document.getElementById('preloader');
  const video = document.getElementById('preloader-video');
  if (preloader && video) {
    document.body.style.overflow = 'hidden';
    const hidePreloader = () => {
      preloader.classList.add('fade-out');
      document.body.style.overflow = ''; // Restaurar scroll
    };

    // 1. Cuando el video termina sus 5 segundos, se oculta
    video.addEventListener('ended', hidePreloader);
    setTimeout(() => {
      if (!preloader.classList.contains('fade-out')) {
        hidePreloader();
      }
    }, 6500);
  }

  /**funcion boton busqueda  */
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const productCards = document.querySelectorAll('.product-card');

  // Función principal de filtrado
  function filterProducts() {
    const query = searchInput.value.toLowerCase().trim();

    productCards.forEach(card => {
      // Obtiene el título y la descripción dentro de la tarjeta
      const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
      const description = card.querySelector('.description') ? card.querySelector('.description').textContent.toLowerCase() : '';

      // Si coincide con el título o la descripción, se muestra; de lo contrario, se oculta
      if (title.includes(query) || description.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    // Desplaza suavemente la pantalla hacia la sección de productos si hay una búsqueda activa
    if (query !== '') {
      const productsSection = document.getElementById('productos');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // Evento 1: Al hacer clic en el botón de la lupa
  if (searchBtn) {
    searchBtn.addEventListener('click', filterProducts);
  }

  // Evento 2: Búsqueda en tiempo real mientras se escribe
  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);

    // Evento 3: Al presionar la tecla 'Enter' dentro del input
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        filterProducts();
      }
    });
  }
  /**fin funcion boton busqueda  */

  // Configuración del Slider Banner
  const images = [
    "img/Banner_ECO.jpg",
    "img/amor y amistad.png",
    "img/kits corporativos.png"
  ];

  let currentIndex = 0;
  const sliderImg = document.getElementById('sliderImg');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function updateSlider(index) {
    if (sliderImg) {
      sliderImg.style.opacity = '0.3';
      setTimeout(() => {
        sliderImg.src = images[index];
        sliderImg.style.opacity = '0.75';
      }, 200);
    }
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
      updateSlider(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
      updateSlider(currentIndex);
    });

    // Auto-play del carrusel cada 5 segundos
    setInterval(() => {
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
      updateSlider(currentIndex);
    }, 5000);
  }

  // Menú Hamburguesa Móvil
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navList = document.getElementById('navList');

  if (hamburgerBtn && navList) {
    hamburgerBtn.addEventListener('click', () => {
      navList.classList.toggle('show');

      // Opcional: Cambiar icono de hamburguesa a una "X" al abrir
      const icon = hamburgerBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {

  // LÓGICA DEL PRELOADER
  const preloader = document.getElementById('preloader');
  const video = document.getElementById('preloader-video');

  if (preloader && video) {
    // Deshabilitar scroll mientras corre la antesala
    document.body.style.overflow = 'hidden';

    const hidePreloader = () => {
      preloader.classList.add('fade-out');
      document.body.style.overflow = ''; // Restaurar scroll
    };

    // 1. Cuando el video termina sus 5 segundos, se oculta
    video.addEventListener('ended', hidePreloader);

    // 2. Fallback de seguridad por si hay algún retraso en la carga (máximo 6.5 segundos)
    setTimeout(() => {
      if (!preloader.classList.contains('fade-out')) {
        hidePreloader();
      }
    }, 6500);
  }

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
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  // Configuración del Slider Banner
  const images = [
    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/402001499/original/2a91cf001648ac96b9eca57954fc0a11d2b18a4f/disenare-camisetas-personalizadas-para-sublimacion-completa.png",
    "https://tse4.mm.bing.net/th/id/OIP.PFWGAQLselK5mJglS11tmAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    "https://www.que.es/wp-content/uploads/2022/09/img_7f59fc553b4c0f15a590877986dc030e.jpg"
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
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".cat-btn");
  const productCards = document.querySelectorAll(".catalog-card");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const carousels = document.querySelectorAll(".mini-carousel");
  const colorButtons = document.querySelectorAll('.color-btn');

  let currentCategory = "all";
  let currentSearchQuery = "";

  // Cachear el texto de las tarjetas para evitar leer el DOM en cada tecla (Mejora de Rendimiento)
  const cachedCards = Array.from(productCards).map((card) => ({
    element: card,
    categories: (card.getAttribute("data-category") || "")
      .trim()
      .toLowerCase()
      .split(/\s+/),
    text: card.textContent.toLowerCase(),
  }));

  // ==========================================================================
  // FUNCIÓN DE FILTRADO
  // ==========================================================================
  function applyCombinedFilters() {
    cachedCards.forEach(({ element, categories, text }) => {
      // 1. Validar Categoría
      const matchesCategory =
        currentCategory === "all" || categories.includes(currentCategory);

      // 2. Validar Búsqueda por Texto
      const matchesSearch =
        currentSearchQuery === "" || text.includes(currentSearchQuery);

      // 3. Mostrar u Ocultar
      element.classList.toggle("hide", !(matchesCategory && matchesSearch));
    });
  }

  // ==========================================================================
  // 1. EVENTO DE BOTONES DE CATEGORÍA
  // ==========================================================================
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const categoryValue = button.getAttribute("data-category");
      currentCategory = categoryValue ? categoryValue.trim().toLowerCase() : "all";

      applyCombinedFilters();
    });
  });

  // ==========================================================================
  // 2. EVENTO DEL BUSCADOR
  // ==========================================================================
  function handleSearch() {
    if (!searchInput) return;

    currentSearchQuery = searchInput.value.toLowerCase().trim();

    // Si el usuario escribe algo, cambiamos la pestaña activa visualmente a "Todos"
    if (currentSearchQuery !== "") {
      currentCategory = "all";

      filterButtons.forEach((btn) => {
        const cat = btn.getAttribute("data-category");
        const isAll = cat && cat.trim().toLowerCase() === "all";
        btn.classList.toggle("active", isAll);
      });
    }

    applyCombinedFilters();
  }

  if (searchInput) {
    // Usamos 'input' únicamente, ya que cubre escribir, pegar y borrar con backspace.
    searchInput.addEventListener("input", handleSearch);
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch);
  }

  //botones de color 
  // colorButtons.forEach(button => {
  //   button.addEventListener('click', function() {
  //     // 1. Saber qué número de color se tocó (0, 1, 2...)
  //     const index = this.getAttribute('data-index');
      
  //     // 2. Encontrar a qué tarjeta de producto pertenece este botón
  //     const card = this.closest('.catalog-card');
      
  //     // 3. Encontrar la "pista" de imágenes de esa tarjeta específica
  //     const track = card.querySelector('.carousel-track');
  //     const images = track.querySelectorAll('img');

  //     // 4. Solo mover si realmente existe una imagen para ese color
  //     if (index < images.length) {
  //       // Hacemos el cálculo matemático para mover la imagen a la izquierda (-100%, -200%, etc.)
  //       const translateX = -(index * 100);
        
  //       // Aplicamos el movimiento y la transición suave
  //       track.style.transform = `translateX(${translateX}%)`;
  //       track.style.transition = 'transform 0.5s ease-in-out';

  //       // 5. Quitarle la clase "active" a los otros colores de este mismo producto y ponérsela al que tocamos
  //       const siblings = this.parentElement.querySelectorAll('.color-btn');
  //       siblings.forEach(sibling => sibling.classList.remove('active'));
  //       this.classList.add('active');
  //     } else {
  //       console.warn("Falta agregar la imagen para este color en tu carpeta/HTML");
  //     }
  //   });
  // });


  // Botones de color
colorButtons.forEach(button => {
  button.addEventListener('click', function() {
    // 1. Saber qué número de color se tocó (0, 1, 2...)
    const index = parseInt(this.getAttribute('data-index'));
    
    // 2. Encontrar a qué tarjeta de producto pertenece este botón
    const card = this.closest('.catalog-card');
    
    // 3. Encontrar la "pista" de imágenes de esa tarjeta específica
    const track = card.querySelector('.carousel-track');
    const images = track.querySelectorAll('img');

    // 4. Solo cambiar si realmente existe una imagen para ese color
    if (index < images.length) {

      // -------------------------------------------------------------
      // SI TIENE LA CLASE "fade-mode", HACE LA TRANSICIÓN SUAVE (FADE)
      // -------------------------------------------------------------
      if (track.classList.contains('fade-mode')) {
        images.forEach((img, i) => {
          if (i === index) {
            img.classList.add('active');
          } else {
            img.classList.remove('active');
          }
        });
      } 
      // -------------------------------------------------------------
      // SI NO LA TIENE, HACE EL MOVIMIENTO LATERAL TRADICIONAL
      // -------------------------------------------------------------
      else {
        const translateX = -(index * 100);
        track.style.transform = `translateX(${translateX}%)`;
        track.style.transition = 'transform 0.5s ease-in-out';
      }

      // 5. Quitarle la clase "active" a los otros colores de este mismo producto y ponérsela al que tocamos
      const siblings = this.parentElement.querySelectorAll('.color-btn');
      siblings.forEach(sibling => sibling.classList.remove('active'));
      this.classList.add('active');

    } else {
      console.warn("Falta agregar la imagen para este color en tu carpeta/HTML");
    }
  });
});





  // ==========================================================================
  // 3. CARRUSEL DE IMÁGENES
  // ==========================================================================
  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    if (!track) return;

    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    const nextBtn = carousel.querySelector(".next-btn");
    const prevBtn = carousel.querySelector(".prev-btn");
    const dots = carousel.querySelectorAll(".dot");
    let currentIndex = 0;

    const updateCarousel = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
      currentIndex = index;
    };

    nextBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % slides.length;
      updateCarousel(nextIndex);
    });

    prevBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel(prevIndex);
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", (e) => {
        e.preventDefault();
        updateCarousel(i);
      });
    });
  });
});
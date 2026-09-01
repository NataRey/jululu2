document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".cat-btn");
  const productCards = document.querySelectorAll(".catalog-card");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const carousels = document.querySelectorAll(".mini-carousel");

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
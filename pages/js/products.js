document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".cat-btn");
  const productCards = document.querySelectorAll(".catalog-card");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const colorButtons = document.querySelectorAll(".color-btn");

  let currentCategory = "all";
  let currentSearchQuery = "";

  // Cachear datos de las tarjetas en memoria para un filtrado ultra rápido
  const cachedCards = Array.from(productCards).map((card) => ({
    element: card,
    categories: (card.getAttribute("data-category") || "")
      .trim()
      .toLowerCase()
      .split(/\s+/),
    text: card.textContent.toLowerCase(),
  }));

  // ==========================================================================
  // 1. FILTRADO COMBINADO (CATEGORÍA + BÚSQUEDA)
  // ==========================================================================
  function applyCombinedFilters() {
    cachedCards.forEach(({ element, categories, text }) => {
      const matchesCategory =
        currentCategory === "all" || categories.includes(currentCategory);
      const matchesSearch =
        currentSearchQuery === "" || text.includes(currentSearchQuery);

      element.classList.toggle("hide", !(matchesCategory && matchesSearch));
    });
  }

  // Evento para botones de categoría
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const categoryValue = button.getAttribute("data-category");
      currentCategory = categoryValue ? categoryValue.trim().toLowerCase() : "all";

      applyCombinedFilters();
    });
  });

  // Evento para el buscador
  function handleSearch() {
    if (!searchInput) return;

    currentSearchQuery = searchInput.value.toLowerCase().trim();

    // Al escribir, resaltar visualmente la categoría "Todos"
    if (currentSearchQuery !== "") {
      currentCategory = "all";
      filterButtons.forEach((btn) => {
        const cat = btn.getAttribute("data-category");
        btn.classList.toggle("active", cat && cat.trim().toLowerCase() === "all");
      });
    }

    applyCombinedFilters();
  }

  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch);
  }

  // ==========================================================================
  // 2. CAMBIO DE IMAGEN POR BOTONES DE COLOR (FADE MODE)
  // ==========================================================================
  colorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"), 10);
      const card = this.closest(".catalog-card");
      if (!card) return;

      const images = card.querySelectorAll(".carousel-track img");

      // Validar si existe la imagen para ese índice de color
      if (index < images.length) {
        // Activar la imagen correspondiente con transición fade
        images.forEach((img, i) => {
          img.classList.toggle("active", i === index);
        });

        // Resaltar el botón del color seleccionado
        const siblings = this.parentElement.querySelectorAll(".color-btn");
        siblings.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");
      } else {
        console.warn("Falta asociar una imagen para este color en el HTML.");
      }
    });
  });
});
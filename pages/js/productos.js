document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".cat-btn");
  const productCards = document.querySelectorAll(".catalog-card");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");

  let currentCategory = "all";
  let currentSearchQuery = "";

  // ==========================================================================
  // FUNCIÓN DE FILTRADO
  // ==========================================================================
  function applyCombinedFilters() {
    productCards.forEach((card) => {
      // 1. Validar Categoría
      const rawCategories = card.getAttribute("data-category");
      let matchesCategory = false;

      if (currentCategory === "all") {
        matchesCategory = true;
      } else if (rawCategories) {
        const categoriesList = rawCategories.trim().toLowerCase().split(/\s+/);
        matchesCategory = categoriesList.includes(currentCategory);
      }

      // 2. Validar Búsqueda por Texto (Lee TODO el texto interno de la tarjeta)
      const cardText = card.textContent.toLowerCase();
      const matchesSearch = currentSearchQuery === "" || cardText.includes(currentSearchQuery);

      // 3. Mostrar u Ocultar
      if (matchesCategory && matchesSearch) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  }

  // ==========================================================================
  // 1. EVENTO DE BOTONES DE CATEGORÍA
  // ==========================================================================
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Si el usuario da clic a una categoría, obtenemos su valor
      const categoryValue = button.getAttribute("data-category");
      currentCategory = categoryValue ? categoryValue.trim().toLowerCase() : "all";
      
      applyCombinedFilters();
    });
  });

  // ==========================================================================
  // 2. EVENTO DEL BUSCADOR (LUPA)
  // ==========================================================================
  function handleSearch() {
    if (searchInput) {
      currentSearchQuery = searchInput.value.toLowerCase().trim();

      // SI EL USUARIO ESCRIBE ALGO, ACTIVAMOS EL BOTÓN "TODO" AUTOMÁTICAMENTE
      if (currentSearchQuery !== "") {
        currentCategory = "all";
        
        filterButtons.forEach((btn) => {
          const cat = btn.getAttribute("data-category");
          if (cat && cat.trim().toLowerCase() === "all") {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
      }

      applyCombinedFilters();
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);

    searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener("click", handleSearch);
  }
});
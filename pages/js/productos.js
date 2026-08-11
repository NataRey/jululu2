document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".cat-btn");
  const productCards = document.querySelectorAll(".catalog-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // 1. Cambiar estado activo visual en botones
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // 2. Obtener categoría seleccionada
      const selectedCategory = button.getAttribute("data-category").trim().toLowerCase();

      // 3. Filtrar las tarjetas de productos
      productCards.forEach((card) => {
        const rawCategories = card.getAttribute("data-category");
        
        if (!rawCategories) return;

        // Convertir data-category en array
        const categoriesList = rawCategories.trim().toLowerCase().split(/\s+/);

        // Mostrar u ocultar mediante la clase CSS .hide
        if (selectedCategory === "all" || categoriesList.includes(selectedCategory)) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });
});
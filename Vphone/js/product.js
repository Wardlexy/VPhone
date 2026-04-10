document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");
  const noResults = document.querySelector(".no-results");

  filterButtons.forEach((btn) =>
    btn.addEventListener("click", function () {
      const selectedCategory = this.getAttribute("data-category");

      // Update active button
      filterButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      let visibleCount = 0;

      productCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (selectedCategory === "all" || cardCategory === selectedCategory) {
          card.style.display = "block";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });

      noResults.style.display = visibleCount === 0 ? "block" : "none";
    })
  );
});

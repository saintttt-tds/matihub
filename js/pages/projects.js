/**
 * Category filter buttons for the projects grid.
 * Scoped to .filter-btn so it only runs on projects.html.
 */
(function () {
  "use strict";

  function init() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card[data-category]");
    if (!buttons.length || !cards.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.dataset.filter;

        cards.forEach((card) => {
          const show = filter === "all" || card.dataset.category === filter;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  document.addEventListener("matihub:chrome-ready", init, { once: true });
})();

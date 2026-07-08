/**
 * FAQ accordion — expands/collapses one answer at a time per category.
 * Scoped to .faq-item so it only runs on faq.html.
 */
(function () {
  "use strict";

  function init() {
    const items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach((item) => {
      const question = item.querySelector(".faq-question");
      question.addEventListener("click", () => {
        const wasOpen = item.classList.contains("open");
        // Close sibling answers within the same category for a tidy list.
        item.parentElement.querySelectorAll(".faq-item.open").forEach((open) => {
          open.classList.remove("open");
        });
        if (!wasOpen) item.classList.add("open");
      });
    });
  }

  document.addEventListener("matihub:chrome-ready", init, { once: true });
})();

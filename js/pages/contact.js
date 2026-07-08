/**
 * Lightweight client-side feedback for the quote request form.
 * This demo site has no backend wired up yet — swap the console.log
 * for a real fetch() to your form endpoint when one is available.
 * Scoped to #quoteForm so it only runs on contact.html.
 */
(function () {
  "use strict";

  function init() {
    const form = document.getElementById("quoteForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = document.getElementById("formStatus");
      status.textContent = "Thanks — your request has been noted. Our team will follow up within one business day.";
      status.style.color = "#16a34a";
      form.reset();
    });
  }

  document.addEventListener("matihub:chrome-ready", init, { once: true });
})();

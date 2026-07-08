/**
 * Simple lightbox for the project gallery.
 * Scoped to .gallery-item so it only runs on gallery.html.
 */
(function () {
  "use strict";

  function init() {
    const items = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    if (!items.length || !lightbox) return;

    const lightboxImg = lightbox.querySelector("img");
    const caption = lightbox.querySelector(".lightbox-caption");
    const closeBtn = lightbox.querySelector(".lightbox-close");

    function open(item) {
      const img = item.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      caption.textContent = item.dataset.caption || img.alt;
      lightbox.classList.add("open");
    }

    function close() {
      lightbox.classList.remove("open");
    }

    items.forEach((item) => item.addEventListener("click", () => open(item)));
    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  document.addEventListener("matihub:chrome-ready", init, { once: true });
})();

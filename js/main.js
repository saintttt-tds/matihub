/**
 * Matihub — shared site script.
 * Loaded on every page. Responsible only for structural, cross-page
 * behaviour (header/footer include, nav state, footer year).
 * Page-specific interactivity lives in /js/pages/*.js
 */

(function () {
  "use strict";

  /** Fetches a partial HTML file and injects it into the given mount point. */
  async function loadPartial(url, mountSelector) {
    const mount = document.querySelector(mountSelector);
    if (!mount) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
      mount.innerHTML = await res.text();
    } catch (err) {
      console.error("Matihub: could not load partial", url, err);
    }
  }

  /** Highlights the nav link matching the current page's data-page attribute. */
  function setActiveNavLink() {
    const currentPage = document.body.dataset.page;
    if (!currentPage) return;
    document.querySelectorAll(".nav-links a[data-page]").forEach((link) => {
      if (link.dataset.page === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /** Wires up the mobile hamburger toggle for the nav menu. */
  function setupNavToggle() {
    const toggle = document.getElementById("navToggle");
    const links = document.getElementById("navLinks");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.innerHTML = isOpen
        ? '<i class="fas fa-xmark"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // Close the menu automatically once a link is chosen (mobile UX).
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A" && links.classList.contains("open")) {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }

  /** Never hardcode the year — always derive it from the visitor's clock. */
  function setFooterYear() {
    const el = document.getElementById("footerYear");
    if (el) el.textContent = new Date().getFullYear();
  }

  async function init() {
    await loadPartial("partials/header.html", "#site-header");
    setActiveNavLink();
    setupNavToggle();

    await loadPartial("partials/footer.html", "#site-footer");
    setFooterYear();

    // Let page-specific scripts know the shared chrome is ready,
    // in case they need to wait for it (e.g. header-dependent measurements).
    document.dispatchEvent(new CustomEvent("matihub:chrome-ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

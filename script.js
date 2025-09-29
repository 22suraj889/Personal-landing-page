// script.js
(() => {
  const root = document.documentElement;
  const switchInputs = document.querySelectorAll("#theme-switch");
  const STORAGE_KEY = "portfolio-theme";
  const burger = document.getElementById("burger");

  // Apply saved theme on load
  let current = localStorage.getItem(STORAGE_KEY) || "system";
  applyTheme(current);

  // When any theme switch toggled (we have identical controls across pages)
  document.addEventListener("change", (e) => {
    if (e.target && e.target.classList.contains("theme-switch")) {
      // cycle: system -> dark -> light -> system (we use checkbox to flip)
      // read current stored value and rotate
      if (current === "system") current = "dark";
      else if (current === "dark") current = "light";
      else current = "system";
      localStorage.setItem(STORAGE_KEY, current);
      applyTheme(current);
      // sync any visible checkboxes on the page
      syncSwitches();
    }
  });

  // Set initial checked state of switches
  function syncSwitches() {
    const on = current === "dark";
    document.querySelectorAll(".theme-switch").forEach((s) => (s.checked = on));
  }

  function applyTheme(pref) {
    if (pref === "dark") {
      root.setAttribute("data-theme", "dark");
    } else if (pref === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.setAttribute("data-theme", "system");
      // respect system preference if available
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
      ) {
        root.setAttribute("data-theme", "light");
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        root.setAttribute("data-theme", "dark");
      }
    }
    current = pref;
    syncSwitches();
  }

  // Mobile menu (simple toggle — show nav as alert on small screens)
  // Mobile hamburger menu toggle
  const nav = document.getElementById("nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("open");
      // toggle burger icon
      burger.textContent = nav.classList.contains("open") ? "✕" : "☰";
    });
  }

  // Show year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form builder
  window.fakeSubmit = function (e) {
    e.preventDefault();
    const name = encodeURIComponent(
      document.getElementById("name")?.value || ""
    );
    const email = encodeURIComponent(
      document.getElementById("email")?.value || ""
    );
    const message = encodeURIComponent(
      document.getElementById("message")?.value || ""
    );
    const subject = encodeURIComponent(
      "Portfolio inquiry from " + (name || "Website")
    );
    const body = encodeURIComponent(
      "Name: " +
        (name || "") +
        "\nEmail: " +
        (email || "") +
        "\n\n" +
        (message || "")
    );
    const mailto = `mailto:surajku2022@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    return false;
  };

  // Initialize switches on DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    syncSwitches();
  });
})();

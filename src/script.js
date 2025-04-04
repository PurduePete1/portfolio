document.addEventListener("DOMContentLoaded", function () {
  // 🔽 Mobile Nav Toggle
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // ✅ Splash Screen Fade Logic
  const splash = document.getElementById("splash-screen");
  if (splash) {
    document.body.classList.remove("fade-out");
    document.body.classList.add("fade-in");

    setTimeout(() => {
      document.body.classList.add("loaded");
    }, 800);
  }

  // ✅ Accordion Logic (only run if present)
  const accordions = document.querySelectorAll(".accordion-toggle");
  if (accordions.length > 0) {
    accordions.forEach((accordion) => {
      accordion.addEventListener("click", () => {
        accordion.classList.toggle("active");
        const content = accordion.nextElementSibling;
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });
  }
});

// ===========================
// PAGE TRANSITION BETWEEN LINKS
// ===========================
const pageLinks = document.querySelectorAll("a[href]");
pageLinks.forEach((link) => {
  const href = link.getAttribute("href");

  if (href && href.endsWith(".html")) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const splash = document.getElementById("splash-screen");
      if (splash) {
        splash.classList.add("show");
      }

      document.body.classList.remove("fade-in");
      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location = href;
      }, 600);
    });
  }
});

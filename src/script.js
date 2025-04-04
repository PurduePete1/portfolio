document.addEventListener("DOMContentLoaded", function () {
  // 🔽 Mobile Nav Toggle
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // ===========================
  // ACCORDION TOGGLE FUNCTIONALITY
  // ===========================
  const accordions = document.querySelectorAll(".accordion-toggle");

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

  // ===========================
  // PAGE FADE IN ON LOAD + SPLASH HIDE
  // ===========================
  const splash = document.getElementById("splash-screen");

  // Let the content fade in beneath the splash
  document.body.classList.remove("fade-out");
  document.body.classList.add("fade-in");

  // Then fade out the splash after a short delay
  setTimeout(() => {
    document.body.classList.add("loaded"); // fades out splash
  }, 800); // adjust this timing to control splash visibility
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

      document.body.classList.remove("fade-in");
      document.body.classList.add("fade-out");

      splash.classList.add("show"); // show splash immediately

      setTimeout(() => {
        window.location = href;
      }, 600); // enough time for fade out and splash to take over
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // 🔽 Mobile Nav Toggle
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // ✅ Only continue splash logic if #splash-screen exists
  const splash = document.getElementById("splash-screen");
  if (splash) {
    document.body.classList.remove("fade-out");
    document.body.classList.add("fade-in");

    setTimeout(() => {
      document.body.classList.add("loaded");
    }, 800);
  }

  // ✅ Same thing with accordion logic
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

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

  // ===== PARTICLE BACKGROUND CANVAS =====
  const canvas = document.getElementById("background-canvas");
  const ctx = canvas.getContext("2d");
  let particlesArray = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Particle {
    constructor(depth = 1) {
      this.depth = depth;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
  
      // ✨ Tiny dust
      this.size = depth === 1
        ? Math.random() * 0.8 + 0.2
        : Math.random() * 1.2 + 0.5;
  
      this.speedX = (Math.random() - 0.5) * (depth === 1 ? 0.1 : 0.3);
      this.speedY = (Math.random() - 0.5) * (depth === 1 ? 0.1 : 0.3);
  
      // 🌈 Choose a color
      const colors = [
        "rgba(0, 255, 255,",   // Cyan
        "rgba(255, 0, 255,",   // Magenta
        "rgba(255, 105, 180,", // Hot Pink
        "rgba(147, 112, 219,", // Medium Purple
      ];
      this.baseColor = colors[Math.floor(Math.random() * colors.length)];
  
      // 💥 Rare bright sparkle
      this.isBright = Math.random() < 0.08;
  
      // ⚡ Flicker setup
      this.opacity = Math.random() * 0.4 + 0.2;
      this.flickerSpeed = Math.random() * 0.05;
      this.flickerDirection = Math.random() < 0.5 ? -1 : 1;
    }
  
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
  
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  
      // ⚡ Flicker effect
      this.opacity += this.flickerSpeed * this.flickerDirection;
      if (this.opacity <= 0.1 || this.opacity >= 0.6) {
        this.flickerDirection *= -1;
      }
    }
  
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  
      const glowOpacity = this.isBright ? 1 : this.opacity.toFixed(2);
      ctx.fillStyle = `${this.baseColor} ${glowOpacity})`;
      ctx.shadowColor = `${this.baseColor} ${glowOpacity})`;
      ctx.shadowBlur = this.isBright ? 10 : 4;
  
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particlesArray = [];
  
    for (let i = 0; i < 60; i++) {
      particlesArray.push(new Particle(1)); // background
    }
  
    for (let i = 0; i < 60; i++) {
      particlesArray.push(new Particle(2)); // foreground
    }
  }
  

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

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
});

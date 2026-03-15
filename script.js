/* =====================================================
   PORTFOLIO SCRIPT - Mubarak Abdulsalam (DevRaq)
   ===================================================== */

/* ---- Preloader ---- */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
    setTimeout(() => preloader.remove(), 600);
  }, 900);
});

/* ---- Scroll Progress Bar ---- */
const scrollProgress = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  scrollProgress.style.width = scrolled + "%";
});

/* ---- Navbar: scroll effect + active link ---- */
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  // Navbar scroll class
  navbar.classList.toggle("scrolled", window.scrollY > 60);

  // Active nav link
  let current = "";
  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute("id");
  });

  navLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) a.classList.add("active");
  });
});

/* ---- Mobile Menu (Hamburger) ---- */
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

/* ---- Scroll-To-Top Button ---- */
const scrollTopBtn = document.getElementById("scroll-top");
window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
});
scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---- Typed Text Animation ---- */
const roles = [
  "Frontend Developer",
  "UI/UX Implementer",
  "React Developer",
  "Next.js Engineer",
  "Creative Coder"
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById("typed");

function typeEffect() {
  if (!typedEl) return;
  const current = roles[roleIndex];
  const visible = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  typedEl.textContent = visible;

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex > current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(typeEffect, delay);
}
setTimeout(typeEffect, 1000);

/* ---- Scroll Reveal ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children in the same parent
        entry.target.style.transitionDelay = (entry.target.dataset.delay || 0) + "ms";
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el, i) => {
  revealObserver.observe(el);
});

// Stagger siblings in the same grid/flex parent
document.querySelectorAll(
  ".services-grid, .projects-grid, .skills-grid, .about-stats"
).forEach((parent) => {
  [...parent.querySelectorAll(".reveal")].forEach((child, i) => {
    child.dataset.delay = i * 80;
  });
});

/* ---- Skill Bar Fill on Reveal ---- */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector(".skill-fill");
        if (fill) {
          setTimeout(() => {
            fill.style.width = fill.dataset.width + "%";
          }, 200);
        }
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".skill-card").forEach((card) => skillObserver.observe(card));

/* ---- Animated Stats Counter ---- */
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let count = 0;
        const step = Math.ceil(target / 50);
        const timer = setInterval(() => {
          count += step;
          if (count >= target) { count = target; clearInterval(timer); }
          el.textContent = count + (target === 100 ? "" : "+");
        }, 30);
        statObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-number").forEach((el) => statObserver.observe(el));

/* ---- Particle Canvas ---- */
const canvas = document.getElementById("particles-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = "#4f9cf9";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 110; i++) particles.push(new Particle());

  const drawLines = () => {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dist = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
        if (dist < 100) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 100) * 0.12;
          ctx.strokeStyle = "#4f9cf9";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  };
  animate();
}

/* ---- Contact Form Feedback ---- */
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg,#22c55e 0%,#16a34a 100%)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

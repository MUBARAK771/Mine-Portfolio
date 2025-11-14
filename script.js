// Preloader
window.addEventListener("load", function () {
  var preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(function () {
    preloader.style.display = "none";
  }, 500);
});

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.innerHTML = navMenu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  })
);

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scroll animations
function revealOnScroll() {
  var fadeElements = document.querySelectorAll(".fade-in");
  var leftElements = document.querySelectorAll(".slide-in-left");
  var rightElements = document.querySelectorAll(".slide-in-right");
  var windowHeight = window.innerHeight;

  fadeElements.forEach(function (el) {
    var position = el.getBoundingClientRect().top;
    if (position < windowHeight - 100) {
      el.classList.add("visible");
    }
  });

  leftElements.forEach(function (el) {
    var position = el.getBoundingClientRect().top;
    if (position < windowHeight - 100) {
      el.classList.add("visible");
    }
  });

  rightElements.forEach(function (el) {
    var position = el.getBoundingClientRect().top;
    if (position < windowHeight - 100) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("DOMContentLoaded", revealOnScroll);

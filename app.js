// From bottom

console.log("App.js is running");

// Set current year in footer span with id "year"
try {
  var yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear() + ' ';
  }
} catch (err) {
  console.error('Failed to set footer year:', err);
}

// Hide preloader once the page and assets are loaded
window.addEventListener('load', function () {
  var preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    // Fully remove from layout after transition
    setTimeout(function () {
      if (preloader && preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 350);
  }
});

// Mobile menu toggle
(function () {
  var toggleButton = document.querySelector('.hamburger');
  var nav = document.querySelector('header nav');
  var sidebar = document.getElementById('mobile-sidebar');
  var backdrop = document.getElementById('sidebar-backdrop');
  var sidebarClose = document.getElementById('sidebar-close');

  if (!toggleButton) return;

  function closeMenu() {
    if (nav) nav.classList.remove('open');
    toggleButton.setAttribute('aria-expanded', 'false');
  }

  toggleButton.addEventListener('click', function () {
    // Sidebar preferred on mobile
    if (sidebar && backdrop) {
      var willOpen = !sidebar.classList.contains('is-open');
      sidebar.classList.toggle('is-open', willOpen);
      backdrop.classList.toggle('is-open', willOpen);
      toggleButton.classList.toggle('is-active', willOpen);
      toggleButton.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      return;
    }
    // Fallback to dropdown nav if sidebar missing
    if (nav) {
      var isOpen = nav.classList.toggle('open');
      toggleButton.classList.toggle('is-active', isOpen);
      toggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
  });

  // Close when clicking a link (single page anchors)
  nav.addEventListener('click', function (e) {
    if (e.target.tagName.toLowerCase() === 'a') {
      closeMenu();
    }
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (nav && !nav.contains(e.target) && e.target !== toggleButton && !sidebar) {
      closeMenu();
    }
  });

  function closeSidebar() {
    if (sidebar && backdrop) {
      sidebar.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      toggleButton.classList.remove('is-active');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeSidebar);
  }
  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }
})();

// ScrollReveal
ScrollReveal().reveal('.reveal-bottom', {
  duration: 1000,
  distance: '50px',
  origin: 'bottom',
  reset: true
});

// From left
ScrollReveal().reveal('.reveal-left', {
  duration: 1200,
  distance: '80px',
  origin: 'left',
  reset: true
});

// From right
ScrollReveal().reveal('.reveal-right', {
  duration: 1200,
  distance: '80px',
  origin: 'right',
  reset: true
});

// Just fade in
ScrollReveal().reveal('.reveal-fade', {
  duration: 1500,
  opacity: 0,
  reset: true
});

// Select hamburger & nav
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle menu on click
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Typewriter effect
const phrases = [
  "WEB DESIGNER & DEVELOPER",
  "GRAPHIC DESIGNER",
  "UI/UX DESIGNER",
  "FREELANCER"

];

const typingSpeed = 100;   // ms per letter
const deletingSpeed = 50;  // ms per letter when deleting
const pauseAfter = 1500;   // pause after full text

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriter = document.getElementById("typewriter");

function type() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    typewriter.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, pauseAfter);
      return;
    }
  } else {
    typewriter.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

type();

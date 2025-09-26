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
window.addEventListener('load', function() {
  var preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    // Fully remove from layout after transition
    setTimeout(function() {
      if (preloader && preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 350);
  }
});

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

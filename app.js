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

// Typewriter effect
const phrases = [
  "WEBSITE DESIGNER",
  "GRAPHIC DESIGNER",
  "UI/UX DESIGNER",
  "FRONTEND DEVELOPER",
  "FREELANCER"

];

const typingSpeed = 100;   // ms per letter
const deletingSpeed = 50;  // ms per letter when deleting
const pauseAfter = 1500;   // pause after full text

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriter = document.getElementById("typewriter");

if (!typewriter) {
  console.warn('Typewriter element not found');
} else {
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
}

// Scroll to top button functionality
(function() {
  var scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (!scrollToTopBtn) return;
  
  // Show/hide button on scroll
  function toggleScrollButton() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }
  
  // Scroll to top on click
  scrollToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Listen for scroll events
  window.addEventListener('scroll', toggleScrollButton);
})();

// Skills carousel functionality (mobile only)
(function() {
  const skillsGrid = document.querySelector('.skills-grid');
  const prevBtn = document.querySelector('.skill-nav-prev');
  const nextBtn = document.querySelector('.skill-nav-next');
  const skillItems = document.querySelectorAll('.skill-item');
  
  if (!skillsGrid || !prevBtn || !nextBtn || skillItems.length === 0) return;

  let currentIndex = 0;
  let autoScrollInterval = null;
  let isUserInteracting = false;
  let isScrolling = false;
  let scrollTimeout = null;

  // Only run on mobile devices
  function isMobile() {
    return window.innerWidth <= 768;
  }

  function getItemWidth() {
    if (!skillsGrid || skillItems.length === 0) return 0;
    // On mobile, get width including scroll snap padding
    return skillItems[0].offsetWidth;
  }
  
  // Filter to only use first set of items (not duplicates) for carousel navigation
  function getCarouselItems() {
    // On mobile, only use first half of items (original set, not duplicates)
    if (isMobile() && skillItems.length > 14) {
      return Array.from(skillItems).slice(0, skillItems.length / 2);
    }
    return Array.from(skillItems);
  }

  function updateCarousel(immediate) {
    if (!isMobile() || isScrolling) return;

    const itemWidth = getItemWidth();
    if (itemWidth === 0) return;

    isScrolling = true;

    // Update active state with smoother transitions (only for carousel items, not duplicates)
    const carouselItems = getCarouselItems();
    skillItems.forEach((item, index) => {
      item.classList.remove('active');
    });
    
    // Only activate the current index from the carousel items
    if (carouselItems[currentIndex]) {
      requestAnimationFrame(function() {
        carouselItems[currentIndex].classList.add('active');
      });
    }

    // Scroll to position
    const scrollPosition = currentIndex * itemWidth;
    
    if (immediate) {
      skillsGrid.scrollLeft = scrollPosition;
      isScrolling = false;
    } else {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(function() {
        skillsGrid.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      });

      // Reset scrolling flag after animation completes (increased timeout for smoother transition)
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        isScrolling = false;
        // Ensure we're at the correct position
        requestAnimationFrame(function() {
          skillsGrid.scrollLeft = currentIndex * itemWidth;
        });
      }, 600);
    }
  }

  function nextSkill() {
    if (!isMobile() || isScrolling) return;
    const carouselItems = getCarouselItems();
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel(false);
    resetAutoScroll();
  }

  function prevSkill() {
    if (!isMobile() || isScrolling) return;
    const carouselItems = getCarouselItems();
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel(false);
    resetAutoScroll();
  }

  function startAutoScroll() {
    if (!isMobile() || isUserInteracting || isScrolling) return;
    stopAutoScroll();
    autoScrollInterval = setInterval(function() {
      if (!isUserInteracting && !isScrolling) {
        nextSkill();
      }
    }, 2000); // 2 second delay
  }

  function stopAutoScroll() {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  }

  function resetAutoScroll() {
    stopAutoScroll();
    setTimeout(function() {
      if (!isUserInteracting && !isScrolling) {
        startAutoScroll();
      }
    }, 2000);
  }

  // Prevent scroll during programmatic scrolling
  let scrollSync = false;
  skillsGrid.addEventListener('scroll', function() {
    if (scrollSync || !isMobile()) return;
    
    // Update currentIndex based on scroll position
    const itemWidth = getItemWidth();
    if (itemWidth > 0) {
      const carouselItems = getCarouselItems();
      const newIndex = Math.round(skillsGrid.scrollLeft / itemWidth);
      // Limit to carousel items (not duplicates)
      const maxIndex = carouselItems.length - 1;
      const clampedIndex = Math.max(0, Math.min(newIndex, maxIndex));
      
      if (clampedIndex !== currentIndex && clampedIndex >= 0 && clampedIndex < carouselItems.length) {
        currentIndex = clampedIndex;
        skillItems.forEach((item) => {
          item.classList.remove('active');
        });
        if (carouselItems[currentIndex]) {
          carouselItems[currentIndex].classList.add('active');
        }
      }
    }
  }, { passive: true });

  // Event listeners
  nextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (isScrolling) return;
    isUserInteracting = true;
    nextSkill();
    setTimeout(function() {
      isUserInteracting = false;
      if (!isScrolling) {
        startAutoScroll();
      }
    }, 4000);
  });

  prevBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (isScrolling) return;
    isUserInteracting = true;
    prevSkill();
    setTimeout(function() {
      isUserInteracting = false;
      if (!isScrolling) {
        startAutoScroll();
      }
    }, 4000);
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartTime = 0;

  skillsGrid.addEventListener('touchstart', function(e) {
    if (!isMobile()) return;
    touchStartX = e.changedTouches[0].screenX;
    touchStartTime = Date.now();
    stopAutoScroll();
    isUserInteracting = true;
  }, { passive: true });

  skillsGrid.addEventListener('touchend', function(e) {
    if (!isMobile()) return;
    touchEndX = e.changedTouches[0].screenX;
    const touchDuration = Date.now() - touchStartTime;
    handleSwipe(touchDuration);
    setTimeout(function() {
      isUserInteracting = false;
      if (!isScrolling) {
        startAutoScroll();
      }
    }, 2000);
  }, { passive: true });

  function handleSwipe(duration) {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    // Only handle swipe if it's a quick gesture (not slow drag)
    if (duration < 300 && Math.abs(diff) > swipeThreshold && !isScrolling) {
      if (diff > 0) {
        nextSkill();
      } else {
        prevSkill();
      }
    }
  }

  // Initialize on load and resize
  function initCarousel() {
    if (isMobile()) {
      // Wait for layout to settle
      setTimeout(function() {
        currentIndex = 0;
        const carouselItems = getCarouselItems();
        // Set first item as active
        skillItems.forEach((item) => {
          item.classList.remove('active');
        });
        if (carouselItems[0]) {
          carouselItems[0].classList.add('active');
        }
        // Scroll to start immediately
        skillsGrid.scrollLeft = 0;
        isScrolling = false;
        startAutoScroll();
      }, 100);
    } else {
      stopAutoScroll();
      skillItems.forEach(item => item.classList.remove('active'));
      isScrolling = false;
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      if (isMobile()) {
        initCarousel();
      }
    });
  } else {
    if (isMobile()) {
      initCarousel();
    }
  }

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      stopAutoScroll();
      isScrolling = false;
      currentIndex = 0;
      initCarousel();
    }, 250);
  });
})();
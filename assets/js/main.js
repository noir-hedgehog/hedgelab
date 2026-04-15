/* =============================================
   黑棘实验室 — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollEffects();
  initPageAnimations();
  initMobileNav();
});

/* =============================================
   Navigation
   ============================================= */

function initNav() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // Add scrolled class on scroll
  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');

  if (!toggle || !links) return;

  const closeNav = () => {
    links.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  const openNav = () => {
    links.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  toggle.addEventListener('click', () => {
    if (links.classList.contains('active')) {
      closeNav();
    } else {
      openNav();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  // Close on link click
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('active')) {
      closeNav();
    }
  });
}

/* =============================================
   Scroll effects
   ============================================= */

function initScrollEffects() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and sections
  document.querySelectorAll('.card, .section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add CSS for visible state
  const style = document.createElement('style');
  style.textContent = `
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/* =============================================
   Page animations
   ============================================= */

function initPageAnimations() {
  // Add page-enter class to main content
  const main = document.querySelector('.main-content');
  if (main) {
    main.classList.add('page-enter');
  }
}

/* =============================================
   Post card click handler
   ============================================= */

// For blog listing pages - make cards clickable
document.querySelectorAll('.post-card').forEach(card => {
  const link = card.querySelector('a');
  if (link) {
    card.addEventListener('click', (e) => {
      if (e.target.tagName !== 'A') {
        link.click();
      }
    });
    card.style.cursor = 'pointer';
  }
});

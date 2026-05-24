/* ============================================================
   Bloom — main.js
   ============================================================ */

// --- Sticky header ---
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// --- Mobile nav toggle ---
const mobileToggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');
if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    mobileToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });
}

// --- Language switcher dropdown ---
const langBtn = document.querySelector('.lang-btn');
const langDropdown = document.querySelector('.lang-dropdown');
if (langBtn && langDropdown) {
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => langDropdown.classList.remove('open'));
}

// --- Blog search ---
const searchInput = document.querySelector('.blog-search input');
const blogCards = document.querySelectorAll('.blog-card[data-title]');
if (searchInput && blogCards.length) {
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    blogCards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const tags = (card.dataset.tags || '').toLowerCase();
      card.style.display = (title.includes(q) || tags.includes(q)) ? '' : 'none';
    });
  });
}

// --- Animate elements on scroll ---
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .how-step, .blog-card, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// --- Plausible analytics helper (event tracking) ---
function trackEvent(name, props) {
  if (typeof plausible === 'function') {
    plausible(name, { props });
  }
}

// Track CTA clicks
document.querySelectorAll('[data-track]').forEach(el => {
  el.addEventListener('click', () => trackEvent(el.dataset.track));
});

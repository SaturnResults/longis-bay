// Hero slider
(function () {
  const slider = document.getElementById('heroSlider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  const dots   = slider.querySelectorAll('.hero-slider__dot');
  let current  = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 7000);
  }

  slider.querySelector('.hero-slider__arrow--next')?.addEventListener('click', () => { next(); startTimer(); });
  slider.querySelector('.hero-slider__arrow--prev')?.addEventListener('click', () => { prev(); startTimer(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startTimer(); }));

  startTimer();
})();

// Nav scroll behaviour
const nav = document.getElementById('nav');
let lastScrollY = window.scrollY;
let scrollDownFrom = window.scrollY;
let hideScrollY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const isMobile = window.innerWidth <= 768;
  const upThreshold = isMobile ? 80 : 0;
  nav?.classList.toggle('scrolled', y > 40);

  if (y <= 80) {
    nav?.classList.remove('nav--hidden');
    scrollDownFrom = y;
    hideScrollY = 0;
  } else if (y > lastScrollY) {
    scrollDownFrom = Math.min(scrollDownFrom, y);
    if (y > scrollDownFrom + 10) {
      nav?.classList.add('nav--hidden');
      hideScrollY = y;
    }
  } else if (y < lastScrollY) {
    scrollDownFrom = y;
    if (hideScrollY > 0 && y < hideScrollY - upThreshold) {
      nav?.classList.remove('nav--hidden');
      hideScrollY = 0;
    }
  }
  lastScrollY = y;
}, { passive: true });

// Mobile nav drawer
const hamburger     = document.getElementById('hamburger');
const mobileNav     = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose   = document.getElementById('mobileClose');

function openMobileNav() {
  mobileNav?.classList.add('open');
  mobileOverlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  mobileNav?.classList.remove('open');
  mobileOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', openMobileNav);
mobileClose?.addEventListener('click', closeMobileNav);
mobileOverlay?.addEventListener('click', closeMobileNav);
mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

// Fade-up on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

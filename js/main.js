function setupTheme() {
  const body = document.body;
  const btn = document.getElementById('theme-btn');
  if (!btn) return;

  const saved = localStorage.getItem('kgc-theme') || 'dark';
  body.dataset.theme = saved;
  btn.textContent = saved === 'dark' ? '☾' : '☀';

  btn.addEventListener('click', () => {
    const nextTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    body.dataset.theme = nextTheme;
    btn.textContent = nextTheme === 'dark' ? '☾' : '☀';
    localStorage.setItem('kgc-theme', nextTheme);
  });
}

function setupMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

function setupReveals() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  items.forEach((item) => observer.observe(item));
}

function setupCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const speed = 110;

  const animate = (counter) => {
    const target = Number(counter.dataset.counter);
    let current = 0;
    const increment = Math.ceil(target / speed);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = String(target);
        clearInterval(timer);
      } else {
        counter.textContent = String(current);
      }
    }, 16);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function setupSlider() {
  const slider = document.querySelector('[data-slider]');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('[data-prev]');
  const nextBtn = slider.querySelector('[data-next]');
  let index = 0;

  const showSlide = (nextIndex) => {
    slides[index].classList.remove('active');
    index = (nextIndex + slides.length) % slides.length;
    slides[index].classList.add('active');
  };

  prevBtn?.addEventListener('click', () => showSlide(index - 1));
  nextBtn?.addEventListener('click', () => showSlide(index + 1));

  setInterval(() => showSlide(index + 1), 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupMobileMenu();
  setupReveals();
  setupCounters();
  setupSlider();
});

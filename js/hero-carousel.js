const HERO_CAROUSEL_INTERVAL_MS = 6000;

const HERO_CAROUSEL_SLIDES = [
  {
    id: 'iphone',
    title: 'iPhone 17',
    highlight: 'уже здесь',
    description: 'Официальные смартфоны Apple — весь модельный ряд iPhone 17, Plus, Pro и Pro Max. Оригинальная гарантия, trade-in и доставка по России.',
    primaryCta: { label: 'Смотреть iPhone', href: 'catalog.html?line=iphone' },
    secondaryCta: { label: 'iPhone 17 Pro', href: 'catalog.html?cat=iphone-17-pro' },
    image: 'img/phones/iphone 17 pro max.png',
    imageAlt: 'iPhone 17 Pro Max',
    visualClass: 'hero-pc--phone',
  },
  {
    id: 'macbook',
    title: 'MacBook',
    highlight: 'на чипе M5',
    description: 'MacBook Neo, Air 13/15 и Pro 14/16 — лёгкие корпуса, яркие цвета и профессиональная мощность для работы и творчества.',
    primaryCta: { label: 'Смотреть MacBook', href: 'catalog.html?line=macbook' },
    secondaryCta: { label: 'MacBook Pro 14″', href: 'catalog.html?cat=macbook-pro-14' },
    image: 'img/macbook/MacBook Pro 14 16 512GB.png',
    imageAlt: 'MacBook Pro',
    visualClass: 'hero-pc--macbook',
  },
  {
    id: 'ipad',
    title: 'iPad',
    highlight: 'для любых задач',
    description: 'iPad, iPad Air и iPad Pro — от учёбы и заметок до монтажа и дизайна. Apple Pencil, яркие дисплеи и чипы M-серии.',
    primaryCta: { label: 'Смотреть iPad', href: 'catalog.html?line=ipad' },
    secondaryCta: { label: 'iPad Pro', href: 'catalog.html?cat=ipad-pro' },
    image: 'img/ipad/Apple iPad Pro 13 M5 (2026).png',
    imageAlt: 'iPad Pro',
    visualClass: 'hero-pc--ipad',
  },
  {
    id: 'airpods',
    title: 'AirPods',
    highlight: 'чистый звук',
    description: 'AirPods 4, AirPods Pro и AirPods Max — пространственное аудио, шумоподавление и мгновенное подключение к экосистеме Apple.',
    primaryCta: { label: 'Смотреть AirPods', href: 'catalog.html?line=airpods' },
    secondaryCta: { label: 'AirPods Pro', href: 'catalog.html?cat=airpods-pro' },
    image: 'img/pods/Apple AirPods Max 2 (2026).png',
    imageAlt: 'AirPods Max',
    visualClass: 'hero-pc--airpods',
  },
];

function renderHeroCarouselSlide(slide, index, total) {
  const imageSrc = typeof encodeAssetPath === 'function'
    ? encodeAssetPath(slide.image)
    : slide.image;

  return `
    <article
      class="hero-carousel__slide ${index === 0 ? 'is-active' : ''}"
      data-slide-index="${index}"
      role="group"
      aria-roledescription="slide"
      aria-label="${index + 1} из ${total}: ${escapeHtml(slide.title)}"
      ${index === 0 ? '' : 'aria-hidden="true"'}
    >
      <div class="container hero-content">
        <div class="hero-text">
          <h1>${escapeHtml(slide.title)} <span class="highlight">${escapeHtml(slide.highlight)}</span></h1>
          <p>${escapeHtml(slide.description)}</p>
          <div class="hero-buttons">
            <a href="${escapeHtml(slide.primaryCta.href)}" class="btn btn-primary btn-lg">${escapeHtml(slide.primaryCta.label)}</a>
            <a href="${escapeHtml(slide.secondaryCta.href)}" class="btn btn-secondary btn-lg">${escapeHtml(slide.secondaryCta.label)}</a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-pc ${escapeHtml(slide.visualClass)}">
            <img src="${imageSrc}" alt="${escapeHtml(slide.imageAlt)}" loading="${index === 0 ? 'eager' : 'lazy'}">
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderHeroCarouselDots(total) {
  return HERO_CAROUSEL_SLIDES.map((slide, index) => `
    <button
      type="button"
      class="hero-carousel__dot ${index === 0 ? 'is-active' : ''}"
      data-slide-to="${index}"
      role="tab"
      aria-label="${escapeHtml(slide.title)}"
      aria-selected="${index === 0 ? 'true' : 'false'}"
      tabindex="${index === 0 ? '0' : '-1'}"
    >
      <span class="hero-carousel__dot-fill" aria-hidden="true"></span>
    </button>
  `).join('');
}

function initHeroCarousel(root) {
  if (!root || root.dataset.heroCarouselReady === 'true') return;

  const track = root.querySelector('.hero-carousel__track');
  const dotsWrap = root.querySelector('.hero-carousel__dots');
  if (!track || !dotsWrap) return;

  const slides = HERO_CAROUSEL_SLIDES;
  track.innerHTML = slides.map((slide, index) => renderHeroCarouselSlide(slide, index, slides.length)).join('');
  dotsWrap.innerHTML = renderHeroCarouselDots(slides.length);

  const slideEls = [...track.querySelectorAll('.hero-carousel__slide')];
  const dotEls = [...dotsWrap.querySelectorAll('.hero-carousel__dot')];
  let activeIndex = 0;
  let timerId = null;
  let resumeTimeoutId = null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intervalMs = prefersReducedMotion ? 12000 : HERO_CAROUSEL_INTERVAL_MS;

  function restartDotProgress() {
    dotEls.forEach((dot) => {
      const fill = dot.querySelector('.hero-carousel__dot-fill');
      if (!fill) return;
      fill.style.animation = 'none';
      void fill.offsetWidth;
      if (dot.classList.contains('is-active') && !prefersReducedMotion) {
        fill.style.animation = `hero-carousel-progress ${intervalMs}ms linear forwards`;
      }
    });
  }

  function setActiveSlide(index) {
    const nextIndex = (index + slides.length) % slides.length;
    activeIndex = nextIndex;

    slideEls.forEach((slide, i) => {
      const isActive = i === nextIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    dotEls.forEach((dot, i) => {
      const isActive = i === nextIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      dot.tabIndex = isActive ? 0 : -1;
    });

    restartDotProgress();
  }

  function nextSlide() {
    setActiveSlide(activeIndex + 1);
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function startTimer() {
    stopTimer();
    if (slides.length <= 1) return;
    timerId = window.setInterval(nextSlide, intervalMs);
    restartDotProgress();
  }

  function pauseTimer() {
    stopTimer();
    dotEls.forEach((dot) => {
      const fill = dot.querySelector('.hero-carousel__dot-fill');
      if (fill) fill.style.animationPlayState = 'paused';
    });
  }

  function resumeTimer(delay = 0) {
    if (resumeTimeoutId) {
      clearTimeout(resumeTimeoutId);
      resumeTimeoutId = null;
    }
    resumeTimeoutId = window.setTimeout(() => {
      dotEls.forEach((dot) => {
        const fill = dot.querySelector('.hero-carousel__dot-fill');
        if (fill) fill.style.animationPlayState = 'running';
      });
      startTimer();
    }, delay);
  }

  dotsWrap.addEventListener('click', (event) => {
    const dot = event.target.closest('.hero-carousel__dot');
    if (!dot) return;
    const index = Number(dot.dataset.slideTo);
    if (!Number.isFinite(index)) return;
    setActiveSlide(index);
    pauseTimer();
    resumeTimer(8000);
  });

  root.addEventListener('mouseenter', pauseTimer);
  root.addEventListener('mouseleave', () => resumeTimer(300));
  root.addEventListener('focusin', pauseTimer);
  root.addEventListener('focusout', (event) => {
    if (!root.contains(event.relatedTarget)) resumeTimer(300);
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextSlide();
      pauseTimer();
      resumeTimer(8000);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setActiveSlide(activeIndex - 1);
      pauseTimer();
      resumeTimer(8000);
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseTimer();
    else resumeTimer(300);
  });

  root.dataset.heroCarouselReady = 'true';
  startTimer();
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel(document.getElementById('heroCarousel'));
});

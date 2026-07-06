const PAGE_TRANSITION_KEY = 'pageTransitionLabel';
const PAGE_TRANSITION_NAV_KEY = 'pageTransitionNav';
const PAGE_TRANSITION_IMAGE_KEY = 'pageTransitionImage';
const DEFAULT_TRANSITION_IMAGE = 'img/hero-phone.svg';
const PAGE_TRANSITION_MIN_MS = 2600;
const PAGE_TRANSITION_REDUCE_MS = 650;

const PAGE_LABELS_BY_HREF = {
  'index.html': 'Главная',
  'catalog.html': 'Каталог',
  'ready-pcs.html': 'Готовые ПК',
  'ready-pc.html': 'Сборка',
  'configurator.html': 'Конфигуратор',
  'product.html': 'Товар',
  'about.html': 'О нас',
  'cart.html': 'Корзина',
  'account.html': 'Аккаунт',
  'search.html': 'Поиск',
  'admin.html': 'Админ-панель',
};

const PAGE_LABELS_BY_PAGE = {
  home: 'Главная',
  catalog: 'Каталог',
  'ready-pcs': 'Готовые ПК',
  configurator: 'Конфигуратор',
  about: 'О нас',
  cart: 'Корзина',
  account: 'Аккаунт',
  search: 'Поиск',
  admin: 'Админ-панель',
};

let pageTransitionLinksBound = false;
let pageTransitionFinishing = false;
let pageTransitionNavigating = false;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function storeNavigationTransition(label, image = '') {
  try {
    sessionStorage.setItem(PAGE_TRANSITION_KEY, label);
    sessionStorage.setItem(PAGE_TRANSITION_NAV_KEY, '1');
    if (image) sessionStorage.setItem(PAGE_TRANSITION_IMAGE_KEY, image);
    else sessionStorage.removeItem(PAGE_TRANSITION_IMAGE_KEY);
  } catch {
    // sessionStorage недоступен
  }
}

function normalizeHref(href) {
  if (!href) return '';
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return '';
  const file = url.pathname.split('/').pop() || '';
  if (!file || file === '/') return 'index.html';
  return file;
}

function getLabelFromHref(href) {
  const file = normalizeHref(href);
  return PAGE_LABELS_BY_HREF[file] || 'PC Market';
}

function getImageFromLink(link) {
  return link?.dataset?.transitionImage?.trim() || '';
}

function getTransitionImageFromHref(href, link) {
  const fromLink = getImageFromLink(link);
  if (fromLink) return fromLink;

  const file = normalizeHref(href);
  if (file !== 'product.html' && file !== 'ready-pc.html') return '';

  try {
    const url = new URL(href, window.location.href);
    const id = url.searchParams.get('id');
    if (!id) return '';

    if (file === 'product.html' && typeof getEnrichedProductById === 'function') {
      const product = getEnrichedProductById(id);
      return product && typeof getItemTransitionImage === 'function'
        ? getItemTransitionImage(product)
        : '';
    }

    if (file === 'ready-pc.html' && typeof getReadyPCById === 'function') {
      const pc = getReadyPCById(id);
      return pc && typeof getItemTransitionImage === 'function'
        ? getItemTransitionImage(pc)
        : '';
    }
  } catch {
    return '';
  }

  return '';
}

function normalizeTransitionImageSrc(src) {
  if (!src || /^(https?:\/\/|data:)/i.test(src)) return src || '';

  let current = src;
  for (let i = 0; i < 3; i += 1) {
    const next = current.split('/').map((segment) => {
      if (!segment) return segment;
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    }).join('/');
    if (next === current) break;
    current = next;
  }

  return current;
}

function encodeTransitionImage(src) {
  const normalized = normalizeTransitionImageSrc(src);
  if (!normalized) return DEFAULT_TRANSITION_IMAGE;
  return typeof encodeAssetPath === 'function' ? encodeAssetPath(normalized) : normalized;
}

function setPageTransitionImage(src, { isProduct = false } = {}) {
  const overlay = getPageTransitionOverlay();
  const logoWrap = overlay?.querySelector('.page-transition__logo');
  const img = overlay?.querySelector('.page-transition__logo img');
  if (!img || !logoWrap) return;

  const useProduct = Boolean(isProduct && src);
  logoWrap.classList.toggle('page-transition__logo--product', useProduct);

  img.onerror = () => {
    img.onerror = null;
    logoWrap.classList.remove('page-transition__logo--product');
    img.src = DEFAULT_TRANSITION_IMAGE;
  };

  img.src = useProduct ? encodeTransitionImage(src) : DEFAULT_TRANSITION_IMAGE;
  img.alt = useProduct ? '' : '';
}

function updatePageTransitionImage(src) {
  setPageTransitionImage(src, { isProduct: Boolean(src) });
}

function getLabelFromLink(link, href) {
  const customLabel = link?.dataset?.transitionLabel?.trim();
  if (customLabel) return customLabel;
  return getLabelFromHref(href);
}

function isTransitionLink(link) {
  if (!link || link.target === '_blank' || link.hasAttribute('download')) return false;
  if (link.closest('#page-transition')) return false;

  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }

  return Boolean(normalizeHref(href));
}

function getPageTransitionOverlay() {
  return document.getElementById('page-transition');
}

function setPageTransitionLabel(label) {
  const overlay = getPageTransitionOverlay();
  const labelEl = overlay?.querySelector('.page-transition__label');
  if (labelEl && label) labelEl.textContent = label;
}

function updatePageTransitionLabel(label) {
  setPageTransitionLabel(label);
}

function resetTransitionVisuals(overlay) {
  if (!overlay) return;

  overlay.classList.remove('page-transition--animate', 'page-transition--ready');
  overlay.querySelectorAll('.page-transition__logo, .page-transition__label, .page-transition__progress').forEach((el) => {
    el.style.opacity = '';
    el.style.transform = '';
    el.style.filter = '';
    el.style.animation = '';
  });

  const progressBar = overlay.querySelector('.page-transition__progress-bar');
  if (progressBar) {
    progressBar.style.width = '';
    progressBar.style.animation = '';
  }
}

function waitForTransitionAssets(overlay) {
  const minMs = prefersReducedMotion() ? PAGE_TRANSITION_REDUCE_MS : PAGE_TRANSITION_MIN_MS;
  const logo = overlay?.querySelector('.page-transition__logo img');
  const logoReady = !logo || logo.complete
    ? Promise.resolve()
    : new Promise((resolve) => {
      logo.addEventListener('load', resolve, { once: true });
      logo.addEventListener('error', resolve, { once: true });
    });

  const animationDone = new Promise((resolve) => {
    const bar = overlay?.querySelector('.page-transition__progress-bar');
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      resolve();
    };

    setTimeout(finish, minMs);
    if (bar && !prefersReducedMotion()) {
      bar.addEventListener('animationend', finish, { once: true });
    }
  });

  return Promise.all([logoReady, animationDone]);
}

function showPageTransition(label, { animate = true, image = '' } = {}) {
  const overlay = getPageTransitionOverlay();
  if (!overlay) return null;

  overlay.style.display = '';
  overlay.classList.remove('page-transition--hide');
  overlay.classList.add('page-transition--visible');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('page-transition-active');

  resetTransitionVisuals(overlay);
  setPageTransitionLabel(label);
  setPageTransitionImage(image, { isProduct: Boolean(image) });
  if (animate) {
    requestAnimationFrame(() => {
      overlay.classList.add('page-transition--animate');
    });
  } else {
    overlay.classList.add('page-transition--ready');
  }

  return overlay;
}

function hidePageTransition(overlay) {
  if (!overlay || overlay.classList.contains('page-transition--hide')) return;

  overlay.classList.remove('page-transition--visible', 'page-transition--animate', 'page-transition--ready');
  overlay.classList.add('page-transition--hide');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.dataset.transitionMode = '';
  document.body.classList.remove('page-transition-active');

  const cleanup = () => {
    overlay.style.display = 'none';
  };

  overlay.addEventListener('transitionend', cleanup, { once: true });
  setTimeout(cleanup, 700);
}

async function navigateWithTransition(href, label, image = '') {
  pageTransitionNavigating = true;
  const transitionImage = image || getTransitionImageFromHref(href);
  storeNavigationTransition(label, transitionImage);
  setPageTransitionLabel(label);
  setPageTransitionImage(transitionImage, { isProduct: Boolean(transitionImage) });

  const overlay = showPageTransition(label, { animate: true, image: transitionImage });
  if (!overlay) {
    window.location.href = href;
    return;
  }

  overlay.dataset.transitionMode = 'outgoing';

  await waitForTransitionAssets(overlay);
  window.location.href = href;
}

function bindPageTransitionLinks(root = document) {
  if (pageTransitionLinksBound) return;
  pageTransitionLinksBound = true;

  root.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a[href]');
    if (!isTransitionLink(link)) return;

    event.preventDefault();
    event.stopPropagation();
    navigateWithTransition(
      link.href,
      getLabelFromLink(link, link.href),
      getTransitionImageFromHref(link.href, link)
    );
  }, true);
}

async function finishPageTransition(defaultLabel) {
  if (pageTransitionFinishing) return;
  pageTransitionFinishing = true;

  const overlay = getPageTransitionOverlay();
  if (!overlay) {
    document.body.classList.remove('page-transition-active');
    return;
  }

  try {
    const isNavEnter = overlay.dataset.transitionMode === 'nav';
    const labelEl = overlay.querySelector('.page-transition__label');
    const currentLabel = labelEl?.textContent.trim() || defaultLabel || 'PC Market';

    if (isNavEnter) {
      document.body.classList.remove('page-transition-active');
      overlay.classList.add('page-transition--hide');
      overlay.style.display = 'none';
      overlay.setAttribute('aria-hidden', 'true');
      return;
    }

    if (pageTransitionNavigating || overlay.dataset.transitionMode === 'outgoing') {
      return;
    }

    if (!overlay.classList.contains('page-transition--visible')) {
      showPageTransition(currentLabel, { animate: true });
    } else if (!overlay.classList.contains('page-transition--animate')
      && !overlay.classList.contains('page-transition--ready')) {
      requestAnimationFrame(() => overlay.classList.add('page-transition--animate'));
    }

    await waitForTransitionAssets(overlay);

    if (pageTransitionNavigating || overlay.dataset.transitionMode === 'outgoing') {
      return;
    }

    hidePageTransition(overlay);
  } catch (error) {
    console.warn('PC Market: ошибка анимации перехода', error);
    if (!pageTransitionNavigating) hidePageTransition(overlay);
  }
}

function initPageTransition(defaultLabel) {
  finishPageTransition(defaultLabel);
}

function getPageTransitionLabel(activePage) {
  if (!activePage) return 'PC Market';
  return PAGE_LABELS_BY_PAGE[activePage]
    || NAV_ITEMS?.find((item) => item.page === activePage)?.label
    || 'PC Market';
}

bindPageTransitionLinks(document);

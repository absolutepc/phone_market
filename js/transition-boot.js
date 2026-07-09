(function bootPageTransition() {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  function dismissOverlay(mode) {
    if (mode) overlay.dataset.transitionMode = mode;
    document.body.classList.remove('page-transition-active');
    overlay.classList.remove('page-transition--visible', 'page-transition--animate', 'page-transition--ready');
    overlay.classList.add('page-transition--hide');
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
  }

  let isNavEnter = false;
  let navLabel = '';

  try {
    isNavEnter = sessionStorage.getItem('pageTransitionNav') === '1';
    navLabel = sessionStorage.getItem('pageTransitionLabel') || '';
    if (isNavEnter) {
      sessionStorage.removeItem('pageTransitionNav');
      sessionStorage.removeItem('pageTransitionLabel');
      sessionStorage.removeItem('pageTransitionImage');
    }
  } catch {
    // sessionStorage недоступен
  }

  const navEntry = performance.getEntriesByType('navigation')[0];
  const isBackForward = navEntry?.type === 'back_forward';

  if (isNavEnter) {
    const labelEl = overlay.querySelector('.page-transition__label');
    if (labelEl && navLabel) {
      labelEl.textContent = navLabel;
    }
    dismissOverlay('nav');
    return;
  }

  if (isBackForward) {
    dismissOverlay('back');
    return;
  }

  document.body.classList.add('page-transition-active');
  overlay.classList.add('page-transition--visible');
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('page-transition--animate');
})();

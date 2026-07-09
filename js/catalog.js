function resolveCatalogLine(params) {
  const lineParam = params.get('line');
  if (lineParam && getCatalogLineById(lineParam)) return lineParam;

  const categoryParam = params.get('cat');
  if (categoryParam && CATEGORY_TO_LINE[categoryParam]) {
    return CATEGORY_TO_LINE[categoryParam];
  }

  return null;
}

function updateCatalogBreadcrumbs(mode, lineName = '') {
  const breadcrumbsEl = document.getElementById('catalogBreadcrumbs');
  if (!breadcrumbsEl) return;

  if (mode === 'picker') {
    breadcrumbsEl.innerHTML = '<a href="index.html">Главная</a> / <span>Каталог</span>';
    return;
  }

  breadcrumbsEl.innerHTML = `
    <a href="index.html">Главная</a> /
    <a href="catalog.html">Каталог</a> /
    <span>${escapeHtml(lineName)}</span>
  `;
}

function renderCatalogCategoryPicker() {
  const pickerWrap = document.getElementById('catalogCategoryPicker');
  const pickerGrid = document.getElementById('catalogCategoryPickerGrid');
  const productsView = document.getElementById('catalogProductsView');
  const catalogTitleEl = document.getElementById('catalogTitle');
  const catalogSubtitleEl = document.getElementById('catalogSubtitle');

  if (catalogTitleEl) catalogTitleEl.textContent = 'Каталог';
  if (catalogSubtitleEl) catalogSubtitleEl.textContent = 'Выберите категорию, чтобы посмотреть товары';
  updateCatalogBreadcrumbs('picker');

  if (pickerGrid) {
    pickerGrid.innerHTML = renderCatalogLineCards();
  }

  if (pickerWrap) pickerWrap.hidden = false;
  if (productsView) productsView.hidden = true;
}

function initCatalogPage() {
  const params = new URLSearchParams(window.location.search);
  const line = resolveCatalogLine(params);

  if (!line) {
    renderCatalogCategoryPicker();
    return;
  }

  const pickerWrap = document.getElementById('catalogCategoryPicker');
  const productsView = document.getElementById('catalogProductsView');
  if (pickerWrap) pickerWrap.hidden = true;
  if (productsView) productsView.hidden = false;

  initPhoneCatalog({
    preselectedLine: line,
    preselectedCategory: params.get('cat'),
  });
}

if (document.getElementById('catalogCategoryPicker') || document.getElementById('filtersSidebar')) {
  initCatalogPage();
}

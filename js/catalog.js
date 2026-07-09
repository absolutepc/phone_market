function resolveCatalogLine(params) {
  const lineParam = params.get('line');
  if (lineParam && getCatalogLineById(lineParam)) return lineParam;

  const categoryParam = params.get('cat');
  if (categoryParam && CATEGORY_TO_LINE[categoryParam]) {
    return CATEGORY_TO_LINE[categoryParam];
  }

  return null;
}

function getLineMinPrice(lineId) {
  const prices = getProducts()
    .filter(product => getProductLine(product) === lineId)
    .map(product => product.price)
    .filter(price => Number.isFinite(price));

  return prices.length ? Math.min(...prices) : 0;
}

function getLineProductCount(lineId) {
  return getProducts().filter(product => getProductLine(product) === lineId).length;
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
    pickerGrid.innerHTML = CATALOG_LINES.map(line => {
      const minPrice = getLineMinPrice(line.id);
      const count = getLineProductCount(line.id);
      const priceLabel = minPrice ? `от ${formatPrice(minPrice)}` : 'Скоро в продаже';
      const imageSrc = line.id === 'iphone' ? 'img/phones/standard/black.png' : line.img;

      return `
        <a href="catalog.html?line=${line.id}" class="catalog-section-card">
          <div class="catalog-section-card__media">
            <img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(line.name)}">
          </div>
          <div class="catalog-section-card__body">
            <h2>${escapeHtml(line.name)}</h2>
            <p>${escapeHtml(line.description)}</p>
            <span class="catalog-section-card__count">${priceLabel} · ${count} ${count === 1 ? 'товар' : count < 5 ? 'товара' : 'товаров'}</span>
          </div>
        </a>
      `;
    }).join('');
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

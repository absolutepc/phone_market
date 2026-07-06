const CATALOG_ATTRIBUTE_FILTERS = [
  { id: 'storageFilters', field: 'storage', options: FILTER_STORAGE, param: 'storage', className: 'storage-filter' },
  { id: 'simFilters', field: 'simType', options: FILTER_SIM, param: 'sim', className: 'sim-filter' },
  { id: 'seriesFilters', field: 'series', options: FILTER_SERIES, param: 'series', className: 'series-filter' },
];

const CATALOG_PRICE_STEP = 5000;
const CATALOG_PRICE_FLOOR = 80000;

let catalogMaxProductPrice = CATALOG_PRICE_FLOOR;

function getCatalogMaxPrice(products) {
  const prices = (products || []).map(p => p.price || 0);
  const rawMax = prices.length ? Math.max(...prices) : CATALOG_PRICE_FLOOR;
  const target = Math.max(CATALOG_PRICE_FLOOR, rawMax);
  return Math.ceil(target / CATALOG_PRICE_STEP) * CATALOG_PRICE_STEP;
}

function updateCatalogPriceLabel(minVal, maxVal) {
  const label = document.getElementById('priceLabel');
  if (label) label.textContent = `${formatPrice(minVal)} — ${formatPrice(maxVal)}`;
}

function readCatalogPriceControls() {
  return {
    minRange: document.getElementById('priceMinRange'),
    maxRange: document.getElementById('priceMaxRange'),
    minInput: document.getElementById('priceMinInput'),
    maxInput: document.getElementById('priceMaxInput'),
  };
}

function snapCatalogPrice(value, ceiling) {
  const parsed = Math.round(+value / CATALOG_PRICE_STEP) * CATALOG_PRICE_STEP;
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, Math.min(ceiling, parsed));
}

function applyCatalogPriceValues(minVal, maxVal) {
  const { minRange, maxRange, minInput, maxInput } = readCatalogPriceControls();
  const ceiling = catalogMaxProductPrice;
  let min = snapCatalogPrice(minVal, ceiling);
  let max = snapCatalogPrice(maxVal, ceiling);
  if (min > max) max = min;
  if (minRange) { minRange.max = ceiling; minRange.value = min; }
  if (maxRange) { maxRange.max = ceiling; maxRange.value = max; }
  if (minInput) { minInput.max = ceiling; minInput.value = min; }
  if (maxInput) { maxInput.max = ceiling; maxInput.value = max; }
  updateCatalogPriceLabel(min, max);
  return { min, max };
}

function getCatalogSelectedPrices() {
  const { minRange, maxRange } = readCatalogPriceControls();
  return {
    min: +(minRange?.value || 0),
    max: +(maxRange?.value || catalogMaxProductPrice),
  };
}

function syncCatalogPriceRange(products, resetValue = false) {
  const max = getCatalogMaxPrice(products);
  catalogMaxProductPrice = max;
  const { minRange, maxRange } = readCatalogPriceControls();
  if (!minRange || !maxRange) return max;
  if (resetValue) {
    applyCatalogPriceValues(0, max);
    return max;
  }
  applyCatalogPriceValues(+minRange.value, +maxRange.value);
  return max;
}

function handleCatalogPriceInput(sectionId, source) {
  const { minRange, maxRange, minInput, maxInput } = readCatalogPriceControls();
  if (!minRange || !maxRange) return;
  let minVal = +minRange.value;
  let maxVal = +maxRange.value;
  if (source === 'minInput') { minVal = minInput?.value ?? minVal; if (minVal > maxVal) maxVal = minVal; }
  else if (source === 'maxInput') { maxVal = maxInput?.value ?? maxVal; if (maxVal < minVal) minVal = maxVal; }
  else if (source === 'min') { minVal = +minRange.value; if (minVal > maxVal) maxVal = minVal; }
  else if (source === 'max') { maxVal = +maxRange.value; if (maxVal < minVal) minVal = maxVal; }
  applyCatalogPriceValues(minVal, maxVal);
  filterCatalogProducts(sectionId);
}

function renderCatalogFilterCheckboxes(containerId, values, cssClass, checkedValues = []) {
  const container = document.getElementById(containerId);
  const group = container?.closest('.filter-group');
  if (!container) return;
  const checked = new Set(Array.isArray(checkedValues) ? checkedValues : [checkedValues].filter(Boolean));
  if (!values.length) {
    if (group) group.style.display = 'none';
    container.innerHTML = '';
    return;
  }
  if (group) group.style.display = '';
  container.innerHTML = values.map(value => `
    <label>
      <input type="checkbox" value="${value}" class="${cssClass}" ${checked.has(value) ? 'checked' : ''}>
      ${value}
    </label>
  `).join('');
}

function getCatalogCheckedValues(selector) {
  return [...document.querySelectorAll(selector + ':checked')].map(el => el.value);
}

function getCatalogFilterBasis(activeSectionId) {
  const checkedCats = getCatalogCheckedValues('.cat-filter');
  let products = getProducts().filter(p => productMatchesCatalogSection(p, activeSectionId));
  if (checkedCats.length) products = products.filter(p => checkedCats.includes(p.category));
  return products;
}

function updateCatalogAttributeFilters(activeSectionId) {
  const basis = getCatalogFilterBasis(activeSectionId);
  CATALOG_ATTRIBUTE_FILTERS.forEach(({ id, field, options, className }) => {
    const available = new Set(basis.map(p => p[field]).filter(Boolean));
    const filtered = options.filter(v => available.has(v));
    renderCatalogFilterCheckboxes(id, filtered, className);
  });
}

function resolveCatalogSectionId(params) {
  const sectionParam = params.get('section');
  if (sectionParam && getCatalogSectionById(sectionParam)) return sectionParam;
  const catParam = params.get('cat');
  if (catParam) {
    const section = CATALOG_SECTIONS.find(s => s.categories.includes(catParam));
    if (section) return section.id;
  }
  return null;
}

function getCatalogCategoriesForSection(sectionId) {
  const section = getCatalogSectionById(sectionId);
  if (!section) return [];
  const products = getProducts().filter(p => productMatchesCatalogSection(p, sectionId));
  const cats = [...new Set(products.map(p => p.category))];
  return cats.map(cat => ({ id: cat, label: CATEGORY_LABELS[cat] || cat }));
}

function renderCatalogSections() {
  const grid = document.getElementById('catalogSectionsGrid');
  if (!grid) return;
  grid.innerHTML = CATALOG_SECTIONS.map(section => `
    <a href="catalog.html?section=${section.id}" class="catalog-section-card" data-transition-label="${escapeHtml(section.name)}">
      <div class="catalog-section-card__media">
        <img src="${encodeAssetPath(section.img)}" alt="${escapeHtml(section.name)}" loading="lazy">
      </div>
      <div class="catalog-section-card__body">
        <h2>${section.name}</h2>
        <p>${section.description}</p>
        <span class="catalog-section-card__cta">Смотреть →</span>
      </div>
    </a>
  `).join('');
}

function renderCategoryFilters(sectionId, preselectedCat) {
  const cats = getCatalogCategoriesForSection(sectionId);
  const container = document.getElementById('categoryFilters');
  if (!container) return;
  container.innerHTML = cats.map(cat => `
    <label>
      <input type="checkbox" value="${cat.id}" class="cat-filter" ${preselectedCat === cat.id ? 'checked' : ''}>
      ${cat.label}
    </label>
  `).join('');
}

function filterCatalogProducts(activeSectionId) {
  const { min, max } = getCatalogSelectedPrices();
  const checkedCats = getCatalogCheckedValues('.cat-filter');
  const checkedBadges = getCatalogCheckedValues('.badge-filter');
  const sort = document.getElementById('sortSelect')?.value || 'default';

  let products = getProducts().filter(p => productMatchesCatalogSection(p, activeSectionId));

  if (checkedCats.length) products = products.filter(p => checkedCats.includes(p.category));

  CATALOG_ATTRIBUTE_FILTERS.forEach(({ field, className }) => {
    const checked = getCatalogCheckedValues('.' + className);
    if (checked.length) products = products.filter(p => checked.includes(p[field]));
  });

  products = products.filter(p => p.price >= min && p.price <= max);

  if (checkedBadges.length) products = products.filter(p => checkedBadges.includes(p.badge));

  if (sort === 'price-asc') products.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') products.sort((a, b) => b.price - a.price);
  else if (sort === 'name') products.sort((a, b) => a.name.localeCompare(b.name, 'ru'));

  const countEl = document.getElementById('catalogResultCount');
  if (countEl) countEl.textContent = `${products.length} ${products.length === 1 ? 'модель' : products.length < 5 ? 'модели' : 'моделей'}`;

  const grid = document.getElementById('catalogGrid');
  if (!grid) return;
  grid.innerHTML = products.length
    ? products.map(p => renderProductCard(p)).join('')
    : '<div class="no-results"><p>Ничего не найдено. Попробуйте изменить фильтры.</p></div>';

  bindProductCards(grid);
}

function bindCatalogFilters(activeSectionId) {
  document.querySelectorAll('.cat-filter, .badge-filter, .storage-filter, .sim-filter, .series-filter')
    .forEach(el => el.addEventListener('change', () => filterCatalogProducts(activeSectionId)));

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.addEventListener('change', () => filterCatalogProducts(activeSectionId));

  const { minRange, maxRange, minInput, maxInput } = readCatalogPriceControls();
  minRange?.addEventListener('input', () => handleCatalogPriceInput(activeSectionId, 'min'));
  maxRange?.addEventListener('input', () => handleCatalogPriceInput(activeSectionId, 'max'));
  minInput?.addEventListener('change', () => handleCatalogPriceInput(activeSectionId, 'minInput'));
  maxInput?.addEventListener('change', () => handleCatalogPriceInput(activeSectionId, 'maxInput'));

  const resetBtn = document.getElementById('resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.querySelectorAll('.filters-sidebar input[type="checkbox"]').forEach(cb => { cb.checked = false; });
      syncCatalogPriceRange(getProducts(), true);
      if (sortSelect) sortSelect.value = 'default';
      filterCatalogProducts(activeSectionId);
    });
  }

  bindCatalogFiltersToggle();
}

function bindCatalogFiltersToggle() {
  const toggle = document.getElementById('catalogFiltersToggle');
  const wrap = document.getElementById('catalogProductsView');
  if (!toggle || !wrap) return;

  toggle.addEventListener('click', () => {
    const isOpen = wrap.classList.toggle('filters-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? 'Скрыть фильтры' : 'Фильтры';
  });
}

function showCatalogProductsView(sectionId, catParam) {
  const section = getCatalogSectionById(sectionId);
  document.getElementById('catalogSectionsView').hidden = true;
  document.getElementById('catalogProductsView').hidden = false;

  const title = section?.name || 'Каталог';
  document.getElementById('catalogTitle').textContent = title;
  document.getElementById('catalogSubtitle').textContent = section?.description || 'Все модели iPhone 17';
  document.getElementById('catalogBreadcrumbCurrent').textContent = title;

  renderCategoryFilters(sectionId, catParam);
  updateCatalogAttributeFilters(sectionId);
  syncCatalogPriceRange(getProducts(), true);
  filterCatalogProducts(sectionId);
  bindCatalogFilters(sectionId);
}

function initCatalogPage() {
  const params = new URLSearchParams(window.location.search);
  const sectionId = resolveCatalogSectionId(params) || 'iphone';
  const catParam = params.get('cat');
  showCatalogProductsView(sectionId, catParam);
}

if (document.getElementById('catalogSectionsGrid') || document.getElementById('catalogProductsView')) {
  initCatalogPage();
}

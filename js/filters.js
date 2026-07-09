function initPhoneCatalog(options = {}) {
  const { preselectedCategory = null, preselectedLine = 'iphone' } = options;
  const allProducts = getProducts();
  let activeLine = preselectedLine;

  const priceMinInput = document.getElementById('priceMin');
  const priceMaxInput = document.getElementById('priceMax');
  const categoryFiltersEl = document.getElementById('categoryFilters');
  const storageFiltersEl = document.getElementById('storageFilters');
  const simFiltersEl = document.getElementById('simFilters');
  const badgeFiltersEl = document.getElementById('badgeFilters');
  const resultsCountEl = document.getElementById('resultsCount');
  const sortSelect = document.getElementById('sortSelect');
  const listEl = document.getElementById('catalogGrid');
  const resetBtn = document.getElementById('resetFilters');
  const sidebar = document.getElementById('filtersSidebar');
  const pageLayout = document.getElementById('catalogPageLayout');
  const filtersToggle = document.getElementById('filtersToggle');
  const filtersClose = document.getElementById('filtersClose');
  const catalogLinesEl = document.getElementById('catalogLines');
  const catalogTitleEl = document.getElementById('catalogTitle');
  const catalogSubtitleEl = document.getElementById('catalogSubtitle');
  const catalogBreadcrumbEl = document.getElementById('catalogBreadcrumbCurrent');

  function getLineProducts(lineId = activeLine) {
    return allProducts.filter(product => getProductLine(product) === lineId);
  }

  function renderCatalogLines() {
    if (!catalogLinesEl) return;
    catalogLinesEl.innerHTML = CATALOG_LINES.map(line => `
      <a
        href="catalog.html?line=${line.id}"
        class="catalog-line-tab ${line.id === activeLine ? 'active' : ''}"
        aria-current="${line.id === activeLine ? 'page' : 'false'}"
      >${escapeHtml(line.name)}</a>
    `).join('');
  }

  function updateCatalogHeader() {
    const line = getCatalogLineById(activeLine) || CATALOG_LINES[0];
    if (catalogTitleEl) catalogTitleEl.textContent = `Каталог ${line.name}`;
    if (catalogSubtitleEl) catalogSubtitleEl.textContent = line.description;
    if (catalogBreadcrumbEl) catalogBreadcrumbEl.textContent = line.name;
  }

  function renderCheckboxGroup(container, items, cssClass, checkedValues = []) {
    if (!container) return;
    const group = container.closest('.filter-group');
    if (!items.length) {
      if (group) group.style.display = 'none';
      container.innerHTML = '';
      return;
    }
    if (group) group.style.display = '';
    const checked = new Set(checkedValues);
    container.innerHTML = items.map(item => `
      <label>
        <input type="checkbox" value="${escapeHtml(item.value)}" class="${cssClass}" ${checked.has(item.value) ? 'checked' : ''}>
        ${escapeHtml(item.label)}
      </label>
    `).join('');
  }

  function getAvailableValues(field, products = getLineProducts()) {
    return [...new Set(products.map(product => product[field]).filter(value => value && value !== '—'))];
  }

  function renderFilterOptions() {
    const lineProducts = getLineProducts();
    const lineCategories = getCategoriesForLine(activeLine);
    const availableCategories = getAvailableValues('category', lineProducts)
      .filter(value => lineCategories.includes(value));

    renderCheckboxGroup(
      categoryFiltersEl,
      availableCategories.map(value => ({
        value,
        label: CATEGORY_LABELS[value] || value,
      })),
      'cat-filter',
      preselectedCategory && lineCategories.includes(preselectedCategory) ? [preselectedCategory] : []
    );

    renderCheckboxGroup(
      storageFiltersEl,
      FILTER_STORAGE
        .filter(value => getAvailableValues('storage', lineProducts).includes(value))
        .map(value => ({ value, label: value })),
      'storage-filter'
    );

    const simValues = [...new Set([
      ...FILTER_SIM.filter(value => getAvailableValues('simType', lineProducts).includes(value)),
      ...getAvailableValues('simType', lineProducts).filter(value => !FILTER_SIM.includes(value)),
    ])];

    renderCheckboxGroup(
      simFiltersEl,
      simValues.map(value => ({ value, label: value })),
      'sim-filter'
    );

    renderCheckboxGroup(
      badgeFiltersEl,
      Object.entries(BADGE_LABELS).map(([value, label]) => ({ value, label })),
      'badge-filter'
    );
  }

  function getCheckedValues(selector) {
    return [...document.querySelectorAll(selector)]
      .filter(input => input.checked)
      .map(input => input.value);
  }

  function parsePriceValue(raw) {
    if (!raw?.trim()) return null;
    const parsed = Number(raw.replace(/\s/g, ''));
    return Number.isFinite(parsed) ? parsed : null;
  }

  function getFilterState() {
    return {
      categories: getCheckedValues('.cat-filter'),
      storage: getCheckedValues('.storage-filter'),
      simTypes: getCheckedValues('.sim-filter'),
      badges: getCheckedValues('.badge-filter'),
      priceMin: parsePriceValue(priceMinInput?.value),
      priceMax: parsePriceValue(priceMaxInput?.value),
      sort: sortSelect?.value || 'default',
    };
  }

  function productMatchesFilters(product, state) {
    if (getProductLine(product) !== activeLine) return false;
    if (state.categories.length && !state.categories.includes(product.category)) return false;
    if (state.storage.length && !state.storage.includes(product.storage)) return false;
    if (state.simTypes.length && !state.simTypes.includes(product.simType)) return false;
    if (state.badges.length && !state.badges.includes(product.badge)) return false;
    if (state.priceMin != null && product.price < state.priceMin) return false;
    if (state.priceMax != null && product.price > state.priceMax) return false;
    return true;
  }

  function sortProducts(products, sortValue) {
    const sorted = [...products];
    switch (sortValue) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name, 'ru'));
      default:
        return sorted;
    }
  }

  function renderProductsGrid(products, emptyMessage) {
    if (!products.length) {
      return `<div class="empty-state">${escapeHtml(emptyMessage)}</div>`;
    }
    return `<div class="products-grid">${products.map(product => renderProductCard(product)).join('')}</div>`;
  }

  function applyFilters() {
    const state = getFilterState();
    const filtered = sortProducts(
      allProducts.filter(product => productMatchesFilters(product, state)),
      state.sort
    );

    if (resultsCountEl) {
      resultsCountEl.textContent = `Найдено: ${filtered.length}`;
    }

    if (listEl) {
      listEl.innerHTML = renderProductsGrid(
        filtered,
        'По выбранным фильтрам ничего не найдено. Попробуйте изменить параметры.'
      );
      bindProductCards(listEl);
    }
  }

  function resetFilters() {
    if (priceMinInput) priceMinInput.value = '';
    if (priceMaxInput) priceMaxInput.value = '';
    if (sortSelect) sortSelect.value = 'default';
    sidebar?.querySelectorAll('input[type="checkbox"]').forEach(input => {
      input.checked = false;
    });
    applyFilters();
  }

  renderCatalogLines();
  updateCatalogHeader();
  renderFilterOptions();

  sidebar?.addEventListener('input', (event) => {
    if (event.target.matches('#priceMin, #priceMax')) applyFilters();
  });

  sidebar?.addEventListener('change', (event) => {
    if (event.target.matches('#priceMin, #priceMax, input[type="checkbox"]')) applyFilters();
  });

  sortSelect?.addEventListener('change', applyFilters);
  resetBtn?.addEventListener('click', resetFilters);

  function setFiltersVisible(visible) {
    if (!pageLayout || !filtersToggle) return;
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    if (isMobile) {
      pageLayout.classList.toggle('filters-open', visible);
      pageLayout.classList.remove('filters-collapsed');
    } else {
      pageLayout.classList.toggle('filters-collapsed', !visible);
      pageLayout.classList.remove('filters-open');
    }
    filtersToggle.setAttribute('aria-expanded', String(visible));
    filtersToggle.textContent = visible ? 'Скрыть фильтры' : 'Показать фильтры';
  }

  function isFiltersVisible() {
    if (!pageLayout) return true;
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    return isMobile
      ? pageLayout.classList.contains('filters-open')
      : !pageLayout.classList.contains('filters-collapsed');
  }

  filtersToggle?.addEventListener('click', () => {
    setFiltersVisible(!isFiltersVisible());
  });

  filtersClose?.addEventListener('click', () => {
    setFiltersVisible(false);
  });

  window.addEventListener('resize', () => {
    const visible = isFiltersVisible();
    if (window.matchMedia('(max-width: 1024px)').matches) {
      pageLayout?.classList.toggle('filters-open', visible);
      pageLayout?.classList.remove('filters-collapsed');
    } else {
      pageLayout?.classList.toggle('filters-collapsed', !visible);
      pageLayout?.classList.remove('filters-open');
    }
  });

  if (window.matchMedia('(max-width: 1024px)').matches) {
    setFiltersVisible(false);
  }

  applyFilters();
}

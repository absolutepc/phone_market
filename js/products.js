function renderProductSpecsTable(product) {
  const rows = [];
  PRODUCT_ATTRIBUTE_FIELDS.forEach(field => {
    if (product[field]) rows.push({ label: ATTRIBUTE_LABELS[field], value: product[field] });
  });
  if (product.specs && typeof product.specs === 'object') {
    Object.entries(product.specs).forEach(([key, value]) => {
      rows.push({ label: PRODUCT_SPEC_LABELS[key] || key, value });
    });
  }
  rows.push({ label: 'На складе', value: `${product.stock != null ? product.stock : 0} шт.` });
  rows.push({ label: 'Бренд', value: 'Apple' });

  return `
    <div class="product-specs-table">
      ${rows.map(row => `
        <div class="product-spec-row">
          <span class="product-spec-label">${row.label}</span>
          <span class="product-spec-value">${row.value}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function renderProductDetailColorBadge(color) {
  if (!color?.name) return '';
  return `
    <span class="pc-detail-color-badge" id="productDetailColorBadge" style="--swatch: ${color.hex}">
      <span class="pc-detail-color-badge__dot" aria-hidden="true"></span>
      <span class="pc-detail-color-badge__name">${escapeHtml(color.name)}</span>
    </span>
  `;
}

function renderProductDetail(product, initialColor = product.colors?.[0]) {
  const categoryLabel = CATEGORY_LABELS[product.category] || product.category;
  const attrTags = PRODUCT_ATTRIBUTE_FIELDS
    .filter(f => product[f])
    .map(f => `<span class="product-attr-tag">${escapeHtml(product[f])}</span>`)
    .join('');

  return `
    <div class="pc-detail-hero">
      ${renderItemGallery(product, GALLERY_UI.product)}
      <div class="pc-detail-info">
        <div class="breadcrumbs">
          <a href="index.html">Главная</a> /
          <a href="catalog.html">Каталог</a> /
          <a href="catalog.html?cat=${escapeHtml(product.category)}">${escapeHtml(categoryLabel)}</a> /
          <span>${escapeHtml(product.name)}</span>
        </div>
        <div class="product-category">${escapeHtml(categoryLabel)}</div>
        <div class="pc-detail-heading">
          <h1 class="pc-detail-title" id="productDetailTitleName">${escapeHtml(product.name)}</h1>
          ${renderProductDetailColorBadge(initialColor)}
        </div>
        ${renderRatingSummary(product.id, 'product', { variant: 'hero' })}
        ${attrTags ? `<div class="product-attrs product-detail-attrs">${attrTags}</div>` : ''}
        <div class="product-price pc-detail-price">${renderProductPriceHtml(initialColor?.price ?? product.price, initialColor?.oldPrice ?? product.oldPrice ?? 0)}</div>
        <div class="product-stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
          ${product.stock > 0 ? `✓ В наличии: ${product.stock} шт.` : 'Нет в наличии'}
        </div>
        <div class="pc-detail-actions">
          <button class="btn btn-primary btn-lg add-to-cart-btn" data-id="${escapeHtml(product.id)}" data-type="product">Добавить в корзину</button>
          <a href="catalog.html?cat=${escapeHtml(product.category)}" class="btn btn-secondary btn-lg">← К каталогу</a>
        </div>
        <div class="pc-detail-description">
          <h2>Описание</h2>
          <p class="pc-full-desc">${escapeHtml(product.fullDescription || product.description || '')}</p>
        </div>
      </div>
    </div>

    <section class="pc-detail-section">
      <h2>Характеристики</h2>
      ${renderProductSpecsTable(product)}
    </section>

    ${renderReviewsSection(product.id, 'product')}
  `;
}

function updateProductDetailColorLabel(container, product, color) {
  const badge = container.querySelector('#productDetailColorBadge');
  if (!color?.name) {
    if (badge) badge.remove();
    document.title = `${product.name} — Phone Market`;
    return;
  }

  if (badge) {
    badge.style.setProperty('--swatch', color.hex);
    const nameEl = badge.querySelector('.pc-detail-color-badge__name');
    if (nameEl) nameEl.textContent = color.name;
  }

  document.title = `${product.name} — ${color.name} — Phone Market`;

  const params = new URLSearchParams(window.location.search);
  params.set('color', color.name);
  const nextUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, '', nextUrl);
}

function handleProductDetailColorChange(colorIndex, currentProduct, currentContainer) {
  const color = currentProduct.colors?.[colorIndex] || currentProduct.colors?.[0];
  const priceEl = currentContainer.querySelector('.pc-detail-price');
  if (priceEl && color) {
    priceEl.innerHTML = renderProductPriceHtml(
      color.price ?? currentProduct.price,
      color.oldPrice ?? currentProduct.oldPrice ?? 0
    );
  }
  updateProductDetailColorLabel(currentContainer, currentProduct, color);
}

function initProductDetailPage() {
  const container = document.getElementById('productDetailContent');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    container.innerHTML = `
      <div class="container pc-detail-page" style="text-align:center">
        <h2>Товар не указан</h2>
        <a href="catalog.html" class="btn btn-primary">Перейти в каталог</a>
      </div>`;
    return;
  }

  const product = getEnrichedProductById(id);
  if (!product) {
    container.innerHTML = `
      <div class="container pc-detail-page" style="text-align:center">
        <h2>Товар не найден</h2>
        <a href="catalog.html" class="btn btn-primary">Перейти в каталог</a>
      </div>`;
    return;
  }

  const colorParam = params.get('color');
  const colorIndex = getProductColorIndex(product, colorParam);
  const initialColor = product.colors?.[colorIndex] || product.colors?.[0];

  document.title = initialColor?.name
    ? `${product.name} — ${initialColor.name} — Phone Market`
    : `${product.name} — Phone Market`;
  if (typeof updatePageTransitionLabel === 'function') updatePageTransitionLabel(product.name);
  if (typeof updatePageTransitionImage === 'function') {
    updatePageTransitionImage(initialColor?.img || getItemTransitionImage(product));
  }

  container.innerHTML = `<div class="container pc-detail-page">${renderProductDetail(product, initialColor)}</div>`;

  const galleryOptions = {
    onColorChange: handleProductDetailColorChange,
  };

  bindItemGalleryAndColor(container, GALLERY_UI.product, product, galleryOptions);

  if (colorIndex > 0) {
    switchGalleryColor(container, product, colorIndex, GALLERY_UI.product, galleryOptions);
  }

  bindAddToCartButtons(container);
  bindReviewsSection(container, product.id, 'product');
  updateCartBadge();
}

if (document.getElementById('productDetailContent')) {
  initProductDetailPage();
}

const GALLERY_UI = {
  product: {
    galleryId: 'productGallery',
    mainImgId: 'productDetailMainImg',
    colorNameId: 'selectedColorName',
    pickerClass: 'product-color-picker',
    imageWrapClass: 'product-detail-image-wrap',
    mainImgClass: 'pc-detail-main-img',
    thumbsClass: 'pc-gallery-thumbs',
  },
  readyPc: {
    galleryId: 'pcGallery',
    mainImgId: 'pcDetailMainImg',
    colorNameId: 'pcSelectedColorName',
    pickerClass: 'pc-color-picker',
    imageWrapClass: 'pc-detail-image-wrap',
    mainImgClass: 'pc-detail-main-img',
    thumbsClass: 'pc-gallery-thumbs',
  },
};

function uniqueGalleryImages(list) {
  const seen = new Set();
  return list.filter(src => {
    if (!src || seen.has(src)) return false;
    seen.add(src);
    return true;
  });
}

function normalizeGallerySrc(src) {
  try {
    return decodeURI(src || '');
  } catch {
    return src || '';
  }
}

function getColorFilter(color) {
  if (!color?.filter || color.filter === 'none') return '';
  return color.filter;
}

function getGalleryItemsForColor(item, colorIndex = 0) {
  const colors = item.colors || [];
  if (colors.length) {
    const color = colors[colorIndex] ?? colors[0];
    const filter = getColorFilter(color);
    const images = uniqueGalleryImages((color.images || []).filter(Boolean));
    const fallback = color.img || getProductImg(item);
    const sources = images.length ? images : (fallback ? [fallback] : []);

    return sources.map(src => ({
      src,
      filter,
      colorName: color.name || '',
    }));
  }

  const flatImages = uniqueGalleryImages((item.images || []).filter(Boolean));
  if (flatImages.length) {
    return flatImages.map(src => ({ src, filter: '', colorName: '' }));
  }

  const src = getProductImg(item);
  return src ? [{ src, filter: '', colorName: '' }] : [];
}

function getGalleryInitial(item) {
  const items = getGalleryItemsForColor(item, 0);
  if (items.length) return items[0];
  return { src: getProductImg(item), filter: '', colorName: '' };
}

function isSameGalleryImage(a, b) {
  return normalizeGallerySrc(a) === normalizeGallerySrc(b);
}

function renderGalleryThumb(item, itemName, index, isActive) {
  const filterStyle = item.filter ? `filter:${item.filter};` : '';
  const safeName = escapeHtml(itemName);
  const safeSrc = escapeHtml(encodeAssetPath(item.src));
  const safeColorName = escapeHtml(item.colorName);
  const safeFilter = escapeHtml(item.filter || '');
  return `
    <button
      type="button"
      class="pc-gallery-thumb ${isActive ? 'active' : ''}"
      data-src="${safeSrc}"
      data-filter="${safeFilter}"
      data-color-name="${safeColorName}"
      aria-label="Фото ${index + 1}${item.colorName ? `: ${item.colorName}` : ''}"
    >
      <img
        src="${encodeAssetPath(item.src)}"
        alt="${safeName}"
        style="${filterStyle}"
        loading="lazy"
        onerror="this.src='${DEFAULT_IMG}'"
      >
    </button>
  `;
}

function renderGalleryThumbsHtml(items, itemName, activeSrc, activeFilter) {
  if (items.length <= 1) return '';
  return items.map((entry, i) => {
    const isActive = isSameGalleryImage(entry.src, activeSrc)
      && (entry.filter || '') === (activeFilter || '');
    return renderGalleryThumb(entry, itemName, i, isActive);
  }).join('');
}

function renderItemColorPicker(item, ui) {
  const colors = item.colors || [];
  if (!colors.length) return '';

  const initial = colors[0];
  return `
    <div class="${ui.pickerClass}" data-item-id="${escapeHtml(item.id)}">
      <span class="color-picker-label">Цвет: <strong id="${ui.colorNameId}">${escapeHtml(initial.name)}</strong></span>
      <div class="color-picker-btns">
        ${colors.map((color, i) => `
          <button
            type="button"
            class="color-btn ${i === 0 ? 'active' : ''}"
            data-index="${i}"
            data-name="${escapeHtml(color.name)}"
            data-img="${encodeAssetPath(color.images?.[0] || color.img || getProductImg(item))}"
            data-filter="${escapeHtml(color.filter || 'none')}"
            data-price="${color.price ?? item.price}"
            data-old-price="${color.oldPrice ?? item.oldPrice ?? ''}"
            style="--swatch: ${color.hex}"
            title="${escapeHtml(color.name)}"
            aria-label="Цвет: ${escapeHtml(color.name)}"
          ></button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderItemGallery(item, ui) {
  const galleryItems = getGalleryItemsForColor(item, 0);
  const initial = galleryItems[0] || getGalleryInitial(item);
  const thumbs = galleryItems.length > 1
    ? `<div class="${ui.thumbsClass}">${renderGalleryThumbsHtml(galleryItems, item.name, initial.src, initial.filter)}</div>`
    : '';

  return `
    <div class="pc-detail-gallery" id="${ui.galleryId}" data-active-color="0">
      <div class="${ui.imageWrapClass}">
        ${item.badge ? `<span class="product-badge ${item.badge}">${BADGE_LABELS[item.badge] || item.badge}</span>` : ''}
        <img
          class="${ui.mainImgClass}"
          id="${ui.mainImgId}"
          src="${encodeAssetPath(initial.src)}"
          alt="${escapeHtml(item.name)}"
          style="filter: ${initial.filter || ''}"
          onerror="this.src='${DEFAULT_IMG}'"
        >
      </div>
      ${renderItemColorPicker(item, ui)}
      ${thumbs}
    </div>
  `;
}

function setGalleryMainImage(container, src, filter, colorName, ui) {
  const main = container.querySelector(`#${ui.mainImgId}`);
  if (!main) return;
  const encodedSrc = encodeAssetPath(src);
  main.src = encodedSrc;
  main.style.filter = filter || '';

  container.querySelectorAll('.pc-gallery-thumb').forEach(btn => {
    const matchesSrc = isSameGalleryImage(btn.dataset.src, src) || isSameGalleryImage(btn.dataset.src, encodedSrc);
    const matchesFilter = (btn.dataset.filter || '') === (filter || '');
    btn.classList.toggle('active', matchesSrc && matchesFilter);
  });

  if (colorName) {
    syncColorPickerWithGalleryImage(container, src, colorName, ui);
  }
}

function syncColorPickerWithGalleryImage(container, src, preferredColorName, ui) {
  const picker = container.querySelector(`.${ui.pickerClass}`);
  if (!picker) return;
  const colorNameEl = container.querySelector(`#${ui.colorNameId}`);
  let matched = false;

  picker.querySelectorAll('.color-btn').forEach(btn => {
    const isMatch = preferredColorName
      ? btn.dataset.name === preferredColorName
      : isSameGalleryImage(btn.dataset.img, src);
    btn.classList.toggle('active', isMatch);
    if (isMatch) {
      matched = true;
      if (colorNameEl) colorNameEl.textContent = btn.dataset.name;
    }
  });

  if (!matched && colorNameEl) {
    const active = picker.querySelector('.color-btn.active');
    if (active) colorNameEl.textContent = active.dataset.name;
  }
}

function updateGalleryThumbs(container, item, colorIndex, ui) {
  const gallery = container.querySelector(`#${ui.galleryId}`);
  if (!gallery) return;

  const items = getGalleryItemsForColor(item, colorIndex);
  let thumbsWrap = gallery.querySelector(`.${ui.thumbsClass}`);

  if (items.length <= 1) {
    if (thumbsWrap) thumbsWrap.remove();
    return;
  }

  const initial = items[0];
  const html = renderGalleryThumbsHtml(items, item.name, initial.src, initial.filter);
  if (thumbsWrap) {
    thumbsWrap.innerHTML = html;
  } else {
    thumbsWrap = document.createElement('div');
    thumbsWrap.className = ui.thumbsClass;
    thumbsWrap.innerHTML = html;
    gallery.appendChild(thumbsWrap);
  }
}

function switchGalleryColor(container, item, colorIndex, ui, options = {}) {
  const gallery = container.querySelector(`#${ui.galleryId}`);
  if (!gallery) return;

  gallery.dataset.activeColor = String(colorIndex);
  updateGalleryThumbs(container, item, colorIndex, ui);

  const items = getGalleryItemsForColor(item, colorIndex);
  const first = items[0] || { src: getProductImg(item), filter: '', colorName: '' };
  setGalleryMainImage(container, first.src, first.filter, first.colorName, ui);

  if (typeof options.onColorChange === 'function') {
    options.onColorChange(colorIndex, item, container);
  }
}

function bindItemGallery(container, ui) {
  const gallery = container.querySelector(`#${ui.galleryId}`);
  if (!gallery) return;

  gallery.addEventListener('click', (event) => {
    const btn = event.target.closest('.pc-gallery-thumb');
    if (!btn || !gallery.contains(btn)) return;
    event.preventDefault();
    setGalleryMainImage(container, btn.dataset.src, btn.dataset.filter || '', btn.dataset.colorName || '', ui);
  });
}

function bindItemColorPicker(container, ui, item, options = {}) {
  const picker = container.querySelector(`.${ui.pickerClass}`);
  if (!picker) return;

  picker.querySelectorAll('.color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      picker.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const colorNameEl = container.querySelector(`#${ui.colorNameId}`);
      if (colorNameEl) colorNameEl.textContent = btn.dataset.name;

      switchGalleryColor(container, item, Number(btn.dataset.index) || 0, ui, options);
    });
  });
}

function bindItemGalleryAndColor(container, ui, item, options = {}) {
  bindItemGallery(container, ui);
  bindItemColorPicker(container, ui, item, options);
}

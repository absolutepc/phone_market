function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function normalizeColorName(colorName) {
  return colorName || '';
}

function cartItemsMatch(a, b) {
  return a.id === b.id
    && a.type === b.type
    && normalizeColorName(a.colorName) === normalizeColorName(b.colorName);
}

function findCartItem(cart, id, type, colorName = '') {
  const normalized = normalizeColorName(colorName);
  return cart.find(c => c.id === id && c.type === type && normalizeColorName(c.colorName) === normalized);
}

function getActiveItemColor(scope) {
  const activeBtn = (scope || document).querySelector(
    '.product-color-picker .color-btn.active, .product-card-color-btn.active'
  );
  if (!activeBtn) return null;
  return {
    colorName: activeBtn.dataset.name,
    colorHex: activeBtn.style.getPropertyValue('--swatch').trim(),
    img: activeBtn.dataset.img,
    filter: activeBtn.dataset.filter || '',
    price: Number(activeBtn.dataset.price || 0) || 0,
    oldPrice: Number(activeBtn.dataset.oldPrice || 0) || 0,
  };
}

function resolveItemColor(item, scope) {
  const selected = getActiveItemColor(scope);
  if (selected) return selected;
  const defaultColor = item.colors?.[0];
  if (defaultColor) {
    return {
      colorName: defaultColor.name,
      colorHex: defaultColor.hex,
      img: defaultColor.img || getProductImg(item),
      filter: defaultColor.filter || '',
      price: defaultColor.price ?? item.price,
      oldPrice: defaultColor.oldPrice ?? item.oldPrice ?? 0,
    };
  }
  return { colorName: '', colorHex: '', img: getProductImg(item), filter: '', price: item.price, oldPrice: item.oldPrice ?? 0 };
}

function renderProductPriceHtml(price, oldPrice = 0) {
  const oldPriceHtml = oldPrice ? `<span class="old-price">${formatPrice(oldPrice)}</span>` : '';
  return `${formatPrice(price)}${oldPriceHtml}`;
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(c => cartItemsMatch(c, item));
  if (existing) {
    existing.qty += item.qty || 1;
  } else {
    cart.push({ ...item, qty: item.qty || 1 });
  }
  saveCart(cart);
  const colorLabel = item.colorName ? ` (${item.colorName})` : '';
  showToast(`Товар добавлен в корзину${colorLabel}`, 'success');
}

function removeFromCart(id, type, colorName = '') {
  let cart = getCart();
  const normalized = normalizeColorName(colorName);
  cart = cart.filter(c => !(c.id === id && c.type === type && normalizeColorName(c.colorName) === normalized));
  saveCart(cart);
}

function updateCartQty(id, type, qty, colorName = '') {
  const cart = getCart();
  const item = findCartItem(cart, id, type, colorName);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}

function clearCart() {
  saveCart([]);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function updateCartBadge() {
  document.querySelectorAll('.cart-badge').forEach(badge => {
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function getCurrentUser() {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

function setCurrentUser(user) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
  updateAccountButton();
}

function getUsers() {
  return JSON.parse(localStorage.getItem('phonemarket_users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('phonemarket_users', JSON.stringify(users));
}

function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 11 && digits.startsWith('8')) return `+7${digits.slice(1)}`;
  if (digits.length === 11 && digits.startsWith('7')) return `+${digits}`;
  if (digits.length === 10) return `+7${digits}`;
  return `+${digits}`;
}

function formatPhoneDisplay(phone) {
  const normalized = normalizePhone(phone);
  const match = normalized.match(/^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (!match) return phone || '';
  return `+7 (${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
}

function isPhoneLogin(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length >= 10;
}

function getUserContactLabel(user) {
  if (!user) return '';
  if (user.provider === 'icloud') return user.email || 'Apple ID';
  if (user.phone) return formatPhoneDisplay(user.phone);
  return user.email || '';
}

function buildSessionUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email || '',
    phone: user.phone || '',
    provider: user.provider || 'local',
    role: user.role,
  };
}

function registerUser({ name, password, email = '', phone = '', contactType = 'email' }) {
  const users = getUsers();
  const trimmedName = String(name || '').trim();
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const normalizedPhone = phone ? normalizePhone(phone) : '';

  if (!trimmedName) {
    return { success: false, message: 'Введите имя' };
  }
  if (!password || password.length < 6) {
    return { success: false, message: 'Пароль должен быть не короче 6 символов' };
  }

  if (contactType === 'phone') {
    if (!normalizedPhone) return { success: false, message: 'Введите корректный номер телефона' };
    if (users.find(u => u.phone === normalizedPhone)) {
      return { success: false, message: 'Этот номер уже зарегистрирован' };
    }
  } else {
    if (!normalizedEmail) return { success: false, message: 'Введите email' };
    if (users.find(u => u.email === normalizedEmail)) {
      return { success: false, message: 'Email уже зарегистрирован' };
    }
  }

  const user = {
    id: 'u' + Date.now(),
    name: trimmedName,
    email: contactType === 'email' ? normalizedEmail : '',
    phone: contactType === 'phone' ? normalizedPhone : '',
    contactType,
    password,
    provider: 'local',
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  setCurrentUser(buildSessionUser(user));
  return { success: true };
}

function loginUser(login, password) {
  const value = String(login || '').trim();
  if (!value || !password) {
    return { success: false, message: 'Введите email или телефон и пароль' };
  }

  if (value.toLowerCase() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    setCurrentUser({ id: 'admin', name: 'Администратор', email: ADMIN_CREDENTIALS.email, role: 'admin', provider: 'local' });
    return { success: true, isAdmin: true };
  }

  const users = getUsers();
  const user = users.find((item) => {
    if (item.provider === 'icloud' || !item.password || item.password !== password) return false;
    if (isPhoneLogin(value)) return item.phone && normalizePhone(item.phone) === normalizePhone(value);
    return item.email && item.email.toLowerCase() === value.toLowerCase();
  });

  if (user) {
    setCurrentUser(buildSessionUser(user));
    return { success: true };
  }

  return { success: false, message: 'Неверный email, телефон или пароль' };
}

function loginWithICloud(appleIdEmail) {
  const email = String(appleIdEmail || '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Введите корректный Apple ID (email)' };
  }

  const users = getUsers();
  let user = users.find(item => item.provider === 'icloud' && item.email === email);
  if (!user) {
    const localName = email.split('@')[0].replace(/[._-]+/g, ' ');
    const displayName = localName
      .split(' ')
      .filter(Boolean)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ') || 'Пользователь iCloud';

    user = {
      id: 'icloud-' + Date.now(),
      name: displayName,
      email,
      phone: '',
      provider: 'icloud',
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveUsers(users);
  }

  setCurrentUser(buildSessionUser(user));
  return { success: true };
}

function logoutUser() {
  setCurrentUser(null);
}

function updateAccountButton() {
  const btn = document.querySelector('.account-btn-text');
  if (!btn) return;
  btn.textContent = 'Профиль';
}

function getOrders() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function createOrder(cart, user) {
  const orders = getOrders();
  const order = {
    id: 'ORD-' + Date.now(),
    items: [...cart],
    total: getCartTotal(),
    userId: user?.id || 'guest',
    userName: user?.name || 'Гость',
    userEmail: user?.email || '',
    userPhone: user?.phone || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.unshift(order);
  saveOrders(orders);
  return order;
}

function searchProducts(query) {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();
  return getProducts()
    .map(p => ({ ...p, type: 'product' }))
    .filter(item =>
      item.name.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.storage && item.storage.toLowerCase().includes(q)) ||
      (item.simType && item.simType.toLowerCase().includes(q)) ||
      (item.series && item.series.toLowerCase().includes(q)) ||
      (CATEGORY_LABELS[item.category] || '').toLowerCase().includes(q) ||
      (CATALOG_LINES.find(line => line.id === getProductLine(item))?.name || '').toLowerCase().includes(q)
    );
}

function renderCatalogLineCards() {
  return CATALOG_LINES.map(line => {
    const minPrice = getLineMinPrice(line.id);
    const count = getLineProductCount(line.id);
    const imageSrc = encodeAssetPath(line.pickerImg || line.img || DEFAULT_IMG);
    const priceLabel = minPrice ? `от ${formatPrice(minPrice)}` : 'Скоро в продаже';

    return `
      <a href="catalog.html?line=${line.id}" class="catalog-picker-card catalog-picker-card--${line.id}">
        <div class="catalog-picker-card__glow" aria-hidden="true"></div>
        <div class="catalog-picker-card__body">
          <span class="catalog-picker-card__eyebrow">${escapeHtml(line.pickerLabel || line.name)}</span>
          <h2 class="catalog-picker-card__title">${escapeHtml(line.name)}</h2>
          <p class="catalog-picker-card__tagline">${escapeHtml(line.pickerTagline || line.description)}</p>
          <div class="catalog-picker-card__footer">
            <span class="catalog-picker-card__price">${priceLabel}</span>
            <span class="catalog-picker-card__count">${formatProductCount(count)}</span>
          </div>
        </div>
        <div class="catalog-picker-card__visual">
          <img src="${imageSrc}" alt="" loading="lazy">
        </div>
        <span class="catalog-picker-card__cta" aria-hidden="true">Смотреть →</span>
      </a>
    `;
  }).join('');
}

function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function renderCardColorSwatches(product) {
  const colors = product.colors || [];
  if (!colors.length) return '';
  return `
    <div class="product-card-colors" data-product-id="${escapeHtml(product.id)}">
      ${colors.map((color, i) => `
        <button
          type="button"
          class="product-card-color-btn color-btn ${i === 0 ? 'active' : ''}"
          data-index="${i}"
          data-name="${escapeHtml(color.name)}"
          data-img="${encodeAssetPath(color.img || getProductImg(product))}"
          data-filter="${escapeHtml(color.filter || 'none')}"
          data-price="${color.price ?? product.price}"
          data-old-price="${color.oldPrice ?? product.oldPrice ?? ''}"
          style="--swatch: ${color.hex}"
          title="${escapeHtml(color.name)}"
          aria-label="Цвет: ${escapeHtml(color.name)}"
        ></button>
      `).join('')}
    </div>
  `;
}

function renderProductCard(product, type = 'product') {
  const badgeHtml = product.badge
    ? `<span class="product-badge ${product.badge}">${BADGE_LABELS[product.badge] || product.badge}</span>`
    : '';
  const categoryLabel = CATEGORY_LABELS[product.category] || product.category;
  const initialColor = product.colors?.[0];
  const imgSrc = initialColor?.img || getProductImg(product);
  const transitionImg = getItemTransitionImage(product);

  const attrTags = [
    product.storage && product.storage !== '—' && `<span class="product-attr-tag">${product.storage}</span>`,
    product.simType && product.simType !== '—' && `<span class="product-attr-tag">${product.simType}</span>`,
  ].filter(Boolean).join('');

  return `
    <div class="product-card" data-id="${product.id}" data-type="${type}">
      <div class="product-image">
        ${badgeHtml}
        ${renderProductImg(imgSrc, product.name)}
      </div>
      <div class="product-info">
        <div class="product-category">${categoryLabel}</div>
        <h3>${product.name}</h3>
        ${renderRatingSummary(product.id, 'product')}
        ${attrTags ? `<div class="product-attrs">${attrTags}</div>` : ''}
        <p>${product.description || ''}</p>
        ${renderCardColorSwatches(product)}
        <div class="product-footer">
          <div class="product-price">${renderProductPriceHtml(initialColor?.price ?? product.price, initialColor?.oldPrice ?? product.oldPrice ?? 0)}</div>
          <div class="product-actions">
            <a href="${buildProductDetailHref(product.id, initialColor?.name)}" class="btn btn-secondary btn-sm product-detail-link" data-transition-label="${escapeHtml(product.name)}" data-transition-image="${escapeHtml(encodeAssetPath(initialColor?.img || transitionImg))}">Подробнее</a>
            <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${product.id}" data-type="${type}">В корзину</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindCardColorSwatches(container) {
  (container || document).querySelectorAll('.product-card-colors:not([data-colors-bound])').forEach(picker => {
    picker.dataset.colorsBound = 'true';
    picker.querySelectorAll('.product-card-color-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        picker.querySelectorAll('.product-card-color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const card = picker.closest('.product-card');
        const img = card?.querySelector('.product-image img');
        const product = getProducts().find(item => item.id === picker.dataset.productId);
        const colorIndex = Number(btn.dataset.index) || 0;
        const color = product?.colors?.[colorIndex];
        const imgPath = color?.img || btn.dataset.img;
        if (img && imgPath) {
          img.src = encodeAssetPath(imgPath);
          const filter = color?.filter && color.filter !== 'none' ? color.filter : '';
          img.style.filter = filter;
        }
        const priceEl = card?.querySelector('.product-price');
        if (priceEl) {
          priceEl.innerHTML = renderProductPriceHtml(
            Number(btn.dataset.price || 0),
            Number(btn.dataset.oldPrice || 0)
          );
        }
        const detailLink = card?.querySelector('.product-detail-link');
        if (detailLink && product && color) {
          detailLink.href = buildProductDetailHref(product.id, color.name);
          detailLink.dataset.transitionImage = encodeAssetPath(color.img || getProductImg(product));
        }
      });
    });
  });
}

function bindAddToCartButtons(container) {
  (container || document).querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const type = btn.dataset.type || 'product';
      const item = getProducts().find(p => p.id === id);
      if (item) {
        const scope = btn.closest('.product-card') || btn.closest('.pc-detail-page') || container || document;
        const color = resolveItemColor(item, scope);
        addToCart({
          id: item.id,
          name: item.name,
          price: color.price || item.price,
          img: color.img,
          colorName: color.colorName,
          colorHex: color.colorHex,
          category: CATEGORY_LABELS[item.category] || item.category,
          type,
        });
      }
    });
  });
}

function bindProductCards(container) {
  bindAddToCartButtons(container);
  bindCardColorSwatches(container);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  updateAccountButton();
});

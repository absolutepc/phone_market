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
    };
  }
  return { colorName: '', colorHex: '', img: getProductImg(item), filter: '' };
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

function registerUser(name, email, password) {
  const users = getUsers();
  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Email уже зарегистрирован' };
  }
  const user = { id: 'u' + Date.now(), name, email, password, createdAt: new Date().toISOString() };
  users.push(user);
  saveUsers(users);
  setCurrentUser({ id: user.id, name: user.name, email: user.email });
  return { success: true };
}

function loginUser(email, password) {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    setCurrentUser({ id: 'admin', name: 'Администратор', email, role: 'admin' });
    return { success: true, isAdmin: true };
  }
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    setCurrentUser({ id: user.id, name: user.name, email: user.email });
    return { success: true };
  }
  return { success: false, message: 'Неверный email или пароль' };
}

function logoutUser() {
  setCurrentUser(null);
}

function updateAccountButton() {
  const btn = document.querySelector('.account-btn-text');
  if (!btn) return;
  const user = getCurrentUser();
  btn.textContent = user ? user.name.split(' ')[0] : 'Аккаунт';
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
      (CATEGORY_LABELS[item.category] || '').toLowerCase().includes(q)
    );
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
  const oldPriceHtml = product.oldPrice
    ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>`
    : '';
  const categoryLabel = CATEGORY_LABELS[product.category] || product.category;
  const initialColor = product.colors?.[0];
  const imgSrc = initialColor?.img || getProductImg(product);
  const imgFilter = initialColor?.filter && initialColor.filter !== 'none' ? initialColor.filter : '';
  const transitionImg = getItemTransitionImage(product);

  const attrTags = [
    product.storage && `<span class="product-attr-tag">${product.storage}</span>`,
    product.simType && `<span class="product-attr-tag">${product.simType}</span>`,
  ].filter(Boolean).join('');

  return `
    <div class="product-card" data-id="${product.id}" data-type="${type}">
      <div class="product-image">
        ${badgeHtml}
        ${renderProductImg(imgSrc, product.name, imgFilter)}
      </div>
      <div class="product-info">
        <div class="product-category">${categoryLabel}</div>
        <h3>${product.name}</h3>
        ${renderRatingSummary(product.id, 'product')}
        ${attrTags ? `<div class="product-attrs">${attrTags}</div>` : ''}
        <p>${product.description || ''}</p>
        ${renderCardColorSwatches(product)}
        <div class="product-footer">
          <div class="product-price">${formatPrice(product.price)}${oldPriceHtml}</div>
          <div class="product-actions">
            <a href="product.html?id=${product.id}" class="btn btn-secondary btn-sm" data-transition-label="${escapeHtml(product.name)}" data-transition-image="${escapeHtml(transitionImg)}">Подробнее</a>
            <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${product.id}" data-type="${type}">В корзину</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindCardColorSwatches(container) {
  (container || document).querySelectorAll('.product-card-colors').forEach(picker => {
    picker.querySelectorAll('.product-card-color-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        picker.querySelectorAll('.product-card-color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const card = picker.closest('.product-card');
        const img = card?.querySelector('.product-image img');
        if (img) {
          img.src = encodeAssetPath(btn.dataset.img);
          const filter = btn.dataset.filter;
          img.style.filter = filter && filter !== 'none' ? filter : '';
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
          price: item.price,
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

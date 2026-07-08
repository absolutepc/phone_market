let adminSection = 'dashboard';

function parseProductColors(raw, basePrice = 0, baseOldPrice = null) {
  if (!raw || !raw.trim()) return undefined;

  const colors = raw.trim().split('\n').map(line => {
    const parts = line.split('|').map(s => s.trim()).filter(Boolean);
    if (parts.length < 2) return null;

    const [name, hex, third = '', fourth = '', ...rest] = parts;
    const thirdNumber = Number(third);
    const fourthNumber = Number(fourth);
    const hasPrice = Number.isFinite(thirdNumber) && third !== '';
    const hasOldPrice = Number.isFinite(fourthNumber) && fourth !== '';

    const images = hasPrice
      ? (hasOldPrice ? rest : [fourth, ...rest].filter(Boolean))
      : [third, fourth, ...rest].filter(Boolean);

    return {
      name,
      hex,
      price: hasPrice ? thirdNumber : basePrice,
      oldPrice: hasOldPrice ? fourthNumber : baseOldPrice,
      img: images[0] || undefined,
      images: images.length ? images : undefined,
      filter: 'none',
    };
  }).filter(Boolean);

  return colors.length ? colors : undefined;
}

function formatProductColors(colors) {
  if (!colors?.length) return '';
  return colors.map(color => {
    const images = color.images?.length ? color.images : (color.img ? [color.img] : []);
    return [
      color.name,
      color.hex,
      color.price ?? '',
      color.oldPrice ?? '',
      ...images,
    ].filter(value => value !== '' && value != null).join('|');
  }).join('\n');
}

function getAdminProductBasePrice(product) {
  return product.colors?.[0]?.price ?? product.price ?? 0;
}

function getAdminProductOldPrice(product) {
  return product.colors?.[0]?.oldPrice ?? product.oldPrice ?? null;
}

function buildProductPayload(formData, existing = null) {
  const basePrice = Number(formData.price) || 0;
  const baseOldPrice = formData.oldPrice ? Number(formData.oldPrice) : null;
  const colors = parseProductColors(formData.colors, basePrice, baseOldPrice)
    || buildColors(getColorSetForCategory(formData.category), basePrice, baseOldPrice);

  const firstColor = colors[0];

  return {
    ...(existing || {}),
    name: formData.name.trim(),
    category: formData.category,
    price: basePrice,
    oldPrice: baseOldPrice,
    img: firstColor?.img || getProductImg(existing || {}),
    description: (formData.description || '').trim(),
    fullDescription: (formData.fullDescription || formData.description || '').trim(),
    badge: formData.badge || undefined,
    stock: Number(formData.stock) || 0,
    brand: 'Apple',
    storage: formData.storage,
    simType: formData.simType,
    series: formData.series || CATEGORY_LABELS[formData.category] || '',
    specs: existing?.specs || {},
    colors,
  };
}

function initAdmin() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    document.getElementById('adminGate').style.display = 'flex';
    document.getElementById('adminPanel').style.display = 'none';
    bindAdminLogin();
    return;
  }

  document.getElementById('adminGate').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'grid';
  renderAdminSection(adminSection);
  bindAdminNav();
}

function bindAdminLogin() {
  const form = document.getElementById('adminLoginForm');
  if (!form || form.dataset.bound === '1') return;
  form.dataset.bound = '1';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value;
    const result = loginUser(email, password);

    if (result.success && result.isAdmin) {
      showToast('Добро пожаловать, администратор!', 'success');
      initAdmin();
    } else {
      showToast('Только для администраторов. admin@phonemarket.ru / admin123', 'error');
    }
  });
}

function bindAdminNav() {
  document.querySelectorAll('.admin-nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      adminSection = btn.dataset.section;
      document.querySelectorAll('.admin-nav button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAdminSection(adminSection);
    });
  });
}

function renderAdminSection(section) {
  const main = document.getElementById('adminContent');
  if (!main) return;

  switch (section) {
    case 'dashboard':
      main.innerHTML = renderDashboard();
      break;
    case 'products':
      main.innerHTML = renderProductsAdmin();
      bindProductAdmin();
      break;
    case 'orders':
      main.innerHTML = renderOrdersAdmin();
      bindOrdersAdmin();
      break;
    case 'users':
      main.innerHTML = renderUsersAdmin();
      break;
    case 'reviews':
      main.innerHTML = renderReviewsAdmin();
      break;
    case 'settings':
      main.innerHTML = renderSettingsAdmin();
      bindSettingsAdmin();
      break;
    default:
      main.innerHTML = renderDashboard();
  }
}

function renderDashboard() {
  const products = getProducts();
  const orders = getOrders();
  const users = getUsers();
  const reviews = getReviews();
  const revenue = orders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);

  return `
    <div class="admin-header"><h1>Панель управления</h1></div>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Выручка</div>
        <div class="stat-value">${formatPrice(revenue)}</div>
        <div class="stat-change positive">Доставленные заказы</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Товары</div>
        <div class="stat-value">${products.length}</div>
        <div class="stat-change positive">В каталоге iPhone</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Заказы</div>
        <div class="stat-value">${orders.length}</div>
        <div class="stat-change positive">Всего оформлено</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Клиенты / отзывы</div>
        <div class="stat-value">${users.length} / ${reviews.length}</div>
        <div class="stat-change positive">База магазина</div>
      </div>
    </div>
    <h2 style="margin-bottom:16px;font-size:1.2rem">Последние заказы</h2>
    ${renderOrdersTable(getOrders().slice(0, 5))}
  `;
}

function renderProductsAdmin() {
  const products = getProducts();
  return `
    <div class="admin-header">
      <h1>Товары</h1>
      <button class="btn btn-primary btn-sm" id="addProductBtn">+ Добавить товар</button>
    </div>
    <div id="productFormWrap" style="display:none;margin-bottom:24px">
      <div class="account-content">
        <h2 id="productFormTitle">Добавить товар</h2>
        <form id="productEditForm">
          <input type="hidden" name="editId" value="">
          <div class="admin-form-grid">
            <div class="form-group"><label>Название</label><input name="name" required></div>
            <div class="form-group"><label>Категория</label>
              <select name="category" required>
                ${Object.entries(CATEGORY_LABELS).map(([key, label]) => `<option value="${key}">${label}</option>`).join('')}
              </select>
            </div>
            <div class="form-group"><label>Базовая цена (₽)</label><input name="price" type="number" min="0" required></div>
            <div class="form-group"><label>Старая цена (₽)</label><input name="oldPrice" type="number" min="0"></div>
            <div class="form-group"><label>Память</label><input name="storage" required></div>
            <div class="form-group"><label>SIM</label><input name="simType" required></div>
            <div class="form-group"><label>Серия</label><input name="series" required></div>
            <div class="form-group"><label>На складе</label><input name="stock" type="number" min="0" required></div>
            <div class="form-group"><label>Метка</label>
              <select name="badge">
                <option value="">Нет</option>
                <option value="new">Новинка</option>
                <option value="hit">Хит</option>
                <option value="sale">Скидка</option>
              </select>
            </div>
          </div>
          <div class="form-group"><label>Краткое описание</label><textarea name="description" rows="2"></textarea></div>
          <div class="form-group"><label>Полное описание</label><textarea name="fullDescription" rows="4"></textarea></div>
          <div class="form-group">
            <label>Цвета и цены</label>
            <textarea name="colors" rows="6" placeholder="Формат: Название|#hex|цена|стараяЦена|фото1|фото2&#10;Чёрный|#1d1d1f|89990|94990|img/phones/standard/black.png"></textarea>
          </div>
          <div style="display:flex;gap:8px;margin-top:16px">
            <button type="submit" class="btn btn-primary btn-sm">Сохранить</button>
            <button type="button" class="btn btn-secondary btn-sm" id="cancelProductForm">Отмена</button>
          </div>
        </form>
      </div>
    </div>
    <table class="admin-table">
      <thead><tr><th>Товар</th><th>Категория</th><th>Цена</th><th>Цветов</th><th>Склад</th><th>Действия</th></tr></thead>
      <tbody>
        ${products.map(product => `
          <tr>
            <td><img class="admin-product-thumb" src="${getProductImg(product)}" alt=""> ${escapeHtml(product.name)}</td>
            <td>${escapeHtml(CATEGORY_LABELS[product.category] || product.category)}</td>
            <td>${formatPrice(getAdminProductBasePrice(product))}</td>
            <td>${product.colors?.length || 0}</td>
            <td>${product.stock ?? 0}</td>
            <td>
              <button class="btn btn-secondary btn-sm edit-product" data-id="${product.id}">Изменить</button>
              <button class="btn btn-danger btn-sm delete-product" data-id="${product.id}">Удалить</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function bindProductAdmin() {
  const formWrap = document.getElementById('productFormWrap');
  const form = document.getElementById('productEditForm');
  const addBtn = document.getElementById('addProductBtn');
  const cancelBtn = document.getElementById('cancelProductForm');
  const titleEl = document.getElementById('productFormTitle');

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      form.reset();
      form.editId.value = '';
      titleEl.textContent = 'Добавить товар';
      formWrap.style.display = 'block';
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      formWrap.style.display = 'none';
    });
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const products = getProducts();
      const existing = data.editId ? products.find(product => product.id === data.editId) : null;
      const payload = buildProductPayload(data, existing);

      if (data.editId) {
        const index = products.findIndex(product => product.id === data.editId);
        if (index >= 0) products[index] = { ...products[index], ...payload };
      } else {
        products.push({
          id: `ip-${Date.now()}`,
          ...payload,
        });
      }

      saveProducts(products);
      showToast('Товар сохранён', 'success');
      renderAdminSection('products');
    });
  }

  document.querySelectorAll('.edit-product').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = getProducts().find(item => item.id === btn.dataset.id);
      if (!product) return;
      formWrap.style.display = 'block';
      titleEl.textContent = `Редактировать: ${product.name}`;
      form.editId.value = product.id;
      form.name.value = product.name || '';
      form.category.value = product.category || 'iphone-17';
      form.price.value = getAdminProductBasePrice(product);
      form.oldPrice.value = getAdminProductOldPrice(product) ?? '';
      form.storage.value = product.storage || '';
      form.simType.value = product.simType || '';
      form.series.value = product.series || '';
      form.stock.value = product.stock ?? 0;
      form.badge.value = product.badge || '';
      form.description.value = product.description || '';
      form.fullDescription.value = product.fullDescription || '';
      form.colors.value = formatProductColors(product.colors);
      formWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  document.querySelectorAll('.delete-product').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!confirm('Удалить этот товар?')) return;
      saveProducts(getProducts().filter(product => product.id !== btn.dataset.id));
      showToast('Товар удалён', 'success');
      renderAdminSection('products');
    });
  });
}

function renderOrdersTable(orders) {
  if (!orders.length) {
    return '<p style="color:var(--text-secondary)">Заказов пока нет.</p>';
  }

  return `
    <table class="admin-table">
      <thead><tr><th>№ заказа</th><th>Клиент</th><th>Сумма</th><th>Статус</th><th>Дата</th><th>Действия</th></tr></thead>
      <tbody>
        ${orders.map(order => `
          <tr>
            <td>${order.id}</td>
            <td>${escapeHtml(order.userName || 'Гость')}</td>
            <td>${formatPrice(order.total)}</td>
            <td><span class="status-badge ${order.status}">${STATUS_LABELS[order.status] || order.status}</span></td>
            <td>${new Date(order.createdAt).toLocaleDateString('ru-RU')}</td>
            <td>
              ${order.status === 'pending' ? `
                <button class="btn btn-primary btn-sm ship-order" data-id="${order.id}">Отправить</button>
                <button class="btn btn-danger btn-sm cancel-order" data-id="${order.id}">Отменить</button>
              ` : ''}
              ${order.status === 'shipped' ? `<button class="btn btn-primary btn-sm deliver-order" data-id="${order.id}">Доставлен</button>` : ''}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderOrdersAdmin() {
  return `
    <div class="admin-header"><h1>Заказы</h1></div>
    ${renderOrdersTable(getOrders())}
  `;
}

function updateOrderStatus(id, status) {
  const orders = getOrders();
  const order = orders.find(item => item.id === id);
  if (!order) return;
  order.status = status;
  saveOrders(orders);
  showToast(`Заказ обновлён: ${STATUS_LABELS[status] || status}`, 'success');
  renderAdminSection('orders');
}

function bindOrdersAdmin() {
  document.querySelectorAll('.ship-order').forEach(btn => {
    btn.addEventListener('click', () => updateOrderStatus(btn.dataset.id, 'shipped'));
  });
  document.querySelectorAll('.deliver-order').forEach(btn => {
    btn.addEventListener('click', () => updateOrderStatus(btn.dataset.id, 'delivered'));
  });
  document.querySelectorAll('.cancel-order').forEach(btn => {
    btn.addEventListener('click', () => updateOrderStatus(btn.dataset.id, 'cancelled'));
  });
}

function renderUsersAdmin() {
  const users = getUsers();
  return `
    <div class="admin-header"><h1>Клиенты</h1></div>
    <table class="admin-table">
      <thead><tr><th>Имя</th><th>Email</th><th>Дата регистрации</th><th>Роль</th></tr></thead>
      <tbody>
        ${users.length
          ? users.map(user => `
            <tr>
              <td>${escapeHtml(user.name)}</td>
              <td>${escapeHtml(user.email)}</td>
              <td>${new Date(user.createdAt).toLocaleDateString('ru-RU')}</td>
              <td>${user.role === 'admin' ? 'Администратор' : 'Клиент'}</td>
            </tr>
          `).join('')
          : '<tr><td colspan="4" style="text-align:center;color:var(--text-secondary)">Пока нет зарегистрированных пользователей</td></tr>'}
      </tbody>
    </table>
  `;
}

function renderReviewsAdmin() {
  const reviews = getReviews();
  return `
    <div class="admin-header"><h1>Отзывы</h1></div>
    <table class="admin-table">
      <thead><tr><th>Автор</th><th>Товар</th><th>Оценка</th><th>Комментарий</th><th>Дата</th></tr></thead>
      <tbody>
        ${reviews.length
          ? reviews.map(review => {
            const meta = getReviewItemMeta(review.itemId, review.itemType);
            return `
              <tr>
                <td>${escapeHtml(review.userName || review.author || 'Покупатель')}</td>
                <td>${escapeHtml(meta?.name || review.itemId)}</td>
                <td>${review.rating} / 5</td>
                <td>${escapeHtml(review.text || '')}</td>
                <td>${new Date(review.createdAt).toLocaleDateString('ru-RU')}</td>
              </tr>
            `;
          }).join('')
          : '<tr><td colspan="5" style="text-align:center;color:var(--text-secondary)">Отзывов пока нет</td></tr>'}
      </tbody>
    </table>
  `;
}

function renderSettingsAdmin() {
  const productCount = getProducts().length;
  const reviewCount = getReviews().length;
  return `
    <div class="admin-header"><h1>Настройки</h1></div>
    <div class="account-content">
      <h2>Информация о магазине</h2>
      <div class="admin-form-grid">
        <div class="form-group"><label>Название</label><input id="settingsStoreName" value="Phone Market"></div>
        <div class="form-group"><label>Email</label><input id="settingsStoreEmail" value="info@phonemarket.ru"></div>
        <div class="form-group"><label>Телефон</label><input id="settingsStorePhone" value="+7 (495) 123-45-67"></div>
        <div class="form-group"><label>Ассортимент</label><input value="${productCount} товаров" disabled></div>
        <div class="form-group"><label>Отзывы</label><input value="${reviewCount}" disabled></div>
        <div class="form-group"><label>Админ логин</label><input value="${ADMIN_CREDENTIALS.email}" disabled></div>
      </div>
      <button class="btn btn-primary" id="saveSettingsBtn" style="margin-top:16px">Сохранить</button>
    </div>
  `;
}

function bindSettingsAdmin() {
  const button = document.getElementById('saveSettingsBtn');
  if (!button) return;
  button.addEventListener('click', () => {
    showToast('Настройки сохранены', 'success');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('adminPanel') || document.getElementById('adminGate')) {
    initAdmin();
  }
});

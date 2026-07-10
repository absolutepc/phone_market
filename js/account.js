function setRegisterContactType(type) {
  const emailGroup = document.getElementById('registerEmailGroup');
  const phoneGroup = document.getElementById('registerPhoneGroup');
  const emailInput = document.querySelector('#registerFormEl [name="email"]');
  const phoneInput = document.querySelector('#registerFormEl [name="phone"]');

  document.querySelectorAll('[data-register-contact]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.registerContact === type);
  });

  if (emailGroup) emailGroup.hidden = type !== 'email';
  if (phoneGroup) phoneGroup.hidden = type !== 'phone';
  if (emailInput) emailInput.required = type === 'email';
  if (phoneInput) phoneInput.required = type === 'phone';
}

function openICloudModal() {
  const modal = document.getElementById('icloudAuthModal');
  if (!modal) return;
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  const input = modal.querySelector('input[name="appleId"]');
  if (input) {
    input.value = '';
    input.focus();
  }
}

function closeICloudModal() {
  const modal = document.getElementById('icloudAuthModal');
  if (!modal) return;
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
}

function initAccountPage() {
  const authView = document.getElementById('authView');
  const dashboardView = document.getElementById('dashboardView');

  function showDashboard() {
    const user = getCurrentUser();
    if (!user) {
      authView.style.display = 'block';
      dashboardView.style.display = 'none';
      return;
    }

    authView.style.display = 'none';
    dashboardView.style.display = 'block';
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = getUserContactLabel(user);
    document.getElementById('userAvatar').textContent = user.name.charAt(0).toUpperCase();

    const adminLink = document.getElementById('adminPanelLink');
    if (adminLink) adminLink.style.display = user.role === 'admin' ? 'inline-flex' : 'none';

    renderOrders();
  }

  function renderOrders() {
    const user = getCurrentUser();
    const orders = getOrders().filter(order => order.userId === user.id);
    document.getElementById('accountContent').innerHTML = `
      <h2>Мои заказы</h2>
      ${orders.length
        ? orders.map(order => `
          <div class="order-card" style="margin-bottom:16px;padding:16px;background:var(--bg-card);border-radius:var(--radius-md)">
            <strong>${escapeHtml(order.id)}</strong> — ${formatPrice(order.total)} — ${new Date(order.createdAt).toLocaleDateString('ru-RU')}
          </div>
        `).join('')
        : '<p style="color:var(--text-secondary)">Заказов пока нет</p>'}
    `;
  }

  document.querySelectorAll('.form-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.form-tab').forEach(item => item.classList.remove('active'));
      tab.classList.add('active');
      const isLogin = tab.dataset.tab === 'login';
      document.getElementById('loginForm')?.classList.toggle('is-active', isLogin);
      document.getElementById('registerForm')?.classList.toggle('is-active', !isLogin);
    });
  });

  document.querySelectorAll('[data-register-contact]').forEach(btn => {
    btn.addEventListener('click', () => setRegisterContactType(btn.dataset.registerContact));
  });

  document.getElementById('loginFormEl')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = loginUser(formData.get('login'), formData.get('password'));
    if (result.success) {
      showToast('Добро пожаловать!', 'success');
      showDashboard();
    } else {
      showToast(result.message, 'error');
    }
  });

  document.getElementById('registerFormEl')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const contactType = document.querySelector('[data-register-contact].active')?.dataset.registerContact || 'email';
    const result = registerUser({
      name: formData.get('name'),
      password: formData.get('password'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      contactType,
    });

    if (result.success) {
      showToast('Аккаунт создан!', 'success');
      showDashboard();
    } else {
      showToast(result.message, 'error');
    }
  });

  document.getElementById('icloudLoginBtn')?.addEventListener('click', openICloudModal);
  document.getElementById('icloudRegisterBtn')?.addEventListener('click', openICloudModal);

  document.getElementById('icloudAuthForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = loginWithICloud(formData.get('appleId'));
    if (result.success) {
      closeICloudModal();
      showToast('Вход через iCloud выполнен', 'success');
      showDashboard();
    } else {
      showToast(result.message, 'error');
    }
  });

  document.querySelectorAll('[data-close-icloud-modal]').forEach(btn => {
    btn.addEventListener('click', closeICloudModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeICloudModal();
  });

  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    logoutUser();
    showDashboard();
  });

  setRegisterContactType('email');
  showDashboard();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('authView')) {
    initAccountPage();
  }
});

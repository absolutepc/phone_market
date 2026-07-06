const NAV_ITEMS = [
  { href: 'catalog.html', label: 'Каталог', page: 'catalog' },
  { href: 'reviews.html', label: 'Отзывы', page: 'reviews' },
  { href: 'about.html', label: 'О нас', page: 'about' },
];

function renderHeader(activePage) {
  const navLinks = NAV_ITEMS.map(item =>
    `<a href="${item.href}" class="${item.page === activePage ? 'active' : ''}">${item.label}</a>`
  ).join('');

  const accountLink = `<a href="account.html" class="main-nav-account ${activePage === 'account' ? 'active' : ''}"><span class="main-nav-account-icon" aria-hidden="true">👤</span><span class="account-btn-text">Аккаунт</span></a>`;

  return `
    <header class="site-header">
      <div class="container header-inner">
        <a href="index.html" class="logo">
          <div class="logo-icon"><img src="img/logo.svg" alt="Phone Market"></div>
          <span>Phone Market</span>
        </a>
        <nav class="main-nav" id="mainNav">${navLinks}${accountLink}</nav>
        <div class="header-search">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Поиск iPhone..." aria-label="Поиск">
        </div>
        <div class="header-actions">
          <a href="cart.html" class="header-btn header-btn-cart" aria-label="Корзина">
            <span class="header-btn-icon" aria-hidden="true">🛒</span>
            <span class="header-btn-label">Корзина</span>
            <span class="cart-badge" style="display:none">0</span>
          </a>
        </div>
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Меню" aria-expanded="false" aria-controls="mainNav">☰</button>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-top">
        <div class="footer-brand">
          <a href="index.html" class="logo">
            <div class="logo-icon"><img src="img/logo.svg" alt="Phone Market"></div>
            <span>Phone Market</span>
          </a>
          <p>Официальный реселлер Apple в России. Только оригинальные iPhone с гарантией и быстрой доставкой.</p>
          <div class="footer-social">
            <a href="#" aria-label="Telegram" title="Telegram"><i class="fab fa-telegram-plane"></i></a>
            <a href="#" aria-label="VK" title="VKontakte"><i class="fab fa-vk"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Каталог</h4>
          <ul>
            <li><a href="catalog.html?cat=iphone-17">iPhone 17</a></li>
            <li><a href="catalog.html?cat=iphone-17-plus">iPhone 17 Plus</a></li>
            <li><a href="catalog.html?cat=iphone-17-pro">iPhone 17 Pro</a></li>
            <li><a href="catalog.html?cat=iphone-17-pro-max">iPhone 17 Pro Max</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Покупателям</h4>
          <ul>
            <li><a href="reviews.html">Отзывы</a></li>
            <li><a href="about.html">О нас</a></li>
            <li><a href="account.html">Личный кабинет</a></li>
            <li><a href="cart.html">Корзина</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Контакты</h4>
          <ul>
            <li><a href="tel:+74951234567">+7 (495) 123-45-67</a></li>
            <li><a href="mailto:info@phonemarket.ru">info@phonemarket.ru</a></li>
            <li><a href="#">Москва, ТЦ «Город»</a></li>
            <li><a href="#">Пн–Вс: 10:00–22:00</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; 2026 Phone Market. Все права защищены. <span class="footer-credit">Фото на главной: <a href="https://unsplash.com/photos/34VzxoqHyB8" target="_blank" rel="noopener">Veli Batuhan Aytaç</a> / Unsplash</span></p>
        <div class="footer-payments">
          <span>Visa</span>
          <span>Mastercard</span>
          <span>Мир</span>
          <span>СБП</span>
          <span>Apple Pay</span>
        </div>
      </div>
    </footer>
  `;
}

function initLayout(activePage) {
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');
  if (headerEl) headerEl.innerHTML = renderHeader(activePage);
  if (footerEl) footerEl.innerHTML = renderFooter();

  const menuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('mainNav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (typeof updateAccountButton === 'function') {
    updateAccountButton();
  }

  const searchInput = document.querySelector('.header-search input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        window.location.href = `search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }

  if (typeof initPageTransition === 'function') {
    initPageTransition(getPageTransitionLabel(activePage));
  }
}

function getPageTransitionLabel(page) {
  const labels = {
    home: 'Главная',
    catalog: 'Каталог',
    cart: 'Корзина',
    account: 'Аккаунт',
    reviews: 'Отзывы',
    about: 'О нас',
    search: 'Поиск',
  };
  return labels[page] || 'Phone Market';
}

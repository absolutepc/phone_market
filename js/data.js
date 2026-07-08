const STORE_VERSION = 5;
const STORE_KEY = 'phonemarket_data_v1';
const LEGACY_STORE_KEYS = [];
const APP_BUILD = '1.0';
const CART_KEY = 'phonemarket_cart';
const USER_KEY = 'phonemarket_user';
const ORDERS_KEY = 'phonemarket_orders';
const REVIEWS_KEY = 'phonemarket_reviews';
const REVIEWS_VERSION = 1;
const DEFAULT_IMG = 'img/default.svg';

const ADMIN_CREDENTIALS = { email: 'admin@phonemarket.ru', password: 'admin123' };

const CATEGORY_IMAGES = {
  'iphone-17': 'img/phones/standard/black.png',
  'iphone-17-plus': 'img/phones/standard/black.png',
  'iphone-17-pro': 'img/phones/pro/black.png',
  'iphone-17-pro-max': 'img/phones/pro-max/black.png',
};

const FILTER_STORAGE = ['128 ГБ', '256 ГБ', '512 ГБ', '1 ТБ'];
const FILTER_SIM = ['eSIM', 'SIM + eSIM'];
const FILTER_SERIES = ['iPhone 17', 'iPhone 17 Plus', 'iPhone 17 Pro', 'iPhone 17 Pro Max'];

const PRODUCT_ATTRIBUTE_FIELDS = ['storage', 'simType', 'series'];

const CATEGORY_LABELS = {
  'iphone-17': 'iPhone 17',
  'iphone-17-plus': 'iPhone 17 Plus',
  'iphone-17-pro': 'iPhone 17 Pro',
  'iphone-17-pro-max': 'iPhone 17 Pro Max',
};

const ATTRIBUTE_LABELS = {
  storage: 'Память',
  simType: 'SIM',
  series: 'Серия',
};

const PRODUCT_SPEC_LABELS = {
  display: 'Дисплей',
  chip: 'Чип',
  camera: 'Камера',
  battery: 'Аккумулятор',
  connectivity: 'Связь',
  protection: 'Защита',
};

const BADGE_LABELS = { sale: 'Скидка', new: 'Новинка', hit: 'Хит' };
const STATUS_LABELS = { pending: 'В обработке', shipped: 'Отправлен', delivered: 'Доставлен', cancelled: 'Отменён' };

const CATALOG_SECTIONS = [
  {
    id: 'iphone',
    name: 'iPhone',
    description: 'Весь модельный ряд Apple iPhone 17',
    categories: ['iphone-17', 'iphone-17-plus', 'iphone-17-pro', 'iphone-17-pro-max'],
    img: 'img/phones/hero/iphone-17-hero.jpg',
  },
];

const STANDARD_COLORS = [
  { name: 'Чёрный', hex: '#1d1d1f', img: 'img/phones/standard/black.png' },
  { name: 'Белый', hex: '#f5f5f7', img: 'img/phones/standard/white.png' },
  { name: 'Розовый', hex: '#c8b4d8', img: 'img/phones/standard/lavender.png' },
  { name: 'Бирюзовый', hex: '#9bb89f', img: 'img/phones/standard/sage.png' },
  { name: 'Ультрамарин', hex: '#7ba3c9', img: 'img/phones/standard/mist-blue.png' },
];

const PRO_COLORS = [
  { name: 'Белый', hex: '#e8e8ed', img: 'img/phones/pro/white.png' },
  { name: 'Синий', hex: '#3d5a9e', img: 'img/phones/pro/blue.png' },
  { name: 'Оранжевый', hex: '#e8752a', img: 'img/phones/pro/orange.png' },
  { name: 'Чёрный', hex: '#1d1d1f', img: 'img/phones/pro/black.png' },
];

const PRO_MAX_COLORS = [
  { name: 'Белый', hex: '#e8e8ed', img: 'img/phones/pro-max/white.png' },
  { name: 'Синий', hex: '#3d5a9e', img: 'img/phones/pro-max/blue.png' },
  { name: 'Оранжевый', hex: '#e8752a', img: 'img/phones/pro-max/orange.png' },
  { name: 'Чёрный', hex: '#1d1d1f', img: 'img/phones/pro-max/black.png' },
];

function getColorSetForCategory(category) {
  if (category === 'iphone-17-pro-max') return PRO_MAX_COLORS;
  if (category === 'iphone-17-pro') return PRO_COLORS;
  return STANDARD_COLORS;
}

function getColorPriceAdjustment(colorName) {
  const adjustments = {
    'Чёрный': 0,
    'Белый': 1990,
    'Розовый': 2990,
    'Бирюзовый': 2490,
    'Ультрамарин': 3490,
    'Синий': 3990,
    'Оранжевый': 4990,
  };
  return adjustments[colorName] ?? 0;
}

function buildColors(colorSet, basePrice, baseOldPrice = null) {
  return colorSet.map(c => {
    const adjustment = getColorPriceAdjustment(c.name);
    return {
      ...c,
      price: basePrice + adjustment,
      oldPrice: baseOldPrice != null ? baseOldPrice + adjustment : null,
      filter: 'none',
      images: [c.img],
    };
  });
}

function createPhone({
  id, name, category, price, oldPrice, storage, simType, series,
  description, specs, badge, stock = 5,
}) {
  const colors = buildColors(getColorSetForCategory(category), price, oldPrice);
  const img = colors[0].img;
  return {
    id,
    name,
    category,
    price,
    oldPrice,
    img,
    description,
    badge,
    stock,
    brand: 'Apple',
    storage,
    simType,
    series,
    specs,
    colors,
  };
}

const DEFAULT_PRODUCTS = [
  createPhone({
    id: 'ip17',
    name: 'Apple iPhone 17',
    category: 'iphone-17',
    price: 89990,
    storage: '128 ГБ',
    simType: 'SIM + eSIM',
    series: 'iPhone 17',
    badge: 'new',
    description: '6.1″ Super Retina XDR, чип A19, 48 Мп Fusion-камера',
    specs: {
      display: '6.1″ Super Retina XDR OLED',
      chip: 'Apple A19',
      camera: '48 Мп Fusion + 12 Мп ультраширокая',
      battery: 'До 28 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C',
      protection: 'Ceramic Shield, IP68',
    },
  }),

  createPhone({
    id: 'ip17-plus',
    name: 'Apple iPhone 17 Plus',
    category: 'iphone-17-plus',
    price: 99990,
    storage: '128 ГБ',
    simType: 'SIM + eSIM',
    series: 'iPhone 17 Plus',
    badge: 'new',
    description: '6.7″ Super Retina XDR, увеличенная автономность, чип A19',
    specs: {
      display: '6.7″ Super Retina XDR OLED',
      chip: 'Apple A19',
      camera: '48 Мп Fusion + 12 Мп ультраширокая',
      battery: 'До 33 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C',
      protection: 'Ceramic Shield, IP68',
    },
  }),

  createPhone({
    id: 'ip17-pro-esim-128',
    name: 'Apple iPhone 17 Pro eSIM 128 ГБ',
    category: 'iphone-17-pro',
    price: 109990,
    storage: '128 ГБ',
    simType: 'eSIM',
    series: 'iPhone 17 Pro',
    badge: 'new',
    description: '6.3″ ProMotion 120 Гц, титановый корпус, A19 Pro, только eSIM',
    specs: {
      display: '6.3″ ProMotion OLED 120 Гц',
      chip: 'Apple A19 Pro',
      camera: '48 Мп Pro + 48 Мп ультраширокая + 12 Мп телефото 5×',
      battery: 'До 30 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C 3.0',
      protection: 'Титан Grade 5, Ceramic Shield, IP68',
    },
  }),

  createPhone({
    id: 'ip17-pro-esim-256',
    name: 'Apple iPhone 17 Pro eSIM 256 ГБ',
    category: 'iphone-17-pro',
    price: 119990,
    storage: '256 ГБ',
    simType: 'eSIM',
    series: 'iPhone 17 Pro',
    description: '6.3″ ProMotion 120 Гц, титановый корпус, A19 Pro, только eSIM',
    specs: {
      display: '6.3″ ProMotion OLED 120 Гц',
      chip: 'Apple A19 Pro',
      camera: '48 Мп Pro + 48 Мп ультраширокая + 12 Мп телефото 5×',
      battery: 'До 30 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C 3.0',
      protection: 'Титан Grade 5, Ceramic Shield, IP68',
    },
  }),

  createPhone({
    id: 'ip17-pro-esim-512',
    name: 'Apple iPhone 17 Pro eSIM 512 ГБ',
    category: 'iphone-17-pro',
    price: 139990,
    storage: '512 ГБ',
    simType: 'eSIM',
    series: 'iPhone 17 Pro',
    description: '6.3″ ProMotion 120 Гц, титановый корпус, A19 Pro, только eSIM',
    specs: {
      display: '6.3″ ProMotion OLED 120 Гц',
      chip: 'Apple A19 Pro',
      camera: '48 Мп Pro + 48 Мп ультраширокая + 12 Мп телефото 5×',
      battery: 'До 30 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C 3.0',
      protection: 'Титан Grade 5, Ceramic Shield, IP68',
    },
  }),

  createPhone({
    id: 'ip17-pro-128',
    name: 'Apple iPhone 17 Pro 128 ГБ',
    category: 'iphone-17-pro',
    price: 111990,
    storage: '128 ГБ',
    simType: 'SIM + eSIM',
    series: 'iPhone 17 Pro',
    badge: 'hit',
    description: '6.3″ ProMotion 120 Гц, титановый корпус, A19 Pro, физическая SIM + eSIM',
    specs: {
      display: '6.3″ ProMotion OLED 120 Гц',
      chip: 'Apple A19 Pro',
      camera: '48 Мп Pro + 48 Мп ультраширокая + 12 Мп телефото 5×',
      battery: 'До 30 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C 3.0',
      protection: 'Титан Grade 5, Ceramic Shield, IP68',
    },
  }),

  createPhone({
    id: 'ip17-pro-256',
    name: 'Apple iPhone 17 Pro 256 ГБ',
    category: 'iphone-17-pro',
    price: 121990,
    storage: '256 ГБ',
    simType: 'SIM + eSIM',
    series: 'iPhone 17 Pro',
    description: '6.3″ ProMotion 120 Гц, титановый корпус, A19 Pro, физическая SIM + eSIM',
    specs: {
      display: '6.3″ ProMotion OLED 120 Гц',
      chip: 'Apple A19 Pro',
      camera: '48 Мп Pro + 48 Мп ультраширокая + 12 Мп телефото 5×',
      battery: 'До 30 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C 3.0',
      protection: 'Титан Grade 5, Ceramic Shield, IP68',
    },
  }),

  createPhone({
    id: 'ip17-pro-512',
    name: 'Apple iPhone 17 Pro 512 ГБ',
    category: 'iphone-17-pro',
    price: 141990,
    storage: '512 ГБ',
    simType: 'SIM + eSIM',
    series: 'iPhone 17 Pro',
    description: '6.3″ ProMotion 120 Гц, титановый корпус, A19 Pro, физическая SIM + eSIM',
    specs: {
      display: '6.3″ ProMotion OLED 120 Гц',
      chip: 'Apple A19 Pro',
      camera: '48 Мп Pro + 48 Мп ультраширокая + 12 Мп телефото 5×',
      battery: 'До 30 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C 3.0',
      protection: 'Титан Grade 5, Ceramic Shield, IP68',
    },
  }),

  createPhone({
    id: 'ip17-pro-max-esim-256',
    name: 'Apple iPhone 17 Pro Max eSIM 256 ГБ',
    category: 'iphone-17-pro-max',
    price: 129990,
    storage: '256 ГБ',
    simType: 'eSIM',
    series: 'iPhone 17 Pro Max',
    badge: 'new',
    description: '6.9″ ProMotion 120 Гц, максимальная автономность, A19 Pro, только eSIM',
    specs: {
      display: '6.9″ ProMotion OLED 120 Гц',
      chip: 'Apple A19 Pro',
      camera: '48 Мп Pro + 48 Мп ультраширокая + 12 Мп телефото 5×',
      battery: 'До 38 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C 3.0',
      protection: 'Титан Grade 5, Ceramic Shield, IP68',
    },
  }),

  createPhone({
    id: 'ip17-pro-max-esim-512',
    name: 'Apple iPhone 17 Pro Max eSIM 512 ГБ',
    category: 'iphone-17-pro-max',
    price: 149990,
    storage: '512 ГБ',
    simType: 'eSIM',
    series: 'iPhone 17 Pro Max',
    description: '6.9″ ProMotion 120 Гц, максимальная автономность, A19 Pro, только eSIM',
    specs: {
      display: '6.9″ ProMotion OLED 120 Гц',
      chip: 'Apple A19 Pro',
      camera: '48 Мп Pro + 48 Мп ультраширокая + 12 Мп телефото 5×',
      battery: 'До 38 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C 3.0',
      protection: 'Титан Grade 5, Ceramic Shield, IP68',
    },
  }),

  createPhone({
    id: 'ip17-pro-max-esim-1tb',
    name: 'Apple iPhone 17 Pro Max eSIM 1 ТБ',
    category: 'iphone-17-pro-max',
    price: 169990,
    storage: '1 ТБ',
    simType: 'eSIM',
    series: 'iPhone 17 Pro Max',
    description: '6.9″ ProMotion 120 Гц, максимальная автономность, A19 Pro, только eSIM',
    specs: {
      display: '6.9″ ProMotion OLED 120 Гц',
      chip: 'Apple A19 Pro',
      camera: '48 Мп Pro + 48 Мп ультраширокая + 12 Мп телефото 5×',
      battery: 'До 38 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C 3.0',
      protection: 'Титан Grade 5, Ceramic Shield, IP68',
    },
  }),

  createPhone({
    id: 'ip17-pro-max-256',
    name: 'Apple iPhone 17 Pro Max 256 ГБ',
    category: 'iphone-17-pro-max',
    price: 131990,
    storage: '256 ГБ',
    simType: 'SIM + eSIM',
    series: 'iPhone 17 Pro Max',
    badge: 'hit',
    description: '6.9″ ProMotion 120 Гц, максимальная автономность, A19 Pro, физическая SIM + eSIM',
    specs: {
      display: '6.9″ ProMotion OLED 120 Гц',
      chip: 'Apple A19 Pro',
      camera: '48 Мп Pro + 48 Мп ультраширокая + 12 Мп телефото 5×',
      battery: 'До 38 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C 3.0',
      protection: 'Титан Grade 5, Ceramic Shield, IP68',
    },
  }),

  createPhone({
    id: 'ip17-pro-max-512',
    name: 'Apple iPhone 17 Pro Max 512 ГБ',
    category: 'iphone-17-pro-max',
    price: 151990,
    storage: '512 ГБ',
    simType: 'SIM + eSIM',
    series: 'iPhone 17 Pro Max',
    description: '6.9″ ProMotion 120 Гц, максимальная автономность, A19 Pro, физическая SIM + eSIM',
    specs: {
      display: '6.9″ ProMotion OLED 120 Гц',
      chip: 'Apple A19 Pro',
      camera: '48 Мп Pro + 48 Мп ультраширокая + 12 Мп телефото 5×',
      battery: 'До 38 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C 3.0',
      protection: 'Титан Grade 5, Ceramic Shield, IP68',
    },
  }),

  createPhone({
    id: 'ip17-pro-max-1tb',
    name: 'Apple iPhone 17 Pro Max 1 ТБ',
    category: 'iphone-17-pro-max',
    price: 171990,
    storage: '1 ТБ',
    simType: 'SIM + eSIM',
    series: 'iPhone 17 Pro Max',
    description: '6.9″ ProMotion 120 Гц, максимальная автономность, A19 Pro, физическая SIM + eSIM',
    specs: {
      display: '6.9″ ProMotion OLED 120 Гц',
      chip: 'Apple A19 Pro',
      camera: '48 Мп Pro + 48 Мп ультраширокая + 12 Мп телефото 5×',
      battery: 'До 38 ч видео',
      connectivity: '5G, Wi‑Fi 7, USB‑C 3.0',
      protection: 'Титан Grade 5, Ceramic Shield, IP68',
    },
  }),
];

const DEFAULT_REVIEWS = [
  {
    id: 'r1', itemId: 'ip17-pro-256', itemType: 'product', author: 'Алексей М.',
    rating: 5, text: 'Отличный телефон, камера на высоте. Цвет «Синий» выглядит очень стильно.',
    createdAt: '2026-06-15T10:00:00.000Z',
  },
  {
    id: 'r2', itemId: 'ip17', itemType: 'product', author: 'Мария К.',
    rating: 5, text: 'Взяла розовый iPhone 17 — очень красивый цвет, батареи хватает на весь день.',
    createdAt: '2026-06-20T14:30:00.000Z',
  },
  {
    id: 'r3', itemId: 'ip17-pro-max-512', itemType: 'product', author: 'Дмитрий В.',
    rating: 4, text: 'Большой экран, мощный чип. Доставка быстрая, упаковка оригинальная.',
    createdAt: '2026-06-28T09:15:00.000Z',
  },
];

function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
}

function encodeAssetPath(src) {
  if (!src || /^(https?:\/\/|data:)/i.test(src)) return src;
  return src.split('/').map(segment => encodeURIComponent(segment)).join('/');
}

function getProductImg(item) {
  if (item.img) return item.img;
  if (item.category && CATEGORY_IMAGES[item.category]) return CATEGORY_IMAGES[item.category];
  return DEFAULT_IMG;
}

function getItemTransitionImage(item) {
  if (!item) return DEFAULT_IMG;
  if (item.colors?.[0]?.img) return item.colors[0].img;
  return getProductImg(item);
}

function renderProductImg(img, alt = '', filter = '') {
  const src = encodeAssetPath(img || DEFAULT_IMG);
  const safeAlt = (alt || '').replace(/"/g, '&quot;');
  const filterStyle = filter && filter !== 'none' ? `filter:${filter};` : '';
  return `<img src="${src}" alt="${safeAlt}" loading="lazy" style="${filterStyle}" onerror="this.src='${DEFAULT_IMG}'">`;
}

function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getCatalogContentHash() {
  const payload = DEFAULT_PRODUCTS.map(item => ({ id: item.id, colors: item.colors }));
  const raw = JSON.stringify(payload);
  let hash = 0;
  for (let i = 0; i < raw.length; i += 1) {
    hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
  }
  return String(hash >>> 0);
}

function createDefaultStore() {
  return { version: STORE_VERSION, catalogHash: getCatalogContentHash(), products: DEFAULT_PRODUCTS };
}

function mergeCatalogItem(stored, template) {
  if (!template) return { ...(stored || {}) };
  return {
    ...template,
    price: stored?.price ?? template.price,
    badge: stored?.badge ?? template.badge,
    name: stored?.name || template.name,
  };
}

function readStoreData() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStoreData(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify({
    version: STORE_VERSION,
    catalogHash: getCatalogContentHash(),
    ...data,
  }));
}

function resetCatalogToDefaults() {
  writeStoreData(createDefaultStore());
}

function initStore() {
  const catalogHash = getCatalogContentHash();
  let data = readStoreData();
  if (!data || data.version !== STORE_VERSION || data.catalogHash !== catalogHash) {
    resetCatalogToDefaults();
    data = readStoreData();
  }
  if (!localStorage.getItem(CART_KEY)) localStorage.setItem(CART_KEY, JSON.stringify([]));
  if (!localStorage.getItem(ORDERS_KEY)) localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
  initReviewsStore();
}

function buildFullDescription(product) {
  if (product.fullDescription) return product.fullDescription;
  return [
    `${product.name} — оригинальный смартфон Apple с официальной гарантией.`,
    product.description || '',
    `Память: ${product.storage}. SIM: ${product.simType}.`,
    'Бесплатная доставка при заказе от ₽100 000. Trade-in старого iPhone.',
  ].filter(Boolean).join(' ');
}

function enrichProduct(product, def) {
  const merged = mergeCatalogItem(product, def);
  merged.fullDescription = buildFullDescription(merged);
  if (def?.colors?.length) {
    merged.colors = def.colors.map(color => ({ ...color, filter: 'none' }));
  } else {
    merged.colors = (merged.colors || []).map(color => ({
      ...color,
      price: color.price ?? merged.price,
      oldPrice: color.oldPrice ?? merged.oldPrice ?? null,
      filter: 'none',
    }));
  }
  merged.price = merged.colors?.[0]?.price ?? merged.price;
  merged.oldPrice = merged.colors?.[0]?.oldPrice ?? merged.oldPrice ?? null;
  return merged;
}

function getProductColorByName(product, colorName = '') {
  if (!product?.colors?.length) return null;
  return product.colors.find(color => color.name === colorName) || product.colors[0];
}

function getProducts() {
  const data = readStoreData();
  const stored = data?.products || DEFAULT_PRODUCTS;
  const templateMap = new Map(DEFAULT_PRODUCTS.map(p => [p.id, p]));
  return stored.map(p => enrichProduct(p, templateMap.get(p.id)));
}

function getEnrichedProductById(id) {
  return getProducts().find(p => p.id === id) || null;
}

function getCatalogSectionById(id) {
  return CATALOG_SECTIONS.find(s => s.id === id) || null;
}

function productMatchesCatalogSection(product, sectionId) {
  if (!sectionId) return true;
  const section = getCatalogSectionById(sectionId);
  if (!section) return true;
  return section.categories.includes(product.category);
}

function initReviewsStore() {
  const raw = localStorage.getItem(REVIEWS_KEY);
  if (!raw) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify({ version: REVIEWS_VERSION, reviews: DEFAULT_REVIEWS }));
    return;
  }
  try {
    const data = JSON.parse(raw);
    if (data.version !== REVIEWS_VERSION) {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify({ version: REVIEWS_VERSION, reviews: DEFAULT_REVIEWS }));
    }
  } catch {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify({ version: REVIEWS_VERSION, reviews: DEFAULT_REVIEWS }));
  }
}

function getReviews() {
  initReviewsStore();
  const data = JSON.parse(localStorage.getItem(REVIEWS_KEY));
  return Array.isArray(data?.reviews) ? data.reviews : DEFAULT_REVIEWS;
}

function getReviewsForItem(itemId, itemType) {
  return getReviews()
    .filter(r => r.itemId === itemId && r.itemType === itemType)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function getRatingSummary(itemId, itemType) {
  const reviews = getReviewsForItem(itemId, itemType);
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (!reviews.length) return { average: 0, count: 0, distribution };
  let sum = 0;
  reviews.forEach(r => {
    const rating = Math.max(1, Math.min(5, Math.round(r.rating)));
    distribution[rating] += 1;
    sum += r.rating;
  });
  return { average: sum / reviews.length, count: reviews.length, distribution };
}

function addReview(reviewData, itemType, author, rating, text) {
  const reviews = getReviews();
  let review;

  if (reviewData && typeof reviewData === 'object' && reviewData.itemId) {
    review = {
      id: 'r' + Date.now(),
      itemId: reviewData.itemId,
      itemType: reviewData.itemType,
      author: reviewData.userName || reviewData.author || 'Покупатель',
      userName: reviewData.userName || reviewData.author || 'Покупатель',
      userId: reviewData.userId || null,
      rating: Math.max(1, Math.min(5, Number(reviewData.rating) || 5)),
      text: reviewData.text,
      createdAt: new Date().toISOString(),
    };
  } else {
    review = {
      id: 'r' + Date.now(),
      itemId: reviewData,
      itemType,
      author,
      userName: author,
      rating: Math.max(1, Math.min(5, Number(rating) || 5)),
      text,
      createdAt: new Date().toISOString(),
    };
  }

  reviews.unshift(review);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify({ version: REVIEWS_VERSION, reviews }));
  return review;
}

initStore();

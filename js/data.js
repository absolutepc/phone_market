const STORE_VERSION = 9;
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
  'macbook-neo': 'img/macbook/neo/MacBook Neo 13 b.webp',
  'macbook-air-13': 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5.webp',
  'macbook-air-15': 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5.webp',
  'macbook-pro-14': 'img/macbook/pro 14 m5/Apple MacBook Pro 14 2026 M5 Pro.webp',
  'macbook-pro-16': 'img/macbook/pro 16 m5/Apple MacBook Pro 16 2026 M5 Pro.webp',
  'ipad': 'img/products/ipad.svg',
  'ipad-air': 'img/products/ipad.svg',
  'ipad-pro': 'img/products/ipad.svg',
  'airpods': 'img/products/airpods.svg',
  'airpods-pro': 'img/products/airpods.svg',
  'airpods-max': 'img/products/airpods.svg',
};

const FILTER_STORAGE = ['128 ГБ', '256 ГБ', '512 ГБ', '1 ТБ', '2 ТБ', '4 ТБ', '8 ТБ'];
const FILTER_SIM = ['eSIM', 'SIM + eSIM'];
const FILTER_SERIES = ['iPhone 17', 'iPhone 17 Plus', 'iPhone 17 Pro', 'iPhone 17 Pro Max'];

const PRODUCT_ATTRIBUTE_FIELDS = ['storage', 'simType', 'series'];

const CATEGORY_LABELS = {
  'iphone-17': 'iPhone 17',
  'iphone-17-plus': 'iPhone 17 Plus',
  'iphone-17-pro': 'iPhone 17 Pro',
  'iphone-17-pro-max': 'iPhone 17 Pro Max',
  'macbook-neo': 'MacBook Neo',
  'macbook-air-13': 'MacBook Air 13″',
  'macbook-air-15': 'MacBook Air 15″',
  'macbook-pro-14': 'MacBook Pro 14″',
  'macbook-pro-16': 'MacBook Pro 16″',
  'ipad': 'iPad',
  'ipad-air': 'iPad Air',
  'ipad-pro': 'iPad Pro',
  'airpods': 'AirPods',
  'airpods-pro': 'AirPods Pro',
  'airpods-max': 'AirPods Max',
};

const CATALOG_LINES = [
  {
    id: 'iphone',
    name: 'iPhone',
    description: 'Весь модельный ряд Apple iPhone 17',
    pickerLabel: 'Смартфоны',
    pickerTagline: 'iPhone 17, Plus, Pro и Pro Max',
    pickerImg: 'img/phones/pro/blue.png',
    categories: ['iphone-17', 'iphone-17-plus', 'iphone-17-pro', 'iphone-17-pro-max'],
    img: 'img/phones/hero/iphone-17-hero.jpg',
  },
  {
    id: 'macbook',
    name: 'MacBook',
    description: 'MacBook Neo, Air и Pro на чипе Apple M5',
    pickerLabel: 'Ноутбуки',
    pickerTagline: 'Neo, Air 13/15 и Pro 14/16',
    pickerImg: 'img/macbook/MacBook Pro 14 16 512GB.png',
    categories: ['macbook-neo', 'macbook-air-13', 'macbook-air-15', 'macbook-pro-14', 'macbook-pro-16'],
    img: 'img/macbook/MacBook Pro 14 16 512GB.png',
  },
  {
    id: 'ipad',
    name: 'iPad',
    description: 'iPad, iPad Air и iPad Pro для работы и творчества',
    pickerLabel: 'Планшеты',
    pickerTagline: 'iPad, Air и Pro',
    categories: ['ipad', 'ipad-air', 'ipad-pro'],
    img: 'img/ipad/Apple iPad Pro 13 M5 (2026).png',
  },
  {
    id: 'airpods',
    name: 'AirPods',
    description: 'Беспроводные наушники Apple — от AirPods до AirPods Max',
    pickerLabel: 'Аудио',
    pickerTagline: 'AirPods 4, Pro и Max',
    categories: ['airpods', 'airpods-pro', 'airpods-max'],
    img: 'img/pods/Apple AirPods Max 2 (2026).png',
  },
];

const CATEGORY_TO_LINE = CATALOG_LINES.reduce((map, line) => {
  line.categories.forEach(category => {
    map[category] = line.id;
  });
  return map;
}, {});

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

const CATALOG_SECTIONS = CATALOG_LINES;

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

const MACBOOK_NEO_COLORS = [
  { name: 'Синий', hex: '#5B8FD9', img: 'img/macbook/neo/MacBook Neo 13 b.webp' },
  { name: 'Жёлтый', hex: '#F2D56B', img: 'img/macbook/neo/MacBook Neo 13 y.webp' },
  { name: 'Розовый', hex: '#F2A6C4', img: 'img/macbook/neo/MacBook Neo 13 p.webp' },
  { name: 'Белый', hex: '#F4F4F6', img: 'img/macbook/neo/MacBook Neo 13 s.webp' },
];

const MACBOOK_AIR_13_COLORS = [
  { name: 'Тёмная ночь', hex: '#3A3B3F', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5 b.webp' },
  { name: 'Сияющая звезда', hex: '#EEE5D7', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5 g.webp' },
  { name: 'Серебристый', hex: '#D9DADC', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5.webp' },
  { name: 'Небесно-голубой', hex: '#AFC3D8', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5 s.webp' },
];

const MACBOOK_AIR_15_COLORS = [
  { name: 'Тёмная ночь', hex: '#3A3B3F', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5 b.webp' },
  { name: 'Сияющая звезда', hex: '#EEE5D7', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5 g.webp' },
  { name: 'Серебристый', hex: '#D9DADC', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5.webp' },
  { name: 'Небесно-голубой', hex: '#AFC3D8', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5 s.webp' },
];

const MACBOOK_PRO_14_COLORS = [
  { name: 'Космический чёрный', hex: '#2F3034', img: 'img/macbook/pro 14 m5/Apple MacBook Pro 14 2026 M5 Pro b.webp' },
  { name: 'Серебристый', hex: '#D9DADC', img: 'img/macbook/pro 14 m5/Apple MacBook Pro 14 2026 M5 Pro.webp' },
];

const MACBOOK_PRO_16_COLORS = [
  { name: 'Космический чёрный', hex: '#2F3034', img: 'img/macbook/pro 16 m5/Apple MacBook Pro 16 2026 M5 Pro b.webp' },
  { name: 'Серебристый', hex: '#D9DADC', img: 'img/macbook/pro 16 m5/Apple MacBook Pro 16 2026 M5 Pro.webp' },
];

const IPAD_COLORS = [
  { name: 'Серый космос', hex: '#7d7e80', img: 'img/products/ipad.svg' },
  { name: 'Серебристый', hex: '#e3e4e6', img: 'img/products/ipad.svg' },
  { name: 'Синий', hex: '#4a6fa5', img: 'img/products/ipad.svg' },
];

const AIRPODS_COLORS = [
  { name: 'Белый', hex: '#f5f5f7', img: 'img/products/airpods.svg' },
];

const AIRPODS_MAX_COLORS = [
  { name: 'Серый космос', hex: '#7d7e80', img: 'img/products/airpods.svg' },
  { name: 'Серебристый', hex: '#e3e4e6', img: 'img/products/airpods.svg' },
  { name: 'Синий', hex: '#4a6fa5', img: 'img/products/airpods.svg' },
  { name: 'Оранжевый', hex: '#e8752a', img: 'img/products/airpods.svg' },
];

function getColorSetForCategory(category) {
  if (category === 'iphone-17-pro-max') return PRO_MAX_COLORS;
  if (category === 'iphone-17-pro') return PRO_COLORS;
  if (category === 'macbook-neo') return MACBOOK_NEO_COLORS;
  if (category === 'macbook-air-13') return MACBOOK_AIR_13_COLORS;
  if (category === 'macbook-air-15') return MACBOOK_AIR_15_COLORS;
  if (category === 'macbook-pro-14') return MACBOOK_PRO_14_COLORS;
  if (category === 'macbook-pro-16') return MACBOOK_PRO_16_COLORS;
  if (category === 'ipad' || category === 'ipad-air' || category === 'ipad-pro') return IPAD_COLORS;
  if (category === 'airpods-max') return AIRPODS_MAX_COLORS;
  if (category === 'airpods' || category === 'airpods-pro') return AIRPODS_COLORS;
  return STANDARD_COLORS;
}

function getProductLine(product) {
  if (!product) return 'iphone';
  return product.line || CATEGORY_TO_LINE[product.category] || 'iphone';
}

function getCatalogLineById(id) {
  return CATALOG_LINES.find(line => line.id === id) || null;
}

function getCategoriesForLine(lineId) {
  return getCatalogLineById(lineId)?.categories || [];
}

function getLineMinPrice(lineId) {
  const prices = getProducts()
    .filter(product => getProductLine(product) === lineId)
    .map(product => product.price)
    .filter(price => Number.isFinite(price));

  return prices.length ? Math.min(...prices) : 0;
}

function getLineProductCount(lineId) {
  return getProducts().filter(product => getProductLine(product) === lineId).length;
}

function formatProductCount(count) {
  if (count === 1) return '1 товар';
  if (count >= 2 && count <= 4) return `${count} товара`;
  return `${count} товаров`;
}

function getColorPriceAdjustment(colorName) {
  const adjustments = {
    'Чёрный': 0,
    'Белый': 1990,
    'Розовый': 2990,
    'Бирюзовый': 2490,
    'Ультрамарин': 3490,
    'Синий': 3990,
    'Жёлтый': 2490,
    'Космический чёрный': 2990,
    'Тёмная ночь': 0,
    'Сияющая звезда': 1990,
    'Небесно-голубой': 3490,
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
    line: CATEGORY_TO_LINE[category] || 'iphone',
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

function createMacBookAirSku(size, storageKey, storage, price, badge = null) {
  const category = size === 13 ? 'macbook-air-13' : 'macbook-air-15';
  const display = size === 13 ? '13.6″' : '15.3″';
  return createPhone({
    id: `mba${size}-${storageKey}`,
    name: `MacBook Air ${size}″ M5 ${storage}`,
    category,
    price,
    storage,
    simType: '—',
    series: `MacBook Air ${size}″ M5`,
    badge,
    description: `${display} Liquid Retina, чип M5, без вентилятора, MagSafe и до 18 ч автономности`,
    specs: {
      display: `${display} Liquid Retina`,
      chip: 'Apple M5',
      camera: '1080p FaceTime HD',
      battery: size === 13 ? 'До 18 ч' : 'До 20 ч',
      connectivity: 'Wi‑Fi 6E, Bluetooth 5.3, 2× Thunderbolt',
      protection: 'Алюминиевый корпус',
    },
  });
}

function createMacBookProSku(size, storageKey, storage, price, chip, badge = null) {
  const category = size === 14 ? 'macbook-pro-14' : 'macbook-pro-16';
  const display = size === 14 ? '14.2″' : '16.2″';
  return createPhone({
    id: `mbp${size}-${storageKey}`,
    name: `MacBook Pro ${size}″ ${chip} ${storage}`,
    category,
    price,
    storage,
    simType: '—',
    series: `MacBook Pro ${size}″`,
    badge,
    description: `${display} Liquid Retina XDR, ${chip}, ProMotion 120 Гц и профессиональная автономность`,
    specs: {
      display: `${display} Liquid Retina XDR 120 Гц`,
      chip,
      camera: '1080p FaceTime HD',
      battery: size === 14 ? 'До 22 ч' : 'До 24 ч',
      connectivity: 'Wi‑Fi 6E, HDMI, SD, 3× Thunderbolt',
      protection: 'Алюминиевый корпус',
    },
  });
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

  createPhone({
    id: 'mbn-256',
    name: 'MacBook Neo 256 ГБ',
    category: 'macbook-neo',
    price: 89990,
    storage: '256 ГБ',
    simType: '—',
    series: 'MacBook Neo',
    badge: 'new',
    description: 'Компактный MacBook Neo на чипе M5 — лёгкий корпус и яркие цвета',
    specs: {
      display: '13″ Retina',
      chip: 'Apple M5',
      camera: '1080p FaceTime HD',
      battery: 'До 16 ч',
      connectivity: 'Wi‑Fi 6E, Bluetooth 5.3, 2× Thunderbolt',
      protection: 'Алюминиевый корпус',
    },
  }),

  createMacBookAirSku(13, '512', '512 ГБ', 114990, 'new'),
  createMacBookAirSku(13, '1tb', '1 ТБ', 134990),
  createMacBookAirSku(13, '2tb', '2 ТБ', 154990),
  createMacBookAirSku(13, '4tb', '4 ТБ', 194990),

  createMacBookAirSku(15, '512', '512 ГБ', 114990, 'new'),
  createMacBookAirSku(15, '1tb', '1 ТБ', 134990),
  createMacBookAirSku(15, '2tb', '2 ТБ', 154990),
  createMacBookAirSku(15, '4tb', '4 ТБ', 194990),

  createMacBookProSku(14, '1tb', '1 ТБ', 199990, 'M5 Pro', 'hit'),
  createMacBookProSku(14, '2tb', '2 ТБ', 219990, 'M5 Pro'),
  createMacBookProSku(14, '4tb', '4 ТБ', 259990, 'M5 Pro'),
  createMacBookProSku(14, '8tb', '8 ТБ', 259990, 'M5 Pro'),

  createMacBookProSku(16, '1tb', '1 ТБ', 249990, 'M5 Max'),
  createMacBookProSku(16, '2tb', '2 ТБ', 269990, 'M5 Max', 'hit'),
  createMacBookProSku(16, '4tb', '4 ТБ', 309990, 'M5 Max'),
  createMacBookProSku(16, '8tb', '8 ТБ', 309990, 'M5 Max'),

  createPhone({
    id: 'ipad-11-128',
    name: 'iPad 11″ 128 ГБ Wi‑Fi',
    category: 'ipad',
    price: 44990,
    storage: '128 ГБ',
    simType: 'Wi‑Fi',
    series: 'iPad 11″',
    badge: 'new',
    description: '11″ Liquid Retina, чип A16, поддержка Apple Pencil USB‑C',
    specs: {
      display: '11″ Liquid Retina',
      chip: 'Apple A16',
      camera: '12 Мп Wide',
      battery: 'До 10 ч',
      connectivity: 'Wi‑Fi 6, USB‑C',
      protection: 'Алюминий, стекло',
    },
  }),

  createPhone({
    id: 'ipad-air-256',
    name: 'iPad Air 11″ M3 256 ГБ',
    category: 'ipad-air',
    price: 74990,
    storage: '256 ГБ',
    simType: 'Wi‑Fi',
    series: 'iPad Air 11″',
    description: '11″ Liquid Retina, M3, тонкий корпус, Apple Pencil Pro',
    specs: {
      display: '11″ Liquid Retina',
      chip: 'Apple M3',
      camera: '12 Мп Wide',
      battery: 'До 10 ч',
      connectivity: 'Wi‑Fi 6E, USB‑C',
      protection: 'Алюминий',
    },
  }),

  createPhone({
    id: 'ipad-pro-256',
    name: 'iPad Pro 11″ M4 256 ГБ',
    category: 'ipad-pro',
    price: 99990,
    storage: '256 ГБ',
    simType: 'Wi‑Fi',
    series: 'iPad Pro 11″',
    badge: 'hit',
    description: '11″ Ultra Retina XDR, M4, ProMotion 120 Гц, Thunderbolt',
    specs: {
      display: '11″ Ultra Retina XDR 120 Гц',
      chip: 'Apple M4',
      camera: '12 Мп Wide + LiDAR',
      battery: 'До 10 ч',
      connectivity: 'Wi‑Fi 6E, Thunderbolt',
      protection: 'Алюминий, стекло',
    },
  }),

  createPhone({
    id: 'airpods-4',
    name: 'AirPods 4',
    category: 'airpods',
    price: 14990,
    storage: '—',
    simType: '—',
    series: 'AirPods 4',
    badge: 'new',
    description: 'Открытый тип, пространственное аудио, USB‑C, до 30 ч с кейсом',
    specs: {
      display: '—',
      chip: 'Apple H2',
      camera: '—',
      battery: 'До 30 ч с кейсом',
      connectivity: 'Bluetooth 5.3',
      protection: 'IP54',
    },
  }),

  createPhone({
    id: 'airpods-pro-2',
    name: 'AirPods Pro 2 USB‑C',
    category: 'airpods-pro',
    price: 24990,
    storage: '—',
    simType: '—',
    series: 'AirPods Pro 2',
    badge: 'hit',
    description: 'Активное шумоподавление, адаптивный звук, MagSafe-кейс USB‑C',
    specs: {
      display: '—',
      chip: 'Apple H2',
      camera: '—',
      battery: 'До 30 ч с кейсом',
      connectivity: 'Bluetooth 5.3',
      protection: 'IP54',
    },
  }),

  createPhone({
    id: 'airpods-max',
    name: 'AirPods Max USB‑C',
    category: 'airpods-max',
    price: 59990,
    storage: '—',
    simType: '—',
    series: 'AirPods Max',
    description: 'Накладные наушники, ANC, пространственное аудио, алюминиевые чаши',
    specs: {
      display: '—',
      chip: 'Apple H2',
      camera: '—',
      battery: 'До 20 ч',
      connectivity: 'Bluetooth 5.3, USB‑C',
      protection: 'Алюминий, магнитные амбушюры',
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
  return src.split('/').map(segment => {
    try {
      return encodeURIComponent(decodeURIComponent(segment));
    } catch {
      return encodeURIComponent(segment);
    }
  }).join('/');
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

function saveProducts(products) {
  const current = readStoreData() || createDefaultStore();
  writeStoreData({
    ...current,
    products,
  });
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
  const line = getProductLine(product);
  const lineLabel = getCatalogLineById(line)?.name || 'Apple';
  const details = [
    product.storage && product.storage !== '—' ? `Память: ${product.storage}.` : '',
    product.simType && product.simType !== '—' ? `Подключение: ${product.simType}.` : '',
  ].filter(Boolean);
  return [
    `${product.name} — оригинальный продукт Apple (${lineLabel}) с официальной гарантией.`,
    product.description || '',
    ...details,
    line === 'iphone' ? 'Бесплатная доставка при заказе от ₽100 000. Trade-in старого iPhone.' : 'Бесплатная доставка при заказе от ₽100 000.',
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

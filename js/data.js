const STORE_VERSION = 14;
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
  'ipad-11-gen': 'img/ipad/ipad air/Apple iPad Air (M4) 11 g.webp',
  'ipad-mini-7': 'img/ipad/ipad air/Apple iPad Air (M4) 11 g.webp',
  'ipad-air-11': 'img/ipad/ipad air/Apple iPad Air (M4) 11 g.webp',
  'ipad-air-13': 'img/ipad/ipad air/Apple iPad Air (M4) 13 g.webp',
  'ipad-pro-11': 'img/ipad/ipad pro/Планшет Apple iPad Pro (M5) 5G 11.webp',
  'ipad-pro-13': 'img/ipad/ipad pro/Apple iPad Pro (M5) 5G.webp',
  'airpods': 'img/products/airpods.svg',
  'airpods-pro': 'img/products/airpods.svg',
  'airpods-max': 'img/products/airpods.svg',
  'apple-watch-se': 'img/products/apple-watch.svg',
  'apple-watch-series-11': 'img/products/apple-watch.svg',
  'apple-watch-ultra-3': 'img/products/apple-watch.svg',
};

const FILTER_STORAGE = ['128 ГБ', '256 ГБ', '512 ГБ', '1 ТБ', '2 ТБ', '4 ТБ', '8 ТБ'];
const FILTER_SIM = ['eSIM', 'SIM + eSIM', 'Wi‑Fi', 'Wi‑Fi + Cellular'];
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
  'ipad-11-gen': 'iPad 11-го поколения',
  'ipad-mini-7': 'iPad mini 7',
  'ipad-air-11': 'iPad Air 11″',
  'ipad-air-13': 'iPad Air 13″',
  'ipad-pro-11': 'iPad Pro 11″',
  'ipad-pro-13': 'iPad Pro 13″',
  'airpods': 'AirPods',
  'airpods-pro': 'AirPods Pro',
  'airpods-max': 'AirPods Max',
  'apple-watch-se': 'Apple Watch SE',
  'apple-watch-series-11': 'Apple Watch Series 11',
  'apple-watch-ultra-3': 'Apple Watch Ultra 3',
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
    description: 'iPad 11-го поколения, mini, Air 11/13 и Pro 11/13',
    pickerLabel: 'Планшеты',
    pickerTagline: 'iPad, mini, Air и Pro',
    categories: [
      'ipad-11-gen',
      'ipad-mini-7',
      'ipad-air-11',
      'ipad-air-13',
      'ipad-pro-11',
      'ipad-pro-13',
    ],
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
  {
    id: 'apple-watch',
    name: 'Apple Watch',
    description: 'Apple Watch SE, Series 11 и Ultra 3 — здоровье, фитнес и автономность',
    pickerLabel: 'Часы',
    pickerTagline: 'SE, Series 11 и Ultra 3',
    pickerImg: 'img/products/apple-watch.svg',
    categories: ['apple-watch-se', 'apple-watch-series-11', 'apple-watch-ultra-3'],
    img: 'img/products/apple-watch.svg',
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

const IPHONE_17_HERO = 'img/phones/hero/iphone-17-hero.jpg';
const IPHONE_PRO_HERO = 'img/phones/hero/iphone-17-pro-hero.jpg';
const IPHONE_PRO_MAX_LIFESTYLE = 'img/phones/iphone 17 pro max.png';
const IPAD_AIR_DIR = 'img/ipad/ipad air';
const IPAD_PRO_DIR = 'img/ipad/ipad pro';

const MACBOOK_NEO_DIR = 'img/macbook/neo';
const MACBOOK_AIR_DIR = 'img/macbook/air 13 15';
const MACBOOK_PRO_14_DIR = 'img/macbook/pro 14 m5';
const MACBOOK_PRO_16_DIR = 'img/macbook/pro 16 m5';

function uniqueColorImages(list) {
  const seen = new Set();
  return list.filter(src => {
    if (!src || seen.has(src)) return false;
    seen.add(src);
    return true;
  });
}

function colorWithGallery({ name, hex, img, images }) {
  const gallery = uniqueColorImages(images?.length ? images : [img]);
  return {
    name,
    hex,
    img: img || gallery[0],
    images: gallery,
  };
}

function macbookGallery(dir, baseName, extraCount = 0) {
  const images = [`${dir}/${baseName}.webp`];
  for (let i = 1; i <= extraCount; i += 1) {
    images.push(`${dir}/${baseName} ${i}.webp`);
  }
  return images;
}

function ipadGallery(dir, baseName, extraCount = 0, options = {}) {
  const extraSpace = options.extraSpace ?? ' ';
  const images = [`${dir}/${baseName}.webp`];
  for (let i = 1; i <= extraCount; i += 1) {
    const ext = i === extraCount && options.lastExtraExt ? options.lastExtraExt : 'webp';
    images.push(`${dir}/${baseName}${extraSpace}${i}.${ext}`);
  }
  return images;
}

function iphoneGallery(img, hero) {
  return uniqueColorImages([img, hero]);
}

const IPHONE_17_COLORS = [
  colorWithGallery({ name: 'Чёрный', hex: '#1d1d1f', img: 'img/phones/standard/black.png', images: iphoneGallery('img/phones/standard/black.png', IPHONE_17_HERO) }),
  colorWithGallery({ name: 'Белый', hex: '#f5f5f7', img: 'img/phones/standard/white.png', images: iphoneGallery('img/phones/standard/white.png', IPHONE_17_HERO) }),
  colorWithGallery({ name: 'Розовый', hex: '#c8b4d8', img: 'img/phones/standard/lavender.png', images: iphoneGallery('img/phones/standard/lavender.png', IPHONE_17_HERO) }),
  colorWithGallery({ name: 'Бирюзовый', hex: '#9bb89f', img: 'img/phones/standard/sage.png', images: iphoneGallery('img/phones/standard/sage.png', IPHONE_17_HERO) }),
  colorWithGallery({ name: 'Ультрамарин', hex: '#7ba3c9', img: 'img/phones/standard/mist-blue.png', images: iphoneGallery('img/phones/standard/mist-blue.png', IPHONE_17_HERO) }),
];

const IPHONE_17_PLUS_COLORS = [
  colorWithGallery({ name: 'Чёрный', hex: '#1d1d1f', img: 'img/phones/standard/black.png', images: iphoneGallery('img/phones/standard/black.png', IPHONE_17_HERO) }),
  colorWithGallery({ name: 'Белый', hex: '#f5f5f7', img: 'img/phones/standard/white.png', images: iphoneGallery('img/phones/standard/white.png', IPHONE_17_HERO) }),
  colorWithGallery({ name: 'Розовый', hex: '#c8b4d8', img: 'img/phones/standard/lavender.png', images: iphoneGallery('img/phones/standard/lavender.png', IPHONE_17_HERO) }),
  colorWithGallery({ name: 'Бирюзовый', hex: '#9bb89f', img: 'img/phones/standard/sage.png', images: iphoneGallery('img/phones/standard/sage.png', IPHONE_17_HERO) }),
  colorWithGallery({ name: 'Ультрамарин', hex: '#7ba3c9', img: 'img/phones/standard/mist-blue.png', images: iphoneGallery('img/phones/standard/mist-blue.png', IPHONE_17_HERO) }),
];

const IPHONE_17_PRO_COLORS = [
  colorWithGallery({ name: 'Белый', hex: '#e8e8ed', img: 'img/phones/pro/white.png', images: iphoneGallery('img/phones/pro/white.png', IPHONE_PRO_HERO) }),
  colorWithGallery({ name: 'Синий', hex: '#3d5a9e', img: 'img/phones/pro/blue.png', images: iphoneGallery('img/phones/pro/blue.png', IPHONE_PRO_HERO) }),
  colorWithGallery({ name: 'Оранжевый', hex: '#e8752a', img: 'img/phones/pro/orange.png', images: iphoneGallery('img/phones/pro/orange.png', IPHONE_PRO_HERO) }),
  colorWithGallery({ name: 'Чёрный', hex: '#1d1d1f', img: 'img/phones/pro/black.png', images: iphoneGallery('img/phones/pro/black.png', IPHONE_PRO_HERO) }),
];

const IPHONE_17_PRO_MAX_COLORS = [
  colorWithGallery({ name: 'Белый', hex: '#e8e8ed', img: 'img/phones/pro-max/white.png', images: iphoneGallery('img/phones/pro-max/white.png', IPHONE_PRO_MAX_LIFESTYLE) }),
  colorWithGallery({ name: 'Синий', hex: '#3d5a9e', img: 'img/phones/pro-max/blue.png', images: iphoneGallery('img/phones/pro-max/blue.png', IPHONE_PRO_MAX_LIFESTYLE) }),
  colorWithGallery({ name: 'Оранжевый', hex: '#e8752a', img: 'img/phones/pro-max/orange.png', images: iphoneGallery('img/phones/pro-max/orange.png', IPHONE_PRO_MAX_LIFESTYLE) }),
  colorWithGallery({ name: 'Чёрный', hex: '#1d1d1f', img: 'img/phones/pro-max/black.png', images: iphoneGallery('img/phones/pro-max/black.png', IPHONE_PRO_MAX_LIFESTYLE) }),
];

const MACBOOK_NEO_COLORS = [
  colorWithGallery({ name: 'Синий', hex: '#5B8FD9', img: 'img/macbook/neo/MacBook Neo 13 b.webp', images: macbookGallery(MACBOOK_NEO_DIR, 'MacBook Neo 13 b', 3) }),
  colorWithGallery({ name: 'Жёлтый', hex: '#F2D56B', img: 'img/macbook/neo/MacBook Neo 13 y.webp', images: macbookGallery(MACBOOK_NEO_DIR, 'MacBook Neo 13 y', 3) }),
  colorWithGallery({ name: 'Розовый', hex: '#F2A6C4', img: 'img/macbook/neo/MacBook Neo 13 p.webp', images: macbookGallery(MACBOOK_NEO_DIR, 'MacBook Neo 13 p', 3) }),
  colorWithGallery({ name: 'Белый', hex: '#F4F4F6', img: 'img/macbook/neo/MacBook Neo 13 s.webp', images: macbookGallery(MACBOOK_NEO_DIR, 'MacBook Neo 13 s', 3) }),
];

const MACBOOK_AIR_13_COLORS = [
  colorWithGallery({ name: 'Тёмная ночь', hex: '#3A3B3F', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5 b.webp', images: macbookGallery(MACBOOK_AIR_DIR, 'Apple MacBook air 13 15 2026 M5 b', 5) }),
  colorWithGallery({ name: 'Сияющая звезда', hex: '#EEE5D7', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5 g.webp', images: macbookGallery(MACBOOK_AIR_DIR, 'Apple MacBook air 13 15 2026 M5 g', 5) }),
  colorWithGallery({ name: 'Серебристый', hex: '#D9DADC', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5.webp', images: macbookGallery(MACBOOK_AIR_DIR, 'Apple MacBook air 13 15 2026 M5', 5) }),
  colorWithGallery({ name: 'Небесно-голубой', hex: '#AFC3D8', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5 s.webp', images: macbookGallery(MACBOOK_AIR_DIR, 'Apple MacBook air 13 15 2026 M5 s', 5) }),
];

const MACBOOK_AIR_15_COLORS = [
  colorWithGallery({ name: 'Тёмная ночь', hex: '#3A3B3F', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5 b.webp', images: macbookGallery(MACBOOK_AIR_DIR, 'Apple MacBook air 13 15 2026 M5 b', 5) }),
  colorWithGallery({ name: 'Сияющая звезда', hex: '#EEE5D7', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5 g.webp', images: macbookGallery(MACBOOK_AIR_DIR, 'Apple MacBook air 13 15 2026 M5 g', 5) }),
  colorWithGallery({ name: 'Серебристый', hex: '#D9DADC', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5.webp', images: macbookGallery(MACBOOK_AIR_DIR, 'Apple MacBook air 13 15 2026 M5', 5) }),
  colorWithGallery({ name: 'Небесно-голубой', hex: '#AFC3D8', img: 'img/macbook/air 13 15/Apple MacBook air 13 15 2026 M5 s.webp', images: macbookGallery(MACBOOK_AIR_DIR, 'Apple MacBook air 13 15 2026 M5 s', 5) }),
];

const MACBOOK_PRO_14_COLORS = [
  colorWithGallery({ name: 'Космический чёрный', hex: '#2F3034', img: 'img/macbook/pro 14 m5/Apple MacBook Pro 14 2026 M5 Pro b.webp', images: macbookGallery(MACBOOK_PRO_14_DIR, 'Apple MacBook Pro 14 2026 M5 Pro b', 6) }),
  colorWithGallery({ name: 'Серебристый', hex: '#D9DADC', img: 'img/macbook/pro 14 m5/Apple MacBook Pro 14 2026 M5 Pro.webp', images: macbookGallery(MACBOOK_PRO_14_DIR, 'Apple MacBook Pro 14 2026 M5 Pro', 6) }),
];

const MACBOOK_PRO_16_COLORS = [
  colorWithGallery({ name: 'Космический чёрный', hex: '#2F3034', img: 'img/macbook/pro 16 m5/Apple MacBook Pro 16 2026 M5 Pro b.webp', images: macbookGallery(MACBOOK_PRO_16_DIR, 'Apple MacBook Pro 16 2026 M5 Pro b', 5) }),
  colorWithGallery({ name: 'Серебристый', hex: '#D9DADC', img: 'img/macbook/pro 16 m5/Apple MacBook Pro 16 2026 M5 Pro.webp', images: macbookGallery(MACBOOK_PRO_16_DIR, 'Apple MacBook Pro 16 2026 M5 Pro', 5) }),
];

const IPAD_AIR_11_COLORS = [
  colorWithGallery({ name: 'Серый космос', hex: '#7d7e80', img: 'img/ipad/ipad air/Apple iPad Air (M4) 11 g.webp', images: ipadGallery(IPAD_AIR_DIR, 'Apple iPad Air (M4) 11 g', 4) }),
  colorWithGallery({ name: 'Серебристый', hex: '#e3e4e6', img: 'img/ipad/ipad air/Apple iPad Air (M4) s.webp', images: ipadGallery(IPAD_AIR_DIR, 'Apple iPad Air (M4) s', 4) }),
  colorWithGallery({ name: 'Синий', hex: '#4a6fa5', img: 'img/ipad/ipad air/Apple iPad Air (M4) 11 t.webp', images: ipadGallery(IPAD_AIR_DIR, 'Apple iPad Air (M4) 11 t', 4, { extraSpace: '  ' }) }),
];

const IPAD_11_GEN_COLORS = IPAD_AIR_11_COLORS;
const IPAD_MINI_7_COLORS = IPAD_AIR_11_COLORS;

const IPAD_AIR_13_COLORS = [
  colorWithGallery({ name: 'Серый космос', hex: '#7d7e80', img: 'img/ipad/ipad air/Apple iPad Air (M4) 13 g.webp', images: ipadGallery(IPAD_AIR_DIR, 'Apple iPad Air (M4) 13 g', 4, { lastExtraExt: 'jpg' }) }),
  colorWithGallery({ name: 'Серебристый', hex: '#e3e4e6', img: 'img/ipad/ipad air/Apple iPad Air (M4) 13 s.webp', images: ipadGallery(IPAD_AIR_DIR, 'Apple iPad Air (M4) 13 s', 4, { lastExtraExt: 'jpg' }) }),
  colorWithGallery({ name: 'Синий', hex: '#4a6fa5', img: 'img/ipad/ipad air/Apple iPad Air (M4) 13 t.webp', images: ipadGallery(IPAD_AIR_DIR, 'Apple iPad Air (M4) 13 t', 4, { lastExtraExt: 'jpg' }) }),
];

const IPAD_PRO_11_COLORS = [
  colorWithGallery({ name: 'Серый космос', hex: '#7d7e80', img: 'img/ipad/ipad pro/Планшет Apple iPad Pro (M5) 5G 11.webp', images: ipadGallery(IPAD_PRO_DIR, 'Планшет Apple iPad Pro (M5) 5G 11', 3) }),
  colorWithGallery({ name: 'Серебристый', hex: '#e3e4e6', img: 'img/ipad/ipad pro/Планшет Apple iPad Pro (M5) 5G 11 s.webp', images: ipadGallery(IPAD_PRO_DIR, 'Планшет Apple iPad Pro (M5) 5G 11 s', 3) }),
];

const IPAD_PRO_13_COLORS = [
  colorWithGallery({ name: 'Серый космос', hex: '#7d7e80', img: 'img/ipad/ipad pro/Apple iPad Pro (M5) 5G.webp', images: ipadGallery(IPAD_PRO_DIR, 'Apple iPad Pro (M5) 5G', 3) }),
  colorWithGallery({ name: 'Серебристый', hex: '#e3e4e6', img: 'img/ipad/ipad pro/Apple iPad Pro (M5) 5G s.webp', images: ipadGallery(IPAD_PRO_DIR, 'Apple iPad Pro (M5) 5G s', 3) }),
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

const APPLE_WATCH_SE_COLORS = [
  { name: 'Полночь', hex: '#1d1d1f', img: 'img/products/apple-watch.svg' },
  { name: 'Сияющая звезда', hex: '#f5f5f7', img: 'img/products/apple-watch.svg' },
];

const APPLE_WATCH_SERIES_11_COLORS = [
  { name: 'Обсидиан', hex: '#2F3034', img: 'img/products/apple-watch.svg' },
  { name: 'Серебристый', hex: '#e3e4e6', img: 'img/products/apple-watch.svg' },
  { name: 'Розовое золото', hex: '#e8c4b8', img: 'img/products/apple-watch.svg' },
  { name: 'Сланцевый', hex: '#4a5568', img: 'img/products/apple-watch.svg' },
];

const APPLE_WATCH_ULTRA_COLORS = [
  { name: 'Натуральный титан', hex: '#d4cfc7', img: 'img/products/apple-watch.svg' },
  { name: 'Чёрный титан', hex: '#2F3034', img: 'img/products/apple-watch.svg' },
];

function getColorSetForCategory(category) {
  if (category === 'iphone-17') return IPHONE_17_COLORS;
  if (category === 'iphone-17-plus') return IPHONE_17_PLUS_COLORS;
  if (category === 'iphone-17-pro') return IPHONE_17_PRO_COLORS;
  if (category === 'iphone-17-pro-max') return IPHONE_17_PRO_MAX_COLORS;
  if (category === 'macbook-neo') return MACBOOK_NEO_COLORS;
  if (category === 'macbook-air-13') return MACBOOK_AIR_13_COLORS;
  if (category === 'macbook-air-15') return MACBOOK_AIR_15_COLORS;
  if (category === 'macbook-pro-14') return MACBOOK_PRO_14_COLORS;
  if (category === 'macbook-pro-16') return MACBOOK_PRO_16_COLORS;
  if (category === 'ipad-11-gen') return IPAD_11_GEN_COLORS;
  if (category === 'ipad-mini-7') return IPAD_MINI_7_COLORS;
  if (category === 'ipad-air-11') return IPAD_AIR_11_COLORS;
  if (category === 'ipad-air-13') return IPAD_AIR_13_COLORS;
  if (category === 'ipad-pro-11') return IPAD_PRO_11_COLORS;
  if (category === 'ipad-pro-13') return IPAD_PRO_13_COLORS;
  if (category === 'airpods-max') return AIRPODS_MAX_COLORS;
  if (category === 'airpods' || category === 'airpods-pro') return AIRPODS_COLORS;
  if (category === 'apple-watch-se') return APPLE_WATCH_SE_COLORS;
  if (category === 'apple-watch-series-11') return APPLE_WATCH_SERIES_11_COLORS;
  if (category === 'apple-watch-ultra-3') return APPLE_WATCH_ULTRA_COLORS;
  return IPHONE_17_COLORS;
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
    'Серый космос': 0,
    'Белый': 1990,
    'Серебристый': 1990,
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
    const images = uniqueColorImages((c.images || []).filter(Boolean));
    const fallbackImages = c.img ? [c.img] : [];
    const gallery = images.length ? images : fallbackImages;
    return {
      ...c,
      price: basePrice + adjustment,
      oldPrice: baseOldPrice != null ? baseOldPrice + adjustment : null,
      filter: 'none',
      images: gallery,
      img: c.img || gallery[0],
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

function createIpadSku({
  id,
  name,
  category,
  price,
  storage,
  simType = 'Wi‑Fi',
  series,
  description,
  specs,
  badge = null,
}) {
  return createPhone({
    id,
    name,
    category,
    price,
    storage,
    simType,
    series,
    badge,
    description,
    specs,
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

  createIpadSku({
    id: 'ipad11-128',
    name: 'iPad 11-го поколения 128 ГБ Wi‑Fi',
    category: 'ipad-11-gen',
    price: 44990,
    storage: '128 ГБ',
    series: 'iPad 11-го поколения',
    badge: 'new',
    description: '11″ Liquid Retina, чип A16, Apple Pencil USB‑C и яркие цвета корпуса',
    specs: {
      display: '11″ Liquid Retina',
      chip: 'Apple A16',
      camera: '12 Мп Wide',
      battery: 'До 10 ч',
      connectivity: 'Wi‑Fi 6, USB‑C',
      protection: 'Алюминий, стекло',
    },
  }),

  createIpadSku({
    id: 'ipad11-256',
    name: 'iPad 11-го поколения 256 ГБ Wi‑Fi',
    category: 'ipad-11-gen',
    price: 54990,
    storage: '256 ГБ',
    series: 'iPad 11-го поколения',
    description: '11″ Liquid Retina, чип A16, Apple Pencil USB‑C и яркие цвета корпуса',
    specs: {
      display: '11″ Liquid Retina',
      chip: 'Apple A16',
      camera: '12 Мп Wide',
      battery: 'До 10 ч',
      connectivity: 'Wi‑Fi 6, USB‑C',
      protection: 'Алюминий, стекло',
    },
  }),

  createIpadSku({
    id: 'ipadmini7-128',
    name: 'iPad mini 7 128 ГБ Wi‑Fi',
    category: 'ipad-mini-7',
    price: 54990,
    storage: '128 ГБ',
    series: 'iPad mini 7',
    badge: 'new',
    description: '8.3″ Liquid Retina, A17 Pro, компактный формат и поддержка Apple Pencil Pro',
    specs: {
      display: '8.3″ Liquid Retina',
      chip: 'Apple A17 Pro',
      camera: '12 Мп Wide',
      battery: 'До 10 ч',
      connectivity: 'Wi‑Fi 6E, USB‑C',
      protection: 'Алюминий',
    },
  }),

  createIpadSku({
    id: 'ipadmini7-256',
    name: 'iPad mini 7 256 ГБ Wi‑Fi',
    category: 'ipad-mini-7',
    price: 64990,
    storage: '256 ГБ',
    series: 'iPad mini 7',
    description: '8.3″ Liquid Retina, A17 Pro, компактный формат и поддержка Apple Pencil Pro',
    specs: {
      display: '8.3″ Liquid Retina',
      chip: 'Apple A17 Pro',
      camera: '12 Мп Wide',
      battery: 'До 10 ч',
      connectivity: 'Wi‑Fi 6E, USB‑C',
      protection: 'Алюминий',
    },
  }),

  createIpadSku({
    id: 'ipadair11-128',
    name: 'iPad Air 11″ M3 128 ГБ Wi‑Fi',
    category: 'ipad-air-11',
    price: 69990,
    storage: '128 ГБ',
    series: 'iPad Air 11″',
    badge: 'hit',
    description: '11″ Liquid Retina, чип M3, тонкий корпус и Apple Pencil Pro',
    specs: {
      display: '11″ Liquid Retina',
      chip: 'Apple M3',
      camera: '12 Мп Wide',
      battery: 'До 10 ч',
      connectivity: 'Wi‑Fi 6E, USB‑C',
      protection: 'Алюминий',
    },
  }),

  createIpadSku({
    id: 'ipadair11-256',
    name: 'iPad Air 11″ M3 256 ГБ Wi‑Fi',
    category: 'ipad-air-11',
    price: 79990,
    storage: '256 ГБ',
    series: 'iPad Air 11″',
    description: '11″ Liquid Retina, чип M3, тонкий корпус и Apple Pencil Pro',
    specs: {
      display: '11″ Liquid Retina',
      chip: 'Apple M3',
      camera: '12 Мп Wide',
      battery: 'До 10 ч',
      connectivity: 'Wi‑Fi 6E, USB‑C',
      protection: 'Алюминий',
    },
  }),

  createIpadSku({
    id: 'ipadair13-128',
    name: 'iPad Air 13″ M3 128 ГБ Wi‑Fi',
    category: 'ipad-air-13',
    price: 89990,
    storage: '128 ГБ',
    series: 'iPad Air 13″',
    badge: 'new',
    description: '13″ Liquid Retina, чип M3, большой экран и Apple Pencil Pro',
    specs: {
      display: '13″ Liquid Retina',
      chip: 'Apple M3',
      camera: '12 Мп Wide',
      battery: 'До 12 ч',
      connectivity: 'Wi‑Fi 6E, USB‑C',
      protection: 'Алюминий',
    },
  }),

  createIpadSku({
    id: 'ipadair13-256',
    name: 'iPad Air 13″ M3 256 ГБ Wi‑Fi',
    category: 'ipad-air-13',
    price: 99990,
    storage: '256 ГБ',
    series: 'iPad Air 13″',
    description: '13″ Liquid Retina, чип M3, большой экран и Apple Pencil Pro',
    specs: {
      display: '13″ Liquid Retina',
      chip: 'Apple M3',
      camera: '12 Мп Wide',
      battery: 'До 12 ч',
      connectivity: 'Wi‑Fi 6E, USB‑C',
      protection: 'Алюминий',
    },
  }),

  createIpadSku({
    id: 'ipadpro11-256',
    name: 'iPad Pro 11″ M4 256 ГБ Wi‑Fi',
    category: 'ipad-pro-11',
    price: 99990,
    storage: '256 ГБ',
    series: 'iPad Pro 11″',
    badge: 'hit',
    description: '11″ Ultra Retina XDR, M4, ProMotion 120 Гц и Thunderbolt',
    specs: {
      display: '11″ Ultra Retina XDR 120 Гц',
      chip: 'Apple M4',
      camera: '12 Мп Wide + LiDAR',
      battery: 'До 10 ч',
      connectivity: 'Wi‑Fi 6E, Thunderbolt',
      protection: 'Алюминий, стекло',
    },
  }),

  createIpadSku({
    id: 'ipadpro11-512',
    name: 'iPad Pro 11″ M4 512 ГБ Wi‑Fi',
    category: 'ipad-pro-11',
    price: 119990,
    storage: '512 ГБ',
    series: 'iPad Pro 11″',
    description: '11″ Ultra Retina XDR, M4, ProMotion 120 Гц и Thunderbolt',
    specs: {
      display: '11″ Ultra Retina XDR 120 Гц',
      chip: 'Apple M4',
      camera: '12 Мп Wide + LiDAR',
      battery: 'До 10 ч',
      connectivity: 'Wi‑Fi 6E, Thunderbolt',
      protection: 'Алюминий, стекло',
    },
  }),

  createIpadSku({
    id: 'ipadpro13-256',
    name: 'iPad Pro 13″ M5 256 ГБ Wi‑Fi',
    category: 'ipad-pro-13',
    price: 119990,
    storage: '256 ГБ',
    series: 'iPad Pro 13″',
    badge: 'new',
    description: '13″ Ultra Retina XDR, M5, ProMotion 120 Гц и профессиональная производительность',
    specs: {
      display: '13″ Ultra Retina XDR 120 Гц',
      chip: 'Apple M5',
      camera: '12 Мп Wide + LiDAR',
      battery: 'До 12 ч',
      connectivity: 'Wi‑Fi 7, Thunderbolt',
      protection: 'Алюминий, стекло',
    },
  }),

  createIpadSku({
    id: 'ipadpro13-512',
    name: 'iPad Pro 13″ M5 512 ГБ Wi‑Fi',
    category: 'ipad-pro-13',
    price: 139990,
    storage: '512 ГБ',
    series: 'iPad Pro 13″',
    description: '13″ Ultra Retina XDR, M5, ProMotion 120 Гц и профессиональная производительность',
    specs: {
      display: '13″ Ultra Retina XDR 120 Гц',
      chip: 'Apple M5',
      camera: '12 Мп Wide + LiDAR',
      battery: 'До 12 ч',
      connectivity: 'Wi‑Fi 7, Thunderbolt',
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

  createPhone({
    id: 'watch-se-40',
    name: 'Apple Watch SE 3 40 мм GPS',
    category: 'apple-watch-se',
    price: 24990,
    storage: '40 мм',
    simType: 'GPS',
    series: 'Apple Watch SE 3',
    badge: 'new',
    description: 'Retina-дисплей, датчики здоровья, Crash Detection и автономность до 18 ч',
    specs: {
      display: '40 мм Retina OLED',
      chip: 'Apple S10',
      camera: '—',
      battery: 'До 18 ч',
      connectivity: 'GPS, Bluetooth 5.3, Wi‑Fi',
      protection: 'WR50, алюминий',
    },
  }),

  createPhone({
    id: 'watch-se-44',
    name: 'Apple Watch SE 3 44 мм GPS',
    category: 'apple-watch-se',
    price: 26990,
    storage: '44 мм',
    simType: 'GPS',
    series: 'Apple Watch SE 3',
    description: 'Увеличенный 44 мм корпус, те же функции здоровья и фитнеса, до 18 ч работы',
    specs: {
      display: '44 мм Retina OLED',
      chip: 'Apple S10',
      camera: '—',
      battery: 'До 18 ч',
      connectivity: 'GPS, Bluetooth 5.3, Wi‑Fi',
      protection: 'WR50, алюминий',
    },
  }),

  createPhone({
    id: 'watch-s11-42',
    name: 'Apple Watch Series 11 42 мм GPS',
    category: 'apple-watch-series-11',
    price: 44990,
    storage: '42 мм',
    simType: 'GPS',
    series: 'Apple Watch Series 11',
    badge: 'hit',
    description: 'Always-On Retina, ЭКГ, измерение температуры и расширенные тренировки',
    specs: {
      display: '42 мм Always-On Retina',
      chip: 'Apple S11',
      camera: '—',
      battery: 'До 24 ч',
      connectivity: 'GPS, Bluetooth 5.3, Wi‑Fi',
      protection: 'WR50, сапфир (версии)',
    },
  }),

  createPhone({
    id: 'watch-s11-46',
    name: 'Apple Watch Series 11 46 мм GPS',
    category: 'apple-watch-series-11',
    price: 47990,
    storage: '46 мм',
    simType: 'GPS',
    series: 'Apple Watch Series 11',
    description: 'Самый крупный экран в линейке Series 11, до 24 ч автономности и быстрая зарядка',
    specs: {
      display: '46 мм Always-On Retina',
      chip: 'Apple S11',
      camera: '—',
      battery: 'До 24 ч',
      connectivity: 'GPS, Bluetooth 5.3, Wi‑Fi',
      protection: 'WR50, сапфир (версии)',
    },
  }),

  createPhone({
    id: 'watch-ultra-3',
    name: 'Apple Watch Ultra 3 49 мм GPS',
    category: 'apple-watch-ultra-3',
    price: 89990,
    storage: '49 мм',
    simType: 'GPS',
    series: 'Apple Watch Ultra 3',
    description: 'Титановый корпус, яркий дисплей 3000 нит, дайверские функции и до 36 ч работы',
    specs: {
      display: '49 мм Always-On Retina 3000 нит',
      chip: 'Apple S11',
      camera: '—',
      battery: 'До 36 ч',
      connectivity: 'GPS, LTE (опция), Bluetooth 5.3',
      protection: 'WR100, MIL-STD, титан',
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
  if (!colorName) return product.colors[0];
  return product.colors.find(color => color.name === colorName) || product.colors[0];
}

function getProductColorIndex(product, colorName = '') {
  if (!product?.colors?.length) return 0;
  if (!colorName) return 0;
  const index = product.colors.findIndex(color => color.name === colorName);
  return index >= 0 ? index : 0;
}

function buildProductDetailHref(productId, colorName = '') {
  const params = new URLSearchParams({ id: productId });
  if (colorName) params.set('color', colorName);
  return `product.html?${params.toString()}`;
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

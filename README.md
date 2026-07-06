# Phone Market

Интернет-магазин оригинальных iPhone. Концепция и реализация по образцу [gran-pc](https://github.com/absolutepc/gran-pc).

## Особенности

- **Только Apple** — весь модельный ряд iPhone 17
- **15 SKU** — все конфигурации памяти и SIM (eSIM / dual SIM)
- **Несколько цветов в одной карточке** — переключение свотчами прямо в каталоге
- **Vanilla JS** — без фреймворков и сборщика, данные в `localStorage`

## Модельный ряд

| Серия | Модели |
|-------|--------|
| iPhone 17 | 128 ГБ |
| iPhone 17 Plus | 128 ГБ |
| iPhone 17 Pro | 128 / 256 / 512 ГБ (eSIM и SIM+eSIM) |
| iPhone 17 Pro Max | 256 / 512 ГБ / 1 ТБ (eSIM и SIM+eSIM) |

## Запуск

```bash
npx serve .
```

Откройте http://localhost:3000

## Документация

Подробная концепция: [CONCEPT.md](CONCEPT.md)

## Структура

```
├── index.html          # Главная
├── catalog.html        # Каталог с фильтрами
├── product.html        # Страница товара
├── cart.html           # Корзина
├── css/style.css       # Стили
├── js/
│   ├── data.js         # Каталог iPhone (15 товаров)
│   ├── app.js          # Корзина, карточки с цветами
│   ├── catalog.js      # Фильтры каталога
│   └── gallery.js      # Галерея на странице товара
└── img/phones/         # SVG-изображения
```

## Лицензия

MIT

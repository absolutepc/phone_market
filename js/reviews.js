function formatReviewDate(iso) {
  try {
    return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));
  } catch {
    return '';
  }
}

function getReviewCountLabel(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 14) return `${count} отзывов`;
  if (mod10 === 1) return `${count} отзыв`;
  if (mod10 >= 2 && mod10 <= 4) return `${count} отзыва`;
  return `${count} отзывов`;
}

function getReviewItemMeta(itemId, itemType) {
  if (itemType !== 'product' || typeof getEnrichedProductById !== 'function') return null;

  const product = getEnrichedProductById(itemId);
  if (!product) return null;

  return {
    name: product.name,
    label: product.series || CATEGORY_LABELS[product.category] || 'iPhone',
    href: `product.html?id=${encodeURIComponent(product.id)}`,
  };
}

function hasUserReviewedItem(itemId, itemType, userId) {
  if (!userId) return false;
  return getReviews().some(review =>
    review.itemId === itemId
    && review.itemType === itemType
    && review.userId === userId
  );
}

function getReviewAuthorName(review) {
  return review.userName || review.author || 'Покупатель';
}

function renderStarRating(rating, options = {}) {
  const {
    size = 'md',
    showValue = false,
    interactive = false,
    inputName = 'rating',
    selected = 0,
  } = options;

  const value = Math.max(0, Math.min(5, Number(rating) || 0));
  const sizeClass = size === 'sm' ? 'star-rating--sm' : size === 'lg' ? 'star-rating--lg' : '';
  const interactiveClass = interactive ? 'star-rating--interactive' : '';
  const fullStars = Math.floor(value);
  const hasHalf = !interactive && value - fullStars >= 0.25 && value - fullStars < 0.75;

  const stars = [1, 2, 3, 4, 5].map(star => {
    if (interactive) {
      const filled = star <= (selected || value);
      return `
        <button
          type="button"
          class="star-rating-star ${filled ? 'is-filled' : ''}"
          data-rating="${star}"
          aria-label="${star} из 5"
        >
          <i class="fa-solid fa-star"></i>
        </button>
      `;
    }

    let iconClass = 'fa-regular fa-star';
    let filledClass = '';
    if (star <= fullStars || (hasHalf && star === fullStars + 1)) {
      iconClass = hasHalf && star === fullStars + 1 ? 'fa-solid fa-star-half-stroke' : 'fa-solid fa-star';
      filledClass = 'is-filled';
    }

    return `<span class="star-rating-star ${filledClass}"><i class="${iconClass}"></i></span>`;
  }).join('');

  const valueHtml = showValue && value
    ? `<span class="star-rating-value">${value.toFixed(1)}</span>`
    : '';

  if (interactive) {
    return `
      <div class="star-rating ${sizeClass} ${interactiveClass}" data-rating-input="${inputName}">
        <input type="hidden" name="${inputName}" value="${selected || value || 0}">
        ${stars}
      </div>
    `;
  }

  return `<div class="star-rating ${sizeClass}" aria-label="Рейтинг ${value} из 5">${stars}${valueHtml}</div>`;
}

function renderRatingSummary(itemId, itemType, options = {}) {
  const { variant = 'compact', linkToReviews = true } = options;
  const summary = getRatingSummary(itemId, itemType);

  if (!summary.count) {
    return `
      <div class="product-rating product-rating--empty">
        ${renderStarRating(0, { size: variant === 'compact' ? 'sm' : 'md' })}
        <span class="product-rating-count">Нет отзывов</span>
      </div>
    `;
  }

  const countLabel = getReviewCountLabel(summary.count);
  const reviewsLink = linkToReviews
    ? `<a href="reviews.html?item=${encodeURIComponent(itemId)}&type=${encodeURIComponent(itemType)}" class="product-rating-link">${countLabel}</a>`
    : `<span class="product-rating-count">${countLabel}</span>`;

  if (variant === 'hero') {
    return `
      <div class="product-rating product-rating--hero">
        ${renderStarRating(summary.average, { size: 'md', showValue: true })}
        ${reviewsLink}
      </div>
    `;
  }

  return `
    <div class="product-rating">
      ${renderStarRating(summary.average, { size: 'sm', showValue: true })}
      ${reviewsLink}
    </div>
  `;
}

function renderRatingDistribution(summary) {
  if (!summary.count) return '';
  return `
    <div class="rating-distribution">
      ${[5, 4, 3, 2, 1].map(stars => {
        const count = summary.distribution[stars] || 0;
        const percent = summary.count ? Math.round((count / summary.count) * 100) : 0;
        return `
          <div class="rating-distribution-row">
            <span class="rating-distribution-label">${stars} <i class="fa-solid fa-star"></i></span>
            <div class="rating-distribution-track">
              <div class="rating-distribution-fill" style="width:${percent}%"></div>
            </div>
            <span class="rating-distribution-count">${count}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderReviewCard(review, options = {}) {
  const { showItem = false } = options;
  const meta = showItem ? getReviewItemMeta(review.itemId, review.itemType) : null;

  return `
    <article class="review-card">
      <div class="review-card-header">
        <div class="review-card-author">
          <div class="review-card-avatar">${escapeHtml(getReviewAuthorName(review)[0])}</div>
          <div>
            <div class="review-card-name">${escapeHtml(getReviewAuthorName(review))}</div>
            <div class="review-card-date">${formatReviewDate(review.createdAt)}</div>
          </div>
        </div>
        ${renderStarRating(review.rating, { size: 'sm' })}
      </div>
      ${showItem && meta ? `
        <div class="review-card-item">
          <span class="review-card-item-label">${escapeHtml(meta.label)}</span>
          <a href="${meta.href}">${escapeHtml(meta.name)}</a>
        </div>
      ` : ''}
      <p class="review-card-text">${escapeHtml(review.text)}</p>
    </article>
  `;
}

function renderReviewForm(itemId, itemType) {
  const user = getCurrentUser();
  if (!user) {
    return `
      <div class="review-form-guest">
        <p><a href="account.html">Войдите в аккаунт</a>, чтобы оставить отзыв</p>
      </div>
    `;
  }

  if (hasUserReviewedItem(itemId, itemType, user.id)) {
    return `
      <div class="review-form-done">
        <p>Вы уже оставили отзыв на этот товар. Спасибо!</p>
      </div>
    `;
  }

  return `
    <form class="review-form" data-item-id="${escapeHtml(itemId)}" data-item-type="${escapeHtml(itemType)}">
      <h3>Оставить отзыв</h3>
      <div class="review-form-field">
        <label>Ваша оценка</label>
        ${renderStarRating(0, { interactive: true, size: 'lg', inputName: 'rating', selected: 0 })}
      </div>
      <div class="review-form-field">
        <label for="reviewText">Комментарий</label>
        <textarea id="reviewText" name="text" rows="4" placeholder="Расскажите о вашем опыте..." required minlength="10"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Отправить отзыв</button>
    </form>
  `;
}

function renderReviewsSection(itemId, itemType) {
  const summary = getRatingSummary(itemId, itemType);
  const reviews = getReviewsForItem(itemId, itemType);

  return `
    <section class="pc-detail-section reviews-section" id="reviews">
      <h2>Отзывы</h2>
      <p class="section-sub">Мнения покупателей о товаре</p>

      <div class="reviews-section-layout">
        <aside class="reviews-summary-panel">
          <div class="reviews-summary-score">
            <div class="reviews-summary-number">${summary.count ? summary.average.toFixed(1) : '—'}</div>
            ${renderStarRating(summary.average, { size: 'lg' })}
            <div class="reviews-summary-count">${summary.count ? getReviewCountLabel(summary.count) : 'Пока нет отзывов'}</div>
          </div>
          ${renderRatingDistribution(summary)}
        </aside>

        <div class="reviews-section-main">
          ${renderReviewForm(itemId, itemType)}
          <div class="reviews-list" id="reviewsList">
            ${reviews.length
              ? reviews.map(r => renderReviewCard(r)).join('')
              : '<p class="reviews-empty">Отзывов пока нет. Будьте первым!</p>'}
          </div>
        </div>
      </div>
    </section>
  `;
}

function bindInteractiveStars(container) {
  container.querySelectorAll('.star-rating--interactive').forEach(wrapper => {
    const input = wrapper.querySelector('input[type="hidden"]');
    wrapper.querySelectorAll('.star-rating-star').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        const hover = Number(btn.dataset.rating);
        wrapper.querySelectorAll('.star-rating-star').forEach(star => {
          star.classList.toggle('is-filled', Number(star.dataset.rating) <= hover);
        });
      });
      btn.addEventListener('mouseleave', () => {
        const selected = Number(input?.value || 0);
        wrapper.querySelectorAll('.star-rating-star').forEach(star => {
          star.classList.toggle('is-filled', Number(star.dataset.rating) <= selected);
        });
      });
      btn.addEventListener('click', () => {
        const rating = Number(btn.dataset.rating);
        if (input) input.value = String(rating);
        wrapper.querySelectorAll('.star-rating-star').forEach(star => {
          star.classList.toggle('is-filled', Number(star.dataset.rating) <= rating);
        });
      });
    });
  });
}

function bindReviewForm(container, itemId, itemType) {
  bindInteractiveStars(container);

  const form = container.querySelector('.review-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = getCurrentUser();
    if (!user) return;

    const rating = Number(form.querySelector('input[name="rating"]')?.value || 0);
    const text = form.querySelector('textarea[name="text"]')?.value?.trim() || '';

    if (rating < 1) {
      showToast('Поставьте оценку от 1 до 5 звёзд', 'error');
      return;
    }
    if (text.length < 10) {
      showToast('Комментарий должен быть не короче 10 символов', 'error');
      return;
    }

    addReview({
      itemId,
      itemType,
      rating,
      text,
      userId: user.id,
      userName: user.name,
    });

    showToast('Спасибо! Ваш отзыв опубликован', 'success');

    const reviewsBlock = container.querySelector('.reviews-section') || container;
    const sectionParent = reviewsBlock.closest('.pc-detail-page') || container;
    const oldSection = sectionParent.querySelector('.reviews-section');
    if (oldSection) {
      oldSection.outerHTML = renderReviewsSection(itemId, itemType);
      bindReviewsSection(sectionParent, itemId, itemType);
    }

    const heroRating = sectionParent.querySelector('.product-rating--hero');
    if (heroRating) {
      heroRating.outerHTML = renderRatingSummary(itemId, itemType, { variant: 'hero' });
    }
  });
}

function bindReviewsSection(container, itemId, itemType) {
  bindReviewForm(container, itemId, itemType);
}

function initReviewsPage() {
  const container = document.getElementById('reviewsPageContent');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const filterItem = params.get('item');
  const filterType = params.get('type');

  let reviews = getReviews().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (filterItem && filterType) {
    reviews = reviews.filter(r => r.itemId === filterItem && r.itemType === filterType);
    const meta = getReviewItemMeta(filterItem, filterType);
    const summary = getRatingSummary(filterItem, filterType);

    document.title = meta ? `Отзывы: ${meta.name} — Phone Market` : 'Отзывы — Phone Market';

    container.innerHTML = `
      <div class="container reviews-page">
        <div class="breadcrumbs">
          <a href="index.html">Главная</a> /
          <a href="reviews.html">Отзывы</a> /
          <span>${meta ? escapeHtml(meta.name) : 'Товар'}</span>
        </div>

        <div class="reviews-page-header">
          <div>
            <h1>Отзывы${meta ? `: ${escapeHtml(meta.name)}` : ''}</h1>
            <p class="section-sub">${meta ? escapeHtml(meta.label) : ''}</p>
          </div>
          ${meta ? `<a href="${meta.href}" class="btn btn-secondary">← К товару</a>` : ''}
        </div>

        <div class="reviews-section-layout reviews-section-layout--page">
          <aside class="reviews-summary-panel">
            <div class="reviews-summary-score">
              <div class="reviews-summary-number">${summary.count ? summary.average.toFixed(1) : '—'}</div>
              ${renderStarRating(summary.average, { size: 'lg' })}
              <div class="reviews-summary-count">${summary.count ? getReviewCountLabel(summary.count) : 'Пока нет отзывов'}</div>
            </div>
            ${renderRatingDistribution(summary)}
          </aside>

          <div class="reviews-section-main">
            ${renderReviewForm(filterItem, filterType)}
            <div class="reviews-page-grid">
              ${reviews.length
                ? reviews.map(r => renderReviewCard(r)).join('')
                : '<p class="reviews-empty">Отзывов пока нет.</p>'}
            </div>
          </div>
        </div>
      </div>
    `;

    bindReviewForm(container, filterItem, filterType);
    return;
  }

  const allReviews = reviews;
  const totalCount = allReviews.length;
  const avgRating = totalCount
    ? Math.round((allReviews.reduce((sum, r) => sum + r.rating, 0) / totalCount) * 10) / 10
    : 0;

  const productReviews = allReviews.filter(r => r.itemType === 'product').length;
  const proReviews = allReviews.filter(r => {
    if (r.itemType !== 'product') return false;
    const product = typeof getEnrichedProductById === 'function' ? getEnrichedProductById(r.itemId) : null;
    return product?.category?.includes('pro');
  }).length;

  container.innerHTML = `
    <div class="container reviews-page">
      <div class="breadcrumbs">
        <a href="index.html">Главная</a> / <span>Отзывы</span>
      </div>

      <div class="reviews-page-header">
        <div>
          <h1>Отзывы покупателей</h1>
          <p class="section-sub">Реальные мнения покупателей Phone Market</p>
        </div>
      </div>

      <div class="reviews-overview-cards">
        <div class="reviews-overview-card">
          <div class="reviews-overview-value">${avgRating.toFixed(1)}</div>
          ${renderStarRating(avgRating, { size: 'md' })}
          <div class="reviews-overview-label">Средняя оценка</div>
        </div>
        <div class="reviews-overview-card">
          <div class="reviews-overview-value">${totalCount}</div>
          <div class="reviews-overview-label">${getReviewCountLabel(totalCount)}</div>
        </div>
        <div class="reviews-overview-card">
          <div class="reviews-overview-value">${productReviews}</div>
          <div class="reviews-overview-label">О товарах</div>
        </div>
        <div class="reviews-overview-card">
          <div class="reviews-overview-value">${proReviews}</div>
          <div class="reviews-overview-label">О моделях Pro</div>
        </div>
      </div>

      <div class="reviews-page-grid">
        ${allReviews.length
          ? allReviews.map(r => renderReviewCard(r, { showItem: true })).join('')
          : '<p class="reviews-empty">Отзывов пока нет.</p>'}
      </div>
    </div>
  `;
}

function bootReviews() {
  if (document.getElementById('reviewsPageContent')) initReviewsPage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootReviews);
} else {
  bootReviews();
}

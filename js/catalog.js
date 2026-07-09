function resolveCatalogLine(params) {
  const lineParam = params.get('line');
  if (lineParam && getCatalogLineById(lineParam)) return lineParam;

  const categoryParam = params.get('cat');
  if (categoryParam && CATEGORY_TO_LINE[categoryParam]) {
    return CATEGORY_TO_LINE[categoryParam];
  }

  return 'iphone';
}

function initCatalogPage() {
  const params = new URLSearchParams(window.location.search);
  const line = resolveCatalogLine(params);
  initPhoneCatalog({
    preselectedLine: line,
    preselectedCategory: params.get('cat'),
  });
}

if (document.getElementById('filtersSidebar')) {
  initCatalogPage();
}

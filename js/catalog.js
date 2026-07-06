function initCatalogPage() {
  const params = new URLSearchParams(window.location.search);
  initPhoneCatalog({ preselectedCategory: params.get('cat') });
}

if (document.getElementById('filtersSidebar')) {
  initCatalogPage();
}

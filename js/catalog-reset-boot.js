(function bootCatalogReset() {
  try {
    var params = new URLSearchParams(window.location.search);
    if (params.get('phonemarket_reset') === '1') {
      Object.keys(localStorage).forEach(function (key) {
        if (key.indexOf('phonemarket_') === 0) localStorage.removeItem(key);
      });
      params.delete('phonemarket_reset');
      var query = params.toString();
      window.location.replace(window.location.pathname + (query ? '?' + query : '') + window.location.hash);
    }
  } catch (error) {
    // localStorage недоступен
  }
})();

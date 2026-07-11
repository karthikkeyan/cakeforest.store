(function () {
  function getTheme() {
    // Dev override: ?theme=night or ?theme=day in the URL
    var param = new URLSearchParams(location.search).get('theme');
    if (param === 'night' || param === 'day') return param;

    var h = new Date().getHours();
    return (h >= 6 && h < 20) ? 'day' : 'night';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function loadPartial(theme) {
    fetch('partials/' + theme + '.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        document.getElementById('root').innerHTML = html;
      });
  }

  var currentTheme = getTheme();
  applyTheme(currentTheme);
  loadPartial(currentTheme);

  // Auto-switch at the theme boundary (6 AM / 8 PM) — only when not overridden
  setInterval(function () {
    var t = getTheme();
    if (t !== currentTheme) {
      currentTheme = t;
      applyTheme(t);
      loadPartial(t);
    }
  }, 60 * 1000);
})();

(function () {
  function getTheme() {
    var param = new URLSearchParams(location.search).get('theme');
    if (param === 'night' || param === 'day') return param;
    var h = new Date().getHours();
    return (h >= 6 && h < 20) ? 'day' : 'night';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', theme === 'night' ? '#090406' : '#1B3528');
  }

  function setupHamburger() {
    var btn = document.querySelector('.nav-hamburger');
    if (!btn) return;
    var nav = btn.closest('nav');
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function loadPartial(theme) {
    fetch('partials/' + theme + '-gallery.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        document.getElementById('root').innerHTML = html;
        setupHamburger();
      });
  }

  var currentTheme = getTheme();
  applyTheme(currentTheme);
  loadPartial(currentTheme);

  setInterval(function () {
    var t = getTheme();
    if (t !== currentTheme) {
      currentTheme = t;
      applyTheme(t);
      loadPartial(t);
    }
  }, 60 * 1000);
})();

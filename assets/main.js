/* Portafolio Jessica Quiroga — interacciones */
(function () {
  var root = document.documentElement;

  /* ---------- Idioma ES / EN ---------- */
  function getStored() {
    try { return localStorage.getItem('jq-lang'); } catch (e) { return null; }
  }
  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    var t = document.querySelector('meta[name="title-' + lang + '"]');
    if (t) document.title = t.getAttribute('content');
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
    try { localStorage.setItem('jq-lang', lang); } catch (e) {}
  }
  setLang(getStored() || 'es');
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  /* ---------- Pestañas de escenarios ---------- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var buttons = group.querySelectorAll('[role="tab"]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          var on = b === btn;
          b.setAttribute('aria-selected', on ? 'true' : 'false');
          var p = document.getElementById(b.getAttribute('aria-controls'));
          if (p) p.classList.toggle('on', on);
        });
      });
    });
  });

  /* ---------- Selector de roles ---------- */
  var roleBtns = document.querySelectorAll('.role-btn');
  var cells = document.querySelectorAll('.cells i');
  function showRole(btn) {
    roleBtns.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
    var n = parseInt(btn.dataset.n, 10);
    cells.forEach(function (c, i) { c.classList.toggle('on', i < n); });
    var set = function (sel, val) { var el = document.querySelector(sel); if (el) el.textContent = val; };
    set('[data-role-name="es"]', btn.dataset.nameEs);
    set('[data-role-name="en"]', btn.dataset.nameEn);
    set('[data-role-focus="es"]', btn.dataset.focusEs);
    set('[data-role-focus="en"]', btn.dataset.focusEn);
    set('[data-role-count]', n + ' / 21');
  }
  roleBtns.forEach(function (b) { b.addEventListener('click', function () { showRole(b); }); });
  if (roleBtns.length) showRole(roleBtns[0]);

  /* ---------- Aparición al hacer scroll ---------- */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Año del footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();

/* ---------- Gráficos de línea: órbitas y conexiones ---------- */
(function () {
  if (!document.querySelector('.doodle')) return;
  var rays = '';
  for (var i = 0; i <= 16; i++) {
    var a = Math.PI - (i / 16) * Math.PI;
    rays += '<line x1="50" y1="80" x2="' + (50 + 46 * Math.cos(a)).toFixed(1) + '" y2="' + (80 - 46 * Math.sin(a)).toFixed(1) + '"/>';
  }
  var grid = '';
  for (var r = 0; r < 5; r++) for (var k = 0; k < 7; k++) grid += '<circle class="dot" cx="' + (8 + k * 14) + '" cy="' + (22 + r * 14) + '" r="1.6"/>';
  var S = {
    orbits: '<ellipse cx="50" cy="34" rx="46" ry="14"/><ellipse cx="50" cy="50" rx="46" ry="14"/><ellipse cx="50" cy="66" rx="46" ry="14"/>' +
            '<path d="M6 92 C22 30 70 8 96 46"/>' +
            '<circle class="or pulse" cx="6" cy="92" r="2.6"/><circle class="y pulse" style="animation-delay:1.2s" cx="88" cy="35" r="2.6"/><circle class="vi" cx="30" cy="40" r="1.8"/>',
    rings: '<circle cx="50" cy="50" r="46"/><circle cx="50" cy="56" r="38"/><circle cx="50" cy="62" r="30"/><circle cx="50" cy="68" r="22"/><circle cx="50" cy="74" r="14"/><circle class="y" cx="50" cy="88" r="2.8"/>',
    venn: '<circle cx="36" cy="40" r="26"/><circle cx="64" cy="40" r="26"/><circle cx="50" cy="64" r="26"/><circle class="y pulse" cx="50" cy="49" r="3.2"/>',
    rays: rays + '<line x1="2" y1="80" x2="98" y2="80"/><circle class="or" cx="50" cy="80" r="3"/>',
    orbit: '<g class="spin-g"><ellipse cx="50" cy="50" rx="46" ry="18" transform="rotate(-18 50 50)"/><ellipse cx="50" cy="50" rx="38" ry="12" transform="rotate(-18 50 50)"/><circle class="or" cx="8" cy="64" r="3"/><circle class="y" cx="90" cy="36" r="2.4"/></g>',
    atom: '<g class="spin-g"><ellipse cx="50" cy="50" rx="44" ry="16"/><ellipse cx="50" cy="50" rx="44" ry="16" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="44" ry="16" transform="rotate(120 50 50)"/></g><circle class="or" cx="50" cy="50" r="3.4"/>',
    arcs: '<path d="M10 96 V52 A40 40 0 0 1 90 52 V96"/><path d="M22 96 V52 A28 28 0 0 1 78 52 V96"/><path d="M34 96 V52 A16 16 0 0 1 66 52 V96"/><circle class="y" cx="50" cy="12" r="2.8"/>',
    globe: '<circle cx="50" cy="50" r="44"/><ellipse cx="50" cy="50" rx="30" ry="44"/><ellipse cx="50" cy="50" rx="12" ry="44"/><path d="M6 50 H94"/><circle class="or" cx="80" cy="30" r="3"/>',
    frame: '<path d="M4 100 V46 A46 46 0 0 1 96 46 V100"/><path d="M12 100 V48 A38 38 0 0 1 88 48 V100"/><circle class="y pulse" cx="50" cy="0" r="2.6"/><circle class="or" cx="96" cy="70" r="2.2"/>',
    spark: '<path d="M50 4 C52 38 62 48 96 50 C62 52 52 62 50 96 C48 62 38 52 4 50 C38 48 48 38 50 4Z"/>',
    dots: grid + '<circle class="or" cx="64" cy="50" r="3"/>',
    path: '<path d="M4 80 C24 80 24 20 50 20 S76 80 96 80"/><circle class="y" cx="4" cy="80" r="3"/><circle class="vi" cx="50" cy="20" r="3"/><circle class="or" cx="96" cy="80" r="3"/>'
  };
  document.querySelectorAll('.doodle').forEach(function (el) {
    var s = S[el.dataset.d];
    if (!s) return;
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<svg viewBox="0 0 100 100">' + s + '</svg>';
  });
})();

/* ---------- Abrir cada página siempre desde el inicio ---------- */
(function () {
  try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) {}
  var anchor = document.createElement('span');
  anchor.setAttribute('aria-hidden', 'true');
  anchor.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
  document.body.insertBefore(anchor, document.body.firstChild);
  function toTop() {
    if (location.hash) return;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    try { anchor.scrollIntoView({ block: 'start', behavior: 'instant' }); } catch (e) { try { anchor.scrollIntoView(true); } catch (e2) {} }
    document.documentElement.style.scrollBehavior = '';
  }
  toTop();
  window.addEventListener('load', toTop);
  window.addEventListener('pageshow', toTop);
  [60, 250, 600].forEach(function (t) { setTimeout(toTop, t); });
})();

(function () {
  var btn = document.querySelector('.menu-btn'), panel = document.getElementById('menu-panel');
  if (!btn || !panel) return;
  function set(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    panel.classList.toggle('open', open);

  }
  btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); } });
  panel.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
})();

(function () {
  var body = document.body;
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.has-sub > button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement;
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  document.addEventListener('click', function (e) {
    document.querySelectorAll('.call-menu[open]').forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute('open');
    });
    document.querySelectorAll('.has-sub.open').forEach(function (li) {
      if (!li.contains(e.target) && window.innerWidth > 900) li.classList.remove('open');
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      body.classList.remove('nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      document.querySelectorAll('.has-sub.open').forEach(function (li) { li.classList.remove('open'); });
      document.querySelectorAll('.call-menu[open]').forEach(function (d) { d.removeAttribute('open'); });
    }
  });

  document.querySelectorAll('.main-nav a').forEach(function (a) {
    a.addEventListener('click', function () { body.classList.remove('nav-open'); });
  });

  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

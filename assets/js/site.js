/* Time-based visibility (Europe/Vienna wall clock).
   Any element with data-until="YYYY-MM-DDTHH:MM" is hidden once that
   moment has passed in Vienna. A container with data-expire-group is
   hidden — together with nav links pointing to its id — when none of
   its data-until children remain visible. */
(function () {
  var now;
  try {
    now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Vienna' }));
  } catch (e) { now = new Date(); }
  var items = document.querySelectorAll('[data-until]');
  for (var i = 0; i < items.length; i++) {
    var d = new Date(items[i].getAttribute('data-until'));
    if (!isNaN(d.getTime()) && now > d) items[i].setAttribute('hidden', '');
  }
  var groups = document.querySelectorAll('[data-expire-group]');
  for (var g = 0; g < groups.length; g++) {
    if (!groups[g].querySelector('[data-until]:not([hidden])')) {
      groups[g].setAttribute('hidden', '');
      if (groups[g].id) {
        var links = document.querySelectorAll('a[href*="#' + groups[g].id + '"]');
        for (var l = 0; l < links.length; l++) links[l].setAttribute('hidden', '');
      }
    }
  }
})();

(function () {
  var burger = document.querySelector('.burger');
  var links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', function () {
      links.classList.toggle('open');
      burger.setAttribute('aria-expanded', links.classList.contains('open') ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('open');
    });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('in'); });
  }
})();

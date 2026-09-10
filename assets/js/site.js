(() => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  if (!button || !nav) return;
  const close = () => { nav.classList.remove('open'); button.setAttribute('aria-expanded', 'false'); };
  button.addEventListener('click', () => { const open = button.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); button.setAttribute('aria-expanded', String(open)); });
  nav.addEventListener('click', e => { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) { close(); button.focus(); } });
  document.addEventListener('click', e => { if (!e.target.closest('.site-header')) close(); });
  window.matchMedia('(min-width: 761px)').addEventListener('change', e => { if (e.matches) close(); });
})();

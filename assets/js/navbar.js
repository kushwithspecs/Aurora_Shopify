/* ─── Navbar — mobile menu toggle ─── */
(function () {
  const burger     = document.getElementById('navBurger');
  const closeBtn   = document.getElementById('menuClose');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!burger || !closeBtn || !mobileMenu) return;

  function open() {
    mobileMenu.classList.add('is-open');
    document.body.classList.add('no-scroll');
  }
  function close() {
    mobileMenu.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }

  burger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
})();

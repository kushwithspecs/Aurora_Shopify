/* ─── Hero — image stack scale + reveal on load ─── */
(function () {
  const stack = document.querySelector('.hero__stack');
  if (!stack) return;

  // Reveal stack shortly after load
  window.addEventListener('load', () => {
    requestAnimationFrame(() => {
      setTimeout(() => stack.classList.add('is-in'), 200);
    });
  });

  // Preload secondary images for product cards so hover swap is instant
  document.querySelectorAll('.product-card .img-secondary').forEach(img => {
    if (img.dataset.src) {
      const pre = new Image();
      pre.src = img.dataset.src;
    }
  });
})();

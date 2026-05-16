/* ─── Scroll Reveal + Letter-by-Letter Split ─── */
(function () {
  // 1. Split-text — wrap each character of any .split-text element in a <span class="char">
  document.querySelectorAll('.split-text').forEach(el => {
    if (el.dataset.split === 'true') return;
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.style.transitionDelay = (i * 30) + 'ms';
      span.textContent = ch;
      el.appendChild(span);
    });
    el.dataset.split = 'true';
  });

  // 2. IntersectionObserver for reveal + split-text
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .split-text').forEach(el => observer.observe(el));

  // 3. Hero headline animates on load (not on scroll)
  window.addEventListener('load', () => {
    document.querySelectorAll('.split-text.hero-headline').forEach(el => el.classList.add('is-visible'));
  });
})();

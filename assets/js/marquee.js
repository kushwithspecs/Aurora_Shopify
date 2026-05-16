/* ─── Marquee — pause-on-hover for any [data-marquee] element ─── */
(function () {
  document.querySelectorAll('[data-marquee]').forEach(el => {
    const track = el.querySelector('.trending-track__inner, .strip-marquee__track, .footer__marquee-track');
    if (!track) return;
    el.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
    el.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
  });
})();

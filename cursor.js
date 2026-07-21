(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  function init() {
    var gsap = window.gsap;
    if (!gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(window.ScrollTrigger);

    if (!reduce) {
      if (document.querySelector('[data-load]')) {
        gsap.from('[data-load]', {
          y: 30, opacity: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out', delay: 0.1
        });
      }
      gsap.utils.toArray('.reveal').forEach(function (el) {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
      });
      window.ScrollTrigger.refresh();
    }

    if (fine) initCursor(gsap);
  }

  function initCursor(gsap) {
    var dot = document.getElementById('cursorDot');
    var ring = document.getElementById('cursorRing');
    var label = document.getElementById('cursorLabel');
    if (!dot || !ring) return;
    var dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
    var dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });
    var rx = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
    var ry = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
    window.addEventListener('mousemove', function (e) {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      var hoverView = e.target.closest('[data-hover-view]');
      var hover = e.target.closest('[data-hover]');
      if (hoverView) {
        var onBlue = !!e.target.closest('[data-cursor="blue"]');
        var fill = onBlue ? '#f2efe9' : '#111';
        var text = onBlue ? '#111' : '#f2efe9';
        ring.style.mixBlendMode = 'normal';
        gsap.to(ring, { scale: 1.9, backgroundColor: fill, borderColor: text, duration: 0.25 });
        gsap.to(label, { opacity: 1, color: text, duration: 0.2 });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      } else if (hover) {
        ring.style.mixBlendMode = 'difference';
        gsap.to(ring, { scale: 1.5, backgroundColor: 'rgba(0,0,0,0)', borderColor: '#fff', duration: 0.25 });
        gsap.to(label, { opacity: 0, duration: 0.2 });
        gsap.to(dot, { scale: 1.6, duration: 0.2 });
      } else {
        ring.style.mixBlendMode = 'difference';
        gsap.to(ring, { scale: 1, backgroundColor: 'rgba(0,0,0,0)', borderColor: '#fff', duration: 0.25 });
        gsap.to(label, { opacity: 0, duration: 0.2 });
        gsap.to(dot, { scale: 1, duration: 0.2 });
      }
    });
  }

  var wait = setInterval(function () {
    if (window.gsap && window.ScrollTrigger) { clearInterval(wait); init(); }
  }, 60);
})();

/* TurtIL wiki - small enhancements (no dependencies) */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('nav-menu');
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-menu a'));
  var targets = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });

  /* Header shadow + active nav link while scrolling */
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);

    var y = window.scrollY + 140;
    var current = 0;
    targets.forEach(function (t, i) { if (t && t.offsetTop <= y) current = i; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = targets.length - 1; /* bottom of page = Contact */
    }
    links.forEach(function (a, i) {
      a.classList.toggle('is-active', i === current);
      if (i === current) { a.setAttribute('aria-current', 'true'); } else { a.removeAttribute('aria-current'); }
    });
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  /* Mobile menu */
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
  links.forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMenu(false); } });

  /* Reveal-on-scroll */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Footer year */
  var year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = year; });
})();

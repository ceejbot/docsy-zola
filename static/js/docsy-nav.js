/*
 * docsy-nav.js — the navbar behaviors from docsy v0.16.0 assets/js/base.js,
 * without jQuery: Bootstrap tooltip/popover initialisation and the horizontal
 * overflow indicators on the main navbar. The sidebar active state that
 * chrome-nav.js applied at runtime is rendered by the templates here, so that
 * file has no counterpart.
 */
(function () {
  'use strict';

  function init() {
    if (window.bootstrap) {
      document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (el) {
        bootstrap.Tooltip.getOrCreateInstance(el);
      });
      document.querySelectorAll('[data-bs-toggle="popover"]').forEach(function (el) {
        bootstrap.Popover.getOrCreateInstance(el);
      });
    }

    var navbarNav = document.querySelector('.navbar-nav');
    var container = document.getElementById('main_navbar');
    var navbarContainer = document.querySelector('.td-navbar-container');
    if (!navbarNav || !container || !navbarContainer) return;

    var left = container.querySelector('.scroll-left');
    var right = container.querySelector('.scroll-right');

    function updateIndicators() {
      var max = navbarNav.scrollWidth - navbarNav.clientWidth;
      if (left) left.classList.toggle('visible', navbarNav.scrollLeft > 0);
      if (right) right.classList.toggle('visible', navbarNav.scrollLeft < max);
    }

    function checkOverflow() {
      var overflowing = navbarNav.scrollWidth > navbarNav.clientWidth;
      container.classList.toggle('td-navbar-nav-scroll--indicator', overflowing);
      navbarContainer.classList.toggle('navbar-is-overflowing', overflowing);
      if (overflowing) updateIndicators();
    }

    if (left) left.addEventListener('click', function () { navbarNav.scrollBy({ left: -100, behavior: 'smooth' }); });
    if (right) right.addEventListener('click', function () { navbarNav.scrollBy({ left: 100, behavior: 'smooth' }); });
    navbarNav.addEventListener('scroll', updateIndicators);
    window.addEventListener('resize', checkOverflow);
    checkOverflow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

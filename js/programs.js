/* ============================================================
   SCS USJ-R — Programs Page JS
   Scroll-snap engine + section entry animation controller.
   Same pattern as scrollSnap.js.
   ============================================================ */

if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

(function () {
  'use strict';

  let animationFrameId = null;
  let sections         = [];
  let footer           = null;
  let scrollTargets    = [];
  let currentIndex     = 0;

  /* ---- HELPERS ---- */

  function getNavHeight() {
    const nav = document.querySelector('nav');
    return nav ? nav.getBoundingClientRect().height : 64;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /* ---- INIT ---- */

  function init() {
    const navH = getNavHeight();
    document.documentElement.style.setProperty('--nav-height', navH + 'px');

    sections = Array.from(document.querySelectorAll('section'));

    var sectionH = window.innerHeight - navH;
    scrollTargets = sections.map(function (_, i) {
      return i * sectionH;
    });

    footer = document.querySelector('footer');
    if (footer) {
      scrollTargets.push(document.body.scrollHeight - window.innerHeight);
    }

    // Check for hash FIRST — if present, go there instead of closest index
    var hash = window.location.hash;
    var hashIdx = hash ? parseInt(hash.replace('#', ''), 10) : NaN;

    if (!isNaN(hashIdx) && hashIdx >= 0 && hashIdx < scrollTargets.length) {
      // Immediately set scroll position so getClosestIndex() won't override it
      window.scrollTo(0, scrollTargets[hashIdx]);
      goTo(hashIdx, false);
    } else {
      goTo(getClosestIndex(), false);
    }
  }

  /* ---- CLOSEST INDEX ---- */

  function getClosestIndex() {
    var pos     = window.scrollY;
    var closest = 0;
    var minDist = Infinity;
    scrollTargets.forEach(function (y, i) {
      var d = Math.abs(pos - y);
      if (d < minDist) { minDist = d; closest = i; }
    });
    return closest;
  }

  /* ---- SMOOTH SCROLL ---- */

  function smoothScrollTo(targetY, duration) {
    duration = (duration !== undefined) ? duration : 750;

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    var startY    = window.scrollY;
    var diff      = targetY - startY;
    var startTime = null;

    function animate(now) {
      if (!startTime) startTime = now;
      var elapsed  = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + diff * easeOutCubic(progress));
      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        animationFrameId = null;
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  /* ---- ACTIVATE SECTION ---- */

  function goTo(idx, animate) {
    animate = (animate !== undefined) ? animate : true;
    if (idx < 0 || idx >= scrollTargets.length) return;

    var prev = sections[currentIndex];
    if (prev && prev.classList.contains('program-section')) {
      prev.classList.remove('is-active');
      prev.classList.add('was-active');
    }

    currentIndex = idx;

    var cur = sections[idx];
    if (cur && cur.classList.contains('program-section')) {
      cur.classList.remove('was-active');
      cur.classList.add('is-active');
    }

    updateUI(idx);

    if (animate) smoothScrollTo(scrollTargets[idx]);
  }

  /* ---- UPDATE UI INDICATORS ---- */

  function updateUI(idx) {
    var isFooter = (idx === scrollTargets.length - 1) && footer;

    var sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.style.opacity = isFooter ? '0' : '1';

    document.querySelectorAll('.sidebar-pip').forEach(function (pip, i) {
      pip.classList.toggle('active', i === idx);
    });

    document.querySelectorAll('.prog-index-dot').forEach(function (dot) {
      dot.classList.toggle('active', parseInt(dot.dataset.index, 10) === idx);
    });
  }

  /* ---- WHEEL ---- */

  var wheelTimer = null;

  window.addEventListener('wheel', function (e) {
    e.preventDefault();
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(function () {
      var dir  = e.deltaY > 0 ? 1 : -1;
      var next = Math.max(0, Math.min(scrollTargets.length - 1, currentIndex + dir));
      goTo(next);
    }, 50);
  }, { passive: false });

  /* ---- TOUCH ---- */

  var touchStartY = 0;

  window.addEventListener('touchstart', function (e) {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', function (e) {
    var delta = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(delta) < 12) return;
    var dir  = delta > 0 ? 1 : -1;
    var next = Math.max(0, Math.min(scrollTargets.length - 1, currentIndex + dir));
    goTo(next);
  }, { passive: true });

  /* ---- KEYBOARD ---- */

  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      goTo(Math.min(scrollTargets.length - 1, currentIndex + 1));
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      goTo(Math.max(0, currentIndex - 1));
    }
  });

  /* ---- SIDEBAR PIP CLICKS ---- */

  document.addEventListener('click', function (e) {
    var pip = e.target.closest('.sidebar-pip');
    if (pip) {
      var idx = parseInt(pip.dataset.index, 10);
      if (!isNaN(idx)) goTo(idx);
    }
  });

  /* ---- HERO NUMBER DOT CLICKS ---- */

  document.addEventListener('click', function (e) {
    var dot = e.target.closest('.prog-index-dot');
    if (dot) {
      var idx = parseInt(dot.dataset.index, 10);
      if (!isNaN(idx)) goTo(idx);
    }
  });

  /* ---- RESIZE ---- */

  window.addEventListener('resize', function () {
    clearTimeout(window._progResizeTimer);
    window._progResizeTimer = setTimeout(init, 120);
  });

  /* ---- BOOT ---- */
  window.addEventListener('hashchange', function () {
    var hash = window.location.hash;
    var hashIdx = hash ? parseInt(hash.replace('#', ''), 10) : NaN;
    if (!isNaN(hashIdx) && hashIdx >= 0 && hashIdx < scrollTargets.length) {
      goTo(hashIdx);
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        init();
      });
    });
  });

  /* ---- PROGRAM SELECTOR CARD CLICKS ---- */
document.addEventListener('click', function (e) {
  var card = e.target.closest('.prog-sel-card');
  if (card) {
    var idx = parseInt(card.dataset.index, 10);
    if (!isNaN(idx)) goTo(idx);
  }
});

}());
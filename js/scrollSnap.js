let animationFrameId = null;
let sections = []; // only <section> elements
let footer = null;
let scrollTargets = []; // pre-computed Y positions for all stops

const NAV_HEIGHT = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
);

function initSections() {
  sections = Array.from(document.querySelectorAll("section"));
  footer = document.querySelector("footer");

  scrollTargets = [
    ...sections.map((_, i) => i * (window.innerHeight - NAV_HEIGHT)),
    ...(footer ? [document.body.scrollHeight - window.innerHeight] : [])
  ];
}

function getCurrentIndex() {
  const scrollPos = window.scrollY;
  let closest = 0;
  let minDist = Infinity;

  scrollTargets.forEach((targetY, i) => {
    const dist = Math.abs(scrollPos - targetY);
    if (dist < minDist) {
      minDist = dist;
      closest = i;
    }
  });

  return closest;
}

function getNavHeight() {
  const nav = document.querySelector("nav");
  return nav ? nav.getBoundingClientRect().height : 0;
}

function initSections() {
  const navH = getNavHeight();
  document.documentElement.style.setProperty('--nav-height', `${navH}px`);

  sections = Array.from(document.querySelectorAll("section"));
  footer = document.querySelector("footer");

  const sectionH = window.innerHeight - navH;

  scrollTargets = [
    ...sections.map((_, i) => i * sectionH),
    ...(footer ? [document.body.scrollHeight - window.innerHeight] : [])
  ];
}

function smoothScrollTo(targetY, duration = 700) {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * easeOutCubic(progress));

    if (elapsed < duration) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      animationFrameId = null;
    }
  }

  animationFrameId = requestAnimationFrame(animate);
}

let scrollDebounceTimer = null;

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();

    clearTimeout(scrollDebounceTimer);
    scrollDebounceTimer = setTimeout(() => {
      const currentIndex = getCurrentIndex();
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(scrollTargets.length - 1, currentIndex + direction));

      smoothScrollTo(scrollTargets[nextIndex]);
    }, 50);
  },
  { passive: false }
);

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initSections, 0);
});
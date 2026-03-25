let animationFrameId = null;
let sections = [];

function initSections() {
  sections = Array.from(document.querySelectorAll("section, footer"));
}

function getCurrentSectionIndex() {
  const scrollPos = window.scrollY + 10;
  let index = 0;
  sections.forEach((section, i) => {
    if (scrollPos >= section.offsetTop - 1) index = i;
  });
  return index;
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
      const currentIndex = getCurrentSectionIndex();
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
      const targetSection = sections[nextIndex];

      if (!targetSection) return;

      const isLast = nextIndex === sections.length - 1;

      // If scrolling to the last section (footer), scroll to page bottom instead
      const targetY = isLast
        ? document.body.scrollHeight - window.innerHeight
        : targetSection.offsetTop;

      smoothScrollTo(targetY);
    }, 50);
  },
  { passive: false }
);

// Wait for nav.js to finish injecting before collecting sections
document.addEventListener("DOMContentLoaded", () => {
  // nav.js also runs on DOMContentLoaded — use setTimeout to ensure
  // it runs after nav.js's listener (listeners fire in registration order,
  // but this guarantees the footer is in the DOM)
  setTimeout(initSections, 0);
});
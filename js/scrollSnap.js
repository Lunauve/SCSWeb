let isScrolling = false;
const sections = Array.from(document.querySelectorAll("section"));

function getCurrentSectionIndex() {
  const scrollPos = window.scrollY + window.innerHeight / 2;

  let closestIndex = 0;

  sections.forEach((section, i) => {
    if (scrollPos >= section.offsetTop) {
      closestIndex = i;
    }
  });

  return closestIndex;
}

function smoothScrollTo(targetY, duration = 700) {
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
    const eased = easeOutCubic(progress);

    window.scrollTo(0, startY + diff * eased);

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    } else {
      isScrolling = false;
    }
  }

  requestAnimationFrame(animate);
}

window.addEventListener(
  "wheel",
  (e) => {
    if (isScrolling) return;

    isScrolling = true;
    e.preventDefault();

    const currentIndex = getCurrentSectionIndex();
    const direction = e.deltaY > 0 ? 1 : -1;

    let nextIndex = currentIndex + direction;

    nextIndex = Math.max(0, Math.min(sections.length - 1, nextIndex));

    const target = sections[nextIndex];

    if (target) {
      smoothScrollTo(target.offsetTop);
    } else {
      isScrolling = false;
    }
  },
  { passive: false }
);
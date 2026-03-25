let isScrolling = false;

// include footer if it exists
const sections = Array.from(document.querySelectorAll("section, footer"));

function getCurrentSectionIndex() {
  const scrollPos = window.scrollY + 10; // small offset

  let index = 0;

  sections.forEach((section, i) => {
    if (scrollPos >= section.offsetTop - 1) {
      index = i;
    }
  });

  return index;
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

    e.preventDefault();
    isScrolling = true;

    const currentIndex = getCurrentSectionIndex();

    // direction handling
    const direction = e.deltaY > 0 ? 1 : -1;

    let nextIndex = currentIndex + direction;

    // clamp bounds
    nextIndex = Math.max(0, Math.min(sections.length - 1, nextIndex));

    const targetSection = sections[nextIndex];

    if (targetSection) {
      smoothScrollTo(targetSection.offsetTop);
    } else {
      isScrolling = false;
    }
  },
  { passive: false }
);
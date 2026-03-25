/* ============================================================
   SCS USJ-R — stars.js
   Generates the twinkling star field used in the hero.
   Call initStars('stars') where 'stars' is the element id.
   ============================================================ */

function initStars(containerId, count = 70) {
  const container = document.getElementById(containerId);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'star';
    const size  = Math.random() * 2 + 0.5;
    const isGold = Math.random() > 0.7;
    dot.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `top:${Math.random() * 100}%`,
      `left:${Math.random() * 100}%`,
      `background:${isGold ? '#F5C518' : '#7DC46A'}`,
      `--d:${2 + Math.random() * 4}s`,
      `animation-delay:${Math.random() * 5}s`,
      `opacity:${0.1 + Math.random() * 0.5}`
    ].join(';');
    container.appendChild(dot);
  }
}

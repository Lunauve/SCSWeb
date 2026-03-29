/* ============================================================
   SCS USJ-R — nav.js
   Injects the shared <nav> and <footer> into every page,
   and marks the active nav link based on current filename.
   ============================================================ */

const NAV_HTML = `
<nav>
  <div class="nav-logo">
    <div class="logo-emblem">
      <img src="${BASE}/assets/SCS.png" alt="SCS Logo" style="width:38px;height:38px;object-fit:contain;">
    </div>
    <div class="logo-text">
      <span>University of San Jose – Recoletos</span>
      <span>School of Computer Studies</span>
    </div>
  </div>
  <ul class="nav-links">
    <li><a href="${BASE}/index.html"          data-page="index">Home</a></li>
    <li><a href="${BASE}/pages/programs.html" data-page="programs">Programs</a></li>
    <li><a href="${BASE}/pages/about.html"    data-page="about">About</a></li>
    <li><a href="${BASE}/pages/news.html"     data-page="news">News</a></li>
  </ul>
  <a href="${BASE}/pages/contact.html" class="nav-btn">Contact Us</a>
</nav>
<div class="divider"></div>
`;

const FOOTER_HTML = `
<div class="divider"></div>
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <div style="display:flex;gap:8px;align-items:center;">
        <img src="${BASE}/assets/USJR.png" alt="USJR Logo" style="width:46px;height:46px;object-fit:contain;">
        <img src="${BASE}/assets/SCS.png" alt="SCS Logo" style="width:44px;height:44px;object-fit:contain;">
      </div>
      <h3>School of Computer Studies</h3>
      <p>University of San Jose – Recoletos<br>Basak, Mambaling, Cebu City<br>Shaping technologists with purpose.</p>
    </div>
    <div class="footer-col">
      <h4>Programs</h4>
      <ul>
        <li><p>Undergraduate Programs</p></li>
          <ul>
            <li><a href="${BASE}/pages/programs.html">Bachelor of Science in Computer Science</a></li>
            <li><a href="${BASE}/pages/programs.html">Bachelor of Science in Information Technology</a></li>
            <li><a href="${BASE}/pages/programs.html">Bachelor of Science in Game Development</a></li>
            <li><a href="${BASE}/pages/programs.html">Bachelor of Science in Information Systems</a></li>
            <li><a href="${BASE}/pages/programs.html">Associate in Computer Technology</a></li>
          </ul>
        <li><p>Graduate Programs</p></li>
          <ul>
            <li><a href="${BASE}/pages/programs.html">Masters Degree in Information Technology</a></li>
          </ul>
      </ul>
    </div>
    <div class="footer-col">
      <h4>School</h4>
      <ul>
        <li><a href="${BASE}/pages/about.html">About SCS</a></li>
        <li><a href="${BASE}/pages/about.html">Faculty</a></li>
        <li><a href="${BASE}/pages/news.html">Announcements</a></li>
        <li><a href="${BASE}/pages/contact.html">Contact Us</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 <span class="usjr">University of San Jose – Recoletos</span> · School of Computer Studies</span>
    <span>Built with HTML · CSS · JS</span>
  </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  const page = document.body.dataset.page || 'index';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });
});
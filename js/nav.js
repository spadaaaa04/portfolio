/* ============================================================
   NAV LOADER — inject nav into all pages
   ============================================================ */
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  // Determine root prefix (projects subfolder = ../)
  const isProject = window.location.pathname.includes('/projects/');
  const root = isProject ? '../' : '';

  const navHTML = `
  <div id="cursor"></div>
  <div id="cursor-ring"></div>
  <nav>
    <a href="${root}index.html" class="nav-logo">rico<span>.</span></a>
    <ul class="nav-links">
      <li><a href="${root}index.html">Home</a></li>
      <li><a href="${root}about.html">About</a></li>
      <li><a href="${root}index.html#projects">Progetti</a></li>
      <li><a href="${root}index.html#contact" class="nav-cta">Contatti</a></li>
    </ul>
    <button class="nav-hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>`;

  document.body.insertAdjacentHTML('afterbegin', navHTML);
})();

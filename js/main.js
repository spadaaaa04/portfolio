/* ============================================================
   RICO. PORTFOLIO — MAIN JS
   Custom cursor · Nav scroll · Scroll reveal · Parallax
   ============================================================ */

(function () {
  'use strict';


/* ── Preloader ──────────────────────────────────────────── */
document.body.classList.add('is-loading');

window.addEventListener('load', () => {
  const preloader = document.getElementById('site-preloader');
  const minDelay = 1600;

  setTimeout(() => {
    if (preloader) preloader.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
  }, minDelay);
});


  /* ── Custom Cursor ──────────────────────────────────────── */
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursor && cursorRing) {
    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    function ringLoop() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top  = ry + 'px';
      raf = requestAnimationFrame(ringLoop);
    }
    ringLoop();

    // Hover state
    document.addEventListener('mouseover', e => {
      if (e.target.closest('a, button, .project-card, .skill-tag, .social-link, .hero-panel-card')) {
        document.body.classList.add('hovering');
      }
    });
    document.addEventListener('mouseout', e => {
      if (e.target.closest('a, button, .project-card, .skill-tag, .social-link, .hero-panel-card')) {
        document.body.classList.remove('hovering');
      }
    });

    document.addEventListener('mousedown', () => document.body.classList.add('clicking'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('clicking'));

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorRing.style.opacity = '';
    });
  }

  /* ── Nav scroll state ───────────────────────────────────── */
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.style.background = 'rgba(8,13,26,0.97)';
      } else {
        nav.style.background = 'rgba(8,13,26,0.88)';
      }
    }, { passive: true });
  }

  /* ── Hamburger ──────────────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ── Active nav link ────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Scroll reveal ──────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children
          const delay = entry.target.dataset.delay || 0;
          entry.target.style.transitionDelay = delay + 'ms';
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  /* ── Staggered reveal for groups ───────────────────────── */
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const children = parent.querySelectorAll('.reveal');
    children.forEach((el, i) => {
      el.dataset.delay = i * 80;
    });
  });

  /* ── Subtle parallax on hero modules ───────────────────── */
  const heroModules = document.querySelector('.hero-modules');
  if (heroModules) {
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      heroModules.style.transform = `translateY(-50%) translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

  /* ── Smooth scroll for in-page anchors ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();

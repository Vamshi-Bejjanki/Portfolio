/* ============================================================
   VAMSHI BEJJANKI PORTFOLIO — app.js
   Full-featured, production-ready JS
============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  initLoader();
  initCursor();
  initNavbar();
  initScrollReveal();
  initScrollEffects();
  initContactForm();
  initBackToTop();
  initRoleRotator();
  initThemeToggle();
});

/* ============================================================
   PAGE LOADER
============================================================ */
function initLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  window.addEventListener('load', function () {
    setTimeout(function () {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 1900);
  });

  document.body.style.overflow = 'hidden';
}

/* ============================================================
   CUSTOM CURSOR
============================================================ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;
  if (window.matchMedia('(hover: none)').matches) return;

  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function followCursor() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top = fy + 'px';
    requestAnimationFrame(followCursor);
  }
  followCursor();

  const hoverEls = document.querySelectorAll('a, button, .project-card, .cert-card, .skill-pill, .comp-card');
  hoverEls.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      cursor.classList.add('cursor-hover');
      follower.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', function () {
      cursor.classList.remove('cursor-hover');
      follower.classList.remove('cursor-hover');
    });
  });
}

/* ============================================================
   NAVBAR
============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navbar) return;

  hamburger && hamburger.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
        navMenu && navMenu.classList.remove('open');
        hamburger && hamburger.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink(navLinks);
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      hamburger && hamburger.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

function updateActiveNavLink(links) {
  const scrollY = window.scrollY + 100;
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(function (section) {
    const top = section.offsetTop;
    const height = section.clientHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      links.forEach(function (l) { l.classList.remove('active'); });
      const active = document.querySelector('.nav-link[href="#' + id + '"]');
      if (active) active.classList.add('active');
    }
  });
}

/* ============================================================
   SCROLL REVEAL
============================================================ */
function initScrollReveal() {
  const els = document.querySelectorAll('.section-reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) { observer.observe(el); });
}

/* ============================================================
   MISC SCROLL EFFECTS
============================================================ */
function initScrollEffects() {
  const orb = document.querySelector('.orb-1');
  if (!orb) return;

  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    orb.style.transform = 'translateY(' + (y * 0.15) + 'px)';
  }, { passive: true });
}

/* ============================================================
   ROLE ROTATOR
============================================================ */
function initRoleRotator() {
  const roles = document.querySelectorAll('.role-item');
  if (!roles.length) return;

  let current = 0;
  setInterval(function () {
    roles[current].classList.remove('active');
    current = (current + 1) % roles.length;
    roles[current].classList.add('active');
  }, 2500);
}

/* ============================================================
   THEME TOGGLE
============================================================ */
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  if (!btn) return;

  const saved = localStorage.getItem('theme');
  if (saved === 'light') applyTheme('light');

  btn.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    if (icon) {
      icon.className = t === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

/* ============================================================
   CONTACT FORM  — Formspree AJAX submission
   Emails land in your inbox at vamshibejjanki09@gmail.com
============================================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnLoading = document.getElementById('btnLoading');
  if (!form) return;

  /* Real-time field validation */
  const fields = ['name', 'email', 'subject', 'message'];
  fields.forEach(function (id) {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('blur', function () { validateField(id, this.value); });
    input.addEventListener('input', function () {
      if (this.classList.contains('error')) validateField(id, this.value);
    });
  });

  /* Submit */
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name    = getValue('name');
    const email   = getValue('email');
    const subject = getValue('subject');
    const message = getValue('message');

    /* Client-side validation */
    let valid = true;
    valid = validateField('name', name)    && valid;
    valid = validateField('email', email)  && valid;
    valid = validateField('subject', subject) && valid;
    valid = validateField('message', message) && valid;
    if (!valid) return;

    /* Show loading */
    setLoading(true);
    hideStatus();

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        showStatus('success', '✓ Message sent! I\'ll reply within 24 hours.');
        form.reset();
        clearAllErrors();
      } else {
        const json = await res.json().catch(function () { return {}; });
        const msg = (json.errors && json.errors.map(function (e) { return e.message; }).join(', '))
                    || 'Something went wrong. Please try emailing me directly.';
        showStatus('error', msg);
      }
    } catch (err) {
      showStatus('error', 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  });

  /* Helpers */
  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function validateField(id, value) {
    const errEl = document.getElementById(id + 'Error');
    const input = document.getElementById(id);
    let msg = '';

    if (id === 'name' && value.length < 2)
      msg = 'Name must be at least 2 characters.';
    if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      msg = 'Please enter a valid email address.';
    if (id === 'subject' && value.length < 3)
      msg = 'Subject must be at least 3 characters.';
    if (id === 'message' && value.length < 10)
      msg = 'Message must be at least 10 characters.';

    if (errEl) errEl.textContent = msg;
    if (input) {
      input.classList.toggle('error', !!msg);
    }
    return !msg;
  }

  function clearAllErrors() {
    fields.forEach(function (id) {
      const errEl = document.getElementById(id + 'Error');
      const input = document.getElementById(id);
      if (errEl) errEl.textContent = '';
      if (input) input.classList.remove('error');
    });
  }

  function setLoading(on) {
    if (submitBtn) submitBtn.disabled = on;
    if (btnText) btnText.style.display = on ? 'none' : 'inline-flex';
    if (btnLoading) btnLoading.style.display = on ? 'inline-flex' : 'none';
  }

  function showStatus(type, msg) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'form-status ' + type;
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (type === 'success') {
      setTimeout(hideStatus, 7000);
    }
  }

  function hideStatus() {
    if (!statusEl) return;
    statusEl.className = 'form-status';
    statusEl.textContent = '';
  }
}

/* ============================================================
   BACK TO TOP
============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   DEBOUNCE UTILITY
============================================================ */
function debounce(fn, wait) {
  let t;
  return function () {
    clearTimeout(t);
    t = setTimeout(fn.apply.bind(fn, this, arguments), wait);
  };
}

/* Close mobile menu on resize */
window.addEventListener('resize', debounce(function () {
  if (window.innerWidth > 768) {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    if (navMenu) navMenu.classList.remove('open');
    if (hamburger) hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }
}, 250));

/* Performance logging (dev only) */
if ('performance' in window) {
  window.addEventListener('load', function () {
    setTimeout(function () {
      const nav = performance.getEntriesByType('navigation')[0];
      if (nav) console.log('Page loaded in', Math.round(nav.loadEventEnd - nav.loadEventStart), 'ms');
    }, 0);
  });
}
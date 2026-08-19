// 8P Gestão & Negócios — interações do site

(function () {
  // ---------- Menu mobile ----------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const scrim = document.querySelector('.nav-scrim');

  function closeNav() {
    nav.classList.remove('open');
    scrim.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('open');
      scrim.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    });
    scrim.addEventListener('click', closeNav);
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeNav);
    });
  }

  // ---------- Header shrink on scroll ----------
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // ---------- Animated counters ----------
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const counters = document.querySelectorAll('.counter');
  if ('IntersectionObserver' in window) {
    const cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.dataset.target; });
  }

  // ---------- Active nav link ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  if ('IntersectionObserver' in window && sections.length) {
    const sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { sio.observe(s); });
  }

  // ---------- Máscara de telefone ----------
  const telefoneInput = document.getElementById('f-telefone');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function () {
      const digits = telefoneInput.value.replace(/\D/g, '').slice(0, 11);
      let masked = digits;
      if (digits.length > 10) {
        masked = digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      } else if (digits.length > 6) {
        masked = digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (digits.length > 2) {
        masked = digits.replace(/(\d{2})(\d{0,4})/, '($1) $2');
      } else if (digits.length > 0) {
        masked = digits.replace(/(\d{0,2})/, '($1');
      }
      telefoneInput.value = masked.replace(/-$/, '');
    });
  }

  // ---------- Formulário ----------
  // Envia direto para o WhatsApp da 8P com os dados preenchidos.
  const form = document.getElementById('visitForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const success = document.querySelector('.form-success');
      const error = document.querySelector('.form-error');
      success.classList.remove('show');
      error.classList.remove('show');

      const data = new FormData(form);
      let msg = 'Olá! Gostaria de solicitar uma visita da 8P.%0A';
      msg += '*Nome:* ' + encodeURIComponent(data.get('nome') || '') + '%0A';
      msg += '*Empresa:* ' + encodeURIComponent(data.get('empresa') || '') + '%0A';
      msg += '*Cargo:* ' + encodeURIComponent(data.get('cargo') || '') + '%0A';
      msg += '*Telefone:* ' + encodeURIComponent(data.get('telefone') || '') + '%0A';
      msg += '*E-mail:* ' + encodeURIComponent(data.get('email') || '') + '%0A';
      msg += '*Segmento:* ' + encodeURIComponent(data.get('segmento') || '') + '%0A';
      msg += '*Necessidade:* ' + encodeURIComponent(data.get('necessidade') || '') + '%0A';
      msg += '*Mensagem:* ' + encodeURIComponent(data.get('mensagem') || '');
      const win = window.open('https://wa.me/5511994733883?text=' + msg, '_blank');
      if (!win) {
        error.classList.add('show');
        error.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      success.classList.add('show');
      form.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Meta Pixel: fbq('track', 'Lead');
      // GA4: gtag('event', 'generate_lead');
    });
  }

  // ---------- Ano no rodapé ----------
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

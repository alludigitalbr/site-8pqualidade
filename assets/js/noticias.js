(function () {
  var search = document.getElementById('newsSearch');
  var catButtons = document.querySelectorAll('.news-cat');
  var grid = document.getElementById('newsGrid');
  var empty = document.getElementById('newsEmpty');
  var activeCat = 'todas';

  function applyFilters() {
    if (!grid) return;
    var term = (search && search.value || '').trim().toLowerCase();
    var visibleCount = 0;
    var cards = grid.querySelectorAll('.news-card');
    cards.forEach(function (card) {
      var matchesCat = activeCat === 'todas' || card.getAttribute('data-cat') === activeCat;
      var matchesSearch = !term || (card.getAttribute('data-search') || '').indexOf(term) !== -1;
      var show = matchesCat && matchesSearch;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });
    if (empty) empty.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  if (search) search.addEventListener('input', applyFilters);

  catButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      catButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      activeCat = btn.getAttribute('data-cat');
      applyFilters();
      var target = document.getElementById('ultimas');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ---------- Newsletter (Brevo) ----------
  var form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';
      var success = form.parentElement.querySelector('.form-success');
      var error = form.parentElement.querySelector('.form-error');
      if (action.indexOf('BREVO_FORM_URL_AQUI') !== -1) {
        e.preventDefault();
        if (error) {
          error.textContent = 'Inscrição ainda não configurada. Fale com a 8P pelo WhatsApp para receber novidades.';
          error.classList.add('show');
        }
        return;
      }
      if (success) success.classList.remove('show');
      if (error) error.classList.remove('show');
      // Envio segue normalmente para o formulário da Brevo (action já configurado).
    });
  }
})();

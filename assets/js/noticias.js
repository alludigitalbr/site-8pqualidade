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
  // Envio via fetch (no-cors) para manter o visitante no site em vez de
  // redirecionar para a página de resposta da Brevo. Como "no-cors" não
  // permite ler a resposta, o sucesso é otimista (o POST chega à Brevo
  // normalmente; erros de rede ainda caem no catch).
  var form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var action = form.getAttribute('action');
      var success = form.parentElement.querySelector('.form-success');
      var error = form.parentElement.querySelector('.form-error');
      var btn = form.querySelector('button[type="submit"]');
      if (success) success.classList.remove('show');
      if (error) error.classList.remove('show');
      btn.disabled = true;
      fetch(action, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(form)
      }).then(function () {
        if (success) success.classList.add('show');
        form.reset();
      }).catch(function () {
        if (error) error.classList.add('show');
      }).finally(function () {
        btn.disabled = false;
      });
    });
  }
})();

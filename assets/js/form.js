document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var button = form.querySelector('button[type="submit"]');
  var fallback = 'Sorry, the message could not be sent. Please email shivanigupta4876@gmail.com or call +91 97204 66504.';
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    button.disabled = true;
    status.textContent = 'Sending...';
    fetch(form.dataset.endpoint, { method: 'POST', body: new FormData(form) })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (!d.ok) throw new Error();
        status.textContent = d.message;
        form.reset();
      })
      .catch(function () { status.textContent = fallback; })
      .finally(function () { button.disabled = false; });
  });
});

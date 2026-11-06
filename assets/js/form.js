document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var whatsappNumber = '919720466504';
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var data = new FormData(form);
    if (data.get('company_website')) return;
    var text = 'New enquiry from the website\n\n' +
      'Name: ' + data.get('name') + '\n' +
      'Email: ' + data.get('email') + '\n' +
      'Phone: ' + (data.get('phone') || 'Not given') + '\n' +
      'Service: ' + (data.get('service') || 'Not given') + '\n\n' +
      data.get('message');
    var url = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(text);
    var link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Open WhatsApp';
    status.textContent = 'Almost done: press Send in WhatsApp to reach Shivani. Not opened? ';
    status.appendChild(link);
    window.open(url, '_blank', 'noopener');
  });
});

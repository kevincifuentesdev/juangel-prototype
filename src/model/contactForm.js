// filepath: /home/kevin/juangel/src/model/contactForm.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    const name = form.querySelector('input[type="text"]');
    if (!name.value.trim()) {
      showError(name, 'El nombre es obligatorio.');
      valid = false;
    }

    const email = form.querySelector('input[type="email"]');
    if (!email.value.trim()) {
      showError(email, 'El correo es obligatorio.');
      valid = false;
    } else if (!emailRegex.test(email.value)) {
      showError(email, 'Ingresa un correo válido.');
      valid = false;
    }

    const message = form.querySelector('textarea');
    if (!message.value.trim()) {
      showError(message, 'El mensaje no puede estar vacío.');
      valid = false;
    }

    if (valid) {
      form.submit();
    }
  });

  function showError(el, msg) {
    const p = document.createElement('p');
    p.className = 'text-red-600 text-sm mt-1';
    p.textContent = msg;
    el.insertAdjacentElement('afterend', p);
  }

  function clearErrors() {
    form.querySelectorAll('p.text-red-600').forEach(node => node.remove());
  }
});
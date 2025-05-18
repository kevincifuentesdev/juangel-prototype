document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    const email = form.querySelector('input[type="email"]');
    if (!email.value.trim()) {
      showError(email, 'El correo es obligatorio.');
      valid = false;
    } else if (!emailRegex.test(email.value)) {
      showError(email, 'Ingresa un correo válido.');
      valid = false;
    }

    const pwd = form.querySelector('input[type="password"]');
    if (!pwd.value) {
      showError(pwd, 'La contraseña es obligatoria.');
      valid = false;
    }

    if (valid) {
      // simular login y redirigir a inicio
      localStorage.setItem('loggedIn', 'true');
      window.location.href = 'index.html';
    }
  });

  function showError(input, msg) {
    const err = document.createElement('p');
    err.className = 'text-red-600 text-sm mt-1';
    err.textContent = msg;
    input.insertAdjacentElement('afterend', err);
  }

  function clearErrors() {
    form.querySelectorAll('p.text-red-600').forEach(el => el.remove());
  }
});

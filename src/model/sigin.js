document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('siginForm');
  const config = {
    password: {
      regex: /^(?=.*[A-Z])(?=(.*\d){2,})(?=.*[@_\-\.\/\*]).{8,}$/,
      message:
        'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 2 números y 1 carácter especial (@ _ - . / *).'
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Ingresa un correo válido.'
    }
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearAllErrors();
    let valid = true;

    // Nombre
    const name = form.querySelector('input[type="text"]');
    if (!name.value.trim()) {
      showError(name, 'El nombre es obligatorio.');
      valid = false;
    }

    // Email
    const email = form.querySelector('input[type="email"]');
    if (!email.value.trim()) {
      showError(email, 'El correo es obligatorio.');
      valid = false;
    } else if (!config.email.regex.test(email.value)) {
      showError(email, config.email.message);
      valid = false;
    }

    // Fecha de nacimiento
    const date = form.querySelector('input[type="date"]');
    if (!date.value) {
      showError(date, 'Selecciona tu fecha de nacimiento.');
      valid = false;
    } else {
      const birth = new Date(date.value);
      const age = Math.floor((Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
      if (age < 18) {
        showError(date, 'Debes ser mayor de 18 años.');
        valid = false;
      }
    }

    // Contraseña
    const pwd = form.querySelector('input[type="password"]');
    if (!pwd.value) {
      showError(pwd, 'La contraseña es obligatoria.');
      valid = false;
    } else if (!config.password.regex.test(pwd.value)) {
      showError(pwd, config.password.message);
      valid = false;
    }

    if (valid) {
      // simular registro y redirigir a login
      window.location.href = 'login.html';
    }
  });

  function showError(input, msg) {
    const err = document.createElement('p');
    err.className = 'text-red-600 text-sm mt-1';
    err.textContent = msg;
    input.insertAdjacentElement('afterend', err);
  }

  function clearAllErrors() {
    form.querySelectorAll('p.text-red-600').forEach(el => el.remove());
  }
});

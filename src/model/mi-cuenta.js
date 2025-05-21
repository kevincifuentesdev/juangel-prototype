document.addEventListener('DOMContentLoaded', () => {
  const form    = document.getElementById('profileForm');
  const inputs  = Array.from(form.querySelectorAll('input, select'));
  const photoIn = document.getElementById('photoInput');
  const pic     = document.getElementById('profilePic');
  const btnEdit = document.getElementById('editProfileBtn');
  const btnSave = document.getElementById('saveProfileBtn');
  const btnCan  = document.getElementById('cancelEditBtn');
  const photoLabel   = document.getElementById('photoLabel');
  const photoOverlay = document.getElementById('photoOverlay');
  let original = {};

  // guardar valores iniciales
  function cacheValues() {
    original = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      nit: form.nit.value,
      role: form.role.value,
      birthDate: form.birthDate.value,
      address: form.address.value,
      photoSrc: pic.src
    };
  }
  cacheValues();

  // habilitar/deshabilitar
  function toggleEditable(enable) {
    inputs.forEach(i => i.disabled = !enable);
    if (enable) {
      photoIn.classList.remove('hidden');
      photoLabel.classList.remove('pointer-events-none');
      photoLabel.classList.add('cursor-pointer');
      btnSave.disabled = false;           // habilita botón Guardar
      btnSave.classList.remove('hidden');
      btnCan.classList.remove('hidden');
      btnEdit.classList.add('hidden');
    } else {
      photoIn.classList.add('hidden');
      photoLabel.classList.add('pointer-events-none');
      photoLabel.classList.remove('cursor-pointer');
      btnSave.disabled = true;            // deshabilita botón Guardar
      btnSave.classList.add('hidden');
      btnCan.classList.add('hidden');
      btnEdit.classList.remove('hidden');
    }
  }

  // borra errores previos
  function clearAllErrors() {
    form.querySelectorAll('p.text-red-600').forEach(el => el.remove());
  }
  // muestra mensaje de error junto al campo
  function showError(input, msg) {
    const p = document.createElement('p');
    p.className = 'text-red-600 text-sm mt-1';
    p.textContent = msg;
    input.insertAdjacentElement('afterend', p);
  }
  // valida todos los campos obligatorios
  function validateForm() {
    clearAllErrors();
    let valid = true;
    // Nombre
    if (!form.name.value.trim()) { showError(form.name, 'Nombre completo obligatorio'); valid = false; }
    // Email
    const email = form.email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) { showError(form.email, 'Correo obligatorio'); valid = false; }
    else if (!emailRegex.test(email)) { showError(form.email, 'Formato de correo inválido'); valid = false; }
    // Contraseña
    const pwd = form.password.value;
    const pwdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=(.*\d){3,})(?=.*[@_\-\.\/\*]).{8,}$/;
    if (!pwd) { showError(form.password, 'Contraseña obligatoria'); valid = false; }
    else if (!pwdRegex.test(pwd)) {
      showError(form.password,
        'Contraseña debe tener ≥8 caracteres, 1 mayúscula, minúsculas, ≥3 números y 1 carácter especial'
      );
      valid = false;
    }
    // NIT
    if (!form.nit.value.trim()) { showError(form.nit, 'NIT obligatorio'); valid = false; }
    // Tipo de usuario
    if (!form.role.value) { showError(form.role, 'Tipo de usuario obligatorio'); valid = false; }
    // Fecha de nacimiento
    if (!form.birthDate.value) { showError(form.birthDate, 'Fecha de nacimiento obligatoria'); valid = false; }
    else {
      const age = Math.floor((Date.now() - new Date(form.birthDate.value).getTime())/(1000*60*60*24*365.25));
      if (age < 18) { showError(form.birthDate, 'Debes ser mayor de 18 años'); valid = false; }
    }
    // Dirección
    if (!form.address.value.trim()) { showError(form.address, 'Dirección obligatoria'); valid = false; }
    return valid;
  }

  btnEdit.addEventListener('click', () => toggleEditable(true));

  btnCan.addEventListener('click', () => {
    // restaurar valores
    form.name.value      = original.name;
    form.email.value     = original.email;
    form.password.value  = original.password;
    form.nit.value       = original.nit;
    form.role.value      = original.role;
    form.birthDate.value = original.birthDate;
    form.address.value   = original.address;
    pic.src              = original.photoSrc;
    toggleEditable(false);
  });

  btnSave.addEventListener('click', () => {
    if (!validateForm()) return;
    cacheValues();
    toggleEditable(false);
    alert('Información guardada con éxito');
  });

  // vista previa de foto
  photoIn.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) pic.src = URL.createObjectURL(file);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const btn        = document.getElementById('chatbotBtn');
  const overlay    = document.getElementById('chatOverlay');
  const panel      = document.getElementById('chatPanel');
  const closeBtn   = document.getElementById('chatClose');
  const form       = document.getElementById('chatbotForm');
  const nameInput  = form.elements.chatName;
  const emailInput = form.elements.chatEmail;
  const tncInput   = form.elements.acceptTnC;
  const privInput  = form.elements.acceptPrivacy;
  const dataInput  = form.elements.acceptData;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function openChat() {
    overlay.classList.remove('hidden');
    panel.classList.remove('translate-y-full');
  }
  function closeChat() {
    panel.classList.add('translate-y-full');
    overlay.classList.add('hidden');
  }

  btn.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);
  overlay.addEventListener('click', closeChat);

  function clearErrors() {
    form.querySelectorAll('p.text-red-600').forEach(el => el.remove());
  }
  function showError(input, msg) {
    const p = document.createElement('p');
    p.className = 'text-red-600 text-sm mt-1';
    p.textContent = msg;
    input.insertAdjacentElement('afterend', p);
  }

  function validate() {
    clearErrors();
    let ok = true;
    // Nombre
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Por favor ingresa tu nombre');
      ok = false;
    }
    // Email
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      showError(emailInput, 'Por favor ingresa tu correo');
      ok = false;
    } else if (!emailRegex.test(emailVal)) {
      showError(emailInput, 'Formato de correo inválido');
      ok = false;
    }
    // Checkboxes
    if (!tncInput.checked)   { showError(tncInput, 'Requerido'); ok = false; }
    if (!privInput.checked)  { showError(privInput,'Requerido'); ok = false; }
    if (!dataInput.checked)  { showError(dataInput,'Requerido'); ok = false; }
    return ok;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validate()) return;
    // iniciar chat real...
    alert('Datos validados. Iniciando chat...');
    closeChat();
  });
});

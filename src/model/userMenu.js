document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.getElementById('userMenuBtn');
  const menu = document.getElementById('userMenu');
  if (!btn || !menu) return;

  function buildMenu() {
    const logged = localStorage.getItem('loggedIn') === 'true';
    menu.innerHTML = logged
      ? `
        <a href="mi-cuenta.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Mi Perfil</a>
        <a href="mis-pedidos.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Mis Pedidos</a>
        <div class="border-t my-1"></div>
        <button id="logoutBtn" class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Cerrar sesión</button>
      `
      : `
        <a href="login.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Iniciar Sesión</a>
        <a href="sigin.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Registrarse</a>
      `;
    const logout = document.getElementById('logoutBtn');
    if (logout) {
      logout.addEventListener('click', () => {
        // quitar flag y ocultar menú
        localStorage.removeItem('loggedIn');
        menu.classList.add('hidden');
        showLogoutModal();
      });
    }
  }

  btn.addEventListener('click', e => {
    e.stopPropagation();
    buildMenu();
    menu.classList.toggle('hidden');
  });

  document.addEventListener('click', () => {
    if (!menu.classList.contains('hidden')) {
      menu.classList.add('hidden');
    }
  });

  buildMenu();

  function showLogoutModal() {
    // overlay y modal
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    overlay.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs mx-4">
        <p class="mb-4 text-gray-800">Has cerrado sesión.<br/>Serás redirigido a la página principal.</p>
        <button id="logoutModalBtn" class="bg-red-600 text-white px-4 py-2 rounded">Está bien</button>
      </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('logoutModalBtn')
      .addEventListener('click', () => window.location.href = 'index.html');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('[data-carousel]');
  const items = Array.from(track.children);
  const prev = document.getElementById('carouselPrev');
  const next = document.getElementById('carouselNext');
  let index = 0;
  
  function update() {
    const width = items[0].clientWidth;
    track.style.transform = `translateX(${-index * width}px)`;
  }
  prev.addEventListener('click', () => {
    index = (index - 1 + items.length) % items.length;
    update();
  });
  next.addEventListener('click', () => {
    index = (index + 1) % items.length;
    update();
  });

  // botones flotantes
  document.getElementById('chatbotBtn').addEventListener('click', () => {
    console.log('Chat Bot clickeado');
    // TODO: integrar chatbot
  });
  document.getElementById('whatsappBtn').addEventListener('click', () => {
    console.log('WhatsApp clickeado');
    // TODO: integrar WhatsApp
  });

  // MENÚ HAMBURGUESA
  const mobileBtn   = document.getElementById('mobileMenuBtn');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileMenuClose');
  const mobileList  = document.getElementById('mobileMenuList');

  // construir ítems del menú móvil según sesión
  function buildMobileMenuItems() {
    const logged = localStorage.getItem('loggedIn') === 'true';
    const staticLinks = `
      <li><a href="index.html" class="block px-4 py-2 text-gray-700 hover:text-blue-600">Inicio</a></li>
      <li><a href="tienda.html" class="block px-4 py-2 text-gray-700 hover:text-blue-600">Tienda Virtual</a></li>
      <li><a href="quienes-somos.html" class="block px-4 py-2 text-gray-700 hover:text-blue-600">Quiénes Somos</a></li>
      <li><a href="contacto.html" class="block px-4 py-2 text-gray-700 hover:text-blue-600">Contacto</a></li>
      <hr class="border-gray-200 my-2"/>
    `;
    if (logged) {
      mobileList.innerHTML = staticLinks + `
        <li><a href="mi-cuenta.html" class="block px-4 py-2 text-gray-700 hover:text-blue-600">Mi Perfil</a></li>
        <li><a href="mis-pedidos.html" class="block px-4 py-2 text-gray-700 hover:text-blue-600">Mis Pedidos</a></li>
        <li><button id="logoutMobile" class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Cerrar sesión</button></li>
      `;
      document.getElementById('logoutMobile')
        .addEventListener('click', () => {
          localStorage.removeItem('loggedIn');
          window.location.href = 'index.html';
        });
    } else {
      mobileList.innerHTML = staticLinks + `
        <li><a href="login.html" class="block px-4 py-2 text-gray-700 hover:text-blue-600">Iniciar Sesión</a></li>
        <li><a href="sigin.html" class="block px-4 py-2 text-gray-700 hover:text-blue-600">Registrarse</a></li>
      `;
    }
  }

  function openMobileMenu() {
    mobileMenu.classList.remove('-translate-x-full');
    buildMobileMenuItems();
  }
  function closeMobileMenu() {
    mobileMenu.classList.add('-translate-x-full');
  }

  mobileBtn?.addEventListener('click', openMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);
  document.addEventListener('click', e => {
    if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
      closeMobileMenu();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1,  title: 'Producto 1',  price: 50000 },
    { id: 2,  title: 'Producto 2',  price: 60000 },
    { id: 3,  title: 'Producto 3',  price: 55000 },
    { id: 4,  title: 'Producto 4',  price: 65000 },
    { id: 5,  title: 'Producto 5',  price: 70000 },
    { id: 6,  title: 'Producto 6',  price: 52000 },
    { id: 7,  title: 'Producto 7',  price: 58000 },
    { id: 8,  title: 'Producto 8',  price: 62000 },
    { id: 9,  title: 'Producto 9',  price: 53000 },
    { id: 10, title: 'Producto 10', price: 64000 },
    { id: 11, title: 'Producto 11', price: 71000 },
    { id: 12, title: 'Producto 12', price: 48000 },
    { id: 13, title: 'Producto 13', price: 59000 },
    { id: 14, title: 'Producto 14', price: 66000 },
    { id: 15, title: 'Producto 15', price: 72000 },
    { id: 16, title: 'Producto 16', price: 51000 },
    { id: 17, title: 'Producto 17', price: 63000 },
    { id: 18, title: 'Producto 18', price: 68000 },
    { id: 19, title: 'Producto 19', price: 54000 },
    { id: 20, title: 'Producto 20', price: 75000 }
  ];
  const listEl   = document.getElementById('productList');
  const searchEl = document.getElementById('searchInput');
  const cart     = {};

  const sidebar     = document.getElementById('cartSidebar');
  const cartItemsEl = document.getElementById('cartItems');
  const cartEmptyEl = document.getElementById('cartEmpty');
  const cartCount   = document.getElementById('cartCount');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const overlay = document.getElementById('cartOverlay');

  function render(productsToRender) {
    listEl.innerHTML = '';
    productsToRender.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = 'bg-white p-4 rounded-lg shadow text-center border transition transform hover:shadow-lg hover:scale-105';
      const imgSrc = idx % 2 === 0
        ? '../../media/images/product_image_1.jpg'
        : '../../media/images/product_image.jpg';
      card.innerHTML = `
        <a href="producto.html?product=${p.id}">
          <img src="${imgSrc}" alt="${p.title}"
               class="w-full h-40 object-cover mb-4 rounded transition-opacity hover:opacity-90"/>
        </a>
        <h3 class="font-semibold mb-1">${p.title}</h3>
        <p class="text-gray-600 mb-4">$${p.price.toLocaleString()} COP</p>
        <button data-id="${p.id}" class="addCart inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <span>Agregar al carrito</span>
          <img src="../../media/icons/add-shopping-cart-32.png" alt="Carrito" class="w-5 h-5 ml-2"/>
        </button>
      `;
      listEl.appendChild(card);
    });
    // vincular eventos
    document.querySelectorAll('.addCart').forEach(btn =>
      btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.id))));
  }

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    renderCart();
  }

  function updateQty(id, qty) {
    if (qty < 1) delete cart[id];
    else cart[id] = qty;
    renderCart();
  }

  function renderCart() {
    cartItemsEl.innerHTML = '';
    const ids = Object.keys(cart);
    // mostrar/ocultar mensaje de carrito vacío
    if (!ids.length) {
      cartEmptyEl.style.display = 'block';
      checkoutBtn.disabled = true;
    } else {
      cartEmptyEl.style.display = 'none';
      checkoutBtn.disabled = false;
    }
    // actualizar ambos contadores
    const totalCount = ids.reduce((sum, i) => sum + cart[i], 0);
    document.querySelectorAll('#cartCount').forEach(el => el.textContent = totalCount);

    ids.forEach(i => {
      const p = products.find(x => x.id === +i);
      const qty = cart[i];
      const item = document.createElement('div');
      item.className = 'flex items-center justify-between mb-4';
      item.innerHTML = `
        <img src="../../media/images/product_image.jpg" alt="${p.title}" class="w-12 h-12 object-cover rounded"/>
        <div class="flex-1 mx-2">
          <h4 class="font-medium">${p.title}</h4>
          <p class="text-sm text-gray-600">$${p.price.toLocaleString()} COP</p>
        </div>
        <div class="flex items-center space-x-1">
          <button data-id="${i}" data-action="dec" class="px-2 bg-gray-200 rounded">-</button>
          <span>${qty}</span>
          <button data-id="${i}" data-action="inc" class="px-2 bg-gray-200 rounded">+</button>
        </div>
        <button data-id="${i}" class="removeCart ml-2">
          <img src="../../media/icons/icons8-trash-can.svg" alt="Eliminar" class="w-5 h-5"/>
        </button>
      `;
      cartItemsEl.appendChild(item);
    });
    // eventos de qty y eliminación
    cartItemsEl.querySelectorAll('button[data-action]').forEach(btn =>
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (btn.dataset.action === 'inc') updateQty(id, cart[id] + 1);
        else updateQty(id, cart[id] - 1);
      }));
    cartItemsEl.querySelectorAll('.removeCart').forEach(btn =>
      btn.addEventListener('click', () => updateQty(btn.dataset.id, 0)));
  }

  searchEl.addEventListener('input', () => {
    const term = searchEl.value.trim().toLowerCase();
    render(products.filter(p => p.title.toLowerCase().includes(term)));
  });

  render(products);

  // toggle carrito lateral
  document.getElementById('cartToggle').addEventListener('click', () => {
    sidebar.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');
  });
  document.getElementById('cartClose').addEventListener('click', () => {
    sidebar.classList.add('translate-x-full');
    overlay.classList.add('hidden');
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.add('translate-x-full');
    overlay.classList.add('hidden');
  });
});

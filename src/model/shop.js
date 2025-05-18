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
  const listEl = document.getElementById('productList');
  const searchEl = document.getElementById('searchInput');

  function render(items) {
    listEl.innerHTML = '';
    items.forEach(p => {
      const card = document.createElement('div');
      card.className = 'bg-white p-4 rounded-lg shadow text-center border';
      card.innerHTML = `
        <a href="producto.html?product=${p.id}">
          <img src="../../media/images/product_image.jpg" alt="${p.title}" class="w-full h-40 object-cover mb-4 rounded"/>
        </a>
        <h3 class="font-semibold mb-1">${p.title}</h3>
        <p class="text-gray-600 mb-4">$${p.price.toLocaleString()} COP</p>
        <button class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <span>Agregar al carrito</span>
          <img src="../../media/icons/add-shopping-cart-32.png" alt="Carrito" class="w-5 h-5 ml-2"/>
        </button>
      `;
      listEl.appendChild(card);
    });
  }

  searchEl.addEventListener('input', () => {
    const term = searchEl.value.trim().toLowerCase();
    render(products.filter(p => p.title.toLowerCase().includes(term)));
  });

  // render inicial
  render(products);
});

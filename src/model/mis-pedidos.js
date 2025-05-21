document.addEventListener('DOMContentLoaded', () => {
  const orders = [
    { id: 'A001', date: '2024-05-01', status: 'Enviado', items: 3 },
    { id: 'A002', date: '2024-05-10', status: 'Procesando', items: 1 },
    { id: 'A003', date: '2024-06-02', status: 'Entregado', items: 5 }
    // ...más pedidos...
  ];
  const listEl = document.getElementById('orderList');
  orders.forEach(o => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded-lg shadow hover:shadow-lg transition';
    card.innerHTML = `
      <p class="text-sm text-gray-600">Fecha: ${o.date}</p>
      <p class="font-semibold text-gray-800">Pedido #${o.id}</p>
      <p class="text-gray-700">Productos: ${o.items}</p>
      <p class="mt-1">
        <span class="px-2 py-1 text-xs rounded ${o.status==='Entregado'? 'bg-green-100 text-green-800' 
          : o.status==='Enviado'? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}">
          ${o.status}
        </span>
      </p>
      <a href="pedido.html?order=${o.id}"
         class="mt-4 inline-block text-blue-600 hover:underline">
        Ver detalles →
      </a>
    `;
    listEl.appendChild(card);
  });
});

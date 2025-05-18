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
});

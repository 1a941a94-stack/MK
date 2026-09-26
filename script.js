const buttons = document.querySelectorAll('#gameOptions button');
const result = document.querySelector('#gameResult strong');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    result.textContent = button.dataset.answer;
  });
});

const form = document.getElementById('requestForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = 'Заявка заполнена. Канал отправки подключим отдельно.';
});

const cards = document.querySelectorAll('.route-card');
cards.forEach(card => {
  card.addEventListener('pointermove', event => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    card.style.transform = `perspective(900px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = 'none';
  });
});
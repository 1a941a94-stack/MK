const form = document.getElementById('requestForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = 'Форма готова. Для отправки заявок нужно подключить контакт организатора или CRM.';
});
const provoke = document.getElementById('provocationBtn');
const answer = document.getElementById('provocationAnswer');
if (provoke && answer) {
  provoke.addEventListener('click', () => {
    const open = answer.classList.toggle('open');
    provoke.querySelector('span').textContent = open ? '−' : '+';
  });
}

const buttons = document.querySelectorAll('#gameOptions button');
const result = document.querySelector('#gameResult strong');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    if (result) result.textContent = button.dataset.answer;
  });
});

const form = document.getElementById('requestForm');
const status = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'Форма заполнена. Подключение канала приёма заявок — следующий технический шаг.';
  });
}

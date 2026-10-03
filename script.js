const provoke = document.getElementById('provocationBtn');
const answer = document.getElementById('provocationAnswer');
if (provoke && answer) {
  provoke.addEventListener('click', () => {
    const open = answer.classList.toggle('open');
    provoke.querySelector('span').textContent = open ? '−' : '+';
  });
}

const stateField = document.getElementById('gameOptions');
const buttons = document.querySelectorAll('#gameOptions button');
const result = document.querySelector('#gameResult strong');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    stateField?.classList.add('has-choice');
    if (result) result.textContent = button.dataset.answer;
  });
});

const screens = [...document.querySelectorAll('[data-screen]')];
const currentEl = document.getElementById('progressCurrent');
const fillEl = document.getElementById('progressFill');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      const n = Number(entry.target.dataset.screen || 1);
      if (currentEl) currentEl.textContent = String(n).padStart(2, '0');
      if (fillEl) fillEl.style.width = ((n / 7) * 100) + '%';
    }
  });
}, { threshold: 0.46 });

screens.forEach(screen => observer.observe(screen));
if (screens[0]) screens[0].classList.add('is-visible');

const form = document.getElementById('requestForm');
const status = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submit = form.querySelector('button[type="submit"]');
    const original = submit.innerHTML;
    submit.disabled = true;
    submit.textContent = 'Отправляем…';
    status.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error('send_failed');

      status.textContent = 'Заявка отправлена. Мы свяжемся с вами.';
      form.reset();
    } catch (error) {
      status.textContent = 'Не удалось отправить заявку. Попробуйте ещё раз.';
    } finally {
      submit.disabled = false;
      submit.innerHTML = original;
    }
  });
}

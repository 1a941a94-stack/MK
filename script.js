const modal = document.getElementById('leadModal');
const form = document.getElementById('leadForm');
const toast = document.getElementById('toast');

document.querySelectorAll('[data-open-form]').forEach(btn => btn.addEventListener('click', () => modal.showModal()));
document.querySelector('[data-close-form]').addEventListener('click', () => modal.close());
modal.addEventListener('click', (e) => {
  const box = modal.getBoundingClientRect();
  if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) modal.close();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const leads = JSON.parse(localStorage.getItem('masterKrasnoyarskLeads') || '[]');
  leads.push({...data, createdAt: new Date().toISOString()});
  localStorage.setItem('masterKrasnoyarskLeads', JSON.stringify(leads));
  form.reset();
  modal.close();
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4300);
});

const io = new IntersectionObserver((entries) => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.animate([{opacity:0, transform:'translateY(28px)'},{opacity:1, transform:'translateY(0)'}], {duration:720, easing:'cubic-bezier(.2,.8,.2,1)', fill:'both'});
    io.unobserve(entry.target);
  }
}), {threshold:.12});

document.querySelectorAll('.concept-row,.trainer-card,.statement-grid,.eligibility-grid,.cta-inner').forEach(el => io.observe(el));
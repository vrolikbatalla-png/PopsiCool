/* ====== PopsiCool – scripts ====== */

// Contadores animados (home) – deja esto igual
function animateCounter(el){
  const target = +el.dataset.target || 0;
  const dur = 1200;
  const start = performance.now();
  function step(t){
    const p = Math.min(1, (t - start)/dur);
    el.textContent = Math.floor(p * target).toLocaleString();
    if(p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initCounters(){
  const nums = document.querySelectorAll('.num[data-target]');
  if (!nums.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        io.unobserve(entry.target); // anima una sola vez
      }
    });
  }, { threshold: 0.1 }); // con 10% basta

  nums.forEach(n => io.observe(n));
}

// === Acordeón independiente (múltiples abiertos) ===
document.addEventListener('click', (ev) => {
  const btn = ev.target.closest('.acc-btn');
  if (!btn) return;
  ev.preventDefault();

  const item = btn.closest('.acc-item');
  if (!item) return;

  item.classList.toggle('open'); // no cierra a los demás
});

document.addEventListener('DOMContentLoaded', ()=>{
  initCounters();
});




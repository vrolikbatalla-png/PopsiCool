// ====== PopsiCool – scripts (versión robusta) ======

// --- Contadores animados ---
function animateCounter(el){
  // Limpia el valor: permite "1,200", " 85 ", etc.
  const raw = (el.getAttribute('data-target') || '0').toString().replace(/[^\d.-]/g, '');
  const target = Number(raw) || 0;

  const dur = 1200;
  const start = performance.now();

  function step(t){
    const p = Math.min(1, (t - start) / dur);
    el.textContent = Math.floor(p * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function animateAllNow(){
  document.querySelectorAll('.num[data-target]').forEach(animateCounter);
}

function initCounters(){
  const nums = document.querySelectorAll('.num[data-target]');
  if (!nums.length) return;

  // 1) Intenta con IntersectionObserver
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          animateCounter(entry.target);
          io.unobserve(entry.target);
          entry.target.dataset._done = '1';
        }
      });
    }, { threshold: 0.1 });

    nums.forEach(n => io.observe(n));

    // 2) Fallback por si IO no dispara en 1s
    setTimeout(() => {
      nums.forEach(n => {
        if (!n.dataset._done){
          n.dataset._done = '1';
          animateCounter(n);
        }
      });
    }, 1000);
  } else {
    // 3) Navegadores sin IO
    animateAllNow();
  }
}

// --- Acordeón independiente (múltiples abiertos) ---
document.addEventListener('click', (ev) => {
  const btn = ev.target.closest('.acc-btn');
  if (!btn) return;
  ev.preventDefault();
  const item = btn.closest('.acc-item');
  if (!item) return;
  item.classList.toggle('open');
});

// Arranque
document.addEventListener('DOMContentLoaded', () => {
  initCounters();
});

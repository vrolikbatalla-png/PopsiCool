<script>
// ====== PopsiCool – scripts ======

// --- Contadores animados (robusto) ---
function animateCounter(el){
  // Limpia lo que venga en data-target: "1,200", " 85 ", etc.
  const raw = (el.getAttribute('data-target') || '0').toString().replace(/[^\d.-]/g, '');
  const target = Number(raw) || 0;

  const dur = 1200;
  const start = performance.now();

  function step(t){
    const p = Math.min(1, (t - start)/dur);
    el.textContent = Math.floor(p * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initCounters(){
  const nums = document.querySelectorAll('.num[data-target]');
  if (!nums.length) return;

  // Si IntersectionObserver existe, úsalo; si no, plan B.
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    nums.forEach(n => io.observe(n));

    // Plan C de seguridad: si en 1s no pasó por viewport, animar igual
    setTimeout(() => {
      nums.forEach(n => {
        if (!n.dataset._done){
          n.dataset._done = '1';
          animateCounter(n);
        }
      });
    }, 1000);

  } else {
    // Plan B: navegadores sin IO
    nums.forEach(animateCounter);
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
document.addEventListener('DOMContentLoaded', ()=>{
  initCounters();
});
</script>

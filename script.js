<script>
/* ====== PopsiCool – scripts ====== */

/* --- Contadores animados (home) --- */
function animateCounter(el){
  const target = Number(el.dataset.target) || 0;
  const dur = 1200; // ms
  const start = performance.now();

  // mostrar 0 al inicio para que se vea la transición 0 -> N
  el.textContent = "0";

  function step(t){
    const p = Math.min(1, (t - start) / dur);
    el.textContent = Math.floor(p * target).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initCounters(){
  const nums = document.querySelectorAll('.num[data-target]');
  if (!nums.length) return;

  // Si el navegador no soporta IO, anima todo de una
  if (!('IntersectionObserver' in window)) {
    nums.forEach(n => animateCounter(n));
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // evita doble animación
        if (!entry.target.dataset.animated) {
          entry.target.dataset.animated = "1";
          animateCounter(entry.target);
        }
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -20% 0px'
  });

  // Observa cada número
  nums.forEach(n => io.observe(n));

  // Fallback: si ya están visibles al cargar (algunas UIs), dispara de inmediato
  nums.forEach(n => {
    const rect = n.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView && !n.dataset.animated) {
      n.dataset.animated = "1";
      animateCounter(n);
      io.unobserve(n);
    }
  });
}

/* --- Acordeón independiente (múltiples abiertos) --- */
document.addEventListener('click', (ev) => {
  const btn = ev.target.closest('.acc-btn');
  if (!btn) return;               // click fuera de botones del acordeón
  ev.preventDefault();

  const item = btn.closest('.acc-item');
  if (!item) return;

  item.classList.toggle('open');  // abre/cierra solo este bloque
});

/* --- Arranque --- */
document.addEventListener('DOMContentLoaded', () => {
  initCounters();
});
</script>

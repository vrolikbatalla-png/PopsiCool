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
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.querySelectorAll('[data-target]').forEach(animateCounter);
        io.unobserve(e.target);
      }
    });
  },{threshold:.35});
  document.querySelectorAll('.kpis').forEach(k=>io.observe(k));
}

// === Acordeón PopsiCool (robusto) ===
document.addEventListener('click', (ev) => {
  const btn = ev.target.closest('.acc-btn');
  if (!btn) return;

  ev.preventDefault(); // evita comportamientos raros
  const item = btn.closest('.acc-item');
  if (!item) return;

  // intenta encontrar el contenedor .acc más cercano; si no existe, usa el padre del item;
  // y como último recurso, opera globalmente.
  const acc =
    btn.closest('.acc') ||
    item.parentElement ||
    document;

  // cierra los demás del mismo grupo
  const group = acc.querySelectorAll
    ? acc.querySelectorAll('.acc-item.open')
    : document.querySelectorAll('.acc-item.open');

  group.forEach((it) => {
    if (it !== item) it.classList.remove('open');
  });

  // alterna el actual
  item.classList.toggle('open');
});

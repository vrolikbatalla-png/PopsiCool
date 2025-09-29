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

// === Acordeón (delegación de eventos) – reemplaza tu initAccordion por esto
document.addEventListener('click', (ev) => {
  const btn = ev.target.closest('.acc-btn');
  if (!btn) return;

  const item = btn.closest('.acc-item');
  if (!item) return;

  const acc = item.parentElement; // contenedor .acc

  // cierra los demás
  acc.querySelectorAll('.acc-item.open').forEach((it) => {
    if (it !== item) it.classList.remove('open');
  });

  // alterna el actual
  item.classList.toggle('open');
});

// Arranque
document.addEventListener('DOMContentLoaded', ()=>{
  initCounters();
  // (no llames a initAccordion)
});

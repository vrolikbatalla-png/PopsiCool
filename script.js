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

// === Acordeón PopsiCool (delegación robusta) ===
document.addEventListener('click', (ev) => {
  const btn = ev.target.closest('.acc-btn');
  if (!btn) return;

  // encuentra el item y el contenedor .acc correctos aunque haya wrappers
  const item = btn.closest('.acc-item');
  const acc  = btn.closest('.acc');   // <-- antes usábamos parentElement

  if (!item || !acc) return;

  // cierra los demás dentro del MISMO acordeón
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

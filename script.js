/* ====== PopsiCool – scripts ====== */

// Contadores animados (home)
function animateCounter(el){
  const target = +el.dataset.target || 0;
  const dur = 1200; // ms
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

// Acordeón (Nosotros)
function initAccordion(){
  document.querySelectorAll('.acc-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const item = btn.closest('.acc-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(i=>i.classList.remove('open'));
      if(!open) item.classList.add('open');
    });
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  initCounters();
  initAccordion();
});

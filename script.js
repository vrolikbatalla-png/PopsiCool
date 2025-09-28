// Año en el footer
document.getElementById('y').textContent = new Date().getFullYear();

// Contadores “suaves” para métricas
function animateCount(el){
  const target = +el.dataset.count;
  const step = Math.max(1, Math.floor(target/120));
  let n = 0;
  const tick = () => {
    n = Math.min(target, n + step);
    el.textContent = n.toLocaleString('es-CR');
    if(n < target) requestAnimationFrame(tick);
  };
  tick();
}
document.querySelectorAll('.metrics span').forEach(animateCount);

// Scroll suave (por si no viene por defecto)
document.querySelectorAll('.nav nav a').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

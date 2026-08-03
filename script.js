const html = document.documentElement;
const theme = localStorage.getItem('nt-theme') || 'dark';
const lang  = localStorage.getItem('nt-lang')  || 'ar';
applyTheme(theme); applyLang(lang);

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  const b = document.getElementById('t-btn');
  if (b) b.textContent = t === 'dark' ? '☀️' : '🌙';
}
function applyLang(l) {
  html.setAttribute('data-lang', l);
  html.setAttribute('dir',  l === 'ar' ? 'rtl' : 'ltr');
  html.setAttribute('lang', l === 'ar' ? 'ar'  : 'en');
  const b = document.getElementById('l-btn');
  if (b) b.textContent = l === 'ar' ? 'EN' : 'عربي';
}
document.getElementById('t-btn')?.addEventListener('click', () => {
  const n = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(n); localStorage.setItem('nt-theme', n);
});
document.getElementById('l-btn')?.addEventListener('click', () => {
  const n = html.getAttribute('data-lang') === 'ar' ? 'en' : 'ar';
  applyLang(n); localStorage.setItem('nt-lang', n);
});

// Hamburger
const hbg = document.getElementById('hbg');
const mm  = document.getElementById('mmenu');
hbg?.addEventListener('click', () => { const o = mm.classList.toggle('on'); hbg.classList.toggle('on', o); });
document.querySelectorAll('.ml').forEach(l => l.addEventListener('click', () => { mm?.classList.remove('on'); hbg?.classList.remove('on'); }));
document.addEventListener('click', e => { if (hbg && mm && !hbg.contains(e.target) && !mm.contains(e.target)) { mm.classList.remove('on'); hbg.classList.remove('on'); } });

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', scrollY > 10), { passive: true });

// Active link
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
});

// Scroll reveal
const ro = new IntersectionObserver(entries => {
  entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('on'), i * 75); ro.unobserve(e.target); } });
}, { threshold: 0.07 });
document.querySelectorAll('.rev,.rev-l,.rev-r,.rev-s').forEach(el => ro.observe(el));

// Counter
document.querySelectorAll('.counter').forEach(el => {
  const co = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    co.disconnect();
    const target = +el.dataset.target;
    const plus = el.dataset.plus === 'true';
    const pct  = el.dataset.pct  === 'true';
    const dur  = 1600; const steps = 40;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      const val = Math.round(target * (i / steps));
      el.textContent = val + (plus ? '+' : pct ? '%' : '');
      if (i >= steps) clearInterval(iv);
    }, dur / steps);
  }, { threshold: 0.5 });
  co.observe(el);
});

// Subtle particle canvas
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
  resize(); window.addEventListener('resize', resize, { passive: true });
  for (let i = 0; i < 55; i++) pts.push({
    x: Math.random() * 1920, y: Math.random() * 1080,
    vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
    r: Math.random() * 1.2 + .3,
    c: Math.random() > .5 ? '184,146,74' : '80,120,160'
  });
  const dark = () => html.getAttribute('data-theme') !== 'light';
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},${dark() ? .35 : .18})`; ctx.fill();
    });
    for (let i = 0; i < pts.length; i++) for (let j = i+1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 120) {
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(184,146,74,${(1-d/120)*(dark()?.05:.025)})`; ctx.lineWidth = .5; ctx.stroke();
      }
    }
    requestAnimationFrame(loop);
  })();
}

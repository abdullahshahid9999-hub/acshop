// ── INIT ──
const html = document.documentElement;
const theme = localStorage.getItem('nt-theme') || 'dark';
const lang  = localStorage.getItem('nt-lang')  || 'ar';
applyTheme(theme); applyLang(lang);

function applyTheme(t){
  html.setAttribute('data-theme',t);
  document.getElementById('t-btn').textContent = t==='dark'?'☀️':'🌙';
}
function applyLang(l){
  html.setAttribute('data-lang',l);
  html.setAttribute('dir', l==='ar'?'rtl':'ltr');
  html.setAttribute('lang', l==='ar'?'ar':'en');
  document.getElementById('l-btn').textContent = l==='ar'?'EN':'عربي';
  document.title = l==='ar'
    ?'نعمان تبريد | خبراء التكييف والصيانة في الرياض'
    :'Nouman Tabreed | AC & Appliance Experts – Riyadh KSA';
}

document.getElementById('t-btn').addEventListener('click',()=>{
  const n = html.getAttribute('data-theme')==='dark'?'light':'dark';
  applyTheme(n); localStorage.setItem('nt-theme',n);
});
document.getElementById('l-btn').addEventListener('click',()=>{
  const n = html.getAttribute('data-lang')==='ar'?'en':'ar';
  applyLang(n); localStorage.setItem('nt-lang',n);
});

// ── HAMBURGER ──
const hbg = document.getElementById('hbg');
const mm  = document.getElementById('mmenu');
hbg.addEventListener('click',()=>{
  const o = mm.classList.toggle('on');
  hbg.classList.toggle('on',o);
  hbg.setAttribute('aria-expanded',o);
});
document.querySelectorAll('.ml').forEach(l=>l.addEventListener('click',()=>{
  mm.classList.remove('on'); hbg.classList.remove('on');
}));
document.addEventListener('click',e=>{
  if(!hbg.contains(e.target)&&!mm.contains(e.target)){
    mm.classList.remove('on'); hbg.classList.remove('on');
  }
});

// ── SCROLL REVEAL ──
const ro = new IntersectionObserver((entries)=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('on'), i*70);
      ro.unobserve(e.target);
    }
  });
},{threshold:0.08});
document.querySelectorAll('.rev').forEach(el=>ro.observe(el));

// ── NAV SHADOW ──
window.addEventListener('scroll',()=>{
  document.getElementById('nav').style.boxShadow =
    scrollY>8?'0 2px 18px rgba(0,0,0,.38)':'none';
},{passive:true});

// ── LIGHTBOX ──
const imgs=[
  {src:'https://placehold.co/900x675/1A3A5C/C8A96E?text=تركيب+مكيف+سبليت',ar:'تركيب مكيف سبليت',en:'Split AC Installation'},
  {src:'https://placehold.co/900x675/0f2a45/C8A96E?text=صيانة+وتنظيف+مكيف',ar:'صيانة وتنظيف مكيف',en:'AC Servicing & Cleaning'},
  {src:'https://placehold.co/900x675/162a40/C8A96E?text=إصلاح+ثلاجة+منزلية',ar:'إصلاح ثلاجة منزلية',en:'Home Refrigerator Repair'},
  {src:'https://placehold.co/900x675/1A3A5C/C8A96E?text=إصلاح+غسالة+أوتوماتيك',ar:'إصلاح غسالة أوتوماتيك',en:'Automatic Washer Repair'},
  {src:'https://placehold.co/900x675/0f2a45/C8A96E?text=فريق+نعمان+تبريد',ar:'فريق نعمان تبريد',en:'Our Technician Team'},
  {src:'https://placehold.co/900x675/162a40/C8A96E?text=تركيب+مكيف+مركزي',ar:'تركيب مكيف مركزي',en:'Central AC Installation'},
];
const lb=document.getElementById('lb');
const lbI=document.getElementById('lb-i');
const lbC=document.getElementById('lb-cap');

window.openLB=function(i){
  const d=imgs[i];
  lbI.src=d.src;
  lbC.textContent=html.getAttribute('data-lang')==='ar'?d.ar:d.en;
  lb.classList.add('on');
  document.body.style.overflow='hidden';
};
window.closeLB=function(e){
  if(!e||e.target===lb||e.target.id==='lb-x'){
    lb.classList.remove('on');
    document.body.style.overflow='';
  }
};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLB()});
document.querySelectorAll('.gal-item').forEach((el,i)=>{
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')openLB(i)});
});

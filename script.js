const html=document.documentElement;
const theme=localStorage.getItem('nt-theme')||'dark';
const lang=localStorage.getItem('nt-lang')||'ar';
applyTheme(theme);applyLang(lang);

function applyTheme(t){html.setAttribute('data-theme',t);document.getElementById('t-btn').textContent=t==='dark'?'☀️':'🌙'}
function applyLang(l){
  html.setAttribute('data-lang',l);
  html.setAttribute('dir',l==='ar'?'rtl':'ltr');
  html.setAttribute('lang',l==='ar'?'ar':'en');
  document.getElementById('l-btn').textContent=l==='ar'?'EN':'عربي';
  document.title=l==='ar'?'نعمان تبريد | خبراء التكييف والصيانة في الرياض':'Nouman Tabreed | AC & Appliance Experts – Riyadh KSA';
}
document.getElementById('t-btn').addEventListener('click',()=>{const n=html.getAttribute('data-theme')==='dark'?'light':'dark';applyTheme(n);localStorage.setItem('nt-theme',n)});
document.getElementById('l-btn').addEventListener('click',()=>{const n=html.getAttribute('data-lang')==='ar'?'en':'ar';applyLang(n);localStorage.setItem('nt-lang',n)});

const hbg=document.getElementById('hbg'),mm=document.getElementById('mmenu');
hbg.addEventListener('click',()=>{const o=mm.classList.toggle('on');hbg.classList.toggle('on',o);hbg.setAttribute('aria-expanded',o)});
document.querySelectorAll('.ml').forEach(l=>l.addEventListener('click',()=>{mm.classList.remove('on');hbg.classList.remove('on')}));
document.addEventListener('click',e=>{if(!hbg.contains(e.target)&&!mm.contains(e.target)){mm.classList.remove('on');hbg.classList.remove('on')}});

const ro=new IntersectionObserver((entries)=>{entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('on'),i*70);ro.unobserve(e.target)}})},{threshold:0.08});
document.querySelectorAll('.rev').forEach(el=>ro.observe(el));

window.addEventListener('scroll',()=>{document.getElementById('nav').style.boxShadow=scrollY>8?'0 2px 18px rgba(0,0,0,.38)':'none'},{passive:true});

const imgs=[
  {src:'assets/ac-install.svg',ar:'تركيب مكيف سبليت',en:'Split AC Installation'},
  {src:'assets/ac-repair.svg',ar:'إصلاح وتشخيص مكيف',en:'AC Diagnosis & Repair'},
  {src:'assets/ac-maintenance.svg',ar:'صيانة دورية',en:'Periodic Maintenance'},
  {src:'assets/fridge-repair.svg',ar:'إصلاح ثلاجة',en:'Fridge Repair'},
  {src:'assets/washer-repair.svg',ar:'إصلاح غسالة',en:'Washer Repair'},
  {src:'assets/team.svg',ar:'فريق نعمان تبريد',en:'Our Team'},
];
const lb=document.getElementById('lb'),lbI=document.getElementById('lb-i'),lbC=document.getElementById('lb-cap');
window.openLB=i=>{const d=imgs[i];lbI.src=d.src;lbC.textContent=html.getAttribute('data-lang')==='ar'?d.ar:d.en;lb.classList.add('on');document.body.style.overflow='hidden'};
window.closeLB=e=>{if(!e||e.target===lb||e.target.id==='lb-x'){lb.classList.remove('on');document.body.style.overflow=''}};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLB()});
document.querySelectorAll('.gal-item').forEach((el,i)=>{el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')openLB(i)})});

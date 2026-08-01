// ── INIT ──
const html=document.documentElement;
const theme=localStorage.getItem('nt-theme')||'dark';
const lang=localStorage.getItem('nt-lang')||'ar';
applyTheme(theme);applyLang(lang);

function applyTheme(t){
  html.setAttribute('data-theme',t);
  const btn=document.getElementById('t-btn');
  if(btn)btn.textContent=t==='dark'?'☀️':'🌙';
}
function applyLang(l){
  html.setAttribute('data-lang',l);
  html.setAttribute('dir',l==='ar'?'rtl':'ltr');
  html.setAttribute('lang',l==='ar'?'ar':'en');
  const btn=document.getElementById('l-btn');
  if(btn)btn.textContent=l==='ar'?'EN':'عربي';
}
document.getElementById('t-btn')?.addEventListener('click',()=>{
  const n=html.getAttribute('data-theme')==='dark'?'light':'dark';
  applyTheme(n);localStorage.setItem('nt-theme',n);
});
document.getElementById('l-btn')?.addEventListener('click',()=>{
  const n=html.getAttribute('data-lang')==='ar'?'en':'ar';
  applyLang(n);localStorage.setItem('nt-lang',n);
});

// ── HAMBURGER ──
const hbg=document.getElementById('hbg'),mm=document.getElementById('mmenu');
hbg?.addEventListener('click',()=>{const o=mm.classList.toggle('on');hbg.classList.toggle('on',o)});
document.querySelectorAll('.ml').forEach(l=>l.addEventListener('click',()=>{mm?.classList.remove('on');hbg?.classList.remove('on')}));
document.addEventListener('click',e=>{if(hbg&&mm&&!hbg.contains(e.target)&&!mm.contains(e.target)){mm.classList.remove('on');hbg.classList.remove('on')}});

// ── NAV SCROLL ──
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  nav?.classList.toggle('nav-scrolled',scrollY>20);
},{passive:true});

// ── ACTIVE NAV LINK ──
const page=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav-links a').forEach(a=>{
  if(a.getAttribute('href')===page||
     (page===''&&a.getAttribute('href')==='index.html')||
     (page==='index.html'&&a.getAttribute('href')==='index.html'))
    a.classList.add('active');
});

// ── SCROLL REVEAL ──
const ro=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){setTimeout(()=>e.target.classList.add('on'),i*80);ro.unobserve(e.target)}
  });
},{threshold:0.07});
document.querySelectorAll('.rev,.rev-l,.rev-r,.rev-s').forEach(el=>ro.observe(el));

// ── PARTICLE CANVAS ──
const canvas=document.getElementById('particles');
if(canvas){
  const ctx=canvas.getContext('2d');
  let W,H,particles=[];
  function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
  resize();window.addEventListener('resize',resize,{passive:true});
  const isDark=()=>html.getAttribute('data-theme')!=='light';
  class Particle{
    constructor(){this.reset()}
    reset(){
      this.x=Math.random()*W;this.y=Math.random()*H;
      this.size=Math.random()*1.8+0.4;
      this.speedX=(Math.random()-.5)*0.3;
      this.speedY=(Math.random()-.5)*0.3;
      this.opacity=Math.random()*0.5+0.1;
      this.color=Math.random()>.6?'200,169,110':'100,160,220';
    }
    update(){
      this.x+=this.speedX;this.y+=this.speedY;
      if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset();
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.fillStyle=`rgba(${this.color},${isDark()?this.opacity:this.opacity*.4})`;
      ctx.fill();
    }
  }
  for(let i=0;i<90;i++)particles.push(new Particle());
  // connections
  function drawConnections(){
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<130){
          ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          const op=(1-dist/130)*(isDark()?.08:.04);
          ctx.strokeStyle=`rgba(200,169,110,${op})`;
          ctx.lineWidth=.6;ctx.stroke();
        }
      }
    }
  }
  function animate(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{p.update();p.draw()});
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
}

// ── COUNTER ANIMATION ──
function animateCounter(el){
  const target=parseFloat(el.dataset.target);
  const isPlus=el.dataset.plus==='true';
  const isPercent=el.dataset.percent==='true';
  const suffix=isPlus?'+':isPercent?'%':'';
  const dur=1800;const step=20;
  let current=0;const increment=target/(dur/step);
  const timer=setInterval(()=>{
    current=Math.min(current+increment,target);
    el.textContent=(Number.isInteger(target)?Math.round(current):current.toFixed(0))+suffix;
    if(current>=target)clearInterval(timer);
  },step);
}
const counters=document.querySelectorAll('.counter');
if(counters.length){
  const co=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){animateCounter(e.target);co.unobserve(e.target)}});
  },{threshold:.5});
  counters.forEach(el=>co.observe(el));
}

// ── CURSOR GLOW (desktop only) ──
if(window.matchMedia('(pointer:fine)').matches){
  const glow=document.createElement('div');
  glow.style.cssText='position:fixed;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(200,169,110,0.04) 0%,transparent 70%);pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:left .15s,top .15s';
  document.body.appendChild(glow);
  document.addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});
}

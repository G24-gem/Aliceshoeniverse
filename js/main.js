// CURSOR
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  if(dot){ dot.style.left=mx+'px'; dot.style.top=my+'px'; }
});
function animCursor(){
  rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
  if(ring){ ring.style.left=rx+'px'; ring.style.top=ry+'px'; }
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a,button,.product-card,.filter-btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-grow'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-grow'));
});

// NAV SCROLL
const nav=document.querySelector('nav');
window.addEventListener('scroll',()=>{ if(nav) nav.classList.toggle('scrolled',scrollY>60); });

// MOBILE MENU
const ham=document.querySelector('.hamburger');
const mMenu=document.querySelector('.mobile-menu');
if(ham&&mMenu){
  ham.addEventListener('click',()=>mMenu.classList.toggle('open'));
  mMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mMenu.classList.remove('open')));
}

// REVEAL
const revObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.12});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>revObs.observe(el));

// STAGGER
document.querySelectorAll('[data-stagger]').forEach(parent=>{
  Array.from(parent.children).forEach((child,i)=>{
    child.style.transitionDelay=(i*.1)+'s';
    child.classList.add('reveal');
    revObs.observe(child);
  });
});

// TOAST
function showToast(msg){
  let t=document.querySelector('.toast');
  if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t);}
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3200);
}
document.querySelectorAll('.product-btn').forEach(btn=>btn.addEventListener('click',()=>showToast('Added to wishlist ✦')));

// FILTERS
const filterBtns=document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const cat=btn.dataset.cat;
    document.querySelectorAll('.product-card').forEach(card=>{
      const show=cat==='all'||card.dataset.cat===cat;
      card.style.display=show?'':'none';
      if(show){ card.style.opacity='0'; card.style.transform='translateY(20px)';
        setTimeout(()=>{card.style.transition='opacity .4s,transform .4s';card.style.opacity='1';card.style.transform='';},30); }
    });
    const visCount=document.querySelectorAll('.product-card:not([style*="display: none"])').length;
    const cEl=document.getElementById('count'); if(cEl) cEl.textContent=visCount;
  });
});

// NEWSLETTER
const nlForm=document.querySelector('.newsletter-form');
if(nlForm) nlForm.addEventListener('submit',e=>{e.preventDefault();showToast('Welcome to the universe ✦');nlForm.reset();});

// CONTACT FORM
const cForm=document.getElementById('contact-form');
if(cForm) cForm.addEventListener('submit',e=>{e.preventDefault();showToast('Message sent! We\'ll be in touch ✦');cForm.reset();});

// PARTICLES
const canvas=document.getElementById('particles-canvas');
if(canvas){
  const ctx=canvas.getContext('2d');
  function resizeC(){ canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
  resizeC(); window.addEventListener('resize',resizeC);
  const pts=Array.from({length:55},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.2+.3,dx:(Math.random()-.5)*.3,dy:(Math.random()-.5)*.3,a:Math.random()*.4+.1}));
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pts.forEach(p=>{
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(201,150,63,${p.a})`; ctx.fill();
      p.x+=p.dx; p.y+=p.dy;
      if(p.x<0||p.x>canvas.width) p.dx*=-1;
      if(p.y<0||p.y>canvas.height) p.dy*=-1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// COUNTERS
function animCounter(el){
  const target=parseInt(el.dataset.target,10);
  const suffix=el.dataset.suffix||'';
  let cur=0; const step=Math.max(1,Math.ceil(target/60));
  const iv=setInterval(()=>{ cur=Math.min(cur+step,target); el.textContent=cur.toLocaleString()+suffix; if(cur>=target) clearInterval(iv); },25);
}
const cntObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){animCounter(e.target);cntObs.unobserve(e.target);} });
},{threshold:.5});
document.querySelectorAll('[data-target]').forEach(el=>cntObs.observe(el));

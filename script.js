
// ══ CURSOR ══════════════════════════════════════════════
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx-5+'px'; cursor.style.top=my-5+'px';
});
(function tick(){ rx+=(mx-rx-18)*0.12; ry+=(my-ry-18)*0.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(tick); })();
document.querySelectorAll('a,button,.cat-card,.product-card,.wardrobe-cabinet').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cursor.style.transform='scale(2.5)'; ring.style.transform='scale(1.5)'; });
  el.addEventListener('mouseleave',()=>{ cursor.style.transform=''; ring.style.transform=''; });
});

// ══ MOBILE MENU ═════════════════════════════════════════
const menuBtn=document.getElementById('menuBtn');
const mobileMenu=document.getElementById('mobileMenu');
menuBtn.addEventListener('click',()=>{
  const open=mobileMenu.classList.toggle('open');
  document.body.classList.toggle('menu-open',open);
  document.body.style.overflow=open?'hidden':'';
});
// ══ CATEGORY TOGGLE (MEN/WOMEN) ═════════════════════════
const categoryData = {
  men: [
    { tag: 'Featured', name: 'Ready To Wear', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80' },
    { tag: 'Essentials', name: 'Outwear', image: 'https://images.unsplash.com/photo-1670489605175-41b5a37bd03e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hbGUlMjBvdXR3ZWFyfGVufDB8fDB8fHww' },
    { tag: 'Luxury', name: 'Accessories', image: 'https://images.unsplash.com/photo-1623040594026-5e720959f9a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbGUlMjB3cmlzdCUyMHdhdGNoZXN8ZW58MHx8MHx8fDA%3D' },
    { tag: 'Limited', name: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80' },
    { tag: 'Classic', name: 'Bags', image: 'https://images.unsplash.com/photo-1644976914537-4d182068fec7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fE9GRklDRSUyMEJBR1N8ZW58MHx8MHx8fDA%3D' },
  ],
  women: [
    { tag: 'Featured', name: 'Ready To Wear', image: 'https://images.unsplash.com/photo-1693746943973-c654ff84170c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { tag: 'Essentials', name: 'Handbags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80' },
    { tag: 'Luxury', name: 'Accessories', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWNjZXNzb3JpZXN8ZW58MHx8MHx8fDA%3D' },
    { tag: 'Limited', name: 'Outerwear', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
    { tag: 'Trend', name: 'Footwear', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80' },
  ]
};

const categoryButtons = document.querySelectorAll('.category-toggle-btn');
const categoryCards = document.querySelectorAll('[data-category-card]');
const categoryMark = document.querySelector('[data-category-mark]');
const categoryGrid = document.querySelector('.cat-grid');
let activeCategory = 'men';
let isCategorySwitching = false;
let queuedCategory = null;
let categoryTimers = [];

function updateCategoryCard(card, item) {
  const bg = card.querySelector('.category-image-bg');
  const tag = card.querySelector('[data-category-tag]');
  const name = card.querySelector('[data-category-name]');

  if (bg) {
    bg.style.backgroundImage = `linear-gradient(160deg, rgba(22,17,12,0.35), rgba(12,10,8,0.75)), url('${item.image}')`;
  }
  if (tag) tag.textContent = item.tag;
  if (name) name.textContent = item.name;
}

function setCategory(gender, animate = true) {
  const selected = categoryData[gender];
  if (!selected || (gender === activeCategory && animate)) return;

  if (animate && isCategorySwitching) {
    queuedCategory = gender;
    return;
  }

  categoryTimers.forEach((t) => clearTimeout(t));
  categoryTimers = [];

  if (animate) {
    isCategorySwitching = true;
    queuedCategory = null;
    if (categoryGrid) categoryGrid.classList.add('cat-grid-switching');
    categoryButtons.forEach((button) => {
      button.disabled = true;
    });
  }

  categoryCards.forEach((card, idx) => {
    const item = selected[idx];
    if (!item) return;

    if (!animate) {
      updateCategoryCard(card, item);
      return;
    }

    const delay = idx * 75;
    const outTimer = setTimeout(() => {
      card.classList.add('category-switch-out');
      const inTimer = setTimeout(() => {
        updateCategoryCard(card, item);
        card.classList.remove('category-switch-out');
        card.classList.add('category-switch-in');
        requestAnimationFrame(() => card.classList.add('category-switch-in-active'));
        const cleanupTimer = setTimeout(() => {
          card.classList.remove('category-switch-in', 'category-switch-in-active');
        }, 320);
        categoryTimers.push(cleanupTimer);
      }, 170);
      categoryTimers.push(inTimer);
    }, delay);
    categoryTimers.push(outTimer);
  });

  if (categoryMark) categoryMark.textContent = gender === 'men' ? 'M' : 'W';

  categoryButtons.forEach((button) => {
    const isActive = button.dataset.gender === gender;
    button.classList.toggle('bg-gold', isActive);
    button.classList.toggle('text-charcoal', isActive);
    button.classList.toggle('text-cream', !isActive);
    button.style.background = isActive ? '' : '#1f1b17';
    button.style.border = isActive ? 'none' : '1px solid rgba(201,169,110,0.35)';
  });

  activeCategory = gender;

  if (animate) {
    const totalDuration = ((categoryCards.length - 1) * 75) + 170 + 320 + 30;
    const doneTimer = setTimeout(() => {
      isCategorySwitching = false;
      if (categoryGrid) categoryGrid.classList.remove('cat-grid-switching');
      categoryButtons.forEach((button) => {
        button.disabled = false;
      });

      if (queuedCategory && queuedCategory !== activeCategory) {
        const next = queuedCategory;
        queuedCategory = null;
        setCategory(next, true);
      }
    }, totalDuration);
    categoryTimers.push(doneTimer);
  }
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => setCategory(button.dataset.gender, true));
});

setCategory('men', false);
// ══ NAV SCROLL ══════════════════════════════════════════
const mainNav=document.getElementById('mainNav');
window.addEventListener('scroll',()=>{
  mainNav.style.background=window.scrollY>50?'rgba(15,14,12,0.97)':'rgba(15,14,12,0.85)';
});

// ══ SCROLL TO TOP ════════════════════════════════════════
const scrollTopBtn=document.getElementById('scrollTop');
window.addEventListener('scroll',()=>{
  const s=window.scrollY>400;
  scrollTopBtn.style.opacity=s?'1':'0';
  scrollTopBtn.style.transform=s?'translateY(0)':'translateY(16px)';
});
scrollTopBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// ══ HERO PARTICLES ═══════════════════════════════════════
const pContainer=document.getElementById('particles');
for(let i=0;i<22;i++){
  const p=document.createElement('div');
  const dx=(Math.random()-0.5)*60;
  p.style.cssText=`position:absolute;left:${Math.random()*100}%;top:${Math.random()*100}%;width:${1+Math.random()*2}px;height:${1+Math.random()*2}px;border-radius:50%;background:#c9a96e;opacity:0;animation:pDot ${5+Math.random()*5}s ease-in-out ${Math.random()*6}s infinite;--dx:${dx}px`;
  pContainer.appendChild(p);
}

// ══════════════════════════════════════════════════════════
// LUXURY WARDROBE — DOOR OPENING LOGIC
// ══════════════════════════════════════════════════════════
const wardrobeEl      = document.getElementById('wardrobeEl');
const wardrobeSection = document.getElementById('wardrobeSection');
let wardrobeOpened    = false;
let sliderStarted     = false;

function openWardrobe() {
  if (wardrobeOpened) return;
  wardrobeOpened = true;

  // Add open class — triggers CSS door rotateY transitions
  wardrobeEl.classList.add('wardrobe-open');

  // Spawn dust motes AFTER doors begin to part
  setTimeout(spawnMotes, 900);

  // Start outfit slider after doors are fully open
  setTimeout(() => {
    if (!sliderStarted) {
      sliderStarted = true;
      startProgress();
       sliderTimer = setTimeout(() => changeOutfitSlide(1), DURATION);
    }
  }, 1900);
}

// ── DESKTOP: open automatically 2.4s after page load ──────
const isMobile = () => window.innerWidth < 768;
if (!isMobile()) {
  setTimeout(openWardrobe, 2400);
} else {
  // ── MOBILE: open when section scrolls into view ≥35% ──────
  const scrollTrigger = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && e.intersectionRatio >= 0.35) {
        openWardrobe();
        scrollTrigger.disconnect();
      }
    });
  }, { threshold: 0.35 });
  scrollTrigger.observe(wardrobeSection);
}

// Clicking the handles also opens
document.getElementById('doorL').addEventListener('click', openWardrobe);
document.getElementById('doorR').addEventListener('click', openWardrobe);

// ══ DUST MOTES INSIDE WARDROBE ═══════════════════════════
function spawnMotes() {
  const container = document.getElementById('motesContainer');
  for (let i = 0; i < 20; i++) {
    const m = document.createElement('div');
    m.className = 'mote';
    const sz    = 1 + Math.random() * 2.5;
    const delay = Math.random() * 8;
    const dur   = 6 + Math.random() * 6;
    const mx    = (Math.random() - 0.5) * 60;
    m.style.cssText = `
      left:${10 + Math.random() * 80}%;
      top:${15 + Math.random() * 65}%;
      width:${sz}px; height:${sz}px;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      --mx:${mx}px;
    `;
    container.appendChild(m);
  }
}

// ══════════════════════════════════════════════════════════
// OUTFIT SLIDER
// ══════════════════════════════════════════════════════════
const outfitData = [
  { price:'', name:'Oversized Trench' },
  { price:'', name:'Minimal Suit' },
  { price:'', name:'Fluid Wrap Dress' },
  { price:'', name:'Cashmere Coat' },
  { price:'', name:'Linen Co-ord' },
];
const slides    = document.querySelectorAll('.outfit-slide');
const dots      = document.querySelectorAll('.outfit-dot');
const progBar   = document.getElementById('progressBar');
let current=0, sliderTimer, progTimer, progPct=0;
const DURATION = 4200;

function startProgress() {
  progPct=0; progBar.style.width='0%'; progBar.style.transition='none';
  clearInterval(progTimer);
  progTimer=setInterval(()=>{
    progPct += 100/(DURATION/80);
    if(progPct>=100) progPct=100;
    progBar.style.width=progPct+'%';
    progBar.style.transition='width 0.08s linear';
  },80);
}

function changeOutfitSlide(next, manual=false) {
  if(next===current) return;
  clearTimeout(sliderTimer); clearInterval(progTimer);
  slides[current].classList.replace('active','exit');
  slides[next].classList.remove('enter','exit');
  slides[next].classList.add('active');
  dots[current].classList.remove('active-dot');
  dots[next].classList.add('active-dot');

  // Floating tag fade
  const a=document.getElementById('floatingAmt'), n=document.getElementById('floatingName');
  if(a){ a.style.opacity='0'; a.style.transform='translateY(8px)'; }
  if(n){ n.style.opacity='0'; }
  setTimeout(()=>{
    if(a){ a.textContent=outfitData[next].price; a.style.opacity='1'; a.style.transform='translateY(0)'; a.style.transition='all 0.45s ease'; }
    if(n){ n.textContent=outfitData[next].name; n.style.opacity='1'; n.style.transition='opacity 0.45s ease 0.12s'; }
  },300);

  const prev=current;
  setTimeout(()=>{ slides[prev].classList.remove('exit'); slides[prev].classList.add('enter'); },1100);
  current=next;
  startProgress();
  sliderTimer=setTimeout(()=>changeOutfitSlide((current+1)%slides.length),DURATION);
}
// window.goToSlide=(n)=>goToSlide(n,true);

// Touch swipe on wardrobe
let tsY=0;
wardrobeEl.addEventListener('touchstart',e=>{ tsY=e.touches[0].clientY; },{passive:true});
wardrobeEl.addEventListener('touchend',e=>{
  const dy=tsY-e.changedTouches[0].clientY;
  if(Math.abs(dy)>40) changeOutfitSlide(dy>0?(current+1)%slides.length:(current-1+slides.length)%slides.length,true);
});

// ══ REVEAL ANIMATIONS ═════════════════════════
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
},{threshold:0.12});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el=>{
  const delay=el.dataset.delay?parseFloat(el.dataset.delay)*0.12:0;
  el.style.transitionDelay=delay+'s';
  io.observe(el);
});

// ══ WISHLIST + BAG ═══════════════════════════════════════
document.querySelectorAll('.wish-btn').forEach(b=>{
  b.addEventListener('click',()=>{
    const f=b.textContent==='♥'; b.textContent=f?'♡':'♥'; b.style.color=f?'':'#e05050';
    if(!f){ b.style.transform='scale(1.3)'; setTimeout(()=>b.style.transform='',300); }
  });
});


document.querySelectorAll('.prod-actions button:first-child').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const o=btn.textContent; btn.textContent='✓ Added'; btn.style.background='#4ade80'; btn.style.color='#0f0e0c';
    setTimeout(()=>{ btn.textContent=o; btn.style.background=''; btn.style.color=''; },1800);
  });
});

// ══ PRODUCT CARD TILT ════════════════════════════════════
document.querySelectorAll('.product-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5;
    const y=(e.clientY-r.top)/r.height-0.5;
    card.style.transform=`perspective(800px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave',()=>{ card.style.transform=''; });
});

// ══ INPUT FOCUS GLOW ═════════════════════════════════════
document.querySelectorAll('input').forEach(input=>{
  input.addEventListener('focus',()=>{ input.style.borderColor='#c9a96e'; input.style.boxShadow='0 0 0 3px rgba(201,169,110,0.12)'; });
  input.addEventListener('blur',()=>{ input.style.borderColor=''; input.style.boxShadow=''; });
});

gsap.registerPlugin(ScrollTrigger);

/* NAV */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* HAMBURGER */
document.getElementById('hamburger').addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  const open = links.style.display === 'flex';
  links.style.display = open ? 'none' : 'flex';
  if (!open) {
    Object.assign(links.style, {
      flexDirection: 'column',
      position: 'fixed',
      top: '5rem', left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(255,255,255,0.82)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      padding: '1rem 1.5rem',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.7)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
      gap: '0.5rem', zIndex: '999',
      minWidth: '200px', textAlign: 'center'
    });
  }
});

/* MOUSE PARALLAX — floating layer */
const parallaxEls = document.querySelectorAll('[data-depth]');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
window.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});
(function loop() {
  curX += (mouseX - curX) * 0.06;
  curY += (mouseY - curY) * 0.06;
  parallaxEls.forEach(el => {
    const d = parseFloat(el.dataset.depth) || 0.3;
    el.style.transform = `translate(${curX*d*35}px,${curY*d*35}px)`;
  });
  requestAnimationFrame(loop);
})();

/* HERO VISUAL PARALLAX */
const heroVisual = document.getElementById('heroVisual');
if (heroVisual) {
  window.addEventListener('mousemove', e => {
    heroVisual.style.transform =
      `translate(${(e.clientX/window.innerWidth -.5)*18}px,${(e.clientY/window.innerHeight-.5)*18}px)`;
  });
}

/* HERO COUNTERS */
function animCounter(el) {
  const t = parseInt(el.dataset.target), s = performance.now(), dur = 2000;
  (function tick(now) {
    const p = Math.min((now-s)/dur,1), ease = 1-Math.pow(1-p,3), v = Math.floor(ease*t);
    el.textContent = v>=1e6 ? (v/1e6).toFixed(1).replace('.0','')+' M'
                   : v>=1000 ? Math.floor(v/1000)+'K' : v;
    if (p<1) requestAnimationFrame(tick);
  })(s);
}
const heroObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting) return;
  document.querySelectorAll('.hv-bar-fill').forEach(b => b.style.transform='scaleX(1)');
  document.querySelectorAll('.counter').forEach(animCounter);
  heroObserver.disconnect();
}, { threshold: 0.3 });
const heroEl = document.getElementById('hero');
if (heroEl) heroObserver.observe(heroEl);

/* HERO ELEMENTS — animados al cargar (están en el viewport de entrada) */
gsap.to('#hero .reveal-up', {
  opacity: 1, y: 0,
  duration: 1, ease: 'power3.out',
  stagger: 0.14,
  delay: 0.15,
});

/* PABLO STICKY SCROLL — cada stat aparece al entrar en viewport */
document.querySelectorAll('.ps-stat').forEach(stat => {
  gsap.to(stat, {
    opacity: 1, y: 0,
    duration: 0.7, ease: 'power2.out',
    scrollTrigger: { trigger: stat, start: 'top 80%', toggleActions: 'play none none none' }
  });
});

/* REVEAL-UP (resto de secciones) */
gsap.utils.toArray('.reveal-up').forEach((el, i) => {
  if (el.closest('#hero')) return;
  gsap.to(el, {
    opacity: 1, y: 0,
    duration: 0.85, ease: 'power3.out',
    delay: (i % 4) * 0.08,
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
  });
});

gsap.utils.toArray('.reveal-left').forEach(el =>
  gsap.to(el, {
    opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
  })
);

gsap.utils.toArray('.reveal-right').forEach(el =>
  gsap.to(el, {
    opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
  })
);

gsap.utils.toArray('.reveal-card').forEach((el, i) =>
  gsap.to(el, {
    opacity: 1, y: 0, scale: 1,
    duration: 0.65, ease: 'back.out(1.3)',
    delay: (i % 3) * 0.1,
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
  })
);

/* FLOATING ICONS — parallax al scrollear */
document.querySelectorAll('.float-icon').forEach((icon, i) => {
  const dir = i % 2 === 0 ? 1 : -1;
  gsap.to(icon, {
    y: dir * 100, rotation: dir * 40, ease: 'none',
    scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.8 }
  });
});

/* ORBIT RINGS */
document.querySelectorAll('.orbit-ring').forEach((ring, i) => {
  const dir = i % 2 === 0 ? 1 : -1;
  gsap.to(ring, {
    rotation: dir * 180, ease: 'none',
    scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2.5 }
  });
});

/* MEMORABLE — floating icons */
document.querySelectorAll('.mem-float').forEach((icon, i) => {
  const dir = i % 2 === 0 ? 1 : -1;
  gsap.to(icon, {
    y: dir * 70, rotation: dir * 25, ease: 'none',
    scrollTrigger: {
      trigger: '.memorable-section',
      start: 'top bottom', end: 'bottom top', scrub: 1.5
    }
  });
});

/* MEMORABLE — orb pulse */
document.querySelectorAll('.mem-orb').forEach((orb, i) => {
  gsap.to(orb, {
    scale: 1.18, duration: 4+i, ease: 'sine.inOut',
    yoyo: true, repeat: -1, delay: i * 1.1
  });
});

/* MEMORABLE — stat bars */
document.querySelectorAll('.mem-stat-card').forEach(card => {
  ScrollTrigger.create({
    trigger: card, start: 'top 80%',
    onEnter: () => card.classList.add('in-view')
  });
});

/* MEMORABLE — pillar stagger */
gsap.utils.toArray('.mem-pillar').forEach((el, i) => {
  gsap.from(el, {
    opacity: 0, x: -24, duration: 0.55, ease: 'power2.out', delay: i * 0.12,
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
  });
});

/* ORBIT SECTION — entrance: stage scales in, badges pop in */
ScrollTrigger.create({
  trigger: '.orbit-stage',
  start: 'top 85%',
  onEnter: () => {
    gsap.fromTo('.orbit-stage', { scale: 0.85, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.2)'
    });
    gsap.fromTo('.os-badge', { scale: 0, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)',
      stagger: 0.12, delay: 0.3
    });
    gsap.fromTo('.os-center', { scale: 0 }, {
      scale: 1, duration: 0.6, ease: 'back.out(2)', delay: 0.1
    });
  }
});

/* BENTO GRID — staggered entrance */
gsap.utils.toArray('.bc').forEach((card, i) => {
  gsap.to(card, {
    opacity: 1, y: 0, scale: 1,
    duration: 0.6, ease: 'power2.out',
    delay: (i % 3) * 0.08,
    scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
  });
});

/* WHY ROWS — entrance with reveal */
gsap.utils.toArray('.reveal-why').forEach((row, i) => {
  gsap.to(row, {
    opacity: 1, y: 0,
    duration: 0.65, ease: 'power2.out',
    delay: i * 0.06,
    scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none none' }
  });
});

/* WHY ROWS — proof number count-up on hover */
document.querySelectorAll('.why-row').forEach(row => {
  const num = row.querySelector('.wrp-num');
  if (!num) return;
  row.addEventListener('mouseenter', () => {
    gsap.fromTo(num, { scale: 1 }, { scale: 1.08, duration: 0.2, ease: 'power2.out', yoyo: true, repeat: 1 });
  });
});

/* BENTO CARDS — lift on hover (GSAP for smoothness) */
document.querySelectorAll('.bc').forEach(card => {
  card.addEventListener('mouseenter', () => gsap.to(card, { y: -5, duration: 0.22, ease: 'power2.out' }));
  card.addEventListener('mouseleave', () => gsap.to(card, { y: 0,  duration: 0.28, ease: 'power2.inOut' }));
});

/* HERO H1 — leve parallax (solo Y, sin fade) */
gsap.to('.hero-h1', {
  y: -35, ease: 'none',
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
});

/* PROCESO ICONS — leve rotacion al scrollear */
document.querySelectorAll('.paso-icon-wrap').forEach((el, i) => {
  gsap.to(el, {
    rotation: i % 2 === 0 ? 12 : -12, ease: 'none',
    scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 20%', scrub: 1 }
  });
});

/* FLOAT ICONS — micro blur suave */
document.querySelectorAll('.float-icon').forEach((icon, i) => {
  gsap.to(icon, {
    filter: 'blur(2px)', opacity: 0.15,
    duration: 2.5 + i * 0.3, ease: 'sine.inOut',
    yoyo: true, repeat: -1, delay: i * 0.5
  });
});

/* CTA ORB PULSE */
document.querySelectorAll('.cta-orb').forEach((orb, i) => {
  gsap.to(orb, {
    scale: 1.25, duration: 3.5+i, ease: 'sine.inOut',
    yoyo: true, repeat: -1, delay: i * 0.9
  });
});

/* LOGO MEMORABLE — subtle pulse */
gsap.to('.mem-logo', {
  scale: 1.04, duration: 2.5, ease: 'sine.inOut',
  yoyo: true, repeat: -1
});

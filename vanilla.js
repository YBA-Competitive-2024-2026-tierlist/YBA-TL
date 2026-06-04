/**
 * vanilla.js — Non-React JS
 * 1. Intro cinematic
 * 2. Background canvas — particles, connections, ゴ menacing logos, Stand arrows
 * 3. Stand Arrows — clickable, show JoJo lore on click
 * 4. Theme toggle
 */

/* ══════════════════════════════════════════════════
   1. INTRO
══════════════════════════════════════════════════ */
(function initIntro() {
  const intro = document.getElementById('intro');
  if (!intro) return;
  intro.classList.add('done');
  setTimeout(() => { intro.style.display = 'none'; }, 3100);
})();


/* ══════════════════════════════════════════════════
   2. BACKGROUND CANVAS
   - Particle field + connections
   - Floating ゴ menacing logos
   - Subtle scan line
══════════════════════════════════════════════════ */
(function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, raf;

  const PARTICLE_COUNT = 50;
  const particles = [];

  // ゴ menacing logos floating in bg
  const GOGO_COUNT = 10;
  const gogos = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    return {
      x:     Math.random() * 2000,
      y:     Math.random() * 1200,
      vx:    (Math.random() - 0.5) * 0.32,
      vy:    (Math.random() - 0.5) * 0.32,
      r:     Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.38 + 0.05,
      hue:   Math.random() < 0.55 ? 348 + Math.random() * 20 : 28 + Math.random() * 25,
    };
  }

  function makeGogo() {
    return {
      x:     Math.random() * 1800 + 60,
      y:     Math.random() * 1000 + 60,
      vx:    (Math.random() - 0.5) * 0.12,
      vy:    (Math.random() - 0.5) * 0.12,
      size:  Math.random() * 18 + 10,
      alpha: Math.random() * 0.09 + 0.03,
      phase: Math.random() * Math.PI * 2,
      rot:   Math.random() * 0.3 - 0.15,
    };
  }

  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(makeParticle());
  for (let i = 0; i < GOGO_COUNT;    i++) gogos.push(makeGogo());

  let scanX = 0, t = 0;

  let lastBgT = 0;
  function loop(ts) {
    raf = requestAnimationFrame(loop);
    if (ts - lastBgT < 1000/40) return; // cap à 40fps
    lastBgT = ts;
    ctx.clearRect(0, 0, W, H);
    t += 0.014;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    /* ── ゴ menacing logos ── */
    gogos.forEach(g => {
      g.x += g.vx; g.y += g.vy;
      if (g.x < -40)  g.x = W + 40;
      if (g.x > W+40) g.x = -40;
      if (g.y < -40)  g.y = H + 40;
      if (g.y > H+40) g.y = -40;

      const pulse = g.alpha * (0.6 + 0.4 * Math.sin(t * 1.8 + g.phase));
      const a = isLight ? pulse * 0.3 : pulse;

      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.rotate(g.rot);
      ctx.font = `bold ${g.size}px serif`;
      ctx.fillStyle = `rgba(255, 0, 50, ${a})`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('ゴ', 0, 0);
      ctx.restore();
    });

    /* ── Particles ── */
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      const a = isLight ? p.alpha * 0.3 : p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${a})`;
      ctx.fill();
    });

    /* ── Connections ── */
    const ca = isLight ? 0.018 : 0.06;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 0, 60, ${ca * (1 - d / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    /* ── Scan line ── */
    if (!isLight) {
      scanX = (scanX + 0.45) % W;
      const sg = ctx.createLinearGradient(scanX - 55, 0, scanX + 55, 0);
      sg.addColorStop(0,   'rgba(255,0,60,0)');
      sg.addColorStop(0.5, 'rgba(255,0,60,0.015)');
      sg.addColorStop(1,   'rgba(255,0,60,0)');
      ctx.fillStyle = sg;
      ctx.fillRect(scanX - 55, 0, 110, H);
    }

  }

  raf = requestAnimationFrame(loop);
})();

/* ══════════════════════════════════════════════════
   3. STAND ARROWS — clickable DOM elements
   - 5 regular Stand Arrows scattered on sides
   - Click regular → small lore popup
   - Click any arrow → lore popup
══════════════════════════════════════════════════ */
(function initStandArrows() {

  // 1. TA FONCTION AVEC LES VRAIES IMAGES PNG (Taille responsive avec clamp)
  function makeArrowSVG() {
    return `<img 
      src="image/stand_arrow_1_by_justazag_ddht534.png" 
      alt="JoJo Arrow"
      style="
        width: clamp(35px, 6vw, 65px);
        height: auto; 
        object-fit: contain; 
        filter: drop-shadow(0 0 6px rgba(255,0,60,0.5));
        pointer-events: none;
      " 
    />`;
  }

  // 2. LE TEXTE DES POPUPS
  const LORE = [
    { title: 'STAND ARROW', text: '"The Arrow pierces only those with potential. Awaken — or perish." — Part 4: Diamond is Unbreakable' },
    { title: 'THE ARROW AWAKENS', text: '"DIO acquired this arrow in Egypt. Its origin: meteorite ore from 50,000 years ago." — Part 3 lore' },
    { title: 'ARROW & STAND', text: '"If a Stand pierces its user with the Arrow, it evolves. Few survive the attempt." — Giorno Giovanna' },
    { title: 'YOSHIKAGE KIRA', text: '"I just want to live quietly. This arrow gave me Killer Queen — and changed everything." — Part 4' },
    { title: 'DIAVOLO', text: '"No one can read my fate. Not even an Arrow." — King Crimson, Part 5: Golden Wind' },
  ];

  // 3. LES POSITIONS DES FLÈCHES SUR LES CÔTÉS
  const ARROW_CONFIGS = [
    // --- COTÉ GAUCHE ---
    { x: 3,  y: 10, rot: 5 },
    { x: 25, y: 35, rot: -8 },
    { x: 4,  y: 60, rot: 12 },
    { x: 30, y: 65, rot: -5 },
    // --- COTÉ DROIT ---
    { x: 92, y: 15, rot: -10 },
    { x: 89, y: 40, rot: 8 },
    { x: 94, y: 65, rot: -6 },
    { x: 70, y: 15, rot: 4 },
  ];

  let container;

  // 4. CRÉATION ET PLACEMENT
  function createArrows() {
    // AJOUT RESPONSIVE : Règle CSS pour cacher les flèches sur mobile (écrans <= 900px)
    if (!document.getElementById('arrow-responsive-style')) {
      const style = document.createElement('style');
      style.id = 'arrow-responsive-style';
      style.textContent = `@media (max-width: 900px) { #stand-arrows { display: none !important; } }`;
      document.head.appendChild(style);
    }

    container = document.createElement('div');
    container.id = 'stand-arrows';
    container.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      pointer-events: none;
      z-index: 5;
      overflow: hidden;
    `;
    document.body.appendChild(container);

    ARROW_CONFIGS.forEach((cfg, idx) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        position: absolute;
        left: ${cfg.x}%;
        top:  ${cfg.y}%;
        transform: translate(-50%, -50%) rotate(${cfg.rot}deg);
        pointer-events: all;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.8s ease, transform 0.3s ease;
      `;
      wrapper.dataset.idx = idx;
      wrapper.innerHTML = makeArrowSVG();

      setTimeout(() => {
        wrapper.style.opacity = '0.55';
      }, 4200 + idx * 400);

      wrapper.addEventListener('mouseenter', () => {
        wrapper.style.opacity    = '1';
        wrapper.style.transform  = `translate(-50%, -50%) rotate(${cfg.rot}deg) scale(1.15)`;
      });
      wrapper.addEventListener('mouseleave', () => {
        wrapper.style.opacity   = '0.55';
        wrapper.style.transform = `translate(-50%, -50%) rotate(${cfg.rot}deg)`;
      });

      wrapper.addEventListener('click', () => {
        showArrowLore(wrapper, LORE[idx % LORE.length]);
      });

      container.appendChild(wrapper);
    });
  }

  /* ── Regular arrow lore popup ── */
  function showArrowLore(el, lore) {
    const old = document.getElementById('arrow-lore');
    if (old) old.remove();

    const box = document.createElement('div');
    box.id = 'arrow-lore';
    const rect = el.getBoundingClientRect();
    const onRight = rect.left < window.innerWidth / 2;

    box.style.cssText = `
      position: fixed;
      top: ${Math.min(rect.top, window.innerHeight - 180)}px;
      ${onRight ? `left: ${rect.right + 14}px` : `right: ${window.innerWidth - rect.left + 14}px`};
      z-index: 9999;
      background: rgba(3,2,16,0.97);
      border: 1px solid rgba(255,0,60,0.35);
      border-left: 3px solid #c0392b;
      border-radius: 0 8px 8px 0;
      padding: 14px 18px;
      max-width: 280px;
      font-family: 'Cinzel', serif;
      color: rgba(232,227,245,0.85);
      font-size: 0.78rem;
      line-height: 1.65;
      box-shadow: 0 8px 30px rgba(0,0,0,0.8);
      backdrop-filter: blur(12px);
      opacity: 0;
      transition: opacity 0.25s;
      pointer-events: none;
    `;
    box.innerHTML = `
      <div style="color:#c0392b;font-size:0.65rem;letter-spacing:4px;margin-bottom:8px">${lore.title}</div>
      <div style="font-size:0.75rem;font-weight:300;color:rgba(232,227,245,0.7);font-family:'Barlow Condensed',sans-serif;letter-spacing:0.5px">${lore.text}</div>
    `;
    document.body.appendChild(box);
    requestAnimationFrame(() => { box.style.opacity = '1'; });
    setTimeout(() => {
      box.style.opacity = '0';
      setTimeout(() => box.remove(), 300);
    }, 3500);
  }

  // Init after page loads
  setTimeout(createArrows, 100);

})();


/* ══════════════════════════════════════════════════
   4. THEME TOGGLE
══════════════════════════════════════════════════ */
(function initTheme() {
  const btn  = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const root = document.documentElement;
  const saved = localStorage.getItem('yba-theme') || 'dark';
  root.setAttribute('data-theme', saved);
  icon.textContent = saved === 'dark' ? '☀️' : '🌙';
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    icon.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('yba-theme', next);
  });
})();


/* ══════════════════════════════════════════════════
   ★ ENHANCED — Scroll Reveal for Tier Rows
══════════════════════════════════════════════════ */
(function initScrollReveal() {
  function attachObserver() {
    const rows = document.querySelectorAll('.tier-row');
    if (rows.length === 0) { setTimeout(attachObserver, 300); return; }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const row = entry.target;
          const delay = (parseInt(row.dataset.rowIndex) || 0) * 60;
          setTimeout(() => row.classList.add('revealed'), delay);
          observer.unobserve(row);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    rows.forEach(row => observer.observe(row));
  }

  const root = document.getElementById('root');
  if (root) {
    const mutObs = new MutationObserver(() => {
      setTimeout(() => {
        document.querySelectorAll('.tier-row:not(.revealed)').forEach(row => {
          const rect = row.getBoundingClientRect();
          if (rect.top < window.innerHeight) row.classList.add('revealed');
        });
        attachObserver();
      }, 80);
    });
    mutObs.observe(root, { childList: true, subtree: true });
  }

  setTimeout(attachObserver, 1200);
})();


/* ══════════════════════════════════════════════════
   ★ ENHANCED — Welcome Toast
══════════════════════════════════════════════════ */
(function initWelcomeToast() {
  const toast = document.createElement('div');
  toast.id = 'welcome-toast';
  toast.innerHTML = '<span class="toast-icon">⚡</span><span>Click any player card to view their profile</span>';
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => toast.remove(), 700);
    }, 4000);
  }, 3500);
})();


/* ══════════════════════════════════════════════════
   ★ ENHANCED — Hint Pulse on first card
══════════════════════════════════════════════════ */
(function initHintPulse() {
  function pulseFirst() {
    const firstCard = document.querySelector('.pcard');
    if (!firstCard) { setTimeout(pulseFirst, 500); return; }
    setTimeout(() => {
      firstCard.classList.add('hint-pulse');
      setTimeout(() => firstCard.classList.remove('hint-pulse'), 2500);
    }, 4200);
  }
  pulseFirst();
})();

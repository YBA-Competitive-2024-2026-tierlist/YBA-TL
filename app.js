/**
 * app.js — React Application (ENHANCED v10)
 */

/* ══ 1. RANK CONFIG ══ */
const RANK_CFG = {
  GOATS: { badge:'GOATS', desc:'Greatest of All Time',            tip:'#ffffff', btnC:'#ffffff', c1:'rainbow', c2:'#000' },
  SSS:   { badge:'SSS',   desc:'Finest Talent of Our Time',       tip:'#ff4466', btnC:'#ff003c', c1:'rainbow', c2:'#1a0008' },
  SS:    { badge:'SS',    desc:'Premier Star of This Generation',  tip:'#ff5555', btnC:'#ff2020', c1:'#ff2020', c2:'#000' },
  Splus: { badge:'S+',   desc:'Unmatched Player of This Age',     tip:'#ffbb44', btnC:'#ff8c00', c1:'#ff8c00', c2:'#000' },
  S:     { badge:'S',    desc:'Elite Competitor of Our Era',       tip:'#ffe44d', btnC:'#ffd600', c1:'#ffd600', c2:'#000' },
  A:     { badge:'A',    desc:'Worthy Opponent',                   tip:'#cc77ff', btnC:'#b44fff', c1:'#b44fff', c2:'#000' },
  B:     { badge:'B',    desc:'Pinnacle of Their Rank',            tip:'#55bbff', btnC:'#2299ff', c1:'#2299ff', c2:'#000' },
  C:     { badge:'C',    desc:'Yet to Reach Their Prime',          tip:'#44ffaa', btnC:'#00d97e', c1:'#00d97e', c2:'#000' },
};

/* ══ 2. PLAYER LORE ══ */
const PLAYER_LORE = {
  'Sub / SMG':              'A living myth in YBA history. Feared across every server, revered across every generation.',
  'Sinnkow':                'Left the game in 2024 having obliterated all opposition. Rightfully enshrined in GOATs.',
  'Flare':                  'Firepower without limit. A name synonymous with total domination throughout their era.',
  'Elfish':                 'The Adaptive King — playing since 2019. In any situation, capable of outsmarting any opponent. Fool him once, shame on you. Fool him twice? Impossible.',
  'Digger (2025)':          'Active through the harshest era, 2025–2026. Set the bar for the strongest Sp title. Absolutely unfightable. Unkillable.',
  'Tornado (2024 - 2025)':  'Left in 2025. The definition of Stand On Business — killing all below without mercy.',
  'JL7 (Jameslol7, 2024/2025)': 'Active since 2019 through late 2025. Highest combat intelligence ever recorded in YBA. No matter your approach — defeat is guaranteed.',
  'Preqnox (2024 - 2025)':  'A predatory presence. Calculated, precise, relentless. Opponents rarely understood what hit them.',
  'Kono (2024)':            'Set the benchmark for the top 3 strongest GER users of all time. Truly unmatched.',
  'Prayer':                 'Silent in name, deafening in impact. A force of nature that few could withstand.',
  'MasterKlinge (2024)':    'Active since 2019 through 2024. Left behind the highest standard for YBA combat. Greatly missed.',
  'CGG (CoolGuyGamer)':     'A consistent powerhouse. The calm before every storm.',
  'Zenwydd (2024 - 2025)':  'Power radiated from them like heat from a furnace — constant, consuming, impossible to ignore.',
  'Vano (2024)':            'A one-man army. Carries the strength of all SS players alone. High IQ, fast execution, lethal.',
  'RAZE':                   'The new silent killer. Hidden beneath all the YBA icons. Victory near-certain. Name still rising.',
  'Shayraim':               'Co-creator of this very tierlist. The French Monster',
};

/* ══ 3. RANK STATS ══ */
const RANK_STATS = {
  GOATS: { aggression: 99, iq: 98, consistency: 99, legacy: 100 },
  SSS:   { aggression: 95, iq: 96, consistency: 94, legacy: 92 },
  SS:    { aggression: 88, iq: 85, consistency: 87, legacy: 78 },
  Splus: { aggression: 78, iq: 76, consistency: 78, legacy: 62 },
  S:     { aggression: 68, iq: 67, consistency: 68, legacy: 50 },
  A:     { aggression: 55, iq: 54, consistency: 56, legacy: 38 },
  B:     { aggression: 40, iq: 38, consistency: 40, legacy: 24 },
  C:     { aggression: 25, iq: 23, consistency: 25, legacy: 12 },
};

/* ══ 4. PROFILE CARD ══ */
const ProfileCard = ({ src, name, isShayraim = false }) => (
  <div className={`profile-card${isShayraim ? ' profile-card--shayraim' : ''}`}>
    <div className="profile-glow" />
    <div className="profile-border" />
    <img src={src} alt={name} className="profile-img" />
    <div className="profile-sheen" />
  </div>
);

/* ══ 5.  AURA CANVAS ══ */
const ShayraimeAura = ({ active }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    const cx = W / 2, cy = H / 2;
    let raf, t = 0;
    const rnd = (a, b) => Math.random() * (b - a) + a;

    // ── Orbes orbitaux sur 3 anneaux
    const orbs = Array.from({ length: 12 }, (_, i) => {
      const ring = Math.floor(i / 5);
      return {
        angle:  (i / (ring === 0 ? 5 : ring === 1 ? 6 : 5)) * Math.PI * 2 + ring * 0.4,
        radius: 14 + ring * 11,
        speed:  (0.07 - ring * 0.015) * (i % 2 === 0 ? 1 : -1),
        size:   1.0 + ring * 0.6,
        phase:  i * 0.65,
        trail:  [],
      };
    });

    // ── Particules d'énergie qui montent et tourbillonnent
    const particles = Array.from({ length: 28 }, (_, i) => ({
      x: cx + rnd(-26, 26),
      y: cy + rnd(-20, 20),
      vx: rnd(-0.5, 0.5),
      vy: rnd(-1.5, -0.4),
      life: Math.random(),
      r: rnd(0.4, 2.2),
      grey: Math.floor(rnd(120, 255)),
      phase: Math.random() * Math.PI * 2,
      spin: rnd(-0.02, 0.02),
    }));

    // ── Éclairs crackants monochrome
    let bolts = [];
    class MonoBolt {
      constructor() {
        const side = Math.floor(Math.random() * 4);
        if (side === 0)      { this.sx = rnd(0,W); this.sy = 0; }
        else if (side === 1) { this.sx = W;        this.sy = rnd(0,H); }
        else if (side === 2) { this.sx = rnd(0,W); this.sy = H; }
        else                 { this.sx = 0;        this.sy = rnd(0,H); }
        this.life  = 1;
        this.decay = rnd(0.07, 0.16);
        this.path  = [[this.sx, this.sy]];
        let bx = this.sx, by = this.sy;
        const steps = 10 + Math.floor(Math.random() * 6);
        for (let i = 0; i < steps; i++) {
          bx += (cx - this.sx) / steps + rnd(-10, 10);
          by += (cy - this.sy) / steps + rnd(-10, 10);
          this.path.push([bx, by]);
        }
        this.bright = Math.floor(rnd(200, 255));
        // Ramifications aléatoires
        this.branches = [];
        const branchIdx = Math.floor(rnd(2, steps - 2));
        const bpt = this.path[branchIdx];
        const bPath = [[bpt[0], bpt[1]]];
        let bbx = bpt[0], bby = bpt[1];
        for (let i = 0; i < 4; i++) {
          bbx += rnd(-12, 12); bby += rnd(-12, 12);
          bPath.push([bbx, bby]);
        }
        this.branches.push(bPath);
      }
      draw() {
        this.life -= this.decay;
        if (this.life <= 0) return;
        const drawPath = (path, widthMult) => {
          // Outer glow large
          ctx.beginPath();
          ctx.moveTo(path[0][0], path[0][1]);
          path.forEach(p => ctx.lineTo(p[0], p[1]));
          ctx.globalAlpha = this.life * 0.15;
          ctx.lineWidth   = rnd(12, 22) * widthMult;
          ctx.strokeStyle = 'rgba(255,255,255,1)';
          ctx.lineCap     = 'round';
          ctx.lineJoin    = 'round';
          ctx.stroke();
          // Mid glow
          ctx.beginPath();
          ctx.moveTo(path[0][0], path[0][1]);
          path.forEach(p => ctx.lineTo(p[0], p[1]));
          ctx.globalAlpha = this.life * 0.45;
          ctx.lineWidth   = rnd(3, 7) * widthMult;
          ctx.strokeStyle = `rgb(${this.bright},${this.bright},${this.bright})`;
          ctx.stroke();
          // Core bright
          ctx.beginPath();
          ctx.moveTo(path[0][0], path[0][1]);
          path.forEach(p => ctx.lineTo(p[0], p[1]));
          ctx.globalAlpha = this.life * 0.95;
          ctx.lineWidth   = rnd(0.8, 1.8) * widthMult;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();
          ctx.globalAlpha = 1;
        };
        drawPath(this.path, 1);
        this.branches.forEach(b => drawPath(b, 0.5));
      }
    }

    let lastShayT = 0;
    function loop(ts) {
      if (!active) {
        // Vider et arrêter
        ctx.clearRect(0, 0, W, H);
        raf = null;
        return;
      }
      if (ts - lastShayT < 1000/50) {
        raf = requestAnimationFrame(loop);
        return;
      }
      lastShayT = ts;
      ctx.clearRect(0, 0, W, H);
      t += 0.022;

      // ── 1. Halo pulsant multi-couches
      const pulse  = 0.5 + 0.5 * Math.sin(t * 2.6);
      const pulse2 = 0.5 + 0.5 * Math.sin(t * 4.1 + 1.2);
      const haloR  = Math.min(W, H) * 0.56;
      const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR);
      hg.addColorStop(0,    `rgba(255,255,255,${0.10 * pulse})`);
      hg.addColorStop(0.25, `rgba(220,220,220,${0.18 * pulse})`);
      hg.addColorStop(0.55, `rgba(120,120,120,${0.22 * pulse2})`);
      hg.addColorStop(0.8,  `rgba(40,40,40,${0.15})`);
      hg.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = hg;
      ctx.fillRect(0, 0, W, H);

      // ── 2. Anneaux d'aura (3 rings, vitesses et opacités différentes)
      [
        { rf: 0.38, speed: 1.2,  alpha: 0.55, width: 5 },
        { rf: 0.46, speed: 2.1,  alpha: 0.35, width: 3 },
        { rf: 0.52, speed: 3.4,  alpha: 0.20, width: 2 },
      ].forEach(({ rf, speed, alpha, width }, ri) => {
        const ringR = Math.min(W, H) * rf + Math.sin(t * speed + ri) * 3;
        const a     = alpha * (0.6 + 0.4 * Math.sin(t * speed * 1.3 + ri));
        ctx.beginPath();
        ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${a})`;
        ctx.lineWidth   = width;
        ctx.shadowBlur  = 12;
        ctx.shadowColor = 'rgba(255,255,255,0.8)';
        ctx.stroke();
        ctx.shadowBlur  = 0;
      });

      // ── 3. Orbes orbitaux avec trainée
      orbs.forEach(o => {
        o.angle += o.speed;
        const r  = o.radius + Math.sin(t * 2.5 + o.phase) * 3;
        const ox = cx + Math.cos(o.angle) * r;
        const oy = cy + Math.sin(o.angle) * r;

        // Mémoriser la trainée (max 8 pts)
        o.trail.push([ox, oy]);
        if (o.trail.length > 8) o.trail.shift();

        // Dessiner la trainée
        if (o.trail.length > 2) {
          for (let ti = 0; ti < o.trail.length - 1; ti++) {
            const fade = (ti / o.trail.length);
            ctx.beginPath();
            ctx.moveTo(o.trail[ti][0], o.trail[ti][1]);
            ctx.lineTo(o.trail[ti+1][0], o.trail[ti+1][1]);
            ctx.globalAlpha = fade * 0.5;
            ctx.lineWidth   = o.size * fade * 2;
            ctx.strokeStyle = 'rgba(255,255,255,0.9)';
            ctx.lineCap     = 'round';
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
        }

        const bri = Math.floor(190 + 65 * Math.sin(o.angle * 2 + t));
        // Glow
        const og = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.size * 5);
        og.addColorStop(0,   `rgba(${bri},${bri},${bri},0.9)`);
        og.addColorStop(0.5, `rgba(${bri},${bri},${bri},0.3)`);
        og.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(ox, oy, o.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = og; ctx.fill();
        // Core
        ctx.beginPath(); ctx.arc(ox, oy, o.size * 1.2, 0, Math.PI * 2);
        ctx.fillStyle   = `rgb(${bri},${bri},${bri})`;
        ctx.shadowBlur  = 10;
        ctx.shadowColor = 'rgba(255,255,255,1)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ── 4. Particules d'énergie montantes
      particles.forEach(p => {
        p.phase += p.spin;
        p.x  += p.vx + Math.sin(t * 1.5 + p.phase) * 0.3;
        p.y  += p.vy;
        p.life -= 0.010;
        if (p.life <= 0) {
          Object.assign(p, {
            x: cx + rnd(-26, 26), y: cy + rnd(-5, 20),
            vx: rnd(-0.5, 0.5), vy: rnd(-1.5, -0.4),
            life: rnd(0.8, 1), r: rnd(0.4, 2.2),
            grey: Math.floor(rnd(140, 255)),
            phase: Math.random() * Math.PI * 2,
          });
        }
        const fade = Math.sin(p.life * Math.PI);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(${p.grey},${p.grey},${p.grey},${fade * 0.85})`;
        ctx.shadowBlur  = 6;
        ctx.shadowColor = 'rgba(255,255,255,0.7)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ── 5. Éclairs crackants avec branches
      if (Math.random() < 0.32) bolts.push(new MonoBolt());
      bolts = bolts.filter(b => b.life > 0);
      bolts.forEach(b => b.draw());

      // ── 6. Vignette concentratrice
      const vg = ctx.createRadialGradient(cx, cy, Math.min(W,H)*0.25, cx, cy, Math.min(W,H)*0.72);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.45)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(loop);
    }
    if (active) { raf = requestAnimationFrame(loop); }

    return () => {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      ctx.clearRect(0, 0, W, H);
    };
  }, [active]);
  return <canvas ref={ref} className="pcard-canvas" style={{ zIndex: 2 }} />;
};

/* ══ 6. LIGHTNING CANVAS ══ */
const LightningCanvas = ({ active, col1, col2 }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    const rnd = (a, b) => Math.random() * (b - a) + a;
    const getColour = () => col1 === 'rainbow' ? `hsl(${(Date.now()/5)%360},100%,60%)` : col1;
    let raf = null, bolts = [], t = 0, running = true;

    class Bolt {
      constructor() {
        const left = Math.random() < 0.5;
        this.x = left ? -5 : W + 5;
        this.y = rnd(H * 0.2, H * 0.8);
        this.life = 1;
        this.decay = rnd(0.08, 0.16);
        this.path = [];
        let bx = this.x, by = this.y;
        for (let i = 0; i < 10; i++) {
          bx += (W * 0.7 / 10) * (left ? 1 : -1) + rnd(-9, 9);
          by += rnd(-12, 12);
          this.path.push({ x: bx, y: by });
        }
        this.colour = getColour();
      }
      draw() {
        this.life -= this.decay;
        if (this.life <= 0) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        this.path.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.globalAlpha = this.life;
        ctx.lineCap = 'round';
        ctx.lineWidth = rnd(2, 3.5);
        ctx.strokeStyle = this.colour;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.colour;
        ctx.stroke();
        ctx.lineWidth = rnd(0.5, 1);
        ctx.strokeStyle = col2 === '#000' ? '#ffffff' : col2;
        ctx.shadowBlur = 0;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    const loop = () => {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      if (active) {
        t += 0.02;
        if (Math.random() < 0.3) bolts.push(new Bolt());
      }
      // Toujours laisser les bolts existants se terminer proprement
      bolts = bolts.filter(b => b.life > 0);
      bolts.forEach(b => b.draw());
      // Continue seulement si actif OU s'il reste des bolts à finir
      if (active || bolts.length > 0) {
        raf = requestAnimationFrame(loop);
      } else {
        // Canvas vide garanti quand tout est fini
        ctx.clearRect(0, 0, W, H);
        raf = null;
      }
    };

    // Démarre seulement quand active
    if (active) raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, W, H);
    };
  }, [active, col1, col2]);
  return <canvas ref={ref} className="pcard-canvas" />;
};

/* ══ 7. PARTICLE BURST ══ */
const ParticleBurst = ({ trigger, color }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!trigger || !ref.current) return;
    const canvas = ref.current;
    const W = canvas.width = canvas.offsetWidth, H = canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    const cx = W / 2, cy = H / 2;
    let pts = [], rings = [], raf;
    const rnd = (a, b) => Math.random() * (b - a) + a;

    // Particules directionnelles (plus nombreuses, plus rapides)
    for (let i = 0; i < 38; i++) {
      const angle = (i / 38) * Math.PI * 2 + rnd(-0.2, 0.2);
      const speed = rnd(2.5, 7.5);
      const big   = Math.random() < 0.2;
      pts.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1, decay: rnd(0.028, 0.055),
        r: big ? rnd(2.5, 4.5) : rnd(0.8, 2),
        bright: big,
      });
    }

    // Anneaux d'énergie qui s'expandent
    rings.push({ r: 0, maxR: Math.min(W, H) * 0.52, life: 1 });
    rings.push({ r: 0, maxR: Math.min(W, H) * 0.38, life: 1, delay: 4 });

    let frame = 0;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;

      // Anneaux
      rings.forEach(ring => {
        if (frame < (ring.delay || 0)) return;
        ring.r    = Math.min(ring.r + (ring.maxR / 28), ring.maxR);
        ring.life -= 0.045;
        if (ring.life <= 0) return;
        ctx.beginPath(); ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth   = 2.5 * ring.life;
        ctx.globalAlpha = ring.life * 0.7;
        ctx.shadowBlur  = 14; ctx.shadowColor = color;
        ctx.stroke(); ctx.shadowBlur = 0; ctx.globalAlpha = 1;
      });

      // Particules
      pts = pts.filter(p => p.life > 0);
      if (!pts.length && rings.every(r => r.life <= 0)) { cancelAnimationFrame(raf); return; }
      pts.forEach(p => {
        p.x  += p.vx; p.y += p.vy;
        p.vx *= 0.94; p.vy *= 0.94;
        p.vy += 0.08;
        p.life -= p.decay;
        const a = Math.max(0, p.life);
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle   = color;
        ctx.globalAlpha = a;
        if (p.bright) { ctx.shadowBlur = 10; ctx.shadowColor = color; }
        ctx.fill();
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;
      });

      raf = requestAnimationFrame(loop);
    };
    loop();
  }, [trigger]);
  return <canvas ref={ref} className="pcard-canvas" style={{ zIndex: 5 }} />;
};

/* ══ 8. SPOTLIGHT MODAL ══ */
const SpotlightBgCanvas = ({ color }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const W = canvas.width = canvas.offsetWidth, H = canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    let raf, t = 0, bolts = [];
    const rnd = (a, b) => Math.random() * (b - a) + a;
    class SpotBolt {
      constructor() {
        this.x = rnd(W*0.1, W*0.9); this.y = -4;
        this.life = 1; this.decay = rnd(0.04, 0.09); this.path = [[this.x, this.y]];
        let bx = this.x, by = this.y;
        for (let i = 0; i < 12; i++) { bx += rnd(-20, 20); by += H/12; this.path.push([bx, by]); }
      }
      draw() {
        this.life -= this.decay; if (this.life <= 0) return;
        ctx.beginPath(); ctx.moveTo(this.path[0][0], this.path[0][1]);
        this.path.forEach(p => ctx.lineTo(p[0], p[1]));
        ctx.globalAlpha = this.life * 0.35; ctx.lineCap = 'round'; ctx.lineWidth = rnd(1, 3);
        ctx.strokeStyle = color === 'rainbow' ? `hsl(${(Date.now()/8)%360},100%,65%)` : color;
        ctx.stroke(); ctx.globalAlpha = 1;
      }
    }
    let lastSpotT = 0;
    function loop(ts) {
      raf = requestAnimationFrame(loop);
      if (ts - lastSpotT < 1000/30) return;
      lastSpotT = ts;
      ctx.clearRect(0, 0, W, H); t += 0.02;
      if (Math.random() < 0.12) bolts.push(new SpotBolt());
      bolts = bolts.filter(b => b.life > 0); bolts.forEach(b => b.draw());
    }
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ctx.clearRect(0, 0, W, H); };
  }, [color]);
  return <canvas ref={ref} className="spotlight-bg-canvas" />;
};

const SpotlightModal = ({ player, rank, cfg, position, total, onClose }) => {
  const [barsReady, setBarsReady] = React.useState(false);
  const lore  = PLAYER_LORE[player] || null;
  const stats = RANK_STATS[rank]    || RANK_STATS['C'];
  const isShayraim = player === 'Shayraim';
  const accentColor = isShayraim ? '#e8e8e8' : cfg.tip;

  React.useEffect(() => {
    const t = setTimeout(() => setBarsReady(true), 120);
    return () => clearTimeout(t);
  }, [player]);

  React.useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  const statEntries = [
    { label: 'Aggression',  key: 'aggression' },
    { label: 'Combat IQ',   key: 'iq' },
    { label: 'Consistency', key: 'consistency' },
    { label: 'Legacy',      key: 'legacy' },
  ];

  return (
    <div className="spotlight-card">
      <SpotlightBgCanvas color={isShayraim ? '#ffffff' : cfg.c1} />
      <button className="spotlight-close" onClick={onClose} aria-label="Close">✕</button>
      <div className="spotlight-content">
        <span className="spotlight-rank-badge" style={{ color: accentColor }}>
          {cfg.badge} · {cfg.desc}
        </span>
        <span className="spotlight-name" style={{ color: accentColor }}>{player}</span>
        <span className="spotlight-rank-desc">
          {rank === 'GOATS' ? '👑 Hall of Fame' : `Tier ${cfg.badge}`} · #{position} of {total}
        </span>
        <div className="spotlight-divider" />
        {lore
          ? <p className="spotlight-lore">"{lore}"</p>
          : <p className="spotlight-no-lore">— No records found —</p>
        }
        <div className="spotlight-stats">
          {statEntries.map(({ label, key }) => (
            <div className="stat-row" key={key}>
              <span className="stat-label">{label}</span>
              <div className="stat-bar-bg">
                <div className="stat-bar-fill" style={{
                  width: barsReady ? `${stats[key]}%` : '0%',
                  background: cfg.c1 === 'rainbow'
                    ? 'linear-gradient(90deg, #ff003c, #ff8c00, #ffd600, #00d97e, #2299ff, #b44fff)'
                    : `linear-gradient(90deg, ${cfg.c1}88, ${cfg.c1})`,
                  boxShadow: `0 0 8px ${accentColor}55`,
                }} />
              </div>
              <span className="stat-val" style={{ color: accentColor }}>{stats[key]}</span>
            </div>
          ))}
        </div>
        <div className="spotlight-position">
          <span>Active era ·</span>
          <span style={{ color: accentColor }}>
            {player.match(/\d{4}/g) ? player.match(/\d{4}/g).join('–') : '2024–2026'}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ══ 9. PLAYER CARD ══ */
function PlayerCard({ name, cfg, rank, position, onSpotlight }) {
  const [hov, setHov] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const lore = PLAYER_LORE[name] || null;
  const isShayraim = name === 'Shayraim';
  const isElectric  = !isShayraim && rank !== 'GOATS' && rank !== 'SSS';
  const cardStyle   = isElectric ? { color: cfg.c1 } : {};
  const nameBase    = name.replace(/\s*\(.*\)/, '').trim();
  const yearMatch   = name.match(/\(([^)]+)\)/);
  const yearTag     = yearMatch ? yearMatch[1] : null;

  const showTip = () => {
    setHov(true);
    if (!lore) return;
    const tip = document.getElementById('tooltip');
    document.getElementById('tooltip-name').textContent = name;
    document.getElementById('tooltip-name').style.color = isShayraim ? '#e0e0e0' : cfg.tip;
    document.getElementById('tooltip-text').textContent = lore;
    tip.style.borderLeftColor = isShayraim ? '#aaaaaa' : cfg.tip;
    tip.setAttribute('aria-hidden', 'false');
    tip.classList.add('vis');
  };
  const moveTip = (e) => {
    const tip = document.getElementById('tooltip');
    const r = tip.getBoundingClientRect();
    let x = e.clientX + 20, y = e.clientY + 20;
    if (x + r.width  > window.innerWidth)  x = e.clientX - r.width  - 10;
    if (y + r.height > window.innerHeight) y = e.clientY - r.height - 10;
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  };
  const hideTip = () => {
    setHov(false);
    const tip = document.getElementById('tooltip');
    tip.classList.remove('vis');
    tip.setAttribute('aria-hidden', 'true');
  };
  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 700);
    hideTip();
    onSpotlight(name, rank, cfg);
  };

  return (
    <div
      className={`pcard${isShayraim ? ' pcard--shayraim' : ''}`}
      style={cardStyle}
      onMouseEnter={showTip} onMouseMove={moveTip} onMouseLeave={hideTip}
      onClick={handleClick} role="button" tabIndex={0} aria-label={`View ${name} details`}
    >
      {position && <span className="pcard-pos">#{position}</span>}
      <span className="pname">
        {nameBase}
        {yearTag && <span className="pname-year"> ({yearTag})</span>}
      </span>
      {isShayraim && <ShayraimeAura active={hov} />}
      {isElectric  && <LightningCanvas active={hov} col1={cfg.c1} col2={cfg.c2} />}
      {clicked && <ParticleBurst trigger={clicked} color={isShayraim ? '#ffffff' : cfg.tip} />}
    </div>
  );
}

/* ══ 10. TIER ROW ══ */
function TierRow({ rank, cfg, players, rowIndex, search, onSpotlight }) {
  const visible = players.filter(p => p === '=' || p.toLowerCase().includes(search));
  if (visible.length === 0 && search !== '') return null;
  const realPlayers = players.filter(p => p !== '=');
  let posCounter = 0;

  return (
    <div className={`tier-row row-${rank}`} data-row-index={rowIndex}>
      <div className="tier-label" style={{ '--rank-color': cfg.tip }}>
        {rank === 'GOATS' && <span className="tier-badge-crown">👑</span>}
        <span className="tier-badge">{cfg.badge}</span>
        <span className="tier-desc">{cfg.desc}</span>
      </div>
      <div className="tier-content">
        {visible.map((p, i) => {
          if (p === '=') return <span key={i} className="sep">=</span>;
          posCounter++;
          return (
            <PlayerCard key={i} name={p} cfg={cfg} rank={rank} position={posCounter} onSpotlight={onSpotlight} />
          );
        })}
      </div>
      <span className="tier-count-badge">
        {realPlayers.length} player{realPlayers.length !== 1 ? 's' : ''}
      </span>
    </div>
  );
}

/* ══ 11. GLOBAL STATS ══ */
function GlobalStats({ data }) {
  if (!data) return null;
  const total = Object.values(data).flat().filter(p => p !== '=').length;
  const tiers = Object.keys(data).length;
  const goats = (data.GOATS || []).filter(p => p !== '=').length;
  return (
    <div id="global-stats">
      <div className="gstat">
        <span className="gstat-val">{total}</span>
        <span className="gstat-label">Ranked Players</span>
      </div>
      <div className="gstat-sep" />
      <div className="gstat">
        <span className="gstat-val">{tiers}</span>
        <span className="gstat-label">Tiers</span>
      </div>
      <div className="gstat-sep" />
      <div className="gstat">
        <span className="gstat-val">{goats}</span>
        <span className="gstat-label">GOATs</span>
      </div>
      <div className="gstat-sep" />
      <div className="gstat">
        <span className="gstat-val">2024–2026</span>
        <span className="gstat-label">Active Era</span>
      </div>
    </div>
  );
}

/* ══ 12. APP ROOT ══ */
function App() {
  const [data,   setData]   = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('ALL');
  const [spotlight, setSpotlight] = React.useState(null);
  const [spotOpen,  setSpotOpen]  = React.useState(false);

  React.useEffect(() => {
    fetch('players.json').then(r => r.json()).then(d => {
      setData(d);
      setTimeout(() => {
        const loader = document.getElementById('app-loading');
        if (loader) { loader.classList.add('hide'); setTimeout(() => loader.remove(), 500); }
      }, 400);
    });
  }, []);

  const handleSpotlight = React.useCallback((name, rank, cfg) => {
    setSpotlight({ name, rank, cfg }); setSpotOpen(true);
  }, []);

  const closeSpotlight = React.useCallback(() => {
    setSpotOpen(false); setTimeout(() => setSpotlight(null), 400);
  }, []);

  if (!data) return null;

  const allRanks = Object.entries(RANK_CFG);
  const visRanks = filter === 'ALL' ? allRanks : allRanks.filter(([k]) => k === filter);
  const query    = search.toLowerCase();

  const getPositionInTier = (name, rank) => (data[rank] || []).filter(p => p !== '=').indexOf(name) + 1;
  const getTierTotal      = (rank)       => (data[rank] || []).filter(p => p !== '=').length;

  return (
    <div>
      {/* SPOTLIGHT OVERLAY */}
      <div
        id="spotlight-overlay"
        className={spotOpen ? 'open' : ''}
        onClick={e => { if (e.target.id === 'spotlight-overlay') closeSpotlight(); }}
        aria-modal="true" role="dialog"
      >
        {spotlight && (
          <SpotlightModal
            player={spotlight.name} rank={spotlight.rank} cfg={spotlight.cfg}
            position={getPositionInTier(spotlight.name, spotlight.rank)}
            total={getTierTotal(spotlight.rank)}
            onClose={closeSpotlight}
          />
        )}
      </div>

      {/* HEADER */}
      <header>
        <div className="header-inner">
          <div className="deco-rune deco-rune--tl" aria-hidden="true">✦</div>
          <div className="deco-rune deco-rune--tr" aria-hidden="true">✦</div>
          <div className="creators">
            <div className="creator">
              <ProfileCard src="image/En1LT8kUwAA6CxF.jpg" name="Shayraim" isShayraim={true} />
              <span className="creator-name">Shayraim</span>
              <span className="creator-name">Web Designer</span>
            </div>
            <div className="creator">
              <ProfileCard src="image/3b0df852d0aa8a5769ae0d3606beff83.webp" name="HavoxHavoc" />
              <span className="creator-name">HavoxHavoc</span>
              <span className="creator-name">Ranker</span>
            </div>
          </div>
          <div className="header-divider" aria-hidden="true">
            <span className="hdiv-line" />
            <span className="hdiv-diamond">◆</span>
            <span className="hdiv-line" />
          </div>
          <p className="hero-eyebrow">Official · 2024 – 2026</p>
          <h1 className="hero-title">
            <span className="word-yba">YBA</span>
            <span className="word-tier">TIER</span>
            <span className="word-list">LIST</span>
          </h1>
          <p className="hero-sub">Your Bizarre Adventure · Legends Ranking</p>
          <div className="h-rule" />
          <p className="disclaimer">
            <b>DISCLAIMER:</b> Official 2024–2026 player tierlist, subject to change.
            Placements updated weekly. Rank changes only occur for active players —
            those who stop playing cannot move down, but may rise depending on the performance of active competitors.
          </p>
        </div>
      </header>

      <GlobalStats data={data} />

      {/* SIDE DECORATIONS */}
      <div className="side-deco side-deco--left" aria-hidden="true">
        <div className="sdeco-label">RANK</div>
        <div className="sdeco-bar" />
        <div className="sdeco-dots">
          {['GOATS','SSS','SS','Sp','S','A','B','C'].map(r => (
            <div key={r} className={`sdeco-dot sdeco-dot--${r}`} />
          ))}
        </div>
        <div className="sdeco-bar" />
        <div className="sdeco-label">2026</div>
      </div>
      <div className="side-deco side-deco--right" aria-hidden="true">
        <div className="sdeco-sigil">⬡</div>
        <div className="sdeco-sigil sdeco-sigil--sm">⬡</div>
        <div className="sdeco-sigil sdeco-sigil--sm">⬡</div>
        <div className="sdeco-bar" />
        <div className="sdeco-label">YBA</div>
      </div>

      {/* CONTROLS */}
      <div className="controls">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="search-input" type="text"
            placeholder="Search player… (click any card for details)"
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filters">
          <button className={`filter-btn${filter==='ALL'?' on':''}`} style={{'--fc':'#888'}} onClick={() => setFilter('ALL')}>
            <span className="btn-fill"/><span className="btn-label">ALL</span>
          </button>
          {allRanks.map(([k, v]) => (
            <button key={k} className={`filter-btn${filter===k?' on':''}`} style={{'--fc': v.btnC}} onClick={() => setFilter(k)}>
              <span className="btn-fill"/><span className="btn-label">{v.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TIER ROWS */}
      <div className="tiers" id="tiers-container">
        {visRanks.map(([k, v], i) => (
          <TierRow key={k} rank={k} cfg={v} players={data[k]||[]} rowIndex={i} search={query} onSpotlight={handleSpotlight} />
        ))}
      </div>

      {/* FOOTER */}
      <footer>
        <div className="footer-ornament">
          <span className="hdiv-line" /><span className="hdiv-diamond">◆</span><span className="hdiv-line" />
        </div>
        <div className="credits">
          Content by <span className="cr">NYX</span>&nbsp;&nbsp;·&nbsp;&nbsp;Website by <span className="cb">SHAYRAIM</span>
        </div>
        <div className="footer-sub">YBA Legends Tierlist · 2024 – 2026</div>
      </footer>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

/**
 * app.js — React Application
 * Tiers: One Above All / GOAT / Z / SSS / SS / S+ / S
 */

/* ══ 1. RANK CONFIG ══ */
const RANK_CFG = {
  OneAboveAll: {
    badge: '①',
    desc:  'One Above All',
    tip:   '#ffffff',
    btnC:  '#ffffff',
    c1:    'rainbow',
    c2:    '#000',
  },
  GOAT: {
    badge: 'GOAT',
    desc:  'Greatest of All Time',
    tip:   '#f5e090',
    btnC:  '#e8d060',
    c1:    'rainbow',
    c2:    '#1a1000',
  },
  Z: {
    badge: 'Z',
    desc:  'Beyond S-Tier',
    tip:   '#ff6633',
    btnC:  '#ff4400',
    c1:    'rainbow',
    c2:    '#1a0500',
  },
  SSS: {
    badge: 'SSS',
    desc:  'Finest Talent of Our Time',
    tip:   '#ff4466',
    btnC:  '#ff003c',
    c1:    'rainbow',
    c2:    '#1a0008',
  },
  SS: {
    badge: 'SS',
    desc:  'Premier Star of This Generation',
    tip:   '#ff5555',
    btnC:  '#ff2020',
    c1:    '#ff2020',
    c2:    '#000',
  },
  Splus: {
    badge: 'S+',
    desc:  'Unmatched Player of This Age',
    tip:   '#ffbb44',
    btnC:  '#ff8c00',
    c1:    '#ff8c00',
    c2:    '#000',
  },
  S: {
    badge: 'S',
    desc:  'Elite Competitor of Our Era',
    tip:   '#ffe44d',
    btnC:  '#ffd600',
    c1:    '#ffd600',
    c2:    '#000',
  },
};

/* ══ 2. PLAYER LORE ══ */
const PLAYER_LORE = {
  'Tornado':      'The undisputed One Above All. A name that transcends every tier, every era. There is no equal.',
  'Fanta':        'A GOATed force. Their dominance shaped the entire competitive landscape of YBA.',
  'Sketch':       'Elite intellect, elite execution. A true GOAT whose legacy remains unmatched.',
  'Smg':          'Sub / SMG — A living myth in YBA history. Feared across every server, revered across every generation.',
  'Sinnkow':      'Left the game in 2024 having obliterated all opposition. Rightfully enshrined in GOATs.',
  'Elfish':       'The Adaptive King — playing since 2019. Fool him once, shame on you. Fool him twice? Impossible.',
  'Zitler':       'Z-tier presence. A player whose raw power and game sense place them beyond conventional ranking.',
  'Flare':        'Firepower without limit. A name synonymous with total domination throughout their era.',
  'Preqnox':      'A predatory presence. Calculated, precise, relentless. Opponents rarely understood what hit them.',
  'Vano':         'A one-man army. High IQ, fast execution, lethal.',
  'Prayer':       'Silent in name, deafening in impact. A force of nature that few could withstand.',
  'Jameslol7':    'Highest combat intelligence ever recorded in YBA. No matter your approach — defeat is guaranteed.',
  'Kono':         'Set the benchmark for the top 3 strongest GER users of all time. Truly unmatched.',
  'MasterKlinge': 'Left behind the highest standard for YBA combat. Greatly missed.',
  'sigmaoriol':   'A relentless competitor whose Z-tier placement speaks for itself.',
  'Digger':       'Active through the harshest era, 2025–2026. The bar for the strongest Sp title. Unkillable.',
  'Shayraim':     'Co-creator of this tierlist. A respected S+ competitor. Recognizable by a distinct blue aura.',
  'Aqualicz':     'A Z-tier force with a signature style all their own. The rose says it all.',
  'ParagonFr':    'S-tier consistency. A name that speaks for itself in the current era.',
  'Dimka':        'Relentless pressure and high fight IQ.',
};

/* ══ 3. PROFILE CARD ══ */
const ProfileCard = ({ src, name, isShayraim = false }) => (
  React.createElement('div', { className: `profile-card${isShayraim ? ' profile-card--shayraim' : ''}` },
    React.createElement('div', { className: 'profile-glow' }),
    React.createElement('div', { className: 'profile-border' }),
    React.createElement('img', { src, alt: name, className: 'profile-img' }),
    React.createElement('div', { className: 'profile-sheen' })
  )
);

/* ══ 4. LIGHTNING CANVAS ══ */
const LightningCanvas = ({ active, col1, col2 }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    let raf, bolts = [];
    const rnd = (a, b) => Math.random() * (b - a) + a;
    class Bolt {
      constructor() {
        const left = Math.random() < 0.5;
        this.x = left ? -5 : W + 5; this.y = H / 2;
        this.life = 1; this.decay = rnd(0.08, 0.15);
        this.path = [];
        let cx = this.x, cy = this.y;
        for (let i = 0; i < 10; i++) {
          cx += (W * 0.68 / 10) * (left ? 1 : -1) + rnd(-8, 8);
          cy += rnd(-12, 12);
          this.path.push({ x: cx, y: cy });
        }
      }
      draw() {
        this.life -= this.decay;
        if (this.life <= 0) return;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        this.path.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.globalAlpha = this.life;
        ctx.lineCap = 'round';
        const colour = col1 === 'rainbow'
          ? `hsl(${(Date.now() / 5) % 360},100%,60%)`
          : col1;
        ctx.lineWidth = rnd(5, 11); ctx.strokeStyle = colour; ctx.stroke();
        ctx.lineWidth = rnd(1.5, 3); ctx.strokeStyle = col2;  ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      if (active && Math.random() < 0.42) bolts.push(new Bolt());
      bolts = bolts.filter(b => b.life > 0);
      bolts.forEach(b => b.draw());
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [active, col1, col2]);
  return React.createElement('canvas', { ref, className: 'pcard-canvas' });
};

/* ══ 5. SHAYRAIM AURA ══ */
const ShayraimeAura = ({ active }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const W = canvas.width  = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    const cx = W / 2, cy = H / 2;
    let raf, t = 0;
    const wisps = Array.from({ length: 6 }, (_, i) => ({
      angle: (i / 6) * Math.PI * 2,
      radius: Math.min(W, H) * 0.45,
      speed: 0.03 + i * 0.005,
      phase: i * 1.1,
    }));
    let bolts = [];
    const rnd = (a, b) => Math.random() * (b - a) + a;
    class BlueBolt {
      constructor() {
        const left = Math.random() < 0.5;
        this.x = left ? -2 : W + 2; this.y = H / 2;
        this.life = 1; this.decay = rnd(0.1, 0.18);
        this.path = [];
        let bx = this.x, by = this.y;
        for (let i = 0; i < 9; i++) {
          bx += (W * 0.65 / 9) * (left ? 1 : -1) + rnd(-6, 6);
          by += rnd(-10, 10);
          this.path.push({ x: bx, y: by });
        }
      }
      draw() {
        this.life -= this.decay;
        if (this.life <= 0) return;
        ctx.beginPath(); ctx.moveTo(this.x, this.y);
        this.path.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.globalAlpha = this.life; ctx.lineCap = 'round';
        const hue = 200 + Math.sin(t * 3) * 40;
        ctx.lineWidth = rnd(4, 9); ctx.strokeStyle = `hsl(${hue},100%,65%)`; ctx.stroke();
        ctx.lineWidth = rnd(1, 2);  ctx.strokeStyle = '#ffffff'; ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.025;
      if (!active) { raf = requestAnimationFrame(loop); return; }
      wisps.forEach(w => {
        w.angle += w.speed;
        const floatR = w.radius + Math.sin(t * 2 + w.phase) * 4;
        const x = cx + Math.cos(w.angle) * floatR;
        const y = cy + Math.sin(w.angle) * floatR;
        const hue = 200 + Math.sin(w.angle + t) * 40;
        const wg = ctx.createRadialGradient(x, y, 0, x, y, 8);
        wg.addColorStop(0, `hsla(${hue},100%,70%,0.7)`);
        wg.addColorStop(1, 'transparent');
        ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = wg; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue},100%,85%)`;
        ctx.shadowBlur = 8; ctx.shadowColor = `hsl(${hue},100%,70%)`; ctx.fill();
        ctx.shadowBlur = 0;
      });
      const ringR = Math.min(W, H) * 0.48;
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.5);
      const rg = ctx.createRadialGradient(cx, cy, ringR - 4, cx, cy, ringR + 4);
      rg.addColorStop(0, 'rgba(34,153,255,0)');
      rg.addColorStop(0.5, `rgba(34,153,255,${0.25 * pulse})`);
      rg.addColorStop(1, 'rgba(100,0,255,0)');
      ctx.beginPath(); ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = rg; ctx.lineWidth = 6; ctx.stroke();
      if (Math.random() < 0.35) bolts.push(new BlueBolt());
      bolts = bolts.filter(b => b.life > 0);
      bolts.forEach(b => b.draw());
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return React.createElement('canvas', { ref, className: 'pcard-canvas', style: { zIndex: 2 } });
};

/* ══ 6. PARTICLE BURST ══ */
const ParticleBurst = ({ trigger, color }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!trigger || !ref.current) return;
    const canvas = ref.current;
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    let pts = [], raf;
    for (let i = 0; i < 26; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.2;
      pts.push({ x: W/2, y: H/2, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, life: 1, r: Math.random()*2.5+0.8 });
    }
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      pts = pts.filter(p => p.life > 0);
      if (!pts.length) { cancelAnimationFrame(raf); return; }
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.life -= 0.045;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.globalAlpha = Math.max(0, p.life); ctx.fill();
        ctx.globalAlpha = 1;
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
  }, [trigger]);
  return React.createElement('canvas', { ref, className: 'pcard-canvas', style: { zIndex: 5 } });
};

/* ══ 7. PLAYER CARD ══ */
function PlayerCard({ name, cfg, rank }) {
  const [hov, setHov]         = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const cardRef               = React.useRef(null);
  const lore = PLAYER_LORE[name] || null;

  const isOneAboveAll = rank === 'OneAboveAll';
  const isGOAT        = rank === 'GOAT';
  const isZ           = rank === 'Z';
  const isSSS         = rank === 'SSS';
  const isShayraim    = name === 'Shayraim';
  const isAqualicz    = name === 'Aqualicz';
  // Electric lightning for SS / S+ / S
  const isElectric    = !isOneAboveAll && !isGOAT && !isZ && !isSSS && !isShayraim;
  const cardStyle     = isElectric ? { color: cfg.c1 } : {};

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `translateY(-3px) scale(1.05) perspective(300px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg)`;
  };

  const showTip = () => {
    setHov(true);
    if (!lore) return;
    const tip = document.getElementById('tooltip');
    document.getElementById('tooltip-name').textContent = name;
    document.getElementById('tooltip-name').style.color = isShayraim ? '#40c8ff' : isAqualicz ? '#ff69b4' : cfg.tip;
    document.getElementById('tooltip-text').textContent = lore;
    tip.style.borderLeftColor = isShayraim ? '#2299ff' : isAqualicz ? '#ff69b4' : cfg.tip;
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
    document.getElementById('tooltip').classList.remove('vis');
    if (cardRef.current) cardRef.current.style.transform = '';
  };
  const handleClick = () => { setClicked(true); setTimeout(() => setClicked(false), 700); };

  return React.createElement('div', {
    ref: cardRef,
    className: `pcard${isShayraim ? ' pcard--shayraim' : ''}${isAqualicz ? ' pcard--aqualicz' : ''}`,
    style: cardStyle,
    onMouseEnter: showTip,
    onMouseMove: (e) => { moveTip(e); handleMouseMove(e); },
    onMouseLeave: hideTip,
    onClick: handleClick,
    role: 'button',
    tabIndex: 0,
  },
    React.createElement('span', { className: 'pname' }, name),
    isShayraim  && React.createElement(ShayraimeAura, { active: hov }),
    isAqualicz  && React.createElement(LightningCanvas, { active: hov, col1: '#ff69b4', col2: '#ff1493' }),
    !isAqualicz && isElectric && React.createElement(LightningCanvas, { active: hov, col1: cfg.c1, col2: cfg.c2 }),
    clicked     && React.createElement(ParticleBurst, { trigger: clicked, color: isShayraim ? '#40c8ff' : isAqualicz ? '#ff69b4' : cfg.tip })
  );
}

/* ══ 8. TIER ROW ══ */
function TierRow({ rank, cfg, players, rowIndex, search }) {
  const visible = players.filter(p => p === '=' || p.toLowerCase().includes(search));
  if (visible.length === 0 && search !== '') return null;

  const BIG_RANKS  = ['Splus', 'S', 'SS'];
  const isScrollable = BIG_RANKS.includes(rank) && players.filter(p => p !== '=').length > 20;
  const playerCount  = players.filter(p => p !== '=').length;

  return React.createElement('div', {
    className: `tier-row row-${rank}`,
    style: { animationDelay: `${rowIndex * 0.07}s` },
  },
    React.createElement('div', { className: 'tier-label' },
      React.createElement('span', { className: 'tier-badge' }, cfg.badge),
      React.createElement('span', { className: 'tier-desc' }, cfg.desc),
      React.createElement('span', {
        style: {
          fontSize: '0.55rem', letterSpacing: '2px', opacity: 0.5,
          fontFamily: "'Barlow Condensed',sans-serif", marginTop: '4px',
          background: 'rgba(255,255,255,0.08)', borderRadius: '10px',
          padding: '2px 8px', color: 'inherit',
        }
      }, `${playerCount} players`)
    ),
    React.createElement('div', {
      className: `tier-content${isScrollable ? ' tier-content--scrollable' : ''}`,
    },
      ...visible.map((p, i) =>
        p === '='
          ? React.createElement('span', { key: i, className: 'sep' }, '=')
          : React.createElement(PlayerCard, { key: i, name: p, cfg, rank })
      )
    )
  );
}

/* ══ 9. APP ══ */
function App() {
  const [data,   setData]   = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('ALL');
  const searchRef           = React.useRef(null);

  React.useEffect(() => {
    fetch('players.json')
      .then(r => r.json())
      .then(d => {
        setData(d);
        setTimeout(() => {
          const l = document.getElementById('app-loading');
          if (l) { l.classList.add('hide'); setTimeout(() => l.remove(), 500); }
        }, 300);
      })
      .catch(err => {
        console.error('Failed to load players.json:', err);
        const l = document.getElementById('app-loading');
        if (l) l.querySelector('.loading-txt').textContent = 'ERROR loading data';
      });
  }, []);

  if (!data) return null;

  const allRanks = Object.entries(RANK_CFG);
  const visRanks = filter === 'ALL'
    ? allRanks
    : allRanks.filter(([k]) => k === filter);
  const query = search.toLowerCase();

  const totalVisible = (() => {
    if (!query) return null;
    return Object.values(data).flat().filter(p => p !== '=' && p.toLowerCase().includes(query)).length;
  })();

  const clearSearch = () => {
    setSearch('');
    if (searchRef.current) searchRef.current.value = '';
  };

  return React.createElement('div', null,

    /* HEADER */
    React.createElement('header', null,
      React.createElement('div', { className: 'header-inner' },
        React.createElement('div', { className: 'deco-rune deco-rune--tl', 'aria-hidden': 'true' }, '✦'),
        React.createElement('div', { className: 'deco-rune deco-rune--tr', 'aria-hidden': 'true' }, '✦'),

        React.createElement('div', { className: 'creators' },
          React.createElement('div', { className: 'creator' },
            React.createElement(ProfileCard, { src: 'image/En1LT8kUwAA6CxF.jpg', name: 'Shayraim', isShayraim: true }),
            React.createElement('span', { className: 'creator-name' }, 'Shayraim')
          ),
          React.createElement('div', { className: 'creator' },
            React.createElement(ProfileCard, { src: 'image/b664188f61102fcf384c35504edd570c.jpg', name: 'NecroticHollow' }),
            React.createElement('span', { className: 'creator-name' }, 'NecroticHollow')
          )
        ),

        React.createElement('div', { className: 'header-divider', 'aria-hidden': 'true' },
          React.createElement('span', { className: 'hdiv-line' }),
          React.createElement('span', { className: 'hdiv-diamond' }, '◆'),
          React.createElement('span', { className: 'hdiv-line' })
        ),

        React.createElement('p', { className: 'hero-eyebrow' }, 'Official · 2024 – 2026'),
        React.createElement('h1', { className: 'hero-title' },
          React.createElement('span', { className: 'word-yba' }, 'YBA'),
          React.createElement('span', { className: 'word-tier' }, 'TIER'),
          React.createElement('span', { className: 'word-list' }, 'LIST')
        ),
        React.createElement('p', { className: 'hero-sub' }, 'Your Bizarre Adventure · Legends Ranking'),
        React.createElement('div', { className: 'h-rule' }),
        React.createElement('p', { className: 'disclaimer' },
          React.createElement('b', null, 'DISCLAIMER:'),
          ' Official 2024–2026 player tierlist, subject to change. Placements updated weekly. Rank changes only occur for active players — those who stop playing cannot move down, but may rise depending on the performance of active competitors.'
        )
      )
    ),

    /* SIDE DECOS */
    React.createElement('div', { className: 'side-deco side-deco--left', 'aria-hidden': 'true' },
      React.createElement('div', { className: 'sdeco-label' }, 'RANK'),
      React.createElement('div', { className: 'sdeco-bar' }),
      React.createElement('div', { className: 'sdeco-dots' },
        ['GOAT','Z','SSS','SS','Sp','S'].map(r =>
          React.createElement('div', { key: r, className: `sdeco-dot sdeco-dot--${r}` })
        )
      ),
      React.createElement('div', { className: 'sdeco-bar' }),
      React.createElement('div', { className: 'sdeco-label' }, '2026')
    ),
    React.createElement('div', { className: 'side-deco side-deco--right', 'aria-hidden': 'true' },
      React.createElement('div', { className: 'sdeco-sigil' }, '⬡'),
      React.createElement('div', { className: 'sdeco-sigil sdeco-sigil--sm' }, '⬡'),
      React.createElement('div', { className: 'sdeco-sigil sdeco-sigil--sm' }, '⬡'),
      React.createElement('div', { className: 'sdeco-bar' }),
      React.createElement('div', { className: 'sdeco-label' }, 'YBA')
    ),

    /* CONTROLS */
    React.createElement('div', { className: 'controls' },
      React.createElement('div', { className: 'search-wrap' },
        React.createElement('span', { className: 'search-icon' }, '⌕'),
        React.createElement('input', {
          ref: searchRef,
          className: 'search-input',
          type: 'text',
          placeholder: 'Search player…',
          onChange: e => setSearch(e.target.value),
        }),
        React.createElement('button', {
          className: `search-clear${search ? ' visible' : ''}`,
          onClick: clearSearch,
          'aria-label': 'Clear search',
        }, '✕')
      ),
      React.createElement('div', { className: 'search-count' },
        query && totalVisible !== null && (
          totalVisible === 0 ? 'No players found' : `${totalVisible} player${totalVisible > 1 ? 's' : ''} found`
        )
      ),
      React.createElement('div', { className: 'filters' },
        React.createElement('button', {
          className: `filter-btn${filter === 'ALL' ? ' on' : ''}`,
          style: { '--fc': '#888' },
          onClick: () => setFilter('ALL'),
        }, React.createElement('span', { className: 'btn-fill' }), React.createElement('span', { className: 'btn-label' }, 'ALL')),
        ...allRanks.map(([k, v]) =>
          React.createElement('button', {
            key: k,
            className: `filter-btn${filter === k ? ' on' : ''}`,
            style: { '--fc': v.btnC },
            onClick: () => setFilter(k),
          }, React.createElement('span', { className: 'btn-fill' }), React.createElement('span', { className: 'btn-label' }, v.badge))
        )
      )
    ),

    /* TIERS */
    React.createElement('div', { className: 'tiers' },
      ...visRanks.map(([k, v], i) =>
        React.createElement(TierRow, {
          key: k, rank: k, cfg: v,
          players: data[k] || [],
          rowIndex: i, search: query,
        })
      )
    ),

    /* FOOTER */
    React.createElement('footer', null,
      React.createElement('div', { className: 'footer-ornament' },
        React.createElement('span', { className: 'hdiv-line' }),
        React.createElement('span', { className: 'hdiv-diamond' }, '◆'),
        React.createElement('span', { className: 'hdiv-line' })
      ),
      React.createElement('div', { className: 'credits' },
        'Content by ', React.createElement('span', { className: 'cr' }, 'NYX'),
        '\u00A0\u00A0·\u00A0\u00A0',
        'Website by ', React.createElement('span', { className: 'cb' }, 'SHAYRAIM')
      ),
      React.createElement('div', { className: 'footer-sub' }, 'YBA Legends Tierlist · 2024 – 2026')
    )
  );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));

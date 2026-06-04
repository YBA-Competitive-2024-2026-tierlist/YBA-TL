/**
 * easter.js — Easter Eggs & Hidden Secrets
 *
 * SECRET INDEX (for those reading the source code):
 *
 * [EGG-01] Konami Code         → "ZA WARUDO" time stop
 * [EGG-02] Type "GIORNO"       → Gold rush + Stand cry
 * [EGG-03] Click title 7x      → Star Platinum apparition
 * [EGG-04] DevTools console    → CTF challenge on load
 * [EGG-05] Idle 33s            → The World darkens the screen
 * [EGG-06] Click "=" 5x        → YBA player guessing game
 * [EGG-07] GPS coords in DOM   → Hidden location puzzle
 * [EGG-08] Type "OVERHEAVEN"   → Reality rewrite mode
 * [EGG-09] Inspect .credits    → Hex decode challenge
 * [EGG-10] Type "SHAYRAIM"     → Creator special reveal
 * [EGG-11] Type "ORAORAORAORA" → Site destruction sequence
 * [EGG-12] Silver Chariot      → Hidden blade challenge
 */

(function initEasterEggs() {
  'use strict';

  const state = {
    konamiProgress:   0,
    typedBuffer:      '',
    logoClicks:       0,
    inactive:         null,
    zaWorldoActive:   false,
    overHeavenActive: false,
    oraActive:        false,
    silverClicks:     0,
  };

  const KONAMI = [38,38,40,40,37,39,37,39,66,65];

  /* ══════════════════════════════════════════════
     UTILITIES
  ══════════════════════════════════════════════ */
  function showBanner(lines, color = '#ffd600', duration = 5000) {
    const old = document.getElementById('ee-banner');
    if (old) old.remove();
    const div = document.createElement('div');
    div.id = 'ee-banner';
    div.style.cssText = `
      position:fixed;top:50%;left:50%;
      transform:translate(-50%,-50%) scale(0.7);
      z-index:99999;
      background:rgba(0,0,0,0.97);
      border:2px solid ${color};
      border-radius:10px;
      padding:32px 48px;
      text-align:center;
      font-family:'Cinzel',serif;
      color:${color};
      box-shadow:0 0 60px ${color}44,0 0 120px ${color}22;
      max-width:520px;
      opacity:0;
      transition:opacity 0.4s,transform 0.4s;
      pointer-events:none;
    `;
    div.innerHTML = lines.map((l,i) =>
      `<div style="font-size:${i===0?'1.4':'0.85'}rem;letter-spacing:${i===0?'4':'6'}px;
       margin-bottom:${i===0?'12':'6'}px;opacity:${i===0?1:0.7}">${l}</div>`
    ).join('');
    document.body.appendChild(div);
    requestAnimationFrame(() => {
      div.style.opacity='1';
      div.style.transform='translate(-50%,-50%) scale(1)';
    });
    if (duration > 0) {
      setTimeout(() => {
        div.style.opacity='0';
        div.style.transform='translate(-50%,-50%) scale(0.8)';
        setTimeout(() => div.remove(), 400);
      }, duration);
    }
    return div;
  }

  function rainParticles(emoji, count=40, duration=4000) {
    const c = document.createElement('div');
    c.style.cssText='position:fixed;inset:0;z-index:99998;pointer-events:none;overflow:hidden;';
    document.body.appendChild(c);
    if (!document.getElementById('ee-rain-style')) {
      const s=document.createElement('style');
      s.id='ee-rain-style';
      s.textContent='@keyframes eeRain{to{transform:translateY(110vh) rotate(720deg);opacity:0}}';
      document.head.appendChild(s);
    }
    for (let i=0;i<count;i++) {
      const p=document.createElement('div');
      p.textContent=emoji;
      p.style.cssText=`position:absolute;top:-60px;left:${Math.random()*100}vw;
        font-size:${Math.random()*22+12}px;opacity:${Math.random()*0.7+0.3};
        animation:eeRain ${Math.random()*2+2}s ${Math.random()*3}s linear forwards;`;
      c.appendChild(p);
    }
    setTimeout(()=>c.remove(), duration+3500);
  }

  /* ══════════════════════════════════════════════
     [EGG-04] CONSOLE MESSAGE — CTF on load
  ══════════════════════════════════════════════ */
  (function consoleEgg() {
    setTimeout(() => {
      console.log('%c YBA LEGENDS — SYSTEM ACCESS ',
        'background:#ff003c;color:#fff;font-family:monospace;font-size:14px;padding:4px 12px;border-radius:3px;font-weight:bold');
      const lines = [
        '%c┌─────────────────────────────────────────────────┐',
        '%c│  Welcome, detective.                            │',
        '%c│                                                 │',
        '%c│  There are exactly 12 secrets in this site.    │',
        '%c│                                                 │',
        '%c│  CHALLENGE #1 — Decode this:                   │',
        '%c│  59 42 41 20 4C 45 47 45 4E 44 53              │',
        '%c│                                                 │',
        '%c│  CHALLENGE #2 — Hidden GPS coordinates:        │',
        '%c│  Lat  : 48 + 52/60 + 14/3600                   │',
        '%c│  Long : 2  + 21/60 + 6/3600                    │',
        '%c│  What is at these coordinates?                  │',
        '%c│                                                 │',
        '%c│  CHALLENGE #3 — Konami Code on keyboard.       │',
        '%c│                                                 │',
        '%c│  Final hint : za warudo.                        │',
        '%c└─────────────────────────────────────────────────┘',
      ];
      const st='font-family:monospace;color:#00ff88;font-size:12px';
      lines.forEach((l,i)=>setTimeout(()=>console.log(l,st),i*90));
      setTimeout(()=>{
        console.log('%c[EGG-09] Bonus hint: inspect the .credits element — data-secret awaits','color:#ffd600;font-size:11px;font-style:italic');
      }, lines.length*90+500);
    }, 3500);
  })();

  /* ══════════════════════════════════════════════
     KEYBOARD LISTENER
  ══════════════════════════════════════════════ */
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === KONAMI[state.konamiProgress]) {
      state.konamiProgress++;
      if (state.konamiProgress === KONAMI.length) {
        state.konamiProgress = 0;
        triggerZaWarudo();
      }
    } else {
      state.konamiProgress = e.keyCode===KONAMI[0] ? 1 : 0;
    }
    if (e.key.length===1) {
      state.typedBuffer = (state.typedBuffer + e.key).slice(-30).toUpperCase();
      checkTypedSecrets();
    }
  });

  /* ══════════════════════════════════════════════
     [EGG-01] KONAMI → ZA WARUDO
  ══════════════════════════════════════════════ */
  function triggerZaWarudo() {
    if (state.zaWorldoActive) return;
    state.zaWorldoActive = true;
    document.body.classList.add('za-warudo');
    const s=document.createElement('style');
    s.id='ee-zawarudo';
    s.textContent='.za-warudo *{animation-play-state:paused!important}';
    document.head.appendChild(s);
    const flash=document.createElement('div');
    flash.style.cssText='position:fixed;inset:0;z-index:99997;background:radial-gradient(circle,rgba(255,214,0,0.6)0%,transparent 70%);pointer-events:none;opacity:1;transition:opacity 1s';
    document.body.appendChild(flash);
    setTimeout(()=>{flash.style.opacity='0';},100);
    setTimeout(()=>flash.remove(),1200);
    showBanner([
      '⏸ ZA WARUDO ⏸',
      'TOKI WO TOMARE',
      '',
      '「時よ止まれ」',
      'Dio Brando — Stardust Crusaders',
      '',
      'Time resumes in 5 seconds...',
    ],'#ffd600',-1);
    rainParticles('⏸',30,5000);
    setTimeout(()=>{
      document.body.classList.remove('za-warudo');
      const el=document.getElementById('ee-zawarudo');
      if(el) el.remove();
      state.zaWorldoActive=false;
      const b=document.getElementById('ee-banner');
      if(b){b.style.opacity='0';setTimeout(()=>b.remove(),400);}
      showBanner(['▶ TOKI WA UGOKI DASU ▶','Time resumes its course.'],'#ffffff',2500);
    },5000);
  }

  /* ══════════════════════════════════════════════
     TYPED SECRETS CHECKER
  ══════════════════════════════════════════════ */
  function checkTypedSecrets() {
    const buf = state.typedBuffer;

    // [EGG-02] GIORNO
    if (buf.endsWith('GIORNO')) {
      showBanner([
        '🌟 GIORNO GIOVANNA 🌟',
        'I HAVE A DREAM',
        '',
        '"Sono Giorno Giovanna, e ho un sogno."',
        'Golden Experience — Requiem',
        '',
        'You found easter egg #2 out of 12.',
      ],'#ffd700',6000);
      rainParticles('🌟',50,5000);
      rainParticles('✨',30,6000);
    }

    // [EGG-08] OVERHEAVEN
    if (buf.endsWith('OVERHEAVEN')) triggerOverHeaven();

    // [EGG-10] SHAYRAIM
    if (buf.endsWith('SHAYRAIM')) {
      showBanner([
        '🔵 SHAYRAIM 🔵',
        'CO-CREATOR · RANK S',
        '',
        'Welcome, creator.',
        'The blue aura belongs to you.',
        '',
        'Easter egg #10 unlocked — Found them all?',
      ],'#2299ff',7000);
      rainParticles('🔵',30,4000);
      rainParticles('💙',20,5000);
      // Blue hue shift on the whole site
      document.documentElement.style.transition='filter 0.5s';
      document.documentElement.style.filter='hue-rotate(200deg) saturate(1.3)';
      setTimeout(()=>{
        document.documentElement.style.filter='';
        setTimeout(()=>{document.documentElement.style.transition='';},500);
      },3000);
    }

    // [EGG-11] ORAORAORAORA → site destruction
    if (buf.endsWith('ORAORAORAORA')) triggerOraDestruction();

    // [EGG-12] SILVERCHARIOT
    if (buf.endsWith('SILVERCHARIOT')) triggerSilverChariot();
  }

  /* ══════════════════════════════════════════════
     [EGG-08] OVER HEAVEN
  ══════════════════════════════════════════════ */
  function triggerOverHeaven() {
    if (state.overHeavenActive) return;
    state.overHeavenActive=true;
    document.body.style.filter='invert(1) hue-rotate(180deg)';
    document.body.style.transition='filter 1s';
    showBanner([
      '♦ THE WORLD — OVER HEAVEN ♦',
      'REWRITE REALITY',
      '',
      '"The ultimate truth transcends heaven itself."',
      '— DIO Over Heaven',
      '',
      'Easter egg #8 out of 12. Extremely rare.',
    ],'#ff00ff',-1);
    rainParticles('♦',60,8000);
    setTimeout(()=>{
      document.body.style.filter='';
      state.overHeavenActive=false;
      const b=document.getElementById('ee-banner');
      if(b){b.style.opacity='0';setTimeout(()=>b.remove(),400);}
    },8000);
  }

  /* ══════════════════════════════════════════════
     [EGG-11] ORA ORA ORA — SITE DESTRUCTION
     Star Platinum punches the site into pieces.
     Stages of destruction triggered one by one.
  ══════════════════════════════════════════════ */
  function triggerOraDestruction() {
    if (state.oraActive) return;
    state.oraActive = true;

    const jojoPhrases = [
      ["ORA ORA ORA ORA ORA ORA ORA!", "Star Platinum: The World is displeased.", "Your tier list... is no more."],
      ["NANI?!", "The site cannot withstand this power.", "Structural integrity: compromised."],
      ["やれやれだぜ... Yare yare daze.", "Even Jotaro is done with this website.", "Good grief."],
      ["THIS IS REQUIEM.", "Golden Experience Requiem nullifies all actions.", "You cannot escape this result."],
      ["MUDA MUDA MUDA MUDA MUDA!", "DIO has decided your page is worthless.", "It returns to zero."],
    ];

    // First: show Star Platinum announcement
    showBanner([
      '👊 ORA ORA ORA ORA ORA ORA ORA 👊',
      'STAR PLATINUM — THE WORLD',
      '',
      '"You\'re already dead."',
      '— Jotaro Kujo',
      '',
      'Initiating site destruction sequence...',
    ], '#ff003c', 3500);

    rainParticles('👊', 60, 20000);

    // Inject destruction CSS
    const destStyle = document.createElement('style');
    destStyle.id = 'ee-destruction';
    destStyle.textContent = `
      @keyframes eeTilt    { 0%{transform:rotate(0deg)}100%{transform:rotate(${(Math.random()-0.5)*8}deg) translate(${(Math.random()-0.5)*20}px,${(Math.random()-0.5)*10}px)} }
      @keyframes eeShake   { 0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)} }
      @keyframes eeCrack   { to{opacity:0.15;filter:blur(2px) contrast(2) saturate(0)} }
      @keyframes eeSlide   { to{transform:translateX(-100vw) rotate(-15deg);opacity:0} }
      @keyframes eeExplode { to{transform:scale(0) rotate(${Math.random()*360}deg);opacity:0} }
      @keyframes eeFall    { to{transform:translateY(100vh) rotate(${(Math.random()-0.5)*180}deg);opacity:0} }
      @keyframes eeStatic  { 0%,100%{opacity:1}50%{opacity:0.3} }
      .ee-glitch-text {
        animation: eeShake 0.08s infinite;
        filter: blur(0.5px) contrast(2);
        color: #ff003c !important;
        -webkit-text-fill-color: #ff003c !important;
      }
      .ee-broken {
        animation: eeCrack 1s ease forwards;
      }
    `;
    document.head.appendChild(destStyle);

    // STAGE 1 (3.5s): Screen shake
    setTimeout(() => {
      document.body.style.animation = 'eeShake 0.1s infinite';
      showBanner(jojoPhrases[0], '#ff3333', 3000);
    }, 3500);

    // STAGE 2 (7s): Title glitches and tilts
    setTimeout(() => {
      const title = document.querySelector('.hero-title');
      if (title) {
        title.classList.add('ee-glitch-text');
        title.style.animation = 'eeTilt 0.3s ease-in-out infinite alternate';
      }
      const eyebrow = document.querySelector('.hero-eyebrow');
      if (eyebrow) eyebrow.style.opacity = '0.2';
      showBanner(jojoPhrases[1], '#ff6600', 3000);
    }, 7000);

    // STAGE 3 (10s): Tier rows start falling
    setTimeout(() => {
      document.body.style.animation = 'eeShake 0.07s infinite';
      const rows = document.querySelectorAll('.tier-row');
      rows.forEach((row, i) => {
        setTimeout(() => {
          const dir = Math.random() < 0.5 ? 'eeSlide' : 'eeFall';
          row.style.animation = `${dir} ${0.6 + Math.random()*0.4}s ease forwards`;
        }, i * 180);
      });
      showBanner(jojoPhrases[2], '#ffffff', 3000);
    }, 10000);

    // STAGE 4 (14s): Controls disappear, creators fall
    setTimeout(() => {
      const controls = document.querySelector('.controls');
      if (controls) controls.style.animation = 'eeFall 0.8s ease forwards';
      const creators = document.querySelector('.creators');
      if (creators) {
        creators.querySelectorAll('.creator').forEach((c, i) => {
          setTimeout(() => { c.style.animation = 'eeExplode 0.5s ease forwards'; }, i * 300);
        });
      }
      // Add scan lines artifact
      const glitch = document.createElement('div');
      glitch.style.cssText = `
        position:fixed;inset:0;z-index:9990;pointer-events:none;
        background:repeating-linear-gradient(0deg,rgba(255,0,0,0.08) 0px,transparent 2px,transparent 4px);
        animation:eeStatic 0.15s infinite;
      `;
      document.body.appendChild(glitch);
      showBanner(jojoPhrases[3], '#ff00ff', 3000);
    }, 14000);

    // STAGE 5 (18s): Header title explodes, site goes dark
    setTimeout(() => {
      const header = document.querySelector('header');
      if (header) header.style.animation = 'eeFall 1s ease forwards';
      document.body.style.animation = 'eeShake 0.05s infinite';
      document.documentElement.style.filter = 'contrast(3) saturate(0) brightness(0.3)';
      showBanner(jojoPhrases[4], '#ff003c', 3500);
    }, 18000);

    // FINAL (22s): Black screen + Jotaro end screen
    setTimeout(() => {
      // Kill all remaining animations
      document.body.style.animation = 'none';
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 1s';
      document.documentElement.style.filter = '';
    }, 22000);

    setTimeout(() => {
      // Replace the entire body with the end screen
      document.body.innerHTML = `
        <div style="
          min-height:100vh;background:#000;
          display:flex;flex-direction:column;
          align-items:center;justify-content:center;
          font-family:'Cinzel',serif;text-align:center;
          padding:40px;gap:28px;
        ">
          <div style="font-size:5rem;line-height:1">ゴゴゴゴ</div>
          <div style="font-size:clamp(1.5rem,5vw,3.5rem);color:#fff;letter-spacing:6px;
            text-shadow:0 0 40px rgba(255,0,0,0.5)">
            STAR PLATINUM
          </div>
          <div style="font-size:1rem;color:#ff003c;letter-spacing:8px">THE WORLD</div>
          <div style="width:200px;height:1px;background:linear-gradient(90deg,transparent,#ff003c,transparent)"></div>
          <div style="font-size:0.9rem;color:rgba(255,255,255,0.6);letter-spacing:4px;max-width:480px;line-height:2">
            "やれやれだぜ."<br>
            Good grief.<br>
            You typed ORA 4 times.<br>
            This is what you wanted.
          </div>
          <div style="font-size:0.7rem;color:rgba(255,255,255,0.25);letter-spacing:6px;margin-top:20px">
            EASTER EGG #11 · SITE DESTRUCTION COMPLETE
          </div>
          <div style="margin-top:30px">
            <button onclick="location.reload()" style="
              font-family:'Cinzel',serif;
              font-size:0.8rem;letter-spacing:4px;
              padding:14px 36px;
              background:transparent;
              border:1px solid rgba(255,0,60,0.5);
              color:rgba(255,80,80,0.8);
              border-radius:4px;cursor:pointer;
              transition:all 0.2s;
            "
            onmouseover="this.style.background='rgba(255,0,60,0.1)';this.style.borderColor='#ff003c'"
            onmouseout="this.style.background='transparent';this.style.borderColor='rgba(255,0,60,0.5)'"
            >
              ▶ RESTORE TIMELINE
            </button>
          </div>
          <div style="font-size:0.55rem;color:rgba(255,255,255,0.1);letter-spacing:3px;margin-top:8px">
            Hint: there are still 12 secrets total. You found one the hard way.
          </div>
        </div>
      `;
      document.body.style.opacity = '1';
      document.body.style.transition = 'opacity 1.5s';
    }, 23000);
  }

  /* ══════════════════════════════════════════════
     [EGG-12] SILVER CHARIOT — hidden blade puzzle
     Polnareff's Stand. Fastest blade in existence.
     The challenge: react within 0.8 seconds.
  ══════════════════════════════════════════════ */
  function triggerSilverChariot() {
    // First: set up the challenge overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;z-index:99999;
      background:rgba(0,0,0,0.96);
      display:flex;align-items:center;justify-content:center;
      flex-direction:column;gap:20px;
      font-family:'Cinzel',serif;text-align:center;
      padding:40px;
    `;
    overlay.innerHTML = `
      <div style="font-size:3rem;letter-spacing:2px;color:#c0c0c0;
        text-shadow:0 0 30px rgba(192,192,192,0.6)">⚔</div>
      <div style="font-size:1.8rem;color:#c0c0c0;letter-spacing:6px">SILVER CHARIOT</div>
      <div style="font-size:0.7rem;color:rgba(255,255,255,0.4);letter-spacing:5px">
        JEAN PIERRE POLNAREFF · STARDUST CRUSADERS
      </div>
      <div style="width:160px;height:1px;background:linear-gradient(90deg,transparent,#c0c0c0,transparent)"></div>
      <div style="font-size:0.85rem;color:rgba(255,255,255,0.7);letter-spacing:3px;line-height:2;max-width:420px">
        "My Silver Chariot's blade is the fastest in existence."<br>
        <span style="color:rgba(255,255,255,0.35);font-size:0.7rem">— Jean Pierre Polnareff</span>
      </div>
      <div style="font-size:0.75rem;color:#ffd600;letter-spacing:4px;margin-top:10px">
        CHALLENGE: Click the blade before it disappears.<br>
        <span style="font-size:0.65rem;color:rgba(255,214,0,0.5)">You have 0.8 seconds. Good luck.</span>
      </div>
      <div id="sc-arena" style="
        position:relative;width:360px;height:200px;
        border:1px solid rgba(192,192,192,0.2);border-radius:8px;
        background:rgba(255,255,255,0.02);margin-top:8px;overflow:hidden;
      "></div>
      <div id="sc-result" style="font-size:0.8rem;min-height:30px;letter-spacing:4px"></div>
      <div id="sc-score" style="font-size:0.65rem;color:rgba(255,255,255,0.3);letter-spacing:3px">
        Attempts: 0 | Hits: 0
      </div>
      <div style="display:flex;gap:16px;margin-top:8px">
        <button id="sc-start" style="
          font-family:'Cinzel',serif;font-size:0.75rem;letter-spacing:3px;
          padding:10px 28px;background:rgba(192,192,192,0.1);
          border:1px solid rgba(192,192,192,0.4);color:#c0c0c0;
          border-radius:4px;cursor:pointer;
        ">START ROUND</button>
        <button id="sc-close" style="
          font-family:'Cinzel',serif;font-size:0.75rem;letter-spacing:2px;
          padding:10px 20px;background:transparent;
          border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.3);
          border-radius:4px;cursor:pointer;
        ">RETREAT</button>
      </div>
    `;
    document.body.appendChild(overlay);

    let attempts = 0, hits = 0, round = 0;
    const arena   = overlay.querySelector('#sc-arena');
    const result  = overlay.querySelector('#sc-result');
    const score   = overlay.querySelector('#sc-score');
    const startBtn = overlay.querySelector('#sc-start');

    function updateScore() {
      score.textContent = `Attempts: ${attempts} | Hits: ${hits}`;
    }

    function spawnBlade() {
      // Random position inside arena
      const x = Math.random() * 300 + 20;
      const y = Math.random() * 140 + 20;
      const blade = document.createElement('div');
      blade.textContent = '⚔';
      blade.style.cssText = `
        position:absolute;
        left:${x}px;top:${y}px;
        font-size:${Math.random()*18+20}px;
        cursor:crosshair;
        color:#c0c0c0;
        text-shadow:0 0 20px rgba(192,192,192,0.9);
        transform:rotate(${Math.random()*360}deg);
        transition:none;
        user-select:none;
        z-index:10;
      `;
      arena.appendChild(blade);

      // Flash in
      let alive = true;
      const timeout = setTimeout(() => {
        if (alive) {
          alive = false;
          blade.remove();
          attempts++;
          result.style.color = '#ff5555';
          result.textContent = '✗ TOO SLOW. Silver Chariot\'s blade has already vanished.';
          updateScore();
          startBtn.disabled = false;
          startBtn.textContent = 'NEXT ROUND';
        }
      }, round < 3 ? 800 : round < 6 ? 550 : 350); // gets harder

      blade.addEventListener('click', () => {
        if (!alive) return;
        alive = false;
        clearTimeout(timeout);
        blade.remove();
        attempts++; hits++;
        result.style.color = '#c0c0c0';
        result.innerHTML = `✓ INCREDIBLE SPEED!<br>
          <span style="font-size:0.7rem;color:rgba(192,192,192,0.5)">
          "Not bad. But can you keep up?" — Polnareff</span>`;
        updateScore();

        // Victory at 5 hits
        if (hits >= 5) {
          setTimeout(() => {
            overlay.innerHTML = `
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;
                gap:24px;min-height:100vh;font-family:'Cinzel',serif;text-align:center;padding:40px">
                <div style="font-size:4rem">⚔</div>
                <div style="font-size:2rem;color:#c0c0c0;letter-spacing:6px">SILVER CHARIOT MASTERED</div>
                <div style="width:200px;height:1px;background:linear-gradient(90deg,transparent,#c0c0c0,transparent)"></div>
                <div style="font-size:0.85rem;color:rgba(255,255,255,0.65);letter-spacing:3px;line-height:2;max-width:480px">
                  "Mon ami, you have the speed of a true Stand user."<br>
                  <span style="font-size:0.7rem;color:rgba(255,255,255,0.3)">— Jean Pierre Polnareff</span>
                </div>
                <div style="font-size:0.7rem;color:#ffd600;letter-spacing:4px;margin-top:10px">
                  EASTER EGG #12 FULLY UNLOCKED
                </div>
                <div style="font-size:0.65rem;color:rgba(255,255,255,0.2);letter-spacing:3px">
                  Final score: ${hits}/${attempts} — Accuracy: ${Math.round(hits/attempts*100)}%
                </div>
                <button onclick="this.closest('div[style]').remove()" style="
                  font-family:'Cinzel',serif;font-size:0.8rem;letter-spacing:4px;
                  padding:12px 32px;background:transparent;
                  border:1px solid rgba(192,192,192,0.4);color:#c0c0c0;
                  border-radius:4px;cursor:pointer;margin-top:10px;
                ">SHEATHE THE BLADE</button>
              </div>
            `;
            rainParticles('⚔', 40, 4000);
            rainParticles('✦', 30, 5000);
          }, 1500);
        } else {
          startBtn.disabled = false;
          startBtn.textContent = 'NEXT ROUND';
        }
      });

      return blade;
    }

    startBtn.addEventListener('click', () => {
      if (hits >= 5) return;
      round++;
      result.textContent = '';
      startBtn.disabled = true;
      startBtn.textContent = 'INCOMING...';
      // Brief delay before blade appears (unpredictable)
      const delay = Math.random() * 600 + 200;
      setTimeout(spawnBlade, delay);
    });

    overlay.querySelector('#sc-close').addEventListener('click', () => overlay.remove());
  }

  /* ══════════════════════════════════════════════
     [EGG-03] CLICK TITLE 7× → Star Platinum
  ══════════════════════════════════════════════ */
  function initLogoEgg() {
    const title = document.querySelector('.hero-title');
    if (!title) return setTimeout(initLogoEgg, 500);
    title.style.cursor = 'pointer';
    title.addEventListener('click', () => {
      state.logoClicks++;
      title.style.transform=`scale(${1+state.logoClicks*0.015}) rotate(${(Math.random()-0.5)*3}deg)`;
      setTimeout(()=>{title.style.transform='';},200);
      if (state.logoClicks===7) {
        state.logoClicks=0;
        showStandOverlay();
      }
    });
  }

  function showStandOverlay() {
    const overlay=document.createElement('div');
    overlay.style.cssText=`
      position:fixed;inset:0;z-index:99998;
      background:rgba(0,0,0,0.93);
      display:flex;align-items:center;justify-content:center;
      flex-direction:column;gap:20px;cursor:pointer;
      font-family:'Cinzel',serif;
    `;
    overlay.innerHTML=`
      <div style="font-size:7rem;line-height:1;filter:drop-shadow(0 0 30px #ffd600)">ゴゴゴゴ</div>
      <div style="font-size:clamp(2rem,5vw,4rem);color:#ffd600;
        text-shadow:0 0 40px #ffd60099;letter-spacing:6px">STAR PLATINUM</div>
      <div style="font-size:1rem;color:#fff;letter-spacing:8px;opacity:0.7">ORA ORA ORA ORA ORA</div>
      <div style="font-size:0.65rem;color:rgba(255,255,255,0.35);letter-spacing:4px;margin-top:20px">
        Easter egg #3 · Click to close
      </div>
    `;
    overlay.style.opacity='0';overlay.style.transition='opacity 0.4s';
    document.body.appendChild(overlay);
    requestAnimationFrame(()=>{overlay.style.opacity='1';});
    let fl=0;
    const fi=setInterval(()=>{
      overlay.style.background=fl%2===0?'rgba(80,60,0,0.95)':'rgba(0,0,0,0.93)';
      fl++;if(fl>8)clearInterval(fi);
    },120);
    overlay.addEventListener('click',()=>{
      overlay.style.opacity='0';setTimeout(()=>overlay.remove(),400);
    });
  }
  setTimeout(initLogoEgg, 4000);

  /* ══════════════════════════════════════════════
     [EGG-05] IDLE 33s → The World darkens
  ══════════════════════════════════════════════ */
  function resetInactivity() {
    clearTimeout(state.inactive);
    state.inactive=setTimeout(()=>{
      if(state.zaWorldoActive||state.oraActive)return;
      const overlay=document.createElement('div');
      overlay.id='ee-inactive';
      overlay.style.cssText='position:fixed;inset:0;z-index:9998;background:rgba(0,0,20,0);transition:background 2s;pointer-events:none;';
      document.body.appendChild(overlay);
      requestAnimationFrame(()=>{overlay.style.background='rgba(0,0,20,0.75)';});
      const msg=document.createElement('div');
      msg.style.cssText='position:fixed;bottom:40px;left:50%;transform:translateX(-50%);font-family:"Cinzel",serif;font-size:0.75rem;letter-spacing:8px;color:rgba(255,214,0,0.6);z-index:9999;pointer-events:none;opacity:0;transition:opacity 1s;';
      msg.textContent='「時よ止まれ」— THE WORLD';
      document.body.appendChild(msg);
      setTimeout(()=>{msg.style.opacity='1';},100);
      const resume=()=>{
        overlay.style.background='rgba(0,0,0,0)';msg.style.opacity='0';
        setTimeout(()=>{overlay.remove();msg.remove();},2000);
        ['mousemove','keydown','click'].forEach(ev=>document.removeEventListener(ev,resume));
        resetInactivity();
      };
      ['mousemove','keydown','click'].forEach(ev=>document.addEventListener(ev,resume));
    },33000);
  }
  ['mousemove','keydown','click','scroll','touchstart'].forEach(ev=>{
    document.addEventListener(ev,resetInactivity,{passive:true});
  });
  resetInactivity();

  /* ══════════════════════════════════════════════
     [EGG-06] CLICK "=" 5× → YBA Guessing Game
  ══════════════════════════════════════════════ */
  const YBA_PLAYERS=['Sub / SMG','Elfish','JL7','Tornado','Kono','Prayer','Digger','Flare','Sinnkow','MasterKlinge','Zenwydd','Vano','RAZE','Preqnox'];
  function initSepEgg() {
    const obs=new MutationObserver(()=>{
      document.querySelectorAll('.sep:not([data-ee])').forEach(sep=>{
        sep.setAttribute('data-ee','1');
        let cl=0;
        sep.addEventListener('click',e=>{
          e.stopPropagation();cl++;
          sep.style.transform=`scale(${1+cl*0.15})`;
          setTimeout(()=>{sep.style.transform='';},150);
          if(cl>=5){cl=0;launchMiniGame();}
        });
      });
    });
    obs.observe(document.body,{childList:true,subtree:true});
  }
  function launchMiniGame() {
    const answer=YBA_PLAYERS[Math.floor(Math.random()*YBA_PLAYERS.length)];
    const box=document.createElement('div');
    box.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99999;background:rgba(3,2,18,0.98);border:1px solid rgba(255,214,0,0.4);border-left:3px solid #ffd600;border-radius:0 10px 10px 0;padding:28px 36px;font-family:"Cinzel",serif;color:#e8e3f5;min-width:360px;box-shadow:0 0 40px rgba(255,214,0,0.15);';
    box.innerHTML=`
      <div style="color:#ffd600;font-size:0.7rem;letter-spacing:5px;margin-bottom:16px">🎮 SECRET MINI-GAME · EGG #6</div>
      <div style="font-size:0.9rem;line-height:1.7;color:rgba(255,255,255,0.75);margin-bottom:20px">
        Guess the YBA player:<br>
        <span id="ee-hint" style="font-size:1.2rem;letter-spacing:8px;color:#ffd600;font-weight:bold">${answer.replace(/[a-zA-Z]/g,'_')}</span><br>
        <span style="font-size:0.65rem;color:rgba(255,255,255,0.35)">${answer.length} letters</span>
      </div>
      <input id="ee-input" type="text" placeholder="Your guess..." style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:10px 14px;border-radius:5px;font-family:'Cinzel',serif;font-size:0.9rem;outline:none;letter-spacing:2px;"/>
      <div style="display:flex;gap:10px;margin-top:14px">
        <button id="ee-guess" style="flex:1;padding:10px;background:#ffd600;color:#000;border:none;border-radius:5px;font-family:'Cinzel',serif;font-size:0.8rem;letter-spacing:2px;cursor:pointer;font-weight:bold;">GUESS</button>
        <button id="ee-close" style="padding:10px 16px;background:transparent;color:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.1);border-radius:5px;cursor:pointer;font-size:0.8rem;">✕</button>
      </div>
      <div id="ee-result" style="margin-top:14px;font-size:0.8rem;min-height:20px;text-align:center"></div>
    `;
    document.body.appendChild(box);
    let attempts=0;
    const input=box.querySelector('#ee-input'), result=box.querySelector('#ee-result');
    input.focus();
    const guess=()=>{
      attempts++;
      if(input.value.trim().toUpperCase()===answer.toUpperCase()){
        result.style.color='#00d97e';
        result.textContent=`✓ Correct in ${attempts} attempt${attempts>1?'s':''}! It was ${answer}.`;
        rainParticles('✨',30,3000);
        setTimeout(()=>box.remove(),3000);
      } else {
        result.style.color='#ff5555';
        result.textContent=`✗ Wrong. Attempt ${attempts}. Hint: starts with "${answer[0]}"`;
        input.value='';input.focus();
        box.style.borderLeftColor='#ff003c';
        setTimeout(()=>{box.style.borderLeftColor='#ffd600';},500);
      }
    };
    box.querySelector('#ee-guess').addEventListener('click',guess);
    input.addEventListener('keydown',e=>{if(e.key==='Enter')guess();});
    box.querySelector('#ee-close').addEventListener('click',()=>box.remove());
  }
  initSepEgg();

  /* ══════════════════════════════════════════════
     [EGG-07] GPS coords hidden in DOM
  ══════════════════════════════════════════════ */
  setTimeout(()=>{
    const root=document.getElementById('root');
    if(root){
      root.setAttribute('data-coords', btoa('48.8584° N, 2.2945° E — You should have gone looking, no?'));
    }
    document.body.insertBefore(
      document.createComment(' [EGG-07] COORDS: 48.8584, 2.2945 — Decode the data-coords on #root '),
      document.body.firstChild
    );
  },4000);

  /* ══════════════════════════════════════════════
     [EGG-09] data-secret on .credits
  ══════════════════════════════════════════════ */
  setTimeout(()=>{
    const credits=document.querySelector('.credits');
    if(credits){
      credits.setAttribute('data-secret','4269656e206a6f756521 436f64653a204f52414f52414f52414f5241');
      credits.setAttribute('title','Hint: inspect this element 👀');
    }
  },4500);

  /* ══════════════════════════════════════════════
     GLOBAL HELPER — console
  ══════════════════════════════════════════════ */
  window.__ybaEggs = {
    total: 12,
    hint: () => {
      console.log('%c[YBA SECRETS] Here are your hints:', 'color:#ffd600;font-size:13px;font-weight:bold');
      [
        '[01] Konami Code on keyboard (classic)',
        '[02] Type GIORNO anywhere',
        '[03] Click the YBA TIERLIST title 7 times',
        '[04] Read the console on page load (you\'re here!)',
        '[05] Leave the site idle for 33 seconds',
        '[06] Click a = separator 5 times',
        '[07] Find the hidden GPS coordinates in the DOM',
        '[08] Type OVERHEAVEN (no space)',
        '[09] Inspect the .credits element in DevTools',
        '[10] Type SHAYRAIM in the search bar',
        '[11] Type ORAORAORAORA anywhere (dangerous...)',
        '[12] Type SILVERCHARIOT anywhere',
      ].forEach((h,i)=>setTimeout(()=>console.log(`%c  ${h}`,'color:#88ff88;font-family:monospace;font-size:11px'),i*80));
    },
    decode: hex => {
      try { return hex.replace(/\s/g,'').match(/.{2}/g).map(b=>String.fromCharCode(parseInt(b,16))).join(''); }
      catch(e) { return 'Invalid format'; }
    },
    base64: str => { try { return atob(str); } catch(e) { return 'Invalid base64'; } }
  };

  setTimeout(()=>{
    console.log('%c[YBA] Type __ybaEggs.hint() for hints, __ybaEggs.decode(hex) to decode.','color:rgba(255,255,255,0.3);font-size:10px;font-style:italic');
  },6000);

})();

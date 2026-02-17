// CONFIGURATION DES RANGS
const rankConfig = {
    // GOATS : Label BLANC/NOIR, Fond du row NOIR (géré par CSS), Texte RAINBOW (type glitch)
    GOATS: { label: "GOATS: Greatest Players of the 2024 - 2026 Era.", color: "#000000", bg: "#ffffff", desc: "The legends.", type: "glitch", btnColor: "#ffffff" },
    // SSS : Transparent + Shading (géré par CSS), Texte Rainbow
    SSS: { label: "SSS: Finest Talent Of Our Time.", color: "#fff", bg: "transparent", desc: "The strongest force.", type: "god", btnColor: "#ff0055" },
    
    // Autres rangs
    SS: { label: "SS: Premier Star Of This Generation.", color: "#fff", bg: "#600", desc: "A true fiend.", type: "electric", c1: "#ff0000", c2: "#000", btnColor: "#ff0000" },
    Splus: { label: "S+ Unmatched Player Of This Age.", color: "#fff", bg: "#d35400", desc: "Smartest in combat.", type: "electric", c1: "#ffaa00", c2: "#000", btnColor: "#ffaa00" },
    S: { label: "S: Elite Competitor Of Our Era.", color: "#fff", bg: "#e67e22", desc: "Unmatched adaptation.", type: "electric", c1: "#ffff00", c2: "#000", btnColor: "#ffff00" },
    A: { label: "A: Worthy Opponent.", color: "#fff", bg: "#8e44ad", desc: "Strong contender.", type: "electric", c1: "#aa00ff", c2: "#000", btnColor: "#aa00ff" },
    B: { label: "B: Pinnacle Performer of this rank.", color: "#fff", bg: "#2980b9", desc: "Solid performance.", type: "electric", c1: "#0000ff", c2: "#000", btnColor: "#0088ff" },
    C: { label: "C Players who are still yet to achieve their prime.", color: "#fff", bg: "#27ae60", desc: "Future primes.", type: "electric", c1: "#00ff00", c2: "#000", btnColor: "#00ff00" }
};

const playerDetails = {
    "Nyx (Ragebait)": "This player has been playing since 2019. They have created a tierlist in the past, gaining instant fame across all of YBA. This placement is not for real, and do not take it seriously. They are one of, if not the smartest player of their time, quickly adapting to situations, although not as good as those in this tier alongside them.",
    "Pendant (2024)": "This player has been playing consistently since 2019 up to 2024. This player has the absolute best performance in terms of combat amongst ALL Your Bizzare Adventure players, in 2024, before they have quit.",
    "MasterKlinge (2024)": "This player has been consistently playing since 2019, up to 2024. Unfortunately they have quit, but have left us with one of the highest expectations for YBA combat in the new era. They will be missed greatly.",
    "Kono (2024)": "This player has been consistently playing since 2019, up to 2024. They have also quit the game, but have have kept a standard for the top 3 strongest GER users of all time. Unmatched, truly.",
    "Digger": "This player has been playing consistently throughout the worst generation, 2025 - 2026. They have kept the bar high for the strongest Sp title, absolutely unmatched, and unfightable. Dare I say, unkillable even.",
    "Sinnkow (2024)": "This player has left us at 2024. They have completely obliterated most opponents below them, rightfully earning their placement in the GOATs tier.",
    "Tornado (2024 - 2025)": "This player has left us in the worst generation, the 2025 era. But, you may have seen them around, here or there. They are the definition of Stand On Business. Killing all below them without mercy.",
    "JL7 (Jameslol7, 2024/2025)": "This player has been consistently playing since 2019 all the way up to late 2025. They are known as the highest overall combat intelligence killer. No matter how you try to fight them, you are garuenteed to lose. By far the smartest YBA player to come since the creation of the game.",
    "Zenwydd (2024 - 2025)": "Power radiated from them like heat from a furnace. Constant, consuming, impossible to ignore. Absolute domination in combat, leaving little to no errors.",
    "Vano (2024)": "This player is a one man army. They alone carry the strength of all SS tiers. High intelligence, quick analysis of weakness in combat, fast killer.",
    "Elfish": "This player has been playing since 2019, known as the adaptive king. In any situation, they can outsmart their opponent. A quote from others describing him: Fool me once, shame on you. Fool me twice, shame on you. Fool me three times, shame on me.",
    "RAZE": "The new silent killer. A person hidden beneath all the YBA icons. His victory is near-certain, but his name is not as known as the others. He alone, competes with all, but may lose his edge quickly..."
};

const HakiCanvas = ({ isHovering, color1, color2 }) => {
    const canvasRef = React.useRef(null);
    React.useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return;
        const width = canvas.offsetWidth; const height = canvas.offsetHeight;
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        let id; let bolts = [];
        const random = (min, max) => Math.random() * (max - min) + min;

        class Bolt {
            constructor() {
                const startLeft = Math.random() < 0.5;
                this.x = startLeft ? -10 : width + 10;
                this.angle = startLeft ? random(-0.2, 0.2) : Math.PI + random(-0.2, 0.2);
                this.y = height / 2; this.life = 1; this.decay = random(0.08, 0.15);
                this.path = []; let currX = this.x; let currY = this.y;
                for (let i = 0; i < 8; i++) {
                    let sX = currX + (width * 0.7 / 8) * (startLeft ? 1 : -1) + random(-10, 10);
                    let sY = currY + random(-15, 15);
                    this.path.push({x: sX, y: sY}); currX = sX; currY = sY;
                }
            }
            draw() {
                this.life -= this.decay; if (this.life <= 0) return;
                ctx.beginPath(); ctx.moveTo(this.x, this.y);
                this.path.forEach(p => ctx.lineTo(p.x, p.y));
                ctx.globalAlpha = this.life; ctx.lineCap = 'round';
                
                let auraColor = color1;
                if (color1 === "rainbow") {
                    auraColor = `hsl(${(Date.now() / 5) % 360}, 100%, 50%)`;
                }

                ctx.lineWidth = random(8, 14); ctx.strokeStyle = auraColor; ctx.stroke();
                ctx.lineWidth = random(2, 4); ctx.strokeStyle = color2; ctx.stroke();
            }
        }
        const render = () => {
            ctx.clearRect(0, 0, width, height);
            if (isHovering && Math.random() < 0.45) bolts.push(new Bolt());
            bolts = bolts.filter(b => b.life > 0); bolts.forEach(b => b.draw());
            id = window.requestAnimationFrame(render);
        };
        render(); return () => window.cancelAnimationFrame(id);
    }, [isHovering, color1, color2]);
    return <canvas ref={canvasRef} className="haki-canvas" />;
};

function PlayerCard({ player, config, handleMouseMove, handleMouseLeave }) {
    const [hover, setHover] = React.useState(false);
    const currentDesc = playerDetails[player] || config.desc;
    
    let cardTypeClass = "";
    if (config.type === 'glitch') cardTypeClass = "glitch-tier";
    else if (config.type === 'god') cardTypeClass = "god-tier";
    else cardTypeClass = "electric-tier";

    const cardClass = `player-card ${cardTypeClass}`;

    return (
        <div className={cardClass} style={config.type === 'electric' ? { '--text-color': config.c1 } : {}}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); handleMouseLeave(); }}
            onMouseMove={(e) => handleMouseMove(e, currentDesc)}>
            <span>{player}</span>
            {config.type === 'electric' && <HakiCanvas isHovering={hover} color1={config.c1} color2={config.c2} />}
        </div>
    );
}

function App() {
    const [search, setSearch] = React.useState("");
    const [data, setData] = React.useState(null);
    const [active, setActive] = React.useState("ALL");
    const [tip, setTip] = React.useState({ show: false, text: "", x: 0, y: 0 });

    React.useEffect(() => { fetch('players.json').then(r => r.json()).then(setData); }, []);

    if (!data) return <div className="text-white text-center mt-5">Loading...</div>;

    const visibleRanks = Object.entries(rankConfig).filter(([k]) => active === "ALL" || active === k);

    return (
        <div className="container-fluid p-0">
            <div className="bg-fixed"><div className="bg-grid"></div></div>
            {tip.show && <div className="custom-tooltip" style={{ top: tip.y, left: tip.x }}>{tip.text}</div>}
            <header className="hero-section container">
                <div className="profile-header">
                    <div className="profile-content">
                        <div className="profile-image-container"><img src="image/En1LT8kUwAA6CxF.jpg" className="profile-img" /><p>SHAYRAIM</p></div>
                        <div className="profile-image-container"><img src="image/IMG_2497.jpeg" className="profile-img" /><p>NYX</p></div>
                        <h1 className="profile-title">YBA Tier List</h1>
                        <div className="disclaimer-box"><p><strong>Disclaimer:</strong> OFFICIAL 2024 - 2026 player tierlist, subject to change. Placements are updated weekly. Rank changes only occur for active players; those who stop playing cannot move down, but may rise depending on the performance of active competitors.</p></div>
                    </div>
                </div>
                <h1 className="hero-title"><br/>TIERLIST</h1>
                <div className="controls-area text-center">
                    <input type="text" className="custom-search" placeholder="Search player..." onChange={e => setSearch(e.target.value.toLowerCase())} />
                    <div className="filter-container">
                        <button className="filter-btn" onClick={() => setActive("ALL")}>ALL</button>
                        {Object.entries(rankConfig).map(([k, v]) => (
                            <button key={k} className={`filter-btn ${active === k ? "active" : ""}`} onClick={() => setActive(k)} style={{ color: v.btnColor }}>{k}</button>
                        ))}
                    </div>
                </div>
            </header>
            <div className="container pb-5">
                {visibleRanks.map(([k, v], index) => {
                    const list = (data[k] || []).filter(p => p.toLowerCase().includes(search));
                    if (list.length === 0 && search !== "") return null;
                    
                    const nextRankEntry = visibleRanks[index + 1];
                    // Calcul du fade : On utilise une couleur sombre par défaut si transparent
                    let currentBg = v.bg === 'transparent' ? 'rgba(0,0,0,0.5)' : v.bg;
                    if (k === 'GOATS') currentBg = '#000000'; // Fade démarre du noir pour GOATS

                    let nextBg = nextRankEntry ? (nextRankEntry[1].bg === 'transparent' ? 'rgba(0,0,0,0.5)' : nextRankEntry[1].bg) : null;

                    const fadeStyle = nextBg ? {
                        background: `linear-gradient(to bottom, ${currentBg}, ${nextBg})`
                    } : null;

                    return (
                        <React.Fragment key={k}>
                            <div className={`tier-row tier-row-${k}`}>
                                <div className="tier-label" style={{ background: v.bg, color: v.color }}>{v.label}</div>
                                <div className="tier-content">
                                    {list.map((p, i) => p === "=" ? <div key={i} className="tier-separator">=</div> : <PlayerCard key={i} player={p} config={v} handleMouseMove={(e,d) => setTip({show:true,text:d,x:e.clientX+20,y:e.clientY+20})} handleMouseLeave={()=>setTip({show:false})} />)}
                                </div>
                            </div>
                            {fadeStyle && active === "ALL" && <div className="tier-fade" style={fadeStyle}></div>}
                        </React.Fragment>
                    );
                })}
            </div>
            <footer className="text-center text-secondary py-4">
                <div className="credit-box">
                    <div>Content by <strong style={{color: '#ff0055'}}>NYX</strong></div>
                    <div>Website by <strong style={{color: '#00f3ff'}}>SHAYRAIM</strong></div>
                </div>
            </footer>
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
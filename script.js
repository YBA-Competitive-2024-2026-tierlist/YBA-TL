// CONFIGURATION HAKI SOMBRE (Aura Couleur + Coeur Noir)
const rankConfig = {
    GOATS: { 
        label: "GOATS: Greatest Players of the 2024 - 2026 Era.", 
        color: "#ffffff", bg: "linear-gradient(135deg, #000000, #aaa)", 
        desc: "This player is among the greatest of the 2024 to 2026 era.", 
        type: "god", btnColor: "#ffffff" 
    },
    SSS: { 
        label: "SSS: Finest Talent Of Our Time.", 
        color: "#fff", bg: "#111", 
        desc: "This player is an icon of one of the strongest eras: 2024 to 2026", 
        type: "god", btnColor: "#ff0055" 
    },
    SS: { 
        label: "SS: Premier Star Of This Generation.", 
        color: "#fff", bg: "#600", 
        desc: "This player is a fiend, and can easily destroy all ranks below him", 
        type: "electric", color1: "#ff0000", color2: "#000000", btnColor: "#ff0000"
    },
    Splus: { 
        label: "S+ Unmatched Player Of This Age.", 
        color: "#fff", bg: "#d35400", 
        desc: "This player is one of the smartest in combat intelligence, and can win against most below him.", 
        type: "electric", color1: "#ffaa00", color2: "#000000", btnColor: "#ffaa00"
    },
    S: { 
        label: "S: Elite Competitor Of Our Era.", 
        color: "#fff", bg: "#e67e22", 
        desc: "This player is one of the smartest in combat intelligence, and can win against most below him.", 
        type: "electric", color1: "#ffff00", color2: "#000000", btnColor: "#ffff00"
    },
    A: { 
        label: "A: Worthy Opponent.", 
        color: "#fff", bg: "#8e44ad", 
        desc: "A very strong contender in the arena.", 
        type: "electric", color1: "#aa00ff", color2: "#000000", btnColor: "#aa00ff"
    },
    B: { 
        label: "B: Pinnacle Performer of this rank.", 
        color: "#fff", bg: "#2980b9", 
        desc: "B solid performer with great moments.", 
        type: "electric", color1: "#0000ff", color2: "#000000", btnColor: "#0088ff"
    },
    C: { 
        label: "C Players who are still yet to achieve their prime.", 
        color: "#fff", bg: "#27ae60", 
        desc: "Rising talent, watching for the future.", 
        type: "electric", color1: "#00ff00", color2: "#000000", btnColor: "#00ff00"
    }
};

const HakiCanvas = ({ isHovering, color1, color2 }) => {
    const canvasRef = React.useRef(null);
    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        let animationFrameId; let bolts = [];
        const random = (min, max) => Math.random() * (max - min) + min;

        class Bolt {
            constructor() {
                const startFromLeft = Math.random() < 0.5;
                this.x = startFromLeft ? -10 : width + 10;
                this.angle = startFromLeft ? random(-0.2, 0.2) : Math.PI + random(-0.2, 0.2);
                this.y = height / 2; this.life = 1; this.decay = random(0.08, 0.15);
                this.path = []; this.generatePath();
            }
            generatePath() {
                let currX = this.x; let currY = this.y; this.path.push({x: currX, y: currY});
                const len = random(width * 0.5, width * 0.8);
                const endX = this.x + Math.cos(this.angle) * len;
                const endY = this.y + Math.sin(this.angle) * len;
                for (let i = 0; i < 8; i++) {
                    let sX = currX + (endX - currX) / 8;
                    let sY = currY + (endY - currY) / 8;
                    sX += random(-15, 15); sY += random(-15, 15);
                    this.path.push({x: sX, y: sY}); currX = sX; currY = sY;
                }
            }
            draw() {
                this.life -= this.decay; if (this.life <= 0) return;
                ctx.beginPath(); ctx.moveTo(this.path[0].x, this.path[0].y);
                for (let i = 1; i < this.path.length; i++) ctx.lineTo(this.path[i].x, this.path[i].y);
                ctx.lineCap = 'round'; ctx.lineJoin = 'round';
                ctx.save(); ctx.globalAlpha = this.life; ctx.lineWidth = random(6, 12);
                ctx.strokeStyle = color1; ctx.shadowColor = color1; ctx.shadowBlur = 15;
                ctx.stroke(); ctx.restore();
                ctx.save(); ctx.globalAlpha = this.life; ctx.lineWidth = random(2, 4);
                ctx.strokeStyle = color2; ctx.stroke(); ctx.restore();
            }
        }
        const render = () => {
            ctx.clearRect(0, 0, width, height);
            if (isHovering && Math.random() < 0.45) bolts.push(new Bolt());
            for (let i = bolts.length - 1; i >= 0; i--) {
                bolts[i].draw(); if (bolts[i].life <= 0) bolts.splice(i, 1);
            }
            animationFrameId = window.requestAnimationFrame(render);
        };
        render(); return () => window.cancelAnimationFrame(animationFrameId);
    }, [isHovering, color1, color2]);
    return <canvas ref={canvasRef} className="haki-canvas" />;
};

function PlayerCard({ player, config, handleMouseMove, handleMouseLeave }) {
    const [isHovered, setIsHovered] = React.useState(false);
    let cardClass = "player-card " + (config.type === 'god' ? "god-tier" : "electric-tier");
    return (
        <div className={cardClass} style={config.type === 'electric' ? { '--text-color': config.color1 } : {}}
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false); handleMouseLeave(); }}
            onMouseMove={(e) => handleMouseMove(e, config.desc)}>
            <span>{player}</span>
            {config.type === 'electric' && <HakiCanvas isHovering={isHovered} color1={config.color1} color2={config.color2} />}
        </div>
    );
}

function App() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [tierData, setTierData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [activeFilter, setActiveFilter] = React.useState("ALL");
    const [tooltip, setTooltip] = React.useState({ show: false, text: "", x: 0, y: 0 });

    React.useEffect(() => {
        fetch('players.json').then(r => r.json()).then(d => { setTierData(d); setLoading(false); });
    }, []);

    const handleMouseMove = (e, desc) => setTooltip({ show: true, text: desc, x: e.clientX + 20, y: e.clientY + 20 });
    const handleMouseLeave = () => setTooltip(t => ({ ...t, show: false }));

    if (loading || !tierData) return <div className="text-white text-center mt-5">Chargement...</div>;

    return (
        <div className="container-fluid p-0">
            <div className="bg-fixed"><div className="bg-grid"></div></div>
            {tooltip.show && <div className="custom-tooltip" style={{ top: tooltip.y, left: tooltip.x }}>{tooltip.text}</div>}
            <header className="hero-section container">
                <div className="profile-header">
                    <div className="profile-content">
                        <div className="profile-image-container"><img src="image/En1LT8kUwAA6CxF.jpg" alt="P" className="profile-img" /><p>SHAYRAIM</p></div>
                        <div className="profile-image-container"><img src="image/IMG_2497.jpeg" alt="P" className="profile-img" /><p>NYX</p></div>
                        <h1 className="profile-title">YBA Tier List</h1>
                        <div className="disclaimer-box"><p><strong>Disclaimer:</strong> <strong>OFFICIAL 2024 - 2026 player tierlist, subject to change.</strong> Placements are updated weekly. Rank changes only occur for active players; those who stop playing cannot move down, but may rise depending on the performance of active competitors.</p></div>
                    </div>
                </div>
                <h1 className="hero-title"><br/>TIERLIST</h1>
                <div className="hero-subtitle">ERA 2024 - 2026 • UPDATED WEEKLY</div>
                <div className="controls-area">
                    <input type="text" className="custom-search" placeholder="Rechercher..." onChange={e => setSearchTerm(e.target.value.toLowerCase())} />
                    <div className="filter-container">
                        <button className={`filter-btn ${activeFilter === "ALL" ? "active-all" : ""}`} onClick={() => setActiveFilter("ALL")}>ALL</button>
                        {Object.entries(rankConfig).map(([k, v]) => (
                            <button key={k} className={`filter-btn ${activeFilter === k ? "active" : ""}`} onClick={() => setActiveFilter(k)} style={{ color: v.btnColor }}><span style={{color: v.btnColor}}>•</span> {k}</button>
                        ))}
                    </div>
                </div>
            </header>
            <div className="container pb-5">
                {Object.entries(rankConfig).map(([k, v]) => {
                    if (activeFilter !== "ALL" && activeFilter !== k) return null;
                    const pList = (tierData[k] || []).filter(p => p.toLowerCase().includes(searchTerm));
                    if (pList.length === 0 && searchTerm !== "") return null;
                    return (
                        <div className="tier-row" key={k}>
                            <div className="tier-label" style={{ background: v.bg, color: v.color }}>{v.label}</div>
                            <div className="tier-content">
                                {pList.map((p, i) => p === "=" ? <div key={i} className="tier-separator">=</div> : <PlayerCard key={i} player={p} config={v} handleMouseMove={handleMouseMove} handleMouseLeave={handleMouseLeave} />)}
                            </div>
                        </div>
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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
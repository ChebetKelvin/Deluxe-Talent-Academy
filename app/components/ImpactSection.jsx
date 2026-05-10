import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Font Loader ────────────────────────────────────────────────────────── */
const FontLoader = () => {
  useEffect(() => {
    const id = "impact-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Nunito:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

/* ─── Data ───────────────────────────────────────────────────────────────── */
const STATS = [
  { value: 3000, suffix: "+", label: "Learners Impacted", decimal: false },
  { value: 9, suffix: "", label: "Specialized Programs", decimal: false },
  { value: 4, suffix: "+", label: "Years of Experience", decimal: false },
  { value: 20, suffix: "+", label: "School Partnerships", decimal: false },
];

const TRANSFORMATIONS = [
  {
    before: "Shy & withdrawn",
    after: "Confident public speaker",
    program: "Public Speaking & Leadership",
    quote: "She now walks into a room and owns it.",
    emoji: "🎤",
    color: "#fff7ed",
    accent: "#f59e0b",
    image: "public-speaking.jpg",
  },
  {
    before: "No direction",
    after: "Young innovator & builder",
    program: "Robotics & Coding",
    quote: "He built his first robot at age 11.",
    emoji: "🤖",
    color: "#eff6ff",
    accent: "#3b82f6",
    image: "/robotics.jpg",
  },
  {
    before: "Undisciplined & restless",
    after: "Focused team player",
    program: "Football & Sports Development",
    quote: "The discipline carried into his schoolwork.",
    emoji: "⚽",
    color: "#f0fdf4",
    accent: "#22c55e",
    image: "/football.jpg",
  },
  {
    before: "Struggled with expression",
    after: "Creative visual storyteller",
    program: "Visual Media & Creative Arts",
    quote: "She found her voice through a camera.",
    emoji: "📷",
    color: "#fdf4ff",
    accent: "#a855f7",
    image: "/camera.jpg",
  },
];

const GALLERY = [
  {
    src: "/robotics1.jpg",
    alt: "Students in robotics class",
    span: 2,
  },
  {
    src: "/culinary.png",
    alt: "culinary arts session",
    span: 1,
  },
  {
    src: "/aviation.jpg",
    alt: "aviation workshop",
    span: 1,
  },
  {
    src: "/science.png",
    alt: "laboratory science experiment",
    span: 2,
  },
  {
    src: "/creative-arts.jpg",
    alt: "Creative arts session",
    span: 1,
  },
];

const MICRO_TESTIMONIALS = [
  {
    text: "My child became more confident and expressive.",
    name: "Sarah M.",
    role: "Parent · Culinary Arts",
  },
  {
    text: "The best investment I've made in my son's future.",
    name: "David K.",
    role: "Parent · Robotics",
  },
  {
    text: "She looks forward to every single session.",
    name: "Amina J.",
    role: "Parent · Public Speaking",
  },
];

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const STYLES = `
  @keyframes is-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes is-fadeup { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes is-scalein { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }

  .is-section {
    background: #fdfaf6;
    overflow: hidden;
    position: relative;
  }
  /* warm grain overlay */
  .is-section::before {
    content:'';
    position:absolute;
    inset:0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events:none;
    z-index:0;
    opacity:0.6;
  }

  /* ── INTRO ── */
  .is-intro {
    position:relative; z-index:1;
    max-width: 900px;
    margin: 0 auto;
    padding: 100px 48px 60px;
    text-align: center;
  }
  .is-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Nunito', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #d97706;
    margin-bottom: 20px;
  }
  .is-eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #d97706;
    animation: is-float 3s ease-in-out infinite;
  }
  .is-headline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(38px, 5.5vw, 72px);
    font-weight: 500;
    line-height: 1.1;
    color: #1c1510;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
  }
  .is-headline em {
    font-style: italic;
    font-weight: 400;
    color: #d97706;
  }
  .is-subtext {
    font-family: 'Nunito', sans-serif;
    font-size: 17px;
    font-weight: 300;
    line-height: 1.8;
    color: #6b5e52;
    max-width: 640px;
    margin: 0 auto;
  }

  /* ── DIVIDER ── */
  .is-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 0 48px;
    margin-bottom: 72px;
  }
  .is-divider-line { flex:1; height:1px; background: linear-gradient(to right, transparent, #e2d5c8); }
  .is-divider-line.right { background: linear-gradient(to left, transparent, #e2d5c8); }
  .is-divider-icon { font-size: 18px; opacity: 0.5; }

  /* ── STATS ── */
  .is-stats {
    position: relative; z-index:1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    max-width: 1100px;
    margin: 0 auto 90px;
    padding: 0 48px;
  }
  @media (max-width: 768px) {
    .is-stats { 
      grid-template-columns: repeat(2, 1fr); 
      padding: 0 24px;
      margin: 0 auto 60px;
    }
  }
  .is-stat {
    padding: 40px 32px;
    text-align: center;
    background: #fff;
    border: 1px solid #ede6dc;
    position: relative;
    overflow: hidden;
    transition: transform 300ms ease, box-shadow 300ms ease;
  }
  .is-stat:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(180,140,80,0.12);
  }
  .is-stat::before {
    content:'';
    position:absolute;
    bottom:0; left:0; right:0;
    height: 3px;
    background: linear-gradient(90deg, #f59e0b, #fb923c);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 500ms ease;
  }
  .is-stat:hover::before, .is-stat.is-visible::before { transform: scaleX(1); }
  .is-stat-number {
    font-family: 'Playfair Display', serif;
    font-size: clamp(44px, 5vw, 64px);
    font-weight: 700;
    color: #1c1510;
    line-height: 1;
    margin-bottom: 8px;
    letter-spacing: -0.03em;
  }
  .is-stat-number span { color: #d97706; }
  .is-stat-label {
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #9c876e;
  }

  /* ── TRANSFORMATION CARDS ── */
  .is-transform-wrap {
    position: relative; z-index:1;
    padding: 0 48px 90px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .is-section-label {
    font-family: 'Nunito', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #b8996e;
    margin-bottom: 10px;
  }
  .is-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 3.5vw, 44px);
    font-weight: 500;
    color: #1c1510;
    margin-bottom: 40px;
    letter-spacing: -0.01em;
  }
  .is-section-title em { font-style:italic; color: #d97706; }
  .is-cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  @media (max-width: 1024px) { 
    .is-cards-grid { 
      grid-template-columns: repeat(2, 1fr); 
      gap: 16px;
    } 
  }
  @media (max-width: 640px) { 
    .is-cards-grid { 
      grid-template-columns: 1fr; 
      gap: 16px;
    } 
  }

  .is-tcard {
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    cursor: default;
    transition: transform 400ms cubic-bezier(0.16,1,0.3,1), box-shadow 400ms ease;
  }
  .is-tcard:hover {
    transform: translateY(-8px) rotate(-0.5deg);
    box-shadow: 0 24px 60px rgba(0,0,0,0.13);
  }
  .is-tcard-img-wrap {
    position: relative;
    height: 220px;
    overflow: hidden;
  }
  .is-tcard-img-wrap img {
    width:100%; height:100%;
    object-fit: cover;
    transition: transform 600ms ease;
    filter: saturate(0.85);
  }
  .is-tcard:hover .is-tcard-img-wrap img {
    transform: scale(1.06);
    filter: saturate(1);
  }
  .is-tcard-img-overlay {
    position:absolute;
    inset:0;
    background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.35));
  }
  .is-tcard-emoji {
    position:absolute;
    top:14px; right:14px;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(8px);
    border-radius: 50%;
    width: 40px; height: 40px;
    display: flex; align-items:center; justify-content:center;
    font-size: 18px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  }
  .is-tcard-body {
    padding: 20px 22px 24px;
  }
  .is-tcard-journey {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  .is-tcard-before {
    font-family: 'Nunito', sans-serif;
    font-size: 11px;
    color: #9c876e;
    text-decoration: line-through;
    text-decoration-color: #d97706;
  }
  .is-tcard-arrow {
    font-size: 14px;
    color: #d97706;
    flex-shrink: 0;
  }
  .is-tcard-after {
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #1c1510;
  }
  .is-tcard-program {
    font-family: 'Nunito', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 10px;
    transition: color 300ms;
  }
  .is-tcard-quote {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-style: italic;
    color: #4a3d30;
    line-height: 1.6;
  }
  .is-tcard-quote::before { content: '"'; }
  .is-tcard-quote::after  { content: '"'; }

  /* ── GALLERY ── */
  .is-gallery-wrap {
    position: relative; z-index:1;
    padding: 0 48px 90px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .is-gallery-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto;
    gap: 12px;
  }
  @media (max-width: 768px) {
    .is-gallery-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }
    .is-gitem:nth-child(1) { grid-column: span 2; }
    .is-gitem:nth-child(4) { grid-column: span 2; }
    .is-gitem:nth-child(5) { grid-column: span 2; }
  }
  @media (max-width: 480px) {
    .is-gallery-grid {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .is-gitem:nth-child(1) { grid-column: span 1; }
    .is-gitem:nth-child(4) { grid-column: span 1; }
    .is-gitem:nth-child(5) { grid-column: span 1; }
  }
  .is-gitem:nth-child(1) { grid-column: span 2; }
  .is-gitem:nth-child(4) { grid-column: span 2; }
  .is-gitem {
    border-radius: 14px;
    overflow: hidden;
    position: relative;
  }
  .is-gitem img {
    width:100%; height:100%;
    object-fit: cover;
    min-height: 200px;
    display: block;
    transition: transform 500ms ease, filter 500ms ease;
    filter: saturate(0.8);
  }
  .is-gitem:hover img { transform: scale(1.05); filter: saturate(1); }
  .is-gitem-overlay {
    position:absolute; inset:0;
    background: linear-gradient(to top, rgba(28,21,16,0.4) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 400ms ease;
  }
  .is-gitem:hover .is-gitem-overlay { opacity: 1; }

  /* ── MICRO TESTIMONIALS ── */
  .is-testimonials-wrap {
    position: relative; z-index:1;
    padding: 0 48px 100px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .is-testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 24px;
  }
  @media (max-width: 1024px) { 
    .is-testimonials-grid { 
      grid-template-columns: repeat(2,1fr);
      gap: 16px;
    } 
  }
  @media (max-width: 640px) { 
    .is-testimonials-grid { 
      grid-template-columns: 1fr;
      gap: 16px;
    } 
  }

  .is-testi {
    background: #fff;
    border: 1px solid #ede6dc;
    border-radius: 16px;
    padding: 28px 28px 24px;
    position: relative;
    transition: transform 300ms ease, box-shadow 300ms ease;
  }
  .is-testi:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(180,140,80,0.1);
  }
  .is-testi-mark {
    font-family: 'Playfair Display', serif;
    font-size: 52px;
    line-height: 0.8;
    color: #f59e0b;
    opacity: 0.35;
    margin-bottom: 12px;
    display: block;
  }
  .is-testi-text {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-style: italic;
    color: #2c2018;
    line-height: 1.7;
    margin-bottom: 20px;
  }
  .is-testi-footer {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-top: 16px;
    border-top: 1px solid #f0e8dc;
  }
  .is-testi-avatar {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f59e0b, #fb923c);
    display: flex; align-items:center; justify-content:center;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    flex-shrink: 0;
  }
  .is-testi-name {
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #1c1510;
    line-height: 1.2;
  }
  .is-testi-role {
    font-family: 'Nunito', sans-serif;
    font-size: 11px;
    color: #9c876e;
  }

  /* ── MOBILE RESPONSIVE ADJUSTMENTS ── */
  @media (max-width: 768px) {
    .is-intro {
      padding: 60px 24px 40px;
    }
    
    .is-headline {
      font-size: clamp(28px, 8vw, 42px);
      margin-bottom: 16px;
    }
    
    .is-subtext {
      font-size: 15px;
      line-height: 1.6;
      padding: 0 8px;
    }
    
    .is-eyebrow {
      font-size: 10px;
      margin-bottom: 16px;
    }
    
    .is-divider {
      padding: 0 24px;
      margin-bottom: 48px;
    }
    
    .is-stat {
      padding: 28px 16px;
    }
    
    .is-stat-number {
      font-size: clamp(32px, 8vw, 48px);
    }
    
    .is-stat-label {
      font-size: 11px;
    }
    
    .is-transform-wrap {
      padding: 0 24px 60px;
    }
    
    .is-section-label {
      font-size: 10px;
      margin-bottom: 8px;
    }
    
    .is-section-title {
      font-size: clamp(22px, 6vw, 32px);
      margin-bottom: 28px;
    }
    
    .is-tcard-img-wrap {
      height: 180px;
    }
    
    .is-tcard-body {
      padding: 16px;
    }
    
    .is-gallery-wrap {
      padding: 0 24px 60px;
    }
    
    .is-gitem img {
      min-height: 160px;
    }
    
    .is-testimonials-wrap {
      padding: 0 24px 80px;
    }
    
    .is-testi {
      padding: 20px;
    }
    
    .is-testi-mark {
      font-size: 40px;
      margin-bottom: 8px;
    }
    
    .is-testi-text {
      font-size: 14px;
      line-height: 1.6;
    }
  }

  @media (max-width: 480px) {
    .is-intro {
      padding: 48px 16px 32px;
    }
    
    .is-headline {
      font-size: clamp(24px, 8vw, 32px);
    }
    
    .is-subtext {
      font-size: 14px;
    }
    
    .is-stats {
      padding: 0 16px;
      margin: 0 auto 48px;
    }
    
    .is-stat {
      padding: 20px 12px;
    }
    
    .is-stat-number {
      font-size: clamp(28px, 7vw, 36px);
    }
    
    .is-stat-label {
      font-size: 10px;
    }
    
    .is-transform-wrap {
      padding: 0 16px 48px;
    }
    
    .is-cards-grid {
      gap: 12px;
    }
    
    .is-tcard {
      border-radius: 16px;
    }
    
    .is-tcard-img-wrap {
      height: 200px;
    }
    
    .is-tcard-emoji {
      width: 36px;
      height: 36px;
      font-size: 16px;
      top: 12px;
      right: 12px;
    }
    
    .is-gallery-wrap {
      padding: 0 16px 48px;
    }
    
    .is-testimonials-wrap {
      padding: 0 16px 60px;
    }
    
    .is-testi {
      padding: 16px;
    }
    
    .is-testi-text {
      font-size: 13px;
    }
  }

  /* ── SCROLL REVEAL ── */
  .is-reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 700ms ease, transform 700ms cubic-bezier(0.16,1,0.3,1);
  }
  .is-reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .is-reveal-delay-1 { transition-delay: 100ms; }
  .is-reveal-delay-2 { transition-delay: 200ms; }
  .is-reveal-delay-3 { transition-delay: 300ms; }
  .is-reveal-delay-4 { transition-delay: 400ms; }
`;

/* ─── Hook: inject styles once ───────────────────────────────────────────── */
function useStyles() {
  useEffect(() => {
    const id = "impact-styles";
    if (document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id = id;
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return () => {
      const el = document.getElementById(id);
      if (el) document.head.removeChild(el);
    };
  }, []);
}

/* ─── Hook: intersection observer reveal ────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".is-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─── Count-up hook ──────────────────────────────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

/* ─── Stat tile ──────────────────────────────────────────────────────────── */
function StatTile({ stat, index, triggered }) {
  const count = useCountUp(stat.value, 1800, triggered);
  return (
    <div
      className={`is-stat is-reveal is-reveal-delay-${index + 1}${triggered ? " is-visible" : ""}`}
    >
      <div className="is-stat-number">
        {count.toLocaleString()}
        <span>{stat.suffix}</span>
      </div>
      <div className="is-stat-label">{stat.label}</div>
    </div>
  );
}

/* ─── Transformation card ────────────────────────────────────────────────── */
function TransformCard({ card, index }) {
  return (
    <div
      className={`is-tcard is-reveal is-reveal-delay-${index + 1}`}
      style={{ background: card.color }}
    >
      <div className="is-tcard-img-wrap">
        <img src={card.image} alt={card.after} loading="lazy" />
        <div className="is-tcard-img-overlay" />
        <div className="is-tcard-emoji">{card.emoji}</div>
      </div>
      <div className="is-tcard-body">
        <div className="is-tcard-journey">
          <span className="is-tcard-before">{card.before}</span>
          <span className="is-tcard-arrow">→</span>
          <span className="is-tcard-after">{card.after}</span>
        </div>
        <div className="is-tcard-program" style={{ color: card.accent }}>
          {card.program}
        </div>
        <p className="is-tcard-quote">{card.quote}</p>
      </div>
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────────────────────── */
export default function ImpactSection() {
  useStyles();
  useReveal();

  const statsRef = useRef(null);
  const [statsTriggered, setStatsTriggered] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsTriggered(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <FontLoader />
      <section className="is-section" aria-label="Impact and transformation">
        {/* ── 1. EMOTIONAL INTRO ─────────────────────────────────────────── */}
        <div className="is-intro">
          <div className="is-eyebrow is-reveal">
            <span className="is-eyebrow-dot" />
            Transformation & Impact
          </div>
          <h2 className="is-headline is-reveal is-reveal-delay-1">
            Helping Young Minds
            <br />
            Discover Their <em>Potential</em>
          </h2>
          <p className="is-subtext is-reveal is-reveal-delay-2">
            Every program is designed to build confidence, creativity,
            leadership, and future-ready skills — through real, hands-on
            experiences that children carry for life.
          </p>
        </div>

        <div className="is-divider">
          <div className="is-divider-line" />
          <span className="is-divider-icon">✦</span>
          <div className="is-divider-line right" />
        </div>

        {/* ── 2. ANIMATED STATS ──────────────────────────────────────────── */}
        <div ref={statsRef} className="is-stats">
          {STATS.map((stat, i) => (
            <StatTile
              key={i}
              stat={stat}
              index={i}
              triggered={statsTriggered}
            />
          ))}
        </div>

        {/* ── 3. TRANSFORMATION CARDS ────────────────────────────────────── */}
        <div className="is-transform-wrap">
          <p className="is-section-label is-reveal">Student Journeys</p>
          <h3 className="is-section-title is-reveal is-reveal-delay-1">
            What children <em>become</em>
          </h3>
          <div className="is-cards-grid">
            {TRANSFORMATIONS.map((card, i) => (
              <TransformCard key={i} card={card} index={i} />
            ))}
          </div>
        </div>

        {/* ── 4. GALLERY STRIP ───────────────────────────────────────────── */}
        <div className="is-gallery-wrap">
          <p className="is-section-label is-reveal">Life at Our Programs</p>
          <h3 className="is-section-title is-reveal is-reveal-delay-1">
            Real moments, <em>real growth</em>
          </h3>
          <div className="is-gallery-grid">
            {GALLERY.map((item, i) => (
              <div
                key={i}
                className={`is-gitem is-reveal is-reveal-delay-${(i % 4) + 1}`}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <div className="is-gitem-overlay" />
              </div>
            ))}
          </div>
        </div>

        {/* ── 5. MICRO TESTIMONIALS ──────────────────────────────────────── */}
        <div className="is-testimonials-wrap">
          <p className="is-section-label is-reveal">Parent Voices</p>
          <h3 className="is-section-title is-reveal is-reveal-delay-1">
            Words that <em>mean everything</em>
          </h3>
          <div className="is-testimonials-grid">
            {MICRO_TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`is-testi is-reveal is-reveal-delay-${i + 1}`}
              >
                <span className="is-testi-mark">"</span>
                <p className="is-testi-text">{t.text}</p>
                <div className="is-testi-footer">
                  <div className="is-testi-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <div className="is-testi-name">{t.name}</div>
                    <div className="is-testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

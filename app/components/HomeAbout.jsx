import { useEffect, useRef } from "react";
import { Link } from "react-router";

/* ─── Font loader ────────────────────────────────────────────────────────── */
const FontLoader = () => {
  useEffect(() => {
    const id = "ha-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
};

/* ─── Value pillars ──────────────────────────────────────────────────────── */
const PILLARS = [
  {
    icon: "🎯",
    title: "Talent Discovery",
    body: "We help every child uncover their unique strengths — through structured exploration across 9 specialist disciplines, guided by expert mentors.",
  },
  {
    icon: "🧠",
    title: "Whole-Child Development",
    body: "Beyond skills, we build confidence, discipline, and leadership — qualities that carry children far beyond the classroom and into life.",
  },
  {
    icon: "🌍",
    title: "Real-World Experience",
    body: "Every session is hands-on. Learners don't just study concepts — they build, create, compete, and perform in real environments.",
  },
  {
    icon: "🤝",
    title: "A Community of Growth",
    body: "Children join a thriving peer community of curious, ambitious young minds — and parents gain a trusted partner in their child's journey.",
  },
];

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const STYLES = `
  @keyframes ha-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }

  .ha-section {
    background: #fdfaf6;
    position: relative;
    overflow: hidden;
    padding: 100px 0 110px;
  }

  /* Decorative warm blobs */
  .ha-blob {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
  .ha-blob-1 {
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%);
    top: -120px; right: -80px;
    animation: ha-float 8s ease-in-out infinite;
  }
  .ha-blob-2 {
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%);
    bottom: -60px; left: -60px;
    animation: ha-float 10s ease-in-out infinite reverse;
  }

  /* Grain overlay */
  .ha-grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.04;
    pointer-events: none;
    z-index: 0;
  }

  .ha-inner {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 48px;
  }

  /* ── TOP SPLIT: label + headline left / intro paragraph right ── */
  .ha-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: end;
    margin-bottom: 72px;
  }
  @media (max-width: 900px) {
    .ha-top { grid-template-columns: 1fr; gap: 28px; margin-bottom: 48px; }
  }

  .ha-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #d97706;
    margin-bottom: 18px;
  }
  .ha-eyebrow-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #d97706;
    animation: ha-float 3s ease-in-out infinite;
  }

  .ha-headline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(34px, 4vw, 54px);
    font-weight: 500;
    line-height: 1.1;
    color: #1c1510;
    letter-spacing: -0.02em;
    margin: 0;
  }
  .ha-headline em {
    font-style: italic;
    font-weight: 400;
    color: #d97706;
  }

  .ha-right {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 24px;
  }

  .ha-intro {
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.85;
    color: #6b5e52;
    margin: 0;
    border-left: 2px solid #f59e0b;
    padding-left: 20px;
  }

  .ha-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #d97706;
    text-decoration: none;
    transition: gap 250ms ease;
  }
  .ha-link:hover { gap: 14px; }
  .ha-link-arrow {
    font-size: 16px;
    transition: transform 250ms ease;
  }
  .ha-link:hover .ha-link-arrow { transform: translateX(4px); }

  /* ── DIVIDER ── */
  .ha-divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 64px;
  }
  .ha-divider-line {
    flex: 1; height: 1px;
    background: linear-gradient(to right, #e2d5c8, transparent);
  }
  .ha-divider-line.r {
    background: linear-gradient(to left, #e2d5c8, transparent);
  }
  .ha-divider-glyph {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: #d97706;
    opacity: 0.5;
    line-height: 1;
  }

  /* ── PILLARS GRID ── */
  .ha-pillars {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;
    background: #ede6dc;
    border: 1px solid #ede6dc;
    border-radius: 20px;
    overflow: hidden;
  }
  @media (max-width: 1024px) {
    .ha-pillars { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .ha-pillars { grid-template-columns: 1fr; }
  }

  .ha-pillar {
    background: #fff;
    padding: 36px 30px 40px;
    position: relative;
    overflow: hidden;
    transition: background 300ms ease;
  }
  .ha-pillar:hover { background: #fffdf9; }

  .ha-pillar::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, #f59e0b, #fb923c);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 400ms cubic-bezier(0.16,1,0.3,1);
  }
  .ha-pillar:hover::after { transform: scaleX(1); }

  .ha-pillar-icon {
    font-size: 28px;
    margin-bottom: 16px;
    display: block;
    line-height: 1;
  }
  .ha-pillar-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 500;
    color: #1c1510;
    margin: 0 0 10px;
    letter-spacing: -0.01em;
  }
  .ha-pillar-body {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.75;
    color: #6b5e52;
    margin: 0;
  }

  /* ── BOTTOM TRUST BAR ── */
  .ha-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
    flex-wrap: wrap;
    margin-top: 60px;
    padding-top: 48px;
    border-top: 1px solid #ede6dc;
  }
  .ha-trust-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: #9c876e;
  }
  .ha-trust-icon {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #f59e0b, #fb923c);
    display: flex; align-items:center; justify-content:center;
    font-size: 14px;
    flex-shrink: 0;
  }
  .ha-trust-label {
    font-weight: 600;
    color: #1c1510;
    display: block;
    font-size: 14px;
    line-height: 1.2;
  }

  /* ── SCROLL REVEAL ── */
  .ha-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 650ms ease, transform 650ms cubic-bezier(0.16,1,0.3,1);
  }
  .ha-reveal.ha-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .ha-d1 { transition-delay: 80ms; }
  .ha-d2 { transition-delay: 160ms; }
  .ha-d3 { transition-delay: 240ms; }
  .ha-d4 { transition-delay: 320ms; }

  @media (max-width: 768px) {
    .ha-section { padding: 72px 0 80px; }
    .ha-inner { padding: 0 24px; }
    .ha-pillar { padding: 28px 22px 32px; }
    .ha-trust { gap: 28px; margin-top: 40px; padding-top: 36px; }
  }
`;

/* ─── Hook: inject styles ────────────────────────────────────────────────── */
function useStyles() {
  useEffect(() => {
    const id = "ha-styles";
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

/* ─── Hook: scroll reveal ────────────────────────────────────────────────── */
function useReveal(ref) {
  useEffect(() => {
    const container = ref?.current || document;
    const els = container.querySelectorAll(".ha-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ha-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function HomeAbout() {
  useStyles();
  const sectionRef = useRef(null);
  useReveal(sectionRef);

  return (
    <>
      <FontLoader />
      <section
        ref={sectionRef}
        className="ha-section"
        aria-label="About Deluxe Talent & Passion Academy"
      >
        {/* Decorative blobs + grain */}
        <div className="ha-blob ha-blob-1" aria-hidden="true" />
        <div className="ha-blob ha-blob-2" aria-hidden="true" />
        <div className="ha-grain" aria-hidden="true" />

        <div className="ha-inner">
          {/* ── Top split ─────────────────────────────────────────────── */}
          <div className="ha-top">
            {/* Left — eyebrow + headline */}
            <div>
              <div className="ha-eyebrow ha-reveal">
                <span className="ha-eyebrow-dot" />
                Who We Are
              </div>
              <h2 className="ha-headline ha-reveal ha-d1">
                Where Young Talent
                <br />
                Finds Its <em>Direction</em>
              </h2>
            </div>

            {/* Right — intro + link */}
            <div className="ha-right ha-reveal ha-d2">
              <p className="ha-intro">
                Deluxe Talent &amp; Passion Academy is Kenya's premier
                extracurricular education platform for learners aged 8–17. We
                partner with schools and parents to give children structured,
                expert-led programs in 9 specialist disciplines — from Robotics
                and Aviation to Culinary Arts and Public Speaking — building
                skills, confidence, and character that last a lifetime.
              </p>
              <Link to="/about" className="ha-link">
                Read our full story
                <span className="ha-link-arrow">→</span>
              </Link>
            </div>
          </div>

          {/* ── Divider ───────────────────────────────────────────────── */}
          <div className="ha-divider ha-reveal">
            <div className="ha-divider-line" />
            <span className="ha-divider-glyph">✦</span>
            <div className="ha-divider-line r" />
          </div>

          {/* ── Value pillars ─────────────────────────────────────────── */}
          <div className="ha-pillars">
            {PILLARS.map((p, i) => (
              <div key={i} className={`ha-pillar ha-reveal ha-d${i + 1}`}>
                <span className="ha-pillar-icon" aria-hidden="true">
                  {p.icon}
                </span>
                <h3 className="ha-pillar-title">{p.title}</h3>
                <p className="ha-pillar-body">{p.body}</p>
              </div>
            ))}
          </div>

          {/* ── Trust bar ─────────────────────────────────────────────── */}
          <div className="ha-trust ha-reveal">
            {[
              { icon: "🏫", label: "20+ School Partners", sub: "across Meru" },
              { icon: "👧", label: "Ages 8–17", sub: "all levels welcome" },
              {
                icon: "🏆",
                label: "9 Specialist Programs",
                sub: "expert-led sessions",
              },
              {
                icon: "📅",
                label: "Flexible Schedules",
                sub: "weekdays & weekends",
              },
            ].map((t, i) => (
              <div key={i} className="ha-trust-item">
                <div className="ha-trust-icon" aria-hidden="true">
                  {t.icon}
                </div>
                <div>
                  <span className="ha-trust-label">{t.label}</span>
                  {t.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

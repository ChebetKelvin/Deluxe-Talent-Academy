import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Google Fonts injection ─────────────────────────────────────────────── */
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);
  return null;
};

/* ─── Data ───────────────────────────────────────────────────────────────── */
const PROGRAMS = [
  {
    category: "STEM & Innovation",
    title: "Aviation & Drone Technology",
    benefit: "Explore flight systems, drones, and future aviation skills.",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&h=1100&fit=crop",
    accent: "#1a3f7a",
    tint: "#7ab3ff",
    outcome: "Real-world aviation skills",
  },
  {
    category: "Creative & Life Skills",
    title: "Culinary Arts",
    benefit: "Learn cooking, nutrition, and creativity in food preparation.",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&h=1100&fit=crop",
    accent: "#4a1050",
    tint: "#d98ef5",
    outcome: "Kitchen confidence & creativity",
  },
  {
    category: "STEM & Innovation",
    title: "Robotics & Coding",
    benefit: "Build smart machines and learn programming fundamentals.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&h=1100&fit=crop",
    accent: "#0d2d50",
    tint: "#60b8ff",
    outcome: "Engineering & logic mindset",
  },
  {
    category: "Leadership & Communication",
    title: "Public Speaking & Leadership",
    benefit: "Build confidence, communication, and leadership skills.",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&h=1100&fit=crop",
    accent: "#3d2a08",
    tint: "#f5c842",
    outcome: "Poise & communication skills",
  },
  {
    category: "Strategy & Thinking",
    title: "Chess & Strategic Thinking",
    benefit: "Develop logic, patience, and decision-making skills.",
    image:
      "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=900&h=1100&fit=crop",
    accent: "#2a1c06",
    tint: "#e8a94a",
    outcome: "Critical thinking & strategy",
  },
  {
    category: "Sports & Development",
    title: "Football & Sports Development",
    benefit: "Improve fitness, teamwork, and competitive discipline.",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&h=1100&fit=crop",
    accent: "#092c18",
    tint: "#4fcf84",
    outcome: "Teamwork & athleticism",
  },
  {
    category: "STEM & Innovation",
    title: "STEM Innovation Club",
    benefit: "Hands-on experiments combining science and creativity.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900&h=1100&fit=crop",
    accent: "#0a1a38",
    tint: "#5fb0ff",
    outcome: "Scientific curiosity & method",
  },
  {
    category: "Creative Arts & Media",
    title: "Visual Media & Creative Arts",
    benefit: "Photography, video creation, and digital storytelling.",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&h=1100&fit=crop",
    accent: "#2d0b40",
    tint: "#c97aff",
    outcome: "Visual storytelling skills",
  },
  {
    category: "Discipline & Wellness",
    title: "Martial Arts & Discipline Training",
    benefit: "Build focus, discipline, confidence, and self-control.",
    image:
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=900&h=1100&fit=crop",
    accent: "#092218",
    tint: "#36c972",
    outcome: "Discipline & self-mastery",
  },
];

/* ─── Styles (injected once) ─────────────────────────────────────────────── */
const STYLES = `
  .ps-stage {
    position: relative;
    height: ${PROGRAMS.length * 100}vh;
    background: #080808;
  }
  .ps-shell {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  /* LEFT */
  .ps-left {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 48px 52px;
    overflow: hidden;
    z-index: 2;
  }
  .ps-left-glow {
    position: absolute;
    inset: 0;
    opacity: 0.45;
    pointer-events: none;
    transition: background 700ms ease;
  }
  .ps-left-vignette {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 60%, rgba(0,0,0,0.6));
    pointer-events: none;
  }
  .ps-counter {
    position: absolute;
    top: 42px; left: 52px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    font-weight: 300;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.06em;
    z-index: 1;
  }
  .ps-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    opacity: 0.8;
    margin-bottom: 6px;
    position: relative; z-index: 1;
    transition: color 500ms ease;
  }
  .ps-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 4.5vw, 62px);
    font-weight: 600;
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: #f5f0e8;
    margin-bottom: 20px;
    position: relative; z-index: 1;
  }
  .ps-headline em {
    font-style: italic;
    font-weight: 300;
    transition: color 500ms ease;
  }
  .ps-active-info {
    position: relative; z-index: 1;
    margin-top: auto;
    padding-top: 32px;
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  .ps-active-tag {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    opacity: 0.75;
    margin-bottom: 10px;
    transition: color 500ms ease;
  }
  .ps-active-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 3vw, 44px);
    font-weight: 600;
    line-height: 1.1;
    color: #f5f0e8;
    margin-bottom: 10px;
  }
  .ps-active-benefit {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    line-height: 1.7;
    color: rgba(245,240,232,0.65);
    max-width: 340px;
    margin-bottom: 28px;
  }
  .ps-meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 28px;
  }
  .ps-meta-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .ps-meta-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(245,240,232,0.4);
  }
  .ps-meta-value {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: rgba(245,240,232,0.85);
  }
  .ps-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #080808;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.05em;
    padding: 13px 24px;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    transition: background 500ms ease, transform 200ms ease;
  }
  .ps-cta:hover { transform: scale(1.03); }
  .ps-cta-arrow {
    width: 14px; height: 14px;
    border-right: 2px solid #080808;
    border-top: 2px solid #080808;
    transform: rotate(45deg);
    flex-shrink: 0;
    transition: margin-left 200ms ease;
  }
  .ps-cta:hover .ps-cta-arrow { margin-left: 4px; }
  .ps-progress-wrap {
    position: absolute;
    bottom: 30px; left: 52px;
    display: flex; align-items: center; gap: 14px;
    z-index: 1;
  }
  .ps-progress-bar {
    width: 120px; height: 2px;
    background: rgba(255,255,255,0.12);
    border-radius: 99px;
    overflow: hidden;
  }
  .ps-progress-fill {
    height: 100%;
    border-radius: 99px;
    transition: width 100ms linear, background 500ms ease;
  }
  .ps-progress-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.12em;
  }

  /* RIGHT */
  .ps-right {
    position: relative;
    overflow: hidden;
    background: #0a0a0a;
  }
  .ps-right::before {
    content: '';
    position: absolute;
    top: 0; bottom: 0; left: 0;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent);
    z-index: 10;
  }
  .ps-track {
    display: flex;
    flex-direction: column;
    position: absolute;
    inset: 0;
    will-change: transform;
    transition: transform 80ms linear;
  }
  .ps-card {
    flex-shrink: 0;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }
  .ps-card-img {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 600ms cubic-bezier(0.16,1,0.3,1), filter 500ms ease;
    filter: saturate(0.7) brightness(0.75);
  }
  .ps-card.is-active .ps-card-img {
    filter: saturate(1) brightness(0.82);
    transform: scale(1.04);
  }
  .ps-card-fade {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.1) 60%, transparent);
    z-index: 1;
  }
  .ps-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(8,8,8,0.85) 0%, transparent 50%);
    z-index: 2;
    opacity: 0;
    transition: opacity 500ms ease;
  }
  .ps-card.is-active .ps-card-overlay { opacity: 1; }
  .ps-card-badge {
    position: absolute;
    top: 36px; right: 36px;
    z-index: 5;
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px;
    letter-spacing: 0.15em;
    color: rgba(255,255,255,0.4);
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 6px 12px;
    border-radius: 99px;
    transition: color 300ms, background 300ms;
  }
  .ps-card.is-active .ps-card-badge {
    color: rgba(255,255,255,0.85);
    background: rgba(255,255,255,0.12);
  }
  .ps-card-label {
    position: absolute;
    bottom: 36px; left: 36px; right: 36px;
    z-index: 5;
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 500;
    color: rgba(255,255,255,0.5);
    transition: color 400ms ease, transform 400ms cubic-bezier(0.16,1,0.3,1);
  }
  .ps-card.is-active .ps-card-label {
    color: rgba(255,255,255,0.92);
    transform: translateY(-4px);
  }

  /* DOTS */
  .ps-dots {
    position: absolute;
    right: 20px; top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: 20;
  }
  .ps-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(255,255,255,0.25);
    cursor: pointer;
    transition: background 300ms, height 300ms, border-radius 300ms;
  }
  .ps-dot.is-active {
    background: rgba(255,255,255,0.85);
    height: 16px;
    border-radius: 2px;
  }

  /* ── MOBILE RESPONSIVE STYLES ─────────────────────────────── */
  @media (max-width: 768px) {
    .ps-shell {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }

    .ps-left {
      padding: 24px 20px;
      justify-content: flex-start;
      min-height: 0;
      order: 1;
    }

    .ps-counter {
      top: 24px;
      left: 20px;
      font-size: 11px;
    }

    .ps-headline {
      font-size: clamp(24px, 6vw, 36px);
      margin-bottom: 12px;
    }

    .ps-eyebrow {
      font-size: 9px;
      margin-bottom: 4px;
    }

    .ps-active-info {
      padding-top: 16px;
      margin-top: 12px;
    }

    .ps-active-title {
      font-size: clamp(20px, 5vw, 28px);
      margin-bottom: 6px;
    }

    .ps-active-benefit {
      font-size: 12px;
      max-width: 100%;
      margin-bottom: 16px;
    }

    .ps-meta-grid {
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 16px;
    }

    .ps-meta-label {
      font-size: 9px;
    }

    .ps-meta-value {
      font-size: 11px;
    }

    .ps-cta {
      font-size: 12px;
      padding: 10px 20px;
      width: 100%;
      justify-content: center;
    }

    .ps-progress-wrap {
      display: none;
    }

    .ps-right {
      order: 2;
      height: 100%;
    }

    .ps-right::before {
      display: none;
    }

    .ps-card-fade {
      background: linear-gradient(to top, rgba(8,8,8,0.8) 0%, rgba(8,8,8,0.2) 50%, transparent);
    }

    .ps-card-badge {
      top: 20px;
      right: 20px;
      font-size: 10px;
      padding: 4px 10px;
    }

    .ps-card-label {
      bottom: 24px;
      left: 20px;
      right: 20px;
      font-size: 18px;
    }

    .ps-dots {
      right: 12px;
      gap: 6px;
    }

    .ps-dot {
      width: 3px;
      height: 3px;
    }

    .ps-dot.is-active {
      height: 12px;
    }
  }

  @media (max-width: 480px) {
    .ps-left {
      padding: 16px 16px;
    }

    .ps-counter {
      top: 16px;
      left: 16px;
      font-size: 10px;
    }

    .ps-headline {
      font-size: clamp(20px, 7vw, 28px);
      margin-bottom: 8px;
      
    }

    .ps-active-info {
      padding-top: 30px;
      margin-top: 8px;
    }

    .ps-active-title {
      font-size: clamp(18px, 5.5vw, 24px);
    }

    .ps-active-benefit {
      font-size: 11px;
      line-height: 1.5;
      margin-bottom: 12px;
    }

    .ps-meta-grid {
      gap: 6px;
      margin-bottom: 12px;
    }

    .ps-cta {
      font-size: 11px;
      padding: 8px 16px;
    }

    .ps-card-badge {
      top: 16px;
      right: 16px;
      font-size: 9px;
      padding: 3px 8px;
    }

    .ps-card-label {
      bottom: 16px;
      left: 16px;
      right: 16px;
      font-size: 16px;
    }

    .ps-dots {
      right: 8px;
      gap: 5px;
    }
  }
`;

function useStyleInjection() {
  useEffect(() => {
    const id = "ps-styles";
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

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function ProgramCard({ program, index, isActive }) {
  const total = PROGRAMS.length;
  return (
    <div className={`ps-card${isActive ? " is-active" : ""}`}>
      <img
        className="ps-card-img"
        src={program.image}
        alt={program.title}
        loading={index < 2 ? "eager" : "lazy"}
        width={900}
        height={1100}
      />
      <div className="ps-card-fade" />
      <div className="ps-card-overlay" />
      <span className="ps-card-badge">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <div className="ps-card-label">{program.title}</div>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function ProgramsScroll({ onEnroll }) {
  useStyleInjection();

  const stageRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onScroll = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = stage.offsetHeight - vh;
    const scrolled = Math.min(Math.max(-rect.top, 0), total);
    const p = total > 0 ? scrolled / total : 0;
    setProgress(p);
    const idx = Math.min(
      PROGRAMS.length - 1,
      Math.floor(p * PROGRAMS.length + 0.0001),
    );
    setActiveIndex(idx);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMounted, onScroll]);

  const active = PROGRAMS[activeIndex];
  const translateY = -(
    progress *
    (PROGRAMS.length - 1) *
    (isMounted ? window.innerHeight : 0)
  );

  if (!isMounted) {
    return (
      <div
        className="ps-stage"
        style={{ height: `${PROGRAMS.length * 100}vh`, background: "#080808" }}
      >
        <div
          className="ps-shell"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.3)", fontFamily: "serif" }}>
            Loading programs…
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <FontLoader />
      <section
        ref={stageRef}
        className="ps-stage"
        aria-label="Our programs"
        style={{ height: `${PROGRAMS.length * 100}vh` }}
      >
        <div className="ps-shell">
          {/* ── LEFT PANEL ──────────────────────────────────── */}
          <div className="ps-left">
            {/* Dynamic glow */}
            <div
              className="ps-left-glow"
              style={{
                background: `radial-gradient(ellipse 80% 60% at 20% 110%, ${active.accent} 0%, transparent 70%)`,
              }}
            />
            <div className="ps-left-vignette" />

            <span className="ps-counter">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(PROGRAMS.length).padStart(2, "0")}
            </span>

            {!isMobile && (
              <>
                <p className="ps-eyebrow pt-8" style={{ color: active.tint }}>
                  Our programs
                </p>
                <h2 className="ps-headline pt-6">
                  Where Young Talents
                  <br />
                  Become <em style={{ color: active.tint }}>Future Leaders</em>
                </h2>
              </>
            )}

            {/* Active program detail */}
            <div className="ps-active-info">
              <p className="ps-active-tag" style={{ color: active.tint }}>
                {active.category}
              </p>
              <h3 className="ps-active-title">{active.title}</h3>
              <p className="ps-active-benefit">{active.benefit}</p>

              {!isMobile && (
                <div className="ps-meta-grid">
                  <div className="ps-meta-item">
                    <span className="ps-meta-label">Age Group</span>
                    <span className="ps-meta-value">8 – 17 years</span>
                  </div>
                  <div className="ps-meta-item">
                    <span className="ps-meta-label">Outcome</span>
                    <span className="ps-meta-value">{active.outcome}</span>
                  </div>
                  <div className="ps-meta-item">
                    <span className="ps-meta-label">Focus</span>
                    <span className="ps-meta-value">Skill & Confidence</span>
                  </div>
                  <div className="ps-meta-item">
                    <span className="ps-meta-label">Format</span>
                    <span className="ps-meta-value">Hands-on Sessions</span>
                  </div>
                </div>
              )}

              <button
                className="ps-cta"
                style={{ background: active.tint }}
                aria-label={`Enroll in ${active.title}`}
                onClick={() => onEnroll?.(active.title)}
              >
                Enroll Now
                <span className="ps-cta-arrow" />
              </button>
            </div>

            {/* Progress - hidden on mobile */}
            <div className="ps-progress-wrap">
              <div className="ps-progress-bar">
                <div
                  className="ps-progress-fill"
                  style={{
                    width: `${progress * 100}%`,
                    background: active.tint,
                  }}
                />
              </div>
              <span className="ps-progress-label">
                {Math.round(progress * 100)}%
              </span>
            </div>
          </div>

          {/* ── RIGHT PANEL ─────────────────────────────────── */}
          <div className="ps-right">
            {/* Card track — vertical scroll-jacking */}
            <div
              className="ps-track"
              style={{ transform: `translate3d(0, ${translateY}px, 0)` }}
            >
              {PROGRAMS.map((program, i) => (
                <ProgramCard
                  key={i}
                  program={program}
                  index={i}
                  isActive={i === activeIndex}
                />
              ))}
            </div>

            {/* Dot navigation */}
            <div
              className="ps-dots"
              role="tablist"
              aria-label="Program navigation"
            >
              {PROGRAMS.map((_, i) => (
                <div
                  key={i}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={PROGRAMS[i].title}
                  className={`ps-dot${i === activeIndex ? " is-active" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import { Target, Users, BookOpen, Trophy, Sparkles, Star } from "lucide-react";

const REASONS = [
  {
    icon: Target,
    title: "Future-Ready Curriculum",
    description:
      "Our programs are designed with tomorrow in mind. We don't just teach skills — we prepare your child for careers that don't even exist yet. Every module is crafted alongside industry experts and updated quarterly to stay ahead of global trends.",
    highlight: "Industry-aligned learning paths",
    accent: "#1d4ed8",
    cardAccentBg: "#dbeafe",
  },
  {
    icon: Users,
    title: "Expert Mentors & Small Groups",
    description:
      "Every child gets the attention they deserve. Our 6:1 student-to-mentor ratio ensures personalized guidance. Our mentors are not just teachers — they're practicing professionals who bring real-world experience into every session.",
    highlight: "6:1 student-to-mentor ratio",
    accent: "#6b21a8",
    cardAccentBg: "#f3e8ff",
  },
  {
    icon: BookOpen,
    title: "Learn by Doing Philosophy",
    description:
      "We believe the best learning happens through action. Forget passive lectures — our students build robots, run experiments, create art, and lead projects. 90% of class time is spent on hands-on activities and collaborative challenges.",
    highlight: "90% hands-on learning",
    accent: "#9d174d",
    cardAccentBg: "#fce7f3",
  },
  {
    icon: Trophy,
    title: "Proven Track Record",
    description:
      "Our results speak for themselves. Over 5,000 alumni have gone on to win national competitions, launch startups, and secure spots at top universities. We don't just teach — we transform potential into achievement.",
    highlight: "5,000+ successful alumni",
    accent: "#92400e",
    cardAccentBg: "#fef3c7",
  },
  {
    icon: Sparkles,
    title: "State-of-the-Art Facilities",
    description:
      "Step into our world-class innovation labs equipped with 3D printers, robotics kits, VR stations, and professional-grade creative suites. Your child learns in an environment that inspires curiosity and enables creation.",
    highlight: "Professional-grade equipment",
    accent: "#15803d",
    cardAccentBg: "#dcfce7",
  },
  {
    icon: Star,
    title: "Holistic Development Focus",
    description:
      "We nurture the complete individual — intellectual, emotional, and social. Beyond technical skills, we build confidence, resilience, leadership, and emotional intelligence. Our graduates leave ready for life, not just exams.",
    highlight: "Mind, body & character growth",
    accent: "#0369a1",
    cardAccentBg: "#e0f2fe",
  },
];

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  @keyframes wcu-slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes wcu-scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }

  .wcu-section {
    position: relative;
    background: #fdfaf6;
  }
  .wcu-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
  }
  .wcu-bg-glow {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transition: background 700ms ease;
  }
  .wcu-inner {
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    align-items: center;
    gap: 0;
  }

  /* ── LEFT PANEL ── */
  .wcu-left {
    width: 50%;
    padding-right: 64px;
    flex-shrink: 0;
  }
  .wcu-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    margin-bottom: 16px;
    transition: color 500ms ease;
    animation: wcu-slideUp 0.6s ease-out forwards;
  }
  .wcu-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 700;
    line-height: 1.1;
    color: #1c1510;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
    animation: wcu-slideUp 0.6s ease-out forwards;
    animation-delay: 100ms;
    opacity: 0;
  }
  .wcu-rule {
    height: 3px;
    width: 72px;
    border-radius: 99px;
    margin-bottom: 24px;
    transition: background-color 500ms ease;
    animation: wcu-slideUp 0.5s ease-out forwards;
    animation-delay: 200ms;
    opacity: 0;
  }
  .wcu-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.8;
    color: #6b5e52;
    margin-bottom: 24px;
    animation: wcu-slideUp 0.6s ease-out forwards;
    animation-delay: 250ms;
    opacity: 0;
  }
  .wcu-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: 99px;
    border: 1px solid;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: border-color 500ms ease, background 500ms ease, color 500ms ease;
    animation: wcu-scaleIn 0.5s ease-out forwards;
    animation-delay: 350ms;
    opacity: 0;
  }
  .wcu-counter-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 32px;
  }
  .wcu-counter-num {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 4vw, 48px);
    font-weight: 700;
    line-height: 1;
    transition: color 500ms ease;
    animation: wcu-scaleIn 0.4s ease-out forwards;
    animation-delay: 100ms;
    opacity: 0;
  }
  .wcu-counter-sep {
    font-family: 'DM Sans', sans-serif;
    font-size: 18px;
    color: #b8996e;
  }
  .wcu-counter-total {
    font-family: 'DM Sans', sans-serif;
    font-size: 18px;
    color: #b8996e;
  }
  .wcu-counter-line {
    flex: 1;
    height: 1px;
    background: #ede6dc;
    margin-left: 12px;
  }

  /* ── RIGHT PANEL — card stack ── */
  .wcu-right {
    flex: 1;
    position: relative;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wcu-card-wrap {
    position: absolute;
    width: 340px;
    height: 420px;
    transition: transform 700ms cubic-bezier(0.16,1,0.3,1),
                opacity 700ms ease,
                filter 700ms ease;
  }
  .wcu-card {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    border: 1px solid #ede6dc;
    background: #fff;
    padding: 32px;
    display: flex;
    flex-direction: column;
    transition: border-color 500ms ease, box-shadow 500ms ease;
  }
  .wcu-card.is-active {
    box-shadow: 0 20px 60px rgba(180,140,80,0.14);
  }
  .wcu-card-icon-wrap {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    flex-shrink: 0;
    transition: background 500ms ease;
  }
  .wcu-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: #1c1510;
    margin-bottom: 12px;
    line-height: 1.2;
  }
  .wcu-card-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 300;
    line-height: 1.7;
    color: #6b5e52;
    flex: 1;
  }
  .wcu-card-footer {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #f0e8dc;
  }
  .wcu-card-highlight {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    transition: color 500ms ease;
  }

  /* ── MOBILE DOTS ── */
  .wcu-mobile-dots {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
    gap: 8px;
    z-index: 10;
  }
  .wcu-dot {
    height: 6px;
    border-radius: 99px;
    transition: width 400ms cubic-bezier(0.16,1,0.3,1), background 300ms ease;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .wcu-right { display: none; }
    .wcu-left {
      width: 100%;
      padding-right: 0;
    }
    .wcu-mobile-dots { display: flex; }
  }
  @media (max-width: 640px) {
    .wcu-inner { padding: 0 24px; }
    .wcu-title { font-size: clamp(26px, 7vw, 38px); }
    .wcu-desc { font-size: 15px; }
  }
`;

function useStyleInjection() {
  useEffect(() => {
    const id = "wcu-styles";
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

export default function WhyChooseUs() {
  useStyleInjection();

  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      const idx = Math.min(
        REASONS.length - 1,
        Math.floor(p * REASONS.length + 0.0001),
      );
      setActiveIndex(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMounted]);

  if (!isMounted) {
    return (
      <section
        className="wcu-section"
        style={{ height: `${REASONS.length * 100}vh` }}
      >
        <div
          className="wcu-sticky"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#9c876e", fontFamily: "serif" }}>
            Loading…
          </span>
        </div>
      </section>
    );
  }

  const active = REASONS[activeIndex];
  const ActiveIcon = active.icon;

  const getCardStyle = (index) => {
    const diff = index - activeIndex;
    if (diff === 0) {
      return {
        transform: "translateX(0) scale(1)",
        opacity: 1,
        zIndex: 20,
        filter: "blur(0px)",
      };
    } else if (diff < 0) {
      const offset = diff * 55;
      return {
        transform: `translateX(${offset}px) scale(${Math.max(0.75, 0.88 + diff * 0.05)})`,
        opacity: Math.max(0, 0.38 + diff * 0.18),
        zIndex: 10 + diff,
        filter: `blur(${Math.min(Math.abs(diff) * 2, 6)}px)`,
      };
    } else {
      return {
        transform: `translateX(${110 + diff * 36}px) scale(${Math.max(0.75, 0.9 - diff * 0.05)})`,
        opacity: Math.max(0, 0.48 - diff * 0.14),
        zIndex: 10 - diff,
        filter: `blur(${Math.min(diff * 1.5, 6)}px)`,
      };
    }
  };

  return (
    <section
      ref={sectionRef}
      className="wcu-section"
      style={{ height: `${REASONS.length * 100}vh` }}
      aria-label="Why choose us"
    >
      <div className="wcu-sticky">
        {/* Warm ambient glow */}
        <div
          className="wcu-bg-glow"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 30% 50%, ${active.cardAccentBg} 0%, transparent 70%)`,
          }}
        />

        <div className="wcu-inner">
          {/* ── LEFT PANEL ── */}
          <div className="wcu-left">
            <p
              key={`label-${activeIndex}`}
              className="wcu-label"
              style={{ color: active.accent }}
            >
              Why Choose Us
            </p>

            <h2 key={`title-${activeIndex}`} className="wcu-title">
              {active.title}
            </h2>

            <div
              className="wcu-rule"
              style={{ backgroundColor: active.accent }}
            />

            <p key={`desc-${activeIndex}`} className="wcu-desc">
              {active.description}
            </p>

            <div
              key={`badge-${activeIndex}`}
              className="wcu-badge"
              style={{
                borderColor: `${active.accent}30`,
                backgroundColor: active.cardAccentBg,
                color: active.accent,
              }}
            >
              <Star size={14} aria-hidden="true" />
              {active.highlight}
            </div>

            <div className="wcu-counter-row">
              <span
                key={`num-${activeIndex}`}
                className="wcu-counter-num"
                style={{ color: active.accent }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="wcu-counter-sep">/</span>
              <span className="wcu-counter-total">
                {String(REASONS.length).padStart(2, "0")}
              </span>
              <div className="wcu-counter-line" />
            </div>
          </div>

          {/* ── RIGHT PANEL — card stack ── */}
          <div className="wcu-right">
            {REASONS.map((reason, index) => {
              const Icon = reason.icon;
              const cardStyle = getCardStyle(index);
              const isActive = index === activeIndex;

              return (
                <div key={index} className="wcu-card-wrap" style={cardStyle}>
                  <div
                    className={`wcu-card${isActive ? " is-active" : ""}`}
                    style={{
                      borderColor: isActive ? `${reason.accent}30` : "#ede6dc",
                    }}
                  >
                    <div
                      className="wcu-card-icon-wrap"
                      style={{
                        backgroundColor: reason.cardAccentBg,
                        color: reason.accent,
                      }}
                    >
                      <Icon size={24} aria-hidden="true" />
                    </div>

                    <h3 className="wcu-card-title">{reason.title}</h3>

                    <p className="wcu-card-desc">
                      {reason.description.slice(0, 148)}…
                    </p>

                    <div className="wcu-card-footer">
                      <span
                        className="wcu-card-highlight"
                        style={{ color: reason.accent }}
                      >
                        {reason.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE DOTS ── */}
        <div className="wcu-mobile-dots">
          {REASONS.map((reason, index) => (
            <div
              key={index}
              className="wcu-dot"
              style={{
                width: index === activeIndex ? 24 : 8,
                backgroundColor:
                  index === activeIndex ? reason.accent : "#ede6dc",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

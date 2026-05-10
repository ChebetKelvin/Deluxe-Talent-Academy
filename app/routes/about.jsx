import { useEffect, useRef, useState } from "react";

/* ─── Font + Style injection ─────────────────────────────────────────────── */
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,300;1,400;1,600&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap";

const STYLES = `
:root {
  --cream: #faf5eb;
  --cream2: #f5ede0;
  --amber: #d97706;
  --amber-light: #fde68a;
  --amber-pale: #fffbf0;
  --ink: #1a1208;
  --ink2: #3d2e1a;
  --ink3: #6b5230;
  --ink4: #9a7a50;
  --rule: rgba(180,130,60,0.2);
  --tape: rgba(251,191,36,0.35);
}

@keyframes ap-reveal    { from{opacity:0;transform:translateY(22px)}  to{opacity:1;transform:translateY(0)} }
@keyframes ap-revealL   { from{opacity:0;transform:translateX(-22px)} to{opacity:1;transform:translateX(0)} }
@keyframes ap-revealR   { from{opacity:0;transform:translateX(22px)}  to{opacity:1;transform:translateX(0)} }
@keyframes ap-scaleIn   { from{opacity:0;transform:scale(0.96)}        to{opacity:1;transform:scale(1)} }
@keyframes ap-ticker    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

.ap-r0  { opacity:0 } .ap-r0.ap-on  { animation: ap-reveal  .8s cubic-bezier(.16,1,.3,1) forwards }
.ap-rl  { opacity:0 } .ap-rl.ap-on  { animation: ap-revealL .8s cubic-bezier(.16,1,.3,1) forwards }
.ap-rr  { opacity:0 } .ap-rr.ap-on  { animation: ap-revealR .8s cubic-bezier(.16,1,.3,1) forwards }
.ap-rs  { opacity:0 } .ap-rs.ap-on  { animation: ap-scaleIn .7s cubic-bezier(.16,1,.3,1) forwards }
.ap-d1 { animation-delay:.08s } .ap-d2 { animation-delay:.16s }
.ap-d3 { animation-delay:.24s } .ap-d4 { animation-delay:.32s }
.ap-d5 { animation-delay:.42s }

/* paper grid */
.ap-section {
  background: var(--cream);
  font-family: 'DM Sans', sans-serif;
  color: var(--ink);
  overflow-x: hidden;
}
.ap-section::before {
  content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:
    repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(180,130,60,0.06) 27px,rgba(180,130,60,0.06) 28px),
    repeating-linear-gradient(90deg,transparent,transparent 27px,rgba(180,130,60,0.03) 27px,rgba(180,130,60,0.03) 28px);
}

/* ── HERO ── */
.ap-hero {
  position:relative;z-index:1;
  padding:80px 64px 60px;
  border-bottom:1px solid var(--rule);
  background:var(--amber-pale);
  overflow:hidden;
}
.ap-hero::after {
  content:'';position:absolute;right:-60px;top:-60px;
  width:320px;height:320px;border-radius:50%;
  background:rgba(217,119,6,0.07);pointer-events:none;
}
.ap-overline {
  display:inline-flex;align-items:center;gap:10px;
  font-size:10px;font-weight:500;letter-spacing:.25em;text-transform:uppercase;
  color:var(--amber);margin-bottom:24px;
}
.ap-dash { width:28px;height:1.5px;background:var(--amber) }
.ap-hero-headline {
  font-family:'Playfair Display',serif;
  font-size:clamp(52px,7vw,96px);font-weight:700;
  line-height:.96;letter-spacing:-.03em;color:var(--ink);margin-bottom:28px;
}
.ap-hero-headline em {
  font-style:italic;font-weight:400;color:var(--amber);display:block;
  font-size:clamp(44px,5.5vw,80px);
}
.ap-hero-sub {
  font-family:'Lora',serif;font-size:17px;font-style:italic;
  line-height:1.85;color:var(--ink3);max-width:480px;
  border-left:2px solid var(--amber-light);padding-left:18px;
}
.ap-stamp {
  position:absolute;right:80px;bottom:40px;
  width:100px;height:100px;border-radius:50%;
  border:2px solid var(--amber);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  opacity:.4;transform:rotate(12deg);
}
.ap-stamp-year {
  font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:var(--amber);line-height:1;
}
.ap-stamp-text { font-size:9px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:var(--amber) }

/* ── TICKER ── */
.ap-ticker-wrap {
  overflow:hidden;
  border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);
  padding:10px 0;background:var(--cream2);position:relative;z-index:1;
}
.ap-ticker-track {
  display:flex;gap:0;white-space:nowrap;
  animation:ap-ticker 28s linear infinite;
}
.ap-ticker-item {
  display:inline-flex;align-items:center;gap:14px;padding:0 32px;
  font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--ink4);
}
.ap-ticker-dot { width:4px;height:4px;border-radius:50%;background:var(--amber);flex-shrink:0 }

/* ── FOUNDING ── */
.ap-founding {
  display:grid;grid-template-columns:1fr 1fr;
  border-bottom:1px solid var(--rule);min-height:520px;
  position:relative;z-index:1;
}
.ap-founding-left {
  padding:72px 60px 64px;
  border-right:1px solid var(--rule);position:relative;
}
.ap-founding-right {
  padding:72px 56px 64px;background:var(--cream2);
  position:relative;display:flex;flex-direction:column;justify-content:center;
}
.ap-beat-num {
  font-family:'Playfair Display',serif;
  font-size:clamp(100px,14vw,160px);font-weight:700;line-height:.85;
  color:rgba(217,119,6,0.1);letter-spacing:-.04em;
  position:absolute;top:28px;left:40px;pointer-events:none;user-select:none;
}
.ap-beat-label {
  font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;
  color:var(--amber);margin-bottom:16px;position:relative;z-index:1;
}
.ap-beat-headline {
  font-family:'Playfair Display',serif;
  font-size:clamp(28px,3.5vw,44px);font-weight:600;line-height:1.1;letter-spacing:-.02em;
  color:var(--ink);margin-bottom:18px;position:relative;z-index:1;
}
.ap-beat-headline em { font-style:italic;font-weight:400;color:var(--amber) }
.ap-beat-body {
  font-family:'Lora',serif;font-size:15px;line-height:1.85;
  color:var(--ink2);position:relative;z-index:1;max-width:380px;
}
.ap-tape {
  display:inline-block;background:var(--tape);padding:2px 10px;
  transform:rotate(-1.5deg);
  font-size:11px;font-weight:500;letter-spacing:.1em;color:var(--ink3);margin-bottom:12px;
}
.ap-pull-quote {
  font-family:'Playfair Display',serif;
  font-size:clamp(22px,3vw,32px);font-style:italic;font-weight:400;
  line-height:1.35;color:var(--ink);
  border-top:2px solid var(--amber);padding-top:20px;margin-bottom:20px;
}
.ap-pull-quote::before {
  content:'\\201C';font-size:64px;line-height:.5;color:var(--amber);
  display:block;margin-bottom:8px;font-weight:700;
}
.ap-pull-attr { font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink4) }

/* ── MISSION (dark) ── */
.ap-mission {
  padding:88px 64px;background:var(--ink);position:relative;overflow:hidden;z-index:1;
}
.ap-mission::before {
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 60% 50% at 15% 50%,rgba(217,119,6,0.12) 0%,transparent 60%),
    radial-gradient(ellipse 40% 60% at 85% 50%,rgba(217,119,6,0.06) 0%,transparent 60%);
  pointer-events:none;
}
.ap-mission-inner { max-width:900px;margin:0 auto;text-align:center;position:relative;z-index:1 }
.ap-mission-label {
  font-size:10px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;
  color:rgba(253,230,138,0.6);margin-bottom:28px;
}
.ap-mission-statement {
  font-family:'Playfair Display',serif;
  font-size:clamp(28px,4.5vw,56px);font-weight:500;line-height:1.18;letter-spacing:-.02em;
  color:#faf5eb;margin-bottom:32px;
}
.ap-mission-statement em { font-style:italic;font-weight:300;color:var(--amber-light) }
.ap-pillars {
  display:flex;justify-content:center;gap:0;
  border-top:1px solid rgba(255,255,255,0.08);padding-top:36px;
}
.ap-pillar { padding:0 36px;border-right:1px solid rgba(255,255,255,0.08);text-align:center }
.ap-pillar:last-child { border-right:none }
.ap-pillar-icon { font-size:22px;margin-bottom:10px }
.ap-pillar-name { font-family:'Playfair Display',serif;font-size:17px;font-style:italic;color:var(--amber-light);margin-bottom:6px }
.ap-pillar-desc { font-size:12px;color:rgba(250,245,235,0.45);line-height:1.6 }

/* ── MILESTONES ── */
.ap-milestones {
  padding:80px 64px 72px;border-bottom:1px solid var(--rule);
  background:var(--amber-pale);position:relative;z-index:1;
}
.ap-ms-header { margin-bottom:56px }
.ap-ms-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:0 }
.ap-ms-item {
  padding:28px 36px 32px;
  border-right:1px solid var(--rule);border-bottom:1px solid var(--rule);
  position:relative;transition:background .3s ease;
}
.ap-ms-item:nth-child(3n)   { border-right:none }
.ap-ms-item:nth-child(n+4)  { border-bottom:none }
.ap-ms-item:hover { background:rgba(217,119,6,0.04) }
.ap-ms-year {
  font-family:'Playfair Display',serif;
  font-size:clamp(40px,5vw,60px);font-weight:700;line-height:1;
  color:rgba(217,119,6,0.18);letter-spacing:-.03em;margin-bottom:8px;
}
.ap-ms-title { font-family:'Playfair Display',serif;font-size:18px;font-weight:600;color:var(--ink);margin-bottom:8px }
.ap-ms-desc  { font-size:13px;line-height:1.7;color:var(--ink3) }
.ap-ms-badge { position:absolute;top:24px;right:20px;width:8px;height:8px;border-radius:50%;background:var(--amber);opacity:.5 }

/* ── TEAM ── */
.ap-team {
  display:grid;grid-template-columns:380px 1fr;
  border-bottom:1px solid var(--rule);min-height:480px;position:relative;z-index:1;
}
.ap-team-left  { padding:72px 60px 64px;border-right:1px solid var(--rule);background:var(--cream2) }
.ap-team-right { padding:64px 60px;display:grid;grid-template-columns:1fr 1fr;gap:0;align-content:start }
.ap-team-card {
  padding:28px 28px 32px;
  border-right:1px solid var(--rule);border-bottom:1px solid var(--rule);
}
.ap-team-card:nth-child(2n)      { border-right:none }
.ap-team-card:nth-last-child(-n+2){ border-bottom:none }
.ap-tc-initial {
  width:60px;height:60px;border-radius:50%;
  background:linear-gradient(135deg,rgba(217,119,6,.15),rgba(217,119,6,.05));
  border:2px solid rgba(217,119,6,.2);
  display:flex;align-items:center;justify-content:center;
  font-family:'Playfair Display',serif;font-size:22px;font-weight:600;
  color:var(--amber);margin-bottom:14px;
}
.ap-tc-name { font-family:'Playfair Display',serif;font-size:16px;font-weight:600;color:var(--ink);margin-bottom:3px }
.ap-tc-role { font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--amber);margin-bottom:10px }
.ap-tc-note { font-family:'Lora',serif;font-size:13px;font-style:italic;line-height:1.65;color:var(--ink3) }

/* ── VISION ── */
.ap-vision { padding:96px 64px;background:var(--cream);position:relative;overflow:hidden;z-index:1 }
.ap-vision-inner {
  max-width:1000px;margin:0 auto;
  display:grid;grid-template-columns:1fr 1.2fr;gap:80px;align-items:center;
}
.ap-vision-num {
  font-family:'Playfair Display',serif;
  font-size:clamp(120px,16vw,200px);font-weight:700;line-height:.85;letter-spacing:-.05em;
  color:rgba(217,119,6,0.07);position:absolute;left:40px;bottom:40px;
  pointer-events:none;user-select:none;
}
.ap-promises { display:flex;flex-direction:column;gap:18px }
.ap-promise {
  display:flex;align-items:flex-start;gap:14px;padding:18px 20px;
  background:#fff;border:1px solid var(--rule);border-radius:4px;
  position:relative;overflow:hidden;transition:transform .3s ease,box-shadow .3s ease;
}
.ap-promise:hover { transform:translateX(4px);box-shadow:inset 3px 0 0 var(--amber) }
.ap-promise-num { font-family:'Playfair Display',serif;font-size:13px;font-weight:600;color:var(--amber);min-width:22px;margin-top:1px }
.ap-promise-text { font-size:14px;line-height:1.65;color:var(--ink2) }
.ap-promise-text strong { font-weight:500;color:var(--ink) }

/* ── MANIFESTO ── */
.ap-manifesto {
  padding:80px 64px 96px;background:var(--cream2);
  border-top:1px solid var(--rule);text-align:center;position:relative;overflow:hidden;z-index:1;
}
.ap-manifesto-headline {
  font-family:'Playfair Display',serif;
  font-size:clamp(32px,5vw,64px);font-weight:700;line-height:1.05;letter-spacing:-.03em;
  color:var(--ink);margin-bottom:24px;
}
.ap-manifesto-headline em { font-style:italic;font-weight:300;color:var(--amber) }
.ap-manifesto-body {
  font-family:'Lora',serif;font-size:16px;font-style:italic;line-height:1.9;
  color:var(--ink3);max-width:640px;margin:0 auto 40px;
}
.ap-sig      { font-family:'Playfair Display',serif;font-size:28px;font-style:italic;color:var(--amber);margin-bottom:4px }
.ap-sig-sub  { font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--ink4) }

/* ── MOBILE RESPONSIVE ── */
@media (max-width: 1024px) {
  .ap-team { grid-template-columns: 1fr; }
  .ap-team-left { border-right: none; border-bottom: 1px solid var(--rule); padding: 48px 32px 40px; }
  .ap-team-right { grid-template-columns: 1fr; padding: 40px 32px; }
  .ap-team-card { border-right: none; }
  .ap-team-card:nth-last-child(-n+2) { border-bottom: 1px solid var(--rule); }
  .ap-team-card:last-child { border-bottom: none; }
  
  .ap-vision-inner { grid-template-columns: 1fr; gap: 48px; }
  .ap-vision-num { font-size: 100px; left: 20px; bottom: 20px; }
}

@media (max-width: 768px) {
  .ap-hero {
    padding: 60px 24px 48px;
  }
  .ap-hero-headline {
    font-size: clamp(36px, 10vw, 56px);
    margin-bottom: 20px;
  }
  .ap-hero-headline em {
    font-size: clamp(32px, 8vw, 48px);
  }
  .ap-hero-sub {
    font-size: 15px;
    max-width: 100%;
    padding-left: 14px;
  }
  .ap-stamp {
    position: relative;
    right: auto;
    bottom: auto;
    margin-top: 32px;
    transform: rotate(6deg);
    width: 80px;
    height: 80px;
  }
  .ap-stamp-year { font-size: 22px; }
  
  .ap-founding {
    grid-template-columns: 1fr;
    min-height: auto;
  }
  .ap-founding-left {
    padding: 48px 24px 40px;
    border-right: none;
    border-bottom: 1px solid var(--rule);
  }
  .ap-founding-right {
    padding: 40px 24px 48px;
  }
  .ap-beat-num {
    font-size: 80px;
    top: 20px;
    left: 16px;
  }
  .ap-beat-headline {
    font-size: clamp(24px, 6vw, 32px);
  }
  
  .ap-mission {
    padding: 60px 24px;
  }
  .ap-pillars {
    flex-direction: column;
    gap: 24px;
  }
  .ap-pillar {
    padding: 0;
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding-bottom: 24px;
  }
  .ap-pillar:last-child { border-bottom: none; padding-bottom: 0; }
  
  .ap-milestones {
    padding: 48px 24px 56px;
  }
  .ap-ms-grid {
    grid-template-columns: 1fr;
  }
  .ap-ms-item {
    border-right: none;
    padding: 24px 20px 28px;
  }
  .ap-ms-item:nth-child(n+4) { border-bottom: 1px solid var(--rule); }
  .ap-ms-item:last-child { border-bottom: none; }
  
  .ap-team-left { padding: 48px 24px 40px; }
  .ap-team-right { padding: 32px 24px; }
  
  .ap-vision {
    padding: 60px 24px;
  }
  .ap-vision-inner { gap: 32px; }
  .ap-vision-num {
    font-size: 80px;
    position: relative;
    left: auto;
    bottom: auto;
    margin-bottom: 24px;
  }
  
  .ap-manifesto {
    padding: 60px 24px 72px;
  }
  .ap-manifesto-headline {
    font-size: clamp(28px, 7vw, 42px);
  }
  .ap-manifesto-body {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .ap-hero {
    padding: 48px 16px 40px;
  }
  .ap-hero-headline {
    font-size: clamp(32px, 9vw, 44px);
  }
  .ap-hero-headline em {
    font-size: clamp(28px, 7vw, 38px);
  }
  .ap-hero-sub {
    font-size: 14px;
  }
  
  .ap-overine {
    font-size: 9px;
    gap: 6px;
  }
  .ap-dash { width: 20px; }
  
  .ap-ticker-item {
    padding: 0 20px;
    font-size: 10px;
    gap: 10px;
  }
  
  .ap-founding-left,
  .ap-founding-right {
    padding: 40px 16px 32px;
  }
  .ap-beat-num {
    font-size: 60px;
    top: 16px;
    left: 12px;
  }
  .ap-beat-body {
    font-size: 14px;
  }
  
  .ap-mission {
    padding: 48px 16px;
  }
  .ap-mission-statement {
    font-size: clamp(24px, 6vw, 32px);
  }
  
  .ap-milestones {
    padding: 40px 16px 48px;
  }
  .ap-ms-header { margin-bottom: 32px; }
  .ap-ms-year {
    font-size: clamp(32px, 8vw, 48px);
  }
  
  .ap-team-left {
    padding: 40px 16px 32px;
  }
  .ap-team-right {
    padding: 24px 16px;
  }
  .ap-team-card {
    padding: 20px 16px 24px;
  }
  
  .ap-vision {
    padding: 48px 16px;
  }
  .ap-promise {
    padding: 14px 16px;
  }
  .ap-promise-text {
    font-size: 13px;
  }
  
  .ap-manifesto {
    padding: 48px 16px 64px;
  }
}
`;

/* ─── Data ───────────────────────────────────────────────────────────────── */
const TICKER_WORDS = [
  "Curiosity",
  "Confidence",
  "Leadership",
  "Innovation",
  "Creativity",
  "Teamwork",
  "Purpose",
  "Growth",
  "Courage",
  "Discovery",
];

const MILESTONES = [
  {
    year: "2020",
    title: "The Beginning",
    desc: "Founded with 3 programs and 40 students in a single Meru classroom.",
  },
  {
    year: "2021",
    title: "First Cohort Completes",
    desc: "Our pilot students finish their programs. Three win regional STEM competitions.",
  },
  {
    year: "2022",
    title: "9 Programs Launch",
    desc: "Expanded from STEM into arts, sports, leadership, and culinary disciplines.",
  },
  {
    year: "2023",
    title: "School Partnerships",
    desc: "Partnered with 5+ schools across Meru and surrounding areas, bringing programs directly to students.",
  },
  {
    year: "2024",
    title: "3,000 Learners",
    desc: "Crossed a milestone we once whispered as a dream. Now it's a fact on the wall.",
  },
  {
    year: "Next",
    title: "Still Writing It",
    desc: "More programs, more cities, more children who find what they were made for.",
  },
];

const TEAM = [
  {
    initials: "ET",
    name: "Evans Thuranira",
    role: "Founder & Director",
    note: "Former aerospace engineer. Believes drones are just the beginning of what children can build.",
  },
  {
    initials: "KC",
    name: "Kelvin Chebet",
    role: "Head of STEM Programs",
    note: "Robotics national finalist. Has never met a child who wasn't curious — only ones who hadn't been asked.",
  },
  {
    initials: "FK",
    name: "Frankline Mwenda",
    role: "Creative Arts Lead",
    note: "Documentary filmmaker turned educator. Teaches students to see stories in everything.",
  },
  {
    initials: "DN",
    name: "David Njoroge",
    role: "Sports & Leadership",
    note: "Former national football captain. Discipline is just another word for caring about something deeply.",
  },
];

const PROMISES = [
  {
    n: "01.",
    text: (
      <>
        Expand to <strong>5 cities</strong> across East Africa by 2027, starting
        with Mombasa and Kisumu.
      </>
    ),
  },
  {
    n: "02.",
    text: (
      <>
        <strong>Launch digital programs</strong> so children outside Nairobi can
        access expert mentors remotely.
      </>
    ),
  },
  {
    n: "03.",
    text: (
      <>
        <strong>100 school partnerships</strong> — bringing our programs into
        the timetable, not just after it.
      </>
    ),
  },
  {
    n: "04.",
    text: (
      <>
        A <strong>scholarship program</strong> ensuring cost is never the reason
        a child misses out.
      </>
    ),
  },
  {
    n: "05.",
    text: (
      <>
        <strong>10,000 learners</strong> who grew into confident, creative,
        capable young people.
      </>
    ),
  },
];

/* ─── Hooks ──────────────────────────────────────────────────────────────── */
function useStyleInjection() {
  useEffect(() => {
    const id = "ap-styles";
    if (document.getElementById(id)) return;
    const tag = document.createElement("style");
    tag.id = id;
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return () => {
      const el = document.getElementById(id);
      el && document.head.removeChild(el);
    };
  }, []);
}

function useFontInjection() {
  useEffect(() => {
    const id = "ap-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = FONTS_URL;
    document.head.appendChild(link);
  }, []);
}

function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ap-on");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".ap-r0,.ap-rl,.ap-rr,.ap-rs")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function AboutPage() {
  useStyleInjection();
  useFontInjection();
  useScrollReveal();

  const doubled = [...TICKER_WORDS, ...TICKER_WORDS];

  return (
    <div className="ap-section">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <div className="ap-hero">
        <div className="ap-overline ap-r0">
          <div className="ap-dash" /> About the Academy{" "}
          <div className="ap-dash" />
        </div>
        <h1 className="ap-hero-headline ap-r0 ap-d1">
          Built from
          <em>a single belief.</em>
        </h1>
        <p className="ap-hero-sub ap-r0 ap-d2">
          Every child carries potential that a classroom alone cannot fully
          reach. We built this academy to go further — into the hands, the
          imagination, and the future.
        </p>
        <div className="ap-stamp">
          <span className="ap-stamp-text">Est.</span>
          <span className="ap-stamp-year">2020</span>
          <span className="ap-stamp-text">Meru, Kenya</span>
        </div>
      </div>

      {/* ── TICKER ────────────────────────────────────────────────────── */}
      <div className="ap-ticker-wrap">
        <div className="ap-ticker-track">
          {doubled.map((word, i) => (
            <span key={i} className="ap-ticker-item">
              <span className="ap-ticker-dot" /> {word}
            </span>
          ))}
        </div>
      </div>

      {/* ── BEAT 01: FOUNDING ─────────────────────────────────────────── */}
      <section className="ap-founding">
        <div className="ap-founding-left">
          <div className="ap-beat-num">01</div>
          <p className="ap-beat-label ap-rl">The Founding</p>
          <h2 className="ap-beat-headline ap-rl ap-d1">
            It started with a<br />
            <em>question no one asked.</em>
          </h2>
          <p className="ap-beat-body ap-rl ap-d2">
            In 2020, our founders watched brilliant children sit through
            programmes built for averages — not potential. The spark came not in
            a boardroom, but in a conversation with a ten-year-old who wanted to
            build a drone but had nowhere to go.
          </p>
          <br />
          <p className="ap-beat-body ap-rl ap-d3">
            So they made a place. A real one — with real tools, real mentors,
            and the radical belief that children aged 8 to 17 deserve access to
            the same opportunities as anyone else.
          </p>
        </div>
        <div className="ap-founding-right ap-rr">
          <span className="ap-tape ap-r0 ap-d1">founder's note, 2020</span>
          <blockquote className="ap-pull-quote">
            We didn't set out to build a company. We set out to answer a child's
            question.
          </blockquote>
          <p className="ap-pull-attr">— Co-founder, Academy</p>
        </div>
      </section>

      {/* ── BEAT 02: MISSION ──────────────────────────────────────────── */}
      <section className="ap-mission">
        <div className="ap-mission-inner">
          <p className="ap-mission-label ap-r0">What we believe</p>
          <h2 className="ap-mission-statement ap-r0 ap-d1">
            Every child deserves a space where
            <br />
            <em>curiosity becomes courage,</em>
            <br />
            and potential becomes purpose.
          </h2>
          <div className="ap-pillars ap-r0 ap-d2">
            {[
              {
                icon: "✦",
                name: "Creativity",
                desc: "Imagination applied to real problems",
              },
              {
                icon: "✦",
                name: "Confidence",
                desc: "The courage to try and to fail forward",
              },
              {
                icon: "✦",
                name: "Leadership",
                desc: "The ability to guide, not just follow",
              },
              {
                icon: "✦",
                name: "Readiness",
                desc: "Skills that outlast any classroom",
              },
            ].map((p) => (
              <div key={p.name} className="ap-pillar">
                <div className="ap-pillar-icon">{p.icon}</div>
                <div className="ap-pillar-name">{p.name}</div>
                <div className="ap-pillar-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEAT 03: MILESTONES ───────────────────────────────────────── */}
      <section className="ap-milestones">
        <div className="ap-ms-header">
          <p className="ap-beat-label ap-r0">The journey so far</p>
          <h2
            className="ap-beat-headline ap-r0 ap-d1"
            style={{ maxWidth: 500 }}
          >
            Four years of <em>moments that mattered.</em>
          </h2>
        </div>
        <div className="ap-ms-grid">
          {MILESTONES.map((m, i) => (
            <div key={i} className={`ap-ms-item ap-rs ap-d${(i % 5) + 1}`}>
              <div className="ap-ms-badge" />
              <div className="ap-ms-year">{m.year}</div>
              <div className="ap-ms-title">{m.title}</div>
              <div className="ap-ms-desc">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BEAT 04: TEAM ─────────────────────────────────────────────── */}
      <section className="ap-team">
        <div className="ap-team-left">
          <div
            className="ap-beat-num"
            style={{ fontSize: 120, top: 20, left: 20 }}
          >
            04
          </div>
          <p className="ap-beat-label ap-rl">The People</p>
          <h2 className="ap-beat-headline ap-rl ap-d1">
            Mentors before
            <br />
            <em>they were teachers.</em>
          </h2>
          <p className="ap-beat-body ap-rl ap-d2" style={{ marginTop: 12 }}>
            Our team isn't assembled from CVs. They're people who have competed,
            built, performed, and created — and chose to come back to show the
            next generation how.
          </p>
          <br />
          <p className="ap-beat-body ap-rl ap-d3">
            Every mentor carries a story. Every story becomes part of a
            student's foundation.
          </p>
        </div>
        <div className="ap-team-right">
          {TEAM.map((t, i) => (
            <div key={i} className={`ap-team-card ap-rs ap-d${i + 1}`}>
              <div className="ap-tc-initial">{t.initials}</div>
              <div className="ap-tc-name">{t.name}</div>
              <div className="ap-tc-role">{t.role}</div>
              <p className="ap-tc-note">{t.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BEAT 05: VISION ───────────────────────────────────────────── */}
      <section className="ap-vision">
        <div className="ap-vision-num">05</div>
        <div className="ap-vision-inner">
          <div>
            <p className="ap-beat-label ap-r0">The Vision</p>
            <h2
              className="ap-beat-headline ap-r0 ap-d1"
              style={{ marginBottom: 16 }}
            >
              Where we're
              <br />
              <em>going next.</em>
            </h2>
            <p className="ap-beat-body ap-r0 ap-d2">
              We are building the infrastructure of young talent in East Africa.
              A generation from now, we want every child between 8 and 17 to
              have a place that says:{" "}
              <em>you belong here, and you have something to build.</em>
            </p>
          </div>
          <div className="ap-promises">
            {PROMISES.map((p, i) => (
              <div key={i} className={`ap-promise ap-r0 ap-d${i + 1}`}>
                <span className="ap-promise-num">{p.n}</span>
                <span className="ap-promise-text">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ─────────────────────────────────────────────────── */}
      <section className="ap-manifesto">
        <h2 className="ap-manifesto-headline ap-r0">
          This is not just
          <br />
          an academy.
          <br />
          <em>It is a beginning.</em>
        </h2>
        <p className="ap-manifesto-body ap-r0 ap-d1">
          Every child who walks through our doors carries a future we haven't
          imagined yet. Our job is simply to make sure they have the tools, the
          courage, and the community to build it.
        </p>
        <div className="ap-sig ap-r0 ap-d2">The Academy Team</div>
        <div className="ap-sig-sub ap-r0 ap-d3">Meru, Kenya · Est. 2020</div>
      </section>
    </div>
  );
}

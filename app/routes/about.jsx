import { useEffect, useRef } from "react";

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,300;1,400;1,600&family=Nunito:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap";

/* ─── Unsplash images mapped to sections ────────────────────────────────── */
const IMGS = {
  hero: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1800&fit=crop&q=80",
  founding:
    "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1000&fit=crop&q=80",
  mission:
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&fit=crop&q=80",
  robotics:
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&fit=crop&q=80",
  culinary:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&fit=crop&q=80",
  sports:
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=900&fit=crop&q=80",
  arts: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&fit=crop&q=80",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&fit=crop&q=80",
  vision:
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&fit=crop&q=80",
};

const MILESTONES = [
  {
    year: "2020",
    title: "The Beginning",
    desc: "Founded with 3 programs and 40 students in a single Meru classroom.",
  },
  {
    year: "2021",
    title: "First Cohort",
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
    desc: "Partnered with 5+ schools across Meru and surrounding areas.",
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

const PROGRAMS_GRID = [
  { img: IMGS.robotics, label: "Robotics & Coding" },
  { img: IMGS.culinary, label: "Culinary Arts" },
  { img: IMGS.sports, label: "Football & Sports" },
  { img: IMGS.arts, label: "Visual Media & Arts" },
];

const PROMISES = [
  {
    n: "01",
    text: "Expand to 5 cities across East Africa by 2027, starting with Mombasa and Kisumu.",
  },
  {
    n: "02",
    text: "Launch digital programs so children outside Nairobi can access expert mentors remotely.",
  },
  {
    n: "03",
    text: "100 school partnerships — bringing programs into the timetable, not just after it.",
  },
  {
    n: "04",
    text: "A scholarship program ensuring cost is never the reason a child misses out.",
  },
  {
    n: "05",
    text: "10,000 learners who grow into confident, creative, capable young people.",
  },
];

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const STYLES = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ab-root {
  background: #fdfaf6;
  font-family: 'Nunito', sans-serif;
  color: #1c1510;
  overflow-x: hidden;
}

/* ── reveal animations ── */
@keyframes ab-up   { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
@keyframes ab-left { from{opacity:0;transform:translateX(-36px)} to{opacity:1;transform:translateX(0)} }
@keyframes ab-right{ from{opacity:0;transform:translateX(36px)}  to{opacity:1;transform:translateX(0)} }
@keyframes ab-scale{ from{opacity:0;transform:scale(0.94)}       to{opacity:1;transform:scale(1)} }
@keyframes ab-fade { from{opacity:0} to{opacity:1} }

.ab-rv   { opacity:0 } .ab-rv.on   { animation: ab-up    .85s cubic-bezier(.16,1,.3,1) forwards }
.ab-rvl  { opacity:0 } .ab-rvl.on  { animation: ab-left  .85s cubic-bezier(.16,1,.3,1) forwards }
.ab-rvr  { opacity:0 } .ab-rvr.on  { animation: ab-right .85s cubic-bezier(.16,1,.3,1) forwards }
.ab-rvs  { opacity:0 } .ab-rvs.on  { animation: ab-scale .8s  cubic-bezier(.16,1,.3,1) forwards }
.ab-rvf  { opacity:0 } .ab-rvf.on  { animation: ab-fade  .9s  ease forwards }
.d1{animation-delay:.08s} .d2{animation-delay:.16s} .d3{animation-delay:.26s}
.d4{animation-delay:.36s} .d5{animation-delay:.46s}

/* ════════════════════════════════════════════════
   1. HERO — full bleed cinematic
════════════════════════════════════════════════ */
.ab-hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}
.ab-hero-img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center 30%;
  filter: saturate(0.9) brightness(0.7);
}
.ab-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(10,6,2,0.88) 0%,
    rgba(10,6,2,0.4)  45%,
    rgba(10,6,2,0.15) 100%
  );
}
.ab-hero-content {
  position: relative;
  z-index: 2;
  padding: 0 72px 72px;
  max-width: 1100px;
}
.ab-hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(217,119,6,0.2);
  border: 1px solid rgba(217,119,6,0.4);
  border-radius: 99px;
  padding: 6px 16px 6px 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fde68a;
  margin-bottom: 28px;
}
.ab-hero-pill-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #d97706;
}
.ab-hero-h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(48px, 7vw, 96px);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: #fdfaf6;
  margin-bottom: 28px;
}
.ab-hero-h1 em {
  font-style: italic;
  font-weight: 400;
  color: #fde68a;
  display: block;
}
.ab-hero-sub {
  font-size: 17px;
  font-weight: 300;
  line-height: 1.75;
  color: rgba(253,250,246,0.72);
  max-width: 520px;
  margin-bottom: 40px;
}
.ab-hero-stats {
  display: flex;
  gap: 0;
  border: 1px solid rgba(253,250,246,0.15);
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  background: rgba(253,250,246,0.07);
  width: fit-content;
}
.ab-hero-stat {
  padding: 16px 32px;
  border-right: 1px solid rgba(253,250,246,0.12);
  text-align: center;
}
.ab-hero-stat:last-child { border-right: none; }
.ab-hero-stat-num {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  color: #fdfaf6;
  line-height: 1;
  margin-bottom: 4px;
}
.ab-hero-stat-num span { color: #d97706; }
.ab-hero-stat-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(253,250,246,0.45);
}
.ab-hero-scroll {
  position: absolute;
  bottom: 32px;
  right: 72px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(253,250,246,0.35);
}
.ab-hero-scroll-line {
  width: 40px;
  height: 1px;
  background: rgba(253,250,246,0.25);
}

/* ════════════════════════════════════════════════
   2. ORIGIN — image left, text right
════════════════════════════════════════════════ */
.ab-origin {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 640px;
}
.ab-origin-img-wrap {
  position: relative;
  overflow: hidden;
}
.ab-origin-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 600ms ease;
}
.ab-origin-img-wrap:hover .ab-origin-img { transform: scale(1.04); }
.ab-origin-img-cap {
  position: absolute;
  bottom: 24px; left: 24px;
  background: rgba(253,250,246,0.88);
  backdrop-filter: blur(8px);
  border: 1px solid #ede6dc;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #92400e;
}
.ab-origin-text {
  padding: 80px 72px;
  background: #fdfaf6;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ab-section-eyebrow {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #d97706;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.ab-section-eyebrow::before {
  content: '';
  display: inline-block;
  width: 24px; height: 2px;
  background: #d97706;
  flex-shrink: 0;
}
.ab-section-h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(30px, 3.5vw, 48px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #1c1510;
  margin-bottom: 24px;
}
.ab-section-h2 em { font-style: italic; font-weight: 400; color: #d97706; }
.ab-body-text {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.85;
  color: #6b5e52;
  margin-bottom: 20px;
  max-width: 440px;
}
.ab-pull-quote {
  border-left: 3px solid #d97706;
  padding: 16px 24px;
  background: #fffbf0;
  border-radius: 0 8px 8px 0;
  margin-top: 32px;
}
.ab-pull-quote p {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-style: italic;
  font-weight: 400;
  line-height: 1.55;
  color: #1c1510;
  margin-bottom: 8px;
}
.ab-pull-quote cite {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9c876e;
  font-style: normal;
}

/* ════════════════════════════════════════════════
   3. MISSION — full bleed with image
════════════════════════════════════════════════ */
.ab-mission {
  position: relative;
  min-height: 560px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.ab-mission-img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  filter: saturate(0.7) brightness(0.5);
}
.ab-mission-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, rgba(10,6,2,0.92) 0%, rgba(10,6,2,0.65) 55%, rgba(10,6,2,0.4) 100%);
}
.ab-mission-content {
  position: relative;
  z-index: 2;
  max-width: 820px;
  padding: 96px 72px;
}
.ab-mission-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(253,230,138,0.7);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.ab-mission-label::before {
  content: '';
  display: inline-block;
  width: 24px; height: 1px;
  background: rgba(253,230,138,0.5);
}
.ab-mission-statement {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(28px, 4vw, 54px);
  font-weight: 400;
  line-height: 1.2;
  color: #fdfaf6;
  margin-bottom: 48px;
}
.ab-mission-statement em {
  font-style: italic;
  color: #fde68a;
}
.ab-pillars {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid rgba(253,250,246,0.1);
  padding-top: 40px;
}
.ab-pillar {
  padding: 0 28px 0 0;
  border-right: 1px solid rgba(253,250,246,0.1);
}
.ab-pillar:first-child { padding-left: 0; }
.ab-pillar:last-child { border-right: none; }
.ab-pillar-icon { font-size: 20px; margin-bottom: 10px; }
.ab-pillar-name {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-style: italic;
  color: #fde68a;
  margin-bottom: 6px;
}
.ab-pillar-desc {
  font-size: 12px;
  font-weight: 300;
  color: rgba(253,250,246,0.45);
  line-height: 1.6;
}

/* ════════════════════════════════════════════════
   4. PROGRAMS MOSAIC
════════════════════════════════════════════════ */
.ab-programs {
  padding: 96px 72px;
  background: #fdfaf6;
}
.ab-programs-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 48px;
}
.ab-programs-header-left { max-width: 480px; }
.ab-programs-count {
  font-family: 'Playfair Display', serif;
  font-size: clamp(64px, 9vw, 120px);
  font-weight: 900;
  line-height: 0.85;
  color: rgba(217,119,6,0.1);
  letter-spacing: -0.04em;
}
.ab-mosaic {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 320px;
  gap: 12px;
}
.ab-mosaic-item {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
}
.ab-mosaic-item:first-child {
  grid-column: span 2;
}
.ab-mosaic-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 600ms cubic-bezier(.16,1,.3,1), filter 500ms ease;
  filter: saturate(0.8) brightness(0.85);
}
.ab-mosaic-item:hover .ab-mosaic-img {
  transform: scale(1.06);
  filter: saturate(1) brightness(0.9);
}
.ab-mosaic-label-wrap {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: 48px 20px 20px;
  background: linear-gradient(to top, rgba(10,6,2,0.75) 0%, transparent 100%);
}
.ab-mosaic-label {
  font-family: 'Playfair Display', serif;
  font-size: 16px;
  font-weight: 600;
  color: #fdfaf6;
}

/* ════════════════════════════════════════════════
   5. MILESTONES — horizontal timeline
════════════════════════════════════════════════ */
.ab-timeline {
  padding: 96px 72px;
  background: #fffbf0;
  border-top: 1px solid #ede6dc;
  border-bottom: 1px solid #ede6dc;
  overflow: hidden;
}
.ab-timeline-header { margin-bottom: 64px; }
.ab-timeline-track {
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0;
}
.ab-timeline-track::before {
  content: '';
  position: absolute;
  top: 18px; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(to right, #ede6dc, #d97706, #ede6dc);
  z-index: 0;
}
.ab-tl-item {
  position: relative;
  z-index: 1;
  padding-top: 48px;
  padding-right: 24px;
}
.ab-tl-dot {
  position: absolute;
  top: 10px; left: 0;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: #fdfaf6;
  border: 2px solid #d97706;
  transition: background 300ms ease, transform 300ms ease;
}
.ab-tl-item:hover .ab-tl-dot {
  background: #d97706;
  transform: scale(1.25);
}
.ab-tl-year {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 700;
  color: rgba(217,119,6,0.25);
  line-height: 1;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}
.ab-tl-title {
  font-family: 'Playfair Display', serif;
  font-size: 15px;
  font-weight: 600;
  color: #1c1510;
  margin-bottom: 8px;
}
.ab-tl-desc {
  font-size: 12px;
  font-weight: 300;
  line-height: 1.7;
  color: #6b5e52;
  max-width: 160px;
}

/* ════════════════════════════════════════════════
   6. TEAM — image banner + cards
════════════════════════════════════════════════ */
.ab-team {
  background: #fdfaf6;
}
.ab-team-banner {
  position: relative;
  height: 380px;
  overflow: hidden;
}
.ab-team-banner-img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center 40%;
  filter: saturate(0.7) brightness(0.55);
}
.ab-team-banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(10,6,2,0.85) 0%, rgba(10,6,2,0.3) 100%);
}
.ab-team-banner-text {
  position: absolute;
  bottom: 48px; left: 72px;
  z-index: 2;
}
.ab-team-banner-text .ab-section-eyebrow { color: rgba(253,230,138,0.8); }
.ab-team-banner-text .ab-section-eyebrow::before { background: rgba(253,230,138,0.6); }
.ab-team-banner-text .ab-section-h2 {
  color: #fdfaf6;
  margin-bottom: 0;
}
.ab-team-banner-text .ab-section-h2 em { color: #fde68a; }
.ab-team-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid #ede6dc;
}
.ab-team-card {
  padding: 36px 32px 40px;
  border-right: 1px solid #ede6dc;
  transition: background 300ms ease;
}
.ab-team-card:last-child { border-right: none; }
.ab-team-card:hover { background: #fffbf0; }
.ab-tc-avatar {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(217,119,6,0.18), rgba(217,119,6,0.06));
  border: 2px solid rgba(217,119,6,0.25);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 20px; font-weight: 700;
  color: #d97706;
  margin-bottom: 16px;
}
.ab-tc-name {
  font-family: 'Playfair Display', serif;
  font-size: 16px; font-weight: 600;
  color: #1c1510;
  margin-bottom: 4px;
}
.ab-tc-role {
  font-size: 10px; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: #d97706;
  margin-bottom: 14px;
}
.ab-tc-rule {
  width: 28px; height: 2px;
  background: #ede6dc;
  margin-bottom: 14px;
  transition: width 300ms ease, background 300ms ease;
}
.ab-team-card:hover .ab-tc-rule {
  width: 48px;
  background: #d97706;
}
.ab-tc-note {
  font-size: 13px; font-weight: 300;
  line-height: 1.75;
  color: #6b5e52;
  font-style: italic;
}

/* ════════════════════════════════════════════════
   7. VISION — image right, promises left
════════════════════════════════════════════════ */
.ab-vision {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 640px;
  border-top: 1px solid #ede6dc;
}
.ab-vision-text {
  padding: 80px 72px;
  background: #fdfaf6;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ab-promises { display: flex; flex-direction: column; gap: 12px; margin-top: 36px; }
.ab-promise {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 20px;
  background: #fff;
  border: 1px solid #ede6dc;
  border-radius: 8px;
  transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
}
.ab-promise:hover {
  transform: translateX(6px);
  border-color: rgba(217,119,6,0.35);
  box-shadow: inset 3px 0 0 #d97706, 0 4px 16px rgba(180,140,80,0.08);
}
.ab-promise-n {
  font-family: 'Playfair Display', serif;
  font-size: 12px; font-weight: 700;
  color: #d97706;
  min-width: 24px; margin-top: 2px;
}
.ab-promise-text {
  font-size: 13px; font-weight: 400;
  line-height: 1.65;
  color: #4a3d30;
}
.ab-vision-img-wrap {
  position: relative;
  overflow: hidden;
}
.ab-vision-img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 600ms ease;
}
.ab-vision-img-wrap:hover .ab-vision-img { transform: scale(1.04); }
.ab-vision-img-badge {
  position: absolute;
  top: 40px; left: 40px;
  background: rgba(253,250,246,0.92);
  backdrop-filter: blur(8px);
  border: 1px solid #ede6dc;
  border-radius: 12px;
  padding: 16px 20px;
  max-width: 220px;
}
.ab-vision-img-badge-num {
  font-family: 'Playfair Display', serif;
  font-size: 36px; font-weight: 900;
  color: #d97706;
  line-height: 1;
  margin-bottom: 4px;
}
.ab-vision-img-badge-label {
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: #6b5e52;
}

/* ════════════════════════════════════════════════
   8. CLOSING MANIFESTO
════════════════════════════════════════════════ */
.ab-closing {
  padding: 120px 72px;
  background: #1c1510;
  position: relative;
  overflow: hidden;
  text-align: center;
}
.ab-closing::before {
  content: '';
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse 50% 60% at 20% 50%, rgba(217,119,6,0.1) 0%, transparent 60%),
    radial-gradient(ellipse 40% 50% at 80% 50%, rgba(217,119,6,0.06) 0%, transparent 60%);
  pointer-events: none;
}
.ab-closing-inner { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; }
.ab-closing-eyebrow {
  font-size: 10px; font-weight: 600;
  letter-spacing: 0.25em; text-transform: uppercase;
  color: rgba(253,230,138,0.55);
  margin-bottom: 28px;
}
.ab-closing-h2 {
  font-family: 'DM Serif Display', serif;
  font-size: clamp(36px, 5.5vw, 72px);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: #fdfaf6;
  margin-bottom: 28px;
}
.ab-closing-h2 em { font-style: italic; color: #fde68a; }
.ab-closing-body {
  font-size: 16px; font-weight: 300;
  line-height: 1.9;
  color: rgba(253,250,246,0.55);
  margin-bottom: 52px;
}
.ab-closing-sig {
  font-family: 'Playfair Display', serif;
  font-size: 30px; font-style: italic;
  color: #d97706;
  margin-bottom: 6px;
}
.ab-closing-sig-sub {
  font-size: 10px; font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: rgba(253,250,246,0.3);
}
.ab-closing-rule {
  width: 60px; height: 1px;
  background: rgba(253,250,246,0.12);
  margin: 32px auto;
}

/* ════════════════════════════════════════════════
   RESPONSIVE
════════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .ab-hero-content { padding: 0 40px 56px; }
  .ab-hero-scroll { right: 40px; }
  .ab-origin { grid-template-columns: 1fr; }
  .ab-origin-img-wrap { height: 420px; }
  .ab-origin-text { padding: 56px 40px; }
  .ab-mission-content { padding: 72px 40px; }
  .ab-pillars { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .ab-pillar { border-right: none; padding: 0; }
  .ab-programs { padding: 72px 40px; }
  .ab-mosaic { grid-template-columns: 1fr 1fr; grid-template-rows: 280px 280px; }
  .ab-mosaic-item:first-child { grid-column: span 2; }
  .ab-timeline { padding: 72px 40px; }
  .ab-timeline-track { grid-template-columns: repeat(3, 1fr); row-gap: 48px; }
  .ab-timeline-track::before { display: none; }
  .ab-team-banner-text { left: 40px; }
  .ab-team-cards { grid-template-columns: 1fr 1fr; }
  .ab-team-card:nth-child(2) { border-right: none; }
  .ab-team-card:nth-child(3) { border-top: 1px solid #ede6dc; }
  .ab-vision { grid-template-columns: 1fr; }
  .ab-vision-img-wrap { height: 460px; }
  .ab-vision-text { padding: 56px 40px; }
  .ab-closing { padding: 80px 40px; }
}

@media (max-width: 640px) {
  .ab-hero-content { padding: 0 24px 48px; }
  .ab-hero-scroll { display: none; }
  .ab-hero-stats { flex-direction: column; width: 100%; }
  .ab-hero-stat { border-right: none; border-bottom: 1px solid rgba(253,250,246,0.12); }
  .ab-hero-stat:last-child { border-bottom: none; }
  .ab-origin-text { padding: 48px 24px; }
  .ab-body-text { max-width: 100%; }
  .ab-mission-content { padding: 60px 24px; }
  .ab-pillars { grid-template-columns: 1fr; }
  .ab-programs { padding: 56px 24px; }
  .ab-programs-header { flex-direction: column; align-items: flex-start; gap: 8px; }
  .ab-mosaic { grid-template-columns: 1fr; grid-template-rows: auto; }
  .ab-mosaic-item { height: 220px; }
  .ab-mosaic-item:first-child { grid-column: span 1; }
  .ab-timeline { padding: 56px 24px; }
  .ab-timeline-track { grid-template-columns: 1fr; }
  .ab-team-banner-text { left: 24px; bottom: 32px; }
  .ab-team-cards { grid-template-columns: 1fr; }
  .ab-team-card { border-right: none; border-bottom: 1px solid #ede6dc; }
  .ab-team-card:last-child { border-bottom: none; }
  .ab-team-card:nth-child(3) { border-top: none; }
  .ab-vision-text { padding: 48px 24px; }
  .ab-closing { padding: 64px 24px; }
}
`;

function useStyleInjection() {
  useEffect(() => {
    const id = "about-styles";
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

function useFonts() {
  useEffect(() => {
    const id = "about-fonts";
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
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".ab-rv,.ab-rvl,.ab-rvr,.ab-rvs,.ab-rvf")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function AboutPage() {
  useStyleInjection();
  useFonts();
  useScrollReveal();

  return (
    <div className="ab-root">
      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <section className="ab-hero">
        <img
          className="ab-hero-img"
          src={IMGS.hero}
          alt="Students learning"
          loading="eager"
        />
        <div className="ab-hero-overlay" />
        <div className="ab-hero-content">
          <div className="ab-hero-pill ab-rv">
            <span className="ab-hero-pill-dot" />
            Est. 2020 · Meru, Kenya
          </div>
          <h1 className="ab-hero-h1 ab-rv d1">
            Built from
            <em>a single belief.</em>
          </h1>
          <p className="ab-hero-sub ab-rv d2">
            Every child carries potential that a classroom alone cannot fully
            reach. We built this academy to go further — into the hands, the
            imagination, and the future.
          </p>
          <div className="ab-hero-stats ab-rv d3">
            {[
              { num: "3,000", suf: "+", label: "Learners Impacted" },
              { num: "9", suf: "", label: "Specialist Programs" },
              { num: "4", suf: "+", label: "Years of Impact" },
              { num: "20", suf: "+", label: "School Partnerships" },
            ].map((s) => (
              <div key={s.label} className="ab-hero-stat">
                <div className="ab-hero-stat-num">
                  {s.num}
                  <span>{s.suf}</span>
                </div>
                <div className="ab-hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="ab-hero-scroll">
          <div className="ab-hero-scroll-line" /> Scroll to explore
        </div>
      </section>

      {/* ── 2. ORIGIN ─────────────────────────────────────────────────── */}
      <section className="ab-origin">
        <div className="ab-origin-img-wrap ab-rvl">
          <img
            className="ab-origin-img"
            src={IMGS.founding}
            alt="The founding story"
            loading="lazy"
          />
          <div className="ab-origin-img-cap">Meru, Kenya · 2020</div>
        </div>
        <div className="ab-origin-text">
          <p className="ab-section-eyebrow ab-rv">The Founding</p>
          <h2 className="ab-section-h2 ab-rv d1">
            It started with a question
            <br />
            <em>no one had asked.</em>
          </h2>
          <p className="ab-body-text ab-rv d2">
            In 2020, our founders watched brilliant children sit through
            programmes built for averages — not potential. The spark came not in
            a boardroom, but in a conversation with a ten-year-old who wanted to
            build a drone but had nowhere to go.
          </p>
          <p className="ab-body-text ab-rv d3">
            So they made a place. A real one — with real tools, real mentors,
            and the radical belief that children aged 8 to 17 deserve access to
            the same opportunities as anyone else.
          </p>
          <div className="ab-pull-quote ab-rv d4">
            <p>
              "We didn't set out to build a company. We set out to answer a
              child's question."
            </p>
            <cite>— Co-founder, Deluxe Talent and Adventures Academy</cite>
          </div>
        </div>
      </section>

      {/* ── 3. MISSION ────────────────────────────────────────────────── */}
      <section className="ab-mission">
        <img
          className="ab-mission-img"
          src={IMGS.mission}
          alt="Children learning"
          loading="lazy"
        />
        <div className="ab-mission-overlay" />
        <div className="ab-mission-content">
          <p className="ab-mission-label ab-rv">What we believe</p>
          <h2 className="ab-mission-statement ab-rv d1">
            Every child deserves a space where curiosity becomes courage, and{" "}
            <em>potential becomes purpose.</em>
          </h2>
          <div className="ab-pillars ab-rv d2">
            {[
              {
                icon: "✦",
                name: "Creativity",
                desc: "Imagination applied to real problems",
              },
              {
                icon: "✦",
                name: "Confidence",
                desc: "The courage to try and fail forward",
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
              <div key={p.name} className="ab-pillar">
                <div className="ab-pillar-icon">{p.icon}</div>
                <div className="ab-pillar-name">{p.name}</div>
                <div className="ab-pillar-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PROGRAMS MOSAIC ────────────────────────────────────────── */}
      <section className="ab-programs">
        <div className="ab-programs-header">
          <div className="ab-programs-header-left">
            <p className="ab-section-eyebrow ab-rv">What we offer</p>
            <h2 className="ab-section-h2 ab-rv d1">
              Nine paths to
              <br />
              <em>discovering who you are.</em>
            </h2>
          </div>
          <div className="ab-programs-count ab-rvr">9</div>
        </div>
        <div className="ab-mosaic">
          {PROGRAMS_GRID.map((p, i) => (
            <div key={i} className={`ab-mosaic-item ab-rvs d${i + 1}`}>
              <img
                className="ab-mosaic-img"
                src={p.img}
                alt={p.label}
                loading="lazy"
              />
              <div className="ab-mosaic-label-wrap">
                <div className="ab-mosaic-label">{p.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. MILESTONES ─────────────────────────────────────────────── */}
      <section className="ab-timeline">
        <div className="ab-timeline-header">
          <p className="ab-section-eyebrow ab-rv">The journey so far</p>
          <h2 className="ab-section-h2 ab-rv d1" style={{ maxWidth: 500 }}>
            Four years of <em>moments that mattered.</em>
          </h2>
        </div>
        <div className="ab-timeline-track">
          {MILESTONES.map((m, i) => (
            <div key={i} className={`ab-tl-item ab-rv d${(i % 4) + 1}`}>
              <div className="ab-tl-dot" />
              <div className="ab-tl-year">{m.year}</div>
              <div className="ab-tl-title">{m.title}</div>
              <div className="ab-tl-desc">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. TEAM ───────────────────────────────────────────────────── */}
      <section className="ab-team">
        <div className="ab-team-banner">
          <img
            className="ab-team-banner-img"
            src={IMGS.team}
            alt="The team"
            loading="lazy"
          />
          <div className="ab-team-banner-overlay" />
          <div className="ab-team-banner-text">
            <p className="ab-section-eyebrow ab-rv">The People</p>
            <h2 className="ab-section-h2 ab-rv d1">
              Mentors before
              <br />
              <em>they were teachers.</em>
            </h2>
          </div>
        </div>
        <div className="ab-team-cards">
          {TEAM.map((t, i) => (
            <div key={i} className={`ab-team-card ab-rv d${i + 1}`}>
              <div className="ab-tc-avatar">{t.initials}</div>
              <div className="ab-tc-name">{t.name}</div>
              <div className="ab-tc-role">{t.role}</div>
              <div className="ab-tc-rule" />
              <p className="ab-tc-note">{t.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. VISION ─────────────────────────────────────────────────── */}
      <section className="ab-vision">
        <div className="ab-vision-text">
          <p className="ab-section-eyebrow ab-rv">Where we're going</p>
          <h2 className="ab-section-h2 ab-rv d1">
            The promises we've
            <br />
            <em>made to the future.</em>
          </h2>
          <p className="ab-body-text ab-rv d2">
            We are building the infrastructure of young talent in East Africa. A
            generation from now, every child between 8 and 17 will have a place
            that says:{" "}
            <em>you belong here, and you have something to build.</em>
          </p>
          <div className="ab-promises">
            {PROMISES.map((p, i) => (
              <div key={i} className={`ab-promise ab-rv d${i + 1}`}>
                <span className="ab-promise-n">{p.n}</span>
                <span className="ab-promise-text">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ab-vision-img-wrap ab-rvr">
          <img
            className="ab-vision-img"
            src={IMGS.vision}
            alt="Children's future"
            loading="lazy"
          />
          <div className="ab-vision-img-badge">
            <div className="ab-vision-img-badge-num">10K</div>
            <div className="ab-vision-img-badge-label">Learners by 2027</div>
          </div>
        </div>
      </section>

      {/* ── 8. CLOSING MANIFESTO ──────────────────────────────────────── */}
      <section className="ab-closing">
        <div className="ab-closing-inner">
          <p className="ab-closing-eyebrow ab-rv">Our promise</p>
          <h2 className="ab-closing-h2 ab-rv d1">
            This is not just
            <br />
            an academy.
            <br />
            <em>It is a beginning.</em>
          </h2>
          <div className="ab-closing-rule" />
          <p className="ab-closing-body ab-rv d2">
            Every child who walks through our doors carries a future we haven't
            imagined yet. Our job is simply to make sure they have the tools,
            the courage, and the community to build it.
          </p>
          <div className="ab-closing-sig ab-rv d3">The Academy Team</div>
          <div className="ab-closing-sig-sub ab-rv d4">
            Meru, Kenya · Est. 2020
          </div>
        </div>
      </section>
    </div>
  );
}

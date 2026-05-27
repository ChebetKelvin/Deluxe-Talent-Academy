import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ─── Design tokens (warm parchment palette — matches Programs page) ─────── */
const T = {
  bg: "#fdfaf6",
  amber: "#d97706",
  amberDim: "rgba(217,119,6,0.08)",
  amberBorder: "rgba(217,119,6,0.22)",
  amberText: "#d97706",
  gold: "#f59e0b",
  goldDim: "rgba(245,158,11,0.08)",
  goldBorder: "rgba(245,158,11,0.25)",
  text: "#1c1510",
  text55: "rgba(28,21,16,0.55)",
  text35: "rgba(28,21,16,0.35)",
  text20: "rgba(28,21,16,0.20)",
  border: "#ede6dc",
  borderHover: "rgba(180,140,80,0.35)",
  surface: "#fff",
};

const STYLES = `
  @keyframes cp2-pulse   { 0%,100%{opacity:.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.25)} }
  @keyframes cp2-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes cp2-fadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cp2-fadeL   { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
  @keyframes cp2-fadeR   { from{opacity:0;transform:translateX(24px)}  to{opacity:1;transform:translateX(0)} }

  .cp2-r0{opacity:0} .cp2-r0.cp2-on{animation:cp2-fadeUp .8s cubic-bezier(.16,1,.3,1) forwards}
  .cp2-rl{opacity:0} .cp2-rl.cp2-on{animation:cp2-fadeL  .8s cubic-bezier(.16,1,.3,1) forwards}
  .cp2-rr{opacity:0} .cp2-rr.cp2-on{animation:cp2-fadeR  .8s cubic-bezier(.16,1,.3,1) forwards}
  .cp2-d1{animation-delay:.08s} .cp2-d2{animation-delay:.18s}
  .cp2-d3{animation-delay:.28s} .cp2-d4{animation-delay:.38s}

  .cp2-page {
    position:relative;min-height:100vh;background:#fdfaf6;
    font-family:'DM Sans',sans-serif;color:#1c1510;
    display:flex;flex-direction:column;overflow-x:hidden;
  }

  /* Background orbs — warm amber/gold instead of blue */
  .cp2-bg-orbs{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:0}
  .cp2-orb{position:absolute;border-radius:50%;filter:blur(80px)}
  .cp2-orb1{width:640px;height:640px;background:radial-gradient(circle,rgba(245,158,11,0.13) 0%,transparent 70%);top:-180px;right:-120px}
  .cp2-orb2{width:480px;height:480px;background:radial-gradient(circle,rgba(217,119,6,0.08) 0%,transparent 70%);bottom:-80px;left:-60px}
  .cp2-orb3{width:280px;height:280px;background:radial-gradient(circle,rgba(180,83,9,0.06) 0%,transparent 70%);top:40%;left:8%}

  /* Warm cream grid */
  .cp2-grid{
    position:fixed;inset:0;pointer-events:none;z-index:0;
    background-image:linear-gradient(rgba(28,21,16,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(28,21,16,0.025) 1px,transparent 1px);
    background-size:80px 80px;
  }
  .cp2-grain{
    position:fixed;inset:0;pointer-events:none;z-index:0;opacity:0.04;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  }

  /* Hero */
  .cp2-hero{
    position:relative;z-index:1;padding:96px 72px 64px;
    border-bottom:0.5px solid #ede6dc;overflow:hidden;
    background:#fdfaf6;
  }
  .cp2-ghost{
    position:absolute;right:-10px;top:50%;transform:translateY(-50%);
    font-family:'Playfair Display',serif;font-weight:900;
    font-size:clamp(110px,17vw,210px);color:rgba(28,21,16,0.04);
    letter-spacing:-.05em;pointer-events:none;user-select:none;white-space:nowrap;
  }
  .cp2-eyebrow{
    display:inline-flex;align-items:center;gap:8px;
    background:rgba(217,119,6,0.08);border:0.5px solid rgba(217,119,6,0.28);
    border-radius:100px;padding:6px 16px 6px 10px;
    font-size:12px;font-weight:600;color:#d97706;letter-spacing:.5px;margin-bottom:26px;
  }
  .cp2-eyebrow-dot{
    width:7px;height:7px;border-radius:50%;background:#d97706;flex-shrink:0;
    animation:cp2-pulse 2s ease-in-out infinite;
  }
  .cp2-headline{
    font-family:'Playfair Display',serif;
    font-size:clamp(48px,6.5vw,84px);font-weight:900;
    line-height:.96;letter-spacing:-2.5px;color:#1c1510;margin-bottom:22px;max-width:640px;
  }
  .cp2-headline em{
    font-style:italic;font-weight:700;
    background:linear-gradient(135deg,#d97706,#f59e0b,#d97706);background-size:200% auto;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    animation:cp2-shimmer 4s linear infinite;
  }
  .cp2-hero-sub{font-size:16px;font-weight:400;line-height:1.8;color:rgba(28,21,16,0.55);max-width:500px}

  /* Main grid */
  .cp2-main{
    flex:1;position:relative;z-index:1;
    display:grid;grid-template-columns:1.15fr 0.85fr;
    border-bottom:0.5px solid #ede6dc;
  }
  .cp2-left {padding:72px 72px 88px;border-right:0.5px solid #ede6dc}
  .cp2-right{padding:72px 60px 88px;display:flex;flex-direction:column;gap:16px}

  .cp2-sec-label{
    font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;
    color:rgba(180,83,9,0.7);margin-bottom:36px;
    display:flex;align-items:center;gap:14px;
  }
  .cp2-sec-label::after{content:'';flex:1;height:0.5px;background:#ede6dc}

  /* Contact method rows */
  .cp2-methods{display:flex;flex-direction:column;gap:3px}
  .cp2-method{
    display:flex;align-items:center;gap:22px;padding:26px 28px;
    border:0.5px solid #ede6dc;border-radius:8px;
    text-decoration:none;position:relative;overflow:hidden;
    background:#fff;
    transition:border-color .35s,background .35s;
    box-shadow:0 2px 12px rgba(180,140,80,0.05);
  }
  .cp2-method::before{content:'';position:absolute;inset:0;opacity:0;transition:opacity .35s}
  .cp2-method.cp2-wa::before{background:linear-gradient(135deg,rgba(217,119,6,0.06),transparent)}
  .cp2-method.cp2-ph::before{background:linear-gradient(135deg,rgba(180,83,9,0.06),transparent)}
  .cp2-method.cp2-em::before{background:linear-gradient(135deg,rgba(217,119,6,0.04),rgba(245,158,11,0.04))}
  .cp2-method:hover::before{opacity:1}
  .cp2-method.cp2-wa:hover{border-color:rgba(217,119,6,0.35);background:rgba(217,119,6,0.04)}
  .cp2-method.cp2-ph:hover{border-color:rgba(180,83,9,0.3);background:rgba(180,83,9,0.03)}
  .cp2-method.cp2-em:hover{border-color:rgba(180,140,80,0.35);background:rgba(245,158,11,0.03)}

  .cp2-icon{
    width:50px;height:50px;border-radius:10px;flex-shrink:0;
    display:flex;align-items:center;justify-content:center;font-size:20px;
    border:0.5px solid #ede6dc;background:rgba(28,21,16,0.03);
    transition:border-color .35s,background .35s;
  }
  .cp2-method.cp2-wa:hover .cp2-icon{border-color:rgba(217,119,6,0.35);background:rgba(217,119,6,0.1)}
  .cp2-method.cp2-ph:hover .cp2-icon{border-color:rgba(180,83,9,0.3);background:rgba(180,83,9,0.08)}
  .cp2-method.cp2-em:hover .cp2-icon{border-color:rgba(180,140,80,0.35);background:rgba(245,158,11,0.08)}

  .cp2-m-label{font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(28,21,16,0.35);margin-bottom:4px}
  .cp2-m-value{font-family:'Playfair Display',serif;font-size:clamp(17px,2vw,24px);font-weight:700;color:#1c1510;line-height:1.15}
  .cp2-m-note {font-size:12px;font-weight:300;color:rgba(28,21,16,0.4);margin-top:4px}

  .cp2-m-arrow{
    width:34px;height:34px;border-radius:50%;
    border:0.5px solid #ede6dc;
    display:flex;align-items:center;justify-content:center;flex-shrink:0;
    transition:all .3s;
  }
  .cp2-method.cp2-wa:hover .cp2-m-arrow{border-color:rgba(217,119,6,0.35);background:rgba(217,119,6,0.1)}
  .cp2-method.cp2-ph:hover .cp2-m-arrow{border-color:rgba(180,83,9,0.3);background:rgba(180,83,9,0.08)}
  .cp2-method.cp2-em:hover .cp2-m-arrow{border-color:rgba(180,140,80,0.35);background:rgba(245,158,11,0.06)}

  .cp2-aside{
    margin-top:36px;font-size:13px;font-weight:300;line-height:1.85;
    color:rgba(28,21,16,0.45);max-width:400px;
    border-left:1px solid rgba(217,119,6,0.35);padding-left:18px;
  }

  /* Right-side cards */
  .cp2-card{
    padding:26px 28px;border:0.5px solid #ede6dc;border-radius:8px;
    background:#fff;box-shadow:0 2px 12px rgba(180,140,80,0.06);
  }
  .cp2-card-title{
    font-family:'Playfair Display',serif;font-size:19px;font-weight:700;color:#1c1510;
    margin-bottom:18px;padding-bottom:14px;border-bottom:0.5px solid #ede6dc;
  }
  .cp2-hr{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:0.5px solid rgba(28,21,16,0.05)}
  .cp2-hr:last-child{border-bottom:none}
  .cp2-hd{font-size:13px;font-weight:400;color:rgba(28,21,16,0.55)}
  .cp2-ht{font-size:13px;font-weight:500;color:rgba(28,21,16,0.8)}
  .cp2-hb{
    font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
    padding:3px 9px;border-radius:100px;
    background:rgba(217,119,6,0.1);color:#d97706;border:0.5px solid rgba(217,119,6,0.3);
  }
  .cp2-ll{font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgba(28,21,16,0.35);margin-bottom:10px}
  .cp2-ln{font-family:'Playfair Display',serif;font-size:21px;font-weight:700;color:#1c1510;margin-bottom:6px}
  .cp2-la{font-size:13px;font-weight:300;color:rgba(28,21,16,0.55);line-height:1.8}

  /* Promise card */
  .cp2-promise{
    padding:24px 28px;border-radius:8px;
    background:linear-gradient(135deg,rgba(217,119,6,0.07),rgba(245,158,11,0.04));
    border:0.5px solid rgba(217,119,6,0.22);
    box-shadow:0 4px 20px rgba(180,140,80,0.08);
  }
  .cp2-pt{display:flex;align-items:center;gap:10px;margin-bottom:8px}
  .cp2-pd{width:7px;height:7px;border-radius:50%;background:#d97706;flex-shrink:0;animation:cp2-pulse 2.2s ease-in-out infinite}
  .cp2-pn{font-size:13px;font-weight:600;color:#d97706}
  .cp2-px{font-size:13px;font-weight:300;line-height:1.8;color:rgba(28,21,16,0.55)}

  /* Footer bar */
  .cp2-bottom{
    position:relative;z-index:1;padding:36px 72px;
    display:flex;align-items:center;justify-content:space-between;
    border-top:0.5px solid #ede6dc;
    background:rgba(253,250,246,0.92);
  }
  .cp2-bl{display:flex;align-items:center;gap:14px}
  .cp2-bn{font-family:'Playfair Display',serif;font-size:17px;font-weight:700;color:rgba(28,21,16,0.4)}
  .cp2-bv{width:1px;height:16px;background:#ede6dc}
  .cp2-bt{font-size:12px;color:rgba(28,21,16,0.28);letter-spacing:.06em}
  .cp2-br{font-size:12px;color:rgba(28,21,16,0.28);letter-spacing:.06em}

  /* ── MOBILE RESPONSIVE ── */
  @media (max-width: 1024px) {
    .cp2-main {
      grid-template-columns: 1fr;
    }
    .cp2-left {
      border-right: none;
      border-bottom: 0.5px solid #ede6dc;
      padding: 56px 48px 56px;
    }
    .cp2-right {
      padding: 56px 48px 72px;
      gap: 14px;
    }
  }

  @media (max-width: 768px) {
    .cp2-hero {
      padding: 64px 32px 48px;
    }
    .cp2-ghost {
      font-size: clamp(80px, 20vw, 130px);
      right: -20px;
    }
    .cp2-headline {
      font-size: clamp(36px, 9vw, 56px);
      letter-spacing: -1.5px;
      margin-bottom: 16px;
    }
    .cp2-hero-sub {
      font-size: 14px;
      max-width: 100%;
    }
    .cp2-eyebrow {
      font-size: 11px;
      padding: 5px 14px 5px 8px;
      margin-bottom: 20px;
    }
    .cp2-main {
      grid-template-columns: 1fr;
    }
    .cp2-left {
      padding: 48px 24px 48px;
      border-right: none;
      border-bottom: 0.5px solid #ede6dc;
    }
    .cp2-right {
      padding: 48px 24px 64px;
      gap: 12px;
    }
    .cp2-method {
      padding: 20px 20px;
      gap: 16px;
    }
    .cp2-icon {
      width: 44px;
      height: 44px;
      font-size: 18px;
    }
    .cp2-m-value {
      font-size: clamp(16px, 4vw, 20px);
    }
    .cp2-m-arrow {
      width: 30px;
      height: 30px;
    }
    .cp2-aside {
      margin-top: 28px;
      font-size: 12px;
      max-width: 100%;
    }
    .cp2-card {
      padding: 20px 20px;
    }
    .cp2-card-title {
      font-size: 17px;
      margin-bottom: 14px;
      padding-bottom: 12px;
    }
    .cp2-promise {
      padding: 20px 20px;
    }
    .cp2-bottom {
      padding: 24px 32px;
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }
    .cp2-bl {
      flex-direction: column;
      gap: 8px;
    }
    .cp2-bv {
      display: none;
    }
    .cp2-br {
      font-size: 11px;
    }
  }

  @media (max-width: 480px) {
    .cp2-hero {
      padding: 48px 20px 40px;
    }
    .cp2-ghost {
      font-size: clamp(60px, 18vw, 90px);
      right: -10px;
      top: 40%;
    }
    .cp2-headline {
      font-size: clamp(30px, 8vw, 42px);
      letter-spacing: -1px;
      max-width: 100%;
    }
    .cp2-hero-sub {
      font-size: 13px;
      line-height: 1.7;
    }
    .cp2-eyebrow {
      font-size: 10px;
      padding: 4px 12px 4px 8px;
      gap: 6px;
      margin-bottom: 16px;
    }
    .cp2-eyebrow-dot {
      width: 6px;
      height: 6px;
    }
    .cp2-left {
      padding: 40px 16px 40px;
    }
    .cp2-right {
      padding: 40px 16px 56px;
      gap: 10px;
    }
    .cp2-sec-label {
      font-size: 9px;
      margin-bottom: 24px;
      gap: 10px;
    }
    .cp2-method {
      padding: 16px 16px;
      gap: 12px;
      flex-wrap: wrap;
    }
    .cp2-icon {
      width: 40px;
      height: 40px;
      font-size: 16px;
      border-radius: 8px;
    }
    .cp2-m-label {
      font-size: 9px;
    }
    .cp2-m-value {
      font-size: 15px;
    }
    .cp2-m-note {
      font-size: 11px;
    }
    .cp2-m-arrow {
      width: 28px;
      height: 28px;
      margin-left: auto;
    }
    .cp2-aside {
      margin-top: 24px;
      font-size: 11px;
      padding-left: 14px;
      border-left-width: 1px;
    }
    .cp2-card {
      padding: 16px 16px;
      border-radius: 6px;
    }
    .cp2-card-title {
      font-size: 15px;
      margin-bottom: 12px;
      padding-bottom: 10px;
    }
    .cp2-hd, .cp2-ht {
      font-size: 12px;
    }
    .cp2-hb {
      font-size: 8px;
      padding: 2px 7px;
    }
    .cp2-ln {
      font-size: 18px;
    }
    .cp2-la {
      font-size: 12px;
    }
    .cp2-promise {
      padding: 16px 16px;
      border-radius: 6px;
    }
    .cp2-pn {
      font-size: 12px;
    }
    .cp2-px {
      font-size: 12px;
    }
    .cp2-bottom {
      padding: 20px 16px;
    }
    .cp2-bn {
      font-size: 15px;
    }
    .cp2-bt, .cp2-br {
      font-size: 10px;
    }
  }

  @media (max-width: 360px) {
    .cp2-ghost {
      display: none;
    }
    .cp2-headline {
      font-size: clamp(26px, 9vw, 34px);
    }
    .cp2-method {
      padding: 14px 12px;
      gap: 10px;
    }
    .cp2-icon {
      width: 36px;
      height: 36px;
      font-size: 15px;
    }
    .cp2-m-value {
      font-size: 14px;
    }
    .cp2-m-arrow {
      width: 26px;
      height: 26px;
    }
  }
`;

function useStyles() {
  useEffect(() => {
    const id = "cp2-styles";
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
    const id = "cp2-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("cp2-on");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".cp2-r0,.cp2-rl,.cp2-rr")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

const Arrow = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    stroke="rgba(28,21,16,0.45)"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1.5 6.5h10M7 2l4.5 4.5L7 11" />
  </svg>
);

function Method({ href, icon, label, value, note, variant, anim }) {
  return (
    <motion.a
      className={`cp2-method cp2-${variant} ${anim}`}
      href={href}
      target={variant === "wa" ? "_blank" : undefined}
      rel={variant === "wa" ? "noopener noreferrer" : undefined}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="cp2-icon">{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="cp2-m-label">{label}</div>
        <div className="cp2-m-value">{value}</div>
        <div className="cp2-m-note">{note}</div>
      </div>
      <div className="cp2-m-arrow">
        <Arrow />
      </div>
    </motion.a>
  );
}

export default function ContactPage() {
  useStyles();
  useFonts();
  useReveal();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="cp2-page">
      <div className="cp2-bg-orbs">
        <div className="cp2-orb cp2-orb1" />
        <div className="cp2-orb cp2-orb2" />
        <div className="cp2-orb cp2-orb3" />
      </div>
      <div className="cp2-grid" />
      <div className="cp2-grain" />

      {/* HERO */}
      <div className="cp2-hero">
        <div className="cp2-ghost">Contact</div>
        <div className="cp2-eyebrow cp2-r0">
          <span className="cp2-eyebrow-dot" />
          Get in touch
        </div>
        <h1 className="cp2-headline cp2-r0 cp2-d1">
          Let's start
          <br />
          <em>a conversation.</em>
        </h1>
        <p className="cp2-hero-sub cp2-r0 cp2-d2">
          Whether you're a parent ready to enroll, a school looking to partner,
          or simply curious — we'd love to hear from you.
        </p>
      </div>

      {/* MAIN */}
      <div className="cp2-main">
        <div className="cp2-left">
          <div className="cp2-sec-label cp2-r0">Reach us directly</div>
          <div className="cp2-methods">
            <Method
              href="https://wa.me/254738986763"
              icon="💬"
              variant="wa"
              anim="cp2-rl cp2-d1"
              label="WhatsApp"
              value="0738 986 763"
              note="Fastest response · Usually replies within minutes"
            />
            <Method
              href="tel:+254738986763"
              icon="📞"
              variant="ph"
              anim="cp2-rl cp2-d2"
              label="Phone"
              value="0738 986 763 · 0703 999 501"
              note="Mon – Fri, 8 AM – 6 PM · Sat, 9 AM – 2 PM"
            />
            <Method
              href="mailto:deluxetalentsacademy@gmail.com"
              icon="✉️"
              variant="em"
              anim="cp2-rl cp2-d3"
              label="Email"
              value="deluxetalentsacademy@gmail.com"
              note="For detailed enquiries · We reply within 24 hours"
            />
          </div>
          <p className="cp2-aside cp2-r0 cp2-d4">
            Not sure which program is right for your child? Our team will walk
            you through every option — no pressure, no scripts. Just an honest
            conversation.
          </p>
        </div>

        <div className="cp2-right">
          <div className="cp2-card cp2-rr cp2-d1">
            <div className="cp2-card-title">Program Hours</div>
            <div className="cp2-hr">
              <span className="cp2-hd">Monday – Friday</span>
              <span className="cp2-ht">3:00 PM – 7:00 PM</span>
            </div>
            <div className="cp2-hr">
              <span className="cp2-hd">Saturday</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isMobile ? 6 : 10,
                  flexWrap: "wrap",
                }}
              >
                <span className="cp2-ht">8:00 AM – 2:00 PM</span>
                <span className="cp2-hb">Most popular</span>
              </div>
            </div>
            <div className="cp2-hr">
              <span className="cp2-hd">Sunday</span>
              <span className="cp2-ht" style={{ color: "rgba(28,21,16,0.22)" }}>
                Closed
              </span>
            </div>
            <div className="cp2-hr">
              <span className="cp2-hd">School holidays</span>
              <span className="cp2-ht">Full-day intensives</span>
            </div>
          </div>

          <div className="cp2-card cp2-rr cp2-d2">
            <div className="cp2-ll">Where to find us</div>
            <div className="cp2-ln">Deluxe Talents Academy</div>
            <div className="cp2-la">
              Meru, Kenya
              <br />
              www.deluxetalentsacademy.com
              <br />
              <span style={{ color: "rgba(28,21,16,0.3)" }}>
                Free parking available
              </span>
            </div>
          </div>

          <div className="cp2-promise cp2-rr cp2-d3">
            <div className="cp2-pt">
              <div className="cp2-pd" />
              <span className="cp2-pn">We'll guide every step</span>
            </div>
            <p className="cp2-px">
              From your first message to your child's first session — our team
              handles program selection, scheduling, and enrollment personally.
              You won't be left figuring it out alone.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="cp2-bottom cp2-r0">
        <div className="cp2-bl">
          <span className="cp2-bn">Deluxe Talents Academy</span>
          <div className="cp2-bv" />
          <span className="cp2-bt">Meru, Kenya · Est. 2020</span>
        </div>
        <span className="cp2-br">
          Ages 8 – 17 · 9 Programs · 3,000+ Learners
        </span>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router";

// ── Data ────────────────────────────────────────────────────

const NAV_COLUMNS = [
  {
    heading: "Programs",
    links: [
      { label: "Aviation & Drones", to: "/programs#aviation" },
      { label: "Robotics & Coding", to: "/programs#robotics" },
      { label: "Culinary Arts", to: "/programs#culinary" },
      { label: "Public Speaking", to: "/programs#speaking" },
      { label: "Chess & Strategy", to: "/programs#chess" },
      { label: "Football & Sports", to: "/programs#sports" },
      { label: "STEM Innovation", to: "/programs#stem" },
      { label: "Visual Media & Arts", to: "/programs#arts" },
      { label: "Martial Arts", to: "/programs#martial" },
    ],
  },
  {
    heading: "Academy",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Our Mission", to: "/about#mission" },
      { label: "Our Vision", to: "/about#vision" },
      { label: "Meet the Coaches", to: "/about#coaches" },
      { label: "For Schools", to: "/for-schools" },
      { label: "Partnership Enquiry", to: "/for-schools#enquiry" },
    ],
  },
  {
    heading: "Enrolment",
    links: [
      { label: "Get Started", to: "/#enrol" },
      { label: "Book a Session", to: "/#enrol" },
      { label: "Age Requirements", to: "/programs#ages" },
      { label: "Contact Us", to: "/contact" },
      {
        label: "WhatsApp Us",
        to: "https://wa.me/254738986763",
        external: true,
      },
    ],
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/254738986763",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

// ── Component ────────────────────────────────────────────────

export default function Footer() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!emailInput || !emailInput.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <footer
      style={{
        position: "relative",
        background: "#050613",
        overflow: "hidden",
      }}
    >
      {/* ── Top glow border ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(43,94,255,0.5), rgba(201,168,76,0.4), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* ── Ambient orb ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(43,94,255,0.06) 0%, transparent 70%)",
          top: -100,
          left: -100,
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
          bottom: 0,
          right: -60,
          pointerEvents: "none",
          filter: "blur(40px)",
        }}
      />

      {/* ── Newsletter strip ── */}
      <div
        style={{
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          padding: "40px 64px",
          position: "relative",
          zIndex: 1,
        }}
        className="footer-newsletter"
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "#C9A84C",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 6,
              }}
            >
              Stay in the loop
            </div>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#F0EEE8",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              Get program updates & enrollment news
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "0.5px solid rgba(255,255,255,0.12)",
                    borderRadius: 8,
                    padding: "11px 16px",
                    color: "#F0EEE8",
                    fontSize: 13,
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    minWidth: 240,
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(43,94,255,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.12)")
                  }
                />
                <motion.button
                  onClick={handleSubscribe}
                  whileHover={{ scale: 1.03, background: "#b8962e" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: "#C9A84C",
                    color: "#08091A",
                    border: "none",
                    borderRadius: 8,
                    padding: "11px 22px",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  Subscribe
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 20px",
                  background: "rgba(29,158,117,0.08)",
                  border: "0.5px solid rgba(29,158,117,0.25)",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#1D9E75",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                You're subscribed — we'll be in touch!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 64px 48px",
          position: "relative",
          zIndex: 1,
        }}
        className="footer-body"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: 48,
          }}
          className="footer-grid"
        >
          {/* ── Brand column ── */}
          <div>
            {/* Logo */}
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "inline-block",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#2B5EFF",
                  lineHeight: 1,
                }}
              >
                Deluxe
              </div>
              <div
                style={{
                  fontSize: 7,
                  fontWeight: 600,
                  letterSpacing: "2.5px",
                  color: "#C9A84C",
                  textTransform: "uppercase",
                  marginTop: 3,
                }}
              >
                Talent & Passion Academy
              </div>
            </Link>

            <p
              style={{
                fontSize: 13,
                lineHeight: 1.8,
                color: "rgba(240,238,232,0.45)",
                margin: "0 0 28px",
                fontFamily: "'DM Sans', sans-serif",
                maxWidth: 260,
              }}
            >
              Empowering young learners aged 8–17 through talent discovery,
              mentorship, and hands-on experiential learning.
            </p>

            {/* Contact details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <ContactLine
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                }
                value="0738 986 763"
                href="tel:+254738986763"
              />
              <ContactLine
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                }
                value="0703 999 501"
                href="tel:+254703999501"
              />
              <ContactLine
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
                value="deluxetalentsacademy@gmail.com"
                href="mailto:deluxetalentsacademy@gmail.com"
              />
              <ContactLine
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                }
                value="www.deluxetalentsacademy.com"
                href="https://www.deluxetalentsacademy.com"
                external
              />
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: 8 }}>
              {SOCIALS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{
                    scale: 1.1,
                    borderColor: "rgba(201,168,76,0.5)",
                    color: "#C9A84C",
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.04)",
                    border: "0.5px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(240,238,232,0.5)",
                    textDecoration: "none",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Nav columns ── */}
          {NAV_COLUMNS.map((col, i) => (
            <FooterNavCol
              key={col.heading}
              col={col}
              delay={i * 0.08}
              currentPath={location.pathname}
            />
          ))}
        </div>
      </div>

      {/* ── Silhouette scene ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          lineHeight: 0,
          marginTop: 16,
        }}
      >
        <svg
          width="100%"
          viewBox="0 0 1400 260"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <defs>
            <linearGradient id="sf-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#050613" />
              <stop offset="60%" stopColor="#080d20" />
              <stop offset="100%" stopColor="#09100f" />
            </linearGradient>
            <linearGradient id="sf-sil" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0e1530" />
              <stop offset="100%" stopColor="#050613" />
            </linearGradient>
            <linearGradient id="sf-horizon" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2B5EFF" stopOpacity="0" />
              <stop offset="28%" stopColor="#2B5EFF" stopOpacity="0.2" />
              <stop offset="52%" stopColor="#C9A84C" stopOpacity="0.26" />
              <stop offset="78%" stopColor="#2B5EFF" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#2B5EFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="1400" height="260" fill="url(#sf-sky)" />
          <ellipse
            cx="380"
            cy="210"
            rx="300"
            ry="70"
            fill="#2B5EFF"
            fillOpacity="0.07"
          />
          <ellipse
            cx="1020"
            cy="200"
            rx="260"
            ry="60"
            fill="#C9A84C"
            fillOpacity="0.07"
          />
          <circle cx="700" cy="50" r="1.5" fill="#C9A84C" fillOpacity="0.5" />
          <circle cx="280" cy="70" r="1.2" fill="#C9A84C" fillOpacity="0.35" />
          <circle cx="1100" cy="55" r="1.5" fill="#C9A84C" fillOpacity="0.4" />
          <circle cx="490" cy="40" r="1" fill="#7EB3FF" fillOpacity="0.4" />
          <circle cx="870" cy="45" r="1.2" fill="#7EB3FF" fillOpacity="0.35" />
          <circle cx="1260" cy="65" r="1" fill="#C9A84C" fillOpacity="0.3" />
          <circle cx="150" cy="55" r="1" fill="#7EB3FF" fillOpacity="0.3" />
          <rect
            x="0"
            y="205"
            width="1400"
            height="1.5"
            fill="url(#sf-horizon)"
          />
          <rect x="0" y="206" width="1400" height="54" fill="#050613" />

          {/* LEFT PALM */}
          <g fill="url(#sf-sil)">
            <rect x="20" y="90" width="11" height="120" rx="3" />
            <ellipse
              cx="25"
              cy="92"
              rx="50"
              ry="16"
              transform="rotate(-22 25 92)"
            />
            <ellipse
              cx="25"
              cy="88"
              rx="46"
              ry="14"
              transform="rotate(16 25 88)"
            />
            <ellipse
              cx="25"
              cy="85"
              rx="42"
              ry="13"
              transform="rotate(-6 25 85)"
            />
            <ellipse
              cx="25"
              cy="82"
              rx="38"
              ry="12"
              transform="rotate(36 25 82)"
            />
            <ellipse
              cx="25"
              cy="80"
              rx="34"
              ry="11"
              transform="rotate(-36 25 80)"
            />
          </g>

          {/* RIGHT PALM */}
          <g fill="url(#sf-sil)">
            <rect x="1369" y="75" width="11" height="135" rx="3" />
            <ellipse
              cx="1375"
              cy="77"
              rx="54"
              ry="17"
              transform="rotate(22 1375 77)"
            />
            <ellipse
              cx="1375"
              cy="73"
              rx="50"
              ry="14"
              transform="rotate(-14 1375 73)"
            />
            <ellipse
              cx="1375"
              cy="70"
              rx="46"
              ry="13"
              transform="rotate(9 1375 70)"
            />
            <ellipse
              cx="1375"
              cy="67"
              rx="42"
              ry="12"
              transform="rotate(-40 1375 67)"
            />
            <ellipse
              cx="1375"
              cy="65"
              rx="38"
              ry="11"
              transform="rotate(42 1375 65)"
            />
          </g>

          {/* CENTER PALM */}
          <g fill="url(#sf-sil)" opacity="0.6">
            <rect x="695" y="125" width="9" height="85" rx="3" />
            <ellipse
              cx="699"
              cy="127"
              rx="38"
              ry="12"
              transform="rotate(-18 699 127)"
            />
            <ellipse
              cx="699"
              cy="124"
              rx="34"
              ry="10"
              transform="rotate(14 699 124)"
            />
            <ellipse
              cx="699"
              cy="122"
              rx="30"
              ry="9"
              transform="rotate(-5 699 122)"
            />
            <ellipse
              cx="699"
              cy="120"
              rx="26"
              ry="8"
              transform="rotate(30 699 120)"
            />
          </g>

          {/* DRONE KID */}
          <g fill="url(#sf-sil)">
            <circle cx="100" cy="152" r="10" />
            <rect x="94" y="162" width="12" height="24" rx="4" />
            <rect x="90" y="164" width="8" height="3" rx="1.5" />
            <rect x="102" y="164" width="8" height="3" rx="1.5" />
            <rect x="92" y="186" width="6" height="16" rx="3" />
            <rect x="102" y="186" width="6" height="16" rx="3" />
            <rect x="76" y="118" width="20" height="7" rx="2" />
            <rect x="72" y="120" width="6" height="3" rx="1" />
            <rect x="96" y="120" width="6" height="3" rx="1" />
            <circle cx="75" cy="119" r="3" />
            <circle cx="101" cy="119" r="3" />
            <line
              x1="97"
              y1="162"
              x2="88"
              y2="124"
              stroke="#0e1530"
              strokeWidth="1"
              strokeDasharray="3 2"
            />
          </g>

          {/* CHESS PLAYER */}
          <g fill="url(#sf-sil)">
            <circle cx="210" cy="158" r="10" />
            <rect x="204" y="168" width="12" height="16" rx="3" />
            <rect x="196" y="170" width="9" height="3" rx="1.5" />
            <rect x="215" y="172" width="9" height="3" rx="1.5" />
            <rect x="205" y="184" width="6" height="14" rx="3" />
            <rect x="212" y="184" width="6" height="14" rx="3" />
            <rect x="188" y="183" width="48" height="5" rx="2" />
            <rect x="189" y="188" width="4" height="10" rx="1" />
            <rect x="231" y="188" width="4" height="10" rx="1" />
            <rect x="196" y="178" width="4" height="5" rx="1" />
            <rect x="204" y="176" width="4" height="7" rx="1" />
            <rect x="212" y="178" width="4" height="5" rx="1" />
            <rect x="220" y="177" width="4" height="6" rx="1" />
          </g>

          {/* CHEF */}
          <g fill="url(#sf-sil)">
            <circle cx="330" cy="150" r="11" />
            <rect x="323" y="138" width="14" height="13" rx="3" />
            <rect x="320" y="142" width="20" height="5" rx="2" />
            <rect x="324" y="161" width="12" height="24" rx="4" />
            <rect x="320" y="163" width="8" height="3" rx="1.5" />
            <path
              d="M336 165 Q346 153 351 143"
              stroke="#0e1530"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="353" cy="140" r="6" />
            <rect x="325" y="185" width="6" height="14" rx="3" />
            <rect x="332" y="185" width="6" height="14" rx="3" />
            <rect x="308" y="194" width="22" height="12" rx="3" />
            <rect x="306" y="192" width="26" height="4" rx="2" />
          </g>

          {/* ROBOTICS KID */}
          <g fill="url(#sf-sil)">
            <circle cx="450" cy="160" r="10" />
            <rect x="444" y="170" width="12" height="18" rx="3" />
            <rect
              x="436"
              y="173"
              width="9"
              height="3"
              rx="1.5"
              transform="rotate(-18 436 173)"
            />
            <rect
              x="456"
              y="171"
              width="9"
              height="3"
              rx="1.5"
              transform="rotate(28 456 171)"
            />
            <rect x="445" y="188" width="8" height="10" rx="3" />
            <rect x="464" y="182" width="20" height="18" rx="3" />
            <rect x="466" y="177" width="16" height="7" rx="2" />
            <circle cx="470" cy="181" r="2" />
            <circle cx="478" cy="181" r="2" />
            <rect x="468" y="188" width="4" height="4" rx="1" />
            <rect x="476" y="188" width="4" height="4" rx="1" />
          </g>

          {/* MARTIAL ARTS */}
          <g fill="url(#sf-sil)">
            <circle cx="570" cy="148" r="12" />
            <rect x="563" y="160" width="14" height="22" rx="4" />
            <path
              d="M577 178 Q598 173 610 167"
              stroke="#0e1530"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M563 164 Q550 157 546 152"
              stroke="#0e1530"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M577 162 Q588 157 592 153"
              stroke="#0e1530"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <rect x="563" y="181" width="8" height="18" rx="3" />
            <rect x="563" y="172" width="15" height="3" rx="1" />
          </g>

          {/* PUBLIC SPEAKER */}
          <g fill="url(#sf-sil)">
            <circle cx="700" cy="138" r="12" />
            <rect x="693" y="150" width="14" height="22" rx="4" />
            <path
              d="M707 156 Q718 144 722 133"
              stroke="#0e1530"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M693 157 Q682 163 678 167"
              stroke="#0e1530"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <rect x="694" y="172" width="7" height="20" rx="3" />
            <rect x="701" y="172" width="7" height="20" rx="3" />
            <rect x="678" y="192" width="42" height="5" rx="2" />
            <rect x="684" y="197" width="8" height="16" rx="2" />
            <rect x="706" y="197" width="8" height="16" rx="2" />
          </g>

          {/* FOOTBALLER */}
          <g fill="url(#sf-sil)">
            <circle cx="840" cy="148" r="12" />
            <rect x="833" y="160" width="14" height="24" rx="4" />
            <path
              d="M847 180 Q860 186 868 194"
              stroke="#0e1530"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M833 162 Q820 170 816 176"
              stroke="#0e1530"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M847 163 Q856 158 860 153"
              stroke="#0e1530"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <rect x="833" y="182" width="8" height="20" rx="3" />
            <circle cx="876" cy="200" r="10" />
          </g>

          {/* CAMERA KID */}
          <g fill="url(#sf-sil)">
            <circle cx="980" cy="153" r="11" />
            <rect x="973" y="164" width="14" height="22" rx="4" />
            <path
              d="M973 169 Q960 170 952 168"
              stroke="#0e1530"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M987 168 Q998 167 1004 165"
              stroke="#0e1530"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <rect x="940" y="161" width="24" height="15" rx="3" />
            <circle cx="952" cy="168" r="5" />
            <rect x="948" y="158" width="8" height="4" rx="1" />
            <rect x="974" y="186" width="7" height="16" rx="3" />
            <rect x="981" y="186" width="7" height="16" rx="3" />
          </g>

          {/* STEM KID */}
          <g fill="url(#sf-sil)">
            <circle cx="1110" cy="150" r="12" />
            <rect x="1103" y="162" width="14" height="24" rx="4" />
            <path
              d="M1117 167 Q1128 156 1132 145"
              stroke="#0e1530"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M1128 132 L1124 146 L1142 146 L1138 132 Z"
              fill="url(#sf-sil)"
            />
            <rect x="1127" y="128" width="12" height="5" rx="1" />
            <path
              d="M1103 164 Q1092 172 1088 178"
              stroke="#0e1530"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <rect x="1103" y="186" width="7" height="18" rx="3" />
            <rect x="1110" y="186" width="7" height="18" rx="3" />
          </g>

          {/* CONTROLLER KID */}
          <g fill="url(#sf-sil)">
            <circle cx="1270" cy="153" r="11" />
            <rect x="1263" y="164" width="12" height="24" rx="4" />
            <path
              d="M1263 169 Q1252 164 1248 159"
              stroke="#0e1530"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M1275 167 Q1284 161 1288 155"
              stroke="#0e1530"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <rect x="1238" y="151" width="18" height="12" rx="3" />
            <circle cx="1243" cy="157" r="2" />
            <circle cx="1251" cy="157" r="2" />
            <rect x="1263" y="188" width="6" height="14" rx="3" />
            <rect x="1270" y="188" width="6" height="14" rx="3" />
          </g>

          <text
            x="700"
            y="232"
            textAnchor="middle"
            fontFamily="'Playfair Display', serif"
            fontSize="11"
            fontWeight="700"
            fill="#C9A84C"
            fillOpacity="0.45"
            letterSpacing="8"
          >
            DELUXE TALENT &amp; PASSION ACADEMY
          </text>
          <text
            x="700"
            y="245"
            textAnchor="middle"
            fontFamily="'DM Sans', sans-serif"
            fontSize="9"
            fontWeight="400"
            fill="#F0EEE8"
            fillOpacity="0.18"
            letterSpacing="4"
          >
            EST. 2020 · NAIROBI, KENYA
          </text>
        </svg>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "20px 64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
          className="footer-bottom"
        >
          <p
            style={{
              fontSize: 12,
              color: "rgba(240,238,232,0.25)",
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            © {currentYear} Deluxe Talent & Passion Academy. All rights
            reserved.
          </p>

          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Use", "Safeguarding Policy"].map(
              (item) => (
                <Link
                  key={item}
                  to="#"
                  style={{
                    fontSize: 12,
                    color: "rgba(240,238,232,0.25)",
                    textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#C9A84C")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(240,238,232,0.25)")
                  }
                >
                  {item}
                </Link>
              ),
            )}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{
              scale: 1.05,
              borderColor: "rgba(201,168,76,0.4)",
              color: "#C9A84C",
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "transparent",
              border: "0.5px solid rgba(255,255,255,0.1)",
              borderRadius: 6,
              padding: "7px 14px",
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(240,238,232,0.35)",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.5px",
              transition: "color 0.2s, border-color 0.2s",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            Back to top
          </motion.button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
          .footer-body { padding: 48px 28px 36px !important; }
          .footer-newsletter { padding: 32px 28px !important; }
          .footer-bottom { padding: 20px 28px !important; flex-direction: column; align-items: flex-start !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

// ── Footer Nav Column ────────────────────────────────────────

function FooterNavCol({ col, delay, currentPath }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <h4
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "rgba(240,238,232,0.35)",
          margin: "0 0 18px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {col.heading}
      </h4>
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {col.links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <motion.a
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3, color: "#C9A84C" }}
                transition={{ duration: 0.15 }}
                style={{
                  fontSize: 13,
                  color: "rgba(240,238,232,0.5)",
                  textDecoration: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  transition: "color 0.2s",
                }}
              >
                {link.label}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </motion.a>
            ) : (
              <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.15 }}>
                <Link
                  to={link.to}
                  style={{
                    fontSize: 13,
                    color:
                      currentPath === link.to
                        ? "#F0EEE8"
                        : "rgba(240,238,232,0.5)",
                    textDecoration: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "color 0.2s",
                    fontWeight: currentPath === link.to ? 500 : 400,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#F0EEE8")
                  }
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      currentPath === link.to
                        ? "#F0EEE8"
                        : "rgba(240,238,232,0.5)";
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ── Contact Line ─────────────────────────────────────────────

function ContactLine({ icon, value, href, external }) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ color: "#C9A84C" }}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        color: "rgba(240,238,232,0.45)",
        textDecoration: "none",
        fontSize: 12,
        lineHeight: 1.5,
        fontFamily: "'DM Sans', sans-serif",
        transition: "color 0.2s",
      }}
    >
      <span style={{ marginTop: 1, flexShrink: 0, opacity: 0.6 }}>{icon}</span>
      <span>{value}</span>
    </motion.a>
  );
}

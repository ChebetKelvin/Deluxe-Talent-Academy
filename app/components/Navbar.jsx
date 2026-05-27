import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";

const NAV_LINKS = [
  { label: "Programs", to: "/programs" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleEnrol = () => {
    setMenuOpen(false);
    const el = document.getElementById("enrol");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "instant" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el2 = document.getElementById("enrol");
        if (el2) {
          const top = el2.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: "instant" });
        }
      }, 300);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition:
            "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
          /* Scrolled: frosted warm cream panel */
          background: scrolled ? "rgba(253,250,246,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled
            ? "0.5px solid rgba(28,21,16,0.1)"
            : "0.5px solid transparent",
          boxShadow: scrolled ? "0 4px 24px rgba(180,140,80,0.08)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 40px",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: 24,
                  fontWeight: 900,
                  color: "#d97706",
                  letterSpacing: "-0.5px",
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
                  color: "#9c876e",
                  textTransform: "uppercase",
                  marginTop: 3,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Talent & Passion Academy
              </div>
            </motion.div>
          </Link>

          {/* ── Desktop nav links ─────────────────────────────────────── */}
          <nav
            style={{
              display: "flex",
              gap: 32,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="dta-desktop-nav"
          >
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.to}
                link={link}
                index={i}
                currentPath={location.pathname}
              />
            ))}
          </nav>

          {/* ── Desktop CTA ───────────────────────────────────────────── */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 12 }}
            className="dta-desktop-cta"
          >
            <motion.button
              onClick={handleEnrol}
              whileHover={{ scale: 1.03, background: "#b45309" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              style={{
                background: "#d97706",
                color: "#fff",
                border: "none",
                borderRadius: 7,
                padding: "10px 22px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.3px",
                boxShadow: "0 3px 14px rgba(217,119,6,0.22)",
              }}
            >
              Enrol Now
            </motion.button>
          </div>

          {/* ── Mobile hamburger ─────────────────────────────────────── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="dta-hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              display: "none",
              background: "transparent",
              border: "0.5px solid rgba(28,21,16,0.18)",
              borderRadius: 6,
              padding: "8px 10px",
              cursor: "pointer",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  menuOpen
                    ? i === 0
                      ? { rotate: 45, y: 8 }
                      : i === 1
                        ? { opacity: 0 }
                        : { rotate: -45, y: -8 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 0.2 }}
                style={{
                  display: "block",
                  width: 20,
                  height: 1.5,
                  background: "#1c1510",
                  borderRadius: 1,
                  transformOrigin: "center",
                }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* ── Mobile menu overlay ───────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 72,
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(253,250,246,0.97)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "0.5px solid rgba(28,21,16,0.1)",
              boxShadow: "0 8px 32px rgba(180,140,80,0.1)",
              padding: "24px 40px 32px",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    to={link.to}
                    style={{
                      display: "block",
                      padding: "14px 0",
                      fontSize: 18,
                      fontWeight: 600,
                      color:
                        location.pathname === link.to ? "#1c1510" : "#9c876e",
                      textDecoration: "none",
                      borderBottom: "0.5px solid rgba(28,21,16,0.08)",
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ marginTop: 24 }}
            >
              <button
                onClick={handleEnrol}
                style={{
                  width: "100%",
                  background: "#d97706",
                  color: "#fff",
                  border: "none",
                  borderRadius: 7,
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 4px 16px rgba(217,119,6,0.2)",
                }}
              >
                Enrol Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .dta-desktop-nav { display: none !important; }
          .dta-desktop-cta { display: none !important; }
          .dta-hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ── NavLink ─────────────────────────────────────────────────────────────── */
function NavLink({ link, index, currentPath }) {
  const isActive = currentPath === link.to;

  return (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1 + index * 0.07,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ listStyle: "none" }}
    >
      <Link
        to={link.to}
        style={{
          position: "relative",
          fontSize: 13,
          fontWeight: 500,
          color: isActive ? "#1c1510" : "#9c876e",
          textDecoration: "none",
          letterSpacing: "0.3px",
          paddingBottom: 2,
          transition: "color 0.2s",
          fontFamily: "'DM Sans', sans-serif",
        }}
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.color = "#1c1510";
        }}
        onMouseLeave={(e) => {
          if (!isActive) e.currentTarget.style.color = "#9c876e";
        }}
      >
        {link.label}
        {isActive && (
          <motion.span
            layoutId="nav-underline"
            style={{
              position: "absolute",
              bottom: -2,
              left: 0,
              right: 0,
              height: 1,
              background: "#d97706",
              borderRadius: 1,
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </motion.li>
  );
}

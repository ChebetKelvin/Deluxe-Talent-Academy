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
        const el = document.getElementById("enrol");
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 70;
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

  // Close mobile menu on route change
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
          fontFamily: "'playfair display', serif",
          transition: "background 0.3s ease, border-color 0.3s ease",
          background: scrolled ? "rgba(8, 9, 26, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "0.5px solid rgba(255,255,255,0.08)"
            : "0.5px solid transparent",
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
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <motion.div
              whileHover={{ opacity: 0.85 }}
              transition={{ duration: 0.15 }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: 24,
                  fontWeight: 900,
                  color: "#2B5EFF",
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
                  color: "#C9A84C",
                  textTransform: "uppercase",
                  marginTop: 3,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Talent & Passion Academy
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: "flex",
              gap: 32,
              listStyle: "none",
              margin: 0,
              padding: 0,
              fontFamily: "'Playfair Display', serif",
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

          {/* Desktop CTA */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 12 }}
            className="dta-desktop-cta"
          >
            <motion.button
              onClick={handleEnrol}
              whileHover={{ scale: 1.03, background: "#b8962e" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              style={{
                background: "#C9A84C",
                color: "#08091A",
                border: "none",
                borderRadius: 7,
                padding: "10px 22px",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "0.3px",
              }}
            >
              Enrol Now
            </motion.button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="dta-hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              display: "none",
              background: "transparent",
              border: "0.5px solid rgba(255,255,255,0.15)",
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
                  background: "rgba(240,238,232,0.8)",
                  borderRadius: 1,
                  transformOrigin: "center",
                }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 72,
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(8,9,26,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "0.5px solid rgba(255,255,255,0.08)",
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
                        location.pathname === link.to
                          ? "#F0EEE8"
                          : "rgba(240,238,232,0.5)",
                      textDecoration: "none",
                      borderBottom: "0.5px solid rgba(255,255,255,0.06)",
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
                  background: "#C9A84C",
                  color: "#08091A",
                  border: "none",
                  borderRadius: 7,
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
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
          .dta-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

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
          color: isActive ? "#F0EEE8" : "rgba(240,238,232,0.55)",
          textDecoration: "none",
          letterSpacing: "0.3px",
          paddingBottom: 2,
          transition: "color 0.2s",
          fontFamily: "'DM Sans', sans-serif",
        }}
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.color = "#F0EEE8";
        }}
        onMouseLeave={(e) => {
          if (!isActive) e.currentTarget.style.color = "rgba(240,238,232,0.55)";
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
              background: "#C9A84C",
              borderRadius: 1,
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </motion.li>
  );
}

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router";

/* ─── Slideshow images (course-related) ─────────────────────────────────── */
const SLIDES = [
  { src: "/robotics1.jpg", alt: "Robotics & Coding session" },
  { src: "/aviation.jpg", alt: "Aviation & Drone Technology workshop" },
  { src: "/culinary.png", alt: "Culinary Arts class" },
  { src: "/football.jpg", alt: "Football & Sports Development" },
  { src: "/creative-arts.jpg", alt: "Visual Media & Creative Arts" },
  { src: "/science.png", alt: "STEM Innovation Club" },
];

const SLIDE_DURATION = 5000; // ms per slide

/* ─── Animation variants ─────────────────────────────────────────────────── */
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.35 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  { num: "4+", label: "Years of experience" },
  { num: "3,000+", label: "Learners impacted" },
  { num: "9", label: "Specialist clubs" },
];

/* ─── Hero ───────────────────────────────────────────────────────────────── */
export default function Hero() {
  const heroRef = useRef(null);
  const [current, setCurrent] = useState(0);

  /* Auto-advance slideshow */
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  /* Parallax scroll */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const rawOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const rawImgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const contentOpacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });
  const contentScale = useSpring(rawScale, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#fdfaf6",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Cinematic slideshow background ─────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      >
        <AnimatePresence>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            style={{
              position: "absolute",
              inset: 0,
              y: rawImgY,
            }}
          >
            <img
              src={SLIDES[current].src}
              alt={SLIDES[current].alt}
              style={{
                width: "100%",
                height: "110%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                filter: "saturate(0.75) brightness(0.92)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(15,10,5,0.62) 0%, rgba(15,10,5,0.45) 55%, rgba(15,10,5,0.70) 100%)",
          }}
        />
        {/* Grain texture for warmth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: 0.04,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 40px",
          width: "100%",
          flex: 1,
          display: "flex",
          alignItems: "center",
          paddingTop: 72,
          opacity: contentOpacity,
          scale: contentScale,
          boxSizing: "border-box",
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ paddingTop: 80, paddingBottom: 100, width: "100%" }}
        >
          {/* Eyebrow pill */}
          <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(217,119,6,0.1)",
                border: "0.5px solid rgba(217,119,6,0.35)",
                borderRadius: 100,
                padding: "6px 16px 6px 10px",
                fontSize: 12,
                fontWeight: 600,
                color: "#b45309",
                letterSpacing: "0.5px",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <PulsingDot />
              Now enrolling — Ages 8 to 17
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(44px, 6vw, 72px)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-2.5px",
              color: "#1c1510",
              margin: "0 0 24px",
              maxWidth: 680,
            }}
          >
            Solving the Puzzle
            <br />
            of Your Child's{" "}
            <em style={{ color: "#d97706", fontStyle: "italic" }}>Future</em>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 17,
              lineHeight: 1.75,
              color: "black",
              maxWidth: 480,
              margin: "0 0 40px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400,
            }}
          >
            Empowering young learners through talent discovery, mentorship, and
            hands-on experiential learning — one passion at a time.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 60,
            }}
          >
            <Link to="/programs" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.04, background: "#b45309" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  background: "#d97706",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "14px 28px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.3px",
                  boxShadow: "0 4px 20px rgba(217,119,6,0.25)",
                }}
              >
                Explore Programs
              </motion.button>
            </Link>

            <motion.button
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(28,21,16,0.4)",
                color: "#1c1510",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              style={{
                background: "rgba(253,250,246,0.6)",
                color: "black",
                border: "0.5px solid rgba(28,21,16,0.2)",
                borderRadius: 8,
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 10,
                backdropFilter: "blur(8px)",
              }}
            >
              <PlayCircle />
              Watch how it works
            </motion.button>
          </motion.div>

          {/* Stats strip */}
          <motion.div variants={fadeIn}>
            <div
              style={{
                display: "inline-flex",
                border: "0.5px solid rgba(28,21,16,0.12)",
                borderRadius: 10,
                overflow: "hidden",
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(12px)",
              }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.7 + i * 0.1,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    padding: "16px 28px",
                    borderRight:
                      i < STATS.length - 1
                        ? "0.5px solid rgba(28,21,16,0.1)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 26,
                      fontWeight: 900,
                      color: "#1c1510",
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#9c876e",
                      letterSpacing: "0.3px",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Slide dots ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 44,
          right: 48,
          display: "flex",
          gap: 8,
          zIndex: 3,
          opacity: contentOpacity,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? 24 : 7,
              height: 7,
              borderRadius: 4,
              background: i === current ? "#d97706" : "rgba(28,21,16,0.25)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition:
                "width 400ms cubic-bezier(0.16,1,0.3,1), background 300ms ease",
            }}
          />
        ))}
      </motion.div>

      {/* ── Scroll indicator ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          zIndex: 2,
          opacity: contentOpacity,
        }}
      >
        <span
          style={{
            fontSize: 9,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "rgba(28,21,16,0.3)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          scroll
        </span>
        <ScrollLine />
      </motion.div>
    </section>
  );
}

/* ── Sub-components ────────────────────────────────────────────────────────── */

function PulsingDot() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.3, 1], scale: [1, 0.7, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{
        display: "inline-block",
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "#d97706",
        flexShrink: 0,
      }}
    />
  );
}

function PlayCircle() {
  return (
    <motion.span
      whileHover={{ scale: 1.1 }}
      style={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: "rgba(28,21,16,0.07)",
        border: "0.5px solid rgba(28,21,16,0.18)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
        <path d="M1.5 1.5L7.5 5L1.5 8.5V1.5Z" fill="rgba(28,21,16,0.7)" />
      </svg>
    </motion.span>
  );
}

function ScrollLine() {
  return (
    <div
      style={{ width: 1, height: 48, overflow: "hidden", position: "relative" }}
    >
      <motion.div
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background:
            "linear-gradient(to bottom, transparent, rgba(28,21,16,0.35), transparent)",
        }}
      />
    </div>
  );
}

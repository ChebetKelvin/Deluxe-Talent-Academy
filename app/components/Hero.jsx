import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router";

// Staggered entrance animation variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const STATS = [
  { num: "4+", label: "Years of experience" },
  { num: "3,000+", label: "Learners impacted" },
  { num: "9", label: "Specialist clubs" },
];

export default function Hero() {
  const heroRef = useRef(null);

  // Parallax scroll for background orbs
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const rawY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rawY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  // Spring-smoothed transforms
  const orbY1 = useSpring(rawY1, { stiffness: 80, damping: 20 });
  const orbY2 = useSpring(rawY2, { stiffness: 80, damping: 20 });
  const contentOpacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });
  const contentScale = useSpring(rawScale, { stiffness: 80, damping: 20 });

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#08091A",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Ambient background glows ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Blue glow — top right */}
        <motion.div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(43,94,255,0.18) 0%, transparent 70%)",
            top: -200,
            right: -150,
            y: orbY1,
          }}
        />
        {/* Gold glow — bottom left */}
        <motion.div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)",
            bottom: -100,
            left: -50,
            y: orbY2,
          }}
        />
        {/* Subtle blue — mid left */}
        <motion.div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(43,94,255,0.07) 0%, transparent 70%)",
            top: "40%",
            left: "10%",
            y: orbY1,
          }}
        />

        {/* Grain texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: 0.025,
          }}
        />

        {/* Subtle grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ── Main content ── */}
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
          paddingTop: 72, // nav height
          opacity: contentOpacity,
          scale: contentScale,
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
                background: "rgba(43,94,255,0.1)",
                border: "0.5px solid rgba(43,94,255,0.3)",
                borderRadius: 100,
                padding: "6px 16px 6px 10px",
                fontSize: 12,
                fontWeight: 600,
                color: "#7EB3FF",
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
              color: "#F0EEE8",
              margin: "0 0 24px",
              maxWidth: 680,
            }}
          >
            Solving the Puzzle
            <br />
            of Your Child's{" "}
            <em style={{ color: "#2B5EFF", fontStyle: "italic" }}>Future</em>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 17,
              lineHeight: 1.75,
              color: "rgba(240,238,232,0.55)",
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
                whileHover={{ scale: 1.04, background: "#b8962e" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                style={{
                  background: "#C9A84C",
                  color: "#08091A",
                  border: "none",
                  borderRadius: 8,
                  padding: "14px 28px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.3px",
                }}
              >
                Explore Programs
              </motion.button>
            </Link>

            <motion.button
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(255,255,255,0.35)",
                color: "#F0EEE8",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              style={{
                background: "transparent",
                color: "rgba(240,238,232,0.65)",
                border: "0.5px solid rgba(255,255,255,0.2)",
                borderRadius: 8,
                padding: "14px 28px",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 10,
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
                border: "0.5px solid rgba(255,255,255,0.09)",
                borderRadius: 10,
                overflow: "hidden",
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
                        ? "0.5px solid rgba(255,255,255,0.09)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 26,
                      fontWeight: 900,
                      color: "#F0EEE8",
                      lineHeight: 1,
                      marginBottom: 4,
                    }}
                  >
                    {stat.num}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(240,238,232,0.4)",
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

      {/* ── Scroll indicator ── */}
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
            color: "rgba(240,238,232,0.25)",
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

// ── Sub-components ──────────────────────────────────────────

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
        background: "#2B5EFF",
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
        background: "rgba(255,255,255,0.08)",
        border: "0.5px solid rgba(255,255,255,0.18)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="9" height="10" viewBox="0 0 9 10" fill="none">
        <path d="M1.5 1.5L7.5 5L1.5 8.5V1.5Z" fill="rgba(240,238,232,0.8)" />
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
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.35), transparent)",
        }}
      />
    </div>
  );
}

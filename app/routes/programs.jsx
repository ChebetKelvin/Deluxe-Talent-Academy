import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link, useNavigate } from "react-router";

const PAGE_HEADER_IMAGE = "/logo.png";

const PROGRAM_IMAGES = {
  aviation: "/aviation.jpg",
  robotics: "/robotics1.jpg",
  stem: "/science.png",
  culinary: "/culinary.png",
  arts: "/creative-arts.jpg",
  speaking: "/public-speaking.jpg",
  chess: "/chess1.jpg",
  football: "/football.jpg",
  martial: "/martial.jpg",
};

// ── Data ─────────────────────────────────────────────────────
const PROGRAMS = [
  {
    id: "aviation",
    index: "01",
    category: "STEM & Innovation",
    name: "Aviation & Drone Technology",
    tagline: "Take Learning to New Heights",
    description:
      "Students explore the science of flight, aerodynamics, and navigation — then put theory into practice by piloting real drones.",
    skills: [
      "Aerodynamics",
      "Navigation",
      "Drone piloting",
      "Critical thinking",
    ],
    ages: "10 – 17",
    duration: "Weekly sessions",
    color: "#2B5EFF",
    colorDim: "rgba(43,94,255,0.07)",
    colorBorder: "rgba(43,94,255,0.18)",
    colorGlow: "rgba(43,94,255,0.12)",
    // Grid sizing for masonry
    size: "tall", // tall, wide, square
  },
  {
    id: "robotics",
    index: "02",
    category: "STEM & Innovation",
    name: "Robotics & Coding",
    tagline: "Build the Future, Line by Line",
    description:
      "From block-based coding to real programming languages — students design, build, and program robots that solve real-world challenges.",
    skills: [
      "Programming logic",
      "Mechanical design",
      "Problem-solving",
      "Teamwork",
    ],
    ages: "8 – 17",
    duration: "Weekly sessions",
    color: "#2B5EFF",
    colorDim: "rgba(43,94,255,0.07)",
    colorBorder: "rgba(43,94,255,0.18)",
    colorGlow: "rgba(43,94,255,0.12)",
    size: "wide",
  },
  {
    id: "stem",
    index: "03",
    category: "STEM & Innovation",
    name: "STEM Innovation Club",
    tagline: "Curiosity as a Curriculum",
    description:
      "An open-ended lab environment where learners experiment with science, engineering, and technology projects.",
    skills: [
      "Scientific method",
      "Engineering design",
      "Data analysis",
      "Innovation",
    ],
    ages: "10 – 17",
    duration: "Weekly sessions",
    color: "#2B5EFF",
    colorDim: "rgba(43,94,255,0.07)",
    colorBorder: "rgba(43,94,255,0.18)",
    colorGlow: "rgba(43,94,255,0.12)",
    size: "square",
  },
  {
    id: "culinary",
    index: "04",
    category: "Creative Arts",
    name: "Culinary Arts",
    tagline: "Creativity You Can Taste",
    description:
      "More than cooking — this program teaches patience, precision, cultural appreciation, and entrepreneurial thinking.",
    skills: [
      "Recipe development",
      "Food safety",
      "Presentation",
      "Entrepreneurship",
    ],
    ages: "8 – 17",
    duration: "Weekly sessions",
    color: "#C9A84C",
    colorDim: "rgba(201,168,76,0.07)",
    colorBorder: "rgba(201,168,76,0.18)",
    colorGlow: "rgba(201,168,76,0.1)",
    size: "tall",
  },
  {
    id: "arts",
    index: "05",
    category: "Creative Arts",
    name: "Visual Media & Creative Arts",
    tagline: "See the World. Shape It.",
    description:
      "Photography, videography, digital illustration, and graphic design — all taught through real project briefs.",
    skills: [
      "Photography",
      "Video editing",
      "Digital illustration",
      "Storytelling",
    ],
    ages: "8 – 17",
    duration: "Weekly sessions",
    color: "#C9A84C",
    colorDim: "rgba(201,168,76,0.07)",
    colorBorder: "rgba(201,168,76,0.18)",
    colorGlow: "rgba(201,168,76,0.1)",
    size: "wide",
  },
  {
    id: "speaking",
    index: "06",
    category: "Leadership & Life Skills",
    name: "Public Speaking & Leadership",
    tagline: "Find Your Voice. Lead the Room.",
    description:
      "A transformative program that turns quiet learners into confident communicators through debates, presentations, and leadership exercises.",
    skills: [
      "Debate",
      "Persuasion",
      "Presentation skills",
      "Emotional intelligence",
    ],
    ages: "10 – 17",
    duration: "Weekly sessions",
    color: "#1D9E75",
    colorDim: "rgba(29,158,117,0.07)",
    colorBorder: "rgba(29,158,117,0.18)",
    colorGlow: "rgba(29,158,117,0.1)",
    size: "square",
  },
  {
    id: "chess",
    index: "07",
    category: "Leadership & Life Skills",
    name: "Chess & Strategic Thinking",
    tagline: "Every Move Tells a Story",
    description:
      "Chess is the ultimate mental gym. Students develop patience, forward-thinking, and strategic planning.",
    skills: [
      "Strategic thinking",
      "Pattern recognition",
      "Patience",
      "Decision making",
    ],
    ages: "8 – 17",
    duration: "Weekly sessions",
    color: "#1D9E75",
    colorDim: "rgba(29,158,117,0.07)",
    colorBorder: "rgba(29,158,117,0.18)",
    colorGlow: "rgba(29,158,117,0.1)",
    size: "tall",
  },
  {
    id: "football",
    index: "08",
    category: "Sports & Discipline",
    name: "Football & Sports Development",
    tagline: "More Than a Game",
    description:
      "Structured football training focused on both athletic development and character building.",
    skills: [
      "Technical skills",
      "Team dynamics",
      "Resilience",
      "Sportsmanship",
    ],
    ages: "8 – 17",
    duration: "Weekly sessions",
    color: "#D85A30",
    colorDim: "rgba(216,90,48,0.07)",
    colorBorder: "rgba(216,90,48,0.18)",
    colorGlow: "rgba(216,90,48,0.1)",
    size: "wide",
  },
  {
    id: "martial",
    index: "09",
    category: "Sports & Discipline",
    name: "Martial Arts & Discipline Training",
    tagline: "Strength Starts Within",
    description:
      "Rooted in respect, focus, and self-mastery, our martial arts program teaches practical self-defence techniques.",
    skills: ["Self-defence", "Focus", "Discipline", "Self-confidence"],
    ages: "8 – 17",
    duration: "Weekly sessions",
    color: "#D85A30",
    colorDim: "rgba(216,90,48,0.07)",
    colorBorder: "rgba(216,90,48,0.18)",
    colorGlow: "rgba(216,90,48,0.1)",
    size: "square",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Programs" },
  { id: "STEM & Innovation", label: "STEM & Innovation" },
  { id: "Creative Arts", label: "Creative Arts" },
  { id: "Leadership & Life Skills", label: "Leadership & Life Skills" },
  { id: "Sports & Discipline", label: "Sports & Discipline" },
];

// ── Page ─────────────────────────────────────────────────────
export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const filtered =
    activeCategory === "all"
      ? PROGRAMS
      : PROGRAMS.filter((p) => p.category === activeCategory);

  const handleCardClick = (program) => {
    navigate(`/programs/${program.id}`, { state: { program } });
  };

  // Assign grid positions for masonry layout
  const getGridStyle = (size, index) => {
    if (isMobile) return {};

    switch (size) {
      case "tall":
        return { gridRow: "span 2" };
      case "wide":
        return { gridColumn: "span 2" };
      case "square":
      default:
        return {};
    }
  };

  return (
    <div style={{ background: "#08091A", minHeight: "100vh", paddingTop: 72 }}>
      {/* ── Page Header ── */}
      <div
        ref={headerRef}
        style={{
          position: "relative",
          overflow: "hidden",
          padding: isMobile ? "60px 0 48px" : "80px 0 72px",
        }}
      >
        {/* BG orbs */}
        <div
          aria-hidden
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {PAGE_HEADER_IMAGE ? (
            <>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${PAGE_HEADER_IMAGE})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, #08091A 30%, transparent 70%, #08091A 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, transparent 40%, #08091A 100%)",
                }}
              />
            </>
          ) : (
            <>
              <div
                style={{
                  position: "absolute",
                  width: 600,
                  height: 600,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(43,94,255,0.1) 0%, transparent 70%)",
                  top: -200,
                  right: -100,
                  filter: "blur(40px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
                  bottom: -60,
                  left: 80,
                  filter: "blur(30px)",
                }}
              />
            </>
          )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <motion.div
          style={{
            y: headerY,
            opacity: headerOpacity,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              maxWidth: 1400,
              margin: "0 auto",
              padding: isMobile ? "0 24px" : "0 64px",
            }}
          >
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 28,
              }}
            >
              <Link
                to="/"
                style={{
                  fontSize: 12,
                  color: "rgba(240,238,232,0.35)",
                  textDecoration: "none",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Home
              </Link>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(240,238,232,0.25)"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(240,238,232,0.6)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Programs
              </span>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
                gap: 40,
                alignItems: "flex-end",
              }}
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#C9A84C",
                    marginBottom: 14,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  9 Specialist Clubs
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isMobile
                      ? "clamp(32px, 8vw, 48px)"
                      : "clamp(38px, 5vw, 64px)",
                    fontWeight: 900,
                    lineHeight: 1.06,
                    letterSpacing: "-2px",
                    color: "#F0EEE8",
                    margin: "0 0 18px",
                  }}
                >
                  Every Child Has a<br />
                  <em style={{ color: "#2B5EFF", fontStyle: "italic" }}>
                    Hidden Talent
                  </em>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    fontSize: isMobile ? 14 : 16,
                    lineHeight: 1.75,
                    color: "rgba(240,238,232,0.5)",
                    margin: 0,
                    maxWidth: 520,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Hands-on learning experiences designed to unlock creativity,
                  confidence, and future-ready skills — for learners aged 8 to
                  17.
                </motion.p>
              </div>

              {/* Stats - Hidden on mobile */}
              {!isMobile && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.22,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  {[
                    ["9", "Programs"],
                    ["4+", "Years running"],
                    ["3,000+", "Learners impacted"],
                  ].map(([num, label]) => (
                    <div key={label} style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: 28,
                          fontWeight: 900,
                          color: "#F0EEE8",
                          lineHeight: 1,
                        }}
                      >
                        {num}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "rgba(240,238,232,0.35)",
                          marginTop: 2,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Filter tabs ── */}
      <div
        style={{
          position: "sticky",
          top: 72,
          zIndex: 10,
          background: "rgba(8,9,26,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "0.5px solid rgba(255,255,255,0.07)",
          borderTop: "0.5px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: isMobile ? "0 24px" : "0 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 4,
              overflowX: "auto",
              padding: "14px 0",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  position: "relative",
                  background:
                    activeCategory === cat.id
                      ? "rgba(43,94,255,0.12)"
                      : "transparent",
                  border:
                    activeCategory === cat.id
                      ? "0.5px solid rgba(43,94,255,0.35)"
                      : "0.5px solid rgba(255,255,255,0.08)",
                  borderRadius: 100,
                  padding: "8px 18px",
                  fontSize: 12,
                  fontWeight: 600,
                  color:
                    activeCategory === cat.id
                      ? "#7EB3FF"
                      : "rgba(240,238,232,0.45)",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  letterSpacing: "0.3px",
                  flexShrink: 0,
                }}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.span
                    layoutId="filter-pill"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 100,
                      background: "rgba(43,94,255,0.08)",
                      zIndex: -1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Masonry Bento Grid ── */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: isMobile ? "48px 24px 120px" : "64px 64px 120px",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
              gridAutoRows: isMobile ? "auto" : "300px",
              gap: isMobile ? 16 : 20,
              gridAutoFlow: "dense",
            }}
          >
            {filtered.map((program, index) => (
              <MasonryCard
                key={program.id}
                program={program}
                index={index}
                onClick={() => handleCardClick(program)}
                style={getGridStyle(program.size, index)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 72,
            padding: isMobile ? "32px 24px" : "48px 56px",
            background: "rgba(43,94,255,0.06)",
            border: "0.5px solid rgba(43,94,255,0.2)",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
            flexDirection: isMobile ? "column" : "row",
            textAlign: isMobile ? "center" : "left",
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
                marginBottom: 10,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Ready to join?
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? 24 : 28,
                fontWeight: 900,
                color: "#F0EEE8",
                margin: "0 0 8px",
                letterSpacing: "-0.5px",
                lineHeight: 1.15,
              }}
            >
              Not sure which program fits?
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "rgba(240,238,232,0.5)",
                margin: 0,
                maxWidth: 420,
                lineHeight: 1.7,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Our team will help you find the perfect match for your child's
              age, interests, and personality — no pressure, just a friendly
              conversation.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexShrink: 0,
              flexWrap: "wrap",
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <Link
              to="/"
              state={{ enrollProgram: "" }}
              style={{ textDecoration: "none" }}
            >
              <motion.button
                whileHover={{ scale: 1.04, background: "#b8962e" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "#C9A84C",
                  color: "#08091A",
                  border: "none",
                  borderRadius: 8,
                  padding: "13px 26px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Book a Discovery Session
              </motion.button>
            </Link>
            <a
              href="https://wa.me/254738986763"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <motion.button
                whileHover={{
                  scale: 1.04,
                  borderColor: "rgba(37,211,102,0.4)",
                  color: "#25D366",
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "transparent",
                  color: "rgba(240,238,232,0.6)",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  padding: "13px 26px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                <WhatsAppIcon /> Chat on WhatsApp
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Masonry Card Component ────────────────────────────────────
function MasonryCard({ program, index, onClick, style }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        ...style,
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        background: "#0D0E24",
        border: `0.5px solid rgba(255,255,255,0.08)`,
        minHeight: 300,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        {PROGRAM_IMAGES[program.id] ? (
          <motion.img
            src={PROGRAM_IMAGES[program.id]}
            alt={`${program.name} session`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            animate={{
              scale: isHovered ? 1.08 : 1,
              filter: isHovered
                ? "brightness(0.7) saturate(1.2)"
                : "brightness(0.5) saturate(0.8)",
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          // Placeholder gradient
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(135deg, ${program.colorDim}, rgba(8,9,26,0.8))`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                color: program.color,
                opacity: 0.3,
                transform: "scale(2)",
              }}
            >
              {program.icon}
            </div>
          </div>
        )}
      </div>

      {/* Dark scrim gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(8,9,26,0.95) 0%, rgba(8,9,26,0.4) 50%, rgba(8,9,26,0.1) 100%)",
        }}
      />

      {/* Color accent glow on hover */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, ${program.colorGlow} 0%, transparent 70%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "24px",
          zIndex: 2,
        }}
      >
        {/* Category */}
        <motion.div
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: program.color,
            marginBottom: 10,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {program.category}
        </motion.div>

        {/* Title */}
        <motion.h3
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(20px, 2.5vw, 28px)",
            fontWeight: 700,
            color: "#F0EEE8",
            margin: "0 0 8px",
            letterSpacing: "-0.3px",
            lineHeight: 1.15,
          }}
        >
          {program.name}
        </motion.h3>

        {/* Tagline - shows on hover */}
        <motion.p
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 8,
            maxHeight: isHovered ? 40 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: 13,
            color: "rgba(240,238,232,0.6)",
            margin: 0,
            lineHeight: 1.5,
            fontFamily: "'DM Sans', sans-serif",
            overflow: "hidden",
          }}
        >
          {program.tagline}
        </motion.p>

        {/* Age badge */}
        <motion.div
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginTop: 12,
            padding: "4px 12px",
            borderRadius: 100,
            background: program.colorDim,
            border: `0.5px solid ${program.colorBorder}`,
            fontSize: 10,
            fontWeight: 600,
            color: program.color,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Ages {program.ages}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── WhatsApp Icon ────────────────────────────────────────────
function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

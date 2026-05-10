import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useLocation } from "react-router";

// ── Trust signals ────────────────────────────────────────────
const TRUST_POINTS = [
  {
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
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    label: "Ages 8 – 17",
  },
  {
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
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    label: "Expert mentors",
  },
  {
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Safe learning environment",
  },
  {
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
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Hands-on learning",
  },
];

const PROGRAMS = [
  "Aviation & Drone Technology",
  "Robotics & Coding",
  "Culinary Arts",
  "Public Speaking & Leadership",
  "Chess & Strategic Thinking",
  "Football & Sports Development",
  "STEM Innovation Club",
  "Visual Media & Creative Arts",
  "Martial Arts & Discipline Training",
];

// ── Floating ambient orb ─────────────────────────────────────
function AmbientOrb({ style }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
      transition={{
        duration: 7 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(70px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

// ── Floating icon chip ───────────────────────────────────────
function FloatingChip({ label, icon, style, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        position: "absolute",
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        background: "rgba(13,14,36,0.85)",
        border: "0.5px solid rgba(255,255,255,0.12)",
        borderRadius: 100,
        padding: "7px 14px",
        fontSize: 11,
        fontWeight: 600,
        color: "rgba(240,238,232,0.75)",
        fontFamily: "'DM Sans', sans-serif",
        backdropFilter: "blur(12px)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        zIndex: 1,
        ...style,
      }}
    >
      <span style={{ color: "#C9A84C", display: "flex" }}>{icon}</span>
      {label}
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────
export default function EnrollCTA() {
  const location = useLocation();
  const sectionRef = useRef(null);
  const [formState, setFormState] = useState({
    parentName: "",
    childAge: "",
    program: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Check sessionStorage on mount — catches navigation from program detail page
    const fromStorage = sessionStorage.getItem("enrollProgram");
    if (fromStorage) {
      setFormState((prev) => ({ ...prev, program: fromStorage }));
      sessionStorage.removeItem("enrollProgram"); // clear after reading
    }

    // From /programs page navigation state
    const fromNav = location.state?.enrollProgram;
    if (fromNav) {
      setFormState((prev) => ({ ...prev, program: fromNav }));
      window.history.replaceState({}, "");
    }

    // From homepage ProgramsScroll button click
    const handlePrefill = (e) => {
      setFormState((prev) => ({ ...prev, program: e.detail }));
    };

    window.addEventListener("prefill-enroll", handlePrefill);
    return () => window.removeEventListener("prefill-enroll", handlePrefill);
  }, [location.state]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [isMobile ? 30 : 60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const cardX = useTransform(scrollYProgress, [0, 1], [isMobile ? 20 : 60, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  const smoothY = useSpring(rawY, { stiffness: 70, damping: 18 });
  const smoothCardX = useSpring(cardX, { stiffness: 70, damping: 18 });

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formState.parentName || !formState.phone) return;
    setLoading(true);
    // Simulate async submit — replace with your actual API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Deluxe Talent & Passion Academy! I'm interested in enrolling my child. My name is ${formState.parentName || "[Name]"} and I'd like to learn more about your programs.`,
  );
  const whatsappUrl = `https://wa.me/254738986763?text=${whatsappMessage}`;

  return (
    <section
      id="enrol"
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#07081A",
        overflow: "hidden",
        padding: isMobile ? "80px 0" : "140px 0",
      }}
    >
      {/* ── Background atmosphere ── */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <AmbientOrb
          style={{
            width: isMobile ? 300 : 600,
            height: isMobile ? 300 : 600,
            background: "rgba(43,94,255,0.12)",
            top: -50,
            left: -50,
          }}
        />
        <AmbientOrb
          style={{
            width: isMobile ? 250 : 500,
            height: isMobile ? 250 : 500,
            background: "rgba(201,168,76,0.09)",
            bottom: -40,
            right: -30,
          }}
        />
        <AmbientOrb
          style={{
            width: isMobile ? 150 : 300,
            height: isMobile ? 150 : 300,
            background: "rgba(29,158,117,0.07)",
            top: "40%",
            left: "40%",
          }}
        />

        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: isMobile ? "40px 40px" : "80px 80px",
          }}
        />

        {/* Top edge glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(43,94,255,0.4), rgba(201,168,76,0.4), transparent)",
          }}
        />
      </div>

      {/* ── Floating chips (decorative) - Hidden on mobile ── */}
      {!isMobile && (
        <>
          <FloatingChip
            label="Robotics & Coding"
            delay={0}
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 3l-4 4-4-4" />
              </svg>
            }
            style={{ top: "12%", left: "4%" }}
          />
          <FloatingChip
            label="3,000+ Learners"
            delay={1.2}
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
              </svg>
            }
            style={{ top: "22%", right: "3%" }}
          />
          <FloatingChip
            label="Aviation & Drones"
            delay={2.1}
            icon={
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 00-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            }
            style={{ bottom: "20%", left: "3%" }}
          />
        </>
      )}

      {/* ── Main layout ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 64px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 48 : 80,
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ── LEFT: Emotional content ── */}
        <motion.div style={{ y: smoothY, opacity }}>
          {/* Urgency badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: isMobile ? 20 : 28 }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(216,90,48,0.1)",
                border: "0.5px solid rgba(216,90,48,0.35)",
                borderRadius: 100,
                padding: "5px 14px 5px 10px",
                fontSize: isMobile ? 10 : 11,
                fontWeight: 600,
                color: "#E8835A",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#D85A30",
                  display: "block",
                }}
              />
              Limited slots available for upcoming programs
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile
                ? "clamp(28px, 8vw, 40px)"
                : "clamp(36px, 4vw, 54px)",
              fontWeight: 900,
              lineHeight: 1.06,
              letterSpacing: "-1.5px",
              color: "#F0EEE8",
              margin: "0 0 24px",
            }}
          >
            Help Your Child{" "}
            <em style={{ color: "#2B5EFF", fontStyle: "italic" }}>Discover</em>
            <br />
            Their Future
          </motion.h2>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              fontSize: isMobile ? 14 : 16,
              lineHeight: 1.8,
              color: "rgba(240,238,232,0.55)",
              margin: "0 0 40px",
              fontFamily: "'DM Sans', sans-serif",
              maxWidth: isMobile ? "100%" : 440,
            }}
          >
            Every child has an untapped talent. Our programs build{" "}
            <span style={{ color: "rgba(240,238,232,0.85)", fontWeight: 500 }}>
              creativity
            </span>
            ,{" "}
            <span style={{ color: "rgba(240,238,232,0.85)", fontWeight: 500 }}>
              confidence
            </span>
            , and{" "}
            <span style={{ color: "rgba(240,238,232,0.85)", fontWeight: 500 }}>
              leadership
            </span>{" "}
            — equipping young learners with skills they'll carry for life.
          </motion.p>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "8px" : "10px 24px",
              marginBottom: isMobile ? 32 : 44,
            }}
          >
            {TRUST_POINTS.map((point, i) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.35 + i * 0.07,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    flexShrink: 0,
                    background: "rgba(43,94,255,0.1)",
                    border: "0.5px solid rgba(43,94,255,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2B5EFF",
                  }}
                >
                  {point.icon}
                </div>
                <span
                  style={{
                    fontSize: isMobile ? 12 : 13,
                    fontWeight: 500,
                    color: "rgba(240,238,232,0.7)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {point.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Reassurance note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              padding: isMobile ? "12px 14px" : "16px 18px",
              background: "rgba(255,255,255,0.03)",
              border: "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
            }}
          >
            <div style={{ color: "#C9A84C", marginTop: 1, flexShrink: 0 }}>
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
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
            </div>
            <p
              style={{
                fontSize: isMobile ? 12 : 13,
                color: "rgba(240,238,232,0.45)",
                lineHeight: 1.7,
                margin: 0,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Our team will personally guide you through program selection and
              enrollment — no pressure, just a conversation about your child's
              interests.
            </p>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Enrollment card ── */}
        <motion.div style={{ x: smoothCardX, opacity: cardOpacity }}>
          <div
            style={{
              background: "rgba(13,14,36,0.8)",
              border: "0.5px solid rgba(255,255,255,0.1)",
              borderRadius: isMobile ? 14 : 18,
              padding: isMobile ? 24 : 36,
              backdropFilter: "blur(20px)",
              boxShadow:
                "0 40px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.05) inset",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Card inner glow */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 250,
                height: 250,
                background:
                  "radial-gradient(circle, rgba(43,94,255,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Card header */}
                  <div style={{ marginBottom: isMobile ? 20 : 28 }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "2.5px",
                        textTransform: "uppercase",
                        color: "#C9A84C",
                        fontFamily: "'DM Sans', sans-serif",
                        marginBottom: 8,
                      }}
                    >
                      Book a Discovery Session
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: isMobile ? 20 : 24,
                        fontWeight: 900,
                        color: "#F0EEE8",
                        margin: "0 0 8px",
                        letterSpacing: "-0.5px",
                        lineHeight: 1.2,
                      }}
                    >
                      Start the Journey Today
                    </h3>
                    <p
                      style={{
                        fontSize: isMobile ? 12 : 13,
                        color: "rgba(240,238,232,0.45)",
                        margin: 0,
                        lineHeight: 1.6,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      Tell us a little about your child. We'll handle the rest.
                    </p>
                  </div>

                  {/* Form fields */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: isMobile ? 10 : 14,
                    }}
                  >
                    <FormField
                      label="Parent / Guardian Name"
                      name="parentName"
                      type="text"
                      placeholder="Full name"
                      value={formState.parentName}
                      onChange={handleChange}
                      isMobile={isMobile}
                    />
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                        gap: isMobile ? 10 : 12,
                      }}
                    >
                      <FormField
                        label="Child's Age"
                        name="childAge"
                        type="number"
                        placeholder="e.g. 12"
                        value={formState.childAge}
                        onChange={handleChange}
                        min="8"
                        max="17"
                        isMobile={isMobile}
                      />
                      <FormField
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        placeholder="07XX XXX XXX"
                        value={formState.phone}
                        onChange={handleChange}
                        isMobile={isMobile}
                      />
                    </div>
                    <SelectField
                      label="Program Interest"
                      name="program"
                      value={formState.program}
                      onChange={handleChange}
                      options={PROGRAMS}
                      isMobile={isMobile}
                    />
                  </div>

                  {/* Submit CTA */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={loading}
                    whileHover={{ scale: 1.02, background: "#b8962e" }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      width: "100%",
                      marginTop: isMobile ? 16 : 20,
                      background: "#C9A84C",
                      color: "#08091A",
                      border: "none",
                      borderRadius: 9,
                      padding: isMobile ? "13px" : "15px",
                      fontSize: isMobile ? 14 : 15,
                      fontWeight: 700,
                      cursor: loading ? "not-allowed" : "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: "0.3px",
                      opacity: loading ? 0.8 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner />
                        Submitting...
                      </>
                    ) : (
                      "Enrol My Child Now →"
                    )}
                  </motion.button>

                  {/* WhatsApp CTA */}
                  <div
                    style={{
                      marginTop: isMobile ? 12 : 16,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(240,238,232,0.3)",
                        marginBottom: 10,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      — or —
                    </div>
                    <motion.a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: isMobile ? "10px" : "12px",
                        background: "rgba(37,211,102,0.08)",
                        border: "0.5px solid rgba(37,211,102,0.25)",
                        borderRadius: 9,
                        fontSize: isMobile ? 12 : 13,
                        fontWeight: 600,
                        color: "#25D366",
                        textDecoration: "none",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <WhatsAppIcon />
                      {isMobile
                        ? "Chat on WhatsApp"
                        : "Prefer WhatsApp? Chat with us instantly"}
                    </motion.a>
                  </div>
                </motion.div>
              ) : (
                <SuccessState name={formState.parentName} isMobile={isMobile} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Form Field ───────────────────────────────────────────────
function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  min,
  max,
  isMobile = false,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "rgba(240,238,232,0.45)",
          marginBottom: 7,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: focused
            ? "rgba(43,94,255,0.05)"
            : "rgba(255,255,255,0.04)",
          border: `0.5px solid ${focused ? "rgba(43,94,255,0.5)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: 8,
          padding: isMobile ? "10px 12px" : "11px 14px",
          color: "#F0EEE8",
          fontSize: isMobile ? 12 : 13,
          fontFamily: "'DM Sans', sans-serif",
          outline: "none",
          transition: "border-color 0.2s, background 0.2s",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

// ── Select Field ─────────────────────────────────────────────
function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  isMobile = false,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "rgba(240,238,232,0.45)",
          marginBottom: 7,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: focused
            ? "rgba(43,94,255,0.05)"
            : "rgba(255,255,255,0.04)",
          border: `0.5px solid ${focused ? "rgba(43,94,255,0.5)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: 8,
          padding: isMobile ? "10px 12px" : "11px 14px",
          color: value ? "#F0EEE8" : "rgba(240,238,232,0.35)",
          fontSize: isMobile ? 12 : 13,
          fontFamily: "'DM Sans', sans-serif",
          outline: "none",
          transition: "border-color 0.2s, background 0.2s",
          cursor: "pointer",
          appearance: "none",
        }}
      >
        <option
          value=""
          style={{ background: "#0D0E24", color: "rgba(240,238,232,0.5)" }}
        >
          Select a program...
        </option>
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
            style={{ background: "#0D0E24", color: "#F0EEE8" }}
          >
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

// ── Success State ────────────────────────────────────────────
function SuccessState({ name, isMobile = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: "center", padding: isMobile ? "20px 0" : "32px 0" }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
        style={{
          width: isMobile ? 56 : 64,
          height: isMobile ? 56 : 64,
          borderRadius: "50%",
          background: "rgba(29,158,117,0.12)",
          border: "0.5px solid rgba(29,158,117,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          color: "#1D9E75",
        }}
      >
        <svg
          width={isMobile ? 24 : 28}
          height={isMobile ? 24 : 28}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </motion.div>

      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: isMobile ? 22 : 26,
          fontWeight: 900,
          color: "#F0EEE8",
          margin: "0 0 12px",
          letterSpacing: "-0.5px",
        }}
      >
        We've received your enquiry!
      </h3>
      <p
        style={{
          fontSize: isMobile ? 13 : 14,
          color: "rgba(240,238,232,0.5)",
          lineHeight: 1.7,
          margin: "0 0 28px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Thank you,{" "}
        <strong style={{ color: "#F0EEE8", fontWeight: 600 }}>
          {name || "there"}
        </strong>
        . Our team will reach out within 24 hours to guide you through the next
        steps.
      </p>

      <a
        href={`https://wa.me/254738986763`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: isMobile ? "10px 20px" : "12px 24px",
          background: "rgba(37,211,102,0.08)",
          border: "0.5px solid rgba(37,211,102,0.25)",
          borderRadius: 9,
          fontSize: isMobile ? 12 : 13,
          fontWeight: 600,
          color: "#25D366",
          textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <WhatsAppIcon />
        Chat with us on WhatsApp
      </a>
    </motion.div>
  );
}

// ── Loading Spinner ──────────────────────────────────────────
function LoadingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: "2px solid rgba(8,9,26,0.3)",
        borderTop: "2px solid #08091A",
      }}
    />
  );
}

// ── WhatsApp Icon ────────────────────────────────────────────
function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

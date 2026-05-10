import { useEffect, useRef, useState } from "react";
import { Target, Users, BookOpen, Trophy, Sparkles, Star } from "lucide-react";

const REASONS = [
  {
    icon: Target,
    title: "Future-Ready Curriculum",
    description:
      "Our programs are designed with tomorrow in mind. We don't just teach skills — we prepare your child for careers that don't even exist yet. Every module is crafted alongside industry experts and updated quarterly to stay ahead of global trends.",
    highlight: "Industry-aligned learning paths",
    accent: "#3b82f6",
    gradient: "from-blue-500/20 to-blue-600/5",
  },
  {
    icon: Users,
    title: "Expert Mentors & Small Groups",
    description:
      "Every child gets the attention they deserve. Our 6:1 student-to-mentor ratio ensures personalized guidance. Our mentors are not just teachers — they're practicing professionals who bring real-world experience into every session.",
    highlight: "6:1 student-to-mentor ratio",
    accent: "#8b5cf6",
    gradient: "from-violet-500/20 to-violet-600/5",
  },
  {
    icon: BookOpen,
    title: "Learn by Doing Philosophy",
    description:
      "We believe the best learning happens through action. Forget passive lectures — our students build robots, run experiments, create art, and lead projects. 90% of class time is spent on hands-on activities and collaborative challenges.",
    highlight: "90% hands-on learning",
    accent: "#ec4899",
    gradient: "from-pink-500/20 to-pink-600/5",
  },
  {
    icon: Trophy,
    title: "Proven Track Record",
    description:
      "Our results speak for themselves. Over 5,000 alumni have gone on to win national competitions, launch startups, and secure spots at top universities. We don't just teach — we transform potential into achievement.",
    highlight: "5,000+ successful alumni",
    accent: "#f59e0b",
    gradient: "from-amber-500/20 to-amber-600/5",
  },
  {
    icon: Sparkles,
    title: "State-of-the-Art Facilities",
    description:
      "Step into our world-class innovation labs equipped with 3D printers, robotics kits, VR stations, and professional-grade creative suites. Your child learns in an environment that inspires curiosity and enables creation.",
    highlight: "Professional-grade equipment",
    accent: "#10b981",
    gradient: "from-emerald-500/20 to-emerald-600/5",
  },
  {
    icon: Star,
    title: "Holistic Development Focus",
    description:
      "We nurture the complete individual — intellectual, emotional, and social. Beyond technical skills, we build confidence, resilience, leadership, and emotional intelligence. Our graduates leave ready for life, not just exams.",
    highlight: "Mind, body & character growth",
    accent: "#06b6d4",
    gradient: "from-cyan-500/20 to-cyan-600/5",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = section.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const newProgress = total > 0 ? scrolled / total : 0;

      setProgress(newProgress);
      const newIndex = Math.min(
        REASONS.length - 1,
        Math.floor(newProgress * REASONS.length + 0.0001),
      );

      if (newIndex !== activeIndex) {
        setPreviousIndex(activeIndex);
        setActiveIndex(newIndex);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMounted, activeIndex]);

  if (!isMounted) {
    return (
      <section
        className="relative bg-background"
        style={{ height: `${REASONS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </section>
    );
  }

  const active = REASONS[activeIndex];
  const ActiveIcon = active.icon;

  // Calculate card positions for spatial depth
  const getCardStyle = (index) => {
    const diff = index - activeIndex;

    if (diff === 0) {
      // Active card - centered, full opacity
      return {
        transform: "translateX(0) scale(1)",
        opacity: 1,
        zIndex: 20,
        filter: "blur(0px)",
      };
    } else if (diff < 0) {
      // Previous cards - shifted left, faded, blurred
      const offset = diff * 60;
      return {
        transform: `translateX(${offset}px) scale(${0.85 + diff * 0.05})`,
        opacity: Math.max(0, 0.4 + diff * 0.2),
        zIndex: 10 + diff,
        filter: `blur(${Math.abs(diff) * 2}px)`,
      };
    } else {
      // Upcoming cards - waiting on the right
      return {
        transform: `translateX(${120 + diff * 40}px) scale(${0.9 - diff * 0.05})`,
        opacity: Math.max(0, 0.5 - diff * 0.15),
        zIndex: 10 - diff,
        filter: `blur(${diff * 1.5}px)`,
      };
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-background"
      style={{
        height: `${REASONS.length * 100}vh`,
      }}
      aria-label="Why choose Deluxe Talent Academy"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 30% 50%, ${active.accent}08 0%, transparent 70%)`,
          }}
        />

        <div className="h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
          {/* LEFT PANEL - Narrative Content */}
          <div className="w-full lg:w-1/2 pr-0 lg:pr-16">
            {/* Section Label */}
            <div className="overflow-hidden mb-4">
              <p
                key={`label-${activeIndex}`}
                className="text-md font-semibold tracking-widest uppercase animate-slide-up"
                style={{
                  color: active.accent,
                  fontFamily: "'Playfair Display', serif",
                  animationDelay: "50ms",
                }}
              >
                Why Choose Us
              </p>
            </div>

            {/* Title */}
            <div className="overflow-hidden mb-6">
              <h2
                key={`title-${activeIndex}`}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight animate-slide-up"
                style={{
                  animationDelay: "100ms",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {active.title}
              </h2>
            </div>

            {/* Decorative Line */}
            <div
              className="w-20 h-1 rounded-full mb-6 animate-slide-up"
              style={{
                backgroundColor: active.accent,
                animationDelay: "200ms",
              }}
            />

            {/* Description */}
            <div className="overflow-hidden mb-6">
              <p
                key={`desc-${activeIndex}`}
                className="text-base md:text-lg text-muted-foreground leading-relaxed animate-slide-up"
                style={{
                  animationDelay: "250ms",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {active.description}
              </p>
            </div>

            {/* Highlight Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border animate-scale-in"
              style={{
                borderColor: `${active.accent}30`,
                backgroundColor: `${active.accent}10`,
                color: active.accent,
                animationDelay: "350ms",
              }}
            >
              <Star className="w-4 h-4" />
              <span className="text-sm font-semibold">{active.highlight}</span>
            </div>

            {/* Counter */}
            <div className="mt-8 flex items-center gap-3">
              <span
                className="text-4xl md:text-5xl font-bold animate-number-change"
                style={{ color: active.accent }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-xl text-muted-foreground/50">/</span>
              <span className="text-xl text-muted-foreground/50">
                {String(REASONS.length).padStart(2, "0")}
              </span>
              <div className="ml-4 h-px flex-1 bg-border/50" />
            </div>
          </div>

          {/* RIGHT PANEL - Animated Card Stream */}
          <div className="hidden lg:block w-1/2 relative h-125">
            <div className="absolute inset-0 flex items-center justify-center">
              {REASONS.map((reason, index) => {
                const Icon = reason.icon;
                const style = getCardStyle(index);
                const isActive = index === activeIndex;

                return (
                  <div
                    key={index}
                    className="absolute w-85 h-105 transition-all duration-700 ease-out"
                    style={{
                      ...style,
                      transitionProperty: "transform, opacity, filter",
                      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-2xl border bg-card p-8 flex flex-col ${
                        isActive ? "shadow-2xl" : "shadow-lg"
                      }`}
                      style={{
                        borderColor: isActive
                          ? `${reason.accent}40`
                          : "var(--border)",
                      }}
                    >
                      {/* Icon */}
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                        style={{
                          backgroundColor: `${reason.accent}15`,
                          color: reason.accent,
                        }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      {/* Card Title */}
                      <h3 className="text-xl font-bold text-card-foreground mb-3">
                        {reason.title}
                      </h3>

                      {/* Card Description (truncated) */}
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {reason.description.slice(0, 150)}...
                      </p>

                      {/* Learn More */}
                      <div className="mt-4 pt-4 border-t border-border">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: reason.accent }}
                        >
                          {reason.highlight}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: Simplified horizontal indicator */}
          <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {REASONS.map((reason, index) => (
              <div
                key={index}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: index === activeIndex ? "24px" : "8px",
                  backgroundColor:
                    index === activeIndex
                      ? reason.accent
                      : `${reason.accent}40`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }

        .animate-number-change {
          animation: scaleIn 0.4s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

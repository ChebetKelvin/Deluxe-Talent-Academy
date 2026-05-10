import EnrollCTA from "../components/EnrollCta";
import Hero from "../components/Hero";
import ImpactSection from "../components/ImpactSection";
import ProgramsScroll from "../components/ProgramsScroll";
import WhyChooseUs from "../components/WhyChooseUs";

export function meta() {
  return [
    { title: "Deluxe Talents Academy" },
    {
      name: "description",
      content:
        "Empowering young learners through talent discovery, STEM innovation, leadership, robotics, sports, and experiential learning.",
    },
  ];
}

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <ProgramsScroll
        onEnroll={(programTitle) => {
          window.dispatchEvent(
            new CustomEvent("prefill-enroll", { detail: programTitle }),
          );

          const el = document.getElementById("enrol");
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top, behavior: "instant" });
          }
        }}
      />
      <WhyChooseUs />
      <ImpactSection />
      <EnrollCTA />
    </div>
  );
}

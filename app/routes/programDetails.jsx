import { useEffect, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useParams, Link, useNavigate } from "react-router";

// ── Program Images ───────────────────────────────────────────
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

// ── Program Data ─────────────────────────────────────────────
const PROGRAMS_DATA = {
  aviation: {
    id: "aviation",
    index: "01",
    category: "STEM & Innovation",
    name: "Aviation & Drone Technology",
    tagline: "Take Learning to New Heights",
    description:
      "Students explore the science of flight, aerodynamics, and navigation — then put theory into practice by piloting real drones. This program builds spatial reasoning, engineering curiosity, and a love for technology that extends far beyond the classroom. From understanding how massive aircraft stay airborne to executing precision drone maneuvers, every session is an adventure in the skies.",
    heroDescription:
      "From the physics of lift to the thrill of first flight — we take students on a journey through the skies.",
    skills: [
      { name: "Aerodynamics", icon: "✈️" },
      { name: "Navigation", icon: "🧭" },
      { name: "Drone Piloting", icon: "🎮" },
      { name: "Critical Thinking", icon: "🧠" },
    ],
    ages: "10 – 17",
    duration: "12 Weeks",
    sessions: "Weekly · 2hr sessions",
    capacity: "12 students per group",
    color: "#2B5EFF",
    colorDim: "rgba(43,94,255,0.07)",
    colorBorder: "rgba(43,94,255,0.18)",
    colorGlow: "rgba(43,94,255,0.12)",
    outcomes: [
      "Understand principles of flight and aerodynamics",
      "Pilot drones with precision and safety awareness",
      "Apply engineering thinking to real aviation challenges",
      "Explore career paths in aviation and aerospace",
    ],
    modules: [
      {
        title: "Forces of Flight",
        description:
          "Master the four forces: lift, weight, thrust, and drag through hands-on experiments with paper planes, wind tunnels, and flight simulators.",
        duration: "Weeks 1-3",
      },
      {
        title: "Drone Basics & Safety",
        description:
          "Learn drone anatomy, safety protocols, and basic maneuvering techniques. Students complete their first solo hover and basic flight patterns.",
        duration: "Weeks 4-6",
      },
      {
        title: "Advanced Piloting",
        description:
          "Execute complex flight patterns, obstacle courses, and precision landings. Master altitude control, orientation, and emergency procedures.",
        duration: "Weeks 7-9",
      },
      {
        title: "Mission Planning & Execution",
        description:
          "Design and execute real-world drone missions simulating search and rescue, package delivery, and aerial photography with a final showcase event.",
        duration: "Weeks 10-12",
      },
    ],
    testimonials: [
      {
        quote:
          "My son went from playing video games to understanding how actual aircraft work. He's now talking about becoming a pilot! The instructors made complex concepts fun and accessible.",
        name: "James O.",
        role: "Parent · Aviation Program",
        avatar: "J",
      },
      {
        quote:
          "The drone flying sessions are incredible. The instructors are patient and the curriculum is properly structured. My daughter gained so much confidence operating technology.",
        name: "Grace M.",
        role: "Parent · Aviation Program",
        avatar: "G",
      },
    ],
    faq: [
      {
        q: "Do students need prior experience?",
        a: "Not at all! We start from the basics of flight physics and progress based on each student's pace. Complete beginners are welcome and encouraged.",
      },
      {
        q: "What equipment is provided?",
        a: "We provide all drones, safety gear, flight simulators, and learning materials. Students just need to bring their curiosity and enthusiasm!",
      },
      {
        q: "Is this program safe?",
        a: "Safety is our top priority. All sessions are supervised by certified instructors with drone pilot licenses. We use beginner-friendly drones with propeller guards, and students progress to advanced equipment only after demonstrating competency.",
      },
      {
        q: "Can students take drones home?",
        a: "Drones remain at our facility for safety and maintenance. However, we provide recommendations for affordable practice drones if students want to continue learning at home.",
      },
    ],
  },

  robotics: {
    id: "robotics",
    index: "02",
    category: "STEM & Innovation",
    name: "Robotics & Coding",
    tagline: "Build the Future, Line by Line",
    description:
      "From block-based coding for beginners to real programming languages for advanced learners — students design, build, and program robots that solve real-world challenges. Every session is a hands-on engineering adventure where creativity meets technology. Students learn to think like engineers, debugging problems systematically and celebrating solutions collaboratively.",
    heroDescription:
      "Where imagination meets engineering — students build robots that think, move, and solve problems.",
    skills: [
      { name: "Programming Logic", icon: "💻" },
      { name: "Mechanical Design", icon: "⚙️" },
      { name: "Problem Solving", icon: "🔧" },
      { name: "Teamwork", icon: "🤝" },
    ],
    ages: "8 – 17",
    duration: "12 Weeks",
    sessions: "Weekly · 2hr sessions",
    capacity: "15 students per group",
    color: "#2B5EFF",
    colorDim: "rgba(43,94,255,0.07)",
    colorBorder: "rgba(43,94,255,0.18)",
    colorGlow: "rgba(43,94,255,0.12)",
    outcomes: [
      "Write functional code for robot control systems",
      "Design and assemble mechanical components",
      "Debug problems systematically using engineering methods",
      "Collaborate effectively on complex engineering challenges",
    ],
    modules: [
      {
        title: "Introduction to Robotics",
        description:
          "Understanding sensors, motors, and basic robot anatomy through hands-on assembly. Students build their first simple robot and learn component functions.",
        duration: "Weeks 1-3",
      },
      {
        title: "Block-Based Programming",
        description:
          "Learn programming logic using visual coding platforms like Scratch and MakeCode before transitioning to text-based languages like Python.",
        duration: "Weeks 4-6",
      },
      {
        title: "Advanced Mechanics",
        description:
          "Design complex mechanisms, gear systems, and structural components. Explore torque, speed ratios, and mechanical advantage through practical builds.",
        duration: "Weeks 7-9",
      },
      {
        title: "Challenge Projects",
        description:
          "Apply everything learned to solve real-world challenges — build robots that navigate mazes, sort objects by color, and respond to environmental stimuli.",
        duration: "Weeks 10-12",
      },
    ],
    testimonials: [
      {
        quote:
          "My daughter had zero interest in technology before this program. Now she's building robots and teaching me how to code! The transformation has been remarkable.",
        name: "Peter K.",
        role: "Parent · Robotics Program",
        avatar: "P",
      },
      {
        quote:
          "The progression from simple blocks to actual programming is brilliant. The kids don't even realize how much they're learning because they're having so much fun.",
        name: "Sarah W.",
        role: "Parent · Robotics Program",
        avatar: "S",
      },
    ],
    faq: [
      {
        q: "Do students need their own computers or robotics kits?",
        a: "We provide all necessary equipment including laptops, robotics kits (LEGO Mindstorms, Arduino, etc.), and software. Just bring yourself and your creativity!",
      },
      {
        q: "What experience level is needed?",
        a: "We welcome all levels — from complete beginners who've never coded to students with some programming experience. Groups are formed by age and ability to ensure appropriate challenge levels.",
      },
      {
        q: "What programming languages will they learn?",
        a: "Younger students start with block-based coding (Scratch, Blockly). Older and more advanced students progress to Python and Arduino C++. We adapt to each student's pace.",
      },
      {
        q: "Can they participate in competitions?",
        a: "Yes! We prepare interested students for national robotics competitions including the Kenya Robotics Championship. Competition training is optional and offered alongside regular sessions.",
      },
    ],
  },

  stem: {
    id: "stem",
    index: "03",
    category: "STEM & Innovation",
    name: "STEM Innovation Club",
    tagline: "Curiosity as a Curriculum",
    description:
      "An open-ended lab environment where learners experiment with science, engineering, and technology projects. Students tackle real challenges — building bridges, designing water filters, creating circuits, and exploring renewable energy. This program develops a mindset of innovation, teaching students that failure is just data and every problem has multiple solutions.",
    heroDescription:
      "A laboratory of possibilities — where curious minds experiment, build, and discover through hands-on science.",
    skills: [
      { name: "Scientific Method", icon: "🔬" },
      { name: "Engineering Design", icon: "🏗️" },
      { name: "Data Analysis", icon: "📊" },
      { name: "Innovation", icon: "💡" },
    ],
    ages: "10 – 17",
    duration: "12 Weeks",
    sessions: "Weekly · 2hr sessions",
    capacity: "15 students per group",
    color: "#2B5EFF",
    colorDim: "rgba(43,94,255,0.07)",
    colorBorder: "rgba(43,94,255,0.18)",
    colorGlow: "rgba(43,94,255,0.12)",
    outcomes: [
      "Apply the scientific method to real-world problems",
      "Design and prototype engineering solutions",
      "Collect, analyze, and present experimental data",
      "Develop innovative thinking and creative problem-solving",
    ],
    modules: [
      {
        title: "The Science of Everyday Things",
        description:
          "Explore chemistry, physics, and biology through everyday materials. Create chemical reactions, build simple machines, and understand the science behind daily phenomena.",
        duration: "Weeks 1-3",
      },
      {
        title: "Engineering Challenges",
        description:
          "Tackle structural, mechanical, and environmental engineering challenges. Build bridges, towers, water filters, and simple machines from basic materials.",
        duration: "Weeks 4-6",
      },
      {
        title: "Electronics & Circuits",
        description:
          "Dive into the world of electronics — build circuits, learn about components, and create interactive projects using microcontrollers and sensors.",
        duration: "Weeks 7-9",
      },
      {
        title: "Innovation Capstone",
        description:
          "Identify a real community problem and design a STEM solution. Students present their innovations at our end-of-term showcase to parents and guests.",
        duration: "Weeks 10-12",
      },
    ],
    testimonials: [
      {
        quote:
          "The STEM Club opened my son's eyes to how science works in the real world. He's constantly experimenting at home now — we've had to buy extra baking soda!",
        name: "Michael T.",
        role: "Parent · STEM Innovation Club",
        avatar: "M",
      },
      {
        quote:
          "I love that they're not just memorizing facts. They're learning to ask questions, test ideas, and think like real scientists. The hands-on approach is exactly what education should be.",
        name: "Linda A.",
        role: "Parent · STEM Innovation Club",
        avatar: "L",
      },
    ],
    faq: [
      {
        q: "What makes this different from school science classes?",
        a: "Unlike traditional classes, our STEM Club is entirely hands-on. Students spend 90% of time doing experiments rather than listening to lectures. We also connect concepts across disciplines — physics, chemistry, biology, and engineering all come together in projects.",
      },
      {
        q: "Are the experiments safe?",
        a: "Absolutely. All experiments are age-appropriate and supervised by trained instructors. We use safety equipment, follow strict protocols, and teach proper lab safety procedures as part of the curriculum.",
      },
      {
        q: "Do students need to bring anything?",
        a: "All materials and safety equipment are provided. Occasionally we may suggest optional items students can bring from home for specific projects, but everything essential is supplied.",
      },
      {
        q: "How are projects chosen?",
        a: "Projects follow a structured curriculum but with flexibility for student interests. If a group is particularly excited about renewable energy, we can dive deeper into that area while still meeting core learning objectives.",
      },
    ],
  },

  culinary: {
    id: "culinary",
    index: "04",
    category: "Creative Arts",
    name: "Culinary Arts",
    tagline: "Creativity You Can Taste",
    description:
      "More than cooking — this program teaches patience, precision, cultural appreciation, and entrepreneurial thinking. Students learn knife skills, recipe development, food safety, and how to present dishes with artistry. From understanding flavor profiles to plating like professionals, young chefs discover that the kitchen is both a science lab and an artist's studio.",
    heroDescription:
      "Where food becomes art and young chefs discover the joy of creating, sharing, and savoring their culinary masterpieces.",
    skills: [
      { name: "Recipe Development", icon: "📝" },
      { name: "Food Safety", icon: "🧤" },
      { name: "Presentation", icon: "🍽️" },
      { name: "Entrepreneurship", icon: "🚀" },
    ],
    ages: "8 – 17",
    duration: "12 Weeks",
    sessions: "Weekly · 2hr sessions",
    capacity: "12 students per group",
    color: "#C9A84C",
    colorDim: "rgba(201,168,76,0.07)",
    colorBorder: "rgba(201,168,76,0.18)",
    colorGlow: "rgba(201,168,76,0.1)",
    outcomes: [
      "Master fundamental cooking techniques and knife skills",
      "Understand nutrition, food science, and ingredient selection",
      "Create and present restaurant-quality dishes",
      "Develop entrepreneurial skills for food business ventures",
    ],
    modules: [
      {
        title: "Kitchen Foundations",
        description:
          "Learn kitchen safety, knife skills, food hygiene, and basic cooking techniques. Master foundational recipes and understand ingredient functions.",
        duration: "Weeks 1-3",
      },
      {
        title: "World Cuisines",
        description:
          "Explore culinary traditions from across the globe — Italian, Asian, African, and Middle Eastern cuisines. Understand cultural context and flavor principles.",
        duration: "Weeks 4-6",
      },
      {
        title: "Baking & Pastry Arts",
        description:
          "Dive into the science of baking — breads, pastries, and desserts. Learn precision measuring, dough handling, and decoration techniques.",
        duration: "Weeks 7-9",
      },
      {
        title: "Restaurant Experience",
        description:
          "Design a three-course menu, cost ingredients, and prepare dishes for a pop-up restaurant event where parents are the guests.",
        duration: "Weeks 10-12",
      },
    ],
    testimonials: [
      {
        quote:
          "My daughter used to be a picky eater. Now she's the one suggesting new recipes and helping in the kitchen. The program taught her so much more than cooking.",
        name: "Alice N.",
        role: "Parent · Culinary Arts",
        avatar: "A",
      },
      {
        quote:
          "The pop-up restaurant at the end was incredible. Seeing my son confidently plate dishes and explain his menu was a proud parent moment I'll never forget.",
        name: "Robert M.",
        role: "Parent · Culinary Arts",
        avatar: "R",
      },
    ],
    faq: [
      {
        q: "Is the kitchen safe for children?",
        a: "Safety is paramount. We teach proper techniques from day one, use age-appropriate tools, and maintain a 6:1 student-to-instructor ratio. All sessions are supervised by qualified culinary instructors with first aid training.",
      },
      {
        q: "What about food allergies?",
        a: "We take allergies seriously. During enrollment, we collect detailed dietary information and accommodate all allergies and dietary restrictions. We also teach students about cross-contamination and allergy awareness.",
      },
      {
        q: "Do students get to eat what they make?",
        a: "Yes! Students taste everything they create and often bring home portions to share with family. We believe eating together builds community and appreciation for the craft.",
      },
      {
        q: "Are ingredients provided?",
        a: "All ingredients, equipment, and materials are provided. We use fresh, quality ingredients and teach students about sourcing and seasonality as part of the curriculum.",
      },
    ],
  },

  arts: {
    id: "arts",
    index: "05",
    category: "Creative Arts",
    name: "Visual Media & Creative Arts",
    tagline: "See the World. Shape It.",
    description:
      "Photography, videography, digital illustration, and graphic design — all taught through real project briefs. Students build a creative portfolio while developing an eye for composition, storytelling, and visual communication. From learning camera fundamentals to editing like professionals, this program transforms consumers of media into confident creators.",
    heroDescription:
      "Through lenses, screens, and canvases — young artists discover their unique voice and learn to tell stories that matter.",
    skills: [
      { name: "Photography", icon: "📷" },
      { name: "Video Editing", icon: "🎬" },
      { name: "Digital Illustration", icon: "🎨" },
      { name: "Storytelling", icon: "📖" },
    ],
    ages: "8 – 17",
    duration: "12 Weeks",
    sessions: "Weekly · 2hr sessions",
    capacity: "15 students per group",
    color: "#C9A84C",
    colorDim: "rgba(201,168,76,0.07)",
    colorBorder: "rgba(201,168,76,0.18)",
    colorGlow: "rgba(201,168,76,0.1)",
    outcomes: [
      "Master camera fundamentals and composition techniques",
      "Edit photos and videos using professional software",
      "Create original digital illustrations and designs",
      "Build a professional portfolio of creative work",
    ],
    modules: [
      {
        title: "Visual Foundations",
        description:
          "Learn composition, color theory, lighting, and visual storytelling principles. Practice with both digital and traditional media.",
        duration: "Weeks 1-3",
      },
      {
        title: "Photography & Post-Processing",
        description:
          "Master camera settings, shooting techniques, and photo editing. Complete themed photo essays and learn professional retouching.",
        duration: "Weeks 4-6",
      },
      {
        title: "Video Production",
        description:
          "Script, shoot, and edit short films. Learn cinematography basics, sound design, and editing workflows using industry-standard tools.",
        duration: "Weeks 7-9",
      },
      {
        title: "Portfolio & Exhibition",
        description:
          "Curate best work into a professional portfolio. Plan and execute a gallery-style exhibition showcasing photography, video, and digital art.",
        duration: "Weeks 10-12",
      },
    ],
    testimonials: [
      {
        quote:
          "My shy daughter found her voice through photography. She now sees the world differently and has a portfolio she's genuinely proud of. The exhibition was beautiful.",
        name: "Catherine W.",
        role: "Parent · Visual Media & Creative Arts",
        avatar: "C",
      },
      {
        quote:
          "The quality of work these kids produce is astonishing. My son went from taking selfies to composing stunning landscape photographs. The instructors really know how to nurture talent.",
        name: "David L.",
        role: "Parent · Visual Media & Creative Arts",
        avatar: "D",
      },
    ],
    faq: [
      {
        q: "Do students need their own cameras?",
        a: "We provide all equipment including DSLR cameras, lighting, and editing workstations. Students are welcome to bring their own devices if they prefer, but it's not required.",
      },
      {
        q: "What software do they learn?",
        a: "Students work with industry-standard tools including Adobe Photoshop, Lightroom, Premiere Pro, and Procreate for digital illustration. We teach fundamentals that transfer across platforms.",
      },
      {
        q: "Is this program suitable for beginners?",
        a: "Absolutely! We start with basic concepts and build progressively. Whether your child has never held a camera or already makes YouTube videos, they'll find appropriate challenges.",
      },
      {
        q: "Can they keep their work?",
        a: "Yes! All photos, videos, and digital art files belong to the students. We provide cloud storage and help them build digital portfolios they can use for school applications or personal projects.",
      },
    ],
  },

  speaking: {
    id: "speaking",
    index: "06",
    category: "Leadership & Life Skills",
    name: "Public Speaking & Leadership",
    tagline: "Find Your Voice. Lead the Room.",
    description:
      "A transformative program that turns quiet learners into confident communicators. Through debates, presentations, and leadership exercises, students build the ability to speak with clarity, persuade with purpose, and lead with empathy. This isn't just about public speaking — it's about discovering the leader within and having the courage to share ideas that matter.",
    heroDescription:
      "From whispered ideas to commanding presence — we help young voices grow into confident, compelling communicators.",
    skills: [
      { name: "Debate", icon: "🗣️" },
      { name: "Persuasion", icon: "💪" },
      { name: "Presentation", icon: "🎤" },
      { name: "Emotional Intelligence", icon: "❤️" },
    ],
    ages: "10 – 17",
    duration: "12 Weeks",
    sessions: "Weekly · 2hr sessions",
    capacity: "15 students per group",
    color: "#1D9E75",
    colorDim: "rgba(29,158,117,0.07)",
    colorBorder: "rgba(29,158,117,0.18)",
    colorGlow: "rgba(29,158,117,0.1)",
    outcomes: [
      "Deliver compelling speeches with confidence and clarity",
      "Construct and defend persuasive arguments",
      "Lead group discussions and facilitate conversations",
      "Develop emotional intelligence and empathetic leadership",
    ],
    modules: [
      {
        title: "Finding Your Voice",
        description:
          "Overcome speaking anxiety through breathing techniques, vocal exercises, and supportive practice. Build foundational confidence in a safe environment.",
        duration: "Weeks 1-3",
      },
      {
        title: "The Art of Persuasion",
        description:
          "Learn classical rhetoric, argument structure, and persuasive techniques. Practice through structured debates on age-appropriate topics.",
        duration: "Weeks 4-6",
      },
      {
        title: "Presentation Mastery",
        description:
          "Master body language, slide design, storytelling, and audience engagement. Prepare and deliver presentations on topics students are passionate about.",
        duration: "Weeks 7-9",
      },
      {
        title: "Leadership in Action",
        description:
          "Apply all skills in a mock conference format. Students organize, chair sessions, deliver keynote speeches, and lead panel discussions.",
        duration: "Weeks 10-12",
      },
    ],
    testimonials: [
      {
        quote:
          "My son used to hide at the back of class. After this program, he volunteered to give a speech at a family wedding. The change is unbelievable — he walks with confidence now.",
        name: "Elizabeth K.",
        role: "Parent · Public Speaking & Leadership",
        avatar: "E",
      },
      {
        quote:
          "The debate sessions transformed how my daughter thinks. She's more articulate, logical, and confident in expressing her opinions. This program should be mandatory for every child.",
        name: "Thomas N.",
        role: "Parent · Public Speaking & Leadership",
        avatar: "T",
      },
    ],
    faq: [
      {
        q: "My child is very shy. Will this program work for them?",
        a: "This program is specifically designed for shy students! We create a supportive, pressure-free environment where students progress at their own pace. Many of our biggest success stories started with students who wouldn't say a word in their first session.",
      },
      {
        q: "How do you handle nervousness?",
        a: "We teach proven anxiety management techniques including breathing exercises, visualization, and gradual exposure. Students practice first in pairs, then small groups, before speaking to larger audiences. Confidence builds naturally.",
      },
      {
        q: "What topics do they speak about?",
        a: "Students choose topics they're passionate about — from environmental issues to technology, sports to social justice. We believe authentic passion is the foundation of compelling speaking.",
      },
      {
        q: "Will there be competitions?",
        a: "We participate in inter-school debate competitions and public speaking events for students who are interested. Participation is always optional and we ensure students feel ready before competing.",
      },
    ],
  },

  chess: {
    id: "chess",
    index: "07",
    category: "Leadership & Life Skills",
    name: "Chess & Strategic Thinking",
    tagline: "Every Move Tells a Story",
    description:
      "Chess is the ultimate mental gym. Students develop patience, forward-thinking, and strategic planning — skills that transfer directly into academics, business, and life decisions. From learning basic moves to executing complex strategies, all levels are welcome. Beyond the board, students learn that every decision has consequences and that losing is just an opportunity to learn.",
    heroDescription:
      "Sixty-four squares, infinite possibilities — where young minds learn to think ahead, adapt, and conquer challenges one move at a time.",
    skills: [
      { name: "Strategic Thinking", icon: "♟️" },
      { name: "Pattern Recognition", icon: "👁️" },
      { name: "Patience", icon: "🧘" },
      { name: "Decision Making", icon: "🎯" },
    ],
    ages: "8 – 17",
    duration: "12 Weeks",
    sessions: "Weekly · 2hr sessions",
    capacity: "20 students per group",
    color: "#1D9E75",
    colorDim: "rgba(29,158,117,0.07)",
    colorBorder: "rgba(29,158,117,0.18)",
    colorGlow: "rgba(29,158,117,0.1)",
    outcomes: [
      "Master chess from basic rules to advanced strategies",
      "Develop critical thinking and analytical skills",
      "Build patience, concentration, and emotional control",
      "Compete confidently in chess tournaments",
    ],
    modules: [
      {
        title: "Board Basics",
        description:
          "Learn piece movements, basic rules, checkmate patterns, and chess notation. Build a solid foundation through guided practice games.",
        duration: "Weeks 1-3",
      },
      {
        title: "Opening Principles",
        description:
          "Study classical openings, control of the center, piece development, and king safety. Learn to start games with purpose and confidence.",
        duration: "Weeks 4-6",
      },
      {
        title: "Middle Game Tactics",
        description:
          "Master tactical patterns — forks, pins, skewers, discovered attacks. Study famous games and learn to spot opportunities and threats.",
        duration: "Weeks 7-9",
      },
      {
        title: "Endgame & Tournament Play",
        description:
          "Learn endgame techniques and participate in a structured tournament. Analyze games, learn from mistakes, and celebrate strategic growth.",
        duration: "Weeks 10-12",
      },
    ],
    testimonials: [
      {
        quote:
          "Chess taught my son patience and strategic thinking. His teachers have noticed improved concentration in class, and he handles losing with grace now.",
        name: "George O.",
        role: "Parent · Chess & Strategic Thinking",
        avatar: "G",
      },
      {
        quote:
          "I was skeptical that chess could help with academics, but my daughter's math scores improved significantly. The logical thinking transfers directly to problem-solving.",
        name: "Mary A.",
        role: "Parent · Chess & Strategic Thinking",
        avatar: "M",
      },
    ],
    faq: [
      {
        q: "Does my child need to know how to play chess already?",
        a: "Not at all! We have groups for complete beginners, intermediate players, and advanced competitors. Everyone starts at their level and progresses from there.",
      },
      {
        q: "How does chess help with school performance?",
        a: "Research shows chess improves concentration, pattern recognition, logical reasoning, and memory — all of which directly benefit academic performance, particularly in mathematics and reading comprehension.",
      },
      {
        q: "Are there opportunities to compete?",
        a: "Yes! We participate in local and national chess tournaments for interested students. We also host internal tournaments and friendly matches with other schools and clubs.",
      },
    ],
  },

  football: {
    id: "football",
    index: "08",
    category: "Sports & Discipline",
    name: "Football & Sports Development",
    tagline: "More Than a Game",
    description:
      "Structured football training focused on both athletic development and character building. Coaches teach technical skills alongside teamwork, resilience, sportsmanship, and the mental strength to compete and bounce back from setbacks. This isn't about creating professional players — it's about using sport as a vehicle for personal growth, discipline, and lifelong healthy habits.",
    heroDescription:
      "Beyond the pitch — where young athletes discover teamwork, resilience, and the discipline that shapes champions in sport and in life.",
    skills: [
      { name: "Technical Skills", icon: "⚽" },
      { name: "Team Dynamics", icon: "🤝" },
      { name: "Resilience", icon: "💪" },
      { name: "Sportsmanship", icon: "🏆" },
    ],
    ages: "8 – 17",
    duration: "12 Weeks",
    sessions: "Weekly · 2hr sessions",
    capacity: "20 students per group",
    color: "#D85A30",
    colorDim: "rgba(216,90,48,0.07)",
    colorBorder: "rgba(216,90,48,0.18)",
    colorGlow: "rgba(216,90,48,0.1)",
    outcomes: [
      "Develop advanced football techniques and game understanding",
      "Build physical fitness, coordination, and agility",
      "Cultivate teamwork, communication, and leadership skills",
      "Learn to handle winning and losing with character",
    ],
    modules: [
      {
        title: "Fundamentals & Fitness",
        description:
          "Master ball control, passing, dribbling, and shooting. Build core fitness through age-appropriate conditioning exercises and drills.",
        duration: "Weeks 1-3",
      },
      {
        title: "Tactical Awareness",
        description:
          "Understand formations, positioning, and game strategy. Learn to read the game and make intelligent decisions under pressure.",
        duration: "Weeks 4-6",
      },
      {
        title: "Team Play & Communication",
        description:
          "Develop passing combinations, set pieces, and team coordination. Learn to communicate effectively on and off the pitch.",
        duration: "Weeks 7-9",
      },
      {
        title: "Tournament & Leadership",
        description:
          "Participate in a structured tournament. Students take on leadership roles — captaining teams, organizing warm-ups, and leading team discussions.",
        duration: "Weeks 10-12",
      },
    ],
    testimonials: [
      {
        quote:
          "My son's discipline improved dramatically. The coaches emphasize respect and hard work. He's fitter, more focused in school, and has made great friends.",
        name: "Patrick M.",
        role: "Parent · Football & Sports Development",
        avatar: "P",
      },
      {
        quote:
          "This program teaches life lessons through football. My daughter learned that losing is part of growth and that teamwork matters more than individual glory.",
        name: "Susan K.",
        role: "Parent · Football & Sports Development",
        avatar: "S",
      },
    ],
    faq: [
      {
        q: "What should students wear and bring?",
        a: "Comfortable sports clothing, football boots (or sturdy trainers), shin guards, and a water bottle. We provide training bibs, balls, and all other equipment.",
      },
      {
        q: "Is this program suitable for beginners?",
        a: "Absolutely! We group students by age and ability level. Complete beginners are welcome and will learn fundamentals before progressing to more advanced skills.",
      },
      {
        q: "How do you handle competitiveness?",
        a: "We emphasize personal growth over winning. While we play competitive matches, our focus is on effort, improvement, and character development. Every player gets equal playing time.",
      },
      {
        q: "What about safety and injuries?",
        a: "All coaches are first-aid certified. We follow age-appropriate training protocols, proper warm-up and cool-down routines, and maintain safe player-to-coach ratios.",
      },
    ],
  },

  martial: {
    id: "martial",
    index: "09",
    category: "Sports & Discipline",
    name: "Martial Arts & Discipline Training",
    tagline: "Strength Starts Within",
    description:
      "Rooted in respect, focus, and self-mastery, our martial arts program teaches practical self-defence techniques while building the mental discipline that shapes a child's entire character. No aggression — only empowerment. Students learn that true strength comes from self-control, that respect is earned through humility, and that the biggest opponent they'll ever face is their own limitations.",
    heroDescription:
      "Where discipline meets self-discovery — young warriors learn that the greatest victories are won within.",
    skills: [
      { name: "Self-Defence", icon: "🛡️" },
      { name: "Focus", icon: "🎯" },
      { name: "Discipline", icon: "📋" },
      { name: "Self-Confidence", icon: "⭐" },
    ],
    ages: "8 – 17",
    duration: "12 Weeks",
    sessions: "Weekly · 2hr sessions",
    capacity: "15 students per group",
    color: "#D85A30",
    colorDim: "rgba(216,90,48,0.07)",
    colorBorder: "rgba(216,90,48,0.18)",
    colorGlow: "rgba(216,90,48,0.1)",
    outcomes: [
      "Learn practical self-defence techniques and safety awareness",
      "Develop physical fitness, flexibility, and coordination",
      "Build unshakeable self-discipline and mental focus",
      "Cultivate respect, humility, and self-confidence",
    ],
    modules: [
      {
        title: "Foundations of Discipline",
        description:
          "Learn dojo etiquette, basic stances, and fundamental movements. Understand the philosophy of martial arts — respect, control, and continuous improvement.",
        duration: "Weeks 1-3",
      },
      {
        title: "Core Techniques",
        description:
          "Master basic strikes, blocks, and defensive movements. Practice partner drills with emphasis on control and safety.",
        duration: "Weeks 4-6",
      },
      {
        title: "Combinations & Application",
        description:
          "Combine techniques into fluid sequences. Learn to apply defensive skills in controlled scenarios. Develop situational awareness and de-escalation skills.",
        duration: "Weeks 7-9",
      },
      {
        title: "Mind-Body Integration",
        description:
          "Advanced techniques, meditation, and belt testing preparation. Demonstrate skills, knowledge, and personal growth in a formal assessment.",
        duration: "Weeks 10-12",
      },
    ],
    testimonials: [
      {
        quote:
          "My son was being bullied at school. This program didn't just teach him self-defence — it gave him the confidence to stand tall and the wisdom to avoid fights altogether.",
        name: "Margaret W.",
        role: "Parent · Martial Arts & Discipline",
        avatar: "M",
      },
      {
        quote:
          "The discipline transfers to everything. My daughter's room is tidy, her homework is done without reminders, and she carries herself with a quiet confidence that's beautiful to see.",
        name: "John K.",
        role: "Parent · Martial Arts & Discipline",
        avatar: "J",
      },
    ],
    faq: [
      {
        q: "Is this program aggressive or violent?",
        a: "Not at all. We emphasize that martial arts is about self-control, not aggression. Students learn that physical techniques are for self-defence only and that the best fight is the one avoided. Respect and discipline are core values.",
      },
      {
        q: "What style of martial arts is taught?",
        a: "We teach a blended curriculum drawing from karate, taekwondo, and judo fundamentals. This gives students a well-rounded foundation in striking, blocking, and grappling techniques appropriate for self-defence.",
      },
      {
        q: "Will my child get hurt?",
        a: "Safety is our highest priority. All techniques are practiced in controlled environments with protective equipment. Contact is light and supervised. Students progress to more advanced techniques only when they've demonstrated control and maturity.",
      },
      {
        q: "Is there a belt system?",
        a: "Yes! Students can progress through belt ranks based on skill, knowledge, and character development. Belt testing is optional and focuses on personal growth rather than competition with others.",
      },
    ],
  },
};

// Default program data if specific program not found
const getDefaultProgram = (id) => ({
  id: id,
  index: "00",
  category: "Program",
  name: "Program Details",
  tagline: "Discover Your Potential",
  description: "Program information coming soon.",
  heroDescription: "An exciting learning journey awaits.",
  skills: [],
  ages: "8 – 17",
  duration: "12 Weeks",
  sessions: "Weekly sessions",
  capacity: "Limited capacity",
  color: "#2B5EFF",
  colorDim: "rgba(43,94,255,0.07)",
  colorBorder: "rgba(43,94,255,0.18)",
  colorGlow: "rgba(43,94,255,0.12)",
  outcomes: [],
  modules: [],
  testimonials: [],
  faq: [],
});

// ── Floating Orbs ────────────────────────────────────────────
function AmbientOrb({ style, color }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(80px)",
        pointerEvents: "none",
        background: color,
        ...style,
      }}
    />
  );
}

// ── Main Component ───────────────────────────────────────────
export default function ProgramDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const program = PROGRAMS_DATA[id] || getDefaultProgram(id);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.scrollTo(0, 0);
    return () => window.removeEventListener("resize", checkMobile);
  }, [id]);

  // ── Adjusted Parallax scroll effects ──────────────────────
  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Hero effects - subtle and elegant
  const heroImageScale = useTransform(heroScrollY, [0, 1], [1, 1.1]); // Reduced zoom
  const heroOpacity = useTransform(heroScrollY, [0, 1], [1, 0.85]); // Hero stays mostly visible
  const heroY = useTransform(heroScrollY, [0, 1], [0, -15]); // Subtle movement

  // Content section - appears quickly and stays fully visible
  const contentY = useTransform(heroScrollY, [0, 0.15], [20, 0]); // Quick entrance
  const contentOpacity = useTransform(heroScrollY, [0, 0.1], [1, 1]); // Always visible, just quick slide

  const smoothImageScale = useSpring(heroImageScale, {
    stiffness: 80,
    damping: 25,
  });

  const handleEnroll = () => {
    // Store in sessionStorage so EnrollCTA reads it on mount
    sessionStorage.setItem("enrollProgram", program.name);
    navigate("/");
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("prefill-enroll", { detail: program.name }),
      );
      const el = document.getElementById("enrol");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: "instant" });
      }
    }, 300);
  };

  const tabs = ["overview", "modules", "testimonials", "faq"];

  return (
    <div
      style={{
        background: "#08091A",
        minHeight: "100vh",
        color: "#F0EEE8",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Hero Section ─────────────────────────────────── */}
      <div
        ref={heroRef}
        style={{
          position: "relative",
          height: isMobile ? "60vh" : "80vh", // Reduced height for faster content reveal
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Background Image with Parallax */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            scale: smoothImageScale,
          }}
        >
          {PROGRAM_IMAGES[id] ? (
            <img
              src={PROGRAM_IMAGES[id]}
              alt={program.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.5) saturate(0.9)", // Slightly brighter
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(135deg, ${program.colorDim}, #08091A)`,
              }}
            />
          )}
        </motion.div>

        {/* Overlay gradients - less dark for better visibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, #08091A 0%, rgba(8,9,26,0.6) 40%, rgba(8,9,26,0.2) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 30% 50%, ${program.colorGlow} 0%, transparent 50%)`,
            opacity: 0.5,
          }}
        />

        {/* Ambient orbs */}
        <AmbientOrb
          color={`${program.color}10`}
          style={{
            width: 300,
            height: 300,
            top: "20%",
            right: "-5%",
          }}
        />
        <AmbientOrb
          color={`${program.color}08`}
          style={{
            width: 200,
            height: 200,
            bottom: "30%",
            left: "-3%",
          }}
        />

        {/* Grid overlay - more subtle */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.3,
          }}
        />

        {/* Hero Content */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            padding: isMobile ? "0 24px 40px" : "0 64px 64px",
            y: heroY,
            opacity: heroOpacity,
          }}
        >
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 24,
              }}
            >
              <Link
                to="/"
                style={{
                  fontSize: 12,
                  color: "rgba(240,238,232,0.7)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Home
              </Link>
              <span style={{ color: "rgba(240,238,232,0.5)" }}>/</span>
              <Link
                to="/programs"
                style={{
                  fontSize: 12,
                  color: "rgba(240,238,232,0.7)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Programs
              </Link>
              <span style={{ color: "rgba(240,238,232,0.5)" }}>/</span>
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(240,238,232,0.95)",
                  fontWeight: 600,
                }}
              >
                {program.name}
              </span>
            </motion.div>

            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 16px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
                border: "0.5px solid rgba(255,255,255,0.2)",
                marginBottom: 16,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: program.color,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: program.color,
                }}
              >
                {program.category}
              </span>
            </motion.div>

            {/* Title - more visible */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile
                  ? "clamp(32px, 8vw, 42px)"
                  : "clamp(44px, 5vw, 72px)",
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: "-2px",
                margin: "0 0 12px",
                maxWidth: 800,
                textShadow: "0 2px 20px rgba(0,0,0,0.5)", // Added text shadow for readability
              }}
            >
              {program.name}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontSize: isMobile ? 15 : 17,
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(240,238,232,0.85)", // Made more visible
                maxWidth: 600,
                lineHeight: 1.6,
                fontFamily: "'Playfair Display', serif",
                textShadow: "0 1px 10px rgba(0,0,0,0.5)", // Better readability
              }}
            >
              "{program.tagline}"
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                display: "flex",
                gap: isMobile ? 16 : 32,
                marginTop: 28,
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Ages", value: program.ages },
                { label: "Duration", value: program.duration },
                { label: "Sessions", value: program.sessions },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "rgba(240,238,232,0.7)", // More visible
                      marginBottom: 4,
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#F0EEE8",
                      fontFamily: "'Playfair Display', serif",
                      textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                    }}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Content Section ──────────────────────────────── */}
      <motion.div
        ref={contentRef}
        style={{
          y: contentY,
          opacity: contentOpacity,
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "40px 24px 80px" : "56px 64px 120px",
          position: "relative",
          zIndex: 3,
        }}
      >
        {/* Tab Navigation */}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 48,
            borderBottom: "0.5px solid rgba(255,255,255,0.08)",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "transparent",
                border: "none",
                padding: "16px 24px",
                fontSize: 13,
                fontWeight: 600,
                color: activeTab === tab ? "#F0EEE8" : "rgba(240,238,232,0.4)",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                textTransform: "capitalize",
                position: "relative",
                whiteSpace: "nowrap",
                transition: "color 0.2s",
                letterSpacing: "0.3px",
              }}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: program.color,
                    borderRadius: "2px 2px 0 0",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <OverviewTab key="overview" program={program} isMobile={isMobile} />
          )}
          {activeTab === "modules" && (
            <ModulesTab key="modules" program={program} isMobile={isMobile} />
          )}
          {activeTab === "testimonials" && (
            <TestimonialsTab
              key="testimonials"
              program={program}
              isMobile={isMobile}
            />
          )}
          {activeTab === "faq" && (
            <FAQTab key="faq" program={program} isMobile={isMobile} />
          )}
        </AnimatePresence>

        {/* ── CTA Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: 80,
            padding: isMobile ? "32px 24px" : "48px",
            background: program.colorDim,
            border: `0.5px solid ${program.colorBorder}`,
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: program.color,
              marginBottom: 12,
            }}
          >
            Ready to Get Started?
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 28 : 36,
              fontWeight: 900,
              color: "#F0EEE8",
              margin: "0 0 12px",
              letterSpacing: "-0.5px",
            }}
          >
            Join {program.name}
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(240,238,232,0.5)",
              margin: "0 auto 28px",
              maxWidth: 500,
              lineHeight: 1.7,
            }}
          >
            Spaces are limited to {program.capacity}. Start your child's journey
            today.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <motion.button
              onClick={handleEnroll}
              whileHover={{ scale: 1.04, background: program.color }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: program.color,
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "14px 32px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Enroll Now →
            </motion.button>
            <a
              href="https://wa.me/254738986763"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "transparent",
                  color: "rgba(240,238,232,0.7)",
                  border: "0.5px solid rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  padding: "14px 32px",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Ask on WhatsApp
              </motion.button>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── Overview Tab ─────────────────────────────────────────────
function OverviewTab({ program, isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 40 : 60,
        }}
      >
        {/* Left: Description */}
        <div>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 700,
              color: "#F0EEE8",
              margin: "0 0 16px",
            }}
          >
            About the Program
          </h3>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: "rgba(240,238,232,0.6)",
              marginBottom: 32,
            }}
          >
            {program.description}
          </p>

          {/* Skills Grid */}
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#F0EEE8",
              margin: "0 0 16px",
            }}
          >
            Skills Developed
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
            }}
          >
            {program.skills.map((skill) => (
              <div
                key={skill.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "0.5px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                }}
              >
                <span style={{ fontSize: 20 }}>{skill.icon}</span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "rgba(240,238,232,0.7)",
                  }}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Outcomes & Info */}
        <div>
          {/* Learning Outcomes */}
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 700,
              color: "#F0EEE8",
              margin: "0 0 16px",
            }}
          >
            What They'll Achieve
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {program.outcomes.map((outcome, index) => (
              <motion.div
                key={outcome}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: program.colorDim,
                    border: `0.5px solid ${program.colorBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                    color: program.color,
                    fontSize: 12,
                  }}
                >
                  ✓
                </div>
                <span
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "rgba(240,238,232,0.65)",
                  }}
                >
                  {outcome}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Info Card */}
          <div
            style={{
              marginTop: 40,
              padding: 24,
              background: program.colorDim,
              border: `0.5px solid ${program.colorBorder}`,
              borderRadius: 12,
            }}
          >
            <h4
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#F0EEE8",
                margin: "0 0 16px",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Program Details
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Age Range", value: program.ages },
                { label: "Duration", value: program.duration },
                { label: "Schedule", value: program.sessions },
                { label: "Group Size", value: program.capacity },
              ].map((detail) => (
                <div
                  key={detail.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{ fontSize: 13, color: "rgba(240,238,232,0.5)" }}
                  >
                    {detail.label}
                  </span>
                  <span
                    style={{ fontSize: 13, fontWeight: 600, color: "#F0EEE8" }}
                  >
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Modules Tab ──────────────────────────────────────────────
function ModulesTab({ program, isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 24,
          fontWeight: 700,
          color: "#F0EEE8",
          margin: "0 0 32px",
        }}
      >
        Learning Journey
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {program.modules.map((module, index) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "200px 1fr",
              gap: 24,
              padding: "28px 0",
              borderBottom: "0.5px solid rgba(255,255,255,0.06)",
              position: "relative",
            }}
          >
            {/* Timeline marker */}
            <div
              style={{
                position: "relative",
                paddingLeft: 32,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 4,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: program.color,
                  border: "2px solid #08091A",
                  boxShadow: `0 0 0 1px ${program.color}40`,
                }}
              />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: program.color,
                }}
              >
                Module {index + 1}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(240,238,232,0.4)",
                  marginTop: 4,
                }}
              >
                {module.duration}
              </div>
            </div>
            <div>
              <h4
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#F0EEE8",
                  margin: "0 0 8px",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {module.title}
              </h4>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: "rgba(240,238,232,0.55)",
                  margin: 0,
                }}
              >
                {module.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Testimonials Tab ─────────────────────────────────────────
function TestimonialsTab({ program, isMobile }) {
  if (!program.testimonials || program.testimonials.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          textAlign: "center",
          padding: "60px 0",
          color: "rgba(240,238,232,0.4)",
        }}
      >
        <p style={{ fontSize: 16 }}>Testimonials coming soon.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 24,
          fontWeight: 700,
          color: "#F0EEE8",
          margin: "0 0 32px",
        }}
      >
        What Parents Say
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
          gap: 20,
        }}
      >
        {program.testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            style={{
              padding: 28,
              background: "rgba(255,255,255,0.03)",
              border: "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              position: "relative",
            }}
          >
            {/* Quote mark */}
            <div
              style={{
                fontSize: 48,
                fontFamily: "'Playfair Display', serif",
                color: program.color,
                opacity: 0.2,
                lineHeight: 1,
                marginBottom: 16,
              }}
            >
              "
            </div>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: "rgba(240,238,232,0.65)",
                margin: "0 0 20px",
                fontStyle: "italic",
              }}
            >
              {testimonial.quote}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingTop: 16,
                borderTop: "0.5px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: program.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {testimonial.avatar}
              </div>
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 600, color: "#F0EEE8" }}
                >
                  {testimonial.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(240,238,232,0.4)",
                  }}
                >
                  {testimonial.role}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── FAQ Tab ──────────────────────────────────────────────────
function FAQTab({ program, isMobile }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!program.faq || program.faq.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          textAlign: "center",
          padding: "60px 0",
          color: "rgba(240,238,232,0.4)",
        }}
      >
        <p style={{ fontSize: 16 }}>FAQ coming soon.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 24,
          fontWeight: 700,
          color: "#F0EEE8",
          margin: "0 0 32px",
        }}
      >
        Frequently Asked Questions
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {program.faq.map((item, index) => (
          <div
            key={index}
            style={{
              border: "0.5px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              overflow: "hidden",
              background:
                openIndex === index ? "rgba(255,255,255,0.02)" : "transparent",
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                cursor: "pointer",
                textAlign: "left",
                color: "#F0EEE8",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {item.q}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  color: "rgba(240,238,232,0.4)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    style={{
                      padding: "0 24px 20px",
                      fontSize: 14,
                      lineHeight: 1.7,
                      color: "rgba(240,238,232,0.55)",
                      margin: 0,
                    }}
                  >
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

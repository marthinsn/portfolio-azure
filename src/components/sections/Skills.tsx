import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./About";
import {
  SiHtml5, SiCss, SiJavascript, SiFlutter, SiDart,
  SiPython, SiCplusplus, SiMysql, SiFirebase, SiFigma,
  SiCloudinary,
} from "react-icons/si";
import LottieScene from "@/components/LottieScene";
import { FloatingRings } from "@/components/FloatingGeometry";

const categories = [
  {
    name: "Web & Design",
    color: "#E4A390",
    skills: [
      { name: "HTML5",      icon: <SiHtml5 />,      level: 75 },
      { name: "CSS3",       icon: <SiCss />,        level: 70 },
      { name: "JavaScript", icon: <SiJavascript />, level: 62 },
      { name: "UI/UX (Figma)", icon: <SiFigma />,   level: 60 },
    ],
  },
  {
    name: "Mobile & Core",
    color: "#D49C68",
    skills: [
      { name: "Flutter",    icon: <SiFlutter />,    level: 72 },
      { name: "Dart",       icon: <SiDart />,       level: 70 },
      { name: "Python",     icon: <SiPython />,     level: 68 },
      { name: "C++",        icon: <SiCplusplus />,  level: 65 },
    ],
  },
  {
    name: "Data & Tools",
    color: "#8A4F55",
    skills: [
      { name: "MySQL",      icon: <SiMysql />,      level: 70 },
      { name: "Firebase",   icon: <SiFirebase />,   level: 65 },
      { name: "Cloudinary", icon: <SiCloudinary />, level: 60 },
    ],
  },
];

const skillRings = [
  { size: 360, x: "-5%",  y: "10%",  duration: 40, opacity: 0.045, border: "#E4A390", rotate: 20 },
  { size: 220, x: "88%",  y: "60%",  duration: 30, opacity: 0.06,  border: "#D49C68", rotate: -15, delay: 3 },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="skills" className="relative py-28 px-8 md:px-16 max-w-6xl mx-auto overflow-hidden">
      {/* Subtle background rings */}
      <FloatingRings rings={skillRings} />

      {/* Lottie data lines — right side, subtle */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none opacity-[0.18]">
        <LottieScene
          src="/animations/data-lines.json"
          style={{ width: "100%", height: "100%" }}
          speed={0.6}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader
          label="Expertise"
          title={
            <>
              Technical
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #E4A390, #D49C68)" }}
              >
                Skills
              </span>
            </>
          }
        />
      </motion.div>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.7, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-2xl p-7"
            data-testid={`card-skill-category-${ci}`}
          >
            <div className="flex items-center gap-2.5 mb-7">
              <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
              <h3 className="text-white font-sans font-semibold text-sm md:text-base tracking-widest uppercase">
                {cat.name}
              </h3>
            </div>

            <div className="space-y-6">
              {cat.skills.map((skill, si) => (
                <div key={skill.name} data-testid={`skill-${skill.name.toLowerCase()}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#E4A390]/60 text-lg">{skill.icon}</span>
                      <span className="text-white/80 text-sm md:text-base font-sans">{skill.name}</span>
                    </div>
                    <span className="text-[#E4A390]/50 text-xs md:text-sm font-sans">{skill.level}%</span>
                  </div>
                  <div className="h-[4px] rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${cat.color}99, ${cat.color})`,
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{
                        duration: 1,
                        delay: ci * 0.15 + si * 0.08 + 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

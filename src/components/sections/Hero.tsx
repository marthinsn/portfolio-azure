import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { Mail, Linkedin } from "lucide-react";
import LottieScene from "@/components/LottieScene";
import { FloatingRings, FloatingDots } from "@/components/FloatingGeometry";

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  },
} as const;

function MagneticButton({
  children,
  className,
  onClick,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.25,
      y: (e.clientY - rect.top - rect.height / 2) * 0.25,
    });
  };

  return (
    <motion.button
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </motion.button>
  );
}

const heroRings = [
  { size: 480, x: "55%",  y: "-15%", duration: 42, opacity: 0.05, border: "#E4A390", rotate: 10 },
  { size: 300, x: "68%",  y: "5%",   duration: 28, opacity: 0.07, border: "#D49C68", rotate: -25, delay: 2 },
  { size: 180, x: "76%",  y: "28%",  duration: 20, opacity: 0.08, border: "#8A4F55", rotate: 50, delay: 5 },
  { size: 560, x: "60%",  y: "30%",  duration: 50, opacity: 0.03, border: "#E4A390", rotate: -5, delay: 1 },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
} as const;

// ── Lightweight Blueprint Style Notes for Profile Hover ───────────
function MiniGeometricNote({ type }: { type: string }) {
  if (type === "quarter") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="3.8">
        <ellipse cx="35" cy="75" rx="14" ry="9" transform="rotate(-15 35 75)" />
        <line x1="47" y1="75" x2="47" y2="20" strokeLinecap="round" />
        <line x1="47" y1="20" x2="20" y2="20" strokeWidth="0.8" strokeDasharray="2 2" className="opacity-50" />
        <circle cx="47" cy="20" r="3" className="fill-current stroke-none" />
      </svg>
    );
  }
  if (type === "eighth") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current" strokeWidth="3.8">
        <ellipse cx="35" cy="75" rx="14" ry="9" transform="rotate(-15 35 75)" />
        <line x1="47" y1="75" x2="47" y2="20" strokeLinecap="round" />
        <path d="M 47 20 C 65 20, 75 32, 75 42" strokeLinecap="round" />
        <circle cx="65" cy="20" r="2" className="fill-current stroke-none opacity-60" />
        <line x1="47" y1="20" x2="65" y2="20" strokeWidth="0.8" strokeDasharray="1 1" className="opacity-40" />
      </svg>
    );
  }
  if (type === "double") {
    return (
      <svg viewBox="0 0 120 100" className="w-full h-full fill-none stroke-current" strokeWidth="3.8">
        <ellipse cx="30" cy="75" rx="11" ry="7" transform="rotate(-15 30 75)" />
        <line x1="39" y1="75" x2="39" y2="20" strokeLinecap="round" />
        <ellipse cx="85" cy="65" rx="11" ry="7" transform="rotate(-15 85 65)" />
        <line x1="94" y1="65" x2="94" y2="10" strokeLinecap="round" />
        <path d="M 39 20 L 94 10 L 94 17 L 39 27 Z" className="fill-current stroke-none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full fill-none stroke-current" strokeWidth="3.8">
      <path d="M 50 110 C 45 110, 42 105, 45 100 C 48 95, 50 95, 50 85 L 50 20 C 50 15, 60 10, 65 22 C 70 34, 45 45, 30 55 C 20 62, 15 75, 25 85 C 35 95, 50 90, 55 75 C 60 60, 50 45, 42 45" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="65" r="20" strokeWidth="0.8" strokeDasharray="2 2" className="opacity-40" />
    </svg>
  );
}

const hoverNotes = [
  { type: "quarter", top: "-12%", left: "-12%", size: 48, rotate: -20, delay: 0, color: "#E4A390" },
  { type: "eighth", top: "5%", right: "-12%", size: 52, rotate: 15, delay: 0.1, color: "#D49C68" },
  { type: "double", bottom: "-15%", left: "5%", size: 64, rotate: -10, delay: 0.05, color: "#E4A390" },
  { type: "clef", bottom: "12%", right: "-15%", size: 58, rotate: 25, delay: 0.15, color: "#E4A390" },
  { type: "eighth", top: "-16%", right: "18%", size: 44, rotate: -30, delay: 0.2, color: "#D49C68" },
];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-8 md:px-24 overflow-hidden"
    >
      {/* Parallax radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(138,79,85,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Premium floating rings */}
      <FloatingRings rings={heroRings} />

      {/* Subtle floating dots */}
      <FloatingDots count={6} />

      {/* Lottie pulse rings — right side, very subtle */}
      <div className="absolute right-[-8%] top-[-8%] w-[750px] h-[750px] pointer-events-none opacity-[0.18]">
        <LottieScene
          src="/animations/pulse-rings.json"
          style={{ width: "100%", height: "100%" }}
          speed={0.4}
        />
      </div>

      {/* Lottie floating particles — bottom-right */}
      <div className="absolute right-[4%] bottom-[8%] w-[400px] h-[400px] pointer-events-none opacity-[0.25]">
        <LottieScene
          src="/animations/particles.json"
          style={{ width: "100%", height: "100%" }}
          speed={0.7}
        />
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          <motion.p
            variants={fadeInUp}
            className="text-[#E4A390] text-sm md:text-base tracking-[0.45em] uppercase font-sans font-medium"
          >
            Welcome
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-center gap-8 md:gap-14">
            <div 
              className="relative shrink-0 select-none cursor-pointer"
              style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
            >
              {/* Profile Card */}
              <motion.div 
                className="w-64 h-64 md:w-[320px] md:h-[320px] rounded-[2rem] overflow-hidden border-4 border-[#E4A390]/30 glass-card relative shrink-0 hover:shadow-[0_0_35px_rgba(228,163,144,0.2)]"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateY: 10, rotateX: 5, scale: 1 }}
                animate={isProfileHovered ? {
                  rotateY: [10, -5, 5, 10],
                  rotateX: [5, -3, 3, 5],
                  scale: 1.05,
                } : {
                  rotateY: 10,
                  rotateX: 5,
                  scale: 1,
                }}
                transition={isProfileHovered ? {
                  rotateY: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                  rotateX: { repeat: Infinity, duration: 4.5, ease: "easeInOut" },
                  scale: { type: "spring", stiffness: 250, damping: 15 }
                } : {
                  type: "spring",
                  stiffness: 200,
                  damping: 18
                }}
              >
                <img 
                  src="/profile.png" 
                  alt="Marthin S. Nababan" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#28222C]/60 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Floating Music Notes around the Profile Card */}
              {hoverNotes.map((note, idx) => (
                <motion.div
                  key={idx}
                  className="absolute pointer-events-none z-20"
                  style={{
                    top: note.top,
                    left: note.left,
                    right: note.right,
                    bottom: note.bottom,
                    width: note.size,
                    height: note.size,
                    color: note.color,
                    transformStyle: "preserve-3d",
                    filter: `drop-shadow(0 8px 16px ${note.color}80) drop-shadow(0 15px 35px rgba(0,0,0,0.6))`
                  }}
                  initial={{ opacity: 0, scale: 0, z: -100, rotateX: 30, rotateY: -30, rotateZ: note.rotate }}
                  animate={isProfileHovered ? {
                    opacity: 1,
                    scale: 1.35, // Enlarged scale factor by 0.20
                    z: 60, // Project notes forward in 3D space
                    rotateX: [15, 25, 10, 15],
                    rotateY: [-20, -10, -25, -20],
                    rotateZ: [note.rotate, note.rotate + 10, note.rotate - 10, note.rotate],
                    y: [0, -10, 10, 0],
                  } : {
                    opacity: 0,
                    scale: 0,
                    z: -100,
                    rotateX: 30,
                    rotateY: -30,
                    rotateZ: note.rotate,
                    y: 0
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 14,
                    y: {
                      repeat: Infinity,
                      duration: 3 + Math.random() * 2,
                      ease: "easeInOut",
                    },
                    rotateZ: {
                      repeat: Infinity,
                      duration: 4 + Math.random() * 2,
                      ease: "easeInOut",
                    },
                    rotateX: {
                      repeat: Infinity,
                      duration: 5 + Math.random() * 2,
                      ease: "easeInOut",
                    },
                    rotateY: {
                      repeat: Infinity,
                      duration: 4.5 + Math.random() * 2,
                      ease: "easeInOut",
                    },
                    default: {
                      delay: note.delay,
                    }
                  }}
                >
                  <MiniGeometricNote type={note.type} />
                </motion.div>
              ))}
            </div>

            <div className="relative">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-9xl font-serif font-bold text-white leading-[0.9] tracking-tight heading-glow">
                Marthin S.
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #E4A390 0%, #D49C68 50%, #8A4F55 100%)",
                  }}
                >
                  Nababan
                </span>
              </h1>
            </div>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-[#E4A390]/80 text-sm md:text-base tracking-wider uppercase font-sans font-light max-w-3xl"
          >
            Telkom University Student &nbsp;·&nbsp; Web/Mobile Developer &nbsp;·&nbsp; Problem Solver
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-white/60 text-base md:text-lg font-sans font-light max-w-3xl leading-relaxed"
          >
            I build modern digital solutions that combine functionality, creativity, and user experience with a focus on web and mobile platforms.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-3">
            <MagneticButton
              data-testid="button-view-work"
              className="px-8 py-3.5 rounded-full font-sans font-medium text-sm md:text-base text-[#28222C] transition-all duration-300 hover:shadow-lg hover:shadow-[#D49C68]/20"
              style={{ background: "linear-gradient(135deg, #D49C68, #E4A390)" }}
              onClick={() =>
                document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
            </MagneticButton>

            <MagneticButton
              data-testid="button-download-cv"
              className="px-8 py-3.5 rounded-full font-sans font-medium text-sm md:text-base text-[#E4A390] border border-[#E4A390]/30 hover:border-[#E4A390]/70 hover:bg-[#E4A390]/5 transition-all duration-300"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/cv.pdf";
                link.download = "CV_Marthin_S_Nababan.pdf";
                link.click();
              }}
            >
              Download CV
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex gap-4 pt-1">
            {[
              { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/marthin-nababan-3b18a9371", label: "LinkedIn" },
              { icon: <SiWhatsapp size={20} />, href: "https://wa.me/6281260981186", label: "WhatsApp" },
              { icon: <Mail size={20} />, href: "mailto:mrthnnababan@gmail.com", label: "Email" },
            ].map(({ icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-social-${label.toLowerCase()}`}
                aria-label={label}
                className="w-11 h-11 rounded-full flex items-center justify-center glass-card text-[#E4A390]/60 hover:text-[#E4A390] hover:border-[#E4A390]/40 transition-all duration-300"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

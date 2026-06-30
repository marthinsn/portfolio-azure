import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FIRST = "Marthin".split("");
const LAST  = "Nababan".split("");

const ease = [0.22, 1, 0.36, 1] as const;

// ── Geometric Outline Musical Symbols ────────────────────────────
function GeometricNote({ type }: { type: string }) {
  if (type === "quarter") {
    return (
      <svg viewBox="-20 -20 140 140" className="w-full h-full">
        {/* Subtle coordinate grid lines in background */}
        <line x1="-10" y1="50" x2="110" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="opacity-20" />
        <line x1="50" y1="-10" x2="50" y2="110" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="opacity-20" />
        
        {/* CAD Enclosing Bounding Box */}
        <rect x="15" y="10" width="45" height="78" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" fill="none" className="opacity-30" />
        {/* Corner bracket ticks for blueprint feel */}
        <path d="M 10 10 L 15 10 L 15 15" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-50" />
        <path d="M 65 10 L 60 10 L 60 15" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-50" />
        <path d="M 10 88 L 15 88 L 15 83" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-50" />
        <path d="M 65 88 L 60 88 L 60 83" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-50" />

        {/* Major & Minor axes for note head ellipse */}
        <line x1="15" y1="80" x2="55" y2="70" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-40" />
        <line x1="30" y1="65" x2="40" y2="85" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-40" />

        {/* Note Head: Diagonal Ellipse */}
        <ellipse 
          cx="35" 
          cy="75" 
          rx="14" 
          ry="9" 
          transform="rotate(-15 35 75)" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          fill="none" 
        />
        
        {/* Stem */}
        <line 
          x1="47" 
          y1="75" 
          x2="47" 
          y2="20" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
        
        {/* Stem Dimension line (Blueprint style with small arrowheads and text) */}
        <line x1="55" y1="75" x2="55" y2="20" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
        <path d="M 53 72 L 55 75 L 57 72 M 53 23 L 55 20 L 57 23" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
        <text x="59" y="51" fill="currentColor" fontSize="6" fontFamily="monospace" className="opacity-50 font-bold select-none">H=55</text>

        {/* Angular dimension arc for -15deg tilt */}
        <path d="M 35 75 m 25 0 a 25 25 0 0 1 -1.7 -9" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" className="opacity-40" />
        <text x="63" y="73" fill="currentColor" fontSize="5" fontFamily="monospace" className="opacity-55">15°</text>

        {/* Geometric cross-hairs / technical blueprints */}
        <circle cx="47" cy="20" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="47" y1="15" x2="47" y2="25" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
        <line x1="42" y1="20" x2="52" y2="20" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />

        <circle cx="35" cy="75" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="30" y1="75" x2="40" y2="75" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
        <line x1="35" y1="70" x2="35" y2="80" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
      </svg>
    );
  }
  if (type === "eighth") {
    return (
      <svg viewBox="-20 -20 140 140" className="w-full h-full">
        {/* Subtle coordinate grid lines in background */}
        <line x1="-10" y1="50" x2="110" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="opacity-20" />
        <line x1="50" y1="-10" x2="50" y2="110" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="opacity-20" />

        {/* Enclosing CAD Workspace */}
        <rect x="15" y="10" width="65" height="78" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" fill="none" className="opacity-30" />
        {/* Corner bracket ticks */}
        <path d="M 10 10 L 15 10 L 15 15 M 85 10 L 80 10 L 80 15 M 10 88 L 15 88 L 15 83 M 85 88 L 80 88 L 80 83" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-50" />

        {/* Note Head */}
        <ellipse 
          cx="35" 
          cy="75" 
          rx="14" 
          ry="9" 
          transform="rotate(-15 35 75)" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          fill="none" 
        />
        
        {/* Stem */}
        <line 
          x1="47" 
          y1="75" 
          x2="47" 
          y2="20" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
        
        {/* Eighth Note Flag Curve */}
        <path 
          d="M 47 20 C 65 20, 75 32, 75 42 C 75 37, 65 28, 47 28" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round" 
        />
        
        {/* Vector control anchor and handle representation */}
        {/* Control point 1 (65, 20) */}
        <line x1="47" y1="20" x2="65" y2="20" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
        <rect x="63" y="18" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="1" />
        {/* Control point 2 (75, 32) */}
        <line x1="75" y1="42" x2="75" y2="32" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
        <rect x="73" y="30" width="4" height="4" fill="none" stroke="currentColor" strokeWidth="1" />

        <text x="60" y="14" fill="currentColor" fontSize="4.5" fontFamily="monospace" className="opacity-40 select-none">P1(65,20)</text>
        <text x="79" y="35" fill="currentColor" fontSize="4.5" fontFamily="monospace" className="opacity-40 select-none">P2(75,32)</text>

        {/* Compass radius marker for curvature */}
        <circle cx="47" cy="42" r="28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" className="opacity-20" />
        <line x1="47" y1="42" x2="71" y2="24" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" className="opacity-30" />
        <text x="55" y="38" fill="currentColor" fontSize="4.5" fontFamily="monospace" className="opacity-40 select-none">R=28</text>

        {/* Center Ticks */}
        <circle cx="47" cy="20" r="1.5" fill="currentColor" />
        <circle cx="35" cy="75" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (type === "double") {
    return (
      <svg viewBox="-20 -20 160 140" className="w-full h-full">
        {/* Subtle coordinate grid lines */}
        <line x1="-10" y1="50" x2="130" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="opacity-20" />
        <line x1="60" y1="-10" x2="60" y2="110" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="opacity-20" />

        {/* CAD Box */}
        <rect x="15" y="5" width="90" height="83" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" fill="none" className="opacity-30" />
        <path d="M 10 5 L 15 5 L 15 10 M 110 5 L 105 5 L 105 10 M 10 88 L 15 88 L 15 83 M 110 88 L 105 88 L 105 83" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-50" />

        {/* Left Note Head */}
        <ellipse 
          cx="30" 
          cy="75" 
          rx="11" 
          ry="7" 
          transform="rotate(-15 30 75)" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          fill="none" 
        />
        {/* Left Stem */}
        <line 
          x1="39" 
          y1="75" 
          x2="39" 
          y2="20" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />
        
        {/* Right Note Head */}
        <ellipse 
          cx="85" 
          cy="65" 
          rx="11" 
          ry="7" 
          transform="rotate(-15 85 65)" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          fill="none" 
        />
        {/* Right Stem */}
        <line 
          x1="94" 
          y1="65" 
          x2="94" 
          y2="10" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
        />

        {/* Bold geometric connector beam */}
        <path d="M 39 20 L 94 10 L 94 18 L 39 28 Z" fill="currentColor" />
        <line x1="39" y1="28" x2="94" y2="18" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-30" />

        {/* Distance marker between stems */}
        <line x1="39" y1="85" x2="94" y2="85" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
        <path d="M 42 83 L 39 85 L 42 87 M 91 83 L 94 85 L 91 87" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
        <text x="60" y="93" fill="currentColor" fontSize="5" fontFamily="monospace" className="opacity-50 font-bold text-center select-none" textAnchor="middle">ΔX=55</text>

        {/* Slanted angle of the beam */}
        <line x1="39" y1="20" x2="94" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-35" />
        <path d="M 65 20 A 25 25 0 0 1 75 14" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-35" />
        <text x="78" y="16" fill="currentColor" fontSize="4.5" fontFamily="monospace" className="opacity-45">-10.2°</text>

        {/* Center indicators */}
        <circle cx="39" cy="20" r="1.5" fill="currentColor" />
        <circle cx="94" cy="10" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  // treble/clef
  return (
    <svg viewBox="-20 -20 140 160" className="w-full h-full">
      {/* Subtle coordinate grid lines */}
      <line x1="-10" y1="60" x2="110" y2="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="opacity-20" />
      <line x1="50" y1="-10" x2="50" y2="130" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" className="opacity-20" />

      {/* CAD workspace bounds */}
      <rect x="15" y="5" width="70" height="115" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" fill="none" className="opacity-30" />
      <path d="M 10 5 L 15 5 L 15 10 M 85 5 L 80 5 L 80 10 M 10 120 L 15 120 L 15 115 M 85 120 L 80 120 L 80 115" stroke="currentColor" strokeWidth="0.5" fill="none" className="opacity-40" />

      {/* Treble Clef: Sophisticated Stylized Line Art */}
      <path 
        d="M 50 110 C 45 110, 42 105, 45 100 C 48 95, 50 95, 50 85 L 50 20 C 50 15, 60 10, 65 22 C 70 34, 45 45, 30 55 C 20 62, 15 75, 25 85 C 35 95, 50 90, 55 75 C 60 60, 50 45, 42 45 C 40 45, 38 48, 40 52 C 42 56, 48 60, 48 68 C 48 75, 42 80, 36 76 C 30 72, 32 60, 42 52 C 52 44, 70 30, 60 15 C 52 5, 45 15, 45 25" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Golden Spiral/Fibonacci-like drafting background overlay */}
      <path d="M 50 75 A 15 15 0 0 1 35 60 A 22 22 0 0 1 57 38 A 33 33 0 0 1 90 71 A 49 49 0 0 1 41 120" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-15" fill="none" />

      {/* Technical coordinate compass circles */}
      <circle cx="50" cy="65" r="30" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="opacity-25" />
      <circle cx="50" cy="65" r="15" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-20" />
      <line x1="50" y1="10" x2="50" y2="115" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="opacity-20" />

      {/* Math indicator */}
      <text x="60" y="105" fill="currentColor" fontSize="5.5" fontFamily="monospace" className="opacity-45 select-none font-bold">f(x,y)=C</text>
      <text x="60" y="113" fill="currentColor" fontSize="4.5" fontFamily="monospace" className="opacity-35 select-none">φ = 1.618</text>

      {/* Origin coordinates */}
      <circle cx="50" cy="65" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
      <text x="54" y="63" fill="currentColor" fontSize="4.5" fontFamily="monospace" className="opacity-40 select-none">(0,0)</text>
    </svg>
  );
}

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2700);
    return () => clearTimeout(t);
  }, []);

  // Generate 32 distributed nodes with randomness
  const transitionNotes = useMemo(() => {
    const types = ["quarter", "eighth", "double", "clef"];
    return Array.from({ length: 32 }).map((_, i) => ({
      id: i,
      type: types[i % types.length],
      // Even grid distribution to ensure notes fill the whole screen evenly
      x: (i % 8) * 12.5 + Math.random() * 8, 
      y: Math.floor(i / 8) * 25 + Math.random() * 15,
      size: 40 + Math.random() * 50, 
      rotate: (Math.random() - 0.5) * 60, // random tilt
      scale: 0.4 + Math.random() * 0.4,
      color: i % 3 === 0 ? "#E4A390" : i % 3 === 1 ? "#D49C68" : "#8A4F55",
      delay: (i % 8) * 0.04, // staggered trigger
    }));
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden pointer-events-auto"
          initial={{ opacity: 1, filter: "blur(0px)" }}
          // Keyframed transition: Wait a moment for notes to expand and cover the screen,
          // then blur heavily and fade out to reveal the homepage.
          exit={{ 
            opacity: [1, 1, 0],
            filter: ["blur(0px)", "blur(0px)", "blur(35px)"],
            transition: { 
              duration: 2.6, 
              times: [0, 0.85, 1],
              ease: "easeInOut" 
            } 
          }}
          style={{ background: "#1E1922" }}
        >
          {/* ── Animated mesh blobs ────────────────────────────────── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 600,
                height: 600,
                top: "-10%",
                right: "-8%",
                background:
                  "radial-gradient(circle, rgba(138,79,85,0.22) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
              animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 500,
                height: 500,
                bottom: "-12%",
                left: "-6%",
                background:
                  "radial-gradient(circle, rgba(212,156,104,0.18) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
              animate={{ x: [0, -25, 20, 0], y: [0, 25, -15, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 350,
                height: 350,
                top: "40%",
                left: "40%",
                background:
                  "radial-gradient(circle, rgba(228,163,144,0.10) 0%, transparent 70%)",
                filter: "blur(50px)",
              }}
              animate={{ x: [0, 20, -30, 0], y: [0, -30, 10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </motion.div>

          {/* ── Subtle grid overlay ──────────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(228,163,144,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(228,163,144,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* ── Center content ───────────────────────────────────────── */}
          <motion.div 
            className="relative z-10 flex flex-col items-center select-none"
            // Exit: immediately fade and shrink name/progress to clear space for the transition notes
            exit={{
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.35, ease: "easeIn" }
            }}
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55, ease }}
              className="font-sans font-medium tracking-[0.5em] uppercase text-sm md:text-base mb-10"
              style={{ color: "rgba(228,163,144,0.5)" }}
            >
              Portfolio
            </motion.p>

            {/* First name — "Marthin" */}
            <div className="flex overflow-hidden mb-1" aria-label="Marthin">
              {FIRST.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.25 + i * 0.055,
                    duration: 0.65,
                    ease,
                  }}
                  className="font-serif font-bold text-white text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight"
                  style={{
                    textShadow:
                      "0 0 60px rgba(228,163,144,0.35), 0 0 120px rgba(138,79,85,0.20)",
                    display: "inline-block",
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Last name — "Nababan" (gradient) */}
            <div className="flex overflow-hidden" aria-label="Nababan">
              {LAST.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.45 + i * 0.055,
                    duration: 0.65,
                    ease,
                  }}
                  className="font-serif font-bold text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight"
                  style={{
                    display: "inline-block",
                    backgroundImage:
                      "linear-gradient(135deg, #E4A390 0%, #D49C68 55%, #8A4F55 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25, duration: 0.7, ease }}
              className="mt-8 font-sans font-light text-base md:text-lg tracking-[0.35em] uppercase"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Web/Mobile Developer &nbsp;·&nbsp; IT Student
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="mt-10 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5, ease }}
            >
              <div
                className="relative overflow-hidden rounded-full"
                style={{
                  width: 300,
                  height: 3,
                  background: "rgba(255,255,255,0.08)",
                }}
              >
                {/* Fill */}
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #8A4F55, #D49C68, #E4A390)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.0, duration: 1.5, ease: "easeInOut" }}
                />
                {/* Glowing leading dot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full"
                  style={{
                    background: "#E4A390",
                    boxShadow: "0 0 6px 2px rgba(228,163,144,0.7)",
                    marginLeft: -2,
                  }}
                  initial={{ left: "0%" }}
                  animate={{ left: "100%" }}
                  transition={{ delay: 1.0, duration: 1.5, ease: "easeInOut" }}
                />
              </div>

              {/* Counter */}
              <ProgressCounter delay={1.0} duration={1500} />
            </motion.div>
          </motion.div>

          {/* ── Bottom brand line ────────────────────────────────────── */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ delay: 1.4, duration: 0.6, ease }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-[1px] w-12"
                style={{ background: "linear-gradient(to right, transparent, rgba(228,163,144,0.3))" }}
              />
              <span
                className="font-sans text-xs md:text-sm tracking-[0.45em] uppercase"
                style={{ color: "rgba(228,163,144,0.3)" }}
              >
                Loading
              </span>
              <div
                className="h-[1px] w-12"
                style={{ background: "linear-gradient(to left, transparent, rgba(228,163,144,0.3))" }}
              />
            </div>
          </motion.div>

          {/* ── Geometric Music Notes Transition Layer ───────────────── */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          >
            {transitionNotes.map((note) => (
              <motion.div
                key={note.id}
                className="absolute"
                style={{
                  left: `${note.x}%`,
                  top: `${note.y}%`,
                  width: note.size,
                  height: note.size,
                  color: note.color,
                  transformOrigin: "center",
                }}
                initial={{ 
                  opacity: 0, 
                  scale: 0,
                  rotate: note.rotate,
                }}
                // Exit: notes grow massively, spin, and fade as screen blurs
                exit={{
                  scale: [0, note.scale * 5.0, note.scale * 9.0],
                  opacity: [0, 0.95, 0.95, 0],
                  rotate: [note.rotate, note.rotate + 180, note.rotate + 360],
                  filter: ["blur(0px)", "blur(0px)", "blur(15px)"],
                  transition: {
                    duration: 2.6,
                    times: [0, 0.85, 1],
                    ease: [0.22, 1, 0.36, 1],
                    delay: note.delay,
                  }
                }}
              >
                <GeometricNote type={note.type} />
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProgressCounter({ delay, duration }: { delay: number; duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startMs = delay * 1000;
    let raf: number;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      setCount(Math.round(eased * 100));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    const t = setTimeout(() => { raf = requestAnimationFrame(tick); }, startMs);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [delay, duration]);

  return (
    <span
      className="font-sans text-sm md:text-base tabular-nums tracking-widest"
      style={{ color: "rgba(228,163,144,0.4)" }}
    >
      {String(count).padStart(3, "\u2007")}%
    </span>
  );
}

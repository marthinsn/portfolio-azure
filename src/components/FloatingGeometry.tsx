import { motion } from "framer-motion";

interface Ring {
  size: number;
  x: string;
  y: string;
  duration: number;
  opacity: number;
  border?: string;
  rotate?: number;
  delay?: number;
}

const defaultRings: Ring[] = [
  { size: 420, x: "62%",  y: "-8%",  duration: 38, opacity: 0.055, border: "#E4A390", rotate: 15 },
  { size: 260, x: "72%",  y: "8%",   duration: 26, opacity: 0.07,  border: "#D49C68", rotate: -20, delay: 2 },
  { size: 160, x: "78%",  y: "22%",  duration: 18, opacity: 0.09,  border: "#8A4F55", rotate: 45, delay: 4 },
  { size: 520, x: "-8%",  y: "55%",  duration: 45, opacity: 0.04,  border: "#E4A390", rotate: -10 },
  { size: 200, x: "-4%",  y: "70%",  duration: 22, opacity: 0.065, border: "#D49C68", rotate: 30, delay: 3 },
];

interface FloatingDotsProps {
  count?: number;
  className?: string;
}

const dotPositions = [
  { x: "15%", y: "25%", size: 3, dur: 8, delay: 0 },
  { x: "82%", y: "12%", size: 2, dur: 12, delay: 1.5 },
  { x: "60%", y: "78%", size: 2.5, dur: 10, delay: 3 },
  { x: "35%", y: "88%", size: 2, dur: 14, delay: 0.7 },
  { x: "91%", y: "55%", size: 3, dur: 9, delay: 2.2 },
  { x: "8%",  y: "42%", size: 2, dur: 11, delay: 4 },
  { x: "48%", y: "18%", size: 2.5, dur: 15, delay: 1 },
  { x: "73%", y: "91%", size: 2, dur: 13, delay: 5 },
];

export function FloatingDots({ count = 8, className }: FloatingDotsProps) {
  const dots = dotPositions.slice(0, count);
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className ?? ""}`}>
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: dot.size,
            height: dot.size,
            left: dot.x,
            top: dot.y,
            background: i % 2 === 0 ? "rgba(228,163,144,0.5)" : "rgba(212,156,104,0.4)",
          }}
          animate={{ y: [0, -14, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: dot.dur, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
        />
      ))}
    </div>
  );
}

interface FloatingRingsProps {
  rings?: Ring[];
  className?: string;
}

export function FloatingRings({ rings = defaultRings, className }: FloatingRingsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className ?? ""}`}>
      {rings.map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: ring.size,
            height: ring.size,
            left: ring.x,
            top: ring.y,
            border: `1px solid rgba(${ring.border === "#E4A390" ? "228,163,144" : ring.border === "#D49C68" ? "212,156,104" : "138,79,85"}, ${ring.opacity})`,
            rotate: ring.rotate ?? 0,
          }}
          animate={{ rotate: [(ring.rotate ?? 0), (ring.rotate ?? 0) + 360] }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: "linear", delay: ring.delay ?? 0 }}
        />
      ))}
    </div>
  );
}

interface NetworkNodesProps {
  className?: string;
}

const nodes = [
  { x: 120, y: 60, r: 4, delay: 0 },
  { x: 280, y: 40, r: 3, delay: 0.4 },
  { x: 200, y: 140, r: 5, delay: 0.8 },
  { x: 350, y: 100, r: 3, delay: 1.2 },
  { x: 80,  y: 170, r: 4, delay: 0.6 },
  { x: 320, y: 200, r: 3, delay: 1.6 },
];

const lines = [
  { x1: 120, y1: 60, x2: 280, y2: 40 },
  { x1: 280, y1: 40, x2: 200, y2: 140 },
  { x1: 200, y1: 140, x2: 350, y2: 100 },
  { x1: 200, y1: 140, x2: 80,  y2: 170 },
  { x1: 350, y1: 100, x2: 320, y2: 200 },
  { x1: 120, y1: 60, x2: 80,  y2: 170 },
];

export function NetworkNodes({ className }: NetworkNodesProps) {
  return (
    <div className={`pointer-events-none ${className ?? ""}`}>
      <svg width="400" height="240" viewBox="0 0 400 240" fill="none">
        {lines.map((l, i) => (
          <motion.line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(228,163,144,0.15)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={n.x} cy={n.y} r={n.r}
            fill="none"
            stroke="rgba(212,156,104,0.35)"
            strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, delay: n.delay, ease: "easeInOut" }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function FloatingGeometry({ rings, className }: FloatingRingsProps) {
  return (
    <>
      <FloatingRings rings={rings} className={className} />
      <FloatingDots className={className} />
    </>
  );
}

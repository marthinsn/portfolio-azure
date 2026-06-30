import { motion } from "framer-motion";

const blobs = [
  { color: "#8A4F55", size: 600, duration: 20, top: "10%",  left: "15%",  dx: [0, 80, -60, 0],  dy: [0, -70, 90, 0],  scale: [1, 1.2, 0.9, 1] },
  { color: "#E4A390", size: 480, duration: 17, top: "55%",  left: "70%",  dx: [0, -90, 50, 0],  dy: [0, 80, -40, 0],  scale: [1, 0.85, 1.15, 1] },
  { color: "#D49C68", size: 680, duration: 23, top: "75%",  left: "10%",  dx: [0, 100, -30, 0], dy: [0, -60, 70, 0],  scale: [1, 1.1, 0.95, 1] },
  { color: "#4A3F40", size: 440, duration: 14, top: "20%",  left: "60%",  dx: [0, -50, 80, 0],  dy: [0, 90, -50, 0],  scale: [1, 1.3, 0.85, 1] },
  { color: "#8A4F55", size: 560, duration: 25, top: "45%",  left: "35%",  dx: [0, 60, -90, 0],  dy: [0, -80, 40, 0],  scale: [1, 0.9, 1.2, 1] },
  { color: "#E4A390", size: 520, duration: 19, top: "5%",   left: "80%",  dx: [0, -70, 30, 0],  dy: [0, 100, -60, 0], scale: [1, 1.15, 0.88, 1] },
  { color: "#D49C68", size: 400, duration: 21, top: "85%",  left: "50%",  dx: [0, 90, -40, 0],  dy: [0, -90, 50, 0],  scale: [1, 0.92, 1.18, 1] },
];

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#28222C]">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            backgroundColor: blob.color,
            filter: "blur(110px)",
            opacity: 0.18,
            top: blob.top,
            left: blob.left,
          }}
          animate={{
            x: blob.dx,
            y: blob.dy,
            scale: blob.scale,
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

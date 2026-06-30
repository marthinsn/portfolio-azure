import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-[1]"
      style={{
        background: "radial-gradient(circle, rgba(228,163,144,0.10) 0%, rgba(212,156,104,0.06) 40%, transparent 70%)",
        transition: "transform 0.15s ease-out",
        willChange: "transform",
        borderRadius: "50%",
      }}
    />
  );
}

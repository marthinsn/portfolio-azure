import { useState, useEffect, useRef } from "react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";

interface LottieSceneProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
}

export default function LottieScene({ src, className, style, speed = 1 }: LottieSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [failed, setFailed] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use IntersectionObserver to lazy-mount animations only when they are close to the viewport.
    // This dramatically reduces WebGL/Canvas memory footprint, preventing Safari OOM crashes.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: "250px", // Pre-load 250px before entering viewport for a seamless visual transition
        threshold: 0.01,
      }
    );

    observer.observe(container);
    return () => {
      observer.unobserve(container);
    };
  }, []);

  useEffect(() => {
    if (!dotLottie) return;
    const onError = () => setFailed(true);
    dotLottie.addEventListener("loadError", onError);
    return () => dotLottie.removeEventListener("loadError", onError);
  }, [dotLottie]);

  if (failed) return null;

  return (
    <div ref={containerRef} className={className} style={style}>
      {isInView && (
        <DotLottieReact
          src={src}
          loop
          autoplay
          speed={speed}
          dotLottieRefCallback={setDotLottie}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}

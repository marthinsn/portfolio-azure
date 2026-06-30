import { useState, useEffect } from "react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";

interface LottieSceneProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
}

export default function LottieScene({ src, className, style, speed = 1 }: LottieSceneProps) {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!dotLottie) return;
    const onError = () => setFailed(true);
    dotLottie.addEventListener("loadError", onError);
    return () => dotLottie.removeEventListener("loadError", onError);
  }, [dotLottie]);

  if (failed) return null;

  return (
    <div className={className} style={style}>
      <DotLottieReact
        src={src}
        loop
        autoplay
        speed={speed}
        dotLottieRefCallback={setDotLottie}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

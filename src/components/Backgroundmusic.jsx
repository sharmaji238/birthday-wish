import { useEffect, useRef } from "react";

export default function BackgroundMusic({ src }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const unlock = () => {
      audioRef.current.play().catch(() => {});
    };

    // use window + once:true ensures handler runs exactly once
    window.addEventListener("pointerdown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={src}
      preload="auto"
      loop
      playsInline
      style={{ display: "none" }}
    />
  );
}

import { useEffect, useRef } from "react";

export default function BackgroundMusic({ src }) {
    const audioRef = useRef(null);

    useEffect(() => {
        const startMusic = () => {
            audioRef.current.play().catch(() => { });
            document.removeEventListener("click", startMusic);
            document.removeEventListener("touchstart", startMusic);
        };

        document.addEventListener("click", startMusic);
        document.addEventListener("touchstart", startMusic);
    }, []);

    return (
        <audio
            ref={audioRef}
            src={src}
            loop
            playsInline
            hidden
        />
    );
}

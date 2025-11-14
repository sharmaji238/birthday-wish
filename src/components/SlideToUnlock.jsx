import React, { useState, useRef } from "react";
import { Lock, Unlock } from "lucide-react";

export default function SlideToUnlock({ disabled, onUnlock, label = "Slide to Unlock 💌" }) {
    const [offset, setOffset] = useState(0);
    const [dragging, setDragging] = useState(false);
    const startX = useRef(0);

    const MAX = 260;         // total drag width
    const HALF = MAX / 2;    // 50% point
    const THRESHOLD = 200;   // unlock distance

    const begin = (x) => {
        if (disabled) return;
        startX.current = x;
        setDragging(true);
    };

    const move = (x) => {
        if (!dragging) return;

        let delta = x - startX.current;
        if (delta < 0) delta = 0;
        if (delta > MAX) delta = MAX;

        setOffset(delta);
    };

    const end = () => {
        if (offset > THRESHOLD) onUnlock?.();
        setDragging(false);
        setOffset(0);
    };

    const isHalfway = offset > HALF;

    return (
        <div className="relative w-full mt-4 select-none touch-none">
            <div className="w-full bg-pink-200/50 backdrop-blur-sm rounded-full p-1 flex items-center relative overflow-hidden">

                {/* Center Label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-pink-700 font-semibold text-sm md:text-base">
                        {label}
                    </span>
                </div>

                {/* Slider Handle */}
                <div
                    className={`
            rounded-full shadow-lg cursor-pointer flex items-center justify-center 
            text-white font-bold text-sm md:text-base 
            h-12 md:h-14 transition-colors
            ${disabled ? "bg-gray-400 cursor-not-allowed" : ""}
            ${isHalfway
                            ? "bg-gradient-to-r from-green-500 to-emerald-500"
                            : "bg-gradient-to-r from-pink-500 to-rose-500"
                        }
          `}
                    style={{
                        width: "48px",
                        transform: `translateX(${offset}px)`,
                        transition: dragging ? "none" : "0.25s ease",
                    }}

                    /* mouse */
                    onMouseDown={(e) => begin(e.clientX)}
                    onMouseMove={(e) => move(e.clientX)}
                    onMouseUp={end}
                    onMouseLeave={end}

                    /* touch */
                    onTouchStart={(e) => begin(e.touches[0].clientX)}
                    onTouchMove={(e) => move(e.touches[0].clientX)}
                    onTouchEnd={end}
                >
                    {isHalfway ? (
                        <Unlock className="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                        <Lock className="w-5 h-5 md:w-6 md:h-6" />
                    )}
                </div>
            </div>
        </div>
    );
}

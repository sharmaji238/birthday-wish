import React, { useState } from "react";
import "../assets/css/flip.css";
export default function FlipMessageCard({ FRONT_MESSAGE, BACK_MESSAGE }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div 
      className="flip-card mb-6 cursor-pointer" 
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`flip-inner ${flipped ? "flipped" : ""}`}>
        {/* FRONT SIDE */}
        <div className="flip-front bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 md:p-8 shadow-inner">
          <div className="flex items-center mb-2 pb-4">
            <h2
              className="text-3xl md:text-4xl font-bold pb-2 mb-4"
              style={{
                background: "linear-gradient(90deg, #ec4899, #ef4444, #ec4899)",
                backgroundSize: "200% auto",
                color: "transparent",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                animation: "shimmer 3s linear infinite",
              }}
            >
              Message :
            </h2>
          </div>

          <pre className="text-gray-800 whitespace-pre-wrap font-sans text-base md:text-lg leading-relaxed">
            {FRONT_MESSAGE}
          </pre>
        </div>

        {/* BACK SIDE */}
        <div className="flip-back absolute top-0 left-0 w-full h-full 
            bg-gradient-to-br from-rose-200 to-pink-500 rounded-2xl p-8 shadow-xl
            flex flex-col justify-center items-center text-center">
          
          <h2
              className="text-3xl md:text-4xl font-bold pb-2 mb-4"
              style={{
                background: "linear-gradient(90deg, #ec4899, #ef4444, #ec4899)",
                backgroundSize: "200% auto",
                color: "transparent",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                animation: "shimmer 3s linear infinite",
              }}
            >
              Wish :
            </h2>

          <p className="text-white text-lg md:text-xl font-medium leading-relaxed opacity-90 px-4">
           {BACK_MESSAGE}
          </p>

          <p className="mt-6 text-white/90 font-semibold">
            (Tap to flip back)
          </p>
        </div>
      </div>
    </div>
  );
}

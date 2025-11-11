import React from "react";

export default function AgeExplosion() {
  return (
    <div
      className="mt-12"
      style={{ animation: "explosive-zoom 1s ease-out 1.2s backwards" }}
    >
      <div
        className="inline-block bg-yellow-400 border-8 border-white rounded-full px-10 py-6 shadow-2xl"
        style={{ animation: "continuous-pulse 2s ease-in-out 2.5s infinite" }}
      >
        <p
          className="text-6xl md:text-7xl font-black text-purple-700"
          style={{ fontFamily: "'Comic Sans MS', cursive" }}
        >
          YOU TURN 26!
        </p>
      </div>
    </div>
  );
}

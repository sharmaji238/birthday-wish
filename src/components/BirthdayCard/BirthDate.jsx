import React from "react";

export default function BirthdayDate() {
  return (
    <div style={{ animation: "pop-in 0.8s ease-out 0.8s backwards" }}>
      <div className="inline-block bg-white rounded-3xl px-8 py-4 shadow-2xl">
        <p
          className="text-4xl md:text-5xl font-bold text-purple-600"
          style={{ fontFamily: "'Comic Sans MS', cursive" }}
        >
          🎂 17 November 🎂
        </p>
      </div>
    </div>
  );
}

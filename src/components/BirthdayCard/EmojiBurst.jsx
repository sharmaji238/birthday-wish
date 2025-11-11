import React from "react";

export default function EmojiBurst() {
  const emojis = ["🎉", "🎈", "🥳", "🎁", "✨"];
  return (
    <div
      className="flex justify-center gap-6 text-6xl mt-8"
      style={{ animation: "burst-in 0.6s ease-out 1.6s backwards" }}
    >
      {emojis.map((emoji, idx) => (
        <span
          key={idx}
          style={{
            animation: `bounce-crazy 1s ease-in-out ${2 + idx * 0.1}s infinite`,
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

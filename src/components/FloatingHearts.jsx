import React from 'react';
import { Heart } from 'lucide-react';

export default function FloatingHearts({ hearts, opacity = 0.3 }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-white"
          style={{
            opacity,
            left: `${heart.left}%`,
            bottom: '-50px',
            fontSize: `${heart.size}px`,
            animation: `float ${4 + Math.random() * 2}s linear forwards`,
            animationDelay: `${heart.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

import React from 'react';
import { Heart } from 'lucide-react';

export default function FloatingHearts({ hearts }) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {hearts.map((h) => (
                <Heart
                    key={h.id}
                    className="absolute text-white opacity-30"
                    style={{
                        left: `${h.left}%`,
                        bottom: '-50px',
                        fontSize: `${h.size}px`,
                        animation: `floatUp ${h.duration}s linear forwards`,
                        animationDelay: `${h.delay}s`,
                        filter: 'blur(1px)',
                    }}
                />
            ))}
        </div>
    );
}

import React from 'react';

export default function Confetti({ confetti }) {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {confetti.map((item) => (
                <div
                    key={item.id}
                    className="absolute w-3 h-3 rounded-full animate-confettiFall"
                    style={{
                        left: `${item.left}%`,
                        animationDelay: `${item.delay}s`,
                        animationDuration: `${item.duration}s`,
                        background: ['#ff69b4', '#ff1493', '#ffd700', '#ff6347', '#9370db'][Math.floor(Math.random() * 5)],
                    }}
                />
            ))}
        </div>
    );
}

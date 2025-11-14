import React, { useEffect, useState } from 'react';
import { Gift, Cake, Sparkles, Heart } from 'lucide-react';
import Confetti from './Confetti';
import './animations.css';

export default function BirthdayScreen() {
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        const items = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 0.5,
            duration: 2 + Math.random() * 2,
        }));
        setConfetti(items);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-rose-500 flex items-center justify-center p-4 relative overflow-hidden">
            <Confetti confetti={confetti} />

            <div className="text-center relative z-10 max-w-2xl mx-auto">
                <div className="flex justify-center gap-4 mb-6 animate-bounceIn">
                    <Gift className="icon-lg animate-float" />
                    <Cake className="icon-lg animate-float delay-200" />
                    <Sparkles className="icon-lg animate-float delay-500" />
                </div>

                <h1 className="title-lg animate-textReveal delay-300">
                    🎉 Happy Birthday! 🎂
                </h1>

                <p className="subtitle-lg animate-textReveal delay-700">
                    Get ready for something special...
                </p>

                <div className="flex justify-center gap-2 animate-textReveal delay-1000">
                    {[...Array(5)].map((_, i) => (
                        <Heart key={i} className="w-8 h-8 text-pink-200 fill-pink-200 animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
}

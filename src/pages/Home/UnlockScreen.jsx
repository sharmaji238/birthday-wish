import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Lock, Gift } from 'lucide-react';
import FloatingHearts from './FloatingHearts';
import './animations.css';

export default function UnlockScreen({
    passphrase,
    setPassphrase,
    error,
    handleUnlock,
    onEnter,
    qrCodeUrl,
}) {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHearts((prev) => [
                ...prev,
                {
                    id: Math.random(),
                    left: Math.random() * 100,
                    delay: Math.random() * 2,
                    size: Math.random() * 20 + 20,
                    duration: 4 + Math.random() * 2,
                },
            ].slice(-20));
        }, 600);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 flex items-center justify-center p-4 relative overflow-hidden">

            <FloatingHearts hearts={hearts} />

            <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full animate-cardPulse">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-pink-600">Special Message</h1>
                    <p className="text-gray-600 text-sm">For someone very special ❤️</p>
                </div>

                <div className="bg-pink-50 rounded-xl p-4 mb-6 animate-glow">
                    <img src={qrCodeUrl} className="w-32 h-32 mx-auto" />
                    <p className="text-xs text-gray-600 mt-2">Scan to share this moment</p>
                </div>

                <div className="flex justify-center mb-6">
                    <div className="bg-pink-100 p-4 rounded-full animate-bounceSlow">
                        <Lock className="text-pink-600 w-8 h-8" />
                    </div>
                </div>

                <label className="block text-gray-700 font-semibold mb-2">
                    Enter the secret passphrase
                </label>

                <input
                    value={passphrase}
                    onChange={(e) => setPassphrase(e.target.value)}
                    onKeyPress={onEnter}
                    placeholder="Hint: three little words..."
                    className={`w-full px-4 py-3 border-2 rounded-xl ${error ? 'border-red-500' : 'border-pink-300'
                        }`}
                />

                {error && <p className="text-red-500 text-sm mt-2">Try again 💔</p>}

                <button
                    onClick={handleUnlock}
                    className="w-full mt-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl"
                >
                    Unlock Message 💌
                </button>
            </div>
        </div>
    );
}

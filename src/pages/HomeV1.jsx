import React, { useState, useEffect } from 'react';
import { Sparkles, Lock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import jayQR from "../assets/images/greetJaya.svg"

export default function Home() {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState(false);
  const [hearts, setHearts] = useState([]);
  const SECRET_CODE = 'iloveyou';
  const navigate = useNavigate();
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`;

  // 💞 Floating hearts generator
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev,
        {
          id: Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
          size: Math.random() * 20 + 20,
          duration: 4 + Math.random() * 2, // include duration for shorthand fix
        },
      ].slice(-20));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = () => {
    if (passphrase.toLowerCase() === SECRET_CODE)
      navigate('/boom');
    else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleUnlock();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {hearts.map((heart) => (
          <Heart
            key={heart.id}
            className="absolute text-white opacity-30"
            style={{
              left: `${heart.left}%`,
              bottom: '-50px',
              fontSize: `${heart.size}px`,
              animation: `float ${heart.duration}s linear ${heart.delay}s forwards`, // ✅ fixed shorthand
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          to {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.6); }
          50% { box-shadow: 0 0 60px rgba(255, 255, 255, 1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Unlock Card */}
      <div
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative z-10"
        style={{
          animation: error ? 'shake 0.5s' : 'bounce 2s ease-in-out infinite',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="text-pink-500 animate-bounce" />
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">
              Special Message
            </h1>
            <Sparkles
              className="text-pink-500 animate-bounce"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
          <p className="text-gray-600">For someone very special ❤️</p>
        </div>

        {/* QR Code */}
        <div
          className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-6 text-center"
          style={{ animation: 'glow 2s infinite' }}
        >
          <div className="flex justify-center mb-4">
            <img
              src={jayQR}
              alt="QR Code"
              className="rounded-lg shadow-lg"
            />
          </div>
          <p className="text-sm text-gray-600">Scan to share this moment</p>
        </div>

        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="bg-gradient-to-br from-pink-100 to-rose-100 p-4 rounded-full"
            style={{ animation: 'bounce 1.5s ease-in-out infinite' }}
          >
            <Lock className="text-pink-600 w-8 h-8" />
          </div>
        </div>

        {/* Input Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Enter the secret passphrase
          </label>
          <input
            type="text"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-pink-300 focus:ring-pink-500'
              }`}
            placeholder="Hint: three little words... 💕"
          />
          {error && (
            <p className="text-red-500 text-sm mt-2 animate-pulse">
              Not quite right... try again! 💔
            </p>
          )}
        </div>

        {/* Unlock Button */}
        <button
          onClick={handleUnlock}
          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 rounded-xl hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all shadow-lg"
        >
          Unlock Message 💌
        </button>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Made with 💖 for you
          </p>
        </div>
      </div>
    </div>
  );
}

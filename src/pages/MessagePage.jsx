import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Camera, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import { ROMANTIC_MESSAGE, ROMANTIC_WISH } from '../data/romanticMessage';
import FlipMessageCard from '../components/FlipMessageCard';

export default function MessagePage() {
  const [hearts, setHearts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [...prev, {
        id: Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
        size: Math.random() * 20 + 20
      }].slice(-20));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-3 sm:p-4 relative overflow-y-auto flex justify-center">
      <FloatingHearts hearts={hearts} opacity={0.3} />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>

      <div
        className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-md w-full relative z-10 flex flex-col gap-6" style={{
          animation: 'fadeIn 1s ease-out',
          background: 'linear-gradient(135deg, #ffffff 0%, #fff5f7 100%)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.25)'
        }}
      >

        {/* Floating Decorations */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <Heart className="text-pink-500 w-10 h-10 sm:w-12 sm:h-12 fill-pink-500" style={{ animation: 'heartbeat 1s infinite' }} />
        </div>
        <div className="absolute bottom-3 left-3">
          <Heart className="text-rose-500 w-6 h-6 sm:w-8 sm:h-8 fill-rose-500" style={{ animation: 'heartbeat 1s infinite 0.3s' }} />
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
            style={{
              background: 'linear-gradient(90deg, #ec4899, #ef4444, #ec4899)',
              backgroundSize: '200% auto',
              color: 'transparent',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              animation: 'shimmer 3s linear infinite'
            }}
          >
            You Found It! 💝
          </h2>

          <div className="flex justify-center gap-1 sm:gap-2">
            <Sparkles className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5" style={{ animation: 'heartbeat 1s infinite' }} />
            <Sparkles className="text-pink-400 w-4 h-4 sm:w-5 sm:h-5" style={{ animation: 'heartbeat 1s infinite 0.3s' }} />
            <Sparkles className="text-rose-400 w-4 h-4 sm:w-5 sm:h-5" style={{ animation: 'heartbeat 1s infinite 0.6s' }} />
          </div>
        </div>

        {/* Message Card */}
        <FlipMessageCard FRONT_MESSAGE={ROMANTIC_MESSAGE} BACK_MESSAGE={ROMANTIC_WISH} />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 sm:mt-12">
          <button
            onClick={() => navigate('/love')}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform text-sm sm:text-base"
            style={{ animation: 'heartbeat 2s infinite' }}
          >
            <Heart className="w-5 h-5 fill-white" />
            How Long Will I Love You?
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('/gallery')}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform text-sm sm:text-base"
          >
            <Camera className="w-5 h-5" />
            View Memories
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform text-sm sm:text-base"
          >
            <Sparkles className="w-5 h-5" />
           Home
          </button>
        </div>

      </div>
    </div>
  );
}

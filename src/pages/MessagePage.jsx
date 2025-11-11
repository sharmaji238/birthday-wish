import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Camera, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import { ROMANTIC_MESSAGE } from '../data/romanticMessage';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4 overflow-hidden relative">
      <FloatingHearts hearts={hearts} opacity={0.3} />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.9); }
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
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full relative z-10"
        style={{ 
          animation: 'fadeIn 1s ease-out',
          background: 'linear-gradient(135deg, #ffffff 0%, #fff5f7 100%)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.3)'
        }}
      >
        {/* Decorative hearts */}
        <div className="absolute top-4 right-4">
          <Heart className="text-pink-500 w-12 h-12 fill-pink-500" style={{ animation: 'heartbeat 1s infinite' }} />
        </div>
        <div className="absolute bottom-4 left-4">
          <Heart className="text-rose-500 w-8 h-8 fill-rose-500" style={{ animation: 'heartbeat 1s infinite 0.3s' }} />
        </div>
        <div className="absolute top-1/2 left-4">
          <Sparkles className="text-yellow-400 w-6 h-6" style={{ animation: 'heartbeat 1.5s infinite 0.6s' }} />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
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
          <div className="flex justify-center gap-2">
            <Sparkles className="text-yellow-400" style={{ animation: 'heartbeat 1s infinite' }} />
            <Sparkles className="text-pink-400" style={{ animation: 'heartbeat 1s infinite 0.3s' }} />
            <Sparkles className="text-rose-400" style={{ animation: 'heartbeat 1s infinite 0.6s' }} />
          </div>
        </div>

        {/* Message */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 md:p-8 shadow-inner mb-6">
          <pre className="text-gray-800 whitespace-pre-wrap font-sans text-base md:text-lg leading-relaxed">
            {ROMANTIC_MESSAGE}
          </pre>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate('/love')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            style={{ animation: 'heartbeat 2s infinite' }}
          >
            <Heart className="w-5 h-5 fill-white" />
            How Long Will I Love You?
            <ChevronRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate('/gallery')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            <Camera className="w-5 h-5" />
            View Memories
          </button>

          <button
            onClick={() => navigate('/3d')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            <Sparkles className="w-5 h-5" />
            3D Experience
          </button>
        </div>
      </div>
    </div>
  );
}

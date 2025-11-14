import React, { useState, useEffect } from 'react';
import { Heart, ChevronRight, ChevronLeft, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import { LOVE_STEPS } from '../data/loveSteps';

export default function LoveStoryPage() {
  const [loveStep, setLoveStep] = useState(0);
  const [hearts, setHearts] = useState([]);
  const navigate = useNavigate();

  const currentStep = LOVE_STEPS[loveStep];
  const isLastStep = loveStep === LOVE_STEPS.length - 1;
  const isFirstStep = loveStep === 0;

  // Floating hearts generator
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev,
        {
          id: Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 2,
          size: Math.random() * 20 + 20
        }
      ].slice(-20));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentStep.gradient} flex items-center justify-center p-4 overflow-hidden relative transition-all duration-1000`}
    >
      <FloatingHearts hearts={hearts} opacity={0.2} />

      <style>{`
        @keyframes textReveal {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-grow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        @keyframes heartExplode {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .fade-step {
          animation: textReveal 0.7s ease-out;
        }
      `}</style>

      {/* Main Content */}
      <div
        key={loveStep}
        className="text-center max-w-3xl mx-auto relative z-10 fade-step transition-all duration-700 ease-in-out px-2"
      >
        {/* Exploding hearts for special step */}
        {currentStep.special && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <Heart
                key={i}
                className="absolute text-pink-500 opacity-60"
                style={{
                  animation: `heartExplode 2s ease-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                  fontSize: '40px'
                }}
              />
            ))}
          </div>
        )}

        {/* Step content */}
        <div className="mb-8 max-w-2xl mx-auto flex flex-col items-center justify-center">
          {/* Emoji */}
          <div
            className="text-[6rem] sm:text-[7rem] md:text-[8rem] mb-6 leading-none"
            style={{
              animation: currentStep.special
                ? 'pulse-grow 1s ease-in-out infinite, rainbow 3s linear infinite'
                : 'pulse-grow 2s ease-in-out infinite',
              textShadow: '0 0 40px rgba(255,255,255,0.8)',
              lineHeight: 1
            }}
          >
            {currentStep.emoji}
          </div>

          {/* Main text */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 ${
              currentStep.special ? 'animate-pulse' : ''
            }`}
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              letterSpacing: currentStep.special ? '0.1em' : 'normal',
              minWidth: 'min(90vw, 600px)',
              margin: '0 auto',
              lineHeight: 1.2
            }}
          >
            {currentStep.text}
          </h1>

          {/* Subtitle */}
          {currentStep.subtitle && (
            <p
              className="text-xl sm:text-2xl md:text-3xl text-white opacity-90 mt-4"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                maxWidth: 'min(90vw, 600px)',
                margin: '0 auto'
              }}
            >
              {currentStep.subtitle}
            </p>
          )}
        </div>
       {/* Navigation Buttons */}
{!isLastStep ? (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-6 w-full px-8">
    {/* Previous */}
    {loveStep > 0 && (
      <button
        onClick={() => setLoveStep(loveStep - 1)}
        className="group flex items-center justify-center gap-2 px-10 sm:px-10 py-3 sm:py-4 bg-white text-gray-800 rounded-full font-semibold sm:font-bold text-lg sm:text-xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
        style={{ animation: 'bounce 2s ease-in-out infinite' }}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rotate-180 group-hover:-translate-x-1 transition-transform" />
        Previous
      </button>
    )}

    {/* Next */}
    <button
      onClick={() => setLoveStep(loveStep + 1)}
      className="group flex items-center justify-center gap-2 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-white to-rose-50 text-gray-800 rounded-full font-semibold sm:font-bold text-lg sm:text-xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
      style={{ animation: 'bounce 2s ease-in-out infinite' }}
    >
      Next
      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
) : (
  <div className="space-y-4 mt-6">
    <div className="text-2xl sm:text-3xl text-white font-semibold mb-6 animate-pulse">
      ✨ Explore More ✨
    </div>
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center flex-wrap mt-4">
      <button
        onClick={() => navigate('/message')}
        className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-full font-bold shadow-2xl hover:scale-105 transition-transform"
      >
        Read My Message 💌
      </button>
      <button
        onClick={() => navigate('/gallery')}
        className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold shadow-2xl hover:scale-105 transition-transform"
      >
        <Camera className="w-5 h-5" />
        Our Memories
      </button>
      <button
        onClick={() => navigate('/3d')}
        className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-rose-600 to-red-600 text-white rounded-full font-bold shadow-2xl hover:scale-105 transition-transform"
      >
        <Heart className="w-5 h-5 fill-white" />
        3D Hearts
      </button>
    </div>
  </div>
)}

      </div>   
    </div>
  );
}

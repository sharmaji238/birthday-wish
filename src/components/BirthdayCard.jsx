import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BirthdayCard() {
  const [showContent, setShowContent] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(6);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  // handle countdown logic
  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);

    startCountdown();

    return () => clearInterval(intervalRef.current);
  }, []);

 

    const startCountdown = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          navigate("/message");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleToggle = () => {
    setIsPaused((prev) => {
      const newPaused = !prev;
      if (newPaused) {
        clearInterval(intervalRef.current); // pause
      } else {
        startCountdown(); // resume
      }
      return newPaused;
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 flex items-center justify-center p-8 overflow-hidden relative">
      
      {/* Countdown / Pause-Resume Button */}
      <button
        onClick={handleToggle}
        className={`absolute top-6 right-6 z-50 font-bold rounded-full px-6 py-3 shadow-2xl transition-all duration-300 cursor-pointer ${
          isPaused
            ? "bg-purple-700 text-white hover:bg-purple-600"
            : "bg-white text-purple-700 hover:bg-purple-100"
        }`}
      >
        {isPaused
          ? `Paused (${secondsLeft}s)`
          : `Next in (${secondsLeft}s)`}
      </button>

      <div className={`text-center space-y-8 relative z-10 ${showContent ? 'animate-in' : 'hidden-initial'}`}>
        {/* Happy Birthday - BOOM effect */}
        <div style={{ animation: 'boom 1.2s ease-out' }}>
          <h1 
            className="text-6xl md:text-8xl font-black text-white"
            style={{ 
              fontFamily: "'Comic Sans MS', cursive",
              textShadow: '4px 4px 0px #ff1493, 8px 8px 0px #00bfff',
              letterSpacing: '0.1em'
            }}
          >
            HAPPY BIRTHDAY
          </h1>
        </div>

        {/* Jaya - MEGA BOOM */}
        <div style={{ animation: 'mega-boom 1.5s ease-out 0.3s backwards' }}>
          <h2 
            className="text-9xl md:text-[14rem] font-black text-white"
            style={{ 
              fontFamily: "'Comic Sans MS', cursive",
              textShadow: '6px 6px 0px #ff6b6b, 12px 12px 0px #4ecdc4',
              letterSpacing: '0.08em'
            }}
          >
            JAYA
          </h2>
        </div>

        {/* 17 November - Pop in */}
        <div style={{ animation: 'pop-in 0.8s ease-out 0.8s backwards' }}>
          <div className="inline-block bg-white rounded-3xl px-8 py-4 shadow-2xl">
            <p 
              className="text-4xl md:text-5xl font-bold text-purple-600"
              style={{ 
                fontFamily: "'Comic Sans MS', cursive"
              }}
            >
              🎂 17 November 🎂
            </p>
          </div>
        </div>

        {/* You Turn 26 - Explosive zoom */}
        <div className="mt-12" style={{ animation: 'explosive-zoom 1s ease-out 1.2s backwards' }}>
          <div className="inline-block bg-yellow-400 border-8 border-white rounded-full px-10 py-6 shadow-2xl"
            style={{ animation: 'continuous-pulse 2s ease-in-out 2.5s infinite' }}>
            <p 
              className="text-6xl md:text-7xl font-black text-purple-700"
              style={{ 
                fontFamily: "'Comic Sans MS', cursive"
              }}
            >
              YOU TURN 26!
            </p>
          </div>
        </div>

        {/* Emojis - Burst in */}
        <div className="flex justify-center gap-6 text-6xl mt-8" 
          style={{ animation: 'burst-in 0.6s ease-out 1.6s backwards' }}>
          <span style={{ animation: 'bounce-crazy 1s ease-in-out 2s infinite' }}>🎉</span>
          <span style={{ animation: 'bounce-crazy 1s ease-in-out 2.1s infinite' }}>🎈</span>
          <span style={{ animation: 'bounce-crazy 1s ease-in-out 2.2s infinite' }}>🥳</span>
          <span style={{ animation: 'bounce-crazy 1s ease-in-out 2.3s infinite' }}>🎁</span>
          <span style={{ animation: 'bounce-crazy 1s ease-in-out 2.4s infinite' }}>✨</span>
        </div>
      </div>

      <style jsx>{`
        .hidden-initial {
          opacity: 0;
        }
        
        .animate-in {
          opacity: 1;
        }

        @keyframes boom {
          0% { 
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          60% { 
            transform: scale(1.3) rotate(10deg);
          }
          100% { 
            transform: scale(1) rotate(-2deg);
            opacity: 1;
          }
        }
        
        @keyframes mega-boom {
          0% { 
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) rotate(-20deg);
          }
          70% { 
            transform: scale(0.9) rotate(10deg);
          }
          100% { 
            transform: scale(1) rotate(1deg);
            opacity: 1;
          }
        }
        
        @keyframes pop-in {
          0% { 
            transform: scale(0);
            opacity: 0;
          }
          80% { 
            transform: scale(1.2);
          }
          100% { 
            transform: scale(1) rotate(-1deg);
            opacity: 1;
          }
        }
        
        @keyframes explosive-zoom {
          0% { 
            transform: scale(0) rotate(-360deg);
            opacity: 0;
          }
          60% { 
            transform: scale(1.4) rotate(20deg);
          }
          100% { 
            transform: scale(1) rotate(2deg);
            opacity: 1;
          }
        }
        
        @keyframes burst-in {
          0% { 
            transform: scale(0);
            opacity: 0;
          }
          70% { 
            transform: scale(1.3);
          }
          100% { 
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes continuous-pulse {
          0%, 100% { 
            transform: scale(1) rotate(2deg);
          }
          50% { 
            transform: scale(1.1) rotate(-2deg);
          }
        }
        
        @keyframes bounce-crazy {
          0%, 100% { 
            transform: translateY(0) rotate(0deg);
          }
          50% { 
            transform: translateY(-25px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
}
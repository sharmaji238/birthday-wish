import React from 'react';

export default function Calligraphy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-8">
      <div className="text-center space-y-12">
        {/* Happy Birthday Jaya */}
        <div className="space-y-4">
          <h1 
            className="text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-pulse"
            style={{ 
              fontFamily: "'Brush Script MT', cursive",
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Happy Birthday
          </h1>
          <h2 
            className="text-8xl md:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-rose-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent"
            style={{ 
              fontFamily: "'Brush Script MT', cursive",
              textShadow: '3px 3px 6px rgba(0,0,0,0.15)',
              letterSpacing: '0.05em'
            }}
          >
            Jaya
          </h2>
        </div>

        {/* Date */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-30 blur-xl"></div>
          <p 
            className="relative text-4xl md:text-5xl lg:text-6xl font-semibold text-purple-600"
            style={{ 
              fontFamily: "'Lucida Handwriting', cursive"
            }}
          >
            17th November
          </p>
        </div>

        {/* You Turn 26 */}
        <div className="mt-16 space-y-2">
          <div className="inline-block bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-12 py-6 shadow-lg">
            <p 
              className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent"
              style={{ 
                fontFamily: "'Brush Script MT', cursive",
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              You Turn 26
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center gap-8 mt-12">
          <span className="text-5xl animate-bounce">🎂</span>
          <span className="text-5xl animate-bounce delay-100">🎉</span>
          <span className="text-5xl animate-bounce delay-200">🎈</span>
          <span className="text-5xl animate-bounce delay-300">✨</span>
        </div>
      </div>
    </div>
  );
}
import { Sparkles, Heart, Gift, Cake } from 'lucide-react';
function BirthdaySplashScreen({confetti}) {
  return (
        <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-500 to-rose-500 flex items-center justify-center p-4 overflow-hidden relative">
                <style>{`
          @keyframes confettiFall {
            to {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
          @keyframes bounceIn {
            0% { transform: scale(0) rotate(-180deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(10deg); }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          @keyframes textReveal {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>

                {/* Confetti */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {confetti.map((item) => (
                        <div
                            key={item.id}
                            className="absolute w-3 h-3 rounded-full"
                            style={{
                                left: `${item.left}%`,
                                top: '-20px',
                                background: ['#ff69b4', '#ff1493', '#ffd700', '#ff6347', '#9370db'][Math.floor(Math.random() * 5)],
                                animation: `confettiFall ${item.duration}s linear ${item.delay}s forwards`,
                            }}
                        />
                    ))}
                </div>

                {/* Birthday Card */}
                <div className="text-center relative z-10 max-w-2xl mx-auto px-4">
                    <div
                        className="mb-8"
                        style={{ animation: 'bounceIn 1s ease-out' }}
                    >
                        <div className="flex justify-center gap-4 mb-6">
                            <Gift className="w-16 h-16 md:w-24 md:h-24 text-yellow-300" style={{ animation: 'float 2s ease-in-out infinite' }} />
                            <Cake className="w-16 h-16 md:w-24 md:h-24 text-pink-300" style={{ animation: 'float 2s ease-in-out 0.5s infinite' }} />
                            <Sparkles className="w-16 h-16 md:w-24 md:h-24 text-yellow-300" style={{ animation: 'float 2s ease-in-out 1s infinite' }} />
                        </div>
                    </div>

                    <h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
                        style={{
                            animation: 'textReveal 1s ease-out 0.5s backwards',
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                        }}
                    >
                        🎉 Happy Birthday! 🎂
                    </h1>

                    <p
                        className="text-2xl md:text-3xl lg:text-4xl text-white mb-8"
                        style={{
                            animation: 'textReveal 1s ease-out 1s backwards',
                            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}
                    >
                        Get ready for something special...
                    </p>

                    <div
                        className="flex justify-center gap-2"
                        style={{ animation: 'textReveal 1s ease-out 1.5s backwards' }}
                    >
                        {[...Array(5)].map((_, i) => (
                            <Heart
                                key={i}
                                className="w-8 h-8 text-pink-200 fill-pink-200 animate-pulse"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
  )
}

export default BirthdaySplashScreen
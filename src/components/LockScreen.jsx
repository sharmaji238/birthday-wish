import { Sparkles, Lock, Heart, Gift, Cake } from 'lucide-react';
import jayaCake from "../assets/images/jayaCake.jpg"
import SlideToUnlock from '../components/SlideToUnlock';

function LockScreen({ passphrase, setPassphrase, error, handleUnlock, handleKeyPress, hearts }) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 flex items-center justify-center p-4 lg:p-8">
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
                                animation: `floatUp ${heart.duration}s linear forwards`,
                                animationDelay: `${heart.delay}s`,
                                filter: 'blur(1px)',
                            }}
                        />
                    ))}
                </div>

                <style>{`
          @keyframes floatUp {
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
          @keyframes gentleBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>

                {/* Responsive Container */}
                <div className="w-full max-w-7xl mx-auto relative z-10">
                    <div id="inner-container" className="min-w-screen flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

                        {/* Left Side - Decorative Content (Hidden on Mobile) */}
                        <div
                            className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center space-y-6"
                            style={{ animation: 'slideInLeft 1s ease-out' }}
                        >
                            <div className="text-center">
                                <h2 className="text-6xl font-bold text-white mb-4 p-2" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                                    A Special Message
                                </h2>
                                <p className="text-2xl text-pink-100 mb-8">
                                    Waiting Just for You
                                </p>

                                <div className="relative inline-block">
                                    <div className="absolute inset-0 animate-ping">
                                        <Heart className="w-32 h-32 text-pink-300 opacity-20" />
                                    </div>
                                    <Heart className="w-32 h-32 text-pink-200 fill-pink-200 relative" style={{ animation: 'gentleBounce 2s ease-in-out infinite' }} />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-8">
                                {[...Array(9)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-16 h-16 bg-white/20 rounded-xl backdrop-blur-sm"
                                        style={{
                                            animation: `gentleBounce 2s ease-in-out infinite`,
                                            animationDelay: `${i * 0.1}s`
                                        }}
                                    >
                                        <div className="w-full h-full flex items-center justify-center">
                                            {i % 3 === 0 ? <Heart className="w-8 h-8 text-white" /> :
                                                i % 3 === 1 ? <Sparkles className="w-8 h-8 text-white" /> :
                                                    <Gift className="w-8 h-8 text-white" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Unlock Card */}
                        <div
                            className="w-full lg:w-1/2"
                            style={{ animation: 'slideInRight 1s ease-out' }}
                        >
                            <div
                                className="justify-center items-center flex flex-col bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto"
                                style={{
                                    animation: error ? 'shake 0.5s' : 'gentleBounce 3s ease-in-out infinite',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                                }}
                            >
                                {/* Header */}
                                <div className="text-center p-2 mb-6">
                                    <div className="flex justify-center items-center p-4 gap-2 mb-4">
                                        <Sparkles className="text-pink-500" style={{ animation: 'gentleBounce 1s ease-in-out infinite' }} />
                                        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600">
                                            Special Message
                                        </h1>
                                        <Sparkles
                                            className="text-pink-500"
                                            style={{ animation: 'gentleBounce 1s ease-in-out infinite', animationDelay: '0.5s' }}
                                        />
                                    </div>
                                    <p className="text-gray-600 text-sm md:text-base">❤️ For someone very special ❤️</p>
                                    <p className="text-gray-600 text-sm md:text-base">on her special Day</p>
                                </div>

                                {/* QR Code */}
                                <div
                                    className="inline-block bg-gradient-to-br from-pink-50 to-rose-50 
  rounded-2xl p-4 md:p-6 mb-6 text-center mx-auto"
                                    style={{ animation: 'glow 2s infinite' }}
                                >
                                    <div className="flex justify-center mb-4">
                                        <img
                                            src={jayaCake}
                                            alt="QR Code"
                                            className="rounded-lg shadow-lg w-48 h-50 md:w-56 md:h-56 object-fit"
                                        />
                                    </div>

                                    <p className="text-xs md:text-sm text-gray-600">Happy B'Day Jaya</p>
                                </div>



                                {/* Lock Icon */}
                                <div className="flex justify-center mb-6">
                                    <div
                                        className="bg-gradient-to-br from-pink-100 to-rose-100 p-3 md:p-4 rounded-full"
                                        style={{ animation: 'gentleBounce 1.5s ease-in-out infinite' }}
                                    >
                                        <Cake className="text-pink-600 w-10 h-10 md:w-8 md:h-8" />
                                    </div>
                                </div>

                                {/* Input Field */}
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                                        Enter the secret passphrase to access your message
                                    </label>
                                    <input
                                        type="text"
                                        value={passphrase}
                                        onChange={(e) => setPassphrase(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all text-sm md:text-base ${error
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-pink-300 focus:ring-pink-500'
                                            }`}
                                        placeholder="Hint: three little words... 💕"
                                    />
                                    {error && (
                                        <p className="text-red-500 text-xs md:text-sm mt-2 animate-pulse">
                                            Not quite right... try again! 💔
                                        </p>
                                    )}
                                </div>

                                {/* Unlock Button */}
                                {/* <button
                                    onClick={handleUnlock}
                                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-3 md:py-4 rounded-xl hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all shadow-lg text-sm md:text-base"
                                >
                                    Unlock Message 💌
                                </button> */}
                                <SlideToUnlock
                                    disabled={passphrase.trim() === ''}
                                    onUnlock={handleUnlock}
                                    label="Slide to unlock"
                                />

                                <div className="mt-4 text-center py-2">
                                    <p className="text-xs text-gray-500">
                                        Made with 💖 for you
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default LockScreen
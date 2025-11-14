import React, { useState, useEffect } from 'react';
import { Sparkles, Lock, Heart, Gift, Cake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import jayaCake from "../assets/images/jayaCake.jpg"
import greetJaya from "../assets/images/greetJaya.svg"
import SlideToUnlock from '../components/SlideToUnlock';

export default function HomeV2() {
    const [passphrase, setPassphrase] = useState('');
    const [error, setError] = useState(false);
    const [hearts, setHearts] = useState([]);
    const [showQRAnimation, setShowQRAnimation] = useState(true);
    const [showBirthday, setShowBirthday] = useState(false);
    const [showUnlock, setShowUnlock] = useState(false);
    const [confetti, setConfetti] = useState([]);

    const SECRET_CODE = 'iloveyou';
    const navigate = useNavigate();
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`;

    // Initial animation sequence
    useEffect(() => {
        // QR scan animation (2 seconds)
        setTimeout(() => {
            setShowQRAnimation(false);
            setShowBirthday(true);

            // Generate confetti
            const newConfetti = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 0.5,
                duration: 2 + Math.random() * 2
            }));
            setConfetti(newConfetti);
        }, 2500);

        // Show unlock screen (after 4.5 seconds total)
        setTimeout(() => {
            setShowBirthday(false);
            setShowUnlock(true);
        }, 5500);
    }, []);

    // Floating hearts generator
    useEffect(() => {
        if (!showUnlock) return;
        const interval = setInterval(() => {
            setHearts(prev => [
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
    }, [showUnlock]);

    const handleUnlock = () => {
        if (passphrase.toLowerCase() === SECRET_CODE) {
            navigate('boom');
        } else {
            setError(true);
            setTimeout(() => setError(false), 600);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleUnlock();
    };

    // QR Scan Animation Screen
    if (showQRAnimation) {
        return (
            <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 flex items-center justify-center p-4 overflow-hidden">
                <style>{`
          @keyframes qrScan {
            0% { transform: translateY(-200%) scaleY(0.1); opacity: 0; }
            20% { transform: translateY(-100%) scaleY(0.3); opacity: 0.3; }
            50% { transform: translateY(0%) scaleY(1); opacity: 1; }
            70% { transform: translateY(100%) scaleY(0.8); opacity: 0.8; }
            100% { transform: translateY(200%) scaleY(0.1); opacity: 0; }
          }
          @keyframes scanLine {
            0%, 100% { top: 0%; opacity: 1; }
            50% { top: 100%; opacity: 0.5; }
          }
          @keyframes qrGlow {
            0%, 100% { box-shadow: 0 0 40px rgba(255, 105, 180, 0.6); }
            50% { box-shadow: 0 0 80px rgba(255, 105, 180, 1); }
          }
          @keyframes fadeExpand {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(2); opacity: 0; }
          }
        `}</style>

                <div className="relative">
                    {/* QR Code */}
                    <div
                        className="bg-white p-8 rounded-3xl relative overflow-hidden"
                        style={{ animation: 'qrGlow 2s ease-in-out infinite' }}
                    >
                        <img
                            // src={qrCodeUrl}
                            src={greetJaya}
                            alt="QR Code"
                            className="w-50 h-50 md:w-64 md:h-64"
                        />

                        {/* Scanning Line */}
                        <div
                            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"
                            style={{ animation: 'scanLine 2s ease-in-out infinite' }}
                        />
                    </div>

                    {/* Scanning Text */}
                    <div className="text-center mt-8">
                        <p className="text-white text-2xl font-bold animate-pulse">Scanning...</p>
                        <p className="text-pink-200 mt-2">Preparing something special</p>
                    </div>

                    {/* Expanding Circles */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                            className="absolute w-48 h-48 md:w-64 md:h-64 border-4 border-pink-400 rounded-full"
                            style={{ animation: 'fadeExpand 2s ease-out infinite' }}
                        />
                        <div
                            className="absolute w-48 h-48 md:w-64 md:h-64 border-4 border-rose-400 rounded-full"
                            style={{ animation: 'fadeExpand 2s ease-out 0.5s infinite' }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Birthday Greeting Screen
    if (showBirthday) {
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
        );
    }

    // Unlock Screen (Responsive Layout)
    if (showUnlock) {
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
        );
    }

    return null;
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import jayaQR from "../images/jayaQR.svg"

import QRScanner from '../components/QRScanner';
import BirthdaySplashScreen from '../components/BirthdaySplashScreen';
import LockScreen from '../components/LockScreen';

export default function HomeV2() {
    const [passphrase, setPassphrase] = useState('');
    const [error, setError] = useState(false);
    const [hearts, setHearts] = useState([]);
    const [showQRAnimation, setShowQRAnimation] = useState(true);
    const [showBirthday, setShowBirthday] = useState(false);
    const [showUnlock, setShowUnlock] = useState(false);
    const [confetti, setConfetti] = useState([]);

    const SECRET_CODE = 'ihateyou';
    const navigate = useNavigate();
    // const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`;
    const qrCodeUrl = "/images/JayaQR.svg";

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
           <QRScanner/>
        );
    }

    // Birthday Greeting Screen
    if (showBirthday) {
        return (
        <BirthdaySplashScreen confetti={confetti} />
        );
    }

    // Unlock Screen (Responsive Layout)
    if (showUnlock) {
        return (
          <LockScreen passphrase={passphrase} setPassphrase={setPassphrase} error={error} handleUnlock={handleUnlock} handleKeyPress={handleKeyPress} hearts={hearts} />
        );
    }

    return null;
}
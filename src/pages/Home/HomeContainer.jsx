import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import QRScanScreen from './QRScanScreen';
import BirthdayScreen from './BirthdayScreen';
import UnlockScreen from './UnlockScreen';

export default function HomeV3() {
    const [passphrase, setPassphrase] = useState('');
    const [error, setError] = useState(false);
    const [showQRAnimation, setShowQRAnimation] = useState(true);
    const [showBirthday, setShowBirthday] = useState(false);
    const [showUnlock, setShowUnlock] = useState(false);

    const SECRET_CODE = 'i';
    const navigate = useNavigate();

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`;

    // Animation sequencing
    useEffect(() => {
        setTimeout(() => {
            setShowQRAnimation(false);
            setShowBirthday(true);
        }, 1000);

        setTimeout(() => {
            setShowBirthday(false);
            setShowUnlock(true);
        }, 4500);
    }, []);

    const handleUnlock = () => {
        if (passphrase.toLowerCase() === SECRET_CODE) {
            navigate('/boom');
        } else {
            setError(true);
            setTimeout(() => setError(false), 600);
        }
    };

    if (showQRAnimation) return <QRScanScreen qrCodeUrl={qrCodeUrl} />;
    if (showBirthday) return <BirthdayScreen />;
    if (showUnlock)
        return (
            <UnlockScreen
                passphrase={passphrase}
                setPassphrase={setPassphrase}
                error={error}
                handleUnlock={handleUnlock}
                onEnter={(e) => e.key === 'Enter' && handleUnlock()}
                qrCodeUrl={qrCodeUrl}
            />
        );

    return null;
}

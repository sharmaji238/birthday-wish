import React from 'react';
import './animations.css';

export default function QRScanScreen({ qrCodeUrl }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 flex items-center justify-center p-4 overflow-hidden">
            <div className="relative">
                <div className="bg-white p-8 rounded-3xl relative overflow-hidden animate-qrGlow">
                    <img src={qrCodeUrl} className="w-48 h-48 md:w-64 md:h-64" />

                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-scanLine" />
                </div>

                <div className="text-center mt-8">
                    <p className="text-white text-2xl font-bold animate-pulse">Scanning...</p>
                    <p className="text-pink-200 mt-2">Preparing something special</p>
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="circle-1 animate-fadeExpand"></div>
                    <div className="circle-2 animate-fadeExpand delay-200"></div>
                </div>
            </div>
        </div>
    );
}

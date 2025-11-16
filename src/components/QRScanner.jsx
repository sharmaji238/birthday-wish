export default function QRScanner() {
  // Replace this with your actual QR code URL
  // const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=Hello%20World";
    const qrCodeUrl = "/images/JayaQR.svg";
  return (
    <div>
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
          @keyframes zoomIn {
            0% { transform: scale(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>

        <div className="relative" style={{ animation: 'zoomIn 1s ease-out forwards' }}>
          {/* QR Code */}
          <div
            className="bg-white p-8 rounded-3xl relative overflow-hidden"
            style={{ animation: 'qrGlow 2s ease-in-out infinite' }}
          >
            <img
              src={qrCodeUrl}
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
    </div>
  );
}
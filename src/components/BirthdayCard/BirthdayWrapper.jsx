import React, { useState, useEffect } from "react";
import "../../assets/css/animations.css";

export default function BirthdayWrapper({ children }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 flex items-center justify-center p-8 overflow-hidden relative">
      <div
        className={`text-center space-y-8 relative z-10 ${
          showContent ? "animate-in" : "hidden-initial"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

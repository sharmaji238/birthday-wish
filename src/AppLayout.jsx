import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => navigate(-1);

  // Hide back button on home (optional)
  const hideBack = location.pathname === "/";

  return (
    <div className="min-h-screen relative">
      {!hideBack && (
        <button
  onClick={handleBack}
  className="absolute bottom-6 right-4 z-50
             w-12 h-12 flex items-center justify-center
             rounded-full
             bg-black/20 border border-white/20
             backdrop-blur-lg shadow-lg
             text-white text-lg font-semibold
             hover:bg-white/30 hover:shadow-xl hover:scale-110
             transition-all duration-300 ease-in-out"
>
  ←
</button>


      )}
      <Outlet />
    </div>
  );
}

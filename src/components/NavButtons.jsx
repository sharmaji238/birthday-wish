import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Camera, Sparkles, ChevronRight } from 'lucide-react';

export default function NavButtons({ showLove = true }) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 justify-center flex-wrap mt-8">
      <button
        onClick={() => navigate('/message')}
        className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
      >
        ← Back to Message
      </button>
      {showLove && (
        <button
          onClick={() => navigate('/love')}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          <Heart className="w-5 h-5 fill-white" />
          Love Story
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
      <button
        onClick={() => navigate('/gallery')}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform"
      >
        <Camera className="w-5 h-5" />
        View Memories
      </button>
      <button
        onClick={() => navigate('/3d')}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-red-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform"
      >
        <Sparkles className="w-5 h-5" />
        3D Experience
      </button>
    </div>
  );
}

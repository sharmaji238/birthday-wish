import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Camera, ArrowRight } from 'lucide-react';
import { PHOTOS } from '../data/photos';

export default function GalleryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 md:p-8 overflow-y-auto">
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(50px) rotateX(-20deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }
        @keyframes photoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12" style={{ animation: 'slideIn 0.6s ease-out' }}>
          <h2 className="text-5xl font-bold text-white mb-4">
            Our Beautiful Journey 📸
          </h2>
          <p className="text-xl text-pink-100">
            Every moment with you is picture perfect
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {PHOTOS.map((photo, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 cursor-pointer transform hover:scale-105"
              style={{ 
                animation: `slideIn 0.6s ease-out ${index * 0.15}s backwards, photoFloat 3s ease-in-out ${index * 0.3}s infinite`,
              }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50">
                <p className="text-gray-800 font-semibold text-center">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4 justify-center flex-wrap mt-8">
          <button
            onClick={() => navigate('/message')}
            className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            ← Back to Message
          </button>

          <button
            onClick={() => navigate('/love')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            <Heart className="w-5 h-5 fill-white" />
            Love Story
          </button>

          <button
            onClick={() => navigate('/3d')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-red-500 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            <Sparkles className="w-5 h-5" />
            3D Experience
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

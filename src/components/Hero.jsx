import React from 'react';
import { Sprout } from 'lucide-react';
import heroBg from '../assets/hero-bg.webp';

const Hero = ({ onStart }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight max-w-5xl">
          AI-Powered Tea <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
            Disease Detector
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Upload a leaf. Get diagnosis. Take action.
        </p>
      </div>

      {/* CTA: Check Leaf Quality (Centered & Shifted Up) */}
      {/* Changed bottom-10 to bottom-32 to move it upward */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20">
        <button 
          onClick={onStart} 
          className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:border-green-400/50 hover:shadow-[0_0_30px_-5px_rgba(132,204,22,0.6)]"
        >
          <div className="text-right">
            <p className="text-lg font-bold">Check Leaf Quality</p>
          </div>
          <div className="p-2 bg-green-500/20 rounded-full group-hover:bg-green-500/30">
            <Sprout className="w-6 h-6 text-green-400" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Hero;

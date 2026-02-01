import React from 'react';
import { CheckCircle2, Sprout } from 'lucide-react';
import heroBg from '../assets/hero-bg.webp';

// Accept the 'onStart' prop here
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
        
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Live for Assam Hackathon
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight max-w-5xl">
          AI-Powered Tea Quality <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
            & Traceability Platform
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          A SaaS platform that uses AI to evaluate tea leaf quality and creates a transparent digital supply chain for Assam’s tea ecosystem.
        </p>
      </div>

      {/* CTA: Consumer */}
      <div className="absolute bottom-10 left-10 z-20 hidden md:block">
        <button className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:border-green-400/50">
          <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Consumer</p>
            <p className="text-lg font-semibold">Verify Tea Batch</p>
          </div>
        </button>
      </div>

      {/* CTA: Farmer - UPDATED TO USE ONSTART */}
      <div className="absolute bottom-10 right-10 z-20">
        <button 
          onClick={onStart} 
          className="group flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(22,163,74,0.6)]"
        >
          <div className="text-right">
            <p className="text-xs text-green-100 uppercase tracking-wider">Join Now</p>
            <p className="text-lg font-bold">I AM FARMER</p>
          </div>
          <div className="p-2 bg-white/10 rounded-lg">
            <Sprout className="w-6 h-6" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Hero;
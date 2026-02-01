import React, { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

// FIX 3: Accept onNavigate prop
const Navbar = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/10 backdrop-blur-md border-b border-white/10 h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          <div 
            onClick={() => onNavigate('home')} 
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Leaf className="h-6 w-6 text-green-400" />
            <span className="text-white font-bold text-xl tracking-tight">TeaSphere</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* Home Button triggers navigation */}
              <button onClick={() => onNavigate('home')} className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">
                Home
              </button>
              
              {['About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">
                  {item}
                </a>
              ))}
              <a href="#login" className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/30">
                Login
              </a>
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <button onClick={() => { onNavigate('home'); setIsOpen(false); }} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                Home
              </button>
            {['About', 'Contact', 'Login'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FarmerFlow from './components/FarmerFlow';

function App() {
  const [view, setView] = useState('home'); 

  return (
    <div className="bg-black min-h-screen font-sans">
      {/* Pass the navigation handler to Navbar */}
      <Navbar onNavigate={setView} />
      
      {view === 'home' ? (
        <Hero onStart={() => setView('farmer')} />
      ) : (
        <FarmerFlow />
      )}
    </div>
  );
}

export default App;
import React, { useState, useRef } from 'react';
import { Upload, Camera, Leaf, Loader2, CheckCircle } from 'lucide-react';
import heroBg from '../assets/hero-bg.webp';

const FarmerFlow = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  // State for image handling
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Refs for hidden inputs
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null); // Reset results on new image
    }
  };

  // Backend API Call
  const analyzeLeaf = async () => {
    if (!imageFile) {
      alert("Please upload or capture an image first!");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("file", imageFile);

    try {
      const res = await fetch("http://10.186.201.31:8000/api/predict", {
        method: "POST",
        body: data
      });
      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error(err);
      // Demo Fallback
      setResult({
        prediction: {
          class: "Tea Mosquito Bug",
          confidence: 85,
          condition: "Critical",
          recommendations: [
            "Remove infected leaves immediately",
            "Spray 1% Bordeaux mixture",
            "Avoid evening irrigation",
            "Recheck crop in 7 days"
          ]
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const getSeverityHeight = () => {
    if (!result) return '10%'; 
    const conf = result.prediction.confidence || 0;
    return `${Math.max(10, conf)}%`; 
  };

  const getSeverityColor = () => {
    if (!result) return 'bg-gray-600';
    const conf = result.prediction.confidence || 0;
    if (conf > 75) return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]';
    if (conf > 40) return 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.6)]';
    return 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]';
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center pt-20 pb-4 px-4 overflow-hidden text-white font-sans">
      
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      </div>

      {/* Main Container - Adjusted to fit screen */}
      <div className="relative z-10 w-full max-w-7xl h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-4 flex flex-col animate-in fade-in zoom-in-95 duration-500">
        
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-200 border-b border-white/10 pb-2 mb-4 flex items-center gap-2 flex-shrink-0">
          <Leaf className="text-green-400" size={24} /> Tea Leaf Analyzer
        </h2>

        {/* Main Grid Content - Fills remaining height */}
        <div className="grid grid-cols-12 gap-4 flex-grow min-h-0">
          
          {/* ================= LEFT COLUMN: UPLOAD (3 cols) ================= */}
          <div className="col-span-3 flex flex-col gap-3 border border-white/20 bg-black/20 rounded-2xl p-3 h-full">
            <h3 className="text-md font-medium text-gray-300 text-center">Upload / Capture</h3>
            
            {/* Preview Box - Fills available vertical space */}
            <div className="flex-grow bg-black/40 border-2 border-dashed border-white/20 rounded-xl overflow-hidden relative flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="Leaf Preview" className="w-full h-full object-contain" />
              ) : (
                <span className="text-gray-500 text-xs">preview image</span>
              )}
            </div>

            <p className="text-[10px] text-gray-400 text-center">Use a clear, single leaf image</p>

            <div className="grid grid-cols-2 gap-2">
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              <button 
                onClick={() => fileInputRef.current.click()}
                className="flex items-center justify-center gap-1 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-all font-medium text-xs"
              >
                <Upload size={14} /> Upload
              </button>

              <input type="file" ref={cameraInputRef} onChange={handleFileChange} className="hidden" accept="image/*" capture="environment" />
              <button 
                onClick={() => cameraInputRef.current.click()}
                className="flex items-center justify-center gap-1 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-all font-medium text-xs"
              >
                <Camera size={14} /> Camera
              </button>
            </div>

            <button 
              onClick={analyzeLeaf}
              disabled={loading}
              className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : "Analyze Leaf"}
            </button>
          </div>


          {/* ================= MIDDLE COLUMN: DIAGNOSIS & SEVERITY (5 cols) ================= */}
          <div className="col-span-5 flex flex-col gap-4 h-full">
            
            {/* Top: Diagnosis (Larger portion) */}
            <div className="flex-[3] border border-white/20 bg-black/20 rounded-2xl p-4 flex flex-col justify-center space-y-4">
              <h3 className="text-lg font-bold border-b border-white/10 pb-2">Diagnosis</h3>
              
              <div className="space-y-3">
                <div className="grid grid-cols-12 items-center">
                   <span className="col-span-4 text-gray-400 text-sm">Disease :</span>
                   <span className="col-span-8 text-xl font-bold text-white capitalize truncate">
                     {result ? result.prediction.class : "---"}
                   </span>
                </div>
                
                <div className="grid grid-cols-12 items-center">
                   <span className="col-span-4 text-gray-400 text-sm">Condition :</span>
                   <span className="col-span-8 text-lg font-medium text-white capitalize">
                     {result ? (result.prediction.condition || "Detected") : "---"}
                   </span>
                </div>

                <div className="grid grid-cols-12 items-center">
                   <span className="col-span-4 text-gray-400 text-sm">Confidence :</span>
                   <span className="col-span-8 text-lg font-mono text-green-400">
                     {result ? `${Math.round(result.prediction.confidence)}%` : "---"}
                   </span>
                </div>
              </div>
            </div>

            {/* Bottom: Severity (Smaller portion) */}
            <div className="flex-[2] border border-white/20 bg-black/20 rounded-2xl p-3 flex flex-col relative min-h-0">
               <h3 className="text-sm font-bold border-b border-white/10 pb-1 mb-1">Severity Indicator</h3>
               
               <div className="flex-1 flex flex-row items-end justify-between px-4 pb-2">
                  <div className="flex flex-col justify-between h-full py-2 text-xs text-gray-400 font-mono">
                     <span>Very High</span>
                     <span>High</span>
                     <span>Low</span>
                  </div>

                  <div className="h-full w-10 bg-white/5 rounded-t-lg relative flex items-end justify-center border border-white/10">
                    <div 
                      className={`w-full mx-1 rounded-t-md transition-all duration-1000 ease-out ${getSeverityColor()}`}
                      style={{ height: getSeverityHeight() }}
                    ></div>
                  </div>
               </div>
            </div>

          </div>


          {/* ================= RIGHT COLUMN: RECOMMENDED ACTIONS (4 cols) ================= */}
          <div className="col-span-4 border border-white/20 bg-black/20 rounded-2xl p-4 h-full overflow-hidden flex flex-col">
             <h3 className="text-lg font-bold border-b border-white/10 pb-2 mb-4 flex-shrink-0">Recommended Actions</h3>
             
             <div className="flex-grow overflow-y-auto pr-1 custom-scrollbar">
               {result && result.prediction.recommendations ? (
                 <ul className="space-y-3">
                   {result.prediction.recommendations.map((rec, idx) => (
                     <li key={idx} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                       <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                       <span className="text-sm text-gray-200 leading-relaxed">{rec}</span>
                     </li>
                   ))}
                 </ul>
               ) : (
                 <div className="h-full flex flex-col justify-center items-center text-gray-600 space-y-2 opacity-30">
                    <Leaf size={48} strokeWidth={1} />
                    <p className="text-sm">No analysis data yet</p>
                 </div>
               )}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FarmerFlow;

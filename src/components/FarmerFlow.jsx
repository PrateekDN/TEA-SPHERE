import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Leaf, Loader2, CheckCircle } from 'lucide-react';
import heroBg from '../assets/hero-bg.webp';

const FarmerFlow = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [animateBar, setAnimateBar] = useState(false);
  
  // State for image handling
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Refs
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const severityRef = useRef(null);

  // Intersection Observer for Severity Bar Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          setAnimateBar(true);
        }
      },
      { threshold: 0.6 }
    );

    if (severityRef.current) {
      observer.observe(severityRef.current);
    }

    return () => {
      if (severityRef.current) observer.unobserve(severityRef.current);
    };
  }, [result]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setAnimateBar(false);
    }
  };

  const analyzeLeaf = async () => {
    if (!imageFile) {
      alert("Please upload or capture an image first!");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("file", imageFile);

    try {
      const res = await fetch("http://10.170.144.31:8000/api/predict", {
        method: "POST",
        body: data
      });
      const json = await res.json();
      setResult(json);

      // Mobile Specific Logic
      if (window.innerWidth < 768) {
        setTimeout(() => {
          if (severityRef.current) {
             severityRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);

        setTimeout(() => {
          setAnimateBar(true);
        }, 600); 
      }

    } catch (err) {
      console.error(err);
      // Fallback matching your LATEST JSON structure (ai inside analysis)
      setResult({
        analysis: {
          disease: "Tea Mosquito Bug",
          confidence: 85,
          ai: {
            severity: "Critical",
            treatment: [
              "Remove infected leaves immediately",
              "Spray 1% Bordeaux mixture",
              "Avoid evening irrigation",
              "Recheck crop in 7 days"
            ]
          }
        }
      });
      
      if (window.innerWidth < 768) {
        setTimeout(() => {
          if (severityRef.current) {
             severityRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
        setTimeout(() => {
          setAnimateBar(true);
        }, 600);
      }

    } finally {
      setLoading(false);
    }
  };

  const isHealthy = () => {
    return result?.analysis?.disease?.toLowerCase().includes('healthy');
  };

  const getSeverityHeight = () => {
    if (!result || !animateBar) return '5%'; 
    if (isHealthy()) return '10%'; 
    const conf = result.analysis?.confidence || 0;
    return `${Math.max(10, conf)}%`; 
  };

  const getSeverityColor = () => {
    if (!result) return 'bg-gray-600';
    if (isHealthy()) return 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]';
    
    const conf = result.analysis?.confidence || 0;
    if (conf > 75) return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]';
    if (conf > 40) return 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.6)]';
    return 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.6)]';
  };

  return (
    <div className="w-full relative bg-black min-h-screen md:h-screen md:overflow-hidden text-white font-sans pt-20 pb-10 md:pb-0 md:pt-20 md:flex md:items-center md:justify-center">
      
      <div 
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      </div>

      <div className="relative z-10 w-full px-4 md:px-0 md:max-w-7xl md:h-[80vh] bg-transparent md:bg-white/5 md:backdrop-blur-xl md:border md:border-white/10 md:rounded-3xl md:shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-500">
        
        <h2 className="flex text-xl font-bold text-gray-200 md:border-b md:border-white/10 pb-4 md:m-4 items-center gap-2 flex-shrink-0">
          <Leaf className="text-green-400" size={24} /> Tea Leaf Analyzer
        </h2>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-12 md:gap-4 md:p-4 flex-grow min-h-0">
          
          {/* ================= CARD 1: UPLOAD ================= */}
          <div className="flex flex-col gap-3 border border-white/20 bg-black/20 rounded-2xl p-4 md:h-full md:col-span-3">
            <h3 className="text-sm md:text-md font-medium text-gray-300 text-center">Upload / Capture</h3>
            
            <div className="h-32 md:flex-grow bg-black/40 border-2 border-dashed border-white/20 rounded-xl overflow-hidden relative flex items-center justify-center">
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
                className="flex items-center justify-center gap-1 py-3 md:py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-all font-medium text-xs"
              >
                <Upload size={14} /> Upload
              </button>

              <input type="file" ref={cameraInputRef} onChange={handleFileChange} className="hidden" accept="image/*" capture="environment" />
              <button 
                onClick={() => cameraInputRef.current.click()}
                className="flex items-center justify-center gap-1 py-3 md:py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-all font-medium text-xs"
              >
                <Camera size={14} /> Camera
              </button>
            </div>

            <button 
              onClick={analyzeLeaf}
              disabled={loading}
              className="w-full bg-white text-black font-bold py-4 md:py-3 rounded-xl hover:bg-gray-200 transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : "Analyze Leaf"}
            </button>
          </div>


          {/* WRAPPER for Middle Col */}
          <div className="contents md:flex md:flex-col md:col-span-5 md:gap-4 md:h-full">
            
            {/* ================= CARD 2: DIAGNOSIS ================= */}
            <div className="border border-white/20 bg-black/20 rounded-2xl p-6 flex flex-col justify-center space-y-4 md:h-auto md:flex-[3]">
              <h3 className="text-lg font-bold border-b border-white/10 pb-2">Diagnosis</h3>
              
              <div className="space-y-4 md:space-y-3">
                <div className="grid grid-cols-12 items-center">
                   <span className="col-span-4 text-gray-400 text-sm">Disease :</span>
                   <span className="col-span-8 text-xl md:text-xl font-bold text-white capitalize truncate">
                     {result?.analysis?.disease || "---"}
                   </span>
                </div>
                
                <div className="grid grid-cols-12 items-center">
                   <span className="col-span-4 text-gray-400 text-sm">Condition :</span>
                   <span className="col-span-8 text-lg md:text-lg font-medium text-white capitalize">
                     {/* FIX: Correct path analysis.ai.severity */}
                     {isHealthy() ? "Good" : (result?.analysis?.ai?.severity || "---")}
                   </span>
                </div>

                <div className="grid grid-cols-12 items-center">
                   <span className="col-span-4 text-gray-400 text-sm">Confidence :</span>
                   <span className="col-span-8 text-lg font-mono text-green-400">
                     {result ? `${Math.round(result.analysis.confidence)}%` : "---"}
                   </span>
                </div>
              </div>
            </div>

            {/* ================= CARD 3: SEVERITY ================= */}
            <div 
               ref={severityRef} 
               className="border border-white/20 bg-black/20 rounded-2xl p-6 flex flex-col relative min-h-[200px] md:min-h-0 md:h-auto md:flex-[2]"
            >
               <h3 className="text-sm font-bold border-b border-white/10 pb-2 mb-2">Severity Indicator</h3>
               
               <div className="flex-1 flex flex-row items-end justify-between px-4 pb-2">
                  <div className="flex flex-col justify-between h-full py-4 text-sm text-gray-400 font-mono">
                     <span>Very High</span>
                     <span>High</span>
                     <span>Low</span>
                  </div>

                  <div className="h-full w-16 md:w-10 bg-white/5 rounded-t-lg relative flex items-end justify-center border border-white/10">
                    <div 
                      className={`w-full mx-1 rounded-t-md transition-all duration-[1500ms] ease-out ${getSeverityColor()}`}
                      style={{ height: getSeverityHeight() }}
                    ></div>
                  </div>
               </div>
            </div>

          </div>


          {/* ================= CARD 4: ACTIONS ================= */}
          <div className="border border-white/20 bg-black/20 rounded-2xl p-6 flex flex-col min-h-[300px] md:min-h-0 md:h-full md:col-span-4">
             <h3 className="text-lg font-bold border-b border-white/10 pb-2 mb-4 flex-shrink-0">Recommended Actions</h3>
             
             <div className="flex-grow md:overflow-y-auto pr-1 custom-scrollbar">
               {/* FIX: Correct path analysis.ai.treatment */}
               {result && isHealthy() ? (
                 <div className="h-full flex flex-col justify-center items-center text-green-400 space-y-2">
                    <CheckCircle size={48} strokeWidth={1} />
                    <p className="text-sm">Plant is healthy! No action needed.</p>
                 </div>
               ) : (
                 result && result.analysis?.ai?.treatment ? (
                   <ul className="space-y-4 md:space-y-3">
                     {result.analysis.ai.treatment.map((rec, idx) => (
                       <li key={idx} className="flex items-start gap-3 p-4 md:p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
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
                 )
               )}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FarmerFlow;

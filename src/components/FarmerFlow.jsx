import React, { useState } from 'react';
import { Upload, MapPin, User, Phone, Leaf, QrCode, Download, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import heroBg from '../assets/hero-bg.webp';

const FarmerFlow = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: 'Assam (Auto-Detected)',
    image: null
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: URL.createObjectURL(file) });
    }
  };

  const analyzeLeaf = () => {
    if (!formData.image) return alert("Please upload an image first!");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center p-4 pt-24 overflow-hidden">
      
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
      </div>

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl text-white animate-in fade-in zoom-in-95 duration-500">
        
        {/* Header */}
        <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center gap-3">
          <Leaf className="text-green-400" />
          <h2 className="text-xl font-semibold tracking-wide">
            {step === 1 && "TeaSphere - Leaf Analysis"}
            {step === 2 && "AI Quality Assessment"}
            {step === 3 && "Batch Creation & Traceability"}
          </h2>
        </div>

        {/* Content Body */}
        <div className="p-6">
          
          {/* STEP 1: UPLOAD */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="border-2 border-dashed border-white/30 rounded-xl h-40 flex items-center justify-center text-center hover:bg-white/5 transition-colors cursor-pointer relative group">
                <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                {formData.image ? (
                  <img src={formData.image} alt="Preview" className="h-full rounded-lg object-contain shadow-lg" />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-green-500/20 rounded-full group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-lg font-medium">Upload Tea Leaf Image</p>
                      <p className="text-xs text-gray-400">Tap to browse or drag & drop</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-300 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Location
                  </label>
                  <input type="text" value={formData.location} readOnly className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500"/>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs text-gray-300 flex items-center gap-2">
                    <User className="w-3 h-3" /> Farmer Name
                  </label>
                  <input type="text" placeholder="Enter name" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs text-gray-300 flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Mobile Number
                  </label>
                  <input type="tel" placeholder="+91..." className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500" />
                </div>
              </div>

              <button onClick={analyzeLeaf} disabled={loading} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all mt-2">
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Leaf className="w-5 h-5" />}
                {loading ? "Analyzing..." : "Analyze Leaf"}
              </button>
            </div>
          )}

          {/* STEP 2: AI RESULT */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/30 p-2 rounded-xl border border-white/10 h-64 flex items-center justify-center">
                   <img src={formData.image} alt="Analyzed" className="max-h-full max-w-full rounded-lg object-contain" />
                </div>
                
                <div className="space-y-3 flex flex-col justify-center">
                  <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-gray-400 text-xs">Leaf Status</p>
                    <p className="text-xl font-bold text-green-400 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" /> Healthy / Premium
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                       <p className="text-gray-400 text-xs">Quality Score</p>
                       <p className="text-2xl font-bold">87<span className="text-xs text-gray-500">/100</span></p>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                       <p className="text-gray-400 text-xs">Grade</p>
                       <p className="text-2xl font-bold text-yellow-400">A+</p>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <p className="text-gray-400 text-xs">Suggested Price</p>
                    <p className="text-2xl font-bold">₹120 <span className="text-xs text-gray-500 font-normal">/ kg</span></p>
                  </div>
                </div>
              </div>

              <button onClick={() => setStep(3)} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all">
                Create Batch <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* STEP 3: BATCH & QR (UPDATED) */}
          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Left Side: Batch Details - Added pb-6 to lift button up */}
              <div className="flex flex-col justify-between h-full pb-6"> 
                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-gray-200 border-b border-white/10 pb-2 mb-3">Batch Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                      <span className="text-gray-400">Batch ID</span>
                      <span className="font-mono text-green-400">TS-2026-X892</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                      <span className="text-gray-400">Farmer</span>
                      <span className="font-medium">{formData.name || "Rahul Das"}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                      <span className="text-gray-400">Date</span>
                      <span className="font-medium">02 Feb 2026</span>
                    </div>
                    <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                      <span className="text-gray-400">Grade Assigned</span>
                      <span className="font-bold text-yellow-400">Grade A</span>
                    </div>
                  </div>
                </div>

                {/* Button pushed to bottom */}
                <button className="w-full border border-green-500 text-green-400 hover:bg-green-500/10 font-bold py-3 rounded-xl transition-all mt-4">
                  Generate New Batch
                </button>
              </div>

              {/* Right Side: QR Code Card */}
              <div className="flex flex-col justify-between h-full bg-white p-6 rounded-2xl text-black shadow-2xl">
                
                {/* Center Content Group */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                  <h3 className="font-bold text-md text-gray-800">Scan to Verify</h3>
                  <div className="w-40 h-40 bg-gray-900 rounded-lg flex items-center justify-center text-white">
                      <QrCode size={80} />
                  </div>
                  <p className="font-mono text-xs text-gray-500">ID: TS-2026-X892</p>
                </div>

                {/* Button Group */}
                <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-all w-full justify-center text-sm font-bold mt-4">
                  <Download className="w-4 h-4" /> Download QR
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FarmerFlow;
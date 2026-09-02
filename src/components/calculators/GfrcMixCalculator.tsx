import React, { useState } from 'react';
import { Sparkles, Info, RefreshCw, Layers, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export const GfrcMixCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [area, setArea] = useState<number>(10); // m² or sq ft
  const [thicknessMm, setThicknessMm] = useState<number>(15); // mm or inches (0.6 in)
  const [mixType, setMixType] = useState<'spray' | 'premix'>('premix');
  const [cementType, setCementType] = useState<'white' | 'grey'>('white');
  const [fiberPercent, setFiberPercent] = useState<number>(3.5); // % of total dry weight
  const [polymerPercent, setPolymerPercent] = useState<number>(5.0); // % polymer solids to cement
  const [waterCementRatio, setWaterCementRatio] = useState<number>(0.33);
  const [sandCementRatio, setSandCementRatio] = useState<number>(1.0); // 1:1 ratio
  const [wastagePercent, setWastagePercent] = useState<number>(5);

  // Conversion
  const effectiveAreaM2 = unit === 'metric' ? area : area * 0.092903;
  const effectiveThicknessM = unit === 'metric' ? thicknessMm / 1000 : (thicknessMm * 25.4) / 1000;
  
  // Volume in m³
  const wetVolumeM3 = effectiveAreaM2 * effectiveThicknessM;
  const volumeWithWastage = wetVolumeM3 * (1 + wastagePercent / 100);

  // Wet GFRC density is approx 2050 - 2150 kg/m³
  const gfrcDensity = 2100; // kg/m³
  const totalWetWeightKg = volumeWithWastage * gfrcDensity;

  // Mix Proportioning (Dry matrix calculation)
  // Matrix = 1 part Cement + 1 part Silica Sand (or customized sandCementRatio)
  // Polymer liquid (approx 48-50% solids): polymer dose solids = polymerPercent% of cement
  // Fiber = fiberPercent% of total weight (Premix typically 3-3.5%, Spray-up typically 4.5-5.0%)
  
  // Total batch parts:
  // Let C = Cement weight
  // Sand = C * sandCementRatio
  // Water = C * waterCementRatio
  // Polymer solids = C * (polymerPercent / 100)
  // Polymer liquid (assuming 50% solid acrylic) = Polymer solids * 2 = C * (polymerPercent / 50)
  // Net added water = Water - water in polymer liquid (which is half polymer liquid weight) = C * (waterCementRatio - polymerPercent / 100)
  // Fibers = (C + Sand + Water + Polymer) * (fiberPercent / 100)
  
  // Back-calculating from total wet weight:
  const dryMatrixFactor = 1 + sandCementRatio + waterCementRatio + (polymerPercent / 50);
  const totalFactorWithFiber = dryMatrixFactor * (1 + fiberPercent / 100);
  
  const cementKg = totalWetWeightKg / totalFactorWithFiber;
  const sandKg = cementKg * sandCementRatio;
  const totalWaterTargetKg = cementKg * waterCementRatio;
  const polymerLiquidKg = cementKg * (polymerPercent / 50); // 50% solid dispersion
  const polymerWaterContributionKg = polymerLiquidKg * 0.5;
  const netAddedWaterKg = Math.max(0, totalWaterTargetKg - polymerWaterContributionKg);
  const fiberKg = (cementKg + sandKg) * (fiberPercent / 100);
  const superplasticizerMl = cementKg * 8; // approx 8 ml per kg of cement for low w/c ratio

  const cementBags = cementKg / 50;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>GRCA &amp; PCI Spec Compliant</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            GFRC (Glass Fiber Reinforced Concrete) Mix Calculator
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Formulate high-performance architectural GFRC facades, countertops, and thin-shell panels with Holcim / White Portland cement &amp; AR-glass fibers.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setUnit('metric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              unit === 'metric' ? 'bg-white text-[#0F2D5C] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Metric (m², mm)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              unit === 'imperial' ? 'bg-white text-[#0F2D5C] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Imperial (sq ft, in)
          </button>
        </div>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Surface Area */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Surface Area ({unit === 'metric' ? 'm²' : 'sq ft'})
          </label>
          <input
            type="number"
            min="0.1"
            step="0.5"
            value={area}
            onChange={(e) => setArea(Math.max(0.1, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
        </div>

        {/* Thickness */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Panel Thickness ({unit === 'metric' ? 'mm' : 'inches'})
          </label>
          <input
            type="number"
            min="6"
            step="1"
            value={thicknessMm}
            onChange={(e) => setThicknessMm(Math.max(1, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">Typical: 12mm to 19mm (0.5 to 0.75 in)</span>
        </div>

        {/* Mix Application Method */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Application Method
          </label>
          <select
            value={mixType}
            onChange={(e) => {
              const val = e.target.value as 'spray' | 'premix';
              setMixType(val);
              setFiberPercent(val === 'spray' ? 4.5 : 3.5);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold bg-white"
          >
            <option value="premix">Premix GFRC (Cast/Vibrated)</option>
            <option value="spray">Sprayed GFRC (Chopped roving)</option>
          </select>
        </div>

        {/* Cement Type */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Cement Specification
          </label>
          <select
            value={cementType}
            onChange={(e) => setCementType(e.target.value as 'white' | 'grey')}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold bg-white"
          >
            <option value="white">White Portland Cement (Holcim / Aalborg CEM I 52.5)</option>
            <option value="grey">Ordinary Portland Cement (CEM I 42.5N / 52.5N)</option>
          </select>
        </div>

        {/* AR-Glass Fiber Percentage */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            AR-Glass Fiber Content (%)
          </label>
          <input
            type="number"
            min="1"
            max="6"
            step="0.5"
            value={fiberPercent}
            onChange={(e) => setFiberPercent(parseFloat(e.target.value) || 3.5)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">Min 16-19% ZrO₂ alkali-resistant fiber</span>
        </div>

        {/* Polymer Solids */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Acrylic Polymer Solids (%)
          </label>
          <input
            type="number"
            min="2"
            max="8"
            step="0.5"
            value={polymerPercent}
            onChange={(e) => setPolymerPercent(parseFloat(e.target.value) || 5.0)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">Eliminates 7-day moist water curing</span>
        </div>

      </div>

      {/* Advanced Mix Ratio Toggles */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div>
          <span className="font-bold text-slate-700">Water-to-Cement Ratio:</span>{' '}
          <span className="text-[#0F2D5C] font-mono font-bold">{waterCementRatio.toFixed(2)}</span>
          <p className="text-[11px] text-slate-500 mt-0.5">Recommended: 0.30 - 0.35 with plasticizer</p>
        </div>
        <div>
          <span className="font-bold text-slate-700">Sand-to-Cement Ratio:</span>{' '}
          <span className="text-[#0F2D5C] font-mono font-bold">{sandCementRatio.toFixed(1)} : 1</span>
          <p className="text-[11px] text-slate-500 mt-0.5">Dry silica sand grading (0.15mm - 0.6mm)</p>
        </div>
        <div>
          <span className="font-bold text-slate-700">Wastage / Rebound Allowance:</span>{' '}
          <span className="text-[#0F2D5C] font-mono font-bold">+{wastagePercent}%</span>
          <p className="text-[11px] text-slate-500 mt-0.5">Spray-up rebound buffer allowance</p>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-gradient-to-br from-[#0F2D5C] to-[#1a3d75] text-white rounded-2xl p-5 sm:p-6 space-y-5 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#F4B400] font-bold">GFRC Batch Batching Sheet</span>
            <h4 className="text-lg font-black text-white">Calculated Material Bill of Quantities</h4>
          </div>
          <div className="text-right">
            <span className="text-xs text-blue-200 block">Total Wet Batch Weight</span>
            <span className="text-xl font-mono font-black text-[#F4B400]">{totalWetWeightKg.toFixed(1)} kg</span>
            <span className="text-xs text-slate-300 block">({(wetVolumeM3 * 1000).toFixed(1)} liters / {wetVolumeM3.toFixed(3)} m³)</span>
          </div>
        </div>

        {/* Quantities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">Portland Cement</span>
            <span className="text-lg font-mono font-bold text-white block mt-0.5">{cementKg.toFixed(1)} kg</span>
            <span className="text-[11px] text-[#F4B400] font-medium block">~{cementBags.toFixed(1)} Bags (50kg)</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">Dry Silica Sand</span>
            <span className="text-lg font-mono font-bold text-white block mt-0.5">{sandKg.toFixed(1)} kg</span>
            <span className="text-[11px] text-slate-300 block">Grade 50-70 AFS</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">AR-Glass Fiber</span>
            <span className="text-lg font-mono font-bold text-[#F4B400] block mt-0.5">{fiberKg.toFixed(1)} kg</span>
            <span className="text-[11px] text-slate-300 block">{mixType === 'spray' ? 'Roving (Spray)' : '13-25mm Chopped'}</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">Acrylic Polymer</span>
            <span className="text-lg font-mono font-bold text-white block mt-0.5">{polymerLiquidKg.toFixed(1)} kg</span>
            <span className="text-[11px] text-slate-300 block">Liquid (50% solid)</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">Net Added Water</span>
            <span className="text-lg font-mono font-bold text-white block mt-0.5">{netAddedWaterKg.toFixed(1)} L</span>
            <span className="text-[11px] text-slate-300 block">Clean potable water</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">Superplasticizer</span>
            <span className="text-lg font-mono font-bold text-white block mt-0.5">{(superplasticizerMl / 1000).toFixed(2)} L</span>
            <span className="text-[11px] text-slate-300 block">PCE based</span>
          </div>

        </div>

        {/* Technical Mixing Instructions */}
        <div className="bg-black/20 rounded-xl p-3.5 border border-white/5 text-xs text-blue-100 leading-relaxed">
          <strong className="text-[#F4B400] font-bold">Recommended Batching Sequence:</strong> Add water, polymer, and 50% superplasticizer into high-shear mixer. Slowly blend cement and silica sand until smooth slurry forms (1-2 minutes). Add remaining superplasticizer to achieve desired slump flow. For Premix, add AR-glass chopped strands last at low mixer speed for 60 seconds to avoid filament damage.
        </div>
      </div>
    </div>
  );
};

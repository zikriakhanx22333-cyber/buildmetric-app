import React, { useState } from 'react';
import { Layers, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const StaircaseCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Heights and dimensions
  const [totalHeight, setTotalHeight] = useState<number>(3.0); // 3 meters or 10 feet
  const [flightWidth, setFlightWidth] = useState<number>(1.2); // 1.2 meters or 4 feet
  const [riserHeight, setRiserHeight] = useState<number>(160); // mm or 6.5 in
  const [treadDepth, setTreadDepth] = useState<number>(280); // mm or 11 in
  const [waistThickness, setWaistThickness] = useState<number>(150); // mm or 6 in
  const [landingLength, setLandingLength] = useState<number>(1.2); // meters or 4 feet
  const [concreteGrade, setConcreteGrade] = useState<'M20' | 'M25'>('M20');
  const [wastagePercent, setWastagePercent] = useState<number>(5);

  // Conversion to metric standard
  const effectiveHeightM = unit === 'metric' ? totalHeight : totalHeight * 0.3048;
  const effectiveWidthM = unit === 'metric' ? flightWidth : flightWidth * 0.3048;
  const effectiveRiserM = unit === 'metric' ? riserHeight / 1000 : (riserHeight * 25.4) / 1000;
  const effectiveTreadM = unit === 'metric' ? treadDepth / 1000 : (treadDepth * 25.4) / 1000;
  const effectiveWaistM = unit === 'metric' ? waistThickness / 1000 : (waistThickness * 25.4) / 1000;
  const effectiveLandingM = unit === 'metric' ? landingLength : landingLength * 0.3048;

  // Staircase geometry
  const numberOfRisers = Math.round(effectiveHeightM / effectiveRiserM);
  const actualRiserHeightM = effectiveHeightM / (numberOfRisers || 1);
  const numberOfTreads = Math.max(1, numberOfRisers - 1);
  
  // Inclined waist slab length: L = sqrt(going² + rise²)
  const horizontalGoingM = numberOfTreads * effectiveTreadM;
  const inclinedLengthM = Math.sqrt(horizontalGoingM * horizontalGoingM + effectiveHeightM * effectiveHeightM);
  
  // 1. Waist slab volume = Inclined Length × Width × Thickness
  const waistVolumeM3 = inclinedLengthM * effectiveWidthM * effectiveWaistM;

  // 2. Steps triangular volume = (0.5 × Riser × Tread) × Width × Number of Treads
  const stepsVolumeM3 = 0.5 * actualRiserHeightM * effectiveTreadM * effectiveWidthM * numberOfTreads;

  // 3. Landing slab volume = Landing Length × Width × Waist Thickness
  const landingVolumeM3 = effectiveLandingM * effectiveWidthM * effectiveWaistM;

  // Total wet concrete
  const netConcreteM3 = waistVolumeM3 + stepsVolumeM3 + landingVolumeM3;
  const totalConcreteM3 = netConcreteM3 * (1 + wastagePercent / 100);
  const totalConcreteCft = totalConcreteM3 * 35.3147;

  // Material breakdown (Dry Volume factor 1.54)
  const dryVolumeM3 = totalConcreteM3 * 1.54;
  // M20 is 1 : 1.5 : 3 (sum 5.5). M25 is 1 : 1 : 2 (sum 4.0).
  const sumRatio = concreteGrade === 'M20' ? 5.5 : 4.0;
  const cementRatio = 1.0;
  const sandRatio = concreteGrade === 'M20' ? 1.5 : 1.0;
  const aggRatio = concreteGrade === 'M20' ? 3.0 : 2.0;

  const cementVolumeM3 = (dryVolumeM3 * cementRatio) / sumRatio;
  // 1 bag (50kg) = 0.0347 m³
  const cementBags = Math.ceil(cementVolumeM3 / 0.0347);
  const sandM3 = (dryVolumeM3 * sandRatio) / sumRatio;
  const aggregateM3 = (dryVolumeM3 * aggRatio) / sumRatio;

  // Estimated Rebar (typical RCC staircase consumes 90 - 110 kg of rebar per m³ of concrete)
  const estimatedRebarKg = totalConcreteM3 * 95;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-xs font-bold mb-1">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>Structural RCC Staircase Estimator</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            RCC Staircase Concrete &amp; Rebar Calculator
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Calculate exact concrete volume, number of risers/treads, waist slab volume, steps triangular mass, landing volume, cement bags, and rebar tonnage.
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
            Metric (m, mm)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              unit === 'imperial' ? 'bg-white text-[#0F2D5C] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Imperial (ft, in)
          </button>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Floor-to-Floor Height ({unit === 'metric' ? 'm' : 'ft'})
          </label>
          <input
            type="number"
            min="1"
            step="0.1"
            value={totalHeight}
            onChange={(e) => setTotalHeight(Math.max(0.5, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Flight Width ({unit === 'metric' ? 'm' : 'ft'})
          </label>
          <input
            type="number"
            min="0.5"
            step="0.1"
            value={flightWidth}
            onChange={(e) => setFlightWidth(Math.max(0.5, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Riser Height ({unit === 'metric' ? 'mm' : 'in'})
          </label>
          <input
            type="number"
            min="100"
            step="5"
            value={riserHeight}
            onChange={(e) => setRiserHeight(Math.max(50, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">Standard comfort: 150mm - 175mm (6-7 in)</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Tread Depth / Going ({unit === 'metric' ? 'mm' : 'in'})
          </label>
          <input
            type="number"
            min="200"
            step="10"
            value={treadDepth}
            onChange={(e) => setTreadDepth(Math.max(100, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">Standard comfort: 250mm - 300mm (10-12 in)</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Waist Slab Thickness ({unit === 'metric' ? 'mm' : 'in'})
          </label>
          <input
            type="number"
            min="100"
            step="10"
            value={waistThickness}
            onChange={(e) => setWaistThickness(Math.max(75, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">Typical: 125mm - 150mm (5-6 in)</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Landing Length ({unit === 'metric' ? 'm' : 'ft'})
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={landingLength}
            onChange={(e) => setLandingLength(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
        </div>

      </div>

      {/* Geometry Stats Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <span className="text-slate-500 font-semibold block">Total Risers:</span>
          <span className="font-bold text-base text-[#0F2D5C]">{numberOfRisers} Steps</span>
          <span className="text-[11px] text-slate-400 block">@ {(actualRiserHeightM * (unit === 'metric' ? 1000 : 39.37)).toFixed(1)} {unit === 'metric' ? 'mm' : 'in'}</span>
        </div>
        <div>
          <span className="text-slate-500 font-semibold block">Total Treads:</span>
          <span className="font-bold text-base text-[#0F2D5C]">{numberOfTreads} Treads</span>
        </div>
        <div>
          <span className="text-slate-500 font-semibold block">Inclined Flight Length:</span>
          <span className="font-bold text-base text-[#0F2D5C]">{inclinedLengthM.toFixed(2)} m</span>
          <span className="text-[11px] text-slate-400 block">{(inclinedLengthM * 3.28084).toFixed(1)} ft</span>
        </div>
        <div>
          <span className="text-slate-500 font-semibold block">Stair Slope / Pitch:</span>
          <span className="font-bold text-base text-[#0F2D5C]">
            {((Math.atan(actualRiserHeightM / effectiveTreadM) * 180) / Math.PI).toFixed(1)}°
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold block">Ideal range (30°- 35°)</span>
        </div>
      </div>

      {/* Results Box */}
      <div className="bg-gradient-to-br from-[#0F2D5C] to-[#163c78] text-white rounded-2xl p-5 sm:p-6 space-y-5 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#F4B400] font-bold">Staircase Material Bill</span>
            <h4 className="text-lg font-black text-white">Total Concrete &amp; Steel Schedule</h4>
          </div>
          <div className="text-right">
            <span className="text-xs text-blue-200 block">Total Concrete Volume Required</span>
            <span className="text-3xl font-mono font-black text-[#F4B400]">{totalConcreteM3.toFixed(2)} m³</span>
            <span className="text-xs text-slate-300 block">({totalConcreteCft.toFixed(1)} CFT)</span>
          </div>
        </div>

        {/* Quantities Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">Cement Bags (50kg)</span>
            <span className="text-lg font-mono font-bold text-white block mt-0.5">{cementBags} Bags</span>
            <span className="text-[11px] text-slate-300 block">{concreteGrade} Mix Grade</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">Fine Sand</span>
            <span className="text-lg font-mono font-bold text-white block mt-0.5">{sandM3.toFixed(2)} m³</span>
            <span className="text-[11px] text-slate-300 block">{(sandM3 * 35.3147).toFixed(1)} CFT</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">Coarse Aggregate</span>
            <span className="text-lg font-mono font-bold text-white block mt-0.5">{aggregateM3.toFixed(2)} m³</span>
            <span className="text-[11px] text-slate-300 block">{(aggregateM3 * 35.3147).toFixed(1)} CFT</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">Estimated Rebar Steel</span>
            <span className="text-lg font-mono font-bold text-[#F4B400] block mt-0.5">{estimatedRebarKg.toFixed(0)} kg</span>
            <span className="text-[11px] text-slate-300 block">{(estimatedRebarKg / 1000).toFixed(2)} Tons</span>
          </div>

        </div>
      </div>
    </div>
  );
};

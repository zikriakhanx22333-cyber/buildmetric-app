import React, { useState } from 'react';
import { Building2, Layers, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const YtongAacCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Wall Dimensions
  const [wallLength, setWallLength] = useState<number>(10); // meters or feet
  const [wallHeight, setWallHeight] = useState<number>(3); // meters or feet
  const [openingsArea, setOpeningsArea] = useState<number>(3.5); // doors and windows

  // Block Dimensions
  const [standardSize, setStandardSize] = useState<string>('600x200x200');
  const [customLengthMm, setCustomLengthMm] = useState<number>(600);
  const [customHeightMm, setCustomHeightMm] = useState<number>(200);
  const [customThickMm, setCustomThickMm] = useState<number>(200);

  // Mortar / Adhesive
  const [mortarType, setMortarType] = useState<'thin-bed' | 'traditional'>('thin-bed');
  const [jointMm, setJointMm] = useState<number>(2.5); // 2-3mm for thin-bed, 10mm for traditional
  const [wastagePercent, setWastagePercent] = useState<number>(5);

  // Parse dimensions
  let blockLengthM = 0.6;
  let blockHeightM = 0.2;
  let blockThickM = 0.2;

  if (standardSize === 'custom') {
    blockLengthM = customLengthMm / 1000;
    blockHeightM = customHeightMm / 1000;
    blockThickM = customThickMm / 1000;
  } else {
    const parts = standardSize.split('x').map(Number);
    blockLengthM = parts[0] / 1000;
    blockHeightM = parts[1] / 1000;
    blockThickM = parts[2] / 1000;
  }

  // Convert inputs to metric if imperial
  const effectiveLengthM = unit === 'metric' ? wallLength : wallLength * 0.3048;
  const effectiveHeightM = unit === 'metric' ? wallHeight : wallHeight * 0.3048;
  const effectiveOpeningsM2 = unit === 'metric' ? openingsArea : openingsArea * 0.092903;

  const grossAreaM2 = effectiveLengthM * effectiveHeightM;
  const netAreaM2 = Math.max(0, grossAreaM2 - effectiveOpeningsM2);
  const wallVolumeM3 = netAreaM2 * blockThickM;

  // Face area of one block with joint
  const jointM = jointMm / 1000;
  const nominalBlockLengthM = blockLengthM + jointM;
  const nominalBlockHeightM = blockHeightM + jointM;
  const blockFaceAreaM2 = nominalBlockLengthM * nominalBlockHeightM;

  const rawBlockCount = blockFaceAreaM2 > 0 ? netAreaM2 / blockFaceAreaM2 : 0;
  const totalBlockCount = Math.ceil(rawBlockCount * (1 + wastagePercent / 100));

  // Thin-bed adhesive calculation:
  // Typical rule: approx 22 - 25 kg of dry thin-bed mortar per 1 m³ of AAC wall, or ~1 bag (25kg) per 1.0 - 1.2 m³ of wall.
  // Traditional mortar: approx 0.035 m³ mortar per m² of 200mm wall.
  const adhesiveKgPerM3 = mortarType === 'thin-bed' ? 24 : 85;
  const totalAdhesiveKg = wallVolumeM3 * adhesiveKgPerM3 * (1 + wastagePercent / 100);
  const adhesiveBags25Kg = Math.ceil(totalAdhesiveKg / 25);

  // AAC typical density is ~550 kg/m³ (dry), ~650 kg/m³ (installed with moisture)
  const estimatedWallWeightKg = wallVolumeM3 * 600;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-1">
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Thermal Masonry Estimation</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            YTONG &amp; AAC Block Calculator (Autoclaved Aerated Concrete)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Calculate exact count of YTONG thermal blocks, thin-bed adhesive bags (25kg), net wall area, and total m³ volume with joint allowances.
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

      {/* Wall Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Wall Total Length ({unit === 'metric' ? 'm' : 'ft'})
          </label>
          <input
            type="number"
            min="0.5"
            step="0.5"
            value={wallLength}
            onChange={(e) => setWallLength(Math.max(0.1, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Wall Height ({unit === 'metric' ? 'm' : 'ft'})
          </label>
          <input
            type="number"
            min="0.5"
            step="0.1"
            value={wallHeight}
            onChange={(e) => setWallHeight(Math.max(0.1, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Openings Area (Doors &amp; Windows) ({unit === 'metric' ? 'm²' : 'sq ft'})
          </label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={openingsArea}
            onChange={(e) => setOpeningsArea(Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
        </div>
      </div>

      {/* Block Specification */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Standard YTONG / AAC Block Size (L × H × T)
          </label>
          <select
            value={standardSize}
            onChange={(e) => setStandardSize(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold bg-white"
          >
            <option value="600x200x200">600 × 200 × 200 mm (Standard External Wall)</option>
            <option value="600x200x150">600 × 200 × 150 mm (Medium Wall)</option>
            <option value="600x200x100">600 × 200 × 100 mm (Interior Partition)</option>
            <option value="600x200x250">600 × 200 × 250 mm (Insulated External)</option>
            <option value="600x200x300">600 × 200 × 300 mm (High Thermal Wall)</option>
            <option value="custom">Custom Dimensions</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Joint / Mortar Type
          </label>
          <select
            value={mortarType}
            onChange={(e) => {
              const val = e.target.value as 'thin-bed' | 'traditional';
              setMortarType(val);
              setJointMm(val === 'thin-bed' ? 2.5 : 10);
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold bg-white"
          >
            <option value="thin-bed">Thin-Bed Polymer Adhesive (2-3 mm joint)</option>
            <option value="traditional">Traditional Cement Sand Mortar (10 mm joint)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Cutting &amp; Breakage Wastage (%)
          </label>
          <input
            type="number"
            min="1"
            max="15"
            step="1"
            value={wastagePercent}
            onChange={(e) => setWastagePercent(parseFloat(e.target.value) || 5)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
        </div>
      </div>

      {/* Results Box */}
      <div className="bg-gradient-to-br from-[#0F2D5C] to-[#163c78] text-white rounded-2xl p-5 sm:p-6 space-y-5 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#F4B400] font-bold">Masonry Estimation Summary</span>
            <h4 className="text-lg font-black text-white">YTONG Blocks &amp; Thin-Bed Mortar Bill</h4>
          </div>
          <div className="text-right">
            <span className="text-xs text-blue-200 block">Total YTONG Blocks Required</span>
            <span className="text-3xl font-mono font-black text-[#F4B400]">{totalBlockCount.toLocaleString()} Blocks</span>
            <span className="text-xs text-slate-300 block">(includes {wastagePercent}% wastage)</span>
          </div>
        </div>

        {/* Quantities Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">Net Masonry Wall Area</span>
            <span className="text-lg font-mono font-bold text-white block mt-0.5">{netAreaM2.toFixed(2)} m²</span>
            <span className="text-[11px] text-slate-300 block">{(netAreaM2 * 10.7639).toFixed(1)} sq ft</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">AAC Masonry Volume</span>
            <span className="text-lg font-mono font-bold text-white block mt-0.5">{wallVolumeM3.toFixed(2)} m³</span>
            <span className="text-[11px] text-slate-300 block">{(wallVolumeM3 * 35.3147).toFixed(1)} CFT</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">Thin-Bed Adhesive (25kg)</span>
            <span className="text-lg font-mono font-bold text-[#F4B400] block mt-0.5">{adhesiveBags25Kg} Bags</span>
            <span className="text-[11px] text-slate-300 block">{totalAdhesiveKg.toFixed(0)} kg total</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3 border border-white/10">
            <span className="text-[11px] text-blue-200 block font-semibold">Estimated Wall Dead Load</span>
            <span className="text-lg font-mono font-bold text-white block mt-0.5">{(estimatedWallWeightKg / 1000).toFixed(2)} Tons</span>
            <span className="text-[11px] text-emerald-300 block">65% lighter than concrete</span>
          </div>

        </div>

        <div className="bg-black/20 rounded-xl p-3.5 border border-white/5 text-xs text-blue-100 leading-relaxed flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-[#F4B400] shrink-0 mt-0.5" />
          <span>
            <strong>Thermal Efficiency Advantage:</strong> YTONG / AAC blocks have a thermal conductivity (λ) of approximately 0.12 W/m·K, delivering up to 3× better thermal insulation than standard clay bricks and 5× better than dense hollow concrete blocks, compliant with Saudi Energy Efficiency Center (SEEC) and ASHRAE 90.1 thermal envelope codes.
          </span>
        </div>
      </div>
    </div>
  );
};

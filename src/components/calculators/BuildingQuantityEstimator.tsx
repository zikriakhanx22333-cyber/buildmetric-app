import React, { useState } from 'react';
import { Building2, Layers, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, DollarSign, Calculator } from 'lucide-react';

export const BuildingQuantityEstimator: React.FC = () => {
  const [unit, setUnit] = useState<'sqft' | 'sqm'>('sqft');
  const [builtUpArea, setBuiltUpArea] = useState<number>(2000); // 2000 sq ft or ~185 sq m
  const [floors, setFloors] = useState<number>(2); // G + 1
  const [structureType, setStructureType] = useState<'rcc' | 'loadbearing'>('rcc');
  const [currency, setCurrency] = useState<string>('USD');

  // Convert area to sq ft for normalized calculation benchmarks
  const totalAreaSqFt = (unit === 'sqft' ? builtUpArea : builtUpArea * 10.7639) * Math.max(1, floors);
  const totalAreaSqM = totalAreaSqFt * 0.092903;

  // Established Civil Engineering Rules of Thumb (per sq ft of built-up area):
  // 1. Cement: ~0.42 bags per sq ft (for RCC frame, structure + masonry + plaster)
  const totalCementBags = Math.round(totalAreaSqFt * (structureType === 'rcc' ? 0.42 : 0.35));
  
  // 2. Steel Rebar: ~3.8 - 4.2 kg per sq ft of built-up area
  const totalSteelKg = Math.round(totalAreaSqFt * (structureType === 'rcc' ? 3.9 : 1.8));
  const totalSteelTons = totalSteelKg / 1000;

  // 3. Sand: ~1.85 CFT per sq ft of built-up area
  const totalSandCft = Math.round(totalAreaSqFt * 1.85);
  const totalSandTons = Math.round((totalSandCft * 45) / 1000); // approx 45 kg/cft

  // 4. Coarse Aggregate: ~1.35 CFT per sq ft
  const totalAggregateCft = Math.round(totalAreaSqFt * 1.35);
  const totalAggregateTons = Math.round((totalAggregateCft * 43) / 1000);

  // 5. Ready-Mix / Site Concrete: ~0.038 m³ (1.34 CFT) per sq ft BUA
  const totalConcreteM3 = Math.round(totalAreaSqFt * 0.038);
  const totalConcreteCft = Math.round(totalConcreteM3 * 35.3147);

  // 6. Bricks / Blocks: ~18 to 22 standard bricks (or ~1.4 standard 200mm blocks) per sq ft BUA
  const totalBricksCount = Math.round(totalAreaSqFt * 19.5);
  const totalBlocksCount = Math.round(totalAreaSqFt * 1.35);

  // 7. Flooring Tiles: Total floor area + 10% wastage + skirtings
  const totalFlooringSqFt = Math.round(totalAreaSqFt * 1.15);
  const totalFlooringSqM = Math.round(totalFlooringSqFt * 0.092903);

  // 8. Paint: Wall area is approx 3.5× floor area. 1 Liter covers ~75 sq ft (2 coats)
  const totalPaintAreaSqFt = Math.round(totalAreaSqFt * 3.5);
  const totalPaintLiters = Math.round(totalPaintAreaSqFt / 75);

  // Approximate Estimated Rates (Normalized in USD, convertable)
  const rateMultipliers: Record<string, number> = {
    USD: 1.0,
    SAR: 3.75,
    AED: 3.67,
    EUR: 0.92,
    GBP: 0.78,
    INR: 83.5,
    PKR: 278.0
  };

  const mult = rateMultipliers[currency] || 1.0;
  // Estimated rough cost per sq ft (grey structure + basic finish): ~ $45 - $65 / sq ft
  const baseCostPerSqFt = structureType === 'rcc' ? 52 : 42;
  const totalEstimatedCost = totalAreaSqFt * baseCostPerSqFt * mult;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0F2D5C] text-xs font-bold mb-1">
            <Building2 className="w-3.5 h-3.5 text-[#F4B400]" />
            <span>Whole-Structure Takeoff Engine</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Building Quantity Estimator &amp; Material Takeoff
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Estimate complete bill of quantities for residential houses, commercial buildings, villas, and apartments based on total built-up area thumb rules.
          </p>
        </div>

        {/* Unit & Currency Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setUnit('sqft')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                unit === 'sqft' ? 'bg-white text-[#0F2D5C] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sq. Feet (sq ft)
            </button>
            <button
              onClick={() => setUnit('sqm')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                unit === 'sqm' ? 'bg-white text-[#0F2D5C] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sq. Meters (m²)
            </button>
          </div>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700 outline-none"
          >
            <option value="USD">USD ($)</option>
            <option value="SAR">SAR (ر.س)</option>
            <option value="AED">AED (د.إ)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
            <option value="PKR">PKR (Rs)</option>
          </select>
        </div>
      </div>

      {/* Input Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Built-Up Area Per Floor ({unit === 'sqft' ? 'sq ft' : 'm²'})
          </label>
          <input
            type="number"
            min="100"
            step="50"
            value={builtUpArea}
            onChange={(e) => setBuiltUpArea(Math.max(50, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Number of Stories / Floors
          </label>
          <input
            type="number"
            min="1"
            max="20"
            step="1"
            value={floors}
            onChange={(e) => setFloors(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">Total Gross BUA: {totalAreaSqFt.toLocaleString()} sq ft ({totalAreaSqM.toFixed(0)} m²)</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Structural Framing System
          </label>
          <select
            value={structureType}
            onChange={(e) => setStructureType(e.target.value as 'rcc' | 'loadbearing')}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold bg-white"
          >
            <option value="rcc">RCC Framed Structure (Columns, Beams &amp; Slabs)</option>
            <option value="loadbearing">Load Bearing Masonry Structure</option>
          </select>
        </div>
      </div>

      {/* Main Results Dashboard */}
      <div className="bg-gradient-to-br from-[#0F2D5C] to-[#163c78] text-white rounded-2xl p-5 sm:p-6 space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#F4B400] font-bold">Estimated Overall Construction Budget</span>
            <h4 className="text-2xl font-black text-white mt-0.5">
              {currency} {totalEstimatedCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </h4>
            <span className="text-xs text-blue-200">
              Avg {currency} {(totalEstimatedCost / totalAreaSqFt).toFixed(1)} / sq ft ({currency} {(totalEstimatedCost / totalAreaSqM).toFixed(1)} / m²)
            </span>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-blue-200 block">Total Built-Up Area</span>
            <span className="text-lg font-mono font-black text-[#F4B400]">{totalAreaSqFt.toLocaleString()} sq ft</span>
            <span className="text-xs text-slate-300 block">({totalAreaSqM.toFixed(1)} m² across {floors} {floors === 1 ? 'floor' : 'floors'})</span>
          </div>
        </div>

        {/* Quantities Table Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          
          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-xs text-blue-200 block font-semibold">Cement Bags (50kg)</span>
            <span className="text-xl font-mono font-black text-white block mt-1">{totalCementBags.toLocaleString()} Bags</span>
            <span className="text-[11px] text-slate-300 block">~{(totalCementBags * 50 / 1000).toFixed(1)} Metric Tons</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-xs text-blue-200 block font-semibold">Reinforcement Steel</span>
            <span className="text-xl font-mono font-black text-[#F4B400] block mt-1">{totalSteelTons.toFixed(2)} Tons</span>
            <span className="text-[11px] text-slate-300 block">{totalSteelKg.toLocaleString()} kg total</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-xs text-blue-200 block font-semibold">Ready-Mix / Cast Concrete</span>
            <span className="text-xl font-mono font-black text-white block mt-1">{totalConcreteM3.toLocaleString()} m³</span>
            <span className="text-[11px] text-slate-300 block">{totalConcreteCft.toLocaleString()} CFT</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-xs text-blue-200 block font-semibold">Concrete Blocks / Bricks</span>
            <span className="text-xl font-mono font-black text-white block mt-1">{totalBlocksCount.toLocaleString()} Blocks</span>
            <span className="text-[11px] text-slate-300 block">or {totalBricksCount.toLocaleString()} Bricks</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-xs text-blue-200 block font-semibold">Fine Sand</span>
            <span className="text-xl font-mono font-black text-white block mt-1">{totalSandCft.toLocaleString()} CFT</span>
            <span className="text-[11px] text-slate-300 block">~{totalSandTons} Metric Tons</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-xs text-blue-200 block font-semibold">Coarse Aggregate</span>
            <span className="text-xl font-mono font-black text-white block mt-1">{totalAggregateCft.toLocaleString()} CFT</span>
            <span className="text-[11px] text-slate-300 block">~{totalAggregateTons} Metric Tons</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-xs text-blue-200 block font-semibold">Flooring Tiles</span>
            <span className="text-xl font-mono font-black text-white block mt-1">{totalFlooringSqFt.toLocaleString()} sq ft</span>
            <span className="text-[11px] text-slate-300 block">~{totalFlooringSqM} m² (with 15% wastage)</span>
          </div>

          <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
            <span className="text-xs text-blue-200 block font-semibold">Wall Paint (Primer + 2 Coats)</span>
            <span className="text-xl font-mono font-black text-white block mt-1">{totalPaintLiters.toLocaleString()} Liters</span>
            <span className="text-[11px] text-slate-300 block">~{(totalPaintLiters / 3.785).toFixed(0)} US Gallons</span>
          </div>

        </div>
      </div>
    </div>
  );
};

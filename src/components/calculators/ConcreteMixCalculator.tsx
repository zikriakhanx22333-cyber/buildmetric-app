import React, { useState } from 'react';
import { ConcreteMixInputs, ConcreteMixResults } from '../../types';
import { calculateConcreteMix } from '../../utils/calculatorLogic';
import { Copy, Check, Printer, RotateCcw, ChevronDown, ChevronUp, Beaker } from 'lucide-react';

export const ConcreteMixCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ConcreteMixInputs>({
    volume: 100,
    unit: 'cft',
    mixGrade: 'M20',
    waterCementRatio: 0.5,
    wastagePercent: 5
  });

  const [copied, setCopied] = useState(false);
  const [showFormulas, setShowFormulas] = useState(true);

  const results: ConcreteMixResults = calculateConcreteMix(inputs);

  const handleChange = (field: keyof ConcreteMixInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      volume: 100,
      unit: 'cft',
      mixGrade: 'M20',
      waterCementRatio: 0.5,
      wastagePercent: 5
    });
  };

  const handleCopy = () => {
    const text = `
BuildMetric - Custom Concrete Mix Design Calculation:
---------------------------------------------------
Batch Volume: ${inputs.volume} ${inputs.unit.toUpperCase()}
Concrete Grade: ${inputs.mixGrade} (Ratio ${results.proportions.cement}:${results.proportions.sand}:${results.proportions.aggregate})
Water-Cement Ratio: ${inputs.waterCementRatio}
Cement Bags (50kg): ${results.cementBags} Bags (${results.cementWeightKg} kg)
Sand Quantity: ${results.sandCft} CFT (${results.sandWeightKg} kg)
Coarse Aggregate: ${results.aggregateCft} CFT (${results.aggregateWeightKg} kg)
Water Required: ${results.waterLiters} Liters
---------------------------------------------------
Calculated via BuildMetric (https://buildmetric-app.vercel.app)
`;
    navigator.clipboard.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#0F2D5C] text-white p-6 rounded-2xl shadow-md border-b-4 border-[#F4B400]">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-[#F4B400] rounded-xl text-[#0F2D5C]">
            <Beaker className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Concrete Mix Proportion Calculator</h2>
            <p className="text-blue-100 text-sm">Design mix proportions and calculate water-cement ratios for M5 to M30 grades</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F2D5C]"></span>
              Batch Specifications
            </h3>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-[#0F2D5C] flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg hover:bg-slate-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Inputs
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Total Concrete Volume
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={inputs.volume}
                  onChange={e => handleChange('volume', Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
                />
                <select
                  value={inputs.unit}
                  onChange={e => handleChange('unit', e.target.value)}
                  className="px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
                >
                  <option value="cft">CFT</option>
                  <option value="cum">m³</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Concrete Mix Grade
              </label>
              <select
                value={inputs.mixGrade}
                onChange={e => handleChange('mixGrade', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              >
                <option value="M5">M5 (1 : 5 : 10)</option>
                <option value="M7.5">M7.5 (1 : 4 : 8)</option>
                <option value="M10">M10 (1 : 3 : 6)</option>
                <option value="M15">M15 (1 : 2 : 4)</option>
                <option value="M20">M20 (1 : 1.5 : 3) Standard RCC</option>
                <option value="M25">M25 (1 : 1 : 2) Heavy Duty</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Water-Cement Ratio (W/C)
              </label>
              <input
                type="number"
                min="0.3"
                max="0.8"
                step="0.05"
                value={inputs.waterCementRatio}
                onChange={e => handleChange('waterCementRatio', Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Wastage Allowance (%)
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={inputs.wastagePercent}
                onChange={e => handleChange('wastagePercent', Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-[#F4B400] text-lg uppercase tracking-wider">
                Mix Ingredients Batching
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-5">
              <div className="bg-[#0F2D5C] p-3.5 rounded-xl border border-blue-900/60">
                <div className="text-[10px] text-blue-200 uppercase font-bold">Cement</div>
                <div className="text-2xl font-extrabold text-[#F4B400] mt-1">{results.cementBags}</div>
                <div className="text-[10px] text-blue-300">Bags ({results.cementWeightKg} kg)</div>
              </div>

              <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Sand</div>
                <div className="text-2xl font-extrabold text-white mt-1">{results.sandCft}</div>
                <div className="text-[10px] text-slate-400">CFT ({results.sandWeightKg} kg)</div>
              </div>

              <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Aggregate</div>
                <div className="text-2xl font-extrabold text-white mt-1">{results.aggregateCft}</div>
                <div className="text-[10px] text-slate-400">CFT ({results.aggregateWeightKg} kg)</div>
              </div>
            </div>

            <div className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Water Batch Requirement:</span>
                <span className="font-bold text-[#F4B400]">{results.waterLiters} Liters</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Mix Proportions (C : S : A):</span>
                <span className="font-bold text-white">1 : {results.proportions.sand} : {results.proportions.aggregate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => setShowFormulas(!showFormulas)}
          className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left font-bold text-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F4B400]"></span>
            Calculation Steps
          </span>
          {showFormulas ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
        </button>

        {showFormulas && (
          <div className="p-6 border-t border-slate-200 text-xs font-mono space-y-1.5 bg-slate-50">
            {results.steps.map((step, idx) => (
              <div key={idx} className="text-slate-700">{step}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

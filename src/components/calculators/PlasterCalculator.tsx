import React, { useState } from 'react';
import { PlasterInputs, PlasterResults } from '../../types';
import { calculatePlaster } from '../../utils/calculatorLogic';
import { Copy, Check, Printer, RotateCcw, ChevronDown, ChevronUp, Calculator } from 'lucide-react';

export const PlasterCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<PlasterInputs>({
    wallLength: 20,
    wallHeight: 10,
    thicknessMm: 12,
    mixRatio: '1:4',
    wastagePercent: 5,
    unit: 'feet'
  });

  const [copied, setCopied] = useState(false);
  const [showFormulas, setShowFormulas] = useState(true);

  const results: PlasterResults = calculatePlaster(inputs);

  const handleChange = (field: keyof PlasterInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      wallLength: 20,
      wallHeight: 10,
      thicknessMm: 12,
      mixRatio: '1:4',
      wastagePercent: 5,
      unit: 'feet'
    });
  };

  const handleCopy = () => {
    const text = `
BuildMetric - Wall Plaster Calculation Results:
---------------------------------------------
Wall Dimensions: ${inputs.wallLength} × ${inputs.wallHeight} ${inputs.unit} (${inputs.thicknessMm}mm thickness)
Plaster Mix Ratio: ${inputs.mixRatio}
Plaster Surface Area: ${results.plasterAreaSqFt} sq ft (${results.plasterAreaSqM} sq m)
Wet Mortar Volume: ${results.wetMortarVolumeCft} CFT
Dry Mortar Volume (1.33 factor): ${results.dryMortarVolumeCft} CFT
Cement Required (50kg bags): ${results.cementBags} Bags
Sand Required: ${results.sandCft} CFT (~${results.sandTons} Metric Tons)
Wastage Allowance: ${inputs.wastagePercent}%
---------------------------------------------
Calculated via BuildMetric (https://buildmetric.app)
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
      {/* Header Banner */}
      <div className="bg-[#0F2D5C] text-white p-6 rounded-2xl shadow-md border-b-4 border-[#F4B400]">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-[#F4B400] rounded-xl text-[#0F2D5C]">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Wall Plaster Cement & Sand Calculator</h2>
            <p className="text-blue-100 text-sm">Calculate cement bags and sand CFT for interior/exterior wall plastering</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Controls Card */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F2D5C]"></span>
              Wall & Plaster Inputs
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
                Unit System
              </label>
              <select
                value={inputs.unit}
                onChange={e => handleChange('unit', e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              >
                <option value="feet">Feet (ft)</option>
                <option value="meters">Meters (m)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Plaster Thickness (mm)
              </label>
              <select
                value={inputs.thicknessMm}
                onChange={e => handleChange('thicknessMm', Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              >
                <option value={6}>6 mm (Ceiling plaster)</option>
                <option value={12}>12 mm (Standard Internal Wall)</option>
                <option value={15}>15 mm (Brick Wall Rough Finish)</option>
                <option value={18}>18 mm (External First Coat)</option>
                <option value={20}>20 mm (External Double Coat)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Wall Length ({inputs.unit})
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.wallLength}
                onChange={e => handleChange('wallLength', Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Wall Height ({inputs.unit})
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.wallHeight}
                onChange={e => handleChange('wallHeight', Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Plaster Mix Ratio
              </label>
              <select
                value={inputs.mixRatio}
                onChange={e => handleChange('mixRatio', e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              >
                <option value="1:3">1:3 (Rich Ceiling/Waterproof)</option>
                <option value="1:4">1:4 (Standard Internal Plaster)</option>
                <option value="1:5">1:5 (Internal Wall Secondary)</option>
                <option value="1:6">1:6 (External Rough Plaster)</option>
              </select>
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

        {/* Results Card */}
        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-[#F4B400] text-lg uppercase tracking-wider">
                Plastering Material Requirements
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

            {/* Primary KPI Highlight */}
            <div className="grid grid-cols-2 gap-4 my-5">
              <div className="bg-[#0F2D5C] p-4 rounded-xl border border-blue-900/60">
                <div className="text-xs text-blue-200 uppercase font-semibold">Cement Required</div>
                <div className="text-3xl font-extrabold text-[#F4B400] mt-1">{results.cementBags}</div>
                <div className="text-xs text-blue-300 mt-0.5">50kg Bags</div>
              </div>

              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400 uppercase font-semibold">Sand Required</div>
                <div className="text-3xl font-extrabold text-white mt-1">{results.sandCft}</div>
                <div className="text-xs text-slate-400 mt-0.5">CFT (~{results.sandTons} Tons)</div>
              </div>
            </div>

            {/* Detailed Metrics List */}
            <div className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Wall Plaster Area:</span>
                <span className="font-bold text-white">{results.plasterAreaSqFt} sq ft ({results.plasterAreaSqM} sq m)</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Wet Mortar Volume:</span>
                <span className="font-bold text-white">{results.wetMortarVolumeCft} CFT</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-400">Dry Mortar Volume (1.33 factor):</span>
                <span className="font-bold text-[#F4B400]">{results.dryMortarVolumeCft} CFT</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400 text-center">
            Standard 1.33 dry volume factor applied for cement mortar expansion.
          </div>
        </div>
      </div>

      {/* Formula & Assumptions Expandable Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <button
          onClick={() => setShowFormulas(!showFormulas)}
          className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left font-bold text-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F4B400]"></span>
            Formula & Engineering Step-by-Step Breakdown
          </span>
          {showFormulas ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
        </button>

        {showFormulas && (
          <div className="p-6 border-t border-slate-200 text-sm text-slate-700 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <div className="font-bold text-[#0F2D5C] mb-1">Dry Volume Factor (1.33)</div>
                <p className="text-xs text-slate-600">
                  When wet mortar dries and fills voids in the brick wall joint matrix, volume shrinks. We apply a 1.33 multiplier to wet mortar volume.
                </p>
              </div>

              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                <div className="font-bold text-amber-900 mb-1">Cement Bag Volume</div>
                <p className="text-xs text-slate-600">
                  1 standard 50 kg bag of Portland cement equals exactly 1.226 cubic feet (CFT) or 0.0347 cubic meters.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 font-mono text-xs">
              <div className="font-bold text-slate-900 mb-2 font-sans">Step-by-Step Calculation Steps:</div>
              {results.steps.map((step, idx) => (
                <div key={idx} className="text-slate-700">{step}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

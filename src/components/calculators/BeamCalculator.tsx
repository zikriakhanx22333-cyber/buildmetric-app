import React, { useState } from 'react';
import { BeamInputs, BeamResults } from '../../types';
import { calculateBeam } from '../../utils/calculatorLogic';
import { Copy, Check, Printer, RotateCcw, ChevronDown, ChevronUp, Boxes } from 'lucide-react';

export const BeamCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<BeamInputs>({
    numberOfBeams: 4,
    width: 9, // 9 inches
    depth: 12, // 12 inches
    length: 20, // 20 feet
    unit: 'in',
    mixRatio: 'M20',
    wastagePercent: 5
  });

  const [copied, setCopied] = useState(false);
  const [showFormulas, setShowFormulas] = useState(true);

  const normalizedInputs: BeamInputs = {
    ...inputs,
    width: inputs.unit === 'in' ? inputs.width / 12 : inputs.width,
    depth: inputs.unit === 'in' ? inputs.depth / 12 : inputs.depth,
    length: inputs.length,
    unit: 'ft'
  };

  const results: BeamResults = calculateBeam(normalizedInputs);

  const handleChange = (field: keyof BeamInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      numberOfBeams: 4,
      width: 9,
      depth: 12,
      length: 20,
      unit: 'in',
      mixRatio: 'M20',
      wastagePercent: 5
    });
  };

  const handleCopy = () => {
    const text = `
BuildMetric - Beam Concrete Calculation Results:
-----------------------------------------------
Number of Beams: ${inputs.numberOfBeams}
Beam Cross-Section: ${inputs.width} × ${inputs.depth} ${inputs.unit}
Beam Length: ${inputs.length} ft
Mix Grade: ${inputs.mixRatio}
Total Wet Concrete: ${results.totalWetVolumeCft} CFT (${results.totalWetVolumeCum} m³)
Dry Volume (1.54 factor): ${results.dryVolumeCft} CFT
Cement Required: ${results.cementBags} Bags (50kg)
Sand Required: ${results.sandCft} CFT
Coarse Aggregate: ${results.aggregateCft} CFT
-----------------------------------------------
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
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Beam Concrete & Material Calculator</h2>
            <p className="text-blue-100 text-sm">Calculate concrete, cement bags, sand, and aggregate for plinth and roof beams</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F2D5C]"></span>
              Beam Dimensions
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
                Cross-Section Unit
              </label>
              <select
                value={inputs.unit}
                onChange={e => handleChange('unit', e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              >
                <option value="in">Inches (in)</option>
                <option value="ft">Feet (ft)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Number of Beams
              </label>
              <input
                type="number"
                min="1"
                value={inputs.numberOfBeams}
                onChange={e => handleChange('numberOfBeams', Math.max(1, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Width ({inputs.unit})
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.width}
                onChange={e => handleChange('width', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Depth ({inputs.unit})
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.depth}
                onChange={e => handleChange('depth', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Length (ft)
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.length}
                onChange={e => handleChange('length', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Mix Grade
              </label>
              <select
                value={inputs.mixRatio}
                onChange={e => handleChange('mixRatio', e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              >
                <option value="M15">M15 (1 : 2 : 4)</option>
                <option value="M20">M20 (1 : 1.5 : 3) Standard</option>
                <option value="M25">M25 (1 : 1 : 2)</option>
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

        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-[#F4B400] text-lg uppercase tracking-wider">
                Beam Concrete Output
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
                <div className="text-[10px] text-blue-300">Bags</div>
              </div>

              <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Sand</div>
                <div className="text-2xl font-extrabold text-white mt-1">{results.sandCft}</div>
                <div className="text-[10px] text-slate-400">CFT</div>
              </div>

              <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Aggregate</div>
                <div className="text-2xl font-extrabold text-white mt-1">{results.aggregateCft}</div>
                <div className="text-[10px] text-slate-400">CFT</div>
              </div>
            </div>

            <div className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Total Wet Concrete Vol:</span>
                <span className="font-bold text-white">{results.totalWetVolumeCft} CFT ({results.totalWetVolumeCum} m³)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Dry Volume (1.54 factor):</span>
                <span className="font-bold text-[#F4B400]">{results.dryVolumeCft} CFT</span>
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

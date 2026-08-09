import React, { useState } from 'react';
import { BackfillInputs, BackfillResults } from '../../types';
import { calculateBackfill } from '../../utils/calculatorLogic';
import { Copy, Check, Printer, RotateCcw, ChevronDown, ChevronUp, Shovel } from 'lucide-react';

export const BackfillCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<BackfillInputs>({
    length: 20,
    width: 15,
    depth: 4,
    compactionPercent: 15,
    unit: 'ft'
  });

  const [copied, setCopied] = useState(false);
  const [showFormulas, setShowFormulas] = useState(true);

  const results: BackfillResults = calculateBackfill(inputs);

  const handleChange = (field: keyof BackfillInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      length: 20,
      width: 15,
      depth: 4,
      compactionPercent: 15,
      unit: 'ft'
    });
  };

  const handleCopy = () => {
    const text = `
BuildMetric - Soil Backfill & Compaction Calculation:
---------------------------------------------------
Trench/Void Dimensions: ${inputs.length} × ${inputs.width} × ${inputs.depth} ${inputs.unit}
Void Space Volume: ${results.rawVolumeCft} CFT (${results.rawVolumeCum} m³)
Compaction & Shrinkage Buffer: ${inputs.compactionPercent}%
Required Loose Backfill Material: ${results.requiredBackfillCft} CFT (${results.requiredBackfillCum} m³)
---------------------------------------------------
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
      <div className="bg-[#0F2D5C] text-white p-6 rounded-2xl shadow-md border-b-4 border-[#F4B400]">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-[#F4B400] rounded-xl text-[#0F2D5C]">
            <Shovel className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Soil Backfill & Compaction Calculator</h2>
            <p className="text-blue-100 text-sm">Estimate loose soil/gravel required to fill foundation voids with compaction shrinkage</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F2D5C]"></span>
              Void Dimensions
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
                <option value="ft">Feet (ft)</option>
                <option value="m">Meters (m)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Compaction Factor (%)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={inputs.compactionPercent}
                onChange={e => handleChange('compactionPercent', Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Length ({inputs.unit})
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
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-[#F4B400] text-lg uppercase tracking-wider">
                Backfill Requirement Summary
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

            <div className="my-5 p-5 bg-[#0F2D5C] rounded-2xl border border-blue-900/60 flex items-center justify-between">
              <div>
                <div className="text-xs text-blue-200 uppercase font-bold tracking-wider">Loose Soil Required</div>
                <div className="text-4xl font-extrabold text-[#F4B400] mt-1">{results.requiredBackfillCft}</div>
                <div className="text-xs text-blue-300 mt-1">CFT (incl. {inputs.compactionPercent}% compaction)</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-200 uppercase font-semibold">Cubic Meters</div>
                <div className="text-2xl font-bold text-white mt-1">{results.requiredBackfillCum}</div>
                <div className="text-xs text-blue-300">m³</div>
              </div>
            </div>

            <div className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-sm">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Net Trench Void Volume:</span>
                <span className="font-bold text-white">{results.rawVolumeCft} CFT ({results.rawVolumeCum} m³)</span>
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

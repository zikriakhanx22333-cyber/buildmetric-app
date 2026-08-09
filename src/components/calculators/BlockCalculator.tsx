import React, { useState } from 'react';
import { BlockInputs, BlockResults } from '../../types';
import { calculateBlock } from '../../utils/calculatorLogic';
import { Copy, Check, Printer, RotateCcw, ChevronDown, ChevronUp, Building2 } from 'lucide-react';

export const BlockCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<BlockInputs>({
    wallLength: 30,
    wallHeight: 10,
    wallThickness: 0.67, // ~8 inches
    wallUnit: 'ft',
    blockLength: 400, // 400mm / 16in
    blockHeight: 200, // 200mm / 8in
    blockWidth: 200,  // 200mm / 8in
    blockUnit: 'mm',
    mortarJointMm: 10,
    wastagePercent: 5
  });

  const [copied, setCopied] = useState(false);
  const [showFormulas, setShowFormulas] = useState(true);

  const results: BlockResults = calculateBlock(inputs);

  const handleChange = (field: keyof BlockInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      wallLength: 30,
      wallHeight: 10,
      wallThickness: 0.67,
      wallUnit: 'ft',
      blockLength: 400,
      blockHeight: 200,
      blockWidth: 200,
      blockUnit: 'mm',
      mortarJointMm: 10,
      wastagePercent: 5
    });
  };

  const handleCopy = () => {
    const text = `
BuildMetric - Concrete Block Calculation Results:
------------------------------------------------
Wall Dimensions: ${inputs.wallLength} × ${inputs.wallHeight} ${inputs.wallUnit}
Block Size: ${inputs.blockLength} × ${inputs.blockHeight} × ${inputs.blockWidth} ${inputs.blockUnit}
Mortar Joint: ${inputs.mortarJointMm} mm
Gross Wall Volume: ${results.wallVolumeCft} CFT (${results.wallVolumeCum} m³)
Base Blocks Required: ${results.blocksRequired} pcs
Wastage Allowance (${inputs.wastagePercent}%): +${results.wastageBlocks} pcs
Total Concrete Blocks Required: ${results.totalBlocksRequired} pcs
Estimated Mortar Volume: ${results.approxMortarVolumeCft} CFT
------------------------------------------------
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
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Concrete Block (CMU) Calculator</h2>
            <p className="text-blue-100 text-sm">Calculate hollow or solid concrete blocks and mortar volume for masonry walls</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F2D5C]"></span>
              Wall & Block Inputs
            </h3>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-[#0F2D5C] flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg hover:bg-slate-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Inputs
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Wall Length ({inputs.wallUnit})
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.wallLength}
                onChange={e => handleChange('wallLength', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Wall Height ({inputs.wallUnit})
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.wallHeight}
                onChange={e => handleChange('wallHeight', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Wall Thickness ({inputs.wallUnit})
              </label>
              <input
                type="number"
                min="0.01"
                step="any"
                value={inputs.wallThickness}
                onChange={e => handleChange('wallThickness', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Block Length ({inputs.blockUnit})
              </label>
              <input
                type="number"
                min="1"
                value={inputs.blockLength}
                onChange={e => handleChange('blockLength', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Block Height ({inputs.blockUnit})
              </label>
              <input
                type="number"
                min="1"
                value={inputs.blockHeight}
                onChange={e => handleChange('blockHeight', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Block Width ({inputs.blockUnit})
              </label>
              <input
                type="number"
                min="1"
                value={inputs.blockWidth}
                onChange={e => handleChange('blockWidth', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Mortar Joint Thickness (mm)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={inputs.mortarJointMm}
                onChange={e => handleChange('mortarJointMm', Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Wastage Buffer (%)
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
                Block Requirement Summary
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
                <div className="text-xs text-blue-200 uppercase font-bold tracking-wider">Total Blocks Required</div>
                <div className="text-4xl font-extrabold text-[#F4B400] mt-1">{results.totalBlocksRequired}</div>
                <div className="text-xs text-blue-300 mt-1">Pieces (incl. {inputs.wastagePercent}% wastage)</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-200 uppercase font-semibold">Mortar Vol</div>
                <div className="text-2xl font-bold text-white mt-1">{results.approxMortarVolumeCft}</div>
                <div className="text-xs text-blue-300">CFT</div>
              </div>
            </div>

            <div className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Gross Wall Volume:</span>
                <span className="font-bold text-white">{results.wallVolumeCft} CFT ({results.wallVolumeCum} m³)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Net Base Blocks (Exact):</span>
                <span className="font-bold text-[#F4B400]">{results.blocksRequired} pcs</span>
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

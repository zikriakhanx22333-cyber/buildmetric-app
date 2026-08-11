import React, { useState } from 'react';
import { FlooringInputs, FlooringResults } from '../../types';
import { calculateFlooring } from '../../utils/calculatorLogic';
import { Copy, Check, Printer, RotateCcw, ChevronDown, ChevronUp, Grid } from 'lucide-react';

export const FlooringCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<FlooringInputs>({
    roomLength: 15,
    roomWidth: 12,
    roomUnit: 'ft',
    pieceLength: 2,
    pieceWidth: 2,
    pieceUnit: 'ft',
    wastagePercent: 10
  });

  const [copied, setCopied] = useState(false);
  const [showFormulas, setShowFormulas] = useState(true);

  const results: FlooringResults = calculateFlooring(inputs);

  const handleChange = (field: keyof FlooringInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      roomLength: 15,
      roomWidth: 12,
      roomUnit: 'ft',
      pieceLength: 2,
      pieceWidth: 2,
      pieceUnit: 'ft',
      wastagePercent: 10
    });
  };

  const handleCopy = () => {
    const text = `
BuildMetric - Flooring Material Calculation Results:
---------------------------------------------------
Room Dimensions: ${inputs.roomLength} × ${inputs.roomWidth} ${inputs.roomUnit}
Flooring Piece Size: ${inputs.pieceLength} × ${inputs.pieceWidth} ${inputs.pieceUnit}
Total Floor Surface Area: ${results.floorAreaSqFt} sq ft (${results.floorAreaSqM} sq m)
Net Pieces Required: ${results.rawPiecesNeeded} pieces
Wastage Allowance (${inputs.wastagePercent}%): +${results.wastagePieces} pieces
Total Pieces Required: ${results.totalPiecesRequired} pieces
Total Area with Wastage: ${results.totalAreaWithWastageSqFt} sq ft
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
      {/* Header Banner */}
      <div className="bg-[#0F2D5C] text-white p-6 rounded-2xl shadow-md border-b-4 border-[#F4B400]">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-[#F4B400] rounded-xl text-[#0F2D5C]">
            <Grid className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Flooring Material Piece Calculator</h2>
            <p className="text-blue-100 text-sm">Calculate floor tile, hardwood plank, or vinyl piece requirements</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Controls Card */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F2D5C]"></span>
              Room & Material Specs
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
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">
                Room Length & Width
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={inputs.roomLength}
                  onChange={e => handleChange('roomLength', Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
                  placeholder="Length"
                />
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={inputs.roomWidth}
                  onChange={e => handleChange('roomWidth', Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
                  placeholder="Width"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">
                Room Unit
              </label>
              <select
                value={inputs.roomUnit}
                onChange={e => handleChange('roomUnit', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              >
                <option value="ft">Feet (ft)</option>
                <option value="m">Meters (m)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">
                Piece Size (Length × Width)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={inputs.pieceLength}
                  onChange={e => handleChange('pieceLength', Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
                  placeholder="Len"
                />
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={inputs.pieceWidth}
                  onChange={e => handleChange('pieceWidth', Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
                  placeholder="Wid"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wider">
                Piece Unit
              </label>
              <select
                value={inputs.pieceUnit}
                onChange={e => handleChange('pieceUnit', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              >
                <option value="ft">Feet (ft)</option>
                <option value="in">Inches (in)</option>
                <option value="m">Meters (m)</option>
                <option value="cm">Centimeters (cm)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
              Wastage & Cut Buffer (%)
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

        {/* Results Card */}
        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-[#F4B400] text-lg uppercase tracking-wider">
                Flooring Estimation Summary
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
            <div className="my-5 p-5 bg-[#0F2D5C] rounded-2xl border border-blue-900/60 flex items-center justify-between">
              <div>
                <div className="text-xs text-blue-200 uppercase font-bold tracking-wider">Total Pieces Needed</div>
                <div className="text-4xl font-extrabold text-[#F4B400] mt-1">{results.totalPiecesRequired}</div>
                <div className="text-xs text-blue-300 mt-1">Includes {inputs.wastagePercent}% wastage buffer</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-200 uppercase font-semibold">Total Area</div>
                <div className="text-2xl font-bold text-white mt-1">{results.totalAreaWithWastageSqFt}</div>
                <div className="text-xs text-blue-300">sq ft</div>
              </div>
            </div>

            {/* Detailed Metrics List */}
            <div className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Net Floor Surface Area:</span>
                <span className="font-bold text-white">{results.floorAreaSqFt} sq ft ({results.floorAreaSqM} sq m)</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Single Piece Coverage:</span>
                <span className="font-bold text-white">{results.singlePieceAreaSqFt} sq ft</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-slate-400">Net Pieces (Exact):</span>
                <span className="font-bold text-[#F4B400]">{results.rawPiecesNeeded} pieces</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formula & Assumptions Card */}
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

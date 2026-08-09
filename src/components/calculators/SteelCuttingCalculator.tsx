import React, { useState } from 'react';
import { SteelCuttingInputs, SteelCuttingResults } from '../../types';
import { calculateSteelCutting } from '../../utils/calculatorLogic';
import { Copy, Check, Printer, RotateCcw, ChevronDown, ChevronUp, Scissors } from 'lucide-react';

export const SteelCuttingCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<SteelCuttingInputs>({
    numberOfBars: 20,
    barLengthMeters: 12,
    diameterMm: 16,
    lapLengthMeters: 0.8, // 50d ~ 0.8m for 16mm
    numberOfLaps: 1
  });

  const [copied, setCopied] = useState(false);
  const [showFormulas, setShowFormulas] = useState(true);

  const results: SteelCuttingResults = calculateSteelCutting(inputs);

  const handleChange = (field: keyof SteelCuttingInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      numberOfBars: 20,
      barLengthMeters: 12,
      diameterMm: 16,
      lapLengthMeters: 0.8,
      numberOfLaps: 1
    });
  };

  const handleCopy = () => {
    const text = `
BuildMetric - Steel Bar Cutting & Lap Schedule:
----------------------------------------------
Number of Rebar Pieces: ${inputs.numberOfBars}
Diameter: ${inputs.diameterMm} mm
Base Bar Length: ${inputs.barLengthMeters} m
Laps per Bar: ${inputs.numberOfLaps} × ${inputs.lapLengthMeters} m
Total Cut Length: ${results.totalBarLengthMeters} meters
Unit Weight (D²/162.2): ${results.weightPerMeterKg} kg/m
Total Reinforcement Weight: ${results.totalWeightKg} kg (${results.totalWeightTons} Metric Tons)
----------------------------------------------
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
            <Scissors className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Steel Bar Cutting & Lap Length Calculator</h2>
            <p className="text-blue-100 text-sm">Calculate total cut rebar length including lapping splices and total steel tonnage</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F2D5C]"></span>
              Bar Schedule Inputs
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
                Rebar Diameter (mm)
              </label>
              <select
                value={inputs.diameterMm}
                onChange={e => handleChange('diameterMm', Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              >
                <option value={8}>8 mm</option>
                <option value={10}>10 mm</option>
                <option value={12}>12 mm</option>
                <option value={16}>16 mm</option>
                <option value={20}>20 mm</option>
                <option value={25}>25 mm</option>
                <option value={32}>32 mm</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Number of Bars
              </label>
              <input
                type="number"
                min="1"
                value={inputs.numberOfBars}
                onChange={e => handleChange('numberOfBars', Math.max(1, Number(e.target.value)))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Bar Length (m)
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.barLengthMeters}
                onChange={e => handleChange('barLengthMeters', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Lap Length (m)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={inputs.lapLengthMeters}
                onChange={e => handleChange('lapLengthMeters', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Laps Count
              </label>
              <input
                type="number"
                min="0"
                value={inputs.numberOfLaps}
                onChange={e => handleChange('numberOfLaps', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-[#F4B400] text-lg uppercase tracking-wider">
                Steel Cutting Output
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
                <div className="text-xs text-blue-200 uppercase font-bold tracking-wider">Total Steel Weight</div>
                <div className="text-4xl font-extrabold text-[#F4B400] mt-1">{results.totalWeightKg}</div>
                <div className="text-xs text-blue-300 mt-1">Kilograms (kg)</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-200 uppercase font-semibold">Metric Tons</div>
                <div className="text-2xl font-bold text-white mt-1">{results.totalWeightTons}</div>
                <div className="text-xs text-blue-300">Tons</div>
              </div>
            </div>

            <div className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Total Bar Cut Length:</span>
                <span className="font-bold text-white">{results.totalBarLengthMeters} meters</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Unit Weight (D²/162.2):</span>
                <span className="font-bold text-[#F4B400]">{results.weightPerMeterKg} kg/m</span>
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

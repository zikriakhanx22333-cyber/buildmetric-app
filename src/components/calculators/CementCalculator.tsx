import React, { useState } from 'react';
import { CementInputs, CementResults } from '../../types';
import { calculateCement, MIX_RATIOS } from '../../utils/calculatorLogic';
import { RotateCcw, Copy, Printer, Check, Box, Sparkles } from 'lucide-react';
import { PrintModal } from '../PrintModal';

export const CementCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CementInputs>({
    concreteVolume: 100,
    volumeUnit: 'cft',
    mixRatio: 'M20',
  });

  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handleChange = (field: keyof CementInputs, val: any) => {
    setInputs(prev => ({ ...prev, [field]: val }));
  };

  const results: CementResults = calculateCement(inputs);

  const getResultsText = () => {
    return `Cement Bag Calculation (BuildMetric):
- Concrete Volume: ${inputs.concreteVolume} ${inputs.volumeUnit.toUpperCase()}
- Mix Grade: ${inputs.mixRatio}
- Dry Volume: ${results.dryVolume} CFT
- Cement Bags (50kg): ${results.cementBags} Bags
- Cement Weight: ${results.cementKg} kg`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getResultsText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const printTableData = [
    { label: 'Concrete Volume', value: inputs.concreteVolume, unit: inputs.volumeUnit.toUpperCase() },
    { label: 'Selected Mix Grade', value: inputs.mixRatio },
    { label: 'Dry Volume (1.54 factor)', value: results.dryVolume, unit: 'CFT' },
    { label: 'Cement Bags (50kg)', value: results.cementBags, unit: 'Bags' },
    { label: 'Total Cement Weight', value: results.cementKg, unit: 'kg' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-[#0F2D5C]" />
              <h3 className="font-bold text-slate-900 text-lg">Cement Volume Inputs</h3>
            </div>
            <button
              onClick={() => setInputs({ concreteVolume: 100, volumeUnit: 'cft', mixRatio: 'M20' })}
              className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg"
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Concrete Volume
              </label>
              <input
                type="number"
                min="0.1"
                value={inputs.concreteVolume}
                onChange={(e) => handleChange('concreteVolume', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Volume Unit
              </label>
              <select
                value={inputs.volumeUnit}
                onChange={(e) => handleChange('volumeUnit', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-white"
              >
                <option value="cft">Cubic Feet (CFT)</option>
                <option value="cum">Cubic Meters (CUM / m³)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Concrete Grade
            </label>
            <select
              value={inputs.mixRatio}
              onChange={(e) => handleChange('mixRatio', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-white"
            >
              <option value="M20">M20 (1 : 1.5 : 3) - Slab/Beam</option>
              <option value="M25">M25 (1 : 1 : 2) - Columns/Footings</option>
              <option value="M15">M15 (1 : 2 : 4) - Paving</option>
              <option value="M10">M10 (1 : 3 : 6) - Plain Leveling</option>
            </select>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border-2 border-[#0F2D5C] p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="font-black text-slate-900 text-xl">Cement Bags Schedule</h3>
              <div className="flex items-center gap-2">
                <button onClick={handleCopy} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200">
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button onClick={() => setShowPrintModal(true)} className="p-2 rounded-xl bg-[#0F2D5C] text-[#F4B400]">
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#0F2D5C] to-[#163c78] rounded-2xl p-5 text-white shadow-md flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-semibold text-slate-300">Total Cement Bags</span>
                <div className="text-4xl font-black text-[#F4B400] mt-1">
                  {results.cementBags} <span className="text-lg font-bold text-white">Bags</span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">Total Weight: {results.cementKg} kg</div>
              </div>
              <Box className="w-10 h-10 text-[#F4B400]" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block">Sand Co-Requirement</span>
                <span className="text-lg font-black text-slate-900">{results.sandCft} CFT</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block">Aggregate Co-Requirement</span>
                <span className="text-lg font-black text-slate-900">{results.aggregateCft} CFT</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0F2D5C]" />
          <span>Derivation Steps</span>
        </h4>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-xs text-slate-700 space-y-1">
          {results.steps.map((s, i) => <div key={i}>{s}</div>)}
        </div>
      </div>

      {showPrintModal && (
        <PrintModal
          title="Cement Bag Estimation Sheet"
          summaryText={`Cement calculations for ${inputs.concreteVolume} ${inputs.volumeUnit} concrete.`}
          steps={results.steps}
          resultsTable={printTableData}
          onClose={() => setShowPrintModal(false)}
          onCopy={handleCopy}
          copied={copied}
        />
      )}
    </div>
  );
};

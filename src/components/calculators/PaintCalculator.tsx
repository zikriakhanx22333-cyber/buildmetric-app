import React, { useState } from 'react';
import { PaintInputs, PaintResults } from '../../types';
import { calculatePaint } from '../../utils/calculatorLogic';
import { RotateCcw, Copy, Printer, Check, Paintbrush, Sparkles } from 'lucide-react';
import { PrintModal } from '../PrintModal';

export const PaintCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<PaintInputs>({
    wallLength: 16,
    wallHeight: 10,
    numberOfWalls: 4,
    wallUnit: 'feet',
    deductionAreaSqFt: 40, // doors & windows
    coverageSqFtPerLiter: 100, // standard 1 coat coverage
    numberOfCoats: 2,
    primerCoats: 1,
  });

  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handleChange = (field: keyof PaintInputs, val: any) => {
    setInputs(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    setInputs({
      wallLength: 16,
      wallHeight: 10,
      numberOfWalls: 4,
      wallUnit: 'feet',
      deductionAreaSqFt: 40,
      coverageSqFtPerLiter: 100,
      numberOfCoats: 2,
      primerCoats: 1,
    });
  };

  const results: PaintResults = calculatePaint(inputs);

  const getResultsText = () => {
    return `Wall Paint Estimation Results (BuildMetric):
- Wall Dimensions: ${inputs.numberOfWalls} walls x (${inputs.wallLength} x ${inputs.wallHeight} ${inputs.wallUnit})
- Net Paintable Surface Area: ${results.netPaintAreaSqFt} Sq Ft
- Paint Coats: ${inputs.numberOfCoats} coats
- Paint Liters Needed: ${results.paintRequiredLiters} Liters
- Primer Liters Needed: ${results.primerRequiredLiters} Liters
- Recommended Bucket Sizes: ${results.estimated15LBuckets} x 15L Buckets, ${results.estimated4LBuckets} x 4L Buckets, ${results.estimated1LBuckets} x 1L Cans`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getResultsText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const printTableData = [
    { label: 'Number of Walls', value: inputs.numberOfWalls },
    { label: 'Gross Wall Area', value: results.totalGrossWallAreaSqFt, unit: 'Sq Ft' },
    { label: 'Net Paintable Surface Area', value: results.netPaintAreaSqFt, unit: 'Sq Ft' },
    { label: 'Paint Liters (Emulsion)', value: results.paintRequiredLiters, unit: 'Liters' },
    { label: 'Primer Liters', value: results.primerRequiredLiters, unit: 'Liters' },
    { label: '15L Bucket Count', value: results.estimated15LBuckets, unit: 'Buckets' },
    { label: '4L Container Count', value: results.estimated4LBuckets, unit: 'Containers' },
    { label: '1L Can Count', value: results.estimated1LBuckets, unit: 'Cans' },
  ];

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Paintbrush className="w-5 h-5 text-[#0F2D5C]" />
              <h3 className="font-bold text-slate-900 text-lg">Wall & Paint Specifications</h3>
            </div>
            
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Wall Length
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.wallLength}
                onChange={(e) => handleChange('wallLength', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Wall Height
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.wallHeight}
                onChange={(e) => handleChange('wallHeight', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                No. of Walls
              </label>
              <input
                type="number"
                min="1"
                value={inputs.numberOfWalls}
                onChange={(e) => handleChange('numberOfWalls', parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Deductions (Doors/Windows Sq Ft)
              </label>
              <input
                type="number"
                min="0"
                value={inputs.deductionAreaSqFt}
                onChange={(e) => handleChange('deductionAreaSqFt', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Coverage (Sq Ft per Liter)
              </label>
              <input
                type="number"
                min="10"
                value={inputs.coverageSqFtPerLiter}
                onChange={(e) => handleChange('coverageSqFtPerLiter', parseFloat(e.target.value) || 100)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Paint Coats
              </label>
              <select
                value={inputs.numberOfCoats}
                onChange={(e) => handleChange('numberOfCoats', parseInt(e.target.value) || 2)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-white"
              >
                <option value={1}>1 Coat (Touch-up / Repaint)</option>
                <option value={2}>2 Coats (Standard New Wall)</option>
                <option value={3}>3 Coats (High Coverage Finish)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primer Coat
              </label>
              <select
                value={inputs.primerCoats}
                onChange={(e) => handleChange('primerCoats', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-white"
              >
                <option value={0}>No Primer</option>
                <option value={1}>1 Coat Primer Base</option>
                <option value={2}>2 Coats Primer Base</option>
              </select>
            </div>
          </div>

        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border-2 border-[#0F2D5C] p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="font-black text-slate-900 text-xl">Paint Requirement Schedule</h3>
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
                <span className="text-xs uppercase font-semibold text-slate-300">Total Paint Required</span>
                <div className="text-4xl font-black text-[#F4B400] mt-1">
                  {results.paintRequiredLiters} <span className="text-lg font-bold text-white">Liters</span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Primer needed: {results.primerRequiredLiters} Liters
                </div>
              </div>
              <Paintbrush className="w-10 h-10 text-[#F4B400]" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs text-center">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block">15L Buckets</span>
                <span className="text-xl font-black text-slate-900">{results.estimated15LBuckets}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block">4L Cans</span>
                <span className="text-xl font-black text-slate-900">{results.estimated4LBuckets}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block">1L Cans</span>
                <span className="text-xl font-black text-slate-900">{results.estimated1LBuckets}</span>
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
          title="Wall Paint Quantity Estimation Sheet"
          summaryText={`Calculated paint for ${inputs.numberOfWalls} walls.`}
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

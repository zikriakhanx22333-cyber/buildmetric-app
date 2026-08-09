import React, { useState } from 'react';
import { AreaVolumeInputs, AreaVolumeResults } from '../../types';
import { calculateAreaVolume } from '../../utils/calculatorLogic';
import { RotateCcw, Copy, Printer, Check, Ruler, Sparkles } from 'lucide-react';
import { PrintModal } from '../PrintModal';

export const AreaVolumeCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<AreaVolumeInputs>({
    shape: 'cuboid',
    dimA: 20, // Length
    dimB: 15, // Width
    dimC: 0,
    dimHeight: 0.5, // Depth/Thickness
    dimRadius: 5,
    unit: 'feet',
  });

  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handleChange = (field: keyof AreaVolumeInputs, val: any) => {
    setInputs(prev => ({ ...prev, [field]: val }));
  };

  const handleShapeChange = (s: AreaVolumeInputs['shape']) => {
    setInputs(prev => ({ ...prev, shape: s }));
  };

  const results: AreaVolumeResults = calculateAreaVolume(inputs);

  const getResultsText = () => {
    return `Geometry Calculation Results (BuildMetric):
- Selected Shape: ${inputs.shape.toUpperCase()}
- Formula: ${results.formulaUsed}
- Area: ${results.areaSqUnits} Sq ${inputs.unit}
- Volume: ${results.volumeCuUnits} Cubic ${inputs.unit}
- Perimeter/Circumference: ${results.perimeterUnits} ${inputs.unit}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getResultsText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const printTableData = [
    { label: 'Selected Geometry', value: inputs.shape.toUpperCase() },
    { label: 'Unit Measurement', value: inputs.unit },
    { label: 'Formula Employed', value: results.formulaUsed },
    { label: 'Calculated Surface Area', value: results.areaSqUnits, unit: `Sq ${inputs.unit}` },
    { label: 'Calculated Cubic Volume', value: results.volumeCuUnits, unit: `Cubic ${inputs.unit}` },
    { label: 'Perimeter / Perimeter Length', value: results.perimeterUnits, unit: inputs.unit },
  ];

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#0F2D5C]" />
              <h3 className="font-bold text-slate-900 text-lg">Shape & Dimensions</h3>
            </div>
            
            <button
              onClick={() => setInputs({ shape: 'cuboid', dimA: 20, dimB: 15, dimC: 0, dimHeight: 0.5, dimRadius: 5, unit: 'feet' })}
              className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg"
            >
              Reset
            </button>
          </div>

          {/* Shape Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Geometry Shape
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'rectangle', label: 'Rectangle' },
                { id: 'square', label: 'Square' },
                { id: 'circle', label: 'Circle' },
                { id: 'triangle', label: 'Triangle' },
                { id: 'cuboid', label: 'Cuboid / Slab' },
                { id: 'cylinder', label: 'Cylinder / Column' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleShapeChange(s.id as any)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all ${inputs.shape === s.id ? 'bg-[#0F2D5C] text-[#F4B400] shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Unit selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Measurement Unit</label>
            <select
              value={inputs.unit}
              onChange={(e) => handleChange('unit', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-white"
            >
              <option value="feet">Feet (ft)</option>
              <option value="meters">Meters (m)</option>
              <option value="inches">Inches (in)</option>
              <option value="cm">Centimeters (cm)</option>
            </select>
          </div>

          {/* Dimension inputs according to shape */}
          <div className="space-y-3">
            {(inputs.shape === 'rectangle' || inputs.shape === 'cuboid') && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Length ({inputs.unit})</label>
                  <input
                    type="number"
                    value={inputs.dimA}
                    onChange={(e) => handleChange('dimA', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Width ({inputs.unit})</label>
                  <input
                    type="number"
                    value={inputs.dimB}
                    onChange={(e) => handleChange('dimB', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
                  />
                </div>
              </div>
            )}

            {inputs.shape === 'square' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Side Length ({inputs.unit})</label>
                <input
                  type="number"
                  value={inputs.dimA}
                  onChange={(e) => handleChange('dimA', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
                />
              </div>
            )}

            {(inputs.shape === 'circle' || inputs.shape === 'cylinder') && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Radius ({inputs.unit})</label>
                <input
                  type="number"
                  value={inputs.dimRadius}
                  onChange={(e) => handleChange('dimRadius', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
                />
              </div>
            )}

            {(inputs.shape === 'triangle' || inputs.shape === 'cuboid' || inputs.shape === 'cylinder') && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Height / Depth ({inputs.unit})</label>
                <input
                  type="number"
                  value={inputs.dimHeight}
                  onChange={(e) => handleChange('dimHeight', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
                />
              </div>
            )}
          </div>

        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border-2 border-[#0F2D5C] p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="font-black text-slate-900 text-xl">Geometric Output</h3>
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
                <span className="text-xs uppercase font-semibold text-slate-300">Computed Area</span>
                <div className="text-4xl font-black text-[#F4B400] mt-1">
                  {results.areaSqUnits} <span className="text-lg font-bold text-white">Sq {inputs.unit}</span>
                </div>
                {results.volumeCuUnits > 0 && (
                  <div className="text-xs text-slate-300 mt-1">
                    Computed Volume: <strong>{results.volumeCuUnits} Cubic {inputs.unit}</strong>
                  </div>
                )}
              </div>
              <Ruler className="w-10 h-10 text-[#F4B400]" />
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
              Formula: {results.formulaUsed}
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
          title="Area & Volume Geometric Calculation Sheet"
          summaryText={`Geometric calculation for ${inputs.shape.toUpperCase()}.`}
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

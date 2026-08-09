import React, { useState } from 'react';
import { SteelInputs, SteelResults } from '../../types';
import { calculateSteel } from '../../utils/calculatorLogic';
import { RotateCcw, Copy, Printer, Check, Layers, AlertTriangle, Sparkles, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { PrintModal } from '../PrintModal';

export const SteelWeightCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<SteelInputs>({
    diameterMm: 12,
    lengthMeters: 12, // Standard length of steel rod is 12m (40ft)
    quantity: 10,
    steelType: 'Fe500',
  });

  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const PRESET_DIAMETERS = [6, 8, 10, 12, 16, 20, 25, 32];

  const handleChange = (field: keyof SteelInputs, val: any) => {
    setInputs(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    setInputs({
      diameterMm: 12,
      lengthMeters: 12,
      quantity: 10,
      steelType: 'Fe500',
    });
  };

  let results: SteelResults | null = null;
  if (inputs.diameterMm > 0 && inputs.lengthMeters > 0 && inputs.quantity > 0) {
    results = calculateSteel(inputs);
  }

  const getResultsText = () => {
    if (!results) return '';
    return `Steel Rebar Weight Calculation Results (BuildMetric):
- Steel Bar Diameter: ${inputs.diameterMm} mm
- Bar Length: ${inputs.lengthMeters} meters
- Number of Bars: ${inputs.quantity} pcs
- Total Steel Length: ${results.totalLengthMeters} meters
- Steel Grade: ${inputs.steelType}
- Weight per Meter: ${results.weightPerMeterKg} kg/m
- Single Bar Weight (${inputs.lengthMeters}m): ${results.singleBarWeightKg} kg
- Total Steel Weight: ${results.totalWeightKg} kg (${results.totalWeightTons} Metric Tons)
- Formula Used: Weight (kg/m) = D² / 162.2`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getResultsText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const printTableData = results ? [
    { label: 'Steel Bar Diameter', value: inputs.diameterMm, unit: 'mm' },
    { label: 'Length per Bar', value: inputs.lengthMeters, unit: 'meters' },
    { label: 'Number of Bars', value: inputs.quantity, unit: 'pcs' },
    { label: 'Total Steel Length', value: results.totalLengthMeters, unit: 'meters' },
    { label: 'Steel Grade', value: inputs.steelType },
    { label: 'Weight per Meter', value: results.weightPerMeterKg, unit: 'kg/m' },
    { label: 'Single Bar Weight', value: results.singleBarWeightKg, unit: 'kg' },
    { label: 'Total Steel Weight (kg)', value: results.totalWeightKg, unit: 'kg' },
    { label: 'Total Steel Weight (Tons)', value: results.totalWeightTons, unit: 'Metric Tons' },
  ] : [];

  return (
    <div className="space-y-6 sm:space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Form Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-5 sm:space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#0F2D5C]" />
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Steel Rebar Parameters</h3>
            </div>
            
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0F2D5C] bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Quick Preset Diameters */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Preset Bar Diameters (mm)
              </label>
              <span className="text-[11px] text-[#0F2D5C] font-semibold">Quick Select</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_DIAMETERS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleChange('diameterMm', d)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all min-h-[38px] ${
                    inputs.diameterMm === d
                      ? 'bg-[#0F2D5C] text-[#F4B400] shadow-md ring-2 ring-[#0F2D5C]/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {d} mm
                </button>
              ))}
            </div>
          </div>

          {/* Bar Diameter & Bar Length Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Steel Bar Diameter (mm)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={inputs.diameterMm || ''}
                  onChange={(e) => handleChange('diameterMm', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 text-slate-900 font-bold text-sm sm:text-base"
                  placeholder="e.g. 12"
                />
                <span className="absolute right-3 top-3 text-slate-400 text-xs font-bold pointer-events-none">mm</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Length per Bar (Meters)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0.01"
                  step="any"
                  value={inputs.lengthMeters || ''}
                  onChange={(e) => handleChange('lengthMeters', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 text-slate-900 font-bold text-sm sm:text-base"
                  placeholder="e.g. 12"
                />
                <span className="absolute right-3 top-3 text-slate-400 text-xs font-bold pointer-events-none">m</span>
              </div>
            </div>
          </div>

          {/* Number of Bars & Steel Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Number of Steel Bars
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={inputs.quantity || ''}
                  onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 text-slate-900 font-bold text-sm sm:text-base"
                  placeholder="e.g. 10"
                />
                <span className="absolute right-3 top-3 text-slate-400 text-xs font-bold pointer-events-none">bars</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Steel Grade / Type
              </label>
              <select
                value={inputs.steelType}
                onChange={(e) => handleChange('steelType', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 text-slate-900 font-bold text-sm sm:text-base bg-white"
              >
                <option value="Fe500">Fe 500 TMT Rebar</option>
                <option value="Fe550">Fe 550D TMT Rebar</option>
                <option value="Fe415">Fe 415 Mild Steel</option>
                <option value="Stainless">Stainless Steel Grade</option>
              </select>
            </div>
          </div>

          <div className="pt-3 text-xs text-slate-500 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <span>Unit Weight Formula: <strong>D² / 162.2</strong></span>
            <span>Steel Density: <strong>7850 kg/m³</strong></span>
          </div>

        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 space-y-6">
          
          {!results ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 text-center text-amber-800 space-y-3">
              <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="font-bold text-base">Invalid or Missing Inputs</h4>
              <p className="text-xs text-amber-700">
                Please enter a valid bar diameter, length in meters, and quantity greater than zero.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-[#0F2D5C] p-4 sm:p-6 shadow-xl space-y-5 sm:space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-100 px-2.5 py-0.5 rounded-full">
                    Calculated Schedule
                  </span>
                  <h3 className="font-black text-slate-900 text-lg sm:text-xl mt-1">
                    Steel Weight Output
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    title="Copy Results"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPrintModal(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] text-xs font-bold transition-colors"
                    title="Print report"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Total Weight Highlight */}
              <div className="bg-gradient-to-r from-[#0F2D5C] to-[#163c78] rounded-2xl p-4 sm:p-5 text-white shadow-md flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                    Total Steel Weight
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#F4B400] mt-1">
                    {results.totalWeightKg} <span className="text-lg font-bold text-white">kg</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    <span>In Metric Tons: <strong>{results.totalWeightTons} Tons</strong></span>
                    <span>Grade: <strong>{inputs.steelType}</strong></span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <Layers className="w-6 h-6 text-[#F4B400]" />
                </div>
              </div>

              {/* Grid Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">Weight per Meter</div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    {results.weightPerMeterKg} <span className="text-xs font-bold text-slate-500">kg/m</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Formula: {inputs.diameterMm}² / 162.2</div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">Single Bar Weight ({inputs.lengthMeters}m)</div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    {results.singleBarWeightKg} <span className="text-xs font-bold text-slate-500">kg</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Length: {inputs.lengthMeters} meters</div>
                </div>

                <div className="bg-amber-50/70 rounded-xl p-3.5 sm:p-4 border border-amber-200">
                  <div className="text-xs font-bold text-amber-800 uppercase">Total Weight in Kg</div>
                  <div className="text-lg sm:text-xl font-black text-amber-950 mt-1">
                    {results.totalWeightKg} <span className="text-xs font-bold text-amber-800">kg</span>
                  </div>
                  <div className="text-[11px] text-amber-700 mt-0.5">{inputs.quantity} bars × {results.singleBarWeightKg} kg</div>
                </div>

                <div className="bg-amber-50/70 rounded-xl p-3.5 sm:p-4 border border-amber-200">
                  <div className="text-xs font-bold text-amber-800 uppercase">Total Weight in Metric Tons</div>
                  <div className="text-lg sm:text-xl font-black text-amber-950 mt-1">
                    {results.totalWeightTons} <span className="text-xs font-bold text-amber-800">Tons</span>
                  </div>
                  <div className="text-[11px] text-amber-700 mt-0.5">{results.totalWeightKg} kg / 1000</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-[#0F2D5C] flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold">Total Combined Length of Steel Bars ({inputs.quantity} pcs):</span>
                <span className="font-black text-sm sm:text-base">{results.totalLengthMeters} meters</span>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Formula & Assumptions Expandable Section */}
      {results && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setShowAssumptions(!showAssumptions)}
            className="w-full p-4 sm:p-5 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F2D5C] text-[#F4B400] flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  Formula & Civil Engineering Principles
                </h4>
                <p className="text-xs text-slate-500">
                  Standard derivation for steel rebar weight estimation
                </p>
              </div>
            </div>
            <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600">
              {showAssumptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showAssumptions && (
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-white space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
                    Weight per Meter = D² / 162.2
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Derived from circular bar cross-sectional area: Volume = π × (D/2000)² × 1m. Multiplying by density of steel (7850 kg/m³) yields <strong>D² / 162.28</strong> (commonly rounded to 162.2 in civil engineering practice).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
                    Total Weight = (D² / 162.2) × L × Quantity
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Calculates total mass in kilograms by multiplying unit weight (kg/m) by length of individual bar (L in meters) and the total number of steel bars.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
                    Metric Tons = Total Kg / 1000
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Steel procurement is often quoted in metric tons (1 Metric Ton = 1,000 kg = 2,204.62 lbs).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
                    Standard Commercial Length = 12 Meters (~40 Feet)
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    TMT rebar rods are manufactured in standard factory bundle lengths of 12 meters (40 feet).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step by step derivation */}
      {results && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-3">
          <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0F2D5C]" />
            <span>Step-by-Step Mathematical Derivation</span>
          </h4>
          <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-200 font-mono text-xs text-slate-700 space-y-1.5 overflow-x-auto">
            {results.steps.map((st, i) => (
              <div key={i} className="whitespace-pre-wrap">{st}</div>
            ))}
          </div>
        </div>
      )}

      {showPrintModal && results && (
        <PrintModal
          title="Steel Rebar Weight Calculation Sheet"
          summaryText={`Calculated weight for ${inputs.quantity} bars of ${inputs.diameterMm}mm rebar (${inputs.lengthMeters}m length).`}
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

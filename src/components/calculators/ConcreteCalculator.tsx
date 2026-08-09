import React, { useState } from 'react';
import { ConcreteInputs, ConcreteResults } from '../../types';
import { calculateConcrete, MIX_RATIOS } from '../../utils/calculatorLogic';
import { RotateCcw, Copy, Printer, Check, Info, AlertTriangle, Box, Sparkles, ChevronDown, ChevronUp, HelpCircle, Layers } from 'lucide-react';
import { PrintModal } from '../PrintModal';

export const ConcreteCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ConcreteInputs>({
    length: 10,
    width: 10,
    depth: 0.5, // 6 inches slab default
    unit: 'feet',
    mixRatio: 'M20',
    customCement: 1,
    customSand: 1.5,
    customAggregate: 3,
    dryMultiplier: 1.54,
    bagWeightKg: 50,
  });

  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (field: keyof ConcreteInputs, val: any) => {
    setErrorMsg('');
    setInputs(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    setInputs({
      length: 10,
      width: 10,
      depth: 0.5,
      unit: 'feet',
      mixRatio: 'M20',
      customCement: 1,
      customSand: 1.5,
      customAggregate: 3,
      dryMultiplier: 1.54,
      bagWeightKg: 50,
    });
    setErrorMsg('');
  };

  // Validate
  let results: ConcreteResults | null = null;
  if (inputs.length <= 0 || inputs.width <= 0 || inputs.depth <= 0) {
    // Show validation
  } else {
    results = calculateConcrete(inputs);
  }

  const getResultsText = () => {
    if (!results) return '';
    return `Concrete Calculation Results (BuildMetric):
- Dimensions: ${inputs.length} x ${inputs.width} x ${inputs.depth} ${inputs.unit}
- Mix Ratio Used: ${results.mixRatioLabel}
- Wet Concrete Volume: ${results.wetVolumeCft} CFT (${results.wetVolumeCum} m³)
- Dry Volume (1.54 Factor): ${results.dryVolumeCft} CFT (${results.dryVolumeCum} m³)
- Cement Required (50kg Bags): ${results.cementBags} Bags [Total ${results.cementKg} kg]
- Cement Volume: ${results.cementCft} CFT
- Sand Quantity: ${results.sandCft} CFT (~${results.sandTons} Tons)
- Aggregate Quantity: ${results.aggregateCft} CFT (~${results.aggregateTons} Tons)
- Water Estimate: ~${results.waterLitersEstimate} Liters`;
  };

  const handleCopy = () => {
    const text = getResultsText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const printTableData = results ? [
    { label: 'Slab / Footing Dimensions', value: `${inputs.length} × ${inputs.width} × ${inputs.depth}`, unit: inputs.unit },
    { label: 'Mix Ratio Used', value: results.mixRatioLabel },
    { label: 'Wet Concrete Volume', value: results.wetVolumeCft, unit: 'CFT' },
    { label: 'Dry Volume (1.54 Multiplier)', value: results.dryVolumeCft, unit: 'CFT' },
    { label: 'Cement Required (50kg Bags)', value: results.cementBags, unit: 'Bags' },
    { label: 'Cement Volume in CFT', value: results.cementCft, unit: 'CFT' },
    { label: 'Total Cement Weight', value: results.cementKg, unit: 'kg' },
    { label: 'Sand Quantity in CFT', value: results.sandCft, unit: 'CFT' },
    { label: 'Sand Weight', value: results.sandTons, unit: 'Tons' },
    { label: 'Aggregate Quantity in CFT', value: results.aggregateCft, unit: 'CFT' },
    { label: 'Aggregate Weight', value: results.aggregateTons, unit: 'Tons' },
    { label: 'Water Requirement', value: results.waterLitersEstimate, unit: 'Liters' },
  ] : [];

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Inputs Form + Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-5 sm:space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Box className="w-5 h-5 text-[#0F2D5C]" />
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Input Measurements</h3>
            </div>
            
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0F2D5C] bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Unit Switcher */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Measurement Unit
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleChange('unit', 'feet')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center ${inputs.unit === 'feet' ? 'bg-[#0F2D5C] text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Feet / Cubic Feet (CFT)
              </button>
              <button
                type="button"
                onClick={() => handleChange('unit', 'meters')}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition-all text-center ${inputs.unit === 'meters' ? 'bg-[#0F2D5C] text-white shadow' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Meters / Cubic Meters (m³)
              </button>
            </div>
          </div>

          {/* Dimensions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Length ({inputs.unit})
              </label>
              <input
                type="number"
                step="any"
                min="0.1"
                value={inputs.length || ''}
                onChange={(e) => handleChange('length', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 text-slate-900 font-bold text-sm sm:text-base"
                placeholder="Length"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Width ({inputs.unit})
              </label>
              <input
                type="number"
                step="any"
                min="0.1"
                value={inputs.width || ''}
                onChange={(e) => handleChange('width', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 text-slate-900 font-bold text-sm sm:text-base"
                placeholder="Width"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Depth / Thk ({inputs.unit})
              </label>
              <input
                type="number"
                step="any"
                min="0.01"
                value={inputs.depth || ''}
                onChange={(e) => handleChange('depth', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 text-slate-900 font-bold text-sm sm:text-base"
                placeholder="Depth"
              />
            </div>
          </div>

          {/* Mix Ratio Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Concrete Mix Grade
            </label>
            <select
              value={inputs.mixRatio}
              onChange={(e) => handleChange('mixRatio', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 text-slate-900 font-semibold text-sm bg-white"
            >
              <option value="M20">M20 (1 : 1.5 : 3) - Standard Slabs & Beams</option>
              <option value="M25">M25 (1 : 1 : 2) - Columns & Foundations</option>
              <option value="M15">M15 (1 : 2 : 4) - Pavements & Flooring</option>
              <option value="M10">M10 (1 : 3 : 6) - Plain Leveling Concrete</option>
              <option value="M7.5">M7.5 (1 : 4 : 8) - Foundation PCC</option>
              <option value="M5">M5 (1 : 5 : 10) - Non-Structural Mass Concrete</option>
              <option value="custom">Custom Proportion Ratio</option>
            </select>
          </div>

          {/* Custom Proportions if Custom selected */}
          {inputs.mixRatio === 'custom' && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-700">Custom Volumetric Proportions (Cement : Sand : Aggregate)</div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 block mb-1">Cement</span>
                  <input
                    type="number"
                    value={inputs.customCement}
                    onChange={(e) => handleChange('customCement', parseFloat(e.target.value) || 1)}
                    className="w-full p-2 border rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block mb-1">Sand</span>
                  <input
                    type="number"
                    value={inputs.customSand}
                    onChange={(e) => handleChange('customSand', parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border rounded-lg text-xs font-bold"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block mb-1">Aggregate</span>
                  <input
                    type="number"
                    value={inputs.customAggregate}
                    onChange={(e) => handleChange('customAggregate', parseFloat(e.target.value) || 0)}
                    className="w-full p-2 border rounded-lg text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Quick factor summary */}
          <div className="pt-2 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
            <span>Dry Multiplier: <strong>1.54</strong></span>
            <span>1 Bag = <strong>1.226 CFT</strong></span>
            <span>Bag Weight = <strong>50 kg</strong></span>
          </div>

        </div>

        {/* Right Column: Interactive Results Card */}
        <div className="lg:col-span-6 space-y-6">
          
          {(!inputs.length || !inputs.width || !inputs.depth) ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 text-center text-amber-800 space-y-3">
              <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="font-bold text-base">Invalid or Zero Dimensions</h4>
              <p className="text-xs text-amber-700">
                Please enter positive numerical values for length, width, and depth to see live concrete calculation estimates.
              </p>
            </div>
          ) : results && (
            <div className="bg-white rounded-2xl border-2 border-[#0F2D5C] p-4 sm:p-6 shadow-xl space-y-5 sm:space-y-6">
              
              {/* Card Header & Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-100 px-2.5 py-0.5 rounded-full">
                    Calculated Results
                  </span>
                  <h3 className="font-black text-slate-900 text-lg sm:text-xl mt-1">
                    Concrete Material Schedule
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                    title="Copy Results"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] text-xs font-bold transition-colors"
                    title="Print formal report"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Mix Ratio Banner */}
              <div className="bg-slate-100 rounded-xl px-4 py-2.5 border border-slate-200 flex items-center justify-between text-xs text-slate-700">
                <span className="font-bold text-slate-500 uppercase tracking-wider">Mix Ratio Used:</span>
                <span className="font-black text-[#0F2D5C] text-sm sm:text-base">{results.mixRatioLabel}</span>
              </div>

              {/* Highlight Cement Bag Stat */}
              <div className="bg-gradient-to-r from-[#0F2D5C] to-[#163c78] rounded-2xl p-4 sm:p-5 text-white shadow-md flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                    Cement Required (50kg Bags)
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#F4B400] mt-1">
                    {results.cementBags} <span className="text-lg font-bold text-white">Bags</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    <span>Volume: <strong>{results.cementCft} CFT</strong></span>
                    <span>Total Weight: <strong>{results.cementKg} kg</strong></span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <Box className="w-6 h-6 text-[#F4B400]" />
                </div>
              </div>

              {/* Detailed Material Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">Wet Concrete Volume</div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    {results.wetVolumeCft} <span className="text-xs font-bold text-slate-500">CFT</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">({results.wetVolumeCum} m³)</div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">Dry Volume (1.54 Factor)</div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    {results.dryVolumeCft} <span className="text-xs font-bold text-slate-500">CFT</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">({results.dryVolumeCum} m³)</div>
                </div>

                <div className="bg-amber-50/70 rounded-xl p-3.5 sm:p-4 border border-amber-200">
                  <div className="text-xs font-bold text-amber-800 uppercase">Cement Volume in CFT</div>
                  <div className="text-lg sm:text-xl font-black text-amber-950 mt-1">
                    {results.cementCft} <span className="text-xs font-bold text-amber-800">CFT</span>
                  </div>
                  <div className="text-[11px] text-amber-700 mt-0.5">{results.cementBags} Bags @ 50kg</div>
                </div>

                <div className="bg-amber-50/70 rounded-xl p-3.5 sm:p-4 border border-amber-200">
                  <div className="text-xs font-bold text-amber-800 uppercase">Sand Quantity in CFT</div>
                  <div className="text-lg sm:text-xl font-black text-amber-950 mt-1">
                    {results.sandCft} <span className="text-xs font-bold text-amber-800">CFT</span>
                  </div>
                  <div className="text-[11px] text-amber-700 mt-0.5">~{results.sandTons} Metric Tons</div>
                </div>

                <div className="bg-emerald-50/70 rounded-xl p-3.5 sm:p-4 border border-emerald-200 sm:col-span-2">
                  <div className="text-xs font-bold text-emerald-800 uppercase">Aggregate Quantity in CFT</div>
                  <div className="text-lg sm:text-xl font-black text-emerald-950 mt-1">
                    {results.aggregateCft} <span className="text-xs font-bold text-emerald-800">CFT</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">~{results.aggregateTons} Metric Tons</div>
                </div>
              </div>

              {/* Water Recommendation */}
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-[#0F2D5C] flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold">Estimated Water Requirement (~27.5L/bag):</span>
                <span className="font-black text-sm">{results.waterLitersEstimate} Liters</span>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Formula & Assumptions Expandable Section */}
      {results && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
          <button
            onClick={() => setShowAssumptions(!showAssumptions)}
            className="w-full p-4 sm:p-5 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F2D5C] text-[#F4B400] flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  Formula & Assumptions
                </h4>
                <p className="text-xs text-slate-500">
                  Standard engineering parameters and volumetric factors used in this calculation
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
                    Dry Volume Factor = 1.54
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Concrete shrinks when mixed with water as dry loose aggregate and sand particles settle into void spaces. A standard factor multiplier of <strong>1.54</strong> is applied to convert wet volume into required dry volume.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
                    Cement Bag Volume = 1.226 CFT
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    One standard commercial bag of Portland cement occupies approximately <strong>1.226 cubic feet (CFT)</strong> or 0.0347 m³ of uncompacted dry volume.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
                    Cement Bag Weight = 50 kg
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Standard unit weight assumption per commercial cement bag is <strong>50 kg</strong> (110.23 lbs).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
                    Selected Mix Ratio = {results.mixRatioLabel}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The calculation uses volumetric proportion parts (Cement : Sand : Coarse Aggregate) as specified by structural engineering codes (IS 456 / ACI).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step by step formula breakdown */}
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

      {/* Printable Report Modal */}
      {showPrintModal && results && (
        <PrintModal
          title="Concrete & Cement Material Estimation Report"
          summaryText={`Calculation performed for ${inputs.length} × ${inputs.width} × ${inputs.depth} ${inputs.unit} slab using ${results.mixRatioLabel}.`}
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


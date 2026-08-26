import React, { useState } from 'react';
import { ConcreteInputs, ConcreteResults } from '../../types';
import { calculateConcrete, MIX_RATIOS } from '../../utils/calculatorLogic';
import { RotateCcw, Copy, Printer, Check, Info, AlertTriangle, Box, Sparkles, ChevronDown, ChevronUp, HelpCircle, Layers, FolderPlus } from 'lucide-react';
import { PrintModal } from '../PrintModal';
import { AddToProjectModal, AddToProjectData } from '../AddToProjectModal';

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
  const [showAddToProject, setShowAddToProject] = useState(false);
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

  const projectData: AddToProjectData | null = results ? {
    calculatorId: 'concrete-calculator',
    calculatorTitle: 'Concrete Volume & Mix Calculator',
    category: 'concrete',
    defaultName: `Concrete Slab / Footing (${results.wetVolumeCum} m³)`,
    inputs,
    results,
    primaryQuantity: results.wetVolumeCum,
    primaryUnit: 'm³',
    materialsRollup: {
      cementBags: results.cementBags,
      concreteCum: results.wetVolumeCum,
      sandCft: results.sandCft,
      aggregateCft: results.aggregateCft
    }
  } : null;

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
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#0F2D5C]">
                <Box className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">Dimensions &amp; Proportions</h3>
            </div>

            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1 hover:bg-slate-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Unit Switcher */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Unit System
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleChange('unit', 'feet')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${inputs.unit === 'feet' ? 'bg-[#0F2D5C] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Feet &amp; Inches (Imperial)
              </button>
              <button
                type="button"
                onClick={() => handleChange('unit', 'meters')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${inputs.unit === 'meters' ? 'bg-[#0F2D5C] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Meters &amp; mm (Metric)
              </button>
            </div>
          </div>

          {/* Dimension Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Length ({inputs.unit === 'feet' ? 'ft' : 'm'})
              </label>
              <input
                type="number"
                min="0.01"
                step="any"
                value={inputs.length}
                onChange={(e) => handleChange('length', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Width ({inputs.unit === 'feet' ? 'ft' : 'm'})
              </label>
              <input
                type="number"
                min="0.01"
                step="any"
                value={inputs.width}
                onChange={(e) => handleChange('width', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Depth / Thickness ({inputs.unit === 'feet' ? 'ft' : 'm'})
              </label>
              <input
                type="number"
                min="0.01"
                step="any"
                value={inputs.depth}
                onChange={(e) => handleChange('depth', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white"
              />
            </div>

          </div>

          {/* Concrete Grade / Mix Proportions */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Concrete Grade / Nominal Mix Ratio
            </label>
            <select
              value={inputs.mixRatio}
              onChange={(e) => handleChange('mixRatio', e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
            >
              <option value="M20">M20 (1 : 1.5 : 3) - Slabs, Beams, Columns (Standard)</option>
              <option value="M25">M25 (1 : 1 : 2) - Heavy Reinforced Concrete Columns</option>
              <option value="M15">M15 (1 : 2 : 4) - Plain Footings &amp; Levelling Course</option>
              <option value="M10">M10 (1 : 3 : 6) - Foundation Blinding Bed (PCC)</option>
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

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setShowAddToProject(true)}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#F4B400] hover:bg-[#e0a500] text-[#0F2D5C] text-xs font-bold transition-all shadow-xs cursor-pointer"
                    title="Save calculation into a project workspace"
                  >
                    <FolderPlus className="w-4 h-4" />
                    <span>+ Add to Project</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    title="Copy Results"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] text-xs font-bold transition-colors cursor-pointer"
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

              {/* Concrete Volume Hero Metric */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-[#0F2D5C] to-[#163c78] text-white p-4 rounded-xl space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Wet Concrete Volume</div>
                  <div className="text-2xl sm:text-3xl font-black text-[#F4B400]">
                    {results.wetVolumeCum} <span className="text-sm font-medium text-white">m³</span>
                  </div>
                  <div className="text-xs text-blue-200 font-mono">
                    = {results.wetVolumeCft} CFT
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dry Mix Volume (+54%)</div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900">
                    {results.dryVolumeCum} <span className="text-sm font-medium text-slate-500">m³</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    = {results.dryVolumeCft} CFT
                  </div>
                </div>
              </div>

              {/* Material Breakdown Schedule */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Required Material Quantities
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Cement */}
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Cement (50kg)</div>
                    <div className="text-xl font-black text-[#0F2D5C] mt-1">
                      {results.cementBags} <span className="text-xs font-normal text-slate-600">Bags</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {results.cementKg} kg • {results.cementCft} CFT
                    </div>
                  </div>

                  {/* Sand */}
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Fine Sand</div>
                    <div className="text-xl font-black text-slate-900 mt-1">
                      {results.sandCft} <span className="text-xs font-normal text-slate-600">CFT</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      ~{results.sandTons} Tons • {results.sandCum} m³
                    </div>
                  </div>

                  {/* Aggregate */}
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">Coarse Aggregate</div>
                    <div className="text-xl font-black text-slate-900 mt-1">
                      {results.aggregateCft} <span className="text-xs font-normal text-slate-600">CFT</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      ~{results.aggregateTons} Tons • {results.aggregateCum} m³
                    </div>
                  </div>

                </div>

                {/* Water estimation */}
                <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-blue-900">Estimated Water Requirement (w/c ~0.50):</span>
                  <strong className="font-bold text-[#0F2D5C] font-mono">~{results.waterLitersEstimate} Liters</strong>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* Add To Project Modal */}
      {showAddToProject && projectData && (
        <AddToProjectModal
          data={projectData}
          onClose={() => setShowAddToProject(false)}
        />
      )}

      {/* Print / Export Report Modal */}
      {showPrintModal && results && (
        <PrintModal
          title="Concrete Volume & Material Estimation Report"
          inputs={inputs}
          resultsTable={printTableData}
          onClose={() => setShowPrintModal(false)}
        />
      )}

    </div>
  );
};

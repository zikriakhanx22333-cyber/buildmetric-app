import React, { useState } from 'react';
import { BrickInputs, BrickResults } from '../../types';
import { calculateBricks } from '../../utils/calculatorLogic';
import { RotateCcw, Copy, Printer, Check, Building2, AlertTriangle, Sparkles, HelpCircle, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { PrintModal } from '../PrintModal';

interface BrickPreset {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  unit: 'mm' | 'inches' | 'cm';
  label: string;
}

const BRICK_PRESETS: BrickPreset[] = [
  { id: 'indian-modular', name: 'Indian Standard Modular', length: 190, width: 90, height: 90, unit: 'mm', label: '190 × 90 × 90 mm' },
  { id: 'indian-traditional', name: 'Indian Traditional (9"×4.5"×3")', length: 228, width: 114, height: 76, unit: 'mm', label: '228 × 114 × 76 mm' },
  { id: 'us-modular', name: 'US Standard Modular', length: 194, width: 92, height: 57, unit: 'mm', label: '194 × 92 × 57 mm' },
  { id: 'us-utility', name: 'US Utility Brick', length: 194, width: 92, height: 92, unit: 'mm', label: '194 × 92 × 92 mm' },
  { id: 'uk-standard', name: 'UK Standard Brick', length: 215, width: 102.5, height: 65, unit: 'mm', label: '215 × 102.5 × 65 mm' },
  { id: 'aus-standard', name: 'Australian Standard', length: 230, width: 110, height: 76, unit: 'mm', label: '230 × 110 × 76 mm' },
];

export const BrickCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<BrickInputs>({
    wallLength: 20,
    wallHeight: 10,
    wallThickness: 9, // 9 inches default
    wallUnit: 'feet',
    brickLength: 190,
    brickWidth: 90,
    brickHeight: 90,
    brickUnit: 'mm',
    mortarThicknessMm: 10,
    wastagePercent: 5,
    deductDoorsWindowsSqFt: 0,
    presetSize: 'indian-modular'
  });

  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const handleChange = (field: keyof BrickInputs, val: any) => {
    setInputs(prev => ({ ...prev, [field]: val }));
  };

  const handleSelectPreset = (preset: BrickPreset) => {
    setInputs(prev => ({
      ...prev,
      presetSize: preset.id,
      brickLength: preset.length,
      brickWidth: preset.width,
      brickHeight: preset.height,
      brickUnit: preset.unit
    }));
  };

  const handleReset = () => {
    setInputs({
      wallLength: 20,
      wallHeight: 10,
      wallThickness: 9,
      wallUnit: 'feet',
      brickLength: 190,
      brickWidth: 90,
      brickHeight: 90,
      brickUnit: 'mm',
      mortarThicknessMm: 10,
      wastagePercent: 5,
      deductDoorsWindowsSqFt: 0,
      presetSize: 'indian-modular'
    });
  };

  let results: BrickResults | null = null;
  if (inputs.wallLength > 0 && inputs.wallHeight > 0 && inputs.wallThickness > 0) {
    results = calculateBricks(inputs);
  }

  const getResultsText = () => {
    if (!results) return '';
    return `Brick Material Schedule Results (BuildMetric):
- Wall Dimensions: ${inputs.wallLength} × ${inputs.wallHeight} (${inputs.wallThickness} thick) ${inputs.wallUnit}
- Wall Area: ${results.wallAreaSqFt} Sq Ft (${results.wallAreaSqM} m²)
- Wall Volume: ${results.wallVolumeCft} CFT (${results.wallVolumeCum} m³)
- Brick Size: ${inputs.brickLength} × ${inputs.brickWidth} × ${inputs.brickHeight} ${inputs.brickUnit}
- Mortar Joint Thickness: ${inputs.mortarThicknessMm} mm
- Base Bricks Required: ${results.baseBricksRequired} Pcs
- Wastage (${inputs.wastagePercent}%): ${results.wastageBricks} Pcs
- Total Bricks Required: ${results.totalBricksRequired} Pcs
- Estimated Mortar Volume: ${results.mortarVolumeCft} CFT (${results.mortarVolumeCum} m³)
- Cement Required for Mortar: ${results.cementBagsMortar} Bags (50kg)
- Sand Required for Mortar: ${results.sandCftMortar} CFT`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getResultsText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const printTableData = results ? [
    { label: 'Wall Dimensions (L × H)', value: `${inputs.wallLength} × ${inputs.wallHeight}`, unit: inputs.wallUnit },
    { label: 'Wall Thickness', value: inputs.wallThickness, unit: inputs.wallUnit },
    { label: 'Net Wall Area', value: results.wallAreaSqFt, unit: 'Sq Ft' },
    { label: 'Net Wall Volume', value: results.wallVolumeCft, unit: 'CFT' },
    { label: 'Individual Brick Dimensions', value: `${inputs.brickLength} × ${inputs.brickWidth} × ${inputs.brickHeight}`, unit: inputs.brickUnit },
    { label: 'Mortar Joint Thickness', value: inputs.mortarThicknessMm, unit: 'mm' },
    { label: 'Base Bricks Required', value: results.baseBricksRequired, unit: 'Pcs' },
    { label: 'Wastage Buffer Bricks', value: results.wastageBricks, unit: `Pcs (${inputs.wastagePercent}%)` },
    { label: 'Total Bricks Required', value: results.totalBricksRequired, unit: 'Pcs' },
    { label: 'Estimated Wet Mortar Volume', value: results.mortarVolumeCft, unit: 'CFT' },
    { label: 'Cement Bags (Mortar 1:6)', value: results.cementBagsMortar, unit: 'Bags' },
    { label: 'Sand Quantity (Mortar 1:6)', value: results.sandCftMortar, unit: 'CFT' },
  ] : [];

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Form & Output Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-5 sm:space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#0F2D5C]" />
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Wall & Brick Input Parameters</h3>
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

          {/* Wall Unit Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Wall Measurement Unit
            </label>
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(['feet', 'inches', 'meters', 'cm'] as const).map((unit) => (
                <button
                  key={unit}
                  type="button"
                  onClick={() => handleChange('wallUnit', unit)}
                  className={`py-2 px-1 rounded-lg text-xs font-bold capitalize transition-all text-center ${
                    inputs.wallUnit === unit
                      ? 'bg-[#0F2D5C] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>

          {/* Wall Dimensions (Length, Height, Thickness) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Wall Length ({inputs.wallUnit})
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.wallLength || ''}
                onChange={(e) => handleChange('wallLength', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 text-slate-900 font-bold text-sm sm:text-base"
                placeholder="Length"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Wall Height ({inputs.wallUnit})
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.wallHeight || ''}
                onChange={(e) => handleChange('wallHeight', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 text-slate-900 font-bold text-sm sm:text-base"
                placeholder="Height"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Wall Thickness ({inputs.wallUnit})
              </label>
              <input
                type="number"
                min="0.01"
                step="any"
                value={inputs.wallThickness || ''}
                onChange={(e) => handleChange('wallThickness', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 text-slate-900 font-bold text-sm sm:text-base"
                placeholder="Thickness"
              />
            </div>
          </div>

          {/* Preset Brick Sizes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Preset Common Brick Sizes
              </label>
              <span className="text-[11px] text-[#0F2D5C] font-semibold">Standard Specs</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BRICK_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                    inputs.presetSize === preset.id
                      ? 'bg-[#0F2D5C] border-[#0F2D5C] text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className={`font-bold truncate ${inputs.presetSize === preset.id ? 'text-[#F4B400]' : 'text-slate-900'}`}>
                    {preset.name}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${inputs.presetSize === preset.id ? 'text-slate-200' : 'text-slate-500'}`}>
                    {preset.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Brick Dimensions & Brick Unit */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Custom Brick Dimensions</span>
              <div className="flex items-center gap-1">
                {(['mm', 'cm', 'inches'] as const).map((unit) => (
                  <button
                    key={unit}
                    type="button"
                    onClick={() => {
                      handleChange('brickUnit', unit);
                      handleChange('presetSize', 'custom');
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                      inputs.brickUnit === unit
                        ? 'bg-[#0F2D5C] text-white'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">
                  Length ({inputs.brickUnit})
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={inputs.brickLength || ''}
                  onChange={(e) => {
                    handleChange('brickLength', parseFloat(e.target.value) || 0);
                    handleChange('presetSize', 'custom');
                  }}
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-300 font-bold text-xs bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">
                  Width ({inputs.brickUnit})
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={inputs.brickWidth || ''}
                  onChange={(e) => {
                    handleChange('brickWidth', parseFloat(e.target.value) || 0);
                    handleChange('presetSize', 'custom');
                  }}
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-300 font-bold text-xs bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">
                  Height ({inputs.brickUnit})
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={inputs.brickHeight || ''}
                  onChange={(e) => {
                    handleChange('brickHeight', parseFloat(e.target.value) || 0);
                    handleChange('presetSize', 'custom');
                  }}
                  className="w-full px-2.5 py-2 rounded-xl border border-slate-300 font-bold text-xs bg-white text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Mortar Joint & Wastage Percentage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mortar Joint Thickness (mm)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="50"
                  step="any"
                  value={inputs.mortarThicknessMm}
                  onChange={(e) => handleChange('mortarThicknessMm', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 text-slate-900 font-bold text-sm sm:text-base"
                />
                <span className="absolute right-3 top-3 text-slate-400 text-xs font-bold pointer-events-none">mm</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Wastage Buffer (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="30"
                  step="any"
                  value={inputs.wastagePercent}
                  onChange={(e) => handleChange('wastagePercent', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 text-slate-900 font-bold text-sm sm:text-base"
                />
                <span className="absolute right-3 top-3 text-slate-400 text-xs font-bold pointer-events-none">%</span>
              </div>
            </div>
          </div>

          {/* Door / Window Deductions */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Door & Window Deductions (Sq Ft)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={inputs.deductDoorsWindowsSqFt || ''}
              onChange={(e) => handleChange('deductDoorsWindowsSqFt', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] text-slate-900 font-bold text-sm"
              placeholder="e.g. 21 Sq Ft for 1 standard door"
            />
          </div>

          <div className="pt-2 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
            <span>Default Mortar Joint: <strong>10 mm</strong></span>
            <span>Default Wastage: <strong>5%</strong></span>
          </div>

        </div>

        {/* Right Column: Output Card */}
        <div className="lg:col-span-6 space-y-6">
          
          {!results ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 text-center text-amber-800 space-y-3">
              <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="font-bold text-base">Invalid or Missing Wall Dimensions</h4>
              <p className="text-xs text-amber-700">
                Please enter a valid wall length, height, thickness, and brick size greater than zero.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-[#0F2D5C] p-4 sm:p-6 shadow-xl space-y-5 sm:space-y-6">
              
              {/* Header & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-100 px-2.5 py-0.5 rounded-full">
                    Calculated Schedule
                  </span>
                  <h3 className="font-black text-slate-900 text-lg sm:text-xl mt-1">
                    Brick Material Schedule
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

              {/* Total Bricks Required Highlight */}
              <div className="bg-gradient-to-r from-[#0F2D5C] to-[#163c78] rounded-2xl p-4 sm:p-5 text-white shadow-md flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
                    Total Bricks Required (with {inputs.wastagePercent}% wastage)
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#F4B400] mt-1">
                    {results.totalBricksRequired.toLocaleString()} <span className="text-lg font-bold text-white">Bricks</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    <span>Base Required: <strong>{results.baseBricksRequired.toLocaleString()} pcs</strong></span>
                    <span>Wastage Buffer: <strong>+{results.wastageBricks.toLocaleString()} pcs</strong></span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-[#F4B400]" />
                </div>
              </div>

              {/* Material Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">Wall Area</div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    {results.wallAreaSqFt} <span className="text-xs font-bold text-slate-500">Sq Ft</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">({results.wallAreaSqM} m²)</div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-200">
                  <div className="text-xs font-bold text-slate-500 uppercase">Wall Volume</div>
                  <div className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    {results.wallVolumeCft} <span className="text-xs font-bold text-slate-500">CFT</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">({results.wallVolumeCum} m³)</div>
                </div>

                <div className="bg-amber-50/70 rounded-xl p-3.5 sm:p-4 border border-amber-200">
                  <div className="text-xs font-bold text-amber-800 uppercase">Base Bricks Required</div>
                  <div className="text-lg sm:text-xl font-black text-amber-950 mt-1">
                    {results.baseBricksRequired.toLocaleString()} <span className="text-xs font-bold text-amber-800">Pcs</span>
                  </div>
                  <div className="text-[11px] text-amber-700 mt-0.5">Without wastage multiplier</div>
                </div>

                <div className="bg-amber-50/70 rounded-xl p-3.5 sm:p-4 border border-amber-200">
                  <div className="text-xs font-bold text-amber-800 uppercase">Wastage Buffer ({inputs.wastagePercent}%)</div>
                  <div className="text-lg sm:text-xl font-black text-amber-950 mt-1">
                    +{results.wastageBricks.toLocaleString()} <span className="text-xs font-bold text-amber-800">Pcs</span>
                  </div>
                  <div className="text-[11px] text-amber-700 mt-0.5">On-site breakage & cutting</div>
                </div>

                <div className="bg-emerald-50/70 rounded-xl p-3.5 sm:p-4 border border-emerald-200 sm:col-span-2">
                  <div className="text-xs font-bold text-emerald-800 uppercase">Estimated Mortar Volume</div>
                  <div className="text-lg sm:text-xl font-black text-emerald-950 mt-1">
                    {results.mortarVolumeCft} <span className="text-xs font-bold text-emerald-800">CFT</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">
                    ({results.mortarVolumeCum} m³) • Mortar 1:6 Mix: ~{results.cementBagsMortar} Cement Bags + ~{results.sandCftMortar} CFT Sand
                  </div>
                </div>
              </div>

              {/* Extra Summary Note */}
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-[#0F2D5C] flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold">Brick Module Size (with {inputs.mortarThicknessMm}mm joint):</span>
                <span className="font-black text-xs sm:text-sm">
                  {inputs.brickLength + inputs.mortarThicknessMm} × {inputs.brickWidth + inputs.mortarThicknessMm} × {inputs.brickHeight + inputs.mortarThicknessMm} {inputs.brickUnit}
                </span>
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
                  Formula & Masonry Estimation Principles
                </h4>
                <p className="text-xs text-slate-500">
                  Standard engineering formulas used for calculating bricks and mortar
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
                    Wall Volume
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Wall Volume = Length × Height × Thickness</strong><br />
                    Calculates total gross masonry volume after deducting doors and windows.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
                    Brick Module Volume
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Module Vol = (Brick Length + Joint) × (Width + Joint) × (Height + Joint)</strong><br />
                    Accounts for the 10mm standard mortar joint bounding each brick.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
                    Number of Bricks & Wastage
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Base Bricks = Wall Volume / Brick Module Volume</strong><br />
                    <strong>Total Bricks = Base Bricks + (Base Bricks × Wastage %)</strong>
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
                    Estimated Mortar Volume
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>Mortar Volume = Wall Volume - Actual Brick Volume</strong><br />
                    Calculates remaining void space filled by wet cement-sand mortar.
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

      {/* Report Modal */}
      {showPrintModal && results && (
        <PrintModal
          title="Brick Material Quantity Estimation Report"
          summaryText={`Detailed brick & mortar calculation report for a wall of dimensions ${inputs.wallLength} × ${inputs.wallHeight} (${inputs.wallThickness} thick) ${inputs.wallUnit}.`}
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

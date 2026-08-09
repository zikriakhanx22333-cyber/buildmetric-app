import React, { useState } from 'react';
import { TileInputs, TileResults } from '../../types';
import { calculateTiles } from '../../utils/calculatorLogic';
import { RotateCcw, Copy, Printer, Check, Grid, Sparkles } from 'lucide-react';
import { PrintModal } from '../PrintModal';

export const TileCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<TileInputs>({
    roomLength: 15,
    roomWidth: 12,
    roomUnit: 'feet',
    tileLength: 24, // 2ft x 2ft vitrified tile
    tileWidth: 24,
    tileUnit: 'inches',
    wastagePercent: 10,
    tilesPerBox: 4,
    skirtingIncluded: true,
    skirtingHeightInches: 4,
  });

  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handleChange = (field: keyof TileInputs, val: any) => {
    setInputs(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    setInputs({
      roomLength: 15,
      roomWidth: 12,
      roomUnit: 'feet',
      tileLength: 24,
      tileWidth: 24,
      tileUnit: 'inches',
      wastagePercent: 10,
      tilesPerBox: 4,
      skirtingIncluded: true,
      skirtingHeightInches: 4,
    });
  };

  const results: TileResults = calculateTiles(inputs);

  const getResultsText = () => {
    return `Tile Estimation Results (BuildMetric):
- Room Dimensions: ${inputs.roomLength} x ${inputs.roomWidth} ${inputs.roomUnit}
- Tile Size: ${inputs.tileLength} x ${inputs.tileWidth} ${inputs.tileUnit}
- Total Floor Area: ${results.roomAreaSqFt} Sq Ft (${results.roomAreaSqM} Sq M)
- Skirting Area: ${results.skirtingAreaSqFt} Sq Ft
- Exact Tile Count: ${results.exactTilesNeeded} Tiles
- Tiles Required (with ${inputs.wastagePercent}% wastage): ${results.tilesWithWastage} Tiles
- Total Tile Boxes Needed: ${results.totalBoxesNeeded} Boxes (${inputs.tilesPerBox} pcs/box)`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getResultsText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const printTableData = [
    { label: 'Room Dimensions', value: `${inputs.roomLength} × ${inputs.roomWidth}`, unit: inputs.roomUnit },
    { label: 'Tile Dimensions', value: `${inputs.tileLength} × ${inputs.tileWidth}`, unit: inputs.tileUnit },
    { label: 'Floor Surface Area', value: results.roomAreaSqFt, unit: 'Sq Ft' },
    { label: 'Perimeter Skirting Area', value: results.skirtingAreaSqFt, unit: 'Sq Ft' },
    { label: 'Total Area to Tile', value: results.totalAreaToCoverSqFt, unit: 'Sq Ft' },
    { label: 'Exact Tiles Count', value: results.exactTilesNeeded, unit: 'Pcs' },
    { label: 'Tiles with Wastage Buffer', value: results.tilesWithWastage, unit: 'Pcs' },
    { label: 'Tile Boxes to Purchase', value: results.totalBoxesNeeded, unit: 'Boxes' },
    { label: 'Tile Grout Estimate', value: results.groutKgEstimate, unit: 'kg' },
  ];

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Grid className="w-5 h-5 text-[#0F2D5C]" />
              <h3 className="font-bold text-slate-900 text-lg">Room & Tile Dimensions</h3>
            </div>
            
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0F2D5C] bg-slate-100 px-3 py-1.5 rounded-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Room Dimensions */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Room Length
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.roomLength}
                onChange={(e) => handleChange('roomLength', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Room Width
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.roomWidth}
                onChange={(e) => handleChange('roomWidth', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Unit
              </label>
              <select
                value={inputs.roomUnit}
                onChange={(e) => handleChange('roomUnit', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-white"
              >
                <option value="feet">Feet (ft)</option>
                <option value="meters">Meters (m)</option>
              </select>
            </div>
          </div>

          {/* Tile Dimensions */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tile Length
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.tileLength}
                onChange={(e) => handleChange('tileLength', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tile Width
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.tileWidth}
                onChange={(e) => handleChange('tileWidth', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tile Unit
              </label>
              <select
                value={inputs.tileUnit}
                onChange={(e) => handleChange('tileUnit', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-white"
              >
                <option value="inches">Inches (in)</option>
                <option value="feet">Feet (ft)</option>
                <option value="cm">Centimeters (cm)</option>
              </select>
            </div>
          </div>

          {/* Wastage & Box Packaging */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Wastage Margin (%)
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={inputs.wastagePercent}
                onChange={(e) => handleChange('wastagePercent', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tiles per Box
              </label>
              <input
                type="number"
                min="1"
                value={inputs.tilesPerBox}
                onChange={(e) => handleChange('tilesPerBox', parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>
          </div>

          {/* Skirting Option */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <input
              type="checkbox"
              id="skirting"
              checked={inputs.skirtingIncluded}
              onChange={(e) => handleChange('skirtingIncluded', e.target.checked)}
              className="w-4 h-4 text-[#0F2D5C] rounded border-slate-300 focus:ring-[#0F2D5C]"
            />
            <label htmlFor="skirting" className="text-xs font-bold text-slate-700 cursor-pointer">
              Include Wall Perimeter Skirting Tiles (4-inch height)
            </label>
          </div>

        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border-2 border-[#0F2D5C] p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="font-black text-slate-900 text-xl">Tile Quantity Schedule</h3>
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
                <span className="text-xs uppercase font-semibold text-slate-300">Total Tile Boxes Required</span>
                <div className="text-4xl font-black text-[#F4B400] mt-1">
                  {results.totalBoxesNeeded} <span className="text-lg font-bold text-white">Boxes</span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Total {results.tilesWithWastage} tiles ({results.exactTilesNeeded} exact + wastage)
                </div>
              </div>
              <Grid className="w-10 h-10 text-[#F4B400]" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block">Room Floor Area</span>
                <span className="text-lg font-black text-slate-900">{results.roomAreaSqFt} Sq Ft</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block">Single Tile Area</span>
                <span className="text-lg font-black text-slate-900">{results.tileAreaSqFt} Sq Ft</span>
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
          title="Floor & Wall Tile Estimation Sheet"
          summaryText={`Calculated tiles for ${inputs.roomLength} × ${inputs.roomWidth} ${inputs.roomUnit} room.`}
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

import React, { useState } from 'react';
import { VolumeInputs, VolumeResults } from '../../types';
import { calculateVolume } from '../../utils/calculatorLogic';
import { Copy, Check, Printer, RotateCcw, ChevronDown, ChevronUp, Box } from 'lucide-react';

export const VolumeCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<VolumeInputs>({
    shape: 'cuboid',
    param1: 20,
    param2: 10,
    param3: 5,
    unit: 'ft'
  });

  const [copied, setCopied] = useState(false);
  const [showFormulas, setShowFormulas] = useState(true);

  const results: VolumeResults = calculateVolume(inputs);

  const handleChange = (field: keyof VolumeInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      shape: 'cuboid',
      param1: 20,
      param2: 10,
      param3: 5,
      unit: 'ft'
    });
  };

  const handleCopy = () => {
    const text = `
BuildMetric - Volume Geometry Calculation Results:
------------------------------------------------
Shape Type: ${inputs.shape.toUpperCase()}
Parameters: ${inputs.param1} ${inputs.unit} ${inputs.param2 ? '× ' + inputs.param2 : ''} ${inputs.param3 ? '× ' + inputs.param3 : ''}
Cubic Feet (CFT): ${results.cubicFeet} CFT
Cubic Meters (m³): ${results.cubicMeters} m³
Cubic Yards (yd³): ${results.cubicYards} yd³
------------------------------------------------
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
            <Box className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Volume Geometry Calculator</h2>
            <p className="text-blue-100 text-sm">Calculate cubic feet (CFT), cubic meters (m³), and cubic yards for 3D shapes</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F2D5C]"></span>
              3D Shape & Dimensions
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
                Select 3D Shape
              </label>
              <select
                value={inputs.shape}
                onChange={e => handleChange('shape', e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              >
                <option value="cuboid">Rectangular Cuboid (L × W × H)</option>
                <option value="cylinder">Cylinder (π × R² × H)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Unit System
              </label>
              <select
                value={inputs.unit}
                onChange={e => handleChange('unit', e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              >
                <option value="ft">Feet (ft)</option>
                <option value="m">Meters (m)</option>
                <option value="in">Inches (in)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                {inputs.shape === 'cylinder' ? `Radius (${inputs.unit})` : `Length (${inputs.unit})`}
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.param1}
                onChange={e => handleChange('param1', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>

            {inputs.shape === 'cuboid' && (
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                  Width ({inputs.unit})
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  value={inputs.param2 || ''}
                  onChange={e => handleChange('param2', Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                Height/Depth ({inputs.unit})
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={inputs.shape === 'cylinder' ? (inputs.param2 || '') : (inputs.param3 || '')}
                onChange={e => handleChange(inputs.shape === 'cylinder' ? 'param2' : 'param3', Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-[#F4B400] text-lg uppercase tracking-wider">
                Volume Output Summary
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
                <div className="text-xs text-blue-200 uppercase font-bold tracking-wider">Cubic Feet (CFT)</div>
                <div className="text-4xl font-extrabold text-[#F4B400] mt-1">{results.cubicFeet}</div>
                <div className="text-xs text-blue-300 mt-1">CFT</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-blue-200 uppercase font-semibold">Cubic Meters</div>
                <div className="text-2xl font-bold text-white mt-1">{results.cubicMeters}</div>
                <div className="text-xs text-blue-300">m³</div>
              </div>
            </div>

            <div className="space-y-3 bg-slate-800/60 p-4 rounded-xl border border-slate-800 text-sm">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Cubic Yards (yd³):</span>
                <span className="font-bold text-white">{results.cubicYards} yd³</span>
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

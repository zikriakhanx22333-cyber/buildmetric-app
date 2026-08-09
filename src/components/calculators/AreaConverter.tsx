import React, { useState } from 'react';
import { UnitConverterInputs, UnitConverterResults } from '../../types';
import { convertArea } from '../../utils/calculatorLogic';
import { Copy, Check, Printer, RotateCcw, Maximize2 } from 'lucide-react';

export const AreaConverter: React.FC = () => {
  const [inputs, setInputs] = useState<UnitConverterInputs>({
    value: 1000,
    fromUnit: 'sqft',
    toUnit: 'sqm'
  });

  const [copied, setCopied] = useState(false);

  const results: UnitConverterResults = convertArea(inputs);

  const handleChange = (field: keyof UnitConverterInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setInputs({
      value: 1000,
      fromUnit: 'sqft',
      toUnit: 'sqm'
    });
  };

  const handleCopy = () => {
    const text = `
BuildMetric - Construction Area Unit Conversion:
----------------------------------------------
Input: ${inputs.value} ${inputs.fromUnit}
Converted Output: ${results.convertedValue} ${results.unit}
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
            <Maximize2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Construction Area Unit Converter</h2>
            <p className="text-blue-100 text-sm">Convert between square feet, square meters, square yards, acres, and hectares</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F2D5C]"></span>
              Conversion Parameters
            </h3>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-[#0F2D5C] flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg hover:bg-slate-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
              Enter Value
            </label>
            <input
              type="number"
              step="any"
              value={inputs.value}
              onChange={e => handleChange('value', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                From Unit
              </label>
              <select
                value={inputs.fromUnit}
                onChange={e => handleChange('fromUnit', e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              >
                <option value="sqft">Square Feet (sq ft)</option>
                <option value="sqm">Square Meters (sq m)</option>
                <option value="sqyd">Square Yards (sq yd)</option>
                <option value="acre">Acres</option>
                <option value="hectare">Hectares</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                To Unit
              </label>
              <select
                value={inputs.toUnit}
                onChange={e => handleChange('toUnit', e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-[#0F2D5C] focus:bg-white outline-none"
              >
                <option value="sqft">Square Feet (sq ft)</option>
                <option value="sqm">Square Meters (sq m)</option>
                <option value="sqyd">Square Yards (sq yd)</option>
                <option value="acre">Acres</option>
                <option value="hectare">Hectares</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-[#F4B400] text-lg uppercase tracking-wider">
                Converted Area Output
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

            <div className="my-6 p-6 bg-[#0F2D5C] rounded-2xl border border-blue-900/60 text-center">
              <div className="text-xs text-blue-200 uppercase font-bold tracking-wider">Converted Area</div>
              <div className="text-5xl font-extrabold text-[#F4B400] mt-2">
                {results.convertedValue} <span className="text-2xl text-white font-semibold">{results.unit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

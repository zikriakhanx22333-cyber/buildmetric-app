import React, { useState } from 'react';
import { ArrowRightLeft, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';

export const UnitConverter: React.FC = () => {
  const [conversionType, setConversionType] = useState<'length' | 'area' | 'volume' | 'weight'>('length');
  const [inputValue, setInputValue] = useState<number>(10);
  const [fromUnit, setFromUnit] = useState<string>('feet');
  const [toUnit, setToUnit] = useState<string>('meters');
  const [copied, setCopied] = useState(false);

  // Conversion logic
  let convertedValue = 0;

  if (conversionType === 'length') {
    // base unit: meters
    let inMeters = inputValue;
    if (fromUnit === 'feet') inMeters = inputValue * 0.3048;
    else if (fromUnit === 'inches') inMeters = inputValue * 0.0254;
    else if (fromUnit === 'cm') inMeters = inputValue * 0.01;
    else if (fromUnit === 'mm') inMeters = inputValue * 0.001;

    if (toUnit === 'meters') convertedValue = inMeters;
    else if (toUnit === 'feet') convertedValue = inMeters / 0.3048;
    else if (toUnit === 'inches') convertedValue = inMeters / 0.0254;
    else if (toUnit === 'cm') convertedValue = inMeters * 100;
    else if (toUnit === 'mm') convertedValue = inMeters * 1000;
  } else if (conversionType === 'area') {
    // base unit: sq meters
    let inSqM = inputValue;
    if (fromUnit === 'sqft') inSqM = inputValue / 10.7639;
    else if (fromUnit === 'sqin') inSqM = inputValue / 1550;
    else if (fromUnit === 'brass') inSqM = (inputValue * 100) / 10.7639;

    if (toUnit === 'sqm') convertedValue = inSqM;
    else if (toUnit === 'sqft') convertedValue = inSqM * 10.7639;
    else if (toUnit === 'sqin') convertedValue = inSqM * 1550;
    else if (toUnit === 'brass') convertedValue = (inSqM * 10.7639) / 100;
  } else if (conversionType === 'volume') {
    // base unit: cubic meters (CUM)
    let inCum = inputValue;
    if (fromUnit === 'cft') inCum = inputValue / 35.3147;
    else if (fromUnit === 'liters') inCum = inputValue / 1000;
    else if (fromUnit === 'gallons') inCum = inputValue / 264.172;

    if (toUnit === 'cum') convertedValue = inCum;
    else if (toUnit === 'cft') convertedValue = inCum * 35.3147;
    else if (toUnit === 'liters') convertedValue = inCum * 1000;
    else if (toUnit === 'gallons') convertedValue = inCum * 264.172;
  } else if (conversionType === 'weight') {
    // base unit: kg
    let inKg = inputValue;
    if (fromUnit === 'lbs') inKg = inputValue * 0.453592;
    else if (fromUnit === 'tons') inKg = inputValue * 1000;
    else if (fromUnit === 'quintal') inKg = inputValue * 100;

    if (toUnit === 'kg') convertedValue = inKg;
    else if (toUnit === 'lbs') convertedValue = inKg / 0.453592;
    else if (toUnit === 'tons') convertedValue = inKg / 1000;
    else if (toUnit === 'quintal') convertedValue = inKg / 100;
  }

  const rounded = Math.round(convertedValue * 10000) / 10000;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${inputValue} ${fromUnit} = ${rounded} ${toUnit}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTypeChange = (type: typeof conversionType) => {
    setConversionType(type);
    if (type === 'length') { setFromUnit('feet'); setToUnit('meters'); }
    else if (type === 'area') { setFromUnit('sqft'); setToUnit('sqm'); }
    else if (type === 'volume') { setFromUnit('cft'); setToUnit('cum'); }
    else if (type === 'weight') { setFromUnit('kg'); setToUnit('tons'); }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-[#0F2D5C]" />
            <h3 className="font-bold text-slate-900 text-lg">Construction Unit Converter</h3>
          </div>
          
          <button
            onClick={() => { setInputValue(10); }}
            className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg"
          >
            Reset
          </button>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'length', label: 'Length' },
            { id: 'area', label: 'Area' },
            { id: 'volume', label: 'Volume (CFT/CUM)' },
            { id: 'weight', label: 'Weight (kg/Tons)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleTypeChange(cat.id as any)}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${conversionType === cat.id ? 'bg-[#0F2D5C] text-[#F4B400] shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-700">From Value</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-3 rounded-xl border border-slate-300 font-bold text-base"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white mt-1"
            >
              {conversionType === 'length' && (
                <>
                  <option value="feet">Feet (ft)</option>
                  <option value="meters">Meters (m)</option>
                  <option value="inches">Inches (in)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="mm">Millimeters (mm)</option>
                </>
              )}
              {conversionType === 'area' && (
                <>
                  <option value="sqft">Square Feet (Sq Ft)</option>
                  <option value="sqm">Square Meters (Sq M)</option>
                  <option value="sqin">Square Inches (Sq In)</option>
                  <option value="brass">Brass (100 Sq Ft)</option>
                </>
              )}
              {conversionType === 'volume' && (
                <>
                  <option value="cft">Cubic Feet (CFT)</option>
                  <option value="cum">Cubic Meters (CUM / m³)</option>
                  <option value="liters">Liters</option>
                  <option value="gallons">Gallons</option>
                </>
              )}
              {conversionType === 'weight' && (
                <>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="tons">Metric Tons</option>
                  <option value="lbs">Pounds (lbs)</option>
                  <option value="quintal">Quintal (100 kg)</option>
                </>
              )}
            </select>
          </div>

          <div className="text-center font-bold text-slate-400 text-2xl flex items-center justify-center">
            =
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-700">Converted Output</label>
            <div className="w-full px-3 py-3 rounded-xl bg-blue-50 border border-blue-200 font-black text-xl text-[#0F2D5C]">
              {rounded}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white mt-1"
            >
              {conversionType === 'length' && (
                <>
                  <option value="meters">Meters (m)</option>
                  <option value="feet">Feet (ft)</option>
                  <option value="inches">Inches (in)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="mm">Millimeters (mm)</option>
                </>
              )}
              {conversionType === 'area' && (
                <>
                  <option value="sqm">Square Meters (Sq M)</option>
                  <option value="sqft">Square Feet (Sq Ft)</option>
                  <option value="sqin">Square Inches (Sq In)</option>
                  <option value="brass">Brass (100 Sq Ft)</option>
                </>
              )}
              {conversionType === 'volume' && (
                <>
                  <option value="cum">Cubic Meters (CUM / m³)</option>
                  <option value="cft">Cubic Feet (CFT)</option>
                  <option value="liters">Liters</option>
                  <option value="gallons">Gallons</option>
                </>
              )}
              {conversionType === 'weight' && (
                <>
                  <option value="tons">Metric Tons</option>
                  <option value="kg">Kilograms (kg)</option>
                  <option value="lbs">Pounds (lbs)</option>
                  <option value="quintal">Quintal (100 kg)</option>
                </>
              )}
            </select>
          </div>

        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] font-bold text-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Result' : 'Copy Conversion'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

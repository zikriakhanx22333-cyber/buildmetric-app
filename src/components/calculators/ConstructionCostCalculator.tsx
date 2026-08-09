import React, { useState } from 'react';
import { ConstructionCostInputs, ConstructionCostResults } from '../../types';
import { calculateConstructionCost } from '../../utils/calculatorLogic';
import { RotateCcw, Copy, Printer, Check, Calculator, PieChart, DollarSign, Sparkles } from 'lucide-react';
import { PrintModal } from '../PrintModal';

export const ConstructionCostCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ConstructionCostInputs>({
    builtUpAreaSqFt: 1200, // standard house size 1200 sqft
    qualityGrade: 'standard',
    unitCostPerSqFt: 32, // ~$32 per sqft standard construction rate
    cementPricePerBag: 8,
    sandPricePerCft: 1.5,
    aggregatePricePerCft: 1.2,
    steelPricePerKg: 1.1,
    brickPricePerPiece: 0.15,
    laborCostPerSqFt: 8,
  });

  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handleChange = (field: keyof ConstructionCostInputs, val: any) => {
    setInputs(prev => ({ ...prev, [field]: val }));
  };

  const handleQualityChange = (grade: 'basic' | 'standard' | 'premium') => {
    let rate = 32;
    if (grade === 'basic') rate = 20;
    if (grade === 'premium') rate = 50;

    setInputs(prev => ({
      ...prev,
      qualityGrade: grade,
      unitCostPerSqFt: rate,
    }));
  };

  const handleReset = () => {
    setInputs({
      builtUpAreaSqFt: 1200,
      qualityGrade: 'standard',
      unitCostPerSqFt: 32,
      cementPricePerBag: 8,
      sandPricePerCft: 1.5,
      aggregatePricePerCft: 1.2,
      steelPricePerKg: 1.1,
      brickPricePerPiece: 0.15,
      laborCostPerSqFt: 8,
    });
  };

  const results: ConstructionCostResults = calculateConstructionCost(inputs);

  const getResultsText = () => {
    return `Construction Budget Estimation (BuildMetric):
- Built-up Area: ${inputs.builtUpAreaSqFt} Sq Ft
- Quality Tier: ${inputs.qualityGrade.toUpperCase()} ($${inputs.unitCostPerSqFt}/sq ft)
- Total Estimated Project Budget: $${results.totalEstimatedCost.toLocaleString()}
- Cement Budget Share (16%): $${results.cementCost.toLocaleString()}
- Steel Rebar Share (15%): $${results.steelCost.toLocaleString()}
- Sand Budget Share (8%): $${results.sandCost.toLocaleString()}
- Aggregate Share (7%): $${results.aggregateCost.toLocaleString()}
- Bricks & Masonry (10%): $${results.brickCost.toLocaleString()}
- Finishing & Tiles (16%): $${results.finishingCost.toLocaleString()}
- Doors, Windows & Fittings (8%): $${results.fittingsCost.toLocaleString()}
- Labor & Contracting (20%): $${results.laborCost.toLocaleString()}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getResultsText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const printTableData = [
    { label: 'Built-Up Area', value: inputs.builtUpAreaSqFt, unit: 'Sq Ft' },
    { label: 'Quality Grade Specification', value: inputs.qualityGrade.toUpperCase() },
    { label: 'Base Rate per Sq Ft', value: `$${inputs.unitCostPerSqFt}` },
    { label: 'Total Project Budget', value: `$${results.totalEstimatedCost.toLocaleString()}` },
    { label: 'Cement Cost Share (16%)', value: `$${results.cementCost.toLocaleString()}` },
    { label: 'Steel Rebar Share (15%)', value: `$${results.steelCost.toLocaleString()}` },
    { label: 'Sand Cost Share (8%)', value: `$${results.sandCost.toLocaleString()}` },
    { label: 'Coarse Aggregate Share (7%)', value: `$${results.aggregateCost.toLocaleString()}` },
    { label: 'Bricks & Masonry (10%)', value: `$${results.brickCost.toLocaleString()}` },
    { label: 'Finishing & Tiles (16%)', value: `$${results.finishingCost.toLocaleString()}` },
    { label: 'Fittings & Electrical (8%)', value: `$${results.fittingsCost.toLocaleString()}` },
    { label: 'Labor Expenses (20%)', value: `$${results.laborCost.toLocaleString()}` },
  ];

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#0F2D5C]" />
              <h3 className="font-bold text-slate-900 text-lg">Project Scope & Rates</h3>
            </div>
            
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Quality Tier Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Building Quality Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['basic', 'standard', 'premium'] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => handleQualityChange(tier)}
                  className={`p-3 rounded-xl border text-center transition-all ${inputs.qualityGrade === tier ? 'border-[#0F2D5C] bg-blue-50/80 text-[#0F2D5C] font-black ring-2 ring-[#0F2D5C]/20' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'}`}
                >
                  <div className="capitalize text-xs font-bold">{tier}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {tier === 'basic' ? '$20/sqft' : tier === 'standard' ? '$32/sqft' : '$50/sqft'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Built up area and unit rate */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Built-Up Area (Sq Ft)
              </label>
              <input
                type="number"
                min="100"
                step="50"
                value={inputs.builtUpAreaSqFt}
                onChange={(e) => handleChange('builtUpAreaSqFt', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Cost Rate per Sq Ft ($)
              </label>
              <input
                type="number"
                min="1"
                step="any"
                value={inputs.unitCostPerSqFt}
                onChange={(e) => handleChange('unitCostPerSqFt', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="font-bold text-slate-800">Standard Civil Percentage Allocation:</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <span>• Cement: 16%</span>
              <span>• Steel: 15%</span>
              <span>• Sand: 8%</span>
              <span>• Aggregates: 7%</span>
              <span>• Bricks: 10%</span>
              <span>• Finishing: 16%</span>
              <span>• Labor: 20%</span>
              <span>• Fittings: 8%</span>
            </div>
          </div>

        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border-2 border-[#0F2D5C] p-6 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="font-black text-slate-900 text-xl">Total Project Budget</h3>
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
                <span className="text-xs uppercase font-semibold text-slate-300">Total Estimated Budget</span>
                <div className="text-4xl font-black text-[#F4B400] mt-1">
                  ${results.totalEstimatedCost.toLocaleString()}
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Scope: {inputs.builtUpAreaSqFt} Sq Ft @ ${inputs.unitCostPerSqFt}/sq ft
                </div>
              </div>
              <DollarSign className="w-10 h-10 text-[#F4B400]" />
            </div>

            {/* Visual Progress/Distribution Stack */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
                <span>Material & Labor Share Breakdown</span>
                <span>100% Total</span>
              </div>
              
              <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-200 shadow-inner">
                {results.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    title={`${item.item}: $${item.cost.toLocaleString()}`}
                  />
                ))}
              </div>
            </div>

            {/* Itemized Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {results.breakdown.map((item, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold text-slate-700 line-clamp-1">{item.item}</span>
                  </div>
                  <span className="font-bold text-slate-900">${item.cost.toLocaleString()}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0F2D5C]" />
          <span>Derivation Method</span>
        </h4>
        <div className="bg-slate-50 rounded-xl p-4 font-mono text-xs text-slate-700 space-y-1">
          {results.steps.map((s, i) => <div key={i}>{s}</div>)}
        </div>
      </div>

      {showPrintModal && (
        <PrintModal
          title="Building Construction Cost Estimate Sheet"
          summaryText={`Estimated total house construction budget for ${inputs.builtUpAreaSqFt} Sq Ft.`}
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

import React, { useState } from 'react';
import { ConstructionCostInputs, ConstructionCostResults } from '../../types';
import { calculateConstructionCost } from '../../utils/calculatorLogic';
import { RotateCcw, Copy, Printer, Check, Calculator, DollarSign, Sparkles, HelpCircle, ChevronDown, ChevronUp, Layers, Coins } from 'lucide-react';
import { PrintModal } from '../PrintModal';

export const ConstructionCostCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<ConstructionCostInputs>({
    currency: 'SAR',
    builtUpAreaM2: 150,
    cementPricePerBag: 15.5,
    sandPricePerM3: 45,
    aggregatePricePerM3: 50,
    brickPricePerPiece: 3.2,
    steelPricePerKg: 3.5,
    tilePricePerM2: 40,
    paintPricePerLiter: 25,
    masonDailyWage: 180,
    masonDaysCount: 38,
    helperDailyWage: 100,
    helperDaysCount: 52,
    transportation: 2500,
    otherExpenses: 5000,
    contingencyPercent: 5,
  });

  const [copied, setCopied] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showAssumptions, setShowAssumptions] = useState(false);

  const handleChange = (field: keyof ConstructionCostInputs, val: any) => {
    setInputs(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    setInputs({
      currency: 'SAR',
      builtUpAreaM2: 150,
      cementPricePerBag: 15.5,
      sandPricePerM3: 45,
      aggregatePricePerM3: 50,
      brickPricePerPiece: 3.2,
      steelPricePerKg: 3.5,
      tilePricePerM2: 40,
      paintPricePerLiter: 25,
      masonDailyWage: 180,
      masonDaysCount: 38,
      helperDailyWage: 100,
      helperDaysCount: 52,
      transportation: 2500,
      otherExpenses: 5000,
      contingencyPercent: 5,
    });
  };

  const results: ConstructionCostResults = calculateConstructionCost(inputs);
  const curr = results.currency || 'SAR';

  const getResultsText = () => {
    return `BuildMetric Construction Calculation Report
Date: ${new Date().toLocaleDateString()}
Calculator: Building Construction Cost Estimator (${curr})

INPUT SUMMARY:
- Built-up Area: ${results.builtUpAreaM2} m² (${results.builtUpAreaSqFt} Sq Ft)
- Currency: ${curr}
- Cement Price per Bag: ${curr} ${inputs.cementPricePerBag}
- Sand Price per m³: ${curr} ${inputs.sandPricePerM3}
- Aggregate Price per m³: ${curr} ${inputs.aggregatePricePerM3}
- Brick Price per Piece: ${curr} ${inputs.brickPricePerPiece}
- Steel Price per kg: ${curr} ${inputs.steelPricePerKg}
- Tile Price per m²: ${curr} ${inputs.tilePricePerM2}
- Paint Price per Liter: ${curr} ${inputs.paintPricePerLiter}
- Mason Daily Wage: ${curr} ${inputs.masonDailyWage} (${results.laborBreakdown.masonDays} days)
- Helper Daily Wage: ${curr} ${inputs.helperDailyWage} (${results.laborBreakdown.helperDays} days)
- Transportation: ${curr} ${inputs.transportation}
- Other Expenses: ${curr} ${inputs.otherExpenses}
- Contingency Margin: ${inputs.contingencyPercent}%

CALCULATION RESULTS:
- Material Cost: ${curr} ${results.materialCost.toLocaleString()}
- Labor Cost: ${curr} ${results.laborCost.toLocaleString()}
- Transportation: ${curr} ${results.transportation.toLocaleString()}
- Other Expenses: ${curr} ${results.otherExpenses.toLocaleString()}
- Contingency (${inputs.contingencyPercent}%): ${curr} ${results.contingency.toLocaleString()}
- Total Project Cost: ${curr} ${results.grandTotal.toLocaleString()}
- Cost per m²: ${curr} ${results.costPerM2.toLocaleString()}
- Cost per sq ft: ${curr} ${results.costPerSqFt.toLocaleString()}

FORMULA & ASSUMPTIONS:
- Material quantities estimated using standard civil engineering factors per m² of built-up area.
- Grand Total = Material Cost + Labor Cost + Transportation + Other Expenses + Contingency.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getResultsText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const printTableData = [
    { label: 'Built-up Area (m²)', value: results.builtUpAreaM2, unit: 'm²' },
    { label: 'Built-up Area (Sq Ft)', value: results.builtUpAreaSqFt, unit: 'Sq Ft' },
    { label: 'Material Cost Total', value: `${curr} ${results.materialCost.toLocaleString()}` },
    { label: 'Labor Cost Total', value: `${curr} ${results.laborCost.toLocaleString()}` },
    { label: 'Transportation Expenses', value: `${curr} ${results.transportation.toLocaleString()}` },
    { label: 'Other Project Expenses', value: `${curr} ${results.otherExpenses.toLocaleString()}` },
    { label: `Contingency Margin (${inputs.contingencyPercent}%)`, value: `${curr} ${results.contingency.toLocaleString()}` },
    { label: 'Total Project Cost', value: `${curr} ${results.grandTotal.toLocaleString()}` },
    { label: 'Cost per m²', value: `${curr} ${results.costPerM2.toLocaleString()}` },
    { label: 'Cost per Sq Ft', value: `${curr} ${results.costPerSqFt.toLocaleString()}` },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#0F2D5C]" />
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">Project Scope & Custom Rates</h3>
            </div>
            
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0F2D5C] bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Currency Selection & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Currency Mode
              </label>
              <select
                value={inputs.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm bg-white focus:border-[#0F2D5C]"
              >
                <option value="SAR">Saudi Riyal (SAR - ﷼)</option>
                <option value="AED">UAE Dirham (AED - د.إ)</option>
                <option value="QAR">Qatari Riyal (QAR - ﷼)</option>
                <option value="KWD">Kuwaiti Dinar (KWD - د.ك)</option>
                <option value="BHD">Bahraini Dinar (BHD - .د.ب)</option>
                <option value="OMR">Omani Rial (OMR - ﷼)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="INR">Indian Rupee (₹)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Built-Up Area (m²)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={inputs.builtUpAreaM2 || ''}
                  onChange={(e) => handleChange('builtUpAreaM2', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-sm focus:border-[#0F2D5C]"
                  placeholder="e.g. 150"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                  ≈ {results.builtUpAreaSqFt} Sq Ft
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Material Rates */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] flex items-center justify-between border-b pb-1">
              <span>Material Unit Rates ({curr})</span>
              <span className="text-[10px] text-slate-400 font-normal">Custom rates allowed</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Cement ({curr} / bag)</label>
                <input
                  type="number"
                  step="any"
                  value={inputs.cementPricePerBag}
                  onChange={(e) => handleChange('cementPricePerBag', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Sand ({curr} / m³)</label>
                <input
                  type="number"
                  step="any"
                  value={inputs.sandPricePerM3}
                  onChange={(e) => handleChange('sandPricePerM3', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Aggregate ({curr} / m³)</label>
                <input
                  type="number"
                  step="any"
                  value={inputs.aggregatePricePerM3}
                  onChange={(e) => handleChange('aggregatePricePerM3', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Brick ({curr} / piece)</label>
                <input
                  type="number"
                  step="any"
                  value={inputs.brickPricePerPiece}
                  onChange={(e) => handleChange('brickPricePerPiece', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Steel ({curr} / kg)</label>
                <input
                  type="number"
                  step="any"
                  value={inputs.steelPricePerKg}
                  onChange={(e) => handleChange('steelPricePerKg', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tile ({curr} / m²)</label>
                <input
                  type="number"
                  step="any"
                  value={inputs.tilePricePerM2}
                  onChange={(e) => handleChange('tilePricePerM2', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-slate-700 font-semibold mb-1">Paint ({curr} / liter)</label>
                <input
                  type="number"
                  step="any"
                  value={inputs.paintPricePerLiter}
                  onChange={(e) => handleChange('paintPricePerLiter', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Labor Rates */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] border-b pb-1">
              Labor & Daily Wages ({curr})
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Mason Wage / day</label>
                <input
                  type="number"
                  step="any"
                  value={inputs.masonDailyWage}
                  onChange={(e) => handleChange('masonDailyWage', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Mason Days</label>
                <input
                  type="number"
                  step="1"
                  value={inputs.masonDaysCount || ''}
                  onChange={(e) => handleChange('masonDaysCount', parseInt(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                  placeholder="Auto"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Helper Wage / day</label>
                <input
                  type="number"
                  step="any"
                  value={inputs.helperDailyWage}
                  onChange={(e) => handleChange('helperDailyWage', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Helper Days</label>
                <input
                  type="number"
                  step="1"
                  value={inputs.helperDaysCount || ''}
                  onChange={(e) => handleChange('helperDaysCount', parseInt(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                  placeholder="Auto"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Logistics, Expenses & Contingency */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] border-b pb-1">
              Logistics, Expenses & Contingency
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Transportation ({curr})</label>
                <input
                  type="number"
                  step="any"
                  value={inputs.transportation}
                  onChange={(e) => handleChange('transportation', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Other Expenses ({curr})</label>
                <input
                  type="number"
                  step="any"
                  value={inputs.otherExpenses}
                  onChange={(e) => handleChange('otherExpenses', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Contingency (%)</label>
                <input
                  type="number"
                  step="any"
                  value={inputs.contingencyPercent}
                  onChange={(e) => handleChange('contingencyPercent', parseFloat(e.target.value) || 0)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Output Summary Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border-2 border-[#0F2D5C] p-4 sm:p-6 shadow-xl space-y-5 sm:space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-100 px-2.5 py-0.5 rounded-full">
                  Estimate Summary
                </span>
                <h3 className="font-black text-slate-900 text-xl mt-1">
                  Cost Breakdown
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  title="Copy results"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={() => setShowPrintModal(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] text-xs font-bold transition-colors cursor-pointer"
                  title="Print formal report"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Total Highlight Banner */}
            <div className="bg-gradient-to-r from-[#0F2D5C] to-[#163c78] rounded-2xl p-5 text-white shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-semibold text-slate-300">
                    Total Project Cost
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#F4B400] mt-0.5">
                    {curr} {results.grandTotal.toLocaleString()}
                  </div>
                </div>
                <Coins className="w-10 h-10 text-[#F4B400]" />
              </div>

              {/* Unit Cost Rates Display */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/10 rounded-xl p-2.5">
                  <div className="text-slate-300 font-medium">Cost per m²</div>
                  <div className="text-base font-black text-white mt-0.5">
                    {curr} {results.costPerM2.toLocaleString()}
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-2.5">
                  <div className="text-slate-300 font-medium">Cost per Sq Ft</div>
                  <div className="text-base font-black text-white mt-0.5">
                    {curr} {results.costPerSqFt.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
                <span>Budget Share Distribution</span>
                <span>100%</span>
              </div>
              
              <div className="w-full h-3.5 rounded-full overflow-hidden flex bg-slate-200 shadow-inner">
                {results.breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    title={`${item.item}: ${curr} ${item.cost.toLocaleString()}`}
                  />
                ))}
              </div>
            </div>

            {/* Itemized Major Categories Table */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-bold">
                <span className="text-slate-700">Material Cost Total</span>
                <span className="text-[#0F2D5C]">{curr} {results.materialCost.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-bold">
                <span className="text-slate-700">Labor Cost Total</span>
                <span className="text-[#0F2D5C]">{curr} {results.laborCost.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-bold">
                <span className="text-slate-700">Transportation</span>
                <span className="text-[#0F2D5C]">{curr} {results.transportation.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-bold">
                <span className="text-slate-700">Other Expenses</span>
                <span className="text-[#0F2D5C]">{curr} {results.otherExpenses.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between font-bold text-amber-900">
                <span>Contingency Margin ({inputs.contingencyPercent}%)</span>
                <span>{curr} {results.contingency.toLocaleString()}</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Expandable Formula & Assumptions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
        <button
          onClick={() => setShowAssumptions(!showAssumptions)}
          className="w-full p-4 sm:p-5 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left focus:outline-none cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F2D5C] text-[#F4B400] flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                Formula & Civil Engineering Assumptions
              </h4>
              <p className="text-xs text-slate-500">
                How materials, labor days, and unit rates are derived
              </p>
            </div>
          </div>
          <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600">
            {showAssumptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showAssumptions && (
          <div className="p-4 sm:p-6 border-t border-slate-200 bg-white space-y-4 text-xs text-slate-600 leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-[#0F2D5C] uppercase">Material Estimations per m²</div>
                <p>• Cement: ~4.3 bags per m² ({results.materialBreakdown.cementBags} bags total)</p>
                <p>• Sand: ~0.55 m³ per m² ({results.materialBreakdown.sandM3} m³ total)</p>
                <p>• Aggregates: ~0.41 m³ per m² ({results.materialBreakdown.aggregateM3} m³ total)</p>
                <p>• Bricks: ~194 pieces per m² ({results.materialBreakdown.brickPieces} pcs total)</p>
                <p>• Steel: ~43 kg per m² ({results.materialBreakdown.steelKg} kg total)</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-[#0F2D5C] uppercase">Labor & Contingency Formulas</div>
                <p>• Mason Days: ~0.25 days per m² ({results.laborBreakdown.masonDays} days)</p>
                <p>• Helper Days: ~0.35 days per m² ({results.laborBreakdown.helperDays} days)</p>
                <p>• Contingency = Subtotal × ({inputs.contingencyPercent} / 100)</p>
                <p>• Cost per m² = Grand Total / {results.builtUpAreaM2} m²</p>
                <p>• Cost per Sq Ft = Grand Total / {results.builtUpAreaSqFt} Sq Ft</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Step Derivation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-3">
        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0F2D5C]" />
          <span>Step-by-Step Derivation Log</span>
        </h4>
        <div className="bg-slate-50 rounded-xl p-3.5 sm:p-4 border border-slate-200 font-mono text-xs text-slate-700 space-y-1.5 overflow-x-auto">
          {results.steps.map((st, i) => (
            <div key={i} className="whitespace-pre-wrap">{st}</div>
          ))}
        </div>
      </div>

      {showPrintModal && (
        <PrintModal
          title={`Building Construction Cost Estimate Report (${curr})`}
          summaryText={`Detailed project cost estimation for ${results.builtUpAreaM2} m² (${results.builtUpAreaSqFt} Sq Ft) built-up area.`}
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

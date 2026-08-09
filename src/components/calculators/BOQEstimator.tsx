import React, { useState } from 'react';
import { BOQItem } from '../../types';
import { Copy, Check, Printer, RotateCcw, Plus, Trash2, FileSpreadsheet } from 'lucide-react';

export const BOQEstimator: React.FC = () => {
  const [items, setItems] = useState<BOQItem[]>([
    { id: '1', itemNo: '1.0', description: 'Site Excavation in Ordinary Soil', unit: 'CFT', quantity: 1200, rate: 8, amount: 9600 },
    { id: '2', itemNo: '2.0', description: 'PCC Foundation Bedding (M10 grade)', unit: 'CFT', quantity: 350, rate: 165, amount: 57750 },
    { id: '3', itemNo: '3.0', description: 'RCC Structure Slab & Beam (M20 grade)', unit: 'CFT', quantity: 1500, rate: 285, amount: 427500 },
    { id: '4', itemNo: '4.0', description: 'TMT Steel Reinforcement Fe500', unit: 'Kg', quantity: 4500, rate: 75, amount: 337500 },
    { id: '5', itemNo: '5.0', description: '9-inch Brick Masonry Wall in Cement Mortar 1:6', unit: 'CFT', quantity: 1800, rate: 190, amount: 342000 },
    { id: '6', itemNo: '6.0', description: '12mm Wall Cement Plaster 1:4', unit: 'Sq Ft', quantity: 4200, rate: 28, amount: 117600 },
  ]);

  const [taxPercent, setTaxPercent] = useState<number>(5);
  const [copied, setCopied] = useState(false);

  const subtotal = items.reduce((acc, curr) => acc + (curr.quantity * curr.rate), 0);
  const taxAmount = (subtotal * taxPercent) / 100;
  const grandTotal = subtotal + taxAmount;

  const handleItemChange = (id: string, field: keyof BOQItem, val: any) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: val };
        if (field === 'quantity' || field === 'rate') {
          updated.amount = Number(updated.quantity || 0) * Number(updated.rate || 0);
        }
        return updated;
      }
      return item;
    }));
  };

  const handleAddItem = () => {
    const newId = Date.now().toString();
    const newNo = `${items.length + 1}.0`;
    setItems(prev => [
      ...prev,
      { id: newId, itemNo: newNo, description: 'New Construction Work Item', unit: 'Sq Ft', quantity: 100, rate: 50, amount: 5000 }
    ]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleReset = () => {
    setItems([
      { id: '1', itemNo: '1.0', description: 'Site Excavation in Ordinary Soil', unit: 'CFT', quantity: 1200, rate: 8, amount: 9600 },
      { id: '2', itemNo: '2.0', description: 'PCC Foundation Bedding (M10 grade)', unit: 'CFT', quantity: 350, rate: 165, amount: 57750 },
      { id: '3', itemNo: '3.0', description: 'RCC Structure Slab & Beam (M20 grade)', unit: 'CFT', quantity: 1500, rate: 285, amount: 427500 },
      { id: '4', itemNo: '4.0', description: 'TMT Steel Reinforcement Fe500', unit: 'Kg', quantity: 4500, rate: 75, amount: 337500 }
    ]);
    setTaxPercent(5);
  };

  const handleCopy = () => {
    let text = `BuildMetric - Bill of Quantities (BOQ) Estimate\n-------------------------------------------------\n`;
    items.forEach((item) => {
      text += `${item.itemNo} | ${item.description} | ${item.quantity} ${item.unit} @ $${item.rate} = $${item.amount.toLocaleString()}\n`;
    });
    text += `-------------------------------------------------\nSubtotal: $${subtotal.toLocaleString()}\nContingency/Tax (${taxPercent}%): $${taxAmount.toLocaleString()}\nGRAND TOTAL: $${grandTotal.toLocaleString()}\n-------------------------------------------------\nGenerated via BuildMetric (https://buildmetric.app)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0F2D5C] text-white p-6 rounded-2xl shadow-md border-b-4 border-[#F4B400]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#F4B400] rounded-xl text-[#0F2D5C]">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Bill of Quantities (BOQ) Estimator</h2>
              <p className="text-blue-100 text-sm">Interactive line-item cost schedule and contractor bidding summary</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy BOQ'}
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-[#F4B400] hover:bg-amber-400 text-[#0F2D5C] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Print Report
            </button>
          </div>
        </div>
      </div>

      {/* BOQ Items Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F2D5C]"></span>
            Itemized Bill Schedule
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-[#0F2D5C] flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg hover:bg-slate-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset BOQ
            </button>
            <button
              onClick={handleAddItem}
              className="px-3 py-1.5 bg-[#0F2D5C] hover:bg-blue-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-4 h-4 text-[#F4B400]" />
              Add Item
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold uppercase text-xs tracking-wider border-b border-slate-200">
                <th className="p-3 w-16">Item #</th>
                <th className="p-3">Description of Work</th>
                <th className="p-3 w-28">Unit</th>
                <th className="p-3 w-28 text-right">Quantity</th>
                <th className="p-3 w-32 text-right">Rate ($)</th>
                <th className="p-3 w-36 text-right">Amount ($)</th>
                <th className="p-3 w-12 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-2">
                    <input
                      type="text"
                      value={item.itemNo}
                      onChange={e => handleItemChange(item.id, 'itemNo', e.target.value)}
                      className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded font-bold text-slate-700"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={e => handleItemChange(item.id, 'description', e.target.value)}
                      className="w-full px-2.5 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800 font-semibold"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={item.unit}
                      onChange={e => handleItemChange(item.id, 'unit', e.target.value)}
                      className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-600"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={item.quantity}
                      onChange={e => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                      className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-right font-bold text-slate-800"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={item.rate}
                      onChange={e => handleItemChange(item.id, 'rate', Number(e.target.value))}
                      className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-right font-bold text-slate-800"
                    />
                  </td>
                  <td className="p-2 text-right font-extrabold text-[#0F2D5C]">
                    ${(item.quantity * item.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1 text-slate-400 hover:text-red-600 transition-colors rounded hover:bg-red-50"
                      title="Remove line item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BOQ Summary Totals */}
        <div className="pt-4 border-t border-slate-200 flex flex-col md:flex-row items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Contingency & Taxes (%):
            </label>
            <input
              type="number"
              min="0"
              max="30"
              value={taxPercent}
              onChange={e => setTaxPercent(Math.max(0, Number(e.target.value)))}
              className="w-20 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold text-center"
            />
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 min-w-[300px] space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Subtotal Amount:</span>
              <span className="font-bold text-white">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Contingency / Tax ({taxPercent}%):</span>
              <span className="font-bold text-white">${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-800 text-base font-extrabold text-[#F4B400]">
              <span>GRAND TOTAL:</span>
              <span>${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

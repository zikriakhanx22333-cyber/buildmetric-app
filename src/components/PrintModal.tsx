import React from 'react';
import { X, Printer, Copy, Check, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

interface PrintModalProps {
  title: string;
  summaryText: string;
  steps: string[];
  resultsTable: { label: string; value: string | number; unit?: string }[];
  onClose: () => void;
  onCopy: () => void;
  copied: boolean;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  title,
  summaryText,
  steps,
  resultsTable,
  onClose,
  onCopy,
  copied,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#0F2D5C] text-white p-5 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#F4B400]" />
            <h3 className="font-bold text-lg">Formal Calculation Report</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 space-y-6 text-slate-800 printable-area">
          
          {/* Header Branding for Print */}
          <div className="flex items-center justify-between border-b-2 border-[#0F2D5C] pb-4">
            <Logo />
            <div className="text-right">
              <div className="text-xs font-bold text-slate-400 uppercase">Official Estimate Sheet</div>
              <div className="text-xs text-slate-500">{new Date().toLocaleDateString('en-US', { dateStyle: 'medium' })}</div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-[#0F2D5C]">{title}</h2>
            <p className="text-xs text-slate-500 mt-1">{summaryText}</p>
          </div>

          {/* Results Summary Table */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
            <div className="bg-[#0F2D5C] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider">
              Calculation Output Summary
            </div>
            <table className="w-full text-sm text-left">
              <tbody className="divide-y divide-slate-200">
                {resultsTable.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-4 py-3 font-semibold text-slate-700">{row.label}</td>
                    <td className="px-4 py-3 font-black text-[#0F2D5C] text-right">
                      {row.value} {row.unit || ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation Steps */}
          {steps && steps.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Step-by-Step Mathematical Derivation
              </h4>
              <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100 text-xs text-slate-700 space-y-1.5 font-mono">
                {steps.map((st, i) => (
                  <div key={i}>{st}</div>
                ))}
              </div>
            </div>
          )}

          {/* Print Footer Disclaimer */}
          <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Generated via BuildMetric Smart Construction Platform</span>
            <span>https://buildmetric-app.vercel.app</span>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3 no-print">
          <button
            onClick={onCopy}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-bold shadow-sm transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Text Summary'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-slate-800 text-sm font-semibold"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] text-sm font-bold shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

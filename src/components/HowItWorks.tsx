import React from 'react';
import { Calculator, FolderPlus, Layers, FileSpreadsheet, Printer, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <Calculator className="w-5 h-5" />,
      title: 'CALCULATE',
      desc: 'Enter dimensions, mix ratios, or bar sizes in any specialized construction calculator.'
    },
    {
      num: '02',
      icon: <FolderPlus className="w-5 h-5" />,
      title: 'SAVE',
      desc: 'Click "+ Add to Project" to store material quantities and calculations with 1-click.'
    },
    {
      num: '03',
      icon: <Layers className="w-5 h-5" />,
      title: 'PROJECT',
      desc: 'Track aggregate cement bags, rebar tonnage, concrete m³ and floor areas across the site.'
    },
    {
      num: '04',
      icon: <FileSpreadsheet className="w-5 h-5" />,
      title: 'BOQ',
      desc: 'Assemble trade sections, enter itemized unit rates, and auto-compute VAT & subtotals.'
    },
    {
      num: '05',
      icon: <Printer className="w-5 h-5" />,
      title: 'EXPORT PDF',
      desc: 'Generate client quotations, site tender schedules, and downloadable Excel spreadsheets.'
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F2D5C] bg-blue-50 px-3 py-1 rounded-full">
            The BuildMetric Method
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
            How Estimation Workspace Works
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            A seamless bridge from on-site structural calculations to client-ready tender proposals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-center flex flex-col items-center hover:border-[#0F2D5C] transition-all group shadow-xs"
            >
              <div className="w-8 h-8 rounded-full bg-[#0F2D5C] text-[#F4B400] text-xs font-black flex items-center justify-center mb-3">
                {step.num}
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100/70 border border-blue-200 flex items-center justify-center mb-3 group-hover:bg-[#0F2D5C] group-hover:text-[#F4B400] text-[#0F2D5C] transition-colors">
                {step.icon}
              </div>

              <h3 className="font-black text-slate-900 text-sm tracking-wider uppercase mb-1.5">
                {step.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

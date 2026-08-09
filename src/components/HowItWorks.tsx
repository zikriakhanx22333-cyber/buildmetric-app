import React from 'react';
import { MousePointerClick, Edit3, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <MousePointerClick className="w-6 h-6 text-[#0F2D5C]" />,
      title: 'Choose Tool',
      desc: 'Select from concrete, steel, brick, tile, paint, or cost calculators.'
    },
    {
      num: '02',
      icon: <Edit3 className="w-6 h-6 text-[#0F2D5C]" />,
      title: 'Enter Measurements',
      desc: 'Input dimensions in feet or meters with optional wastage & mix ratio.'
    },
    {
      num: '03',
      icon: <Cpu className="w-6 h-6 text-[#0F2D5C]" />,
      title: 'Calculate',
      desc: 'Instant calculation executed locally in your browser using standard formulas.'
    },
    {
      num: '04',
      icon: <CheckCircle2 className="w-6 h-6 text-[#0F2D5C]" />,
      title: 'Get Results',
      desc: 'View itemized quantities, copy or print formal summary reports.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F2D5C] bg-blue-100 px-3 py-1 rounded-full">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">
            How BuildMetric Works
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Get accurate civil material estimates in less than 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center flex flex-col items-center group hover:border-[#0F2D5C] transition-colors">
              <span className="absolute -top-4 bg-[#0F2D5C] text-[#F4B400] text-xs font-black px-3 py-1 rounded-full shadow-md">
                STEP {step.num}
              </span>
              <div className="w-14 h-14 rounded-2xl bg-blue-100/70 border border-blue-200 flex items-center justify-center mb-4 mt-2 group-hover:bg-[#0F2D5C] transition-colors">
                {React.cloneElement(step.icon, {
                  className: "w-6 h-6 text-[#0F2D5C] group-hover:text-[#F4B400] transition-colors"
                })}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
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

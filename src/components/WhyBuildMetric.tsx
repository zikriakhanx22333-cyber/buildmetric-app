import React from 'react';
import { Zap, ShieldCheck, HeartHandshake, Smartphone, UserX, CheckCircle, ArrowRight } from 'lucide-react';

export const WhyBuildMetric: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-[#F4B400]" />,
      title: 'Fast Calculations',
      description: 'Calculates results instantly in your web browser with zero waiting time or server round-trips.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#F4B400]" />,
      title: 'Accurate Formulas',
      description: 'Based on standard IS, ACI, and BS civil engineering code specifications and material bulk densities.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-[#F4B400]" />,
      title: '100% Free to Use',
      description: 'All 11+ estimation tools are completely free with no hidden paywalls or subscription limits.'
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#F4B400]" />,
      title: 'Mobile Friendly',
      description: 'Optimized touch interface works seamlessly on smartphones and tablets directly at the construction site.'
    },
    {
      icon: <UserX className="w-6 h-6 text-[#F4B400]" />,
      title: 'No Registration Required',
      description: 'No account, sign-up, or personal information required. Open the site and calculate immediately.'
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F2D5C] bg-blue-100 px-3 py-1 rounded-full">
            Why Professionals Choose Us
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">
            Designed for Real-World Construction Sites
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            BuildMetric eliminates guesswork with precise material quantity estimation and instant cost budgeting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((feat, i) => (
            <div 
              key={i} 
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0F2D5C] flex items-center justify-center mb-4 shadow-sm">
                {feat.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { ShieldCheck, Calculator } from 'lucide-react';
import { SEO } from './SEO';

export const AboutView: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SEO 
        title="About BuildMetric - Free Construction Calculators Platform"
        description="Learn about BuildMetric's mission to provide reliable, code-compliant civil engineering estimators for concrete, steel, masonry, and cost calculation."
        canonicalUrl="https://buildmetric.com/about"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F2D5C] bg-blue-100 px-3 py-1 rounded-full">
            About BuildMetric
          </span>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Smart Construction Calculators &amp; Estimation Platform
          </h1>

          <p className="text-slate-600 text-base leading-relaxed">
            BuildMetric was founded to empower civil engineers, site managers, architects, contractors, students, and DIY homeowners with fast, reliable, and standardized material estimation tools.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
              <ShieldCheck className="w-6 h-6 text-[#0F2D5C] mb-2" />
              <h3 className="font-bold text-slate-900 text-base">IS / ACI Code Compliant</h3>
              <p className="text-xs text-slate-600 mt-1">
                Formulas follow standard IS 456, ACI 318, and British Standard specifications for RCC design.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
              <Calculator className="w-6 h-6 text-[#0F2D5C] mb-2" />
              <h3 className="font-bold text-slate-900 text-base">100% Free Local Calculations</h3>
              <p className="text-xs text-slate-600 mt-1">
                Runs instantly inside client browser session. No sign-up, fees, or data selling.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
            Whether you are calculating cement bags for an M20 slab, estimating rebar steel tonnage, or budgeting total building construction costs per square foot, BuildMetric provides instant precision.
          </div>
        </div>

      </div>
    </div>
  );
};

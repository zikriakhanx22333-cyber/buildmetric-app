import React from 'react';
import { SEO } from './SEO';
import { ShieldCheck, Lock, EyeOff } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <SEO 
        title="Privacy Policy | BuildMetric Construction Tools"
        description="BuildMetric respects user privacy. All civil engineering calculations occur 100% client-side in your browser."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
          
          <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0F2D5C] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#F4B400]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
              <p className="text-xs font-semibold text-slate-400">Last updated: August 2026</p>
            </div>
          </div>

          <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">1. Client-Side Execution</h2>
              <p>
                BuildMetric is designed with a strict privacy-first architecture. All calculation engines (concrete mix, steel rebar schedules, brick estimation, tile layout, paint volume, and BOQ costing) execute entirely within your client web browser session.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">2. Data Collection & Analytics</h2>
              <p>
                We do not require user account registration, login credentials, or personal contact details to access any calculator on BuildMetric. Measurement inputs entered into calculation forms are never saved to remote servers or shared with third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">3. Cookies & Local Storage</h2>
              <p>
                BuildMetric may utilize lightweight local browser storage purely to remember user preferences (such as selected unit preferences e.g. Meters vs Feet). No tracking or cross-site profiling cookies are deployed.
              </p>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

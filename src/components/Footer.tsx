import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Shield, Lock, Calculator } from 'lucide-react';
import { CATEGORIES, CALCULATORS } from '../data/calculators';
import { getSlugFromId } from '../utils/slugs';

interface FooterProps {
  onOpenDisclaimer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDisclaimer }) => {
  const navigate = useNavigate();

  const navigateTo = (url: string) => {
    navigate(url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F2D5C] text-slate-300 pt-14 pb-8 border-t-4 border-[#F4B400]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-blue-900/60">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm inline-block">
              <Logo className="text-white" />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              BuildMetric is an all-in-one construction calculator and estimation platform. Providing accurate civil engineering tools, mix ratio formulas, steel rebar schedules, and material cost budgeting.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950 border border-blue-800 text-xs font-semibold text-[#F4B400]">
                <Shield className="w-3.5 h-3.5" />
                <span>100% Verified Formulas</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950 border border-blue-800 text-xs font-semibold text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                <span>No Registration Required</span>
              </div>
            </div>
          </div>

          {/* Quick Calculators Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#F4B400]" />
              <span>Calculators</span>
            </h3>
            <ul className="space-y-2 text-sm">
              {CALCULATORS.slice(0, 4).map((calc) => (
                <li key={calc.id}>
                  <button
                    onClick={() => navigateTo(`/calculators/${getSlugFromId(calc.id)}`)}
                    className="hover:text-[#F4B400] transition-colors text-left line-clamp-1 cursor-pointer"
                  >
                    {calc.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigateTo('/calculators/gfrc-mix-calculator')}
                  className="hover:text-[#F4B400] transition-colors text-left line-clamp-1 cursor-pointer"
                >
                  GFRC / GRC Mix Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/calculators/ytong-aac-calculator')}
                  className="hover:text-[#F4B400] transition-colors text-left line-clamp-1 cursor-pointer"
                >
                  YTONG AAC Block Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/converters')}
                  className="hover:text-[#F4B400] transition-colors text-left line-clamp-1 cursor-pointer text-[#F4B400] font-semibold"
                >
                  Unit Converters (CFT/m³) →
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('/ar/calculators')}
                  className="hover:text-[#F4B400] transition-colors text-left line-clamp-1 cursor-pointer text-[#F4B400] font-semibold"
                >
                  حاسبات البناء بالعربية (عربي) →
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo(`/categories/${cat.id}`)}
                    className="hover:text-[#F4B400] transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Company & Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigateTo('/about')} className="hover:text-[#F4B400] transition-colors cursor-pointer">
                  About BuildMetric
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/blog')} className="hover:text-[#F4B400] transition-colors cursor-pointer">
                  Engineering Blog
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/contact')} className="hover:text-[#F4B400] transition-colors cursor-pointer">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={onOpenDisclaimer} className="hover:text-[#F4B400] transition-colors cursor-pointer">
                  Engineering Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/privacy')} className="hover:text-[#F4B400] transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/terms')} className="hover:text-[#F4B400] transition-colors cursor-pointer">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Engineering Disclaimer Bar */}
        <div className="py-6 border-b border-blue-900/60 text-xs text-slate-400 space-y-2">
          <p>
            <strong className="text-slate-200">Engineering Disclaimer:</strong> BuildMetric calculators provide estimations based on standard IS/BS/ACI civil engineering formulas and nominal material densities. Site conditions, moisture content, compaction factors, and contractor execution may vary. Always consult a licensed structural engineer or project consultant before purchasing bulk structural materials.
          </p>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} BuildMetric. All rights reserved. Smart Construction Calculators & Estimation Tools.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('/privacy')} className="hover:underline cursor-pointer">Privacy</button>
            <span>•</span>
            <button onClick={() => navigateTo('/terms')} className="hover:underline cursor-pointer">Terms</button>
            <span>•</span>
            <button onClick={onOpenDisclaimer} className="hover:underline cursor-pointer">Disclaimer</button>
          </div>
        </div>

      </div>
    </footer>
  );
};

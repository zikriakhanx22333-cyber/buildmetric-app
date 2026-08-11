import React, { useState } from 'react';
import { Search, Calculator, ShieldCheck, Zap, Layers, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { CalculatorId } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onSelectCalculator: (calcId: CalculatorId) => void;
  onSearchOpen: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onSelectCalculator,
  onSearchOpen
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = searchTerm.trim()
    ? CALCULATORS.filter(c => 
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <div className="relative bg-gradient-to-b from-[#0F2D5C] via-[#0d264e] to-[#0a1e3e] text-white overflow-hidden pt-12 pb-20">
      
      {/* Structural Architectural Blueprint Grid Background Effect */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F4B400_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#F4B400]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#F4B400] shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#F4B400]" />
            <span>Professional Civil & Architectural Toolset</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400] animate-pulse" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Free Construction Calculators <br className="hidden sm:inline" />
            <span className="text-[#F4B400]">&amp; Building Estimation Tools</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Accurate construction calculators and estimation tools for real-world projects. Designed for builders, engineers, contractors, students, and homeowners.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto pt-2">
            <div className="relative flex items-center bg-white rounded-2xl shadow-2xl p-2 border-2 border-white/20 focus-within:border-[#F4B400] transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                placeholder="Search construction tools... (e.g. Concrete, Steel, Brick, Tile, Paint)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={onSearchOpen}
                className="w-full px-3 py-2 text-slate-800 placeholder-slate-400 text-sm focus:outline-none font-medium"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="px-2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onSearchOpen}
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] font-bold text-sm shadow-md transition-all shrink-0"
              >
                <span>Find Tool</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Suggestions overlay if typing in hero search */}
            {filtered.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50 text-left max-h-60 overflow-y-auto">
                <div className="px-3 py-1.5 text-xs font-bold uppercase text-slate-400">
                  Quick Matching Calculators
                </div>
                {filtered.map(calc => (
                  <button
                    key={calc.id}
                    onClick={() => {
                      onSelectCalculator(calc.id);
                      setSearchTerm('');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-between"
                  >
                    <span className="text-sm font-semibold text-slate-800">{calc.title}</span>
                    <span className="text-xs font-semibold text-[#0F2D5C] bg-blue-100 px-2 py-0.5 rounded">Calculate</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onSelectCalculator('concrete-calculator')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F4B400] hover:bg-amber-400 text-[#0F2D5C] font-black text-base shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              <span>Start Calculating</span>
            </button>
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>Explore All Calculators</span>
              <ArrowRight className="w-4 h-4 text-[#F4B400]" />
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-white/10 max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F4B400] shrink-0" />
              <span className="text-xs font-semibold text-slate-200">Instant Calculations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F4B400] shrink-0" />
              <span className="text-xs font-semibold text-slate-200">IS / ACI Formula Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F4B400] shrink-0" />
              <span className="text-xs font-semibold text-slate-200">100% Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F4B400] shrink-0" />
              <span className="text-xs font-semibold text-slate-200">Mobile Friendly</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

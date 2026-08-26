import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Calculator,
  Building2,
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
  Printer,
  TrendingUp,
  Box,
  Layers,
  CheckCircle2,
  FolderPlus,
  Coins
} from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { CalculatorId } from '../types';
import { getSlugFromId } from '../utils/slugs';
import { CreateProjectModal } from './projects/CreateProjectModal';

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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);

  const chips = [
    { label: 'Concrete', id: 'concrete-calculator' },
    { label: 'Steel Weight', id: 'steel-weight-calculator' },
    { label: 'Masonry Blocks', id: 'block-calculator' },
    { label: 'Floor Tiles', id: 'tile-calculator' },
    { label: 'Paint Coverage', id: 'paint-calculator' },
    { label: 'BOQ Estimator', id: 'boq-estimator' },
    { label: 'House Cost', id: 'construction-cost-calculator' }
  ];

  const handlePrintDemo = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.print();
  };

  return (
    <>
      <div className="relative bg-gradient-to-b from-[#0F2D5C] via-[#0d264e] to-[#0a1e3e] text-white overflow-hidden pt-10 pb-16 lg:pb-20">
        
        {/* Subtle Architectural Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F4B400_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#F4B400]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Heading & Value Proposition */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#F4B400] shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-[#F4B400]" />
                <span>Civil Engineering & Construction Estimation Platform</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400] animate-pulse" />
              </div>

              {/* H1 Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
                Free Construction Calculators <br />
                <span className="text-[#F4B400]">&amp; Estimation Tools</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                Free construction calculators and professional estimation tools for contractors, engineers, builders, and site professionals. Calculate material volumes, save to projects, and generate itemized Bill of Quantities (BOQ).
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={onExploreClick}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#F4B400] hover:bg-[#e0a500] text-[#0F2D5C] font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Start Calculating →</span>
                </button>

                <button
                  onClick={() => setCreateProjectModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FolderPlus className="w-4 h-4 text-[#F4B400]" />
                  <span>Create a Project</span>
                </button>
              </div>

              {/* Trade Chips */}
              <div className="pt-3">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">
                  Popular Trade Tools:
                </span>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5">
                  {chips.map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => onSelectCalculator(chip.id as CalculatorId)}
                      className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Realistic Live Project / Estimate Card Preview */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-white/20 p-5 sm:p-6 text-slate-900 space-y-5 transform hover:-translate-y-1 transition-all duration-300">
                
                {/* Preview Header */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-50 px-2 py-0.5 rounded w-fit">
                      <Building2 className="w-3 h-3 text-[#0F2D5C]" />
                      <span>Live Project Workspace</span>
                    </div>
                    <h3 className="font-black text-lg text-slate-900 mt-1">
                      Villa Construction — Jeddah
                    </h3>
                    <p className="text-xs text-slate-500">Al-Amoudi Properties • 2 Floors (450 m²)</p>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    In Progress
                  </span>
                </div>

                {/* Estimate Highlight */}
                <div className="bg-gradient-to-br from-[#0F2D5C] to-[#163c78] rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                      Total Estimated Budget
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-300">✓ VAT & Contingency Included</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#F4B400] mt-1">
                    SAR 428,500
                  </div>
                  <div className="text-xs text-blue-200 mt-1 flex items-center gap-2">
                    <span>Materials: <strong>SAR 312,400</strong></span>
                    <span>•</span>
                    <span>Labour: <strong>SAR 86,000</strong></span>
                  </div>
                </div>

                {/* Material Quantities Rollup Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Cement</span>
                    <strong className="text-sm font-black text-[#0F2D5C]">1,618 Bags</strong>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Steel Rebar</span>
                    <strong className="text-sm font-black text-slate-800">7.2 Ton</strong>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Concrete</span>
                    <strong className="text-sm font-black text-slate-800">151.2 m³</strong>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Blocks</span>
                    <strong className="text-sm font-black text-slate-800">3,085 Pcs</strong>
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={() => {
                      navigate('/projects/proj-villa-jeddah');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>View BOQ & Rates</span>
                  </button>

                  <button
                    onClick={handlePrintDemo}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export PDF Report</span>
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Create Project Modal */}
      {createProjectModalOpen && (
        <CreateProjectModal
          onClose={() => setCreateProjectModalOpen(false)}
          onProjectCreated={(id) => {
            navigate(`/projects/${id}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}
    </>
  );
};

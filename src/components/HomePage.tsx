import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from './Hero';
import { CalculatorCard } from './CalculatorCard';
import { CategoryCard } from './CategoryCard';
import { WhyBuildMetric } from './WhyBuildMetric';
import { HowItWorks } from './HowItWorks';
import { FAQSection } from './FAQSection';
import { SEO } from './SEO';
import { CALCULATORS, CATEGORIES } from '../data/calculators';
import { getSlugFromId } from '../utils/slugs';
import { CreateProjectModal } from './projects/CreateProjectModal';
import {
  ArrowRight,
  Box,
  Layers,
  Building2,
  Grid,
  Calculator as CalcIcon,
  Search,
  FolderPlus,
  FileSpreadsheet,
  CheckCircle2,
  Printer,
  Sparkles,
  TrendingUp,
  Coins
} from 'lucide-react';

interface HomePageProps {
  onSearchOpen: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSearchOpen }) => {
  const navigate = useNavigate();
  const [calculatorSearch, setCalculatorSearch] = useState('');
  const [createProjectOpen, setCreateProjectOpen] = useState(false);

  const handleSelectCalculator = (id: string) => {
    navigate(`/calculators/${getSlugFromId(id as any)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (id: string) => {
    navigate(`/categories/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 8 Featured Quick Calculators
  const featuredIds = [
    'concrete-calculator',
    'steel-weight-calculator',
    'cement-calculator',
    'block-calculator',
    'tile-calculator',
    'paint-calculator',
    'construction-cost-calculator',
    'boq-estimator'
  ];

  const quickCalculators = CALCULATORS.filter(c => {
    if (calculatorSearch.trim()) {
      return (
        c.title.toLowerCase().includes(calculatorSearch.toLowerCase()) ||
        c.tags.some(t => t.toLowerCase().includes(calculatorSearch.toLowerCase()))
      );
    }
    return featuredIds.includes(c.id);
  });

  const concreteCalculators = CALCULATORS.filter(c => c.categoryId === 'concrete');
  const steelCalculators = CALCULATORS.filter(c => c.categoryId === 'steel');
  const masonryCalculators = CALCULATORS.filter(c => c.categoryId === 'masonry');
  const finishingCalculators = CALCULATORS.filter(c => c.categoryId === 'flooring' || c.categoryId === 'painting');
  const costCalculators = CALCULATORS.filter(c => c.categoryId === 'cost' || c.categoryId === 'boq');

  const homeJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "BuildMetric",
      "url": "https://buildmetric-app.vercel.app/",
      "description": "Free construction calculators for concrete, steel, bricks, cement, tiles and construction cost estimation.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://buildmetric-app.vercel.app/calculators?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BuildMetric",
      "url": "https://buildmetric-app.vercel.app/",
      "logo": "https://buildmetric-app.vercel.app/logo.png",
      "sameAs": []
    }
  ];

  return (
    <div className="space-y-16">
      <SEO 
        title="BuildMetric – Free Construction Calculators & Estimation Tools"
        description="Free construction calculators for concrete, steel, bricks, cement, tiles and construction cost estimation."
        canonicalUrl="https://buildmetric-app.vercel.app/"
        ogTitle="BuildMetric – Free Construction Calculators & Estimation Tools"
        ogDescription="Free construction calculators for concrete, steel, bricks, cement, tiles and construction cost estimation."
        jsonLd={homeJsonLd}
      />

      {/* 1. Hero Section */}
      <Hero
        onExploreClick={() => {
          navigate('/calculators');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCalculator={handleSelectCalculator as any}
        onSearchOpen={onSearchOpen}
      />

      {/* 2. Quick Calculators Section: "What do you need to calculate?" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-50 px-3 py-1 rounded-full">
              Quick Calculation Hub
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
              What do you need to calculate?
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Select any verified construction calculator to compute material quantities and dry mix ratios.
            </p>
          </div>

          {/* Inline Filter Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Filter quick calculators..."
              value={calculatorSearch}
              onChange={(e) => setCalculatorSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C] shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickCalculators.map((calc) => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              onSelect={handleSelectCalculator as any}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              navigate('/calculators');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-[#0F2D5C] text-[#0F2D5C] font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <span>View All {CALCULATORS.length} Construction Calculators</span>
            <ArrowRight className="w-4 h-4 text-[#F4B400]" />
          </button>
        </div>
      </section>

      {/* 3. Start a Project (3-Step Workflow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0F2D5C] to-[#163c78] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8">
          
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F4B400] bg-white/10 px-3 py-1 rounded-full">
              Full-Stack Estimation Workflow
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
              From Single Calculation to Full Project BOQ
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Never lose your measurements in notes again. BuildMetric enables you to save calculations into structured project workspaces and assemble complete tender quotes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F4B400] text-[#0F2D5C] font-black text-lg flex items-center justify-center">
                01
              </div>
              <h3 className="font-bold text-lg text-white">Create Project</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Define project name, building type, floor count, location, currency (SAR, AED, USD) and measurement units.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F4B400] text-[#0F2D5C] font-black text-lg flex items-center justify-center">
                02
              </div>
              <h3 className="font-bold text-lg text-white">Add Calculations</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Run concrete, steel rebar, blockwork or tile calculations and click "+ Add to Project" with 1-click.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F4B400] text-[#0F2D5C] font-black text-lg flex items-center justify-center">
                03
              </div>
              <h3 className="font-bold text-lg text-white">Generate BOQ & PDF</h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Combine line items into trade sections, assign unit rates, apply VAT and export formal PDF / Excel tender schedules.
              </p>
            </div>

          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setCreateProjectOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#F4B400] hover:bg-[#e0a500] text-[#0F2D5C] font-black text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Create Your First Project →</span>
            </button>

            <button
              onClick={() => navigate('/projects/proj-villa-jeddah')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all text-center cursor-pointer"
            >
              Explore Sample Villa Project
            </button>
          </div>

        </div>
      </section>

      {/* 4. BOQ Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-50 px-3 py-1 rounded-full">
                Interactive Schedule
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
                Standard Construction BOQ Schedule
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Editable bill of quantities with itemized descriptions, unit rates, tax computation and line-item sums.
              </p>
            </div>

            <button
              onClick={() => navigate('/boq')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] font-bold text-xs shadow-sm transition-all shrink-0 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Open BOQ Builder →</span>
            </button>
          </div>

          {/* Interactive Table Preview */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex justify-between items-center text-xs font-bold text-slate-700">
              <span>Section 1.0 — SUBSTRUCTURE CONCRETE & REBAR</span>
              <span className="text-[#0F2D5C]">Subtotal: SAR 108,395</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4 w-16">Item</th>
                    <th className="py-2.5 px-4">Specification & Description</th>
                    <th className="py-2.5 px-4 w-24 text-right">Qty</th>
                    <th className="py-2.5 px-4 w-20 text-center">Unit</th>
                    <th className="py-2.5 px-4 w-28 text-right">Rate (SAR)</th>
                    <th className="py-2.5 px-4 w-32 text-right">Amount (SAR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono text-slate-500">1.1</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">Bulk earth excavation in soil to foundation depth</td>
                    <td className="py-3 px-4 text-right font-bold">260</td>
                    <td className="py-3 px-4 text-center text-slate-500">m³</td>
                    <td className="py-3 px-4 text-right">35</td>
                    <td className="py-3 px-4 text-right font-mono font-bold">9,100</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono text-slate-500">1.2</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">Plain Cement Concrete (PCC M10) 100mm blinding</td>
                    <td className="py-3 px-4 text-right font-bold">28</td>
                    <td className="py-3 px-4 text-center text-slate-500">m³</td>
                    <td className="py-3 px-4 text-right">220</td>
                    <td className="py-3 px-4 text-right font-mono font-bold">6,160</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono text-slate-500">1.3</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">Reinforced Concrete (RCC C25/30) in raft foundation</td>
                    <td className="py-3 px-4 text-right font-bold">151</td>
                    <td className="py-3 px-4 text-center text-slate-500">m³</td>
                    <td className="py-3 px-4 text-right">285</td>
                    <td className="py-3 px-4 text-right font-mono font-bold">43,035</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono text-slate-500">1.4</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">High yield deformed rebar (Fe500) cut, bent & tied</td>
                    <td className="py-3 px-4 text-right font-bold">15.6</td>
                    <td className="py-3 px-4 text-center text-slate-500">Ton</td>
                    <td className="py-3 px-4 text-right">3,210</td>
                    <td className="py-3 px-4 text-right font-mono font-bold">50,076</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 5. How It Works Section */}
      <HowItWorks />

      {/* 6. Concrete & Cement Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0F2D5C] flex items-center justify-center">
            <Box className="w-5 h-5 text-[#0F2D5C]" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Concrete & Cement Calculators
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Calculate wet and dry concrete volume, mix proportions, cement bags, sand CFT, and coarse aggregate.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {concreteCalculators.map((calc) => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              onSelect={handleSelectCalculator as any}
            />
          ))}
        </div>
      </section>

      {/* 7. Steel & Rebar Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center">
            <Layers className="w-5 h-5 text-slate-800" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Steel & Rebar Calculators
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Reinforcement bar weight per meter (D²/162.2), total steel tonnage, and bar bending lap cutting length estimations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steelCalculators.map((calc) => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              onSelect={handleSelectCalculator as any}
            />
          ))}
        </div>
      </section>

      {/* 8. Masonry Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-amber-800" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Masonry Calculators
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Estimate brick wall quantities, concrete hollow block counts, mortar volume, and plastering materials.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {masonryCalculators.map((calc) => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              onSelect={handleSelectCalculator as any}
            />
          ))}
        </div>
      </section>

      {/* 9. Why BuildMetric */}
      <WhyBuildMetric />

      {/* 10. Frequently Asked Questions */}
      <FAQSection />

      {/* Global Create Project Modal */}
      {createProjectOpen && (
        <CreateProjectModal
          onClose={() => setCreateProjectOpen(false)}
          onProjectCreated={(id) => {
            navigate(`/projects/${id}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

    </div>
  );
};

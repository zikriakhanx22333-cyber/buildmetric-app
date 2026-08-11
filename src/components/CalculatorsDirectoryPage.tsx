import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CALCULATORS, CATEGORIES } from '../data/calculators';
import { CalculatorCard } from './CalculatorCard';
import { SEO } from './SEO';
import { getSlugFromId } from '../utils/slugs';
import { Search, Sparkles, Calculator, CheckCircle2, BookOpen } from 'lucide-react';
import { CalculatorId } from '../types';

export const CalculatorsDirectoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCalculator = (id: CalculatorId) => {
    navigate(`/calculators/${getSlugFromId(id)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCalculators = CALCULATORS.filter(calc => {
    const matchesCategory = selectedCategory === 'all' || calc.categoryId === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://buildmetric-app.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Calculators Directory",
        "item": "https://buildmetric-app.vercel.app/calculators"
      }
    ]
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <SEO 
        title="Construction Calculators – Free Building Estimation Tools | BuildMetric"
        description="Free construction calculators for concrete, steel weight, bricks and construction cost estimation."
        canonicalUrl="https://buildmetric-app.vercel.app/calculators"
        ogTitle="Construction Calculators – Free Building Estimation Tools | BuildMetric"
        ogDescription="Free construction calculators for concrete, steel weight, bricks and construction cost estimation."
        jsonLd={breadcrumbsJsonLd}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#0F2D5C] to-[#1a4485] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-[#F4B400]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#F4B400]">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B400]" />
              <span>{CALCULATORS.length} Active Civil Engineering Tools</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Construction Calculators &amp; Estimation Tools
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              Use free construction calculators for concrete volume, steel rebar weights, brick walls, mortar, tiles, paint coverage, and BOQ cost estimates. Formulated according to IS 456, ACI 318, and standard civil engineering practice.
            </p>

            {/* Search Input */}
            <div className="pt-2 max-w-xl">
              <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-lg">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search calculators by material or trade (e.g., concrete, rebar, brick, paint)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-slate-800 text-sm focus:outline-none font-medium placeholder-slate-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="px-3 text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Useful Introductory SEO Content */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F2D5C] uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#F4B400]" />
            <span>Civil Engineering Estimation Guide</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            How BuildMetric Construction Calculators Help Your Project
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Accurate material estimation prevents budget overruns and material shortages on site. BuildMetric's suite of construction calculators helps quantity surveyors, contractors, site supervisors, and home builders estimate exact quantities of cement, sand, coarse aggregate, steel reinforcement bars, masonry bricks, wall plaster, flooring tiles, and wall paint.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Standard Dry Factors (1.54 Concrete / 1.33 Mortar)</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Standard Steel Density (7,850 kg/m³ &amp; D²/162.2)</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Deductions for Openings &amp; Wastage Margins</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${selectedCategory === 'all' ? 'bg-[#0F2D5C] text-[#F4B400] shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
          >
            All Tools ({CALCULATORS.length})
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${selectedCategory === cat.id ? 'bg-[#0F2D5C] text-[#F4B400] shadow-md' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Grid of Calculators */}
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((calc) => (
              <CalculatorCard
                key={calc.id}
                calculator={calc}
                onSelect={handleSelectCalculator}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <Calculator className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No calculators matched your search</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Try adjusting your search query or switching category filters to view available tools.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 bg-[#0F2D5C] text-[#F4B400] font-bold text-xs rounded-xl shadow cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { CalculatorCard } from './components/CalculatorCard';
import { CategoryCard } from './components/CategoryCard';
import { WhyBuildMetric } from './components/WhyBuildMetric';
import { HowItWorks } from './components/HowItWorks';
import { FAQSection } from './components/FAQSection';
import { CalculatorEngine } from './components/CalculatorEngine';
import { SearchModal } from './components/SearchModal';
import { BlogView } from './components/BlogView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { DisclaimerModal } from './components/DisclaimerModal';
import { CATEGORIES, CALCULATORS } from './data/calculators';
import { CalculatorId, CategoryId } from './types';
import { Search, Calculator, Sparkles, Filter, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedCalculatorId, setSelectedCalculatorId] = useState<CalculatorId | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<CategoryId | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [disclaimerModalOpen, setDisclaimerModalOpen] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [calcSearchQuery, setCalcSearchQuery] = useState<string>('');

  // Keyboard shortcut ⌘K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectCalculator = (id: CalculatorId) => {
    setSelectedCalculatorId(id);
    setActiveView('calculator-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (id: CategoryId) => {
    setSelectedCategoryId(id);
    setFilterCategory(id);
    setActiveView('category-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered calculators for "All Calculators" view
  const filteredCalculators = CALCULATORS.filter((calc) => {
    const matchesCat = filterCategory === 'all' || calc.categoryId === filterCategory;
    const matchesSearch = !calcSearchQuery.trim() || 
      calc.title.toLowerCase().includes(calcSearchQuery.toLowerCase()) ||
      calc.shortDescription.toLowerCase().includes(calcSearchQuery.toLowerCase()) ||
      calc.tags.some(t => t.toLowerCase().includes(calcSearchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#F4B400] selection:text-[#0F2D5C]">
      
      {/* Top Header Navigation */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        selectedCalculatorId={selectedCalculatorId}
        setSelectedCalculatorId={setSelectedCalculatorId}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
        onSearchOpen={() => setSearchModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-grow">
        
        {/* VIEW 1: HOMEPAGE */}
        {activeView === 'home' && !selectedCalculatorId && (
          <div className="space-y-12">
            
            {/* Hero Section */}
            <Hero
              onExploreClick={() => {
                setActiveView('calculators-all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectCalculator={handleSelectCalculator}
              onSearchOpen={() => setSearchModalOpen(true)}
            />

            {/* Popular Calculators Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-100 px-3 py-1 rounded-full">
                    Featured Estimation Tools
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
                    Popular Construction Calculators
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Most requested calculators for concrete mix, steel rebar weight, brick walling, and tile layout.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveView('calculators-all');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#0F2D5C] hover:text-[#163c78] bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:border-[#0F2D5C] transition-all shrink-0"
                >
                  <span>View All 25+ Tools</span>
                  <ArrowRight className="w-4 h-4 text-[#F4B400]" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CALCULATORS.filter(c => c.popular).map((calc) => (
                  <CalculatorCard
                    key={calc.id}
                    calculator={calc}
                    onSelect={handleSelectCalculator}
                  />
                ))}
              </div>
            </section>

            {/* Categories Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-100 px-3 py-1 rounded-full">
                  Browse by Discipline
                </span>
                <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
                  Construction & Engineering Categories
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Organized tools for structural, masonry, flooring, painting, and quantity estimation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {CATEGORIES.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    onSelect={handleSelectCategory}
                  />
                ))}
              </div>
            </section>

            {/* Why BuildMetric */}
            <WhyBuildMetric />

            {/* How It Works */}
            <HowItWorks />

            {/* General FAQs */}
            <FAQSection />

          </div>
        )}

        {/* VIEW 2: CALCULATOR DETAIL PAGE */}
        {activeView === 'calculator-detail' && selectedCalculatorId && (
          <CalculatorEngine
            calculatorId={selectedCalculatorId}
            onBack={() => {
              setSelectedCalculatorId(null);
              setActiveView('calculators-all');
            }}
            onSelectOtherCalculator={(id) => handleSelectCalculator(id)}
          />
        )}

        {/* VIEW 3: ALL CALCULATORS DIRECTORY */}
        {activeView === 'calculators-all' && (
          <div className="py-10 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-100 px-3 py-1 rounded-full">
                      Complete Toolset
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
                      All Construction Calculators
                    </h1>
                    <p className="text-slate-600 text-sm mt-1">
                      Choose from our suite of 25+ professional local browser estimation tools.
                    </p>
                  </div>

                  {/* Filter Search */}
                  <div className="relative w-full md:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter calculators..."
                      value={calcSearchQuery}
                      onChange={(e) => setCalcSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:border-[#0F2D5C]"
                    />
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setFilterCategory('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterCategory === 'all' ? 'bg-[#0F2D5C] text-[#F4B400]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    All Categories ({CALCULATORS.length})
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilterCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterCategory === cat.id ? 'bg-[#0F2D5C] text-[#F4B400]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      {cat.name} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Filtered Calculators */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCalculators.map((calc) => (
                  <CalculatorCard
                    key={calc.id}
                    calculator={calc}
                    onSelect={handleSelectCalculator}
                  />
                ))}
              </div>

            </div>
          </div>
        )}

        {/* VIEW 4: ALL CATEGORIES DIRECTORY & CATEGORY DETAIL */}
        {(activeView === 'categories-all' || activeView === 'category-detail') && (
          <div className="py-10 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-100 px-3 py-1 rounded-full">
                  Discipline Directory
                </span>
                <h1 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
                  {selectedCategoryId ? CATEGORIES.find(c => c.id === selectedCategoryId)?.name : 'Construction Categories'}
                </h1>
                <p className="text-slate-600 text-sm mt-1">
                  {selectedCategoryId ? CATEGORIES.find(c => c.id === selectedCategoryId)?.description : 'Select an engineering category to explore specialized tools.'}
                </p>

                {selectedCategoryId && (
                  <button
                    onClick={() => { setSelectedCategoryId(null); setActiveView('categories-all'); }}
                    className="mt-4 text-xs font-bold text-[#0F2D5C] underline"
                  >
                    ← View All Categories
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CALCULATORS.filter(c => !selectedCategoryId || c.categoryId === selectedCategoryId).map((calc) => (
                  <CalculatorCard
                    key={calc.id}
                    calculator={calc}
                    onSelect={handleSelectCalculator}
                  />
                ))}
              </div>

            </div>
          </div>
        )}

        {/* VIEW 5: BLOG */}
        {activeView === 'blog' && <BlogView />}

        {/* VIEW 6: ABOUT */}
        {activeView === 'about' && <AboutView />}

        {/* VIEW 7: CONTACT */}
        {activeView === 'contact' && <ContactView />}

        {/* VIEW 8: PRIVACY / TERMS */}
        {(activeView === 'privacy' || activeView === 'terms') && (
          <div className="py-12 bg-slate-50 min-h-screen">
            <div className="max-w-3xl mx-auto px-4 bg-white p-8 rounded-3xl border border-slate-200 space-y-4">
              <h1 className="text-2xl font-black text-[#0F2D5C]">
                {activeView === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h1>
              <p className="text-xs text-slate-600 leading-relaxed">
                BuildMetric respects user privacy. All calculations occur strictly client-side within your browser session. We do not store, track, or transmit your site measurements or project input data to external servers.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        setActiveView={setActiveView}
        setSelectedCalculatorId={setSelectedCalculatorId}
        setSelectedCategoryId={setSelectedCategoryId}
        onOpenDisclaimer={() => setDisclaimerModalOpen(true)}
      />

      {/* Quick Search Modal Overlay */}
      {searchModalOpen && (
        <SearchModal
          onClose={() => setSearchModalOpen(false)}
          onSelectCalculator={handleSelectCalculator}
        />
      )}

      {/* Disclaimer Modal Overlay */}
      {disclaimerModalOpen && (
        <DisclaimerModal
          onClose={() => setDisclaimerModalOpen(false)}
        />
      )}

    </div>
  );
}


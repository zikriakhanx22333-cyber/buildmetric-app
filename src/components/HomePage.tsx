import React from 'react';
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
import { ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  onSearchOpen: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSearchOpen }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      <SEO 
        title="BuildMetric | Free Construction Calculators & Civil Engineering Tools"
        description="Free online construction calculators for concrete mix, steel rebar, brick walling, tiles, paint, excavation, and BOQ estimation."
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={() => {
          navigate('/calculators');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCalculator={(id) => {
          navigate(`/calculators/${getSlugFromId(id)}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSearchOpen={onSearchOpen}
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
              navigate('/calculators');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F2D5C] hover:text-[#163c78] bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:border-[#0F2D5C] transition-all shrink-0 cursor-pointer"
          >
            <span>View All Tools</span>
            <ArrowRight className="w-4 h-4 text-[#F4B400]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CALCULATORS.filter(c => c.popular).map((calc) => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              onSelect={(id) => {
                navigate(`/calculators/${getSlugFromId(id)}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
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
              onSelect={(catId) => {
                navigate(`/categories/${catId}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
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
  );
};

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
import { ArrowRight, Box, Layers, Building2, Grid, Calculator as CalcIcon } from 'lucide-react';

interface HomePageProps {
  onSearchOpen: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSearchOpen }) => {
  const navigate = useNavigate();

  const handleSelectCalculator = (id: string) => {
    navigate(`/calculators/${getSlugFromId(id as any)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (id: string) => {
    navigate(`/categories/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const popularCalculators = CALCULATORS.filter(c => c.popular);
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
    <div className="space-y-12">
      <SEO 
        title="BuildMetric – Free Construction Calculators & Estimation Tools"
        description="Free construction calculators for concrete, steel, bricks, cement, tiles and construction cost estimation."
        canonicalUrl="https://buildmetric-app.vercel.app/"
        ogTitle="BuildMetric – Free Construction Calculators & Estimation Tools"
        ogDescription="Free construction calculators for concrete, steel, bricks, cement, tiles and construction cost estimation."
        jsonLd={homeJsonLd}
      />

      {/* Hero Section containing the H1: Free Construction Calculators & Estimation Tools */}
      <Hero
        onExploreClick={() => {
          navigate('/calculators');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCalculator={handleSelectCalculator as any}
        onSearchOpen={onSearchOpen}
      />

      {/* 1. H2: Popular Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-100 px-3 py-1 rounded-full">
              Most Used Tools
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
              Popular Calculators
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Top rated civil engineering calculators for quick material, rebar, brick, and cost estimations.
            </p>
          </div>

          <button
            onClick={() => {
              navigate('/calculators');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F2D5C] hover:text-[#163c78] bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:border-[#0F2D5C] transition-all shrink-0 cursor-pointer"
          >
            <span>Browse All Calculators</span>
            <ArrowRight className="w-4 h-4 text-[#F4B400]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCalculators.map((calc) => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              onSelect={handleSelectCalculator as any}
            />
          ))}
        </div>
      </section>

      {/* 2. H2: Construction Calculator Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] bg-amber-100 px-3 py-1 rounded-full">
              Structured Engineering Disciplines
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
              Construction Calculator Categories
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Explore specialized estimators grouped by civil engineering trade and structural material.
            </p>
          </div>

          <button
            onClick={() => {
              navigate('/categories');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F2D5C] hover:text-[#163c78] bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:border-[#0F2D5C] transition-all shrink-0 cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 text-[#F4B400]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onSelect={handleSelectCategory}
            />
          ))}
        </div>
      </section>

      {/* 3. H2: Concrete & Cement Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

      {/* 4. H2: Steel & Rebar Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

      {/* 5. H2: Masonry Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

      {/* 6. H2: Flooring & Finishing Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Grid className="w-5 h-5 text-emerald-800" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Flooring & Finishing Calculators
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Determine ceramic and vitrified floor/wall tile counts, wood flooring plank requirements, and wall paint liters.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finishingCalculators.map((calc) => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              onSelect={handleSelectCalculator as any}
            />
          ))}
        </div>
      </section>

      {/* 7. H2: Construction Cost Estimation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#0F2D5C] flex items-center justify-center">
            <CalcIcon className="w-5 h-5 text-[#0F2D5C]" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Construction Cost Estimation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Estimate total house construction budgets, material cost breakdowns, and build formal Bill of Quantities (BOQ).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {costCalculators.map((calc) => (
            <CalculatorCard
              key={calc.id}
              calculator={calc}
              onSelect={handleSelectCalculator as any}
            />
          ))}
        </div>
      </section>

      {/* Why BuildMetric */}
      <WhyBuildMetric />

      {/* How It Works */}
      <HowItWorks />

      {/* Frequently Asked Questions */}
      <FAQSection />

    </div>
  );
};


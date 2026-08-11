import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalculatorMeta, CalculatorId } from '../types';
import { CALCULATORS } from '../data/calculators';
import { CALCULATOR_GUIDES } from '../data/calculatorGuideData';
import { getSlugFromId } from '../utils/slugs';
import { ConcreteCalculator } from './calculators/ConcreteCalculator';
import { SteelWeightCalculator } from './calculators/SteelWeightCalculator';
import { BrickCalculator } from './calculators/BrickCalculator';
import { CementCalculator } from './calculators/CementCalculator';
import { SandCalculator } from './calculators/SandCalculator';
import { AggregateCalculator } from './calculators/AggregateCalculator';
import { PlasterCalculator } from './calculators/PlasterCalculator';
import { TileCalculator } from './calculators/TileCalculator';
import { PaintCalculator } from './calculators/PaintCalculator';
import { FlooringCalculator } from './calculators/FlooringCalculator';
import { BlockCalculator } from './calculators/BlockCalculator';
import { ExcavationCalculator } from './calculators/ExcavationCalculator';
import { BackfillCalculator } from './calculators/BackfillCalculator';
import { FootingCalculator } from './calculators/FootingCalculator';
import { ColumnCalculator } from './calculators/ColumnCalculator';
import { BeamCalculator } from './calculators/BeamCalculator';
import { SlabCalculator } from './calculators/SlabCalculator';
import { SteelCuttingCalculator } from './calculators/SteelCuttingCalculator';
import { AreaCalculator } from './calculators/AreaCalculator';
import { VolumeCalculator } from './calculators/VolumeCalculator';
import { LengthConverter } from './calculators/LengthConverter';
import { AreaConverter } from './calculators/AreaConverter';
import { VolumeConverter } from './calculators/VolumeConverter';
import { ConstructionCostCalculator } from './calculators/ConstructionCostCalculator';
import { BOQEstimator } from './calculators/BOQEstimator';
import { MortarCalculator } from './calculators/MortarCalculator';
import { ConcreteMixCalculator } from './calculators/ConcreteMixCalculator';
import { UnitConverter } from './calculators/UnitConverter';
import { FAQSection } from './FAQSection';
import { SEO } from './SEO';
import { ArrowLeft, BookOpen, Sparkles, CheckCircle2, ArrowRight, HelpCircle, Layers, FileCode, Info, ListChecks, Lightbulb, AlertTriangle } from 'lucide-react';

interface CalculatorEngineProps {
  calculatorId: CalculatorId;
  onBack: () => void;
  onSelectOtherCalculator: (id: CalculatorId) => void;
}

export const CalculatorEngine: React.FC<CalculatorEngineProps> = ({
  calculatorId,
  onBack,
  onSelectOtherCalculator,
}) => {
  const navigate = useNavigate();
  const meta = CALCULATORS.find(c => c.id === calculatorId) || CALCULATORS[0];
  const guide = CALCULATOR_GUIDES[calculatorId] || CALCULATOR_GUIDES['concrete-calculator'];
  const currentSlug = getSlugFromId(meta.id);
  const canonicalUrl = `https://buildmetric-app.vercel.app/calculators/${currentSlug}`;

  const renderActiveCalculatorComponent = () => {
    switch (calculatorId) {
      case 'concrete-calculator':
        return <ConcreteCalculator />;
      case 'steel-weight-calculator':
        return <SteelWeightCalculator />;
      case 'brick-calculator':
        return <BrickCalculator />;
      case 'cement-calculator':
        return <CementCalculator />;
      case 'sand-calculator':
        return <SandCalculator />;
      case 'aggregate-calculator':
        return <AggregateCalculator />;
      case 'plaster-calculator':
        return <PlasterCalculator />;
      case 'tile-calculator':
        return <TileCalculator />;
      case 'paint-calculator':
        return <PaintCalculator />;
      case 'flooring-calculator':
        return <FlooringCalculator />;
      case 'block-calculator':
        return <BlockCalculator />;
      case 'excavation-calculator':
        return <ExcavationCalculator />;
      case 'backfill-calculator':
        return <BackfillCalculator />;
      case 'footing-calculator':
        return <FootingCalculator />;
      case 'column-calculator':
        return <ColumnCalculator />;
      case 'beam-calculator':
        return <BeamCalculator />;
      case 'slab-calculator':
        return <SlabCalculator />;
      case 'rebar-calculator':
        return <SteelWeightCalculator />;
      case 'steel-cutting-calculator':
        return <SteelCuttingCalculator />;
      case 'area-calculator':
        return <AreaCalculator />;
      case 'volume-calculator':
        return <VolumeCalculator />;
      case 'length-converter':
        return <LengthConverter />;
      case 'area-converter':
        return <AreaConverter />;
      case 'volume-converter':
        return <VolumeConverter />;
      case 'unit-converter':
        return <UnitConverter />;
      case 'construction-cost-calculator':
        return <ConstructionCostCalculator />;
      case 'boq-estimator':
        return <BOQEstimator />;
      case 'mortar-calculator':
        return <MortarCalculator />;
      case 'concrete-mix-calculator':
        return <ConcreteMixCalculator />;
      default:
        return <ConcreteCalculator />;
    }
  };

  const relatedCalculators = CALCULATORS.filter(c => c.id !== calculatorId && c.categoryId === meta.categoryId).slice(0, 3);
  const fallbackRelated = relatedCalculators.length > 0 ? relatedCalculators : CALCULATORS.filter(c => c.id !== calculatorId).slice(0, 3);

  // Structured Data JSON-LD
  const breadcrumbSchema = {
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
        "name": "Calculators",
        "item": "https://buildmetric-app.vercel.app/calculators"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": meta.title,
        "item": canonicalUrl
      }
    ]
  };

  const faqSchema = meta.faqs && meta.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": meta.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": meta.title,
    "url": canonicalUrl,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "description": meta.seoMetaDescription || meta.fullDescription,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const jsonLdData: any[] = [breadcrumbSchema, webAppSchema];
  if (faqSchema) {
    jsonLdData.push(faqSchema);
  }

  // Helper for internal workflow links navigation
  const navigateToSlug = (slug: string) => {
    navigate(`/calculators/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <SEO 
        title={meta.seoTitle || `${meta.title} | BuildMetric`}
        description={meta.seoMetaDescription || meta.fullDescription}
        canonicalUrl={canonicalUrl}
        ogType="article"
        ogTitle={meta.seoTitle || `${meta.title} | BuildMetric`}
        ogDescription={meta.seoMetaDescription || meta.fullDescription}
        jsonLd={jsonLdData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-semibold">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#0F2D5C] hover:border-[#0F2D5C] transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Calculators</span>
          </button>

          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="hover:text-slate-800 cursor-pointer" onClick={() => navigate('/')}>Home</span>
            <span>/</span>
            <span className="hover:text-slate-800 cursor-pointer" onClick={() => navigate('/calculators')}>Calculators</span>
            <span>/</span>
            <span className="text-[#0F2D5C] font-bold">{meta.title}</span>
          </div>
        </div>

        {/* SEO Header Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0F2D5C] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#F4B400]" />
            <span>Civil Engineering &amp; Architectural Estimation Tool</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {meta.title}
          </h1>

          <p className="text-slate-600 text-base leading-relaxed max-w-4xl">
            {meta.fullDescription}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <div className="text-xs font-bold text-slate-400 mr-2">Tags:</div>
            {meta.tags.map((tag, i) => (
              <span key={i} className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Active Interactive Calculator Component */}
        {renderActiveCalculatorComponent()}

        {/* Mandatory Legal & Technical Disclaimer */}
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 leading-relaxed shadow-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Disclaimer:</strong> BuildMetric provides estimates for informational purposes. Actual quantities and costs may vary depending on project specifications, site conditions, material properties and local prices.
          </div>
        </div>

        {/* 1. SEO Explanation Section */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
            <Info className="w-4 h-4 text-[#F4B400]" />
            <span>Detailed Technical Overview</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            About the {meta.title}
          </h2>
          <div className="text-slate-600 text-sm leading-relaxed space-y-4">
            {guide.explanation.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* 2. What You Need & How to Use Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* What You Need */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
              <ListChecks className="w-4 h-4 text-[#F4B400]" />
              <span>Required Inputs</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              What You Need
            </h2>
            <ul className="space-y-3 pt-1 text-sm text-slate-600">
              {guide.whatYouNeed.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* How to Use */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
              <BookOpen className="w-4 h-4 text-[#F4B400]" />
              <span>Step-by-Step Instructions</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              How to Use
            </h2>
            <ol className="space-y-3 pt-1 text-sm text-slate-600">
              {guide.howToUseSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-[#0F2D5C] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

        </div>

        {/* 3. Formula & Worked Example Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Formula Card */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
              <FileCode className="w-4 h-4 text-[#F4B400]" />
              <span>Engineering Formula</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {guide.formulaTitle}
            </h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 font-mono text-xs text-slate-700">
              {guide.formulaDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#F4B400] font-bold">•</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed pt-1">
              {guide.formulaExplanation}
            </p>
          </section>

          {/* Worked Example Card */}
          <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Example Calculation</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {guide.exampleTitle}
            </h2>
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed whitespace-pre-line font-medium">
              {guide.exampleText}
            </div>
          </section>

        </div>

        {/* 4. Tips Section */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2D5C]">
            <Lightbulb className="w-4 h-4 text-[#F4B400]" />
            <span>Practical Construction Guidance</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Site Tips &amp; Quality Control
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {guide.tips.map((tip, idx) => (
              <li key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#F4B400]/20 text-[#0F2D5C] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Interconnected Material Pipelines */}
        <section className="bg-gradient-to-br from-slate-900 via-[#0F2D5C] to-[#0a1e3e] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F4B400]">
              Interconnected Civil Engineering Tools
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Related Material Estimation Workflows
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Follow connected material pipelines from raw concrete batching to reinforcement and total project budget estimation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            {/* Concrete Pipeline */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-3">
              <div className="text-xs font-bold text-[#F4B400] uppercase">Concrete Material Chain</div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <button onClick={() => navigateToSlug('concrete')} className="px-2 py-1 bg-white/20 hover:bg-[#F4B400] hover:text-[#0F2D5C] rounded font-semibold transition-colors">Concrete</button>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <button onClick={() => navigateToSlug('cement')} className="px-2 py-1 bg-white/20 hover:bg-[#F4B400] hover:text-[#0F2D5C] rounded font-semibold transition-colors">Cement</button>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <button onClick={() => navigateToSlug('sand')} className="px-2 py-1 bg-white/20 hover:bg-[#F4B400] hover:text-[#0F2D5C] rounded font-semibold transition-colors">Sand</button>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <button onClick={() => navigateToSlug('aggregate')} className="px-2 py-1 bg-white/20 hover:bg-[#F4B400] hover:text-[#0F2D5C] rounded font-semibold transition-colors">Aggregate</button>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <button onClick={() => navigateToSlug('construction-cost')} className="px-2 py-1 bg-white/20 hover:bg-[#F4B400] hover:text-[#0F2D5C] rounded font-semibold transition-colors">Cost</button>
              </div>
            </div>

            {/* Steel Pipeline */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-3">
              <div className="text-xs font-bold text-[#F4B400] uppercase">Steel &amp; Rebar Chain</div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <button onClick={() => navigateToSlug('steel-weight')} className="px-2 py-1 bg-white/20 hover:bg-[#F4B400] hover:text-[#0F2D5C] rounded font-semibold transition-colors">Steel Weight</button>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <button onClick={() => navigateToSlug('rebar')} className="px-2 py-1 bg-white/20 hover:bg-[#F4B400] hover:text-[#0F2D5C] rounded font-semibold transition-colors">Rebar</button>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <button onClick={() => navigateToSlug('steel-cutting')} className="px-2 py-1 bg-white/20 hover:bg-[#F4B400] hover:text-[#0F2D5C] rounded font-semibold transition-colors">Lapping</button>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <button onClick={() => navigateToSlug('construction-cost')} className="px-2 py-1 bg-white/20 hover:bg-[#F4B400] hover:text-[#0F2D5C] rounded font-semibold transition-colors">Cost</button>
              </div>
            </div>

            {/* Masonry Pipeline */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-3">
              <div className="text-xs font-bold text-[#F4B400] uppercase">Masonry &amp; Wall Chain</div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <button onClick={() => navigateToSlug('brick')} className="px-2 py-1 bg-white/20 hover:bg-[#F4B400] hover:text-[#0F2D5C] rounded font-semibold transition-colors">Brick</button>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <button onClick={() => navigateToSlug('mortar')} className="px-2 py-1 bg-white/20 hover:bg-[#F4B400] hover:text-[#0F2D5C] rounded font-semibold transition-colors">Mortar</button>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <button onClick={() => navigateToSlug('plaster')} className="px-2 py-1 bg-white/20 hover:bg-[#F4B400] hover:text-[#0F2D5C] rounded font-semibold transition-colors">Plaster</button>
                <ArrowRight className="w-3 h-3 text-slate-400" />
                <button onClick={() => navigateToSlug('construction-cost')} className="px-2 py-1 bg-white/20 hover:bg-[#F4B400] hover:text-[#0F2D5C] rounded font-semibold transition-colors">Cost</button>
              </div>
            </div>

          </div>
        </section>

        {/* 6. Related Calculators Recommendation Cards */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                More Construction Tools
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Related Calculators
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fallbackRelated.map((calc) => (
              <button
                key={calc.id}
                onClick={() => onSelectOtherCalculator(calc.id)}
                className="text-left bg-slate-50 hover:bg-blue-50/80 rounded-2xl p-4 border border-slate-200 hover:border-[#0F2D5C]/30 transition-all group cursor-pointer"
              >
                <div className="font-bold text-slate-900 group-hover:text-[#0F2D5C] text-sm flex items-center justify-between">
                  <span>{calc.title}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#F4B400] transition-colors" />
                </div>
                <div className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {calc.shortDescription}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 7. Calculator Specific FAQs */}
        {meta.faqs && meta.faqs.length > 0 && (
          <FAQSection
            customFaqs={meta.faqs}
            title={`${meta.title} - Frequently Asked Questions`}
            subtitle="Expert answers to common civil engineering questions regarding material formulas and site estimations."
          />
        )}

      </div>
    </div>
  );
};

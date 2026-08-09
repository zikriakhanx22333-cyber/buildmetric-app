import React from 'react';
import { CalculatorMeta, CalculatorId, CategoryId } from '../types';
import { CALCULATORS } from '../data/calculators';
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
import { FAQSection } from './FAQSection';
import { ArrowLeft, BookOpen, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';

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
  const meta = CALCULATORS.find(c => c.id === calculatorId) || CALCULATORS[0];

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

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#0F2D5C] hover:border-[#0F2D5C] transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Calculators</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span>Home</span>
            <span>/</span>
            <span className="capitalize">{meta.categoryId}</span>
            <span>/</span>
            <span className="text-[#0F2D5C] font-bold">{meta.title}</span>
          </div>
        </div>

        {/* SEO Header Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0F2D5C] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#F4B400]" />
            <span>Civil Engineering & Architectural Estimation Tool</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {meta.title}
          </h1>

          <p className="text-slate-600 text-base leading-relaxed max-w-4xl">
            {meta.fullDescription}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <div className="text-xs font-bold text-slate-400 mr-2">Keywords:</div>
            {meta.tags.map((tag, i) => (
              <span key={i} className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* The Core Active Calculator Form Component */}
        {renderActiveCalculatorComponent()}

        {/* Related Calculators Recommendation */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                More Construction Tools
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                Related Engineering Calculators
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fallbackRelated.map((calc) => (
              <button
                key={calc.id}
                onClick={() => onSelectOtherCalculator(calc.id)}
                className="text-left bg-slate-50 hover:bg-blue-50/80 rounded-2xl p-4 border border-slate-200 hover:border-[#0F2D5C]/30 transition-all group cursor-pointer"
              >
                <div className="font-bold text-slate-900 group-hover:text-[#0F2D5C] text-sm">
                  {calc.title}
                </div>
                <div className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {calc.shortDescription}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Specific FAQs */}
        {meta.faqs && meta.faqs.length > 0 && (
          <FAQSection
            customFaqs={meta.faqs}
            title={`${meta.title} - Technical FAQs & Formulas`}
            subtitle="Understand the civil engineering principles behind this calculator's mathematical output."
          />
        )}

      </div>
    </div>
  );
};

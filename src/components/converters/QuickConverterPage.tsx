import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SEO } from '../SEO';
import { ArrowRightLeft, ArrowLeft, CheckCircle2, ArrowRight, BookOpen, Layers, Sparkles, HelpCircle } from 'lucide-react';

interface QuickConverterProps {
  typeOverride?: 'cft-to-m3' | 'm3-to-cft' | 'kg-to-ton' | 'mm-to-inch';
}

interface ConverterConfig {
  id: string;
  title: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  fromUnit: string;
  toUnit: string;
  factor: number; // to = from * factor
  precision: number;
  formula: string;
  formulaExplanation: string;
  sampleValues: number[];
  workedExample: {
    scenario: string;
    calculation: string;
    result: string;
  };
  faqs: Array<{ q: string; a: string }>;
  relatedSlugs: Array<{ label: string; path: string }>;
}

const CONVERTER_CONFIGS: Record<string, ConverterConfig> = {
  'cft-to-m3': {
    id: 'cft-to-m3',
    title: 'CFT to m³ Converter (Cubic Feet to Cubic Meters)',
    h1: 'CFT to m³ Converter – Cubic Feet to Cubic Meters',
    seoTitle: 'CFT to m³ Converter – Cubic Feet to Cubic Meters | BuildMetric',
    metaDescription: 'Convert cubic feet (CFT) to cubic meters (m³) instantly. Precision conversion factor, construction formula, conversion table, and worked engineering examples.',
    fromUnit: 'CFT (Cubic Feet)',
    toUnit: 'm³ (Cubic Meters)',
    factor: 0.0283168466,
    precision: 4,
    formula: 'Volume in m³ = Volume in CFT × 0.02831685',
    formulaExplanation: 'One foot equals exactly 0.3048 meters. Therefore, 1 cubic foot = (0.3048)³ = 0.028316846592 cubic meters.',
    sampleValues: [1, 5, 10, 25, 50, 100, 200, 500, 1000],
    workedExample: {
      scenario: 'You have a concrete footing excavation volume of 450 CFT on site and need to order ready-mix concrete batch trucks in cubic meters (m³).',
      calculation: 'm³ = 450 CFT × 0.02831685',
      result: '12.74 m³ of ready-mix concrete'
    },
    faqs: [
      {
        q: 'How many cubic feet are in 1 cubic meter?',
        a: 'There are exactly 35.3147 cubic feet (CFT) in 1 cubic meter (m³).'
      },
      {
        q: 'How do you convert CFT to m³ for concrete?',
        a: 'Divide your CFT volume by 35.3147 (or multiply by 0.02831685) to get the volume in cubic meters.'
      }
    ],
    relatedSlugs: [
      { label: 'm³ to CFT Converter', path: '/converters/m3-to-cft' },
      { label: 'Concrete Volume Calculator', path: '/concrete/concrete-volume-calculator' },
      { label: 'Sand Quantity Calculator', path: '/concrete/sand-calculator' }
    ]
  },
  'm3-to-cft': {
    id: 'm3-to-cft',
    title: 'm³ to CFT Converter (Cubic Meters to Cubic Feet)',
    h1: 'm³ to CFT Converter – Cubic Meters to Cubic Feet',
    seoTitle: 'm³ to CFT Converter – Cubic Meters to Cubic Feet | BuildMetric',
    metaDescription: 'Convert cubic meters (m³) to cubic feet (CFT) for concrete, sand, and soil excavation. High-precision civil engineering conversion table and formulas.',
    fromUnit: 'm³ (Cubic Meters)',
    toUnit: 'CFT (Cubic Feet)',
    factor: 35.3146667,
    precision: 2,
    formula: 'Volume in CFT = Volume in m³ × 35.31467',
    formulaExplanation: 'Because 1 meter equals 3.28084 feet, 1 cubic meter equals (3.28084)³ = 35.3146667 cubic feet (CFT).',
    sampleValues: [0.5, 1, 2, 5, 10, 20, 50, 100, 250],
    workedExample: {
      scenario: 'A structural drawing specifies 18.5 m³ of wet concrete for an RCC roof slab. Local sand and aggregate suppliers sell materials in brass (100 CFT). How much is 18.5 m³ in CFT?',
      calculation: 'CFT = 18.5 m³ × 35.31467',
      result: '653.32 CFT (~6.53 brass)'
    },
    faqs: [
      {
        q: 'What is 1 brass of sand in CFT and m³?',
        a: 'In construction terminology, 1 brass equals 100 cubic feet (CFT), which corresponds to approximately 2.8317 cubic meters (m³).'
      },
      {
        q: 'Why is CFT commonly used alongside cubic meters?',
        a: 'Many ready-mix plants batch in cubic meters (m³), whereas traditional quarry aggregates, sand dump trucks, and timber are frequently invoiced in cubic feet (CFT).'
      }
    ],
    relatedSlugs: [
      { label: 'CFT to m³ Converter', path: '/converters/cft-to-m3' },
      { label: 'Excavation Calculator', path: '/earthwork/excavation-calculator' },
      { label: 'Aggregate Calculator', path: '/concrete/aggregate-calculator' }
    ]
  },
  'kg-to-ton': {
    id: 'kg-to-ton',
    title: 'kg to Metric Ton Converter (Kilograms to Tonnes)',
    h1: 'kg to Metric Ton Converter – Kilograms to Metric Tons',
    seoTitle: 'kg to Metric Ton Converter – Steel & Material Calculator | BuildMetric',
    metaDescription: 'Convert kilograms (kg) to metric tons (t) easily for steel reinforcement, cement, and bulk construction materials. Formula, table, and rebar examples.',
    fromUnit: 'kg (Kilograms)',
    toUnit: 'Tons (Metric Tonnes)',
    factor: 0.001,
    precision: 3,
    formula: 'Weight in Metric Tons = Weight in kg / 1000',
    formulaExplanation: 'A standard international metric ton (or tonne) is defined as exactly 1,000 kilograms.',
    sampleValues: [100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000],
    workedExample: {
      scenario: 'Your bar bending schedule (BBS) calculates a total reinforcement rebar weight of 14,780 kg for column and beam cages.',
      calculation: 'Tons = 14,780 kg / 1000',
      result: '14.78 Metric Tons of steel rebar'
    },
    faqs: [
      {
        q: 'What is the difference between a metric ton, US short ton, and imperial long ton?',
        a: 'A metric ton is exactly 1,000 kg (2,204.62 lbs). A US short ton is 2,000 lbs (907.18 kg), while an imperial long ton is 2,240 lbs (1,016.05 kg).'
      },
      {
        q: 'How many 50 kg cement bags make 1 metric ton?',
        a: 'Exactly 20 bags of 50 kg cement make 1 metric ton (1,000 kg / 50 kg = 20 bags).'
      }
    ],
    relatedSlugs: [
      { label: 'Steel Weight Calculator', path: '/rebar-steel/steel-weight-calculator' },
      { label: 'Rebar Quantity Calculator', path: '/rebar-steel/rebar-weight-calculator' },
      { label: 'Cement Quantity Calculator', path: '/concrete/cement-quantity-calculator' }
    ]
  },
  'mm-to-inch': {
    id: 'mm-to-inch',
    title: 'mm to Inch Converter (Millimeters to Inches)',
    h1: 'mm to Inch Converter – Millimeters to Fractional & Decimal Inches',
    seoTitle: 'mm to Inch Converter – Rebar & Dimension Tool | BuildMetric',
    metaDescription: 'Convert millimeters (mm) to inches with high precision. Standard rebar bar sizes (8mm to 32mm), structural timber, and architectural conversion tables.',
    fromUnit: 'mm (Millimeters)',
    toUnit: 'Inches (in)',
    factor: 1 / 25.4,
    precision: 4,
    formula: 'Inches = Millimeters / 25.4',
    formulaExplanation: 'One international inch is legally defined as exactly 25.4 millimeters (0.0254 meters).',
    sampleValues: [6, 8, 10, 12, 16, 20, 25, 32, 50, 100, 150, 200, 300],
    workedExample: {
      scenario: 'A European architectural detail specifies a tile thickness of 12 mm and an expansion joint gap of 6 mm. What are these in inches?',
      calculation: '12 mm / 25.4 = 0.4724 in (~1/2 in) and 6 mm / 25.4 = 0.2362 in (~1/4 in)',
      result: '0.472 in and 0.236 in'
    },
    faqs: [
      {
        q: 'How do international rebar sizes in mm correspond to US imperial bar sizes?',
        a: '10 mm is roughly equivalent to #3 bar (3/8 in); 12 mm is #4 bar (1/2 in); 16 mm is #5 bar (5/8 in); 20 mm is #6 bar (3/4 in); 25 mm is #8 bar (1 in); and 32 mm is #10 bar (1-1/4 in).'
      },
      {
        q: 'How many mm are in 1 inch?',
        a: 'There are exactly 25.4 millimeters in 1 inch.'
      }
    ],
    relatedSlugs: [
      { label: 'Steel Weight Calculator', path: '/rebar-steel/steel-weight-calculator' },
      { label: 'Length Converter', path: '/converters/mm-to-inch' },
      { label: 'Beam Volume Calculator', path: '/structural/beam-volume-calculator' }
    ]
  }
};

export const QuickConverterPage: React.FC<QuickConverterProps> = ({ typeOverride }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const converterKey = typeOverride || slug || 'cft-to-m3';
  const config = CONVERTER_CONFIGS[converterKey] || CONVERTER_CONFIGS['cft-to-m3'];

  const [fromValue, setFromValue] = useState<number>(10);
  const [toValue, setToValue] = useState<number>(() => +(10 * config.factor).toFixed(config.precision));

  const handleFromChange = (val: number) => {
    setFromValue(val);
    setToValue(+(val * config.factor).toFixed(config.precision));
  };

  const handleToChange = (val: number) => {
    setToValue(val);
    setFromValue(+(val / config.factor).toFixed(config.precision));
  };

  const canonicalUrl = `https://buildmetric-app.vercel.app/converters/${config.id}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://buildmetric-app.vercel.app/" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://buildmetric-app.vercel.app/converters" },
        { "@type": "ListItem", "position": 3, "name": config.title, "item": canonicalUrl }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": config.title,
      "url": canonicalUrl,
      "applicationCategory": "EducationalApplication",
      "description": config.metaDescription
    }
  ];

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <SEO
        title={config.seoTitle}
        description={config.metaDescription}
        canonicalUrl={canonicalUrl}
        jsonLd={jsonLd}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-semibold">
          <button
            onClick={() => navigate('/converters')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#0F2D5C] hover:border-[#0F2D5C] transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Converters</span>
          </button>

          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="hover:text-slate-800 cursor-pointer" onClick={() => navigate('/')}>Home</span>
            <span>/</span>
            <span className="hover:text-slate-800 cursor-pointer" onClick={() => navigate('/converters')}>Converters</span>
            <span>/</span>
            <span className="text-[#0F2D5C] font-bold">{config.title}</span>
          </div>
        </div>

        {/* Hero Card with H1 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0F2D5C] text-xs font-bold">
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#F4B400]" />
            <span>Construction Engineering Unit Converter</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {config.h1}
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
            {config.metaDescription}
          </p>
        </div>

        {/* Interactive Converter Engine */}
        <div className="bg-gradient-to-br from-[#0F2D5C] to-[#163c78] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-xs uppercase font-bold text-[#F4B400] tracking-wider">
            Real-Time Two-Way Conversion
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Input 1 */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-2">
              <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider">
                {config.fromUnit}
              </label>
              <input
                type="number"
                step="any"
                value={fromValue}
                onChange={(e) => handleFromChange(parseFloat(e.target.value) || 0)}
                className="w-full bg-white text-slate-900 px-4 py-3 rounded-xl font-mono text-2xl font-black outline-none shadow-inner"
              />
            </div>

            {/* Input 2 */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-2">
              <label className="block text-xs font-bold text-blue-200 uppercase tracking-wider">
                {config.toUnit}
              </label>
              <input
                type="number"
                step="any"
                value={toValue}
                onChange={(e) => handleToChange(parseFloat(e.target.value) || 0)}
                className="w-full bg-white text-slate-900 px-4 py-3 rounded-xl font-mono text-2xl font-black outline-none shadow-inner"
              />
            </div>

          </div>

          <div className="bg-black/20 rounded-xl p-3.5 border border-white/10 text-xs font-mono text-blue-100 flex items-center justify-between">
            <span><strong>Formula:</strong> {config.formula}</span>
            <span className="text-[#F4B400] font-bold">1 {config.fromUnit.split(' ')[0]} = {config.factor} {config.toUnit.split(' ')[0]}</span>
          </div>
        </div>

        {/* Quick Reference Conversion Table */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            {config.fromUnit} to {config.toUnit} Quick Reference Table
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">{config.fromUnit}</th>
                  <th className="py-3 px-4">{config.toUnit}</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Calculation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {config.sampleValues.map((val) => {
                  const converted = +(val * config.factor).toFixed(config.precision);
                  return (
                    <tr key={val} className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-3 px-4 font-bold text-[#0F2D5C]">{val}</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">{converted}</td>
                      <td className="py-3 px-4 text-slate-400 hidden sm:table-cell">
                        {val} × {config.factor} = {converted}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Worked Example & Technical Methodology */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#F4B400]" />
              <span>Conversion Methodology</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Mathematical Derivation
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {config.formulaExplanation}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Site Worked Example</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Practical Construction Use Case
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {config.workedExample.scenario}
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs font-mono text-[#0F2D5C]">
              <div>{config.workedExample.calculation}</div>
              <div className="font-bold text-emerald-700 mt-1">➔ {config.workedExample.result}</div>
            </div>
          </div>

        </div>

        {/* Related Calculators Links */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">
            Related Construction Calculators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {config.relatedSlugs.map((rel, idx) => (
              <button
                key={idx}
                onClick={() => {
                  navigate(rel.path);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#0F2D5C] hover:bg-blue-50/50 transition-all text-xs font-bold text-slate-800 hover:text-[#0F2D5C] cursor-pointer"
              >
                <span>{rel.label}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#F4B400]" />
            <span>Frequently Asked Questions</span>
          </div>
          <div className="space-y-4">
            {config.faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <h4 className="font-bold text-sm text-slate-900">{faq.q}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

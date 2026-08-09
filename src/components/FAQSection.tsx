import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQSectionProps {
  customFaqs?: FAQItem[];
  title?: string;
  subtitle?: string;
}

export const GENERAL_FAQS: FAQItem[] = [
  {
    question: 'Are all calculators on BuildMetric completely free to use?',
    answer: 'Yes! Every construction calculator and unit converter on BuildMetric is 100% free with unlimited calculations. No account registration, subscription, or credit card is required.'
  },
  {
    question: 'Are the calculation formulas accurate for real construction sites?',
    answer: 'All calculations strictly adhere to standard civil engineering codes (IS 456, ACI 318, British Standards) and standard material bulk densities (e.g. steel rebar D²/162.2, dry concrete multiplier 1.54, 1 bag cement = 1.226 CFT). However, site contractors should allow 3-5% extra for site handling margins.'
  },
  {
    question: 'Can I use BuildMetric offline on mobile phones on site?',
    answer: 'Yes, BuildMetric runs calculations locally in client-side JavaScript. Once the webpage loads, calculations function smoothly without sending data to external servers.'
  },
  {
    question: 'How do I convert between Feet/CFT and Meters/CUM?',
    answer: 'BuildMetric includes built-in unit selectors (Feet/Meters, Inches/CM) on all forms, plus a dedicated Construction Unit Converter tool for fast dimensional conversions.'
  },
  {
    question: 'Can I print or copy calculation results for client proposals?',
    answer: 'Yes! Every calculator features a "Copy Results" button to paste into WhatsApp, Email, or Excel, plus a clean "Print Report" option for generating PDF summary sheets.'
  }
];

export const FAQSection: React.FC<FAQSectionProps> = ({
  customFaqs = GENERAL_FAQS,
  title = "Frequently Asked Questions",
  subtitle = "Got questions about construction calculations or material formulas? We've got answers."
}) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0F2D5C] text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Center & Guidance</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            {subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {customFaqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div 
                key={i} 
                className={`bg-white rounded-xl border transition-all ${isOpen ? 'border-[#0F2D5C] shadow-md ring-1 ring-[#0F2D5C]/20' : 'border-slate-200 hover:border-slate-300'}`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'bg-[#0F2D5C] text-white rotate-180' : 'bg-slate-100 text-slate-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

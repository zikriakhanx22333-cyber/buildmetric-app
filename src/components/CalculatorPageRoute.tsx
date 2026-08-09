import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CALCULATORS } from '../data/calculators';
import { CalculatorEngine } from './CalculatorEngine';
import { SEO } from './SEO';
import { getIdFromSlug, getSlugFromId } from '../utils/slugs';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export const CalculatorPageRoute: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const calcId = slug ? getIdFromSlug(slug) : null;
  const meta = calcId ? CALCULATORS.find(c => c.id === calcId) : null;

  if (!calcId || !meta) {
    return (
      <div className="py-20 bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <SEO 
          title="Calculator Not Found | BuildMetric"
          description="The requested construction calculator could not be found."
        />
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 max-w-lg w-full text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#F4B400] border border-amber-200 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-[#0F2D5C]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900">Calculator Not Found</h1>
            <p className="text-sm text-slate-600">
              The calculator route <code className="bg-slate-100 px-2 py-0.5 rounded text-xs font-mono font-bold text-[#0F2D5C]">/calculators/{slug}</code> does not match any active tool.
            </p>
          </div>

          <button
            onClick={() => navigate('/calculators')}
            className="w-full py-3.5 px-6 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse All Active Calculators</span>
          </button>
        </div>
      </div>
    );
  }

  const pageTitle = meta.seoTitle || `${meta.title} | BuildMetric Construction Tools`;
  const pageDescription = meta.seoMetaDescription || meta.fullDescription || meta.shortDescription;

  return (
    <>
      <SEO title={pageTitle} description={pageDescription} />
      <CalculatorEngine
        calculatorId={calcId}
        onBack={() => {
          navigate('/calculators');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectOtherCalculator={(otherId) => {
          navigate(`/calculators/${getSlugFromId(otherId)}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </>
  );
};

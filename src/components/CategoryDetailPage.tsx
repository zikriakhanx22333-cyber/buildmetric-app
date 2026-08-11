import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CATEGORIES, CALCULATORS } from '../data/calculators';
import { CalculatorCard } from './CalculatorCard';
import { SEO } from './SEO';
import { getSlugFromId } from '../utils/slugs';
import { ArrowLeft, Folder } from 'lucide-react';

export const CategoryDetailPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const category = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
  const categoryCalculators = CALCULATORS.filter(c => c.categoryId === category.id);
  const canonicalUrl = `https://buildmetric.com/categories/${category.id}`;

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://buildmetric.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Categories",
        "item": "https://buildmetric.com/categories"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <SEO 
        title={`${category.name} Calculators & Estimation Tools | BuildMetric`}
        description={category.description}
        canonicalUrl={canonicalUrl}
        jsonLd={breadcrumbsJsonLd}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/categories')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:text-[#0F2D5C] hover:border-[#0F2D5C] shadow-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Categories</span>
        </button>

        {/* Category Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0F2D5C] text-xs font-bold">
            <Folder className="w-3.5 h-3.5 text-[#F4B400]" />
            <span>{categoryCalculators.length} Tools Available</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {category.name} Calculators
          </h1>

          <p className="text-slate-600 text-base leading-relaxed max-w-3xl">
            {category.description}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCalculators.map((calc) => (
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

      </div>
    </div>
  );
};

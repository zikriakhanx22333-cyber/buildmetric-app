import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/calculators';
import { CategoryCard } from './CategoryCard';
import { SEO } from './SEO';
import { Sparkles } from 'lucide-react';

export const CategoriesDirectoryPage: React.FC = () => {
  const navigate = useNavigate();

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
      }
    ]
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <SEO 
        title="Construction Categories & Engineering Disciplines | BuildMetric"
        description="Browse calculators grouped by construction categories: Concrete & Cement, Steel & Rebar, Masonry, Flooring & Finishing, Earthwork, Structural, and BOQ Cost Estimation."
        canonicalUrl="https://buildmetric.com/categories"
        jsonLd={breadcrumbsJsonLd}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#0F2D5C] to-[#1a4485] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#F4B400]">
              <Sparkles className="w-3.5 h-3.5 text-[#F4B400]" />
              <span>Civil Engineering Categories</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Construction Categories
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              Find structural, civil engineering, material, and cost estimation tools organized by construction phase and trade discipline.
            </p>
          </div>
        </div>

        {/* Categories List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onSelect={(id) => {
                navigate(`/categories/${id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

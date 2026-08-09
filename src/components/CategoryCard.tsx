import React from 'react';
import { CategoryInfo } from '../types';
import { Box, Layers, Building2, Grid, Paintbrush, Calculator, Ruler, ArrowRightLeft, ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
  onSelect: (id: CategoryInfo['id']) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Box': return <Box className="w-6 h-6 text-white" />;
      case 'Layers': return <Layers className="w-6 h-6 text-white" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-white" />;
      case 'Grid': return <Grid className="w-6 h-6 text-white" />;
      case 'Paintbrush': return <Paintbrush className="w-6 h-6 text-white" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-white" />;
      case 'Ruler': return <Ruler className="w-6 h-6 text-white" />;
      case 'ArrowRightLeft': return <ArrowRightLeft className="w-6 h-6 text-white" />;
      default: return <Calculator className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(category.id)}
      className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:border-[#0F2D5C]/30 transition-all cursor-pointer flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
          {getIcon(category.iconName)}
        </div>
        <div>
          <h3 className="font-bold text-slate-900 group-hover:text-[#0F2D5C] transition-colors text-base">
            {category.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
            {category.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-[#0F2D5C] transition-colors">
          {category.count} Tools
        </span>
        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0F2D5C] group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};

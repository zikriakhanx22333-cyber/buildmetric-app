import React from 'react';
import { CalculatorMeta, CategoryId } from '../types';
import {
  Box,
  Layers,
  Building2,
  Grid,
  Paintbrush,
  Calculator as CalcIcon,
  Ruler,
  ArrowRightLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CalculatorCardProps {
  calculator: CalculatorMeta;
  onSelect: (id: CalculatorMeta['id']) => void;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ calculator, onSelect }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Box': return <Box className="w-6 h-6 text-[#0F2D5C]" />;
      case 'Layers': return <Layers className="w-6 h-6 text-[#0F2D5C]" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-[#0F2D5C]" />;
      case 'Grid': return <Grid className="w-6 h-6 text-[#0F2D5C]" />;
      case 'Paintbrush': return <Paintbrush className="w-6 h-6 text-[#0F2D5C]" />;
      case 'Calculator': return <CalcIcon className="w-6 h-6 text-[#0F2D5C]" />;
      case 'Ruler': return <Ruler className="w-6 h-6 text-[#0F2D5C]" />;
      case 'ArrowRightLeft': return <ArrowRightLeft className="w-6 h-6 text-[#0F2D5C]" />;
      default: return <CalcIcon className="w-6 h-6 text-[#0F2D5C]" />;
    }
  };

  return (
    <div 
      onClick={() => onSelect(calculator.id)}
      className="group relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-[#0F2D5C]/30 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
    >
      {/* Top Accent Stripe on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0F2D5C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-[#0F2D5C] group-hover:text-white transition-colors duration-300">
            {React.cloneElement(getIcon(calculator.iconName), {
              className: "w-6 h-6 transition-colors duration-300 group-hover:text-[#F4B400]"
            })}
          </div>

          {calculator.popular && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              <Sparkles className="w-3 h-3 text-[#F4B400]" />
              Popular
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0F2D5C] transition-colors mb-2 line-clamp-1">
          {calculator.title}
        </h3>

        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {calculator.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {calculator.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 group-hover:text-[#0F2D5C] transition-colors">
          Local Browser Tool
        </span>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSelect(calculator.id);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F2D5C] group-hover:bg-[#163c78] text-[#F4B400] text-xs font-bold shadow-sm transition-all group-hover:translate-x-0.5"
        >
          <span>Calculate</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

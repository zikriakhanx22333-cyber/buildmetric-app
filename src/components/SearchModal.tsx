import React, { useState, useEffect } from 'react';
import { Search, X, Calculator, ArrowRight, Sparkles } from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { CalculatorId } from '../types';

interface SearchModalProps {
  onClose: () => void;
  onSelectCalculator: (id: CalculatorId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onClose, onSelectCalculator }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filtered = CALCULATORS.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
    c.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-[#0F2D5C] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search construction tools (e.g. Concrete, Steel, Brick, Tile, Paint, Cost)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 font-medium text-base focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No matching construction calculators found for "{query}".
            </div>
          ) : (
            filtered.map((calc) => (
              <button
                key={calc.id}
                onClick={() => {
                  onSelectCalculator(calc.id);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-sm font-bold text-slate-900 group-hover:text-[#0F2D5C]">
                    {calc.title}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-1">
                    {calc.shortDescription}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-[#0F2D5C] bg-blue-100 px-2 py-0.5 rounded">
                    Calculate
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F2D5C] group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-100 text-[11px] text-slate-400 border-t border-slate-200 flex items-center justify-between">
          <span>Press ESC to exit</span>
          <span>11+ Local Browser Calculators</span>
        </div>

      </div>
    </div>
  );
};

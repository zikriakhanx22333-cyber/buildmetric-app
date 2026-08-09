import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false }) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* BuildMetric Construction Icon */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#0F2D5C] text-[#F4B400] shadow-md shadow-blue-950/20 border border-blue-900/30 overflow-hidden group">
        {/* Background Subtle Metric Grid Line */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F4B400_1px,transparent_1px)] [background-size:6px_6px]" />
        
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-6 h-6 transition-transform duration-300 group-hover:scale-105"
        >
          {/* Structural Beam / Pillar */}
          <path d="M4 21V3h16v18" stroke="#F4B400" />
          <path d="M4 9h16" stroke="#ffffff" strokeOpacity="0.8" />
          <path d="M4 15h16" stroke="#ffffff" strokeOpacity="0.8" />
          {/* Compass / Ruler Triangulation Tick */}
          <path d="M12 3l4 6h-8l4-6z" fill="#F4B400" stroke="none" />
          <circle cx="12" cy="18" r="1.5" fill="#F4B400" stroke="none" />
        </svg>

        {/* Small Golden Accent Dot */}
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F4B400] ring-2 ring-[#0F2D5C]" />
      </div>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center text-xl font-black tracking-tight text-[#0F2D5C]">
            <span>Build</span>
            <span className="text-[#F4B400] font-black">Metric</span>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider -mt-1">
            Construction Calculators
          </span>
        </div>
      )}
    </div>
  );
};

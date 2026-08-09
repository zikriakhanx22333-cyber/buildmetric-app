import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Search, Menu, X, ChevronDown, Calculator, ArrowRight } from 'lucide-react';
import { CATEGORIES, CALCULATORS } from '../data/calculators';
import { CalculatorId, CategoryId } from '../types';
import { getSlugFromId } from '../utils/slugs';

interface HeaderProps {
  onSearchOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [calculatorsDropdownOpen, setCalculatorsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const path = location.pathname;

  const navigateTo = (url: string) => {
    navigate(url);
    setMobileMenuOpen(false);
    setCategoriesDropdownOpen(false);
    setCalculatorsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-200 bg-white border-b ${isScrolled ? 'border-slate-200 shadow-md py-2.5' : 'border-slate-100 py-3.5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <button 
            onClick={() => navigateTo('/')}
            className="text-left focus:outline-none focus:ring-2 focus:ring-[#0F2D5C] rounded-lg p-1 -ml-1"
          >
            <Logo />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-semibold text-sm text-slate-700">
            
            {/* Home */}
            <button
              onClick={() => navigateTo('/')}
              className={`px-3 py-2 rounded-md transition-colors ${path === '/' ? 'text-[#0F2D5C] bg-blue-50 font-bold' : 'hover:text-[#0F2D5C] hover:bg-slate-100'}`}
            >
              Home
            </button>

            {/* Calculators Dropdown */}
            <div className="relative group">
              <button
                onClick={() => navigateTo('/calculators')}
                onMouseEnter={() => setCalculatorsDropdownOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${path.startsWith('/calculators') ? 'text-[#0F2D5C] bg-blue-50 font-bold' : 'hover:text-[#0F2D5C] hover:bg-slate-100'}`}
              >
                <span>Calculators</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#0F2D5C]" />
              </button>

              {/* Mega Dropdown Menu for Popular Calculators */}
              <div 
                className="absolute left-0 top-full pt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                onMouseLeave={() => setCalculatorsDropdownOpen(false)}
              >
                <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1">
                  <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                    <span>Popular Tools</span>
                    <span className="text-[10px] text-[#0F2D5C] bg-blue-50 px-1.5 py-0.5 rounded">100% Free</span>
                  </div>
                  {CALCULATORS.filter(c => c.popular).slice(0, 7).map((calc) => (
                    <button
                      key={calc.id}
                      onClick={() => navigateTo(`/calculators/${getSlugFromId(calc.id)}`)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50/80 transition-colors flex items-center justify-between group/item"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-800 group-hover/item:text-[#0F2D5C]">
                          {calc.title}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {calc.shortDescription}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover/item:text-[#0F2D5C] group-hover/item:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => navigateTo('/calculators')}
                      className="w-full text-center py-2 text-xs font-bold text-[#0F2D5C] bg-slate-50 rounded-lg hover:bg-blue-100/60 transition-colors"
                    >
                      View All Tools →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                onClick={() => navigateTo('/categories')}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${path.startsWith('/categories') ? 'text-[#0F2D5C] bg-blue-50 font-bold' : 'hover:text-[#0F2D5C] hover:bg-slate-100'}`}
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#0F2D5C]" />
              </button>

              <div className="absolute left-0 top-full pt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1">
                  <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Engineering Disciplines
                  </div>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => navigateTo(`/categories/${cat.id}`)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-between"
                    >
                      <span className="text-sm font-medium text-slate-800">{cat.name}</span>
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog */}
            <button
              onClick={() => navigateTo('/blog')}
              className={`px-3 py-2 rounded-md transition-colors ${path === '/blog' ? 'text-[#0F2D5C] bg-blue-50 font-bold' : 'hover:text-[#0F2D5C] hover:bg-slate-100'}`}
            >
              Blog
            </button>

            {/* About */}
            <button
              onClick={() => navigateTo('/about')}
              className={`px-3 py-2 rounded-md transition-colors ${path === '/about' ? 'text-[#0F2D5C] bg-blue-50 font-bold' : 'hover:text-[#0F2D5C] hover:bg-slate-100'}`}
            >
              About
            </button>

            {/* Contact */}
            <button
              onClick={() => navigateTo('/contact')}
              className={`px-3 py-2 rounded-md transition-colors ${path === '/contact' ? 'text-[#0F2D5C] bg-blue-50 font-bold' : 'hover:text-[#0F2D5C] hover:bg-slate-100'}`}
            >
              Contact
            </button>

          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={onSearchOpen}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs sm:text-sm font-medium transition-colors border border-slate-200 cursor-pointer"
              title="Search tools"
            >
              <Search className="w-4 h-4 text-[#0F2D5C]" />
              <span className="hidden md:inline">Search calculators...</span>
              <kbd className="hidden lg:inline-block bg-white text-[10px] font-mono px-1.5 py-0.5 rounded text-slate-400 border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* CTA Button */}
            <button
              onClick={() => navigateTo('/calculators')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>All Tools</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => navigateTo('/')}
              className="text-left px-3 py-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-800 text-sm font-bold"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('/calculators')}
              className="text-left px-3 py-2.5 rounded-lg bg-blue-50 text-[#0F2D5C] text-sm font-bold"
            >
              All Calculators
            </button>
            <button
              onClick={() => navigateTo('/categories')}
              className="text-left px-3 py-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-800 text-sm font-bold"
            >
              Categories
            </button>
            <button
              onClick={() => navigateTo('/blog')}
              className="text-left px-3 py-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-800 text-sm font-bold"
            >
              Engineering Blog
            </button>
            <button
              onClick={() => navigateTo('/about')}
              className="text-left px-3 py-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-800 text-sm font-bold"
            >
              About Us
            </button>
            <button
              onClick={() => navigateTo('/contact')}
              className="text-left px-3 py-2.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-800 text-sm font-bold"
            >
              Contact Support
            </button>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Popular Calculators
            </div>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              {CALCULATORS.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => navigateTo(`/calculators/${getSlugFromId(calc.id)}`)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50/80 text-sm font-medium text-slate-700 flex items-center justify-between"
                >
                  <span>{calc.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

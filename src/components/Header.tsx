import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Calculator,
  ArrowRight,
  FolderKanban,
  FileSpreadsheet,
  Box,
  Plus,
  User,
  Building2,
  Sparkles
} from 'lucide-react';
import { CATEGORIES, CALCULATORS } from '../data/calculators';
import { getSlugFromId } from '../utils/slugs';
import { projectStore, subscribeToStore } from '../services/projectStore';
import { CreateProjectModal } from './projects/CreateProjectModal';
import { SignInModal } from './SignInModal';

interface HeaderProps {
  onSearchOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calculatorsDropdownOpen, setCalculatorsDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  const [projectCount, setProjectCount] = useState<number>(projectStore.getProjects().length);
  const [userProfile, setUserProfile] = useState(projectStore.getUserProfile());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    const unsubscribe = subscribeToStore(() => {
      setProjectCount(projectStore.getProjects().length);
      setUserProfile(projectStore.getUserProfile());
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const path = location.pathname;

  const navigateTo = (url: string) => {
    navigate(url);
    setMobileMenuOpen(false);
    setCalculatorsDropdownOpen(false);
    setResourcesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-200 bg-white border-b ${isScrolled ? 'border-slate-200 shadow-md py-2.5' : 'border-slate-100 py-3.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <button 
              onClick={() => navigateTo('/')}
              className="text-left focus:outline-none focus:ring-2 focus:ring-[#0F2D5C] rounded-lg p-1 -ml-1 cursor-pointer"
            >
              <Logo />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 font-semibold text-sm text-slate-700">
              
              {/* Home */}
              <button
                onClick={() => navigateTo('/')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${path === '/' ? 'text-[#0F2D5C] bg-blue-50 font-bold' : 'hover:text-[#0F2D5C] hover:bg-slate-100'}`}
              >
                Home
              </button>

              {/* Calculators Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => navigateTo('/calculators')}
                  onMouseEnter={() => setCalculatorsDropdownOpen(true)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${path.startsWith('/calculators') ? 'text-[#0F2D5C] bg-blue-50 font-bold' : 'hover:text-[#0F2D5C] hover:bg-slate-100'}`}
                >
                  <Calculator className="w-4 h-4 text-slate-500 group-hover:text-[#0F2D5C]" />
                  <span>Calculators</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0F2D5C]" />
                </button>

                {/* Mega Dropdown */}
                <div 
                  className="absolute left-0 top-full pt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  onMouseLeave={() => setCalculatorsDropdownOpen(false)}
                >
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1">
                    <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 flex items-center justify-between">
                      <span>Popular Calculators</span>
                      <span className="text-[10px] text-[#0F2D5C] bg-blue-50 px-1.5 py-0.5 rounded font-bold">100% Free</span>
                    </div>
                    {CALCULATORS.filter(c => c.popular).slice(0, 7).map((calc) => (
                      <button
                        key={calc.id}
                        onClick={() => navigateTo(`/calculators/${getSlugFromId(calc.id)}`)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50/80 transition-colors flex items-center justify-between group/item cursor-pointer"
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
                        className="w-full text-center py-2 text-xs font-bold text-[#0F2D5C] bg-slate-50 rounded-lg hover:bg-blue-100/60 transition-colors cursor-pointer"
                      >
                        View All {CALCULATORS.length} Calculators →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects Workspace */}
              <button
                onClick={() => navigateTo('/projects')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${path.startsWith('/projects') ? 'text-[#0F2D5C] bg-blue-50 font-bold' : 'hover:text-[#0F2D5C] hover:bg-slate-100'}`}
              >
                <FolderKanban className="w-4 h-4 text-slate-500" />
                <span>Projects</span>
                {projectCount > 0 && (
                  <span className="text-[10px] font-mono font-bold bg-[#0F2D5C] text-[#F4B400] px-1.5 py-0.2 rounded-full">
                    {projectCount}
                  </span>
                )}
              </button>

              {/* BOQ Builder */}
              <button
                onClick={() => navigateTo('/boq')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${path.startsWith('/boq') ? 'text-[#0F2D5C] bg-blue-50 font-bold' : 'hover:text-[#0F2D5C] hover:bg-slate-100'}`}
              >
                <FileSpreadsheet className="w-4 h-4 text-slate-500" />
                <span>BOQ</span>
              </button>

              {/* Materials Index */}
              <button
                onClick={() => navigateTo('/materials')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors cursor-pointer ${path.startsWith('/materials') ? 'text-[#0F2D5C] bg-blue-50 font-bold' : 'hover:text-[#0F2D5C] hover:bg-slate-100'}`}
              >
                <Box className="w-4 h-4 text-slate-500" />
                <span>Materials</span>
              </button>

              {/* Resources Dropdown */}
              <div className="relative group">
                <button
                  onMouseEnter={() => setResourcesDropdownOpen(true)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${path.startsWith('/categories') || path.startsWith('/blog') || path.startsWith('/about') ? 'text-[#0F2D5C] bg-blue-50 font-bold' : 'hover:text-[#0F2D5C] hover:bg-slate-100'}`}
                >
                  <span>Resources</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0F2D5C]" />
                </button>

                <div 
                  className="absolute left-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  onMouseLeave={() => setResourcesDropdownOpen(false)}
                >
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1 text-xs font-semibold">
                    <button
                      onClick={() => navigateTo('/categories')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
                    >
                      All Disciplines & Categories
                    </button>
                    <button
                      onClick={() => navigateTo('/blog')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
                    >
                      Engineering Articles & Guides
                    </button>
                    <button
                      onClick={() => navigateTo('/about')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
                    >
                      About BuildMetric
                    </button>
                    <button
                      onClick={() => navigateTo('/contact')}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
                    >
                      Engineering Feedback & Contact
                    </button>
                  </div>
                </div>
              </div>

            </nav>

            {/* Right Utilities */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Search Button */}
              <button
                onClick={onSearchOpen}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs sm:text-sm font-medium transition-colors border border-slate-200 cursor-pointer"
                title="Search calculators (⌘K)"
              >
                <Search className="w-4 h-4 text-[#0F2D5C]" />
                <span className="hidden md:inline">Search...</span>
                <kbd className="hidden lg:inline-block bg-white text-[10px] font-mono px-1.5 py-0.5 rounded text-slate-400 border border-slate-200">
                  ⌘K
                </kbd>
              </button>

              {/* Workspace Profile Button */}
              <button
                onClick={() => setSignInModalOpen(true)}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                title="Workspace Profile & Currency Settings"
              >
                <User className="w-4 h-4 text-slate-600" />
              </button>

              {/* Primary Action: + Create Project */}
              <button
                onClick={() => setCreateProjectOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              <button
                onClick={() => navigateTo('/')}
                className="text-left px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 text-sm font-bold cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('/calculators')}
                className="text-left px-3 py-2.5 rounded-xl bg-blue-50 text-[#0F2D5C] text-sm font-bold cursor-pointer"
              >
                Calculators
              </button>
              <button
                onClick={() => navigateTo('/projects')}
                className="text-left px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 text-sm font-bold flex items-center justify-between cursor-pointer"
              >
                <span>Projects</span>
                <span className="text-xs bg-[#0F2D5C] text-[#F4B400] px-2 py-0.5 rounded-full font-mono">{projectCount}</span>
              </button>
              <button
                onClick={() => navigateTo('/boq')}
                className="text-left px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 text-sm font-bold cursor-pointer"
              >
                BOQ Builder
              </button>
              <button
                onClick={() => navigateTo('/materials')}
                className="text-left px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 text-sm font-bold cursor-pointer"
              >
                Materials Index
              </button>
              <button
                onClick={() => navigateTo('/categories')}
                className="text-left px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 text-sm font-bold cursor-pointer"
              >
                Categories
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCreateProjectOpen(true);
              }}
              className="w-full py-3 rounded-xl bg-[#0F2D5C] text-[#F4B400] font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Construction Project</span>
            </button>
          </div>
        )}
      </header>

      {/* Global Modals */}
      {createProjectOpen && (
        <CreateProjectModal
          onClose={() => setCreateProjectOpen(false)}
          onProjectCreated={(id) => navigateTo(`/projects/${id}`)}
        />
      )}

      {signInModalOpen && (
        <SignInModal onClose={() => setSignInModalOpen(false)} />
      )}
    </>
  );
};

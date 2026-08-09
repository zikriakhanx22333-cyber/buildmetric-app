import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { CalculatorsDirectoryPage } from './components/CalculatorsDirectoryPage';
import { CalculatorPageRoute } from './components/CalculatorPageRoute';
import { CategoriesDirectoryPage } from './components/CategoriesDirectoryPage';
import { CategoryDetailPage } from './components/CategoryDetailPage';
import { BlogView } from './components/BlogView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { SearchModal } from './components/SearchModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { getSlugFromId } from './utils/slugs';

export default function App() {
  const navigate = useNavigate();
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [disclaimerModalOpen, setDisclaimerModalOpen] = useState<boolean>(false);

  // Keyboard shortcut ⌘K for search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-[#F4B400] selection:text-[#0F2D5C]">
      
      {/* Top Header Navigation */}
      <Header onSearchOpen={() => setSearchModalOpen(true)} />

      {/* Main Content Router */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage onSearchOpen={() => setSearchModalOpen(true)} />} />
          <Route path="/calculators" element={<CalculatorsDirectoryPage />} />
          <Route path="/calculators/:slug" element={<CalculatorPageRoute />} />
          <Route path="/categories" element={<CategoriesDirectoryPage />} />
          <Route path="/categories/:categoryId" element={<CategoryDetailPage />} />
          <Route path="/blog" element={<BlogView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer onOpenDisclaimer={() => setDisclaimerModalOpen(true)} />

      {/* Search Modal Overlay */}
      {searchModalOpen && (
        <SearchModal
          onClose={() => setSearchModalOpen(false)}
          onSelectCalculator={(id) => {
            navigate(`/calculators/${getSlugFromId(id)}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Engineering Disclaimer Modal Overlay */}
      {disclaimerModalOpen && (
        <DisclaimerModal onClose={() => setDisclaimerModalOpen(false)} />
      )}

    </div>
  );
}

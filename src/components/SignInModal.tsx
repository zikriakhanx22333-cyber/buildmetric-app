import React, { useState, useEffect } from 'react';
import { projectStore } from '../services/projectStore';
import { UserProfile, CurrencyCode, UnitSystem } from '../types';
import { User, X, Check, Building2, Mail, Briefcase, Coins, Ruler, Sparkles } from 'lucide-react';

interface SignInModalProps {
  onClose: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ onClose }) => {
  const [profile, setProfile] = useState<UserProfile>(projectStore.getUserProfile());
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [companyName, setCompanyName] = useState(profile.companyName || '');
  const [role, setRole] = useState(profile.role || '');
  const [currency, setCurrency] = useState<CurrencyCode>(profile.defaultCurrency);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(profile.defaultUnitSystem);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name: name.trim() || 'Estimator',
      email: email.trim() || 'estimator@buildmetric.app',
      companyName: companyName.trim(),
      role: role.trim(),
      defaultCurrency: currency,
      defaultUnitSystem: unitSystem,
      isGuest: false
    };

    projectStore.saveUserProfile(updated);
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0F2D5C] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#F4B400] text-[#0F2D5C] rounded-xl font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Estimator Workspace Profile</h3>
              <p className="text-xs text-blue-200 mt-0.5">Customize your company branding & default units</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Full Name / Estimator Title
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Company / Contracting Firm
            </label>
            <input
              type="text"
              placeholder="e.g. Apex Construction & Contracting"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Professional Role
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Project Quantity Surveyor"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Default Currency
              </label>
              <select
                value={currency}
                onChange={(e: any) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
              >
                <option value="SAR">SAR (Saudi Riyal)</option>
                <option value="AED">AED (UAE Dirham)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="PKR">PKR (Rupee)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Default Unit System
              </label>
              <select
                value={unitSystem}
                onChange={(e: any) => setUnitSystem(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
              >
                <option value="Metric">Metric (m, m³, Ton)</option>
                <option value="Imperial">Imperial (ft, CFT, lbs)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
            >
              {saved ? <Check className="w-4 h-4 text-emerald-400" /> : null}
              <span>{saved ? 'Saved' : 'Save Workspace'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

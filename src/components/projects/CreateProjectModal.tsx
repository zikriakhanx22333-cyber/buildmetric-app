import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectStore } from '../../services/projectStore';
import { ProjectType, CurrencyCode, UnitSystem } from '../../types';
import { Building2, X, Plus, Sparkles, MapPin, Layers, Coins, Ruler } from 'lucide-react';

interface CreateProjectModalProps {
  onClose: () => void;
  onProjectCreated?: (projectId: string) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ onClose, onProjectCreated }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState<ProjectType>('Residential');
  const [location, setLocation] = useState('');
  const [clientName, setClientName] = useState('');
  const [area, setArea] = useState<number | ''>('');
  const [numberOfFloors, setNumberOfFloors] = useState<number | ''>(2);
  const [currency, setCurrency] = useState<CurrencyCode>('SAR');
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('Metric');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const project = projectStore.createProject({
      name: name.trim(),
      type,
      location: location.trim() || 'Site Location',
      clientName: clientName.trim(),
      areaSqM: unitSystem === 'Metric' ? (Number(area) || 0) : undefined,
      areaSqFt: unitSystem === 'Imperial' ? (Number(area) || 0) : undefined,
      numberOfFloors: Number(numberOfFloors) || 1,
      currency,
      unitSystem,
      notes: notes.trim()
    });

    onClose();
    if (onProjectCreated) {
      onProjectCreated(project.id);
    } else {
      navigate(`/projects/${project.id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#0F2D5C] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#F4B400] text-[#0F2D5C] rounded-xl font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Create Construction Project</h3>
              <p className="text-xs text-blue-200 mt-0.5">Initialize a new project workspace for calculations & BOQ</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Project Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Villa Construction — Jeddah"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
            />
          </div>

          {/* Type & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Project Type
              </label>
              <select
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
              >
                <option value="Residential">Residential (Villa, Apartments)</option>
                <option value="Commercial">Commercial (Plaza, Office, Retail)</option>
                <option value="Industrial">Industrial (Warehouse, Factory)</option>
                <option value="Infrastructure">Infrastructure (Roads, Bridges)</option>
                <option value="Other">Other Construction</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Site Location / City
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Jeddah, Saudi Arabia"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>
          </div>

          {/* Client Name & Built-up Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Client / Developer Name
              </label>
              <input
                type="text"
                placeholder="e.g. Al-Amoudi Properties"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Built-Up Area ({unitSystem === 'Metric' ? 'm²' : 'Sq Ft'})
              </label>
              <input
                type="number"
                placeholder={unitSystem === 'Metric' ? '450' : '4800'}
                value={area}
                onChange={(e) => setArea(e.target.value ? parseFloat(e.target.value) : '')}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
              />
            </div>
          </div>

          {/* Number of Floors & Currency & Unit System */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Number of Floors
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={numberOfFloors}
                onChange={(e) => setNumberOfFloors(e.target.value ? parseInt(e.target.value) : '')}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e: any) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
              >
                <option value="SAR">SAR (Saudi Riyal)</option>
                <option value="AED">AED (UAE Dirham)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="PKR">PKR (Pakistani Rupee)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
                <option value="QAR">QAR (Qatari Riyal)</option>
                <option value="KWD">KWD (Kuwaiti Dinar)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Unit System
              </label>
              <select
                value={unitSystem}
                onChange={(e: any) => setUnitSystem(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
              >
                <option value="Metric">Metric (m, m³, kg, Ton)</option>
                <option value="Imperial">Imperial (ft, CFT, lbs)</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Optional Notes & Specifications
            </label>
            <textarea
              rows={2}
              placeholder="e.g. 2-story residential villa with RCC frame structure and external blockwork"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectStore } from '../services/projectStore';
import { Project, SavedCalculation, CalculatorId, CategoryId, MaterialQuantityRollup } from '../types';
import { FolderPlus, CheckCircle2, Building2, Plus, ArrowRight, X, Layers, Sparkles, Box, Check } from 'lucide-react';

export interface AddToProjectData {
  calculatorId: CalculatorId;
  calculatorTitle: string;
  category: CategoryId;
  defaultName?: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
  primaryQuantity: number;
  primaryUnit: string;
  materialsRollup?: Partial<MaterialQuantityRollup>;
  notes?: string;
}

interface AddToProjectModalProps {
  data: AddToProjectData;
  onClose: () => void;
}

export const AddToProjectModal: React.FC<AddToProjectModalProps> = ({ data, onClose }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [calculationName, setCalculationName] = useState<string>(
    data.defaultName || `${data.calculatorTitle} (${data.primaryQuantity} ${data.primaryUnit})`
  );
  const [autoAddToBOQ, setAutoAddToBOQ] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');
  const [isCreatingNewProject, setIsCreatingNewProject] = useState<boolean>(false);
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [newProjectLocation, setNewProjectLocation] = useState<string>('');
  const [newProjectType, setNewProjectType] = useState<'Residential' | 'Commercial' | 'Industrial' | 'Infrastructure' | 'Other'>('Residential');
  const [newProjectCurrency, setNewProjectCurrency] = useState<'SAR' | 'AED' | 'USD' | 'EUR' | 'PKR'>('SAR');

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [savedProjectId, setSavedProjectId] = useState<string>('');
  const [savedProjectName, setSavedProjectName] = useState<string>('');

  useEffect(() => {
    const list = projectStore.getProjects();
    setProjects(list);
    const activeId = projectStore.getActiveProjectId();
    if (activeId && list.some(p => p.id === activeId)) {
      setSelectedProjectId(activeId);
    } else if (list.length > 0) {
      setSelectedProjectId(list[0].id);
    } else {
      setIsCreatingNewProject(true);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    let targetProjectId = selectedProjectId;
    let targetProjectName = '';

    if (isCreatingNewProject) {
      if (!newProjectName.trim()) return;
      const created = projectStore.createProject({
        name: newProjectName.trim(),
        location: newProjectLocation.trim() || 'Site Location',
        type: newProjectType,
        currency: newProjectCurrency
      });
      targetProjectId = created.id;
      targetProjectName = created.name;
    } else {
      const proj = projects.find(p => p.id === selectedProjectId);
      if (!proj) return;
      targetProjectName = proj.name;
    }

    const saved = projectStore.addCalculationToProject(targetProjectId, {
      calculatorId: data.calculatorId,
      calculatorTitle: data.calculatorTitle,
      name: calculationName.trim() || `${data.calculatorTitle} Estimate`,
      category: data.category,
      inputs: data.inputs,
      results: data.results,
      primaryQuantity: data.primaryQuantity,
      primaryUnit: data.primaryUnit,
      materialsRollup: data.materialsRollup,
      notes: notes.trim(),
      autoAddToBOQ
    });

    if (saved) {
      setSavedProjectId(targetProjectId);
      setSavedProjectName(targetProjectName);
      setSavedSuccess(true);
    }
  };

  const handleViewProject = () => {
    onClose();
    navigate(`/projects/${savedProjectId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-[#0F2D5C] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#F4B400] text-[#0F2D5C] rounded-xl font-bold">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Save Calculation to Project</h3>
              <p className="text-xs text-blue-200 mt-0.5">Integrate this estimate into your project BOQ & schedule</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {savedSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Saved Successfully
              </span>
              <h4 className="text-xl font-black text-slate-900 mt-2">
                Calculation Added to {savedProjectName}
              </h4>
              <p className="text-sm text-slate-600 mt-1 max-w-sm mx-auto">
                Your measurement & material quantities have been recorded and synced with the project BOQ.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 space-y-1.5 text-left">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Calculation Name:</span>
                <strong className="text-slate-900">{calculationName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Primary Quantity:</span>
                <strong className="text-[#0F2D5C]">{data.primaryQuantity} {data.primaryUnit}</strong>
              </div>
              {autoAddToBOQ && (
                <div className="flex justify-between text-emerald-700 font-semibold pt-1 border-t border-slate-200">
                  <span>BOQ Status:</span>
                  <span>✓ Added as Line Item</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-bold transition-colors"
              >
                Keep Calculating
              </button>
              <button
                type="button"
                onClick={handleViewProject}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Open Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-4">
            
            {/* Calculation Snapshot Summary */}
            <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F2D5C]">
                  {data.calculatorTitle}
                </span>
                <div className="text-base font-black text-slate-900">
                  {data.primaryQuantity} <span className="text-xs font-bold text-slate-600">{data.primaryUnit}</span>
                </div>
              </div>
              <div className="text-right text-xs text-slate-500 font-medium">
                Trade: <strong className="text-slate-800 capitalize">{data.category}</strong>
              </div>
            </div>

            {/* Target Project Selection */}
            {!isCreatingNewProject ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Select Target Project
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCreatingNewProject(true)}
                    className="text-xs font-bold text-[#0F2D5C] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Project</span>
                  </button>
                </div>

                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
                >
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.id}>
                      {proj.name} — {proj.location} ({proj.type})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F2D5C] flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    Create New Project
                  </span>
                  {projects.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setIsCreatingNewProject(false)}
                      className="text-xs text-slate-500 hover:text-slate-800 underline"
                    >
                      Choose Existing
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="e.g. Villa Al-Nakheel Construction"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Location (e.g. Jeddah, SA)"
                    value={newProjectLocation}
                    onChange={(e) => setNewProjectLocation(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  />
                  <select
                    value={newProjectType}
                    onChange={(e: any) => setNewProjectType(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>
              </div>
            )}

            {/* Calculation Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Calculation Label / Stage Name
              </label>
              <input
                type="text"
                value={calculationName}
                onChange={(e) => setCalculationName(e.target.value)}
                placeholder="e.g. Ground Floor Slab Concrete"
                required
                className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
              />
            </div>

            {/* Auto Add to BOQ Checkbox */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-blue-50/50 transition-colors">
              <input
                type="checkbox"
                checked={autoAddToBOQ}
                onChange={(e) => setAutoAddToBOQ(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#0F2D5C] focus:ring-[#0F2D5C]"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">Add to Project BOQ as Line Item</span>
                <span className="text-slate-500 text-[11px]">
                  Automatically generates a bill of quantities line item with current unit rates.
                </span>
              </div>
            </label>

            {/* Optional Notes */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500">
                Optional Site Notes / Specifications
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Ready mix concrete with 28-day target strength 30 MPa"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700"
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Save to Project</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

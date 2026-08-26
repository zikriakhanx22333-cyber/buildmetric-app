import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectStore, subscribeToStore } from '../../services/projectStore';
import { Project, BOQItem, BOQSection } from '../../types';
import { SEO } from '../SEO';
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  Download,
  Printer,
  Building2,
  Layers,
  Coins,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';

export const BOQBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  useEffect(() => {
    const list = projectStore.getProjects();
    setProjects(list);
    const active = projectStore.getActiveProjectId();
    if (active && list.some(p => p.id === active)) {
      setSelectedProjectId(active);
    } else if (list.length > 0) {
      setSelectedProjectId(list[0].id);
    }

    const unsubscribe = subscribeToStore(() => {
      const updated = projectStore.getProjects();
      setProjects(updated);
    });
    return () => unsubscribe();
  }, []);

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleItemChange = (sectionId: string, itemId: string, field: keyof BOQItem, val: any) => {
    if (!currentProject) return;

    const updatedSections = currentProject.boq.sections.map((sec) => {
      if (sec.id === sectionId) {
        const updatedItems = sec.items.map((it) => {
          if (it.id === itemId) {
            const updated = { ...it, [field]: val };
            if (field === 'quantity' || field === 'rate') {
              updated.amount = Number(updated.quantity || 0) * Number(updated.rate || 0);
            }
            return updated;
          }
          return it;
        });
        return { ...sec, items: updatedItems };
      }
      return sec;
    });

    projectStore.updateProject(currentProject.id, {
      boq: { ...currentProject.boq, sections: updatedSections, lastUpdated: new Date().toISOString() }
    });
  };

  const handleAddItem = (sectionId: string) => {
    if (!currentProject) return;

    const updatedSections = currentProject.boq.sections.map((sec) => {
      if (sec.id === sectionId) {
        const newItem: BOQItem = {
          id: 'item-' + Date.now(),
          itemNo: `${sec.code}.${sec.items.length + 1}`,
          description: 'New Construction Specification Item',
          unit: 'm³',
          quantity: 10,
          rate: 180,
          amount: 1800
        };
        return { ...sec, items: [...sec.items, newItem] };
      }
      return sec;
    });

    projectStore.updateProject(currentProject.id, {
      boq: { ...currentProject.boq, sections: updatedSections, lastUpdated: new Date().toISOString() }
    });
  };

  const handleDeleteItem = (sectionId: string, itemId: string) => {
    if (!currentProject) return;

    const updatedSections = currentProject.boq.sections.map((sec) => {
      if (sec.id === sectionId) {
        return { ...sec, items: sec.items.filter((i) => i.id !== itemId) };
      }
      return sec;
    });

    projectStore.updateProject(currentProject.id, {
      boq: { ...currentProject.boq, sections: updatedSections, lastUpdated: new Date().toISOString() }
    });
  };

  const handleAddSection = () => {
    if (!currentProject) return;

    const newCode = `${currentProject.boq.sections.length + 1}.0`;
    const newSection: BOQSection = {
      id: 'sec-' + Date.now(),
      code: newCode,
      title: 'NEW TRADE SECTION',
      items: [
        {
          id: 'item-' + Date.now(),
          itemNo: `${newCode}.1`,
          description: 'Work Item Description',
          unit: 'm²',
          quantity: 50,
          rate: 75,
          amount: 3750
        }
      ]
    };

    projectStore.updateProject(currentProject.id, {
      boq: {
        ...currentProject.boq,
        sections: [...currentProject.boq.sections, newSection],
        lastUpdated: new Date().toISOString()
      }
    });
  };

  const subtotal = currentProject?.boq.sections.reduce((acc, sec) => {
    return acc + sec.items.reduce((s, it) => s + Number(it.quantity || 0) * Number(it.rate || 0), 0);
  }, 0) || 0;

  const taxAmount = (subtotal * (currentProject?.boq.taxPercent || 15)) / 100;
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <SEO
        title="BOQ Builder & Estimator | BuildMetric"
        description="Create, edit, and export construction Bill of Quantities (BOQ) with customized trade sections, unit rates, and automated cost schedules."
        canonicalUrl="https://buildmetric-app.vercel.app/boq"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-50 px-3 py-1 rounded-full w-fit mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Bill of Quantities Schedule</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              BOQ Builder & Estimator
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Assemble trade sections, enter itemized unit rates, and generate formal construction tender schedules.
            </p>
          </div>

          {/* Project Switcher */}
          {projects.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Linked Construction Project
              </span>
              <select
                value={selectedProjectId}
                onChange={(e) => {
                  setSelectedProjectId(e.target.value);
                  projectStore.setActiveProjectId(e.target.value);
                }}
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C]"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.currency})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* BOQ Content Body */}
        {currentProject && (
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddSection}
                  className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Trade Section</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/projects/${currentProject.id}`)}
                  className="px-4 py-2 bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Open Full Project Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sections Container */}
            <div className="space-y-6">
              {currentProject.boq.sections.map((section) => (
                <div key={section.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  
                  <div className="bg-slate-100/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-[#0F2D5C] text-[#F4B400] px-2 py-0.5 rounded">
                        {section.code}
                      </span>
                      <span className="font-bold text-sm text-slate-900 uppercase">
                        {section.title}
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3 w-16">Item</th>
                          <th className="py-2.5 px-3 min-w-[240px]">Specification / Description</th>
                          <th className="py-2.5 px-3 w-28">Qty</th>
                          <th className="py-2.5 px-3 w-20">Unit</th>
                          <th className="py-2.5 px-3 w-32">Rate ({currentProject.currency})</th>
                          <th className="py-2.5 px-3 w-36 text-right">Amount ({currentProject.currency})</th>
                          <th className="py-2.5 px-3 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {section.items.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/70">
                            <td className="py-2.5 px-3 font-mono text-slate-500 font-semibold">{item.itemNo}</td>
                            <td className="py-2.5 px-3">
                              <input
                                type="text"
                                value={item.description}
                                onChange={(e) => handleItemChange(section.id, item.id, 'description', e.target.value)}
                                className="w-full p-1.5 bg-transparent focus:bg-white border border-transparent focus:border-[#0F2D5C] rounded font-medium text-slate-900"
                              />
                            </td>
                            <td className="py-2.5 px-3">
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(section.id, item.id, 'quantity', parseFloat(e.target.value) || 0)}
                                className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded font-bold text-slate-900 text-right"
                              />
                            </td>
                            <td className="py-2.5 px-3">
                              <input
                                type="text"
                                value={item.unit}
                                onChange={(e) => handleItemChange(section.id, item.id, 'unit', e.target.value)}
                                className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded text-center font-semibold"
                              />
                            </td>
                            <td className="py-2.5 px-3">
                              <input
                                type="number"
                                value={item.rate}
                                onChange={(e) => handleItemChange(section.id, item.id, 'rate', parseFloat(e.target.value) || 0)}
                                className="w-full p-1.5 bg-slate-50 border border-slate-200 rounded font-bold text-slate-900 text-right"
                              />
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono font-black text-slate-900">
                              {(item.quantity * item.rate).toLocaleString()}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <button
                                onClick={() => handleDeleteItem(section.id, item.id)}
                                className="p-1 text-slate-300 hover:text-red-600 rounded"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-2.5 bg-slate-50 border-t border-slate-100">
                    <button
                      onClick={() => handleAddItem(section.id)}
                      className="text-xs font-bold text-[#0F2D5C] hover:underline flex items-center gap-1 px-2 py-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Line Item</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md ml-auto space-y-3 shadow-sm">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>Subtotal Amount:</span>
                <span className="font-mono text-slate-900 font-bold">{currentProject.currency} {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>VAT ({currentProject.boq.taxPercent}%):</span>
                <span className="font-mono text-slate-900">{currentProject.currency} {taxAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-black text-[#0F2D5C]">
                <span>GRAND TOTAL:</span>
                <span className="text-xl font-mono text-[#0F2D5C]">{currentProject.currency} {grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

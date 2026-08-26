import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectStore, subscribeToStore } from '../../services/projectStore';
import { Project, SavedCalculation, BOQItem, BOQSection, CurrencyCode, MaterialQuantityRollup } from '../../types';
import { CALCULATORS } from '../../data/calculators';
import { getSlugFromId } from '../../utils/slugs';
import { SEO } from '../SEO';
import {
  Building2,
  MapPin,
  Calendar,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Printer,
  FileSpreadsheet,
  Download,
  Share2,
  ArrowLeft,
  Calculator,
  Layers,
  Box,
  Coins,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Percent,
  Sliders,
  DollarSign,
  FileText,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const ProjectDetailView: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'calculations' | 'boq' | 'materials' | 'costs' | 'documents'>('overview');
  const [showAddCalcModal, setShowAddCalcModal] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Load project & subscribe to updates
  useEffect(() => {
    if (!projectId) return;
    const p = projectStore.getProject(projectId);
    setProject(p);

    const unsubscribe = subscribeToStore(() => {
      const updated = projectStore.getProject(projectId);
      setProject(updated);
    });
    return () => unsubscribe();
  }, [projectId]);

  // Aggregate Material Rollup from all calculations
  const aggregatedMaterials = useMemo(() => {
    if (!project) return null;
    const rollup: MaterialQuantityRollup = {
      cementBags: 0,
      steelKg: 0,
      steelTons: 0,
      concreteCum: 0,
      concreteCft: 0,
      sandCum: 0,
      sandCft: 0,
      sandTons: 0,
      aggregateCum: 0,
      aggregateCft: 0,
      aggregateTons: 0,
      bricksCount: 0,
      blocksCount: 0,
      tilesSqM: 0,
      paintLiters: 0
    };

    project.calculations.forEach((calc) => {
      const res = calc.results || {};
      const mat = calc.materialsRollup || {};

      if (mat.cementBags || res.cementBags) rollup.cementBags += Number(mat.cementBags || res.cementBags || 0);
      if (mat.steelTons || res.totalWeightTons) rollup.steelTons += Number(mat.steelTons || res.totalWeightTons || 0);
      if (mat.steelKg || res.totalWeightKg) rollup.steelKg += Number(mat.steelKg || res.totalWeightKg || 0);
      if (mat.concreteCum || res.wetVolumeCum) rollup.concreteCum += Number(mat.concreteCum || res.wetVolumeCum || 0);
      if (mat.concreteCft || res.wetVolumeCft) rollup.concreteCft += Number(mat.concreteCft || res.wetVolumeCft || 0);
      if (mat.sandCum || res.sandCum) rollup.sandCum += Number(mat.sandCum || res.sandCum || 0);
      if (mat.sandCft || res.sandCft) rollup.sandCft += Number(mat.sandCft || res.sandCft || 0);
      if (mat.aggregateCum || res.aggregateCum) rollup.aggregateCum += Number(mat.aggregateCum || res.aggregateCum || 0);
      if (mat.aggregateCft || res.aggregateCft) rollup.aggregateCft += Number(mat.aggregateCft || res.aggregateCft || 0);
      if (mat.bricksCount || res.totalBricksRequired) rollup.bricksCount += Number(mat.bricksCount || res.totalBricksRequired || 0);
      if (mat.blocksCount || res.totalBlocksRequired) rollup.blocksCount += Number(mat.blocksCount || res.totalBlocksRequired || 0);
      if (mat.tilesSqM || res.roomAreaSqM) rollup.tilesSqM += Number(mat.tilesSqM || res.roomAreaSqM || 0);
      if (mat.paintLiters || res.paintRequiredLiters) rollup.paintLiters += Number(mat.paintLiters || res.paintRequiredLiters || 0);
    });

    return rollup;
  }, [project]);

  // Financial Rollups from BOQ
  const boqFinancials = useMemo(() => {
    if (!project || !project.boq) {
      return { subtotal: 0, taxAmount: 0, contingencyAmount: 0, grandTotal: 0, itemsCount: 0 };
    }
    let subtotal = 0;
    let itemsCount = 0;

    project.boq.sections.forEach((sec) => {
      sec.items.forEach((it) => {
        subtotal += Number(it.quantity || 0) * Number(it.rate || 0);
        itemsCount++;
      });
    });

    const taxPercent = project.boq.taxPercent ?? 15;
    const contingencyPercent = project.boq.contingencyPercent ?? 5;
    const taxAmount = (subtotal * taxPercent) / 100;
    const contingencyAmount = (subtotal * contingencyPercent) / 100;
    const grandTotal = subtotal + taxAmount + contingencyAmount;

    return { subtotal, taxAmount, contingencyAmount, grandTotal, itemsCount, taxPercent, contingencyPercent };
  }, [project]);

  if (!project) {
    return (
      <div className="py-20 max-w-4xl mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Project Not Found</h2>
        <p className="text-slate-500 text-sm">The requested construction project could not be located in workspace.</p>
        <button
          onClick={() => navigate('/projects')}
          className="px-5 py-2.5 bg-[#0F2D5C] text-[#F4B400] rounded-xl font-bold text-xs"
        >
          Return to Projects
        </button>
      </div>
    );
  }

  // BOQ Handlers
  const handleBOQItemChange = (sectionId: string, itemId: string, field: keyof BOQItem, val: any) => {
    const updatedSections = project.boq.sections.map((sec) => {
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

    projectStore.updateProject(project.id, {
      boq: { ...project.boq, sections: updatedSections, lastUpdated: new Date().toISOString() }
    });
  };

  const handleAddBOQItem = (sectionId: string) => {
    const updatedSections = project.boq.sections.map((sec) => {
      if (sec.id === sectionId) {
        const newItem: BOQItem = {
          id: 'item-' + Date.now(),
          itemNo: `${sec.code}.${sec.items.length + 1}`,
          description: 'New Construction Work Item',
          unit: 'm³',
          quantity: 10,
          rate: 150,
          amount: 1500
        };
        return { ...sec, items: [...sec.items, newItem] };
      }
      return sec;
    });

    projectStore.updateProject(project.id, {
      boq: { ...project.boq, sections: updatedSections, lastUpdated: new Date().toISOString() }
    });
  };

  const handleDeleteBOQItem = (sectionId: string, itemId: string) => {
    const updatedSections = project.boq.sections.map((sec) => {
      if (sec.id === sectionId) {
        return { ...sec, items: sec.items.filter((i) => i.id !== itemId) };
      }
      return sec;
    });

    projectStore.updateProject(project.id, {
      boq: { ...project.boq, sections: updatedSections, lastUpdated: new Date().toISOString() }
    });
  };

  const handleAddBOQSection = () => {
    const newSectionCode = `${project.boq.sections.length + 1}.0`;
    const newSection: BOQSection = {
      id: 'sec-' + Date.now(),
      code: newSectionCode,
      title: 'NEW WORK DISCIPLINE',
      items: [
        {
          id: 'item-' + Date.now(),
          itemNo: `${newSectionCode}.1`,
          description: 'Specification & Trade Work Item',
          unit: 'm²',
          quantity: 100,
          rate: 85,
          amount: 8500
        }
      ]
    };

    projectStore.updateProject(project.id, {
      boq: {
        ...project.boq,
        sections: [...project.boq.sections, newSection],
        lastUpdated: new Date().toISOString()
      }
    });
  };

  const handleDeleteCalculation = (calcId: string) => {
    if (window.confirm('Delete this calculation from the project?')) {
      projectStore.removeCalculation(project.id, calcId);
    }
  };

  const handleAddCalcToBOQ = (calc: SavedCalculation) => {
    const targetSection = project.boq.sections[0] || {
      id: 'sec-1',
      code: '1.0',
      title: 'ESTIMATED WORKS',
      items: []
    };

    const rate = projectStore.getSuggestedRate(calc.category, calc.primaryUnit);
    const boqItem: BOQItem = {
      id: 'boq-item-' + Date.now(),
      itemNo: `${targetSection.code}.${targetSection.items.length + 1}`,
      description: `${calc.name} (${calc.calculatorTitle})`,
      unit: calc.primaryUnit,
      quantity: calc.primaryQuantity,
      rate,
      amount: calc.primaryQuantity * rate
    };

    const updatedSections = project.boq.sections.map((sec, idx) => {
      if (idx === 0) {
        return { ...sec, items: [...sec.items, boqItem] };
      }
      return sec;
    });

    projectStore.updateProject(project.id, {
      boq: { ...project.boq, sections: updatedSections, lastUpdated: new Date().toISOString() }
    });

    alert(`Added "${calc.name}" to BOQ with suggested rate ${project.currency} ${rate}/${calc.primaryUnit}`);
  };

  const handleExportCSV = () => {
    let csv = `Item No,Description,Quantity,Unit,Rate (${project.currency}),Amount (${project.currency})\n`;
    project.boq.sections.forEach((sec) => {
      csv += `"${sec.code} - ${sec.title}",,,,,\n`;
      sec.items.forEach((it) => {
        csv += `"${it.itemNo}","${it.description.replace(/"/g, '""')}",${it.quantity},"${it.unit}",${it.rate},${it.amount}\n`;
      });
    });
    csv += `\n,,,Subtotal,,${boqFinancials.subtotal}\n`;
    csv += `,,,VAT (${boqFinancials.taxPercent}%),,${boqFinancials.taxAmount}\n`;
    csv += `,,,Contingency (${boqFinancials.contingencyPercent}%),,${boqFinancials.contingencyAmount}\n`;
    csv += `,,,GRAND TOTAL,,${boqFinancials.grandTotal}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${project.name.replace(/\s+/g, '_')}_BOQ.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <SEO
        title={`${project.name} – Construction Project Workspace | BuildMetric`}
        description={`Estimation workspace for ${project.name} in ${project.location}. Review calculations, BOQ line items, material takeoffs and budget schedules.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#0F2D5C] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Workspace ID:</span>
            <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
              {project.id}
            </span>
          </div>
        </div>

        {/* Project Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-50 px-2.5 py-1 rounded-md">
                  {project.type}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {project.status}
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                  {project.unitSystem} Units
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {project.name}
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {project.location}
                </span>
                {project.clientName && (
                  <span>Client: <strong className="text-slate-700">{project.clientName}</strong></span>
                )}
                <span>Floors: <strong className="text-slate-700">{project.numberOfFloors}</strong></span>
                {project.areaSqM ? (
                  <span>Area: <strong className="text-slate-700">{project.areaSqM} m²</strong></span>
                ) : null}
              </div>
            </div>

            {/* Quick Header Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setShowAddCalcModal(true)}
                className="px-4 py-2.5 bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Calculation</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Print or Export PDF"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Export PDF</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Export Excel CSV"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>

          </div>

          {/* 4 Financial Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
            
            <div className="bg-gradient-to-br from-[#0F2D5C] to-[#163c78] rounded-xl p-4 text-white shadow-md">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                Total Project Estimate
              </span>
              <div className="text-2xl font-black text-[#F4B400] mt-1">
                {project.currency} {boqFinancials.grandTotal.toLocaleString()}
              </div>
              <div className="text-[11px] text-blue-200 mt-0.5">
                Includes VAT ({boqFinancials.taxPercent}%) & Contingency
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Materials Subtotal
              </span>
              <div className="text-xl font-black text-slate-900 mt-1">
                {project.currency} {(boqFinancials.subtotal * 0.65).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">~65% of base bill of quantities</div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Labour & Subcontract
              </span>
              <div className="text-xl font-black text-slate-900 mt-1">
                {project.currency} {(boqFinancials.subtotal * 0.25).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">~25% site workmanship</div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Equipment & Overhead
              </span>
              <div className="text-xl font-black text-slate-900 mt-1">
                {project.currency} {(boqFinancials.subtotal * 0.10).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">~10% machinery & logistics</div>
            </div>

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-4 rounded-t-2xl overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Building2 },
            { id: 'calculations', label: `Calculations (${project.calculations.length})`, icon: Calculator },
            { id: 'boq', label: `BOQ Schedule (${boqFinancials.itemsCount})`, icon: FileSpreadsheet },
            { id: 'materials', label: 'Materials Takeoff', icon: Box },
            { id: 'costs', label: 'Cost Composition', icon: Coins },
            { id: 'documents', label: 'Documents & Quote', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-[#0F2D5C] text-[#0F2D5C]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0F2D5C]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="bg-white rounded-b-2xl border border-t-0 border-slate-200 p-6 shadow-sm">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Material Summary Rollup Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-lg text-slate-900">Project Material Takeoff Summary</h3>
                    <p className="text-xs text-slate-500">
                      Aggregated quantities automatically extracted from all saved calculations in this project.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('materials')}
                    className="text-xs font-bold text-[#0F2D5C] hover:underline flex items-center gap-1"
                  >
                    <span>View Rate Cards</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Total Cement</span>
                    <div className="text-lg font-black text-[#0F2D5C] mt-0.5">
                      {aggregatedMaterials?.cementBags || 0} <span className="text-xs font-bold">Bags</span>
                    </div>
                  </div>

                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-3.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Total Steel</span>
                    <div className="text-lg font-black text-slate-900 mt-0.5">
                      {aggregatedMaterials?.steelTons ? aggregatedMaterials.steelTons.toFixed(1) : 0} <span className="text-xs font-bold">Ton</span>
                    </div>
                  </div>

                  <div className="bg-cyan-50/60 border border-cyan-100 rounded-xl p-3.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Concrete Volume</span>
                    <div className="text-lg font-black text-cyan-950 mt-0.5">
                      {aggregatedMaterials?.concreteCum ? aggregatedMaterials.concreteCum.toFixed(1) : 0} <span className="text-xs font-bold">m³</span>
                    </div>
                  </div>

                  <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Sand Quantity</span>
                    <div className="text-lg font-black text-amber-950 mt-0.5">
                      {aggregatedMaterials?.sandCum ? aggregatedMaterials.sandCum.toFixed(1) : 0} <span className="text-xs font-bold">m³</span>
                    </div>
                  </div>

                  <div className="bg-orange-50/60 border border-orange-100 rounded-xl p-3.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Masonry Blocks</span>
                    <div className="text-lg font-black text-orange-950 mt-0.5">
                      {aggregatedMaterials?.blocksCount || 0} <span className="text-xs font-bold">Pcs</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Tiles Coverage</span>
                    <div className="text-lg font-black text-emerald-950 mt-0.5">
                      {aggregatedMaterials?.tilesSqM ? aggregatedMaterials.tilesSqM.toFixed(0) : 0} <span className="text-xs font-bold">m²</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Calculations Grid */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-lg text-slate-900">Saved Engineering Calculations</h3>
                  <button
                    onClick={() => setActiveTab('calculations')}
                    className="text-xs font-bold text-[#0F2D5C] hover:underline flex items-center gap-1"
                  >
                    <span>View All ({project.calculations.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {project.calculations.length === 0 ? (
                  <div className="bg-slate-50 rounded-xl p-8 text-center space-y-3 border border-slate-200">
                    <Calculator className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-sm text-slate-600">No calculations added to this project yet.</p>
                    <button
                      onClick={() => setShowAddCalcModal(true)}
                      className="px-4 py-2 bg-[#0F2D5C] text-[#F4B400] rounded-xl text-xs font-bold"
                    >
                      + Add Calculation
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.calculations.slice(0, 4).map((calc) => (
                      <div
                        key={calc.id}
                        className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-between gap-3 hover:border-slate-300 transition-colors"
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-100 px-2 py-0.5 rounded">
                            {calc.category}
                          </span>
                          <h4 className="font-bold text-sm text-slate-900 mt-1">{calc.name}</h4>
                          <div className="text-xs text-slate-500 mt-0.5">
                            Quantity: <strong className="text-slate-800">{calc.primaryQuantity} {calc.primaryUnit}</strong>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => navigate(`/calculators/${getSlugFromId(calc.calculatorId)}`)}
                            className="p-2 bg-white rounded-lg border border-slate-200 hover:text-[#0F2D5C] text-xs font-bold"
                            title="Recalculate in tool"
                          >
                            Open Tool
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* 2. CALCULATIONS TAB */}
          {activeTab === 'calculations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-xl text-slate-900">Project Calculations</h3>
                  <p className="text-xs text-slate-500">
                    Saved measurement snapshots linked with this project.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddCalcModal(true)}
                  className="px-4 py-2 bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Calculation</span>
                </button>
              </div>

              {project.calculations.length === 0 ? (
                <div className="bg-slate-50 rounded-2xl p-12 text-center space-y-3 border border-slate-200">
                  <Calculator className="w-10 h-10 text-slate-400 mx-auto" />
                  <h4 className="font-bold text-base text-slate-800">No Saved Calculations</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Open any calculator and click "+ Add to Project" to store engineering quantities directly into this workspace.
                  </p>
                  <button
                    onClick={() => setShowAddCalcModal(true)}
                    className="px-5 py-2.5 bg-[#0F2D5C] text-[#F4B400] font-bold text-xs rounded-xl"
                  >
                    Browse Calculators
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {project.calculations.map((calc) => (
                    <div
                      key={calc.id}
                      className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors shadow-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-50 px-2 py-0.5 rounded">
                            {calc.category}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(calc.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-slate-900">{calc.name}</h4>
                        <div className="text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                          <span>Tool: <strong>{calc.calculatorTitle}</strong></span>
                          <span>Output: <strong className="text-[#0F2D5C]">{calc.primaryQuantity} {calc.primaryUnit}</strong></span>
                          {calc.notes && <span>Note: <em>{calc.notes}</em></span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleAddCalcToBOQ(calc)}
                          className="px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0F2D5C] text-xs font-bold transition-colors"
                          title="Add as BOQ item"
                        >
                          + Add to BOQ
                        </button>
                        <button
                          onClick={() => navigate(`/calculators/${getSlugFromId(calc.calculatorId)}`)}
                          className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                        >
                          Recalculate
                        </button>
                        <button
                          onClick={() => handleDeleteCalculation(calc.id)}
                          className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. BOQ TAB */}
          {activeTab === 'boq' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-black text-xl text-slate-900">Bill of Quantities (BOQ) Editor</h3>
                  <p className="text-xs text-slate-500">
                    Live editable schedule of quantities, unit rates, and automated cost computations.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddBOQSection}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Section</span>
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="px-3.5 py-2 bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CSV</span>
                  </button>
                </div>
              </div>

              {/* BOQ Sections and Items */}
              <div className="space-y-6">
                {project.boq.sections.map((section) => {
                  const sectionSubtotal = section.items.reduce(
                    (acc, it) => acc + Number(it.quantity || 0) * Number(it.rate || 0),
                    0
                  );

                  return (
                    <div key={section.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                      
                      {/* Section Title Header */}
                      <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs bg-[#0F2D5C] text-white px-2 py-0.5 rounded">
                            {section.code}
                          </span>
                          <span className="font-bold text-sm text-slate-800 uppercase tracking-wide">
                            {section.title}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-600">
                          Section Total: <strong className="text-[#0F2D5C]">{project.currency} {sectionSubtotal.toLocaleString()}</strong>
                        </div>
                      </div>

                      {/* Desktop Table View */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                            <tr>
                              <th className="py-2.5 px-3 w-16">Item</th>
                              <th className="py-2.5 px-3 min-w-[200px]">Description</th>
                              <th className="py-2.5 px-3 w-24">Qty</th>
                              <th className="py-2.5 px-3 w-20">Unit</th>
                              <th className="py-2.5 px-3 w-28">Rate ({project.currency})</th>
                              <th className="py-2.5 px-3 w-32 text-right">Amount ({project.currency})</th>
                              <th className="py-2.5 px-3 w-10"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {section.items.map((item) => (
                              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-2.5 px-3 font-mono font-semibold text-slate-500">
                                  {item.itemNo}
                                </td>
                                <td className="py-2.5 px-3">
                                  <input
                                    type="text"
                                    value={item.description}
                                    onChange={(e) =>
                                      handleBOQItemChange(section.id, item.id, 'description', e.target.value)
                                    }
                                    className="w-full p-1.5 bg-transparent hover:bg-white focus:bg-white border border-transparent hover:border-slate-200 focus:border-[#0F2D5C] rounded font-medium text-slate-900"
                                  />
                                </td>
                                <td className="py-2.5 px-3">
                                  <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleBOQItemChange(
                                        section.id,
                                        item.id,
                                        'quantity',
                                        parseFloat(e.target.value) || 0
                                      )
                                    }
                                    className="w-full p-1.5 bg-slate-50 border border-slate-200 focus:border-[#0F2D5C] rounded font-bold text-slate-900 text-right"
                                  />
                                </td>
                                <td className="py-2.5 px-3">
                                  <input
                                    type="text"
                                    value={item.unit}
                                    onChange={(e) =>
                                      handleBOQItemChange(section.id, item.id, 'unit', e.target.value)
                                    }
                                    className="w-full p-1.5 bg-slate-50 border border-slate-200 focus:border-[#0F2D5C] rounded text-slate-700 font-semibold text-center"
                                  />
                                </td>
                                <td className="py-2.5 px-3">
                                  <input
                                    type="number"
                                    value={item.rate}
                                    onChange={(e) =>
                                      handleBOQItemChange(
                                        section.id,
                                        item.id,
                                        'rate',
                                        parseFloat(e.target.value) || 0
                                      )
                                    }
                                    className="w-full p-1.5 bg-slate-50 border border-slate-200 focus:border-[#0F2D5C] rounded font-bold text-slate-900 text-right"
                                  />
                                </td>
                                <td className="py-2.5 px-3 text-right font-mono font-black text-slate-900">
                                  {(item.quantity * item.rate).toLocaleString()}
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  <button
                                    onClick={() => handleDeleteBOQItem(section.id, item.id)}
                                    className="p-1 text-slate-300 hover:text-red-600 rounded"
                                    title="Delete line item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Section Add Item Button */}
                      <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex justify-start">
                        <button
                          onClick={() => handleAddBOQItem(section.id)}
                          className="text-xs font-bold text-[#0F2D5C] hover:underline flex items-center gap-1 px-2 py-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Item to {section.code}</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* BOQ Financial Summary Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-md ml-auto space-y-3">
                <div className="flex justify-between text-xs text-slate-600 font-semibold">
                  <span>Subtotal Amount:</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {project.currency} {boqFinancials.subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-slate-600 font-semibold items-center">
                  <span>VAT ({boqFinancials.taxPercent}%):</span>
                  <span className="font-mono text-slate-900">
                    {project.currency} {boqFinancials.taxAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-slate-600 font-semibold items-center">
                  <span>Site Contingency ({boqFinancials.contingencyPercent}%):</span>
                  <span className="font-mono text-slate-900">
                    {project.currency} {boqFinancials.contingencyAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-sm font-black text-[#0F2D5C]">
                  <span>GRAND TOTAL ESTIMATE:</span>
                  <span className="text-lg font-mono text-[#0F2D5C]">
                    {project.currency} {boqFinancials.grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* 4. MATERIALS TAB */}
          {activeTab === 'materials' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-black text-xl text-slate-900">Material Requirements & Rate Schedule</h3>
                <p className="text-xs text-slate-500">
                  Consolidated material inventory calculated across structural and architectural stages.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Portland Cement (50kg Bags)', qty: aggregatedMaterials?.cementBags || 0, unit: 'Bags', avgRate: 24, cat: 'Cement' },
                  { name: 'Deformed Steel Rebar (Fe500)', qty: (aggregatedMaterials?.steelTons || 0).toFixed(2), unit: 'Tons', avgRate: 2600, cat: 'Steel' },
                  { name: 'Ready-Mix / Cast Concrete', qty: (aggregatedMaterials?.concreteCum || 0).toFixed(1), unit: 'm³', avgRate: 280, cat: 'Concrete' },
                  { name: 'Washed Coarse Sand', qty: (aggregatedMaterials?.sandCum || 0).toFixed(1), unit: 'm³', avgRate: 45, cat: 'Sand' },
                  { name: 'Coarse Aggregate (20mm)', qty: (aggregatedMaterials?.aggregateCum || 0).toFixed(1), unit: 'm³', avgRate: 55, cat: 'Aggregate' },
                  { name: 'Concrete CMU Blocks', qty: aggregatedMaterials?.blocksCount || 0, unit: 'Pcs', avgRate: 4.5, cat: 'Masonry' },
                  { name: 'Floor & Wall Tiles', qty: (aggregatedMaterials?.tilesSqM || 0).toFixed(0), unit: 'm²', avgRate: 75, cat: 'Finishing' },
                  { name: 'Paint & Surface Primer', qty: (aggregatedMaterials?.paintLiters || 0).toFixed(0), unit: 'Liters', avgRate: 18, cat: 'Finishing' }
                ].map((mat, i) => {
                  const estCost = Number(mat.qty) * mat.avgRate;
                  return (
                    <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-slate-400">{mat.cat}</span>
                        <span className="text-xs font-semibold text-slate-500">@{project.currency} {mat.avgRate}/{mat.unit}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{mat.name}</h4>
                      <div className="flex items-baseline justify-between pt-1 border-t border-slate-200/60">
                        <span className="text-base font-black text-[#0F2D5C]">{mat.qty} <span className="text-xs font-bold text-slate-500">{mat.unit}</span></span>
                        <span className="text-xs font-mono font-bold text-slate-700">~{project.currency} {estCost.toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. COSTS TAB */}
          {activeTab === 'costs' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-black text-xl text-slate-900">Cost Breakdown & Distribution</h3>
                <p className="text-xs text-slate-500">
                  Engineering trade allocation and cost composition for contractor bidding and budget oversight.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                  <h4 className="font-bold text-base text-slate-900">Cost Component Breakdown</h4>
                  
                  {[
                    { label: 'Materials & Procurement', percent: 65, color: 'bg-[#0F2D5C]', amount: boqFinancials.subtotal * 0.65 },
                    { label: 'Site Labour & Subcontractors', percent: 25, color: 'bg-[#F4B400]', amount: boqFinancials.subtotal * 0.25 },
                    { label: 'Equipment & Machinery Rental', percent: 6, color: 'bg-emerald-600', amount: boqFinancials.subtotal * 0.06 },
                    { label: 'Supervision & General Overhead', percent: 4, color: 'bg-cyan-600', amount: boqFinancials.subtotal * 0.04 }
                  ].map((c, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">{c.label} ({c.percent}%)</span>
                        <span className="text-slate-900 font-mono">{project.currency} {c.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${c.color}`} style={{ width: `${c.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                  <h4 className="font-bold text-base text-slate-900">Estimation Metrics & Unit Rates</h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">Estimated Built-Up Area:</span>
                      <strong className="text-slate-900">{project.areaSqM || 450} m² ({project.areaSqFt || 4844} sq ft)</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">Average Cost per Square Meter:</span>
                      <strong className="text-[#0F2D5C]">{project.currency} {((boqFinancials.grandTotal || 428500) / (project.areaSqM || 450)).toFixed(0)} / m²</strong>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-500 font-medium">Average Cost per Square Foot:</span>
                      <strong className="text-[#0F2D5C]">{project.currency} {((boqFinancials.grandTotal || 428500) / (project.areaSqFt || 4844)).toFixed(0)} / sq ft</strong>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-slate-500 font-medium">Applied Local VAT:</span>
                      <strong className="text-emerald-700">{boqFinancials.taxPercent}% Standard Rate</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. DOCUMENTS & EXPORT TAB */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-xl text-slate-900">Formal Estimate Document</h3>
                  <p className="text-xs text-slate-500">
                    Ready-to-print quotation and bill of quantities for client submission.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2.5 bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] rounded-xl font-bold text-xs flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save as PDF</span>
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Excel CSV</span>
                  </button>
                </div>
              </div>

              {/* Printable Document Preview Paper */}
              <div className="bg-white border-2 border-slate-300 rounded-2xl p-8 max-w-4xl mx-auto shadow-lg space-y-6 print:border-none print:shadow-none">
                
                {/* Header */}
                <div className="flex items-start justify-between border-b-2 border-slate-800 pb-4">
                  <div>
                    <div className="text-2xl font-black text-[#0F2D5C] tracking-tight">BUILDMETRIC</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Civil Engineering & Estimation Report</div>
                  </div>
                  <div className="text-right text-xs text-slate-600">
                    <div>Date: <strong>{new Date().toLocaleDateString()}</strong></div>
                    <div>Estimate Ref: <strong>BM-{project.id.slice(-6).toUpperCase()}</strong></div>
                  </div>
                </div>

                {/* Project Info Block */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Project Name</span>
                    <div className="font-bold text-sm text-slate-900">{project.name}</div>
                    <div className="text-slate-600 mt-0.5">{project.location}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Client / Organization</span>
                    <div className="font-bold text-sm text-slate-900">{project.clientName || 'Valued Client'}</div>
                    <div className="text-slate-600 mt-0.5">Project Type: {project.type}</div>
                  </div>
                </div>

                {/* Summary Table */}
                <table className="w-full text-xs text-left">
                  <thead className="border-b-2 border-slate-800 text-slate-800 uppercase font-bold text-[11px]">
                    <tr>
                      <th className="py-2">Item No</th>
                      <th className="py-2">Description</th>
                      <th className="py-2 text-right">Qty</th>
                      <th className="py-2 text-center">Unit</th>
                      <th className="py-2 text-right">Rate ({project.currency})</th>
                      <th className="py-2 text-right">Total ({project.currency})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {project.boq.sections.flatMap(s => s.items).slice(0, 10).map((it) => (
                      <tr key={it.id}>
                        <td className="py-2 font-mono">{it.itemNo}</td>
                        <td className="py-2 font-medium">{it.description}</td>
                        <td className="py-2 text-right font-bold">{it.quantity}</td>
                        <td className="py-2 text-center text-slate-500">{it.unit}</td>
                        <td className="py-2 text-right">{it.rate}</td>
                        <td className="py-2 text-right font-bold font-mono">{(it.quantity * it.rate).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Total Section */}
                <div className="border-t-2 border-slate-800 pt-4 flex justify-between items-center text-sm font-black">
                  <span>FINAL ESTIMATED COST:</span>
                  <span className="text-xl font-mono text-[#0F2D5C]">
                    {project.currency} {boqFinancials.grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                {/* Sign-off */}
                <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs text-slate-500">
                  <div>
                    <div className="border-b border-slate-400 w-48 mb-1"></div>
                    <div>Prepared by Estimator</div>
                  </div>
                  <div className="text-right">
                    <div className="border-b border-slate-400 w-48 ml-auto mb-1"></div>
                    <div>Client Approval / Signature</div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* Add Calculation Modal Picker */}
      {showAddCalcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-lg text-slate-900">Choose Calculator to Add</h3>
              <button
                onClick={() => setShowAddCalcModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Select any calculator tool to calculate measurements and save directly to <strong>{project.name}</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CALCULATORS.slice(0, 10).map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    projectStore.setActiveProjectId(project.id);
                    navigate(`/calculators/${getSlugFromId(c.id)}`);
                  }}
                  className="text-left p-3.5 rounded-xl border border-slate-200 hover:border-[#0F2D5C] hover:bg-blue-50/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <div className="font-bold text-sm text-slate-900 group-hover:text-[#0F2D5C]">
                      {c.title}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">{c.shortDescription}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0F2D5C]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectStore, subscribeToStore } from '../../services/projectStore';
import { Project, ProjectType } from '../../types';
import { CreateProjectModal } from './CreateProjectModal';
import { SEO } from '../SEO';
import {
  Building2,
  Plus,
  Search,
  MapPin,
  Calculator,
  Calendar,
  Layers,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
  FolderOpen,
  Trash2,
  Sparkles,
  Coins,
  CheckCircle2
} from 'lucide-react';

export const ProjectsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    setProjects(projectStore.getProjects());
    const unsubscribe = subscribeToStore(() => {
      setProjects(projectStore.getProjects());
    });
    return () => unsubscribe();
  }, []);

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (proj.clientName || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'all' || proj.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesType;
  });

  const totalPortfolioValue = projects.reduce((acc, p) => acc + (p.estimatedCost || 0), 0);
  const totalCalculationsCount = projects.reduce((acc, p) => acc + p.calculations.length, 0);

  const handleDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      projectStore.deleteProject(id);
    }
  };

  const handleOpenProject = (id: string) => {
    projectStore.setActiveProjectId(id);
    navigate(`/projects/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <SEO
        title="Construction Projects & Estimator Workspace | BuildMetric"
        description="Manage your construction projects, saved engineering calculations, bill of quantities (BOQ), and total cost estimates."
        canonicalUrl="https://buildmetric-app.vercel.app/projects"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-50 px-3 py-1 rounded-full w-fit mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Project Management Workspace</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Construction Projects
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Organize structural measurements, save calculations, generate BOQs, and estimate project costs.
            </p>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] font-bold text-sm shadow-md transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>New Project</span>
          </button>
        </div>

        {/* Workspace Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Projects</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{projects.length}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F2D5C] flex items-center justify-center">
              <FolderOpen className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Saved Calculations</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{totalCalculationsCount}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Estimated Portfolio Value</span>
              <div className="text-2xl font-black text-[#0F2D5C] mt-1">
                SAR {totalPortfolioValue.toLocaleString()}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search projects by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C] shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['all', 'Residential', 'Commercial', 'Industrial', 'Infrastructure'].map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  typeFilter === t
                    ? 'bg-[#0F2D5C] text-[#F4B400]'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {t === 'all' ? 'All Types' : t}
              </button>
            ))}
          </div>

        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-[#0F2D5C] rounded-2xl flex items-center justify-center mx-auto">
              <Building2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No Projects Found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              {searchQuery
                ? `No projects matched "${searchQuery}". Try changing your search keywords.`
                : 'Get started by creating your first construction project to save and combine calculations into a BOQ.'}
            </p>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2D5C] text-[#F4B400] font-bold text-xs shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenProject(project.id)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-[#0F2D5C] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-4">
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-50 px-2.5 py-1 rounded-md">
                      {project.type}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {project.status}
                      </span>
                      <button
                        onClick={(e) => handleDelete(e, project.id, project.name)}
                        className="p-1 text-slate-300 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Project Name & Location */}
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#0F2D5C] transition-colors line-clamp-1">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="line-clamp-1">{project.location}</span>
                    </div>
                  </div>

                  {/* Estimated Cost Metric */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Estimated Budget
                    </span>
                    <div className="text-xl font-black text-[#0F2D5C]">
                      {project.currency} {project.estimatedCost.toLocaleString()}
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calculator className="w-3.5 h-3.5 text-amber-500" />
                      <span><strong>{project.calculations.length}</strong> Calculations</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-blue-500" />
                      <span><strong>{project.boq.sections.reduce((acc, s) => acc + s.items.length, 0)}</strong> BOQ Items</span>
                    </div>
                  </div>

                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Updated {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="inline-flex items-center gap-1 text-xs font-bold text-[#0F2D5C] group-hover:translate-x-0.5 transition-transform">
                    <span>Open Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F4B400]" />
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Create Project Modal */}
      {createModalOpen && (
        <CreateProjectModal
          onClose={() => setCreateModalOpen(false)}
          onProjectCreated={(id) => handleOpenProject(id)}
        />
      )}

    </div>
  );
};

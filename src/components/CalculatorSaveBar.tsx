import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalculatorMeta, CalculatorId } from '../types';
import { AddToProjectModal, AddToProjectData } from './AddToProjectModal';
import { FolderPlus, Layers, ArrowRight, Sparkles, Building2, Check } from 'lucide-react';
import { projectStore } from '../services/projectStore';

interface CalculatorSaveBarProps {
  meta: CalculatorMeta;
}

export const CalculatorSaveBar: React.FC<CalculatorSaveBarProps> = ({ meta }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const activeProjectId = projectStore.getActiveProjectId();
  const activeProject = activeProjectId ? projectStore.getProject(activeProjectId) : null;

  const data: AddToProjectData = {
    calculatorId: meta.id,
    calculatorTitle: meta.title,
    category: meta.categoryId,
    defaultName: `${meta.title} Takeoff`,
    inputs: { tool: meta.title },
    results: { calculatedAt: new Date().toLocaleDateString() },
    primaryQuantity: 1,
    primaryUnit: 'Unit'
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#0F2D5C] to-[#163c78] text-white rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#F4B400] text-[#0F2D5C] rounded-xl font-bold shrink-0">
            <FolderPlus className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F4B400] bg-white/10 px-2 py-0.5 rounded">
                Workspace Feature
              </span>
              {activeProject && (
                <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active: {activeProject.name}
                </span>
              )}
            </div>
            <h4 className="font-bold text-sm sm:text-base text-white mt-0.5">
              Save this calculation into your construction project
            </h4>
            <p className="text-xs text-blue-200">
              Aggregate material quantities into project BOQ and export itemized quotes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F4B400] hover:bg-[#e0a500] text-[#0F2D5C] font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FolderPlus className="w-4 h-4" />
            <span>+ Add to Project</span>
          </button>

          <button
            onClick={() => {
              navigate('/projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hidden lg:inline-flex items-center gap-1 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/15 transition-colors cursor-pointer"
          >
            <span>Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {modalOpen && (
        <AddToProjectModal
          data={data}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { projectStore, subscribeToStore, DEFAULT_MATERIALS } from '../../services/projectStore';
import { MaterialItem, CurrencyCode } from '../../types';
import { SEO } from '../SEO';
import {
  Box,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Layers,
  Sparkles,
  DollarSign,
  Tag,
  Building,
  RotateCcw
} from 'lucide-react';

export const MaterialsDatabasePage: React.FC = () => {
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Material Form State
  const [newMatName, setNewMatName] = useState('');
  const [newMatCat, setNewMatCat] = useState<any>('Cement');
  const [newMatUnit, setNewMatUnit] = useState('Bag');
  const [newMatRate, setNewMatRate] = useState<number | ''>(25);
  const [newMatSupplier, setNewMatSupplier] = useState('');
  const [newMatSpec, setNewMatSpec] = useState('');

  useEffect(() => {
    setMaterials(projectStore.getMaterials());
    const unsubscribe = subscribeToStore(() => {
      setMaterials(projectStore.getMaterials());
    });
    return () => unsubscribe();
  }, []);

  const categories = ['all', 'Cement', 'Steel', 'Sand', 'Aggregate', 'Bricks', 'Blocks', 'Tiles', 'Paint'];

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.supplier || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.gradeOrSpec || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpdateRate = (id: string, newRate: number) => {
    projectStore.updateMaterial(id, { defaultRate: newRate });
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete "${name}" from your material database?`)) {
      projectStore.deleteMaterial(id);
    }
  };

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatName.trim()) return;

    projectStore.addMaterial({
      name: newMatName.trim(),
      category: newMatCat,
      unit: newMatUnit.trim(),
      defaultRate: Number(newMatRate) || 0,
      currency: 'SAR',
      supplier: newMatSupplier.trim(),
      gradeOrSpec: newMatSpec.trim()
    });

    setShowAddModal(false);
    setNewMatName('');
    setNewMatSupplier('');
    setNewMatSpec('');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <SEO
        title="Construction Materials & Unit Rates Database | BuildMetric"
        description="Comprehensive database of construction materials, unit market rates, density coefficients, and standard specifications for building estimation."
        canonicalUrl="https://buildmetric-app.vercel.app/materials"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-50 px-3 py-1 rounded-full w-fit mb-2">
              <Box className="w-3.5 h-3.5" />
              <span>Material Price Index</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Materials & Unit Rates
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Standard civil engineering materials catalog, current market rates, and density specifications.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-xl bg-[#0F2D5C] hover:bg-[#163c78] text-[#F4B400] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Material</span>
          </button>
        </div>

        {/* Search & Categories */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search materials, grades, suppliers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0F2D5C] shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F2D5C] text-[#F4B400]'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat === 'all' ? 'All Materials' : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Materials Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 min-w-[200px]">Material Name</th>
                  <th className="py-3.5 px-4 w-28">Category</th>
                  <th className="py-3.5 px-4 w-28">Unit</th>
                  <th className="py-3.5 px-4 w-36">Unit Rate (SAR)</th>
                  <th className="py-3.5 px-4 min-w-[180px]">Specification / Grade</th>
                  <th className="py-3.5 px-4 min-w-[160px]">Supplier / Quarry</th>
                  <th className="py-3.5 px-4 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMaterials.map((mat) => (
                  <tr key={mat.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {mat.name}
                      {mat.isCustom && (
                        <span className="ml-2 text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                          Custom
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F2D5C] bg-blue-50 px-2 py-0.5 rounded">
                        {mat.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-600">
                      {mat.unit}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400 font-semibold">{mat.currency}</span>
                        <input
                          type="number"
                          step="0.1"
                          value={mat.defaultRate}
                          onChange={(e) => handleUpdateRate(mat.id, parseFloat(e.target.value) || 0)}
                          className="w-24 px-2 py-1 bg-slate-50 border border-slate-200 rounded font-bold text-slate-900 focus:bg-white focus:border-[#0F2D5C]"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {mat.gradeOrSpec || '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {mat.supplier || '—'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {mat.isCustom && (
                        <button
                          onClick={() => handleDelete(mat.id, mat.name)}
                          className="p-1 text-slate-300 hover:text-red-600 rounded"
                          title="Delete material"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add Custom Material Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-lg text-slate-900">Add Custom Material Item</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMaterial} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Material Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Waterproofing Bitumen Membrane 4mm"
                  value={newMatName}
                  onChange={(e) => setNewMatName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newMatCat}
                    onChange={(e: any) => setNewMatCat(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold"
                  >
                    {categories.filter(c => c !== 'all').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Unit *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Roll, m², Bag, Ton"
                    value={newMatUnit}
                    onChange={(e) => setNewMatUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Unit Rate (SAR) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newMatRate}
                    onChange={(e) => setNewMatRate(e.target.value ? parseFloat(e.target.value) : '')}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Specification</label>
                  <input
                    type="text"
                    placeholder="e.g. ASTM D5147 SBS"
                    value={newMatSpec}
                    onChange={(e) => setNewMatSpec(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Supplier</label>
                <input
                  type="text"
                  placeholder="e.g. DermaBit / Awazel"
                  value={newMatSupplier}
                  onChange={(e) => setNewMatSupplier(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F2D5C] text-[#F4B400] rounded-xl text-xs font-bold"
                >
                  Save Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

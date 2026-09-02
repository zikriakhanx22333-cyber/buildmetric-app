import React, { useState } from 'react';
import { Building2, Layers, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, DollarSign, Calculator, Percent } from 'lucide-react';

interface SaudiCostCalculatorProps {
  mode?: 'cost' | 'materials' | 'vat' | 'boq';
}

export const SaudiCostCalculator: React.FC<SaudiCostCalculatorProps> = ({ mode = 'cost' }) => {
  // Saudi villa parameters
  const [builtUpAreaM2, setBuiltUpAreaM2] = useState<number>(550); // standard modern Saudi villa ~500-600 m²
  const [city, setCity] = useState<'riyadh' | 'jeddah' | 'dammam' | 'other'>('riyadh');
  const [contractType, setContractType] = useState<'bone_no_mat' | 'bone_with_mat' | 'turnkey_standard' | 'turnkey_luxury'>('bone_with_mat');
  const [includeVat, setIncludeVat] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'cost' | 'materials' | 'vat'>((mode === 'materials' || mode === 'vat') ? mode : 'cost');

  // Benchmark unit rates in Saudi Riyals (SAR / m²) for 2025-2026 market:
  // Bone without materials (عظم مصنعية فقط): 130 - 180 SAR/m²
  // Bone with materials (عظم بالمواد - خرسانة وحديد وبلك): 520 - 680 SAR/m²
  // Turnkey Standard (تسليم مفتاح تشطيب عادي/تجاري): 1,250 - 1,550 SAR/m²
  // Turnkey Luxury (تسليم مفتاح ديلوكس/سوبر ديلوكس مودرن): 1,750 - 2,400 SAR/m²
  const baseRateTable: Record<string, Record<string, number>> = {
    bone_no_mat: { riyadh: 160, jeddah: 155, dammam: 150, other: 145 },
    bone_with_mat: { riyadh: 620, jeddah: 600, dammam: 590, other: 580 },
    turnkey_standard: { riyadh: 1450, jeddah: 1400, dammam: 1380, other: 1350 },
    turnkey_luxury: { riyadh: 2150, jeddah: 2050, dammam: 2000, other: 1950 }
  };

  const ratePerM2 = baseRateTable[contractType]?.[city] || 600;
  const subtotalSar = builtUpAreaM2 * ratePerM2;
  const vatRate = 0.15; // 15% ZATCA VAT in KSA
  const vatAmountSar = includeVat ? subtotalSar * vatRate : 0;
  const grandTotalSar = subtotalSar + vatAmountSar;

  // Saudi Building Code (SBC) typical material consumption rules per m² of villa:
  // Ready-Mix Concrete (C35 / C30 مقاوم وعادي): ~0.42 m³ per m² built-up
  const concreteVolumeM3 = Math.round(builtUpAreaM2 * 0.42);
  
  // Steel Rebar (Sabic / Al-Ittefaq 12mm-25mm Grade 60): ~48 - 55 kg per m²
  const steelWeightKg = Math.round(builtUpAreaM2 * 52);
  const steelTons = steelWeightKg / 1000;

  // Cement Bags (Yamama / Riyadh / Holcim CEM I 42.5N / 52.5N): ~4.5 bags per m² (structure + plastering + tile screeds)
  const cementBagsCount = Math.round(builtUpAreaM2 * 4.6);

  // Insulated AAC / Volcanic Blocks (بلك بركاني معزول / أسمنتي 20×20×40 سم): ~14 blocks per m²
  const blocksCount = Math.round(builtUpAreaM2 * 14.5);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>متوافق مع كود البناء السعودي (SBC) وأسعار السوق</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            حاسبة تكاليف وكميات البناء في السعودية (Saudi Construction Cost &amp; BOQ)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            حساب تكلفة بناء الفلل والمباني بالريال السعودي (عظم وتشطيب)، كميات الحديد (سابك)، الخرسانة الجاهزة، البلك المعزول، والضريبة 15%.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('cost')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'cost' ? 'bg-white text-[#0F2D5C] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            تكلفة البناء (SAR)
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'materials' ? 'bg-white text-[#0F2D5C] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            جدول الكميات (حديد/خرسانة)
          </button>
          <button
            onClick={() => setActiveTab('vat')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'vat' ? 'bg-white text-[#0F2D5C] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ضريبة 15% ZATCA
          </button>
        </div>
      </div>

      {/* Input Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            إجمالي مسطح البناء (م² Built-up Area)
          </label>
          <input
            type="number"
            min="50"
            step="10"
            value={builtUpAreaM2}
            onChange={(e) => setBuiltUpAreaM2(Math.max(10, parseFloat(e.target.value) || 0))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">متوسط الفلل السكنية: 450 - 650 م²</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            نوع العقد ومستوى التنفيذ
          </label>
          <select
            value={contractType}
            onChange={(e) => setContractType(e.target.value as any)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold bg-white"
          >
            <option value="bone_with_mat">عظم بالمواد (خرسانة + حديد + بلك)</option>
            <option value="bone_no_mat">عظم مصنعية فقط (بدون مواد)</option>
            <option value="turnkey_standard">تسليم مفتاح (تشطيب قياسي ممتاز)</option>
            <option value="turnkey_luxury">تسليم مفتاح (تشطيب ديلوكس مودرن فاخر)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            المدينة / المنطقة بالمملكة
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value as any)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold bg-white"
          >
            <option value="riyadh">منطقة الرياض (Riyadh)</option>
            <option value="jeddah">منطقة مكة / جدة (Jeddah)</option>
            <option value="dammam">المنطقة الشرقية / الدمام والخبر (Dammam)</option>
            <option value="other">باقي مدن المملكة (Other Regions)</option>
          </select>
        </div>
      </div>

      {/* Main Results Card */}
      <div className="bg-gradient-to-br from-[#0F2D5C] to-[#163c78] text-white rounded-2xl p-5 sm:p-6 space-y-6 shadow-md">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#F4B400] font-bold">
                {contractType === 'bone_with_mat' ? 'تقدير تكلفة العظم بالمواد' : contractType === 'turnkey_luxury' ? 'تقدير تسليم مفتاح ديلوكس' : 'التكلفة الإجمالية التقديرية'}
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-emerald-300 font-bold">
                {city === 'riyadh' ? 'الرياض' : city === 'jeddah' ? 'جدة' : 'الشرقية'}
              </span>
            </div>
            <h4 className="text-3xl font-mono font-black text-white mt-1">
              {grandTotalSar.toLocaleString()} <span className="text-lg font-sans text-[#F4B400]">ريال سعودي</span>
            </h4>
            <p className="text-xs text-blue-200 mt-0.5">
              متوسط السعر: {Math.round(grandTotalSar / builtUpAreaM2)} ريال / م² {includeVat && '(شامل 15% ضريبة القيمة المضافة)'}
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-3 text-xs space-y-1 self-start sm:self-auto min-w-[200px]">
            <div className="flex justify-between text-blue-200">
              <span>المبلغ قبل الضريبة:</span>
              <span className="font-mono font-bold text-white">{subtotalSar.toLocaleString()} ر.س</span>
            </div>
            <div className="flex justify-between text-blue-200">
              <span>ضريبة القيمة المضافة (15%):</span>
              <span className="font-mono font-bold text-[#F4B400]">{vatAmountSar.toLocaleString()} ر.س</span>
            </div>
            <div className="flex justify-between text-white font-bold pt-1 border-t border-white/10">
              <span>الإجمالي النهائي:</span>
              <span className="font-mono">{grandTotalSar.toLocaleString()} ر.س</span>
            </div>
          </div>
        </div>

        {/* Quantities Breakdown (SBC Standard) */}
        <div>
          <span className="text-xs font-bold text-[#F4B400] uppercase tracking-wider block mb-3">
            كميات المواد الإنشائية التقريبية وفق كود البناء السعودي SBC
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
              <span className="text-xs text-blue-200 block font-semibold">حديد تسليح (سابك / الاتفاق)</span>
              <span className="text-xl font-mono font-black text-[#F4B400] block mt-0.5">{steelTons.toFixed(1)} طن</span>
              <span className="text-[11px] text-slate-300 block">~{steelWeightKg.toLocaleString()} كجم (أقطار 10-25 مم)</span>
            </div>

            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
              <span className="text-xs text-blue-200 block font-semibold">خرسانة جاهزة (C30 / C35)</span>
              <span className="text-xl font-mono font-black text-white block mt-0.5">{concreteVolumeM3} م³</span>
              <span className="text-[11px] text-slate-300 block">قواعد، أعمدة، أسقف وجسور</span>
            </div>

            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
              <span className="text-xs text-blue-200 block font-semibold">بلك بركاني / أسمنتي عازل</span>
              <span className="text-xl font-mono font-black text-white block mt-0.5">{blocksCount.toLocaleString()} بلكة</span>
              <span className="text-[11px] text-slate-300 block">جدران خارجية وداخلية</span>
            </div>

            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10">
              <span className="text-xs text-blue-200 block font-semibold">أكياس أسمنت (اليمامة / الرياض)</span>
              <span className="text-xl font-mono font-black text-white block mt-0.5">{cementBagsCount.toLocaleString()} كيس</span>
              <span className="text-[11px] text-slate-300 block">50 كجم للمونة واللياسة والتبليط</span>
            </div>

          </div>
        </div>

        <div className="bg-black/20 rounded-xl p-3 border border-white/5 text-xs text-blue-100 leading-relaxed">
          <strong className="text-[#F4B400]">ملاحظة هندسية:</strong> الأسعار والكميات تقديرية وتعتمد على المخططات الإنشائية المعتمدة من المكتب الهندسي وطبيعة فحص التربة (Soil Investigation) واشتراطات أمانات المدن وشهادة إتمام البناء وكود وادي حنيفة/الكود العمراني المحلي.
        </div>

      </div>
    </div>
  );
};

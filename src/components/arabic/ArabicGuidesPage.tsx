import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SEO } from '../SEO';
import { BookOpen, ArrowRight, ArrowLeft, Building2, Layers, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface ArabicGuide {
  slug: string;
  title: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  category: string;
  readTime: string;
  sections: Array<{
    heading: string;
    content: string;
    table?: Array<{ col1: string; col2: string; col3: string }>;
  }>;
  relatedCalculators: Array<{ title: string; path: string }>;
}

const ARABIC_GUIDES_DATA: Record<string, ArabicGuide> = {
  'concrete-mix-ratios-guide': {
    slug: 'concrete-mix-ratios-guide',
    title: 'دليل نسب خلط الخرسانة الإنشائية والعادية (M15, M20, M25)',
    h1: 'دليل نسب خلط الخرسانة الإنشائية والعادية وفق المواصفات القياسية',
    seoTitle: 'دليل نسب خلط الخرسانة M15, M20, M25 | جدول نسب الخلط | BuildMetric',
    metaDescription: 'دليل شامل لنسب خلط الخرسانة المسلحة والعادية. نسب الأسمنت والرمل والركام والماء، رتب الخرسانة C20 و C25 و C30، ومعامل الحجم الجاف 1.54.',
    category: 'الخرسانة والأسمنت',
    readTime: '6 دقائق قراءة',
    sections: [
      {
        heading: 'مفهوم نسب خلط الخرسانة الهندسية (Nominal Concrete Mixes)',
        content: 'تُحدد نسب خلط الخرسانة مقدار المواد الجافة الداخلة في تصنيع المتر المكعب من الخرسانة. وتُكتب النسبة عادة على شكل (أسمنت : رمل : ركام/بحص). يلعب الماء دوراً حاسماً عبر نسبة الماء إلى الأسمنت (W/C Ratio) والتي يجب ألا تتجاوز 0.45 إلى 0.50 للخرسانة المسلحة لضمان عدم حدوث تعشيش أو ضعف في المقاومة المميزة بعد 28 يوماً.'
      },
      {
        heading: 'جدول رتب الخرسانة ونسب الخلط المعيارية',
        content: 'يوضح الجدول التالي نسب الخلط الحجمية الأكثر استخداماً في المشاريع الإنشائية والسكنية:',
        table: [
          { col1: 'رتبة الخرسانة', col2: 'النسبة الحجمية (أسمنت : رمل : ركام)', col3: 'الاستخدام الهندسي الشائع' },
          { col1: 'M7.5 / M10', col2: '1 : 4 : 8 أو 1 : 3 : 6', col3: 'خرسانة نظافة أسفل القواعد وتثبيت الأرصفة' },
          { col1: 'M15 (C15)', col2: '1 : 2 : 4', col3: 'أرضيات الصبات العادية وخرسانة الميول للأسطح' },
          { col1: 'M20 (C20)', col2: '1 : 1.5 : 3', col3: 'الأسقف والكمرات والقواعد في المباني البسيطة' },
          { col1: 'M25 (C25)', col2: '1 : 1 : 2', col3: 'الأعمدة، الجدران الاستنادية، والخرسانة المسلحة الهامة' },
          { col1: 'M30 / M35', col2: 'تصميم خلطة معملي (Mix Design)', col3: 'الأبراج والكباري والمنشآت المائية والخزانات' }
        ]
      },
      {
        heading: 'لماذا نضرب في معامل 1.54 لحساب الحجم الجاف؟',
        content: 'عند خلط الأسمنت والبطحاء مع الماء، تنكمش الحبيبات وتتداخل في الفراغات البينية للركام الخشن بنسبة 54%. لذلك لحساب الكميات المطلوبة من الأسمنت والرمل والكنكري لصب حجم رطب مقداره 10 م³، نقوم بضرب الحجم الصافي في 1.54 فنحصل على 15.4 م³ من المواد الجافة السائبة.'
      }
    ],
    relatedCalculators: [
      { title: 'حاسبة كميات الخرسانة', path: '/ar/calculators/concrete-calculator' },
      { title: 'حاسبة أكياس الأسمنت', path: '/ar/calculators/cement-calculator' },
      { title: 'حاسبة حجم الكمرات والجسور', path: '/ar/calculators/beam-volume-calculator' }
    ]
  },
  'block-work-estimation-guide': {
    slug: 'block-work-estimation-guide',
    title: 'دليل حساب كميات البلوك والمباني واشتراطات كود البناء السعودي',
    h1: 'دليل حساب كميات البلوك والمباني واشتراطات العزل الحراري',
    seoTitle: 'دليل حساب كميات البلوك وأعمال المباني | كود البناء السعودي | BuildMetric',
    metaDescription: 'دليل هندسي متكامل لحساب أعمال المباني، البلك الأسمنتي والبركاني والعازل، حساب المونة، وخصم الفتحات وفق متطلبات كود البناء السعودي SBC.',
    category: 'المباني والجدران',
    readTime: '7 دقائق قراءة',
    sections: [
      {
        heading: 'القواعد الهندسية لحساب مسطحات الجدران والبلوك',
        content: 'لحساب عدد البلوك لأي فيلا أو مبنى، يتم حساب المحيط الإجمالي للجدران بالمتر الطولي وضربه في الارتفاع الصافي للطابق (عادة 3.2 إلى 3.5 م). بعد ذلك يتم خصم مسطحات الفتحات بالكامل، بما في ذلك الأبواب والشبابيك وفتحات التكييف، مع إضافة نسبة هالك تتراوح بين 5% إلى 8% نظراً لقص البلك عند التداخل مع الأعمدة والأعتاب الإنشائية.'
      },
      {
        heading: 'اشتراطات كود البناء السعودي للجدران الخارجية',
        content: 'يشترط كود البناء السعودي (SBC 601 / 602) استخدام جدران معزولة حرارياً لتحقيق معامل انتقال حراري (U-Value) لا يتجاوز 0.34 W/m²·K. وأشهر الحلول المعتمدة:\n1. الجدار المزدوج (Double Wall): بلك خارجي 10 سم + عازل صوف صخري أو بوليسترين 5 سم + بلك داخلي 10 أو 15 سم.\n2. البلك البركاني المعزول بشريحة بولسترين مدمجة سماكة 20 أو 25 سم.\n3. بلك الخرسانة الخلوية المعقمة (YTONG / AAC) بسماكة 20 إلى 25 سم كعازل متجانس.'
      }
    ],
    relatedCalculators: [
      { title: 'برنامج حساب كمية البلوك', path: '/ar/calculators/block-quantity-calculator' },
      { title: 'حاسبة مونة البناء واللياسة', path: '/ar/calculators/mortar-calculator' },
      { title: 'تكاليف البناء في السعودية', path: '/saudi/construction-cost-calculator' }
    ]
  },
  'steel-rebar-weight-guide': {
    slug: 'steel-rebar-weight-guide',
    title: 'جدول أوزان وأقطار حديد التسليح للمتر الطولي والطن',
    h1: 'دليل وجدول أوزان حديد التسليح وقانون D²/162',
    seoTitle: 'جدول أوزان حديد التسليح | وزن المتر وعدد الأسياخ في الطن | BuildMetric',
    metaDescription: 'جدول معتمد لأوزان أسياخ حديد التسليح لجميع الأقطار (8 مم إلى 32 مم). وزن المتر الطولي، وزن السيخ بطول 12 م، وعدد الأسياخ في الطن.',
    category: 'الحديد والتسليح',
    readTime: '5 دقائق قراءة',
    sections: [
      {
        heading: 'كيفية استنتاج وزن أسياخ حديد التسليح',
        content: 'يعتمد المهندسون على معادلة سريعة دقيقة لحساب وزن المتر الطولي لأي قطر حديد:\nوزن المتر الطولي (كجم/م) = القطر² ÷ 162.28.\nحيث القطر يقاس بالمليمتر (مم). فمثلاً لسيخ 12 مم: 12 × 12 ÷ 162.28 = 0.888 كجم/م.'
      },
      {
        heading: 'جدول أوزان حديد التسليح المعتمد (أقطار 8 إلى 32 مم)',
        content: 'الجدول المرجعي المعتمد لحديد التسليح (بطول سيخ قياسي 12 متر):',
        table: [
          { col1: 'قطر السيخ (مم)', col2: 'وزن المتر الطولي (كجم/م)', col3: 'عدد الأسياخ في الطن (12 م)' },
          { col1: '8 مم', col2: '0.395 كجم/م', col3: 'حوالي 211 سيخ' },
          { col1: '10 مم', col2: '0.617 كجم/م', col3: 'حوالي 135 سيخ' },
          { col1: '12 مم', col2: '0.888 كجم/م', col3: 'حوالي 94 سيخ' },
          { col1: '14 مم', col2: '1.208 كجم/م', col3: 'حوالي 69 سيخ' },
          { col1: '16 مم', col2: '1.578 كجم/م', col3: 'حوالي 53 سيخ' },
          { col1: '18 مم', col2: '2.000 كجم/م', col3: 'حوالي 42 سيخ' },
          { col1: '20 مم', col2: '2.466 كجم/م', col3: 'حوالي 34 سيخ' },
          { col1: '25 مم', col2: '3.853 كجم/م', col3: 'حوالي 22 سيخ' },
          { col1: '32 مم', col2: '6.313 كجم/م', col3: 'حوالي 13 سيخ' }
        ]
      }
    ],
    relatedCalculators: [
      { title: 'حاسبة وزن حديد التسليح', path: '/ar/calculators/steel-weight-calculator' },
      { title: 'حاسبة كميات الخرسانة', path: '/ar/calculators/concrete-calculator' },
      { title: 'حاسبة حجم الكمرات والجسور', path: '/ar/calculators/beam-volume-calculator' }
    ]
  }
};

export const ArabicGuidesPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // If viewing a specific guide
  if (slug && ARABIC_GUIDES_DATA[slug]) {
    const guide = ARABIC_GUIDES_DATA[slug];
    const canonicalUrl = `https://buildmetric-app.vercel.app/ar/guides/${guide.slug}`;

    return (
      <div dir="rtl" className="py-8 bg-slate-50 min-h-screen text-right font-sans">
        <SEO
          title={guide.seoTitle}
          description={guide.metaDescription}
          canonicalUrl={canonicalUrl}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Breadcrumb */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <button
              onClick={() => navigate('/ar/guides')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#0F2D5C] hover:border-[#0F2D5C] transition-colors shadow-sm cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>جميع الأدلة الهندسية</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="hover:text-slate-800 cursor-pointer" onClick={() => navigate('/')}>الرئيسية</span>
              <span>/</span>
              <span className="hover:text-slate-800 cursor-pointer" onClick={() => navigate('/ar/guides')}>أدلة البناء</span>
              <span>/</span>
              <span className="text-[#0F2D5C] font-bold">{guide.title}</span>
            </div>
          </div>

          {/* Guide Header */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F2D5C]">
              <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0F2D5C]">{guide.category}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">{guide.readTime}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {guide.h1}
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              {guide.metaDescription}
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-6">
            {guide.sections.map((sec, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                  {sec.heading}
                </h2>
                <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {sec.content}
                </div>

                {sec.table && (
                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-right text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                          <th className="py-2.5 px-3">{sec.table[0].col1}</th>
                          <th className="py-2.5 px-3">{sec.table[0].col2}</th>
                          <th className="py-2.5 px-3">{sec.table[0].col3}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {sec.table.slice(1).map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-blue-50/50">
                            <td className="py-2.5 px-3 font-bold text-[#0F2D5C]">{row.col1}</td>
                            <td className="py-2.5 px-3 font-mono">{row.col2}</td>
                            <td className="py-2.5 px-3 text-slate-600">{row.col3}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Related Calculators */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              حاسبات مرتبطة بهذا الدليل
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {guide.relatedCalculators.map((rel, rIdx) => (
                <button
                  key={rIdx}
                  onClick={() => {
                    navigate(rel.path);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-[#0F2D5C] hover:bg-blue-50/60 transition-all text-xs font-bold text-slate-900 hover:text-[#0F2D5C] flex items-center justify-between cursor-pointer"
                >
                  <span>{rel.title}</span>
                  <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Directory of all Arabic guides
  const guideList = Object.values(ARABIC_GUIDES_DATA);

  return (
    <div dir="rtl" className="py-8 bg-slate-50 min-h-screen text-right font-sans">
      <SEO
        title="أدلة البناء والهندسة المدنية بالعربية | BuildMetric"
        description="مكتبة شاملة من الأدلة الهندسية وحساب كميات الخرسانة، البلوك، وحديد التسليح وفق كود البناء السعودي والمواصفات المعيارية."
        canonicalUrl="https://buildmetric-app.vercel.app/ar/guides"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0F2D5C] text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-[#F4B400]" />
            <span>الأدلة الفنية والهندسية المعيارية</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            أدلة البناء وحساب الكميات باللغة العربية
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
            أدلة مرجعية مفصلة أعدها مهندسون مدنيون ومعماريون لتغطية نسب خلط الخرسانة، جداول أوزان حديد التسليح، وحسابات أعمال المباني واللياسة.
          </p>
        </div>

        {/* Guides List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guideList.map((g) => (
            <div
              key={g.slug}
              onClick={() => {
                navigate(`/ar/guides/${g.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-[#0F2D5C]/30 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-[#0F2D5C] bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                  {g.category}
                </span>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-[#0F2D5C] transition-colors leading-snug">
                  {g.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {g.metaDescription}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0F2D5C]">
                <span>قراءة الدليل كاملاً</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

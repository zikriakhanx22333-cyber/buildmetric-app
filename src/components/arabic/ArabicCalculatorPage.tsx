import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SEO } from '../SEO';
import { Building2, Layers, CheckCircle2, ArrowRight, ArrowLeft, BookOpen, Sparkles, HelpCircle, ShieldCheck, Box, Calculator } from 'lucide-react';

interface ArabicCalcConfig {
  id: string;
  slug: string;
  h1: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  formulaTitle: string;
  formulas: string[];
  methodology: string;
  workedExample: {
    title: string;
    details: string;
    result: string;
  };
  assumptions: string[];
  faqs: Array<{ q: string; a: string }>;
  related: Array<{ title: string; path: string }>;
}

const ARABIC_CALCULATORS_DATA: Record<string, ArabicCalcConfig> = {
  'block-quantity-calculator': {
    id: 'block-quantity-calculator',
    slug: 'block-quantity-calculator',
    h1: 'برنامج حساب كمية البلوك ومونة البناء (حاسبة الطابوق)',
    title: 'برنامج حساب كمية البلوك ومونة الأسمنت',
    seoTitle: 'برنامج حساب كمية البلوك ومونة البناء | بلك بركاني وأسمنتي | BuildMetric',
    metaDescription: 'برنامج حساب كمية البلوك للمباني والفلل بدقة هندسية عالية. احسب عدد البلك الأسمنتي والبركاني، خصم الفتحات، نسبة الهالك، وأكياس الأسمنت والرمل للمونة.',
    intro: 'يعد حساب عدد البلك (الطابوق) بدقة خطوة أساسية لتقدير تكاليف أعمال المباني قبل بدء التنفيذ. يساعدك هذا البرنامج الهندسي في حساب العدد الفعلي للبلك المطلوب مع خصم مساحات الأبواب والنوافذ وإضافة نسبة هالك القص، بالإضافة لحساب أكياس الأسمنت والرمل اللازمة للمونة الأسمنتية وفق كود البناء السعودي والمواصفات القياسية.',
    formulaTitle: 'المعادلات الهندسية لحساب كمية البلوك والمونة',
    formulas: [
      'مساحة الجدار الصافية = (الطول × الارتفاع) - مساحة الأبواب والشبابيك',
      'مساحة البلكة الواحدة (مع العرموس 1 سم) = 0.41 م × 0.21 م = 0.0861 م²',
      'عدد البلك للمتر المربع = 1 / 0.0861 ≈ 12.5 بلكة / م²',
      'إجمالي عدد البلك = مساحة الجدار الصافية × 12.5 × 1.05 (مع 5% نسبة هالك)',
      'كمية الأسمنت للمونة = 0.25 كيس أسمنت (50 كجم) لكل متر مربع من جدار سماكة 20 سم'
    ],
    methodology: 'يتم قياس الأبعاد الخارجية للغرفة أو الجدار بالمتر، وطرح مساحات الفتحات (أبواب، شبابيك، فتحات تكييف). المقاس القياسي الشائع للبلك في دول الخليج والمملكة العربية السعودية هو 40 سم طول × 20 سم ارتفاع × 20 سم سماكة (أو 15 سم للقواطع). وبإضافة سمك فاصل المونة الأسمنتية (العرموس 1 إلى 1.5 سم)، يحتاج المتر المربع للجدار إلى 12.5 بلكة. كما يُنصح بإضافة 5% إلى 7% لتغطية الهالك الناتج عن التكسير والقص عند الزوايا والأعتاب.',
    workedExample: {
      title: 'مثال عملي لحساب غرفة 4×5 م بارتفاع 3 م',
      details: 'محيط الغرفة = (4 + 5) × 2 = 18 متر طولي.\nالمساحة الكلية = 18 م × 3 م = 54 م².\nخصم الفتحات: باب (1×2.1 = 2.1 م²) + نافذة (1.5×1.2 = 1.8 م²) = 3.9 م².\nالمساحة الصافية = 54 - 3.9 = 50.1 م².\nعدد البلك = 50.1 م² × 12.5 بلكة/م² = 626 بلكة.\nإضافة 5% هالك = 626 × 1.05 = 658 بلكة.',
      result: '658 بلكة مقاس 20×20×40 سم + 13 كيس أسمنت (50 كجم) + 1.2 م³ رمل ناعم للمونة.'
    },
    assumptions: [
      'مقاس البلكة القياسي: 40 × 20 × 20 سم (طول × ارتفاع × سماكة).',
      'سماكة فاصل المونة الأسمنتية (العراميس): 10 إلى 15 مم.',
      'نسبة خلط المونة: 1 أسمنت : 3 رمل أو 1 : 4.',
      'نسبة هالك مقترحة: 5% للبلك الإسمنتي و7% للبلك البركاني والخفيف.'
    ],
    faqs: [
      {
        q: 'كم عدد البلوك في المتر المربع الواحد؟',
        a: 'يحتاج المتر المربع من الجدار إلى 12.5 بلكة قياسية مقاس 20×20×40 سم مع احتساب فواصل المونة الأسمنتية (12 إلى 13 بلكة عملياً).'
      },
      {
        q: 'كم كيس أسمنت يحتاج ألف بلكة للمونة؟',
        a: 'تحتاج الألف بلكة (1000 بلكة) إلى حوالي 18 إلى 22 كيس أسمنت (50 كجم) وحوالي 2.5 إلى 3 أمتار مكعبة من الرمل النظيف.'
      },
      {
        q: 'ما الفرق بين البلك البركاني والبلك الأسمنتي؟',
        a: 'البلك البركاني أخف وزناً وعازل ممتاز للحرارة ومقاوم للحريق، ويشترط استخدامه في الجدران الخارجية بكود البناء السعودي، بينما البلك الأسمنتي أثقل وأعلى في القوة الميكانيكية.'
      }
    ],
    related: [
      { title: 'حاسبة المونة الأسمنتية', path: '/ar/calculators/mortar-calculator' },
      { title: 'حاسبة كميات الخرسانة', path: '/ar/calculators/concrete-calculator' },
      { title: 'حاسبة وزن حديد التسليح', path: '/ar/calculators/steel-weight-calculator' },
      { title: 'تكاليف البناء في السعودية', path: '/saudi/construction-cost-calculator' }
    ]
  },
  'concrete-calculator': {
    id: 'concrete-calculator',
    slug: 'concrete-calculator',
    h1: 'حاسبة كميات الخرسانة والأسمنت والرمل والركام',
    title: 'حاسبة كميات الخرسانة المسلحة والعادية',
    seoTitle: 'حاسبة كميات الخرسانة المسلحة | الأسمنت والبطحاء والخرسانة | BuildMetric',
    metaDescription: 'احسب حجم الخرسانة المسلحة بالمتر المكعب والقواعد والأسقف والكمرات. تقدير عدد أكياس الأسمنت، البطحاء (الرمل)، والكنكري مع نسبة الهالك.',
    intro: 'حاسبة متخصصة لحساب حجم الخرسانة العادية والمسلحة (RCC) للأسقف، القواعد، الأعمدة والكمرات. تحول الأبعاد الهندسية إلى حجم بالمتر المكعب (م³) وتستخرج كميات أكياس الأسمنت عيار 50 كجم والبطحاء والكنكري وفق نسب الخلط الهندسية ومعامل الحجم الجاف 1.54.',
    formulaTitle: 'معادلات الحجم الجاف ونسب خلط الخرسانة',
    formulas: [
      'الحجم الرطب = الطول × العرض × السماكة (م³)',
      'الحجم الجاف = الحجم الرطب × 1.54 (لتعويض فراغات الهواء وتداخل الحبيبات)',
      'مجموع أجزاء الخلطة لرتبة C25 (1 : 1 : 2) = 4 أجزاء',
      'أكياس الأسمنت (50 كجم) = الحجم الجاف × (نسبة الأسمنت / مجموع الأجزاء) ÷ 0.0347 م³'
    ],
    methodology: 'عند خلط الأسمنت والماء والركام تقل الحجوم بنسبة 54% بسبب امتلاء الفراغات البينية بحبيبات الأسمنت الناعمة، لذا يُضرب الحجم الهندسي الصافي في معامل 1.54 لحساب الحجم الجاف قبل الخلط والصب.',
    workedExample: {
      title: 'مثال لسقف خرساني مسطح 150 م² بسماكة 15 سم',
      details: 'الحجم الرطب = 150 م² × 0.15 م = 22.5 م³.\nالحجم الجاف = 22.5 × 1.54 = 34.65 م³.\nباستخدام خلطة C25 عيار 350 كجم/م³ (7 أكياس أسمنت لكل متر مكعب خرسانة جاهزة):\nعدد أكياس الأسمنت = 22.5 م³ × 7 أكياس = 158 كيس أسمنت.',
      result: '23.6 م³ خرسانة جاهزة (مع 5% هالك) أو 158 كيس أسمنت و 10 م³ بطحاء و 20 م³ كنكري.'
    },
    assumptions: [
      'وزن كيس الأسمنت القياسي = 50 كجم (حجم الكيس 0.0347 م³).',
      'معامل الحجم الجاف = 1.54.',
      'نسبة الهالك الموصى بها = 3% إلى 5% لتشوهات الشدات الخشبية والانسكاب.'
    ],
    faqs: [
      {
        q: 'كم كيس أسمنت في المتر المكعب من الخرسانة المسلحة؟',
        a: 'تحتاج الخرسانة المسلحة الشائعة (رتبة C25 أو C30) إلى 7 أكياس أسمنت (350 كجم) لكل متر مكعب، بينما خرسانة النظافة تحتاج 5 أكياس (250 كجم).'
      },
      {
        q: 'كم طن حديد يحتاج المتر المكعب من الخرسانة؟',
        a: 'يتراوح معدل حديد التسليح بين 80 إلى 120 كجم من الحديد لكل متر مكعب من الخرسانة في المباني السكنية.'
      }
    ],
    related: [
      { title: 'برنامج حساب كمية البلوك', path: '/ar/calculators/block-quantity-calculator' },
      { title: 'حاسبة وزن حديد التسليح', path: '/ar/calculators/steel-weight-calculator' },
      { title: 'حاسبة حجم الكمرات والجسور', path: '/ar/calculators/beam-volume-calculator' }
    ]
  },
  'steel-weight-calculator': {
    id: 'steel-weight-calculator',
    slug: 'steel-weight-calculator',
    h1: 'حاسبة وزن حديد التسليح بالمتر الطولي والأطنان (D²/162)',
    title: 'حاسبة وزن حديد التسليح',
    seoTitle: 'حاسبة وزن حديد التسليح بالمتر الطولي والأطنان | D²/162 | BuildMetric',
    metaDescription: 'احسب وزن أسياخ حديد التسليح لجميع الأقطار (8 إلى 32 مم) بالمتر الطولي والكيلوجرام والأطنان باستخدام القانون الهندسي D² / 162.',
    intro: 'أداة هندسية دقيقة لحساب أوزان أسياخ وقضبان حديد التسليح لجميع المقاسات والأقطار الإنشائية (8، 10، 12، 14، 16، 18، 20، 25، 32 مم) استناداً إلى الكثافة المعيارية للصلب الكربوني (7850 كجم/م³) وقانون الوزن الطولي القياسي.',
    formulaTitle: 'القانون الهندسي لحساب وزن حديد التسليح',
    formulas: [
      'وزن المتر الطولي (كجم/م) = (القطر بالمليمتر)² ÷ 162.28',
      'وزن السيخ الواحد (بطول 12 م) = وزن المتر الطولي × 12',
      'عدد الأسياخ في الطن الواحد = 1000 كجم ÷ وزن السيخ (12 م)'
    ],
    methodology: 'تم اشتقاق الثابت 162.28 من مساحة المقطع الدائري للسيخ (π × d² / 4) مضروبة في الكثافة النوعية للحديد (7850 كجم/م³). يعتمد هذا القانون عالمياً في جداول تفريد الحديد (Bar Bending Schedule).',
    workedExample: {
      title: 'مثال لحساب وزن سيخ حديد قطر 16 مم بطول 12 متر',
      details: 'وزن المتر الطولي = 16² ÷ 162 = 256 ÷ 162 = 1.58 كجم/م.\nوزن السيخ بطول 12 متر = 1.58 × 12 = 18.96 كجم.\nعدد الأسياخ في الطن = 1000 ÷ 18.96 = 52.7 سيخ (حوالي 53 سيخ/طن).',
      result: '1.58 كجم/م | 18.96 كجم للسيخ | 53 سيخ في الطن الواحد من حديد سابك قطر 16 مم.'
    },
    assumptions: [
      'طول السيخ القياسي في المصانع = 12 متر.',
      'كثافة الصلب الإنشائي = 7850 كجم/م³.',
      'الحديد فائق المقاومة رتبة 60 (Grade 60) عالي التماسك والمشرشر.'
    ],
    faqs: [
      {
        q: 'كم سيخ في طن حديد 12 مم؟',
        a: 'يحتوي طن حديد 12 مم على حوالي 94 سيخاً قياسياً بطول 12 متراً (وزن المتر الطولي 0.888 كجم، ووزن السيخ 10.66 كجم).'
      },
      {
        q: 'كم سيخ في طن حديد 14 مم؟',
        a: 'يحتوي طن حديد 14 مم على حوالي 69 سيخاً بطول 12 متراً (وزن المتر الطولي 1.208 كجم، ووزن السيخ 14.5 كجم).'
      }
    ],
    related: [
      { title: 'حاسبة كميات الخرسانة', path: '/ar/calculators/concrete-calculator' },
      { title: 'حاسبة حجم الكمرات والجسور', path: '/ar/calculators/beam-volume-calculator' },
      { title: 'برنامج حساب كمية البلوك', path: '/ar/calculators/block-quantity-calculator' }
    ]
  },
  'mortar-calculator': {
    id: 'mortar-calculator',
    slug: 'mortar-calculator',
    h1: 'حاسبة مورتار المونة الأسمنتية للمباني واللياسة',
    title: 'حاسبة مونة البناء واللياسة',
    seoTitle: 'حاسبة مونة البناء واللياسة الأسمنتية | الأسمنت والرمل | BuildMetric',
    metaDescription: 'احسب حجم مونة الأسمنت للمباني واللياسة (المساح). كمية أكياس الأسمنت والرمل والماء المطلوبة مع نسبة الهالك.',
    intro: 'حساب دقيق لخلطات المونة الأسمنتية لأعمال بناء الجدران، التلييس (اللياسة)، وبلاط الأرضيات مع تحديد نسب الخلط (1:3 إلى 1:6) ومعامل الحجم الجاف للمونة 1.33.',
    formulaTitle: 'معادلات الحجم الجاف لمونة الأسمنت',
    formulas: [
      'الحجم الجاف للمونة = الحجم الرطب × 1.33 (33% معامل انتفاخ وفراغات الرمل والأسمنت)',
      'أكياس الأسمنت = الحجم الجاف × (نسبة الأسمنت / مجموع النسب) ÷ 0.0347 م³',
      'حجم الرمل = الحجم الجاف × (نسبة الرمل / مجموع النسب)'
    ],
    methodology: 'تختلف المونة عن الخرسانة بعدم وجود حصمة (ركام خشن)، ويبلغ معامل الحجم الجاف للمونة 1.33 مقابل 1.54 للخرسانة.',
    workedExample: {
      title: 'مثال للياسة جدران بمساحة 100 م² وسماكة 2 سم',
      details: 'الحجم الرطب = 100 م² × 0.02 م = 2.0 م³.\nالحجم الجاف = 2.0 × 1.33 = 2.66 م³.\nبنسبة خلط 1 أسمنت : 4 رمل (مجموع الأجزاء 5):\nأكياس الأسمنت = (2.66 × 1/5) ÷ 0.0347 = 15.3 كيس.\nحجم الرمل = 2.66 × 4/5 = 2.13 م³.',
      result: '16 كيس أسمنت (50 كجم) + 2.2 م³ رمل مغسول (بطحاء ناعمة).'
    },
    assumptions: [
      'سماكة اللياسة القياسية للجدران = 1.5 إلى 2.5 سم.',
      'نسبة هالك اللياسة على الموقع = 10% نتيجة الطرطشة والتساقط.',
      'كثافة الرمل الناعم = 1600 كجم/م³.'
    ],
    faqs: [
      {
        q: 'كم كيس أسمنت يكفي للياسة 100 متر مربع؟',
        a: 'تحتاج الـ 100 متر مربع من اللياسة بسماكة 2 سم إلى حوالي 15 إلى 18 كيس أسمنت (50 كجم) مع الطرطشة وهالك التنفيذ.'
      }
    ],
    related: [
      { title: 'برنامج حساب كمية البلوك', path: '/ar/calculators/block-quantity-calculator' },
      { title: 'حاسبة كميات الخرسانة', path: '/ar/calculators/concrete-calculator' }
    ]
  },
  'beam-volume-calculator': {
    id: 'beam-volume-calculator',
    slug: 'beam-volume-calculator',
    h1: 'حاسبة حجم الكمرات والجسور الخرسانية والحديد (Beam Volume)',
    title: 'حاسبة حجم الكمرات والجسور',
    seoTitle: 'حاسبة حجم الكمرات والجسور الخرسانية | Volume of Beam | BuildMetric',
    metaDescription: 'احسب حجم الكمرات الساقطة والمدفونة بالمتر المكعب (م³)، مساحة الشدات الخشبية، أكياس الأسمنت، ونسبة حديد التسليح التقريبية.',
    intro: 'حساب حجم الخرسانة للجسور والكمرات الساقطة (Drop Beams) والمدفونة (Hidden Beams) وجسور الساقط والمقلوب. تحسب الأداة الحجم بالمتر المكعب، مساحة الطوبار الخشبي، وتقدير وزن حديد التسليح (1.0% إلى 2.5% من حجم الخرسانة).',
    formulaTitle: 'معادلات حجم الكمرات والحديد',
    formulas: [
      'حجم الخرسانة للكمرة المستطيلة = العرض × الارتفاع الصافي × الطول',
      'مساحة الشدات الخشبية (الطوبار) = (العرض + 2 × الارتفاع) × الطول',
      'وزن حديد التسليح التقريبي = حجم الخرسانة (م³) × 130 إلى 160 كجم/م³'
    ],
    methodology: 'يتم احتساب العمق الكلي للكمرة أو العمق الساقط تحت السقف لتجنب احتساب مساحة السقف مرتين.',
    workedExample: {
      title: 'مثال لكمرة ساقطة بطول 6 م، عرض 0.25 م، وعمق ساقط 0.50 م',
      details: 'الحجم = 6 م × 0.25 م × 0.50 م = 0.75 م³.\nمساحة الشدات الخشبية = (0.25 + 0.50 + 0.50) × 6 = 7.5 م².\nوزن حديد التسليح التقريبي (بمعدل 140 كجم/م³) = 0.75 × 140 = 105 كجم.',
      result: '0.75 م³ خرسانة مسلحة + 105 كجم حديد تسليح (أسياخ رئيسية وكانات) + 7.5 م² خشب طوبار.'
    },
    assumptions: [
      'معدل حديد التسليح في الكمرات السكنية: 120 إلى 160 كجم لكل م³ خرسانة.',
      'رتبة الخرسانة الموصى بها: C30 أو C35 عيار 350-400 كجم أسمنت.'
    ],
    faqs: [
      {
        q: 'ما هو الفرق بين الجسر الساقط والجسر المدفون (الهوردي)؟',
        a: 'الجسر الساقط يبرز أسفل بلاطة السقف ويوفر كفاءة إنشائية عالية مع توفير في الحديد، بينما الجسر المدفون يكون بنفس سماكة السقف الهوردي ليعطي مظهراً معمارياً مستوياً دون كمرات ساقطة.'
      }
    ],
    related: [
      { title: 'حاسبة كميات الخرسانة', path: '/ar/calculators/concrete-calculator' },
      { title: 'حاسبة وزن حديد التسليح', path: '/ar/calculators/steel-weight-calculator' }
    ]
  },
  'cement-calculator': {
    id: 'cement-calculator',
    slug: 'cement-calculator',
    h1: 'حاسبة أكياس الأسمنت للخلطات الإنشائية والمونة',
    title: 'حاسبة أكياس الأسمنت',
    seoTitle: 'حاسبة أكياس الأسمنت للخرسانة والمونة واللياسة | BuildMetric',
    metaDescription: 'احسب عدد أكياس الأسمنت عيار 50 كجم المطلوبة لأي حجم خرسانة أو مونة بناء أو لياسة مع نسب الخلط القياسية.',
    intro: 'أداة سريعة لحساب عدد أكياس الأسمنت البورتلاندي العادي والمقاوم (50 كجم) استناداً إلى الحجم بالمتر المكعب، نسب الخلط الاسمية (M10, M15, M20, M25)، أو عيار الخرسانة (250 إلى 400 كجم/م³).',
    formulaTitle: 'معادلة حساب أكياس الأسمنت',
    formulas: [
      'عدد الأكياس = (حجم الخرسانة م³ × كمية الأسمنت كجم/م³) ÷ 50 كجم',
      'حجم كيس الأسمنت الواحد = 0.0347 متر مكعب (1.226 قدم مكعب)'
    ],
    methodology: 'يتم احتساب الكمية بمعدل عيار الخلطة الإنشائية المعتمدة في المخططات.',
    workedExample: {
      title: 'مثال لصب أرضية خرسانية 30 م³ بعيار 300 كجم/م³',
      details: 'إجمالي الأسمنت المطلوب = 30 م³ × 300 كجم = 9,000 كجم.\nعدد الأكياس = 9,000 ÷ 50 = 180 كيس أسمنت.',
      result: '180 كيس أسمنت (50 كجم) أو 9 أطنان أسمنت بورتلاندي.'
    },
    assumptions: [
      'وزن الكيس القياسي = 50 كجم.',
      'الكثافة الظاهرية للأسمنت السائب = 1440 كجم/م³.'
    ],
    faqs: [
      {
        q: 'كم كيس أسمنت في الطن الواحد؟',
        a: 'الطن المتري (1000 كجم) يحتوي على 20 كيس أسمنت قياسي بوزن 50 كجم للكيس.'
      }
    ],
    related: [
      { title: 'حاسبة كميات الخرسانة', path: '/ar/calculators/concrete-calculator' },
      { title: 'برنامج حساب كمية البلوك', path: '/ar/calculators/block-quantity-calculator' }
    ]
  }
};

export const ArabicCalculatorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const currentSlug = slug || 'block-quantity-calculator';
  const config = ARABIC_CALCULATORS_DATA[currentSlug] || ARABIC_CALCULATORS_DATA['block-quantity-calculator'];

  // Interactive state for Arabic Block Calculator (primary showcase)
  const [wallLength, setWallLength] = useState<number>(12);
  const [wallHeight, setWallHeight] = useState<number>(3);
  const [openingsArea, setOpeningsArea] = useState<number>(4.2);
  const [wastagePct, setWastagePct] = useState<number>(5);

  const grossArea = wallLength * wallHeight;
  const netArea = Math.max(0, grossArea - openingsArea);
  const blocksPerM2 = 12.5;
  const totalBlocks = Math.ceil(netArea * blocksPerM2 * (1 + wastagePct / 100));
  const mortarCementBags = Math.ceil(netArea * 0.25);
  const mortarSandM3 = +(netArea * 0.03).toFixed(2);

  const canonicalUrl = `https://buildmetric-app.vercel.app/ar/calculators/${config.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://buildmetric-app.vercel.app/" },
        { "@type": "ListItem", "position": 2, "name": "حاسبات البناء بالعربية", "item": "https://buildmetric-app.vercel.app/ar/calculators" },
        { "@type": "ListItem", "position": 3, "name": config.title, "item": canonicalUrl }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": config.title,
      "url": canonicalUrl,
      "applicationCategory": "EducationalApplication",
      "inLanguage": "ar",
      "description": config.metaDescription
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": config.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    }
  ];

  return (
    <div dir="rtl" className="py-8 bg-slate-50 min-h-screen text-right font-sans">
      <SEO
        title={config.seoTitle}
        description={config.metaDescription}
        canonicalUrl={canonicalUrl}
        jsonLd={jsonLd}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-semibold">
          <button
            onClick={() => navigate('/calculators')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#0F2D5C] hover:border-[#0F2D5C] transition-colors shadow-sm cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>جميع الحاسبات الإنشائية</span>
          </button>

          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            <span className="hover:text-slate-800 cursor-pointer" onClick={() => navigate('/')}>الرئيسية</span>
            <span>/</span>
            <span className="hover:text-slate-800 cursor-pointer" onClick={() => navigate('/ar/calculators')}>حاسبات البناء</span>
            <span>/</span>
            <span className="text-[#0F2D5C] font-bold">{config.title}</span>
          </div>
        </div>

        {/* Hero Card with H1 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>حاسبة هندسية معتمدة وفق كود البناء والمواصفات القياسية</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            {config.h1}
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed max-w-4xl">
            {config.intro}
          </p>
        </div>

        {/* Interactive Engine (Specifically for block calculator or general tools) */}
        {config.id === 'block-quantity-calculator' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                حساب عدد البلوك والمونة لمشروعك فوراً
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                أدخل أبعاد الجدار ومساحة الفتحات للحصول على جدول الكميات التفصيلي للبلك والأسمنت والبطحاء.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  طول الجدار الكلي (متر)
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={wallLength}
                  onChange={(e) => setWallLength(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ارتفاع الجدار (متر)
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.1"
                  value={wallHeight}
                  onChange={(e) => setWallHeight(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  مساحة الأبواب والنوافذ (م²)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={openingsArea}
                  onChange={(e) => setOpeningsArea(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  نسبة هالك وتكسير البلك (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  step="1"
                  value={wastagePct}
                  onChange={(e) => setWastagePct(parseFloat(e.target.value) || 5)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0F2D5C] focus:ring-2 focus:ring-[#0F2D5C]/20 outline-none text-sm font-semibold"
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="bg-gradient-to-br from-[#0F2D5C] to-[#163c78] text-white rounded-2xl p-5 sm:p-6 space-y-4 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#F4B400] font-bold">النتيجة النهائية للمباني</span>
                  <h4 className="text-xl font-black text-white">إجمالي كميات البلوك والمونة المطلوبة</h4>
                </div>
                <div className="text-right sm:text-left">
                  <span className="text-xs text-blue-200 block">عدد البلك المطلوب (شامل الهالك)</span>
                  <span className="text-3xl font-mono font-black text-[#F4B400]">{totalBlocks.toLocaleString()} بلكة</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <span className="text-xs text-blue-200 block">المساحة الصافية</span>
                  <span className="text-lg font-mono font-bold text-white block mt-0.5">{netArea.toFixed(1)} م²</span>
                  <span className="text-[11px] text-slate-300 block">بعد خصم الفتحات</span>
                </div>

                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <span className="text-xs text-blue-200 block">عدد البلك النظري</span>
                  <span className="text-lg font-mono font-bold text-white block mt-0.5">{Math.ceil(netArea * blocksPerM2)} بلكة</span>
                  <span className="text-[11px] text-slate-300 block">بدون نسبة الهالك</span>
                </div>

                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <span className="text-xs text-blue-200 block">أسمنت المونة (50 كجم)</span>
                  <span className="text-lg font-mono font-bold text-[#F4B400] block mt-0.5">{mortarCementBags} كيس</span>
                  <span className="text-[11px] text-slate-300 block">للبناء والمونة</span>
                </div>

                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <span className="text-xs text-blue-200 block">رمل المونة (بطحاء)</span>
                  <span className="text-lg font-mono font-bold text-white block mt-0.5">{mortarSandM3} م³</span>
                  <span className="text-[11px] text-slate-300 block">رمل ناعم نظيف</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Formula Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] flex items-center gap-1.5">
            <Calculator className="w-4 h-4 text-[#F4B400]" />
            <span>المعادلات الهندسية المعتمدة</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {config.formulaTitle}
          </h2>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 font-mono text-xs text-slate-800">
            {config.formulas.map((formula, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-[#F4B400] font-bold">•</span>
                <span>{formula}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pt-1">
            {config.methodology}
          </p>
        </div>

        {/* Worked Example */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>مثال عملي وحسابات تفصيلية</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            {config.workedExample.title}
          </h2>
          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed whitespace-pre-line font-medium">
            {config.workedExample.details}
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900">
            النتيجة النهائية للمثال: {config.workedExample.result}
          </div>
        </div>

        {/* Assumptions & Standards */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>الفرضيات والمواصفات القياسية</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            الاشتراطات المعيارية
          </h3>
          <ul className="space-y-2 text-xs text-slate-600">
            {config.assumptions.map((assump, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" />
                <span>{assump}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Related Calculators Links */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            حاسبات إنشائية ذات صلة
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {config.related.map((rel, idx) => (
              <button
                key={idx}
                onClick={() => {
                  navigate(rel.path);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#0F2D5C] hover:bg-blue-50/50 transition-all text-xs font-bold text-slate-800 hover:text-[#0F2D5C] cursor-pointer text-right"
              >
                <span>{rel.title}</span>
                <ArrowLeft className="w-3.5 h-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0F2D5C] flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#F4B400]" />
            <span>الأسئلة الشائعة حول {config.title}</span>
          </div>
          <div className="space-y-4">
            {config.faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <h4 className="font-bold text-sm text-slate-900">{faq.q}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

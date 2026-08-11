import { CategoryInfo, CalculatorMeta } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'concrete',
    name: 'Concrete & Cement',
    description: 'Calculate wet & dry concrete volume, mix ratios, cement bags, sand & coarse aggregates.',
    iconName: 'Box',
    color: 'bg-blue-600',
    count: 7,
  },
  {
    id: 'steel',
    name: 'Steel & Rebar',
    description: 'Estimate rebar steel weight per meter, total tonnage, cutting lengths, and lap splices.',
    iconName: 'Layers',
    color: 'bg-slate-700',
    count: 3,
  },
  {
    id: 'masonry',
    name: 'Masonry & Bricks',
    description: 'Calculate standard brick quantity, plastering mortar volume, cement bags, and concrete blocks.',
    iconName: 'Building2',
    color: 'bg-amber-600',
    count: 4,
  },
  {
    id: 'flooring',
    name: 'Flooring & Tiles',
    description: 'Determine total floor/wall tiles, wastage margins, flooring material pieces, and box counts.',
    iconName: 'Grid',
    color: 'bg-emerald-600',
    count: 2,
  },
  {
    id: 'painting',
    name: 'Painting & Finishes',
    description: 'Compute wall paint coverage, primer quantities, and coat bucket estimations.',
    iconName: 'Paintbrush',
    color: 'bg-violet-600',
    count: 1,
  },
  {
    id: 'earthwork',
    name: 'Earthwork & Foundation',
    description: 'Calculate pit excavation volume in CFT/m³ and soil backfill compaction requirements.',
    iconName: 'Shovel',
    color: 'bg-amber-700',
    count: 2,
  },
  {
    id: 'structural',
    name: 'Structural Elements',
    description: 'Dedicated concrete & rebar estimators for footings, columns, beams, and suspended slabs.',
    iconName: 'Boxes',
    color: 'bg-indigo-600',
    count: 4,
  },
  {
    id: 'cost',
    name: 'Cost Estimation',
    description: 'Overall project budget estimator, material cost breakdown, and labor rates.',
    iconName: 'Calculator',
    color: 'bg-green-600',
    count: 1,
  },
  {
    id: 'boq',
    name: 'BOQ & Quantity',
    description: 'Bill of Quantities generator with dynamic line item management, rates, and printable reports.',
    iconName: 'FileSpreadsheet',
    color: 'bg-cyan-600',
    count: 1,
  },
  {
    id: 'converters',
    name: 'Unit Converters & Geometry',
    description: 'Convert length, area, volume, weight, and calculate 2D area / 3D volume geometrical shapes.',
    iconName: 'ArrowRightLeft',
    color: 'bg-sky-600',
    count: 5,
  },
];

export const CALCULATORS: CalculatorMeta[] = [
  // 1. Concrete Calculator
  {
    id: 'concrete-calculator',
    title: 'Concrete Volume & Mix Calculator',
    shortDescription: 'Calculate wet & dry concrete volume, cement bags, sand (cft/tons), and coarse aggregate.',
    fullDescription: 'Comprehensive concrete estimation tool for slab, beam, column, and footing casting. Supports nominal mix grades (M5, M7.5, M10, M15, M20, M25) and custom volumetric proportions using the standard 1.54 dry volume conversion factor.',
    categoryId: 'concrete',
    iconName: 'Box',
    popular: true,
    featured: true,
    tags: ['Concrete', 'Cement Bags', 'Sand', 'Aggregate', 'Mix Ratio', 'M20', 'M25', 'Civil Engineering'],
    formulaSummary: 'Dry Volume = Wet Volume × 1.54 | Cement Bags = Dry Volume × (Cement Ratio / Total Ratio) / 1.226 Cft',
    seoTitle: 'Free Concrete Calculator - Calculate Cement Bags, Sand & Aggregates | BuildMetric',
    seoMetaDescription: 'Accurate online concrete volume calculator for builders & civil engineers. Calculate cement bags, sand volume in CFT, and coarse aggregate for M5 to M25 mix ratios.',
    faqs: [
      {
        question: 'Why do we multiply wet concrete volume by 1.54 for dry volume?',
        answer: 'When dry materials (cement, sand, aggregate) are mixed with water, fine sand particles fill the void spaces between coarse aggregates. Multiplying wet volume by 1.54 accounts for this 54% void ratio reduction.'
      },
      {
        question: 'How many cubic feet (CFT) are in a standard 50 kg cement bag?',
        answer: 'One standard 50 kg cement bag has a volume of approximately 1.226 CFT (or 0.0347 cubic meters).'
      },
      {
        question: 'What is the difference between nominal mix and design mix concrete?',
        answer: 'Nominal mixes (like M20 = 1:1.5:3) use volumetric ratios for small-to-medium residential work. Design mixes are engineered in labs based on aggregate grading and compressive strength tests.'
      },
      {
        question: 'How much water is required per bag of cement in M20 concrete?',
        answer: 'For M20 concrete with a 0.45 to 0.50 water-cement ratio, approximately 22.5 to 25 liters of clean water are required per 50 kg bag of cement.'
      },
      {
        question: 'What wastage margin should be allowed for concrete slab casting?',
        answer: 'Allowing 3% to 5% wastage buffer is standard to account for formwork deflection, site spillage, and pump line losses.'
      }
    ]
  },

  // 2. Cement Calculator
  {
    id: 'cement-calculator',
    title: 'Cement Quantity Calculator',
    shortDescription: 'Determine total 50kg cement bags for specified concrete or plaster volume.',
    fullDescription: 'Quick dedicated cement estimator for concrete mixes and masonry plastering. Converts cubic feet or cubic meters into exact 50kg cement bag requirements with dry volume expansion (1.54) and 1.226 CFT per bag factor.',
    categoryId: 'concrete',
    iconName: 'Box',
    popular: true,
    featured: true,
    tags: ['Cement', 'Cement Bags', 'Concrete', 'Plaster', 'Quantity Estimator'],
    formulaSummary: 'Cement Bags = Dry Volume × (Cement Ratio / Total Ratio) / 1.226 CFT',
    seoTitle: 'Cement Calculator - Find Number of Cement Bags for Concrete | BuildMetric',
    seoMetaDescription: 'Calculate cement bags needed for any concrete volume or plastering job based on mix proportions.',
    faqs: [
      {
        question: 'How much does one bag of cement weigh?',
        answer: 'A standard industrial cement bag weighs 50 kg (approx 110 lbs).'
      },
      {
        question: 'How many cement bags are required for 1 cubic meter of M20 concrete?',
        answer: 'For 1 cubic meter of M20 (1:1.5:3) concrete, approx 8.0 to 8.2 bags of 50 kg cement are required including dry factor (1.54).'
      },
      {
        question: 'What is the storage life of OPC and PPC cement bags on site?',
        answer: 'Cement should ideally be used within 90 days of manufacturing. Store bags raised on wooden pallets away from damp floors and moist walls.'
      },
      {
        question: 'How do I calculate cement requirement for wall plastering?',
        answer: 'Multiply wall area by plaster thickness to get wet volume, expand by 1.33 for dry factor, divide by mix ratio sum (e.g. 1+4=5), and divide cement volume by 1.226 CFT.'
      },
      {
        question: 'What is the bulk density of Portland cement?',
        answer: 'Standard Portland cement bulk density is approximately 1,440 kg/m³ (90 lbs/ft³).'
      }
    ]
  },

  // 3. Sand Calculator
  {
    id: 'sand-calculator',
    title: 'Sand Volume & Weight Calculator',
    shortDescription: 'Calculate river sand or M-Sand quantity in cubic feet, cubic meters, and metric tons.',
    fullDescription: 'Calculate sand requirements for concrete mixtures, brickwork mortar, and wall plastering. Converts between CFT, cubic meters, metric tons, and traditional brass units.',
    categoryId: 'concrete',
    iconName: 'Box',
    popular: false,
    tags: ['Sand', 'M-Sand', 'River Sand', 'CFT', 'Tons', 'Brass', 'Mortar'],
    formulaSummary: 'Sand Volume (CFT) = Dry Volume × (Sand Ratio / Total Ratio) | Tons = Volume (CUM) × Density (~1600 kg/m³) / 1000',
    seoTitle: 'Sand Calculator - Calculate Sand in CFT, Tons & Brass | BuildMetric',
    seoMetaDescription: 'Find sand quantity in CFT, cubic meters, and tons for concrete mixes and brick masonry plastering.',
    faqs: [
      {
        question: 'What is 1 Brass of sand?',
        answer: 'In Asian construction terms, 1 Brass equals 100 cubic feet (CFT) or approximately 2.83 cubic meters.'
      },
      {
        question: 'What is the density of river sand vs manufactured sand (M-Sand)?',
        answer: 'Dry river sand density ranges from 1550 to 1600 kg/m³, while Manufactured Sand (M-Sand) density ranges from 1650 to 1750 kg/m³.'
      },
      {
        question: 'Why is silt content testing critical before using river sand in concrete?',
        answer: 'Excess silt (above 8%) reduces bond strength between cement paste and aggregates, causing shrinkage cracks and lowered compressive strength.'
      },
      {
        question: 'How do I convert sand volume from CFT to metric tons?',
        answer: 'Multiply CFT by 0.028317 to get cubic meters, then multiply by density (~1600 kg/m³) and divide by 1000 to get tons (approx 1 CFT ≈ 0.045 metric tons).'
      },
      {
        question: 'What is the ideal sand zone for RCC structural concrete?',
        answer: 'Zone II coarse-to-medium sand according to IS 383 standards is recommended for RCC concrete casting.'
      }
    ]
  },

  // 4. Aggregate Calculator
  {
    id: 'aggregate-calculator',
    title: 'Coarse Aggregate Calculator',
    shortDescription: 'Compute gravel/aggregate (10mm, 20mm, 40mm) volume in CFT and metric tons.',
    fullDescription: 'Accurately estimate crushed stone aggregate volume and weight required for foundations, slabs, and footings based on structural concrete grade.',
    categoryId: 'concrete',
    iconName: 'Box',
    popular: false,
    tags: ['Aggregate', 'Gravel', 'Crushed Stone', '10mm', '20mm', 'CFT', 'Tons'],
    formulaSummary: 'Aggregate CFT = Dry Volume × (Aggregate Ratio / Total Ratio) | Tons = Volume × Density (~1450-1600 kg/m³)',
    seoTitle: 'Coarse Aggregate Calculator - Calculate Gravel/Stone in CFT & Tons | BuildMetric',
    seoMetaDescription: 'Calculate coarse aggregate requirements in cubic feet (CFT) and tons for concrete construction.',
    faqs: [
      {
        question: 'What size aggregate is best for RCC slab casting?',
        answer: '20mm down aggregates (mixed with 10mm aggregates in 60:40 ratio) are standard for Reinforced Cement Concrete (RCC) slabs and beams.'
      },
      {
        question: 'What is the average bulk density of coarse aggregate?',
        answer: 'Crushed granite or basalt coarse aggregate has a loose bulk density of approximately 1,450 to 1,600 kg/m³ (90-100 lbs/ft³).'
      },
      {
        question: 'What is the difference between 10mm, 20mm, and 40mm coarse aggregate?',
        answer: '10mm is used for thin sections and dense rebar spacing; 20mm is standard for slabs, beams, and columns; 40mm is used for mass concrete foundations and PCC.'
      },
      {
        question: 'How many CFT of aggregate are needed per cubic meter of M20 concrete?',
        answer: '1 cubic meter of M20 concrete requires approximately 30 cubic feet (0.85 cubic meters or ~1.35 metric tons) of coarse aggregate.'
      },
      {
        question: 'Why should coarse aggregates be washed before concrete mixing?',
        answer: 'Dust coating on unwashed stone aggregates prevents proper cement paste adhesion, reducing concrete bond strength.'
      }
    ]
  },

  // 5. Concrete Mix Calculator
  {
    id: 'concrete-mix-calculator',
    title: 'General Concrete Mix Calculator',
    shortDescription: 'Instant mix proportion calculator for grades M5 to M25 concrete.',
    fullDescription: 'Select any standard concrete grade (M5, M7.5, M10, M15, M20, M25) and enter wet volume to calculate dry volume, cement bags, sand, coarse aggregate, and water requirements.',
    categoryId: 'concrete',
    iconName: 'Layers',
    popular: false,
    tags: ['Concrete Mix', 'M20', 'M25', 'M15', 'Dry Volume', 'Batching'],
    formulaSummary: 'Dry Vol = Wet Vol × 1.54 | Cement = Dry Vol × (1 / Sum of Parts)',
    seoTitle: 'Concrete Mix Calculator - M5, M10, M15, M20, M25 Proportions | BuildMetric',
    seoMetaDescription: 'Free concrete mix ratio batching calculator. Find dry volume, cement bags, sand CFT, and aggregate for any concrete grade.',
    faqs: [
      {
        question: 'What is the mix ratio for M20 concrete?',
        answer: 'M20 grade concrete has a nominal mix ratio of 1 : 1.5 : 3 (1 part cement, 1.5 parts sand, 3 parts coarse aggregate).'
      },
      {
        question: 'What does "M" stand for in concrete grades like M20 and M25?',
        answer: '"M" stands for Mix. The number indicates the characteristic compressive strength in N/mm² (MPa) after 28 days of water curing.'
      },
      {
        question: 'How do I adjust water-cement ratio for different concrete grades?',
        answer: 'Higher strength grades (M25+) require lower water-cement ratios (~0.40 to 0.45), while lower grades (M10-M15) use ratios around 0.50 to 0.55.'
      },
      {
        question: 'When should I use M25 grade instead of M20 grade concrete?',
        answer: 'M25 (1:1:2 mix) is required for heavily loaded RCC columns, long-span beams, water tanks, and aggressive environmental exposures.'
      },
      {
        question: 'What is the compressive strength of M20 concrete after 28 days of curing?',
        answer: 'M20 concrete achieves a minimum characteristic compressive cube strength of 20 N/mm² (approx 2,900 PSI) after 28 days of continuous moist curing.'
      }
    ]
  },

  // 6. Mortar Calculator
  {
    id: 'mortar-calculator',
    title: 'Mortar Volume & Cement Calculator',
    shortDescription: 'Calculate wet & dry mortar volume, cement bags, and sand CFT for masonry joints.',
    fullDescription: 'Estimate wet and dry mortar required for brickwork or pointing. Uses the standard 1.33 dry volume multiplier for mortar and calculates cement bags and sand CFT.',
    categoryId: 'concrete',
    iconName: 'Box',
    popular: false,
    tags: ['Mortar', 'Cement Mortar', 'Masonry', 'Sand', 'Dry Volume 1.33'],
    formulaSummary: 'Dry Mortar Vol = Wet Vol × 1.33 | Cement Bags = Dry Vol × (1 / Total Parts) / 1.226 CFT',
    seoTitle: 'Mortar Calculator - Estimate Cement & Sand for Mortar | BuildMetric',
    seoMetaDescription: 'Calculate cement bags and sand CFT required for brick masonry mortar joints (1:3 to 1:6 mix ratios).',
    faqs: [
      {
        question: 'What dry factor is used for mortar calculations?',
        answer: 'Mortar calculations use a dry factor of 1.33 (33% shrinkage allowance) when converting wet mortar to dry materials.'
      },
      {
        question: 'What is the recommended mortar mix ratio for load-bearing brick walls?',
        answer: '1:4 or 1:5 (1 part cement to 4 or 5 parts sand) is standard for load-bearing brick walls. 1:6 is used for non-load bearing interior walls.'
      },
      {
        question: 'How much sand is required per bag of cement for 1:4 mortar?',
        answer: 'For a 1:4 mix ratio, 1 bag of cement (1.226 CFT) requires approximately 4.9 CFT of sand.'
      },
      {
        question: 'What is the maximum recommended time to use mixed cement mortar?',
        answer: 'Cement mortar should be placed within 30 to 45 minutes of adding water before initial cement setting begins.'
      },
      {
        question: 'Why should bricks be thoroughly soaked in water before laying with mortar?',
        answer: 'Dry bricks absorb water from wet mortar, weakening the cement hydration process and causing poor bond strength and wall cracks.'
      }
    ]
  },

  // 7. Steel Rebar Weight Calculator
  {
    id: 'steel-weight-calculator',
    title: 'Steel Rebar Weight Calculator',
    shortDescription: 'Compute steel reinforcement bar weight per meter, total weight in kg and metric tons.',
    fullDescription: 'Fast and reliable steel quantity estimator for rebar diameter from 6mm to 40mm. Uses the standard civil engineering weight formula D²/162.2 for circular steel bars.',
    categoryId: 'steel',
    iconName: 'Layers',
    popular: true,
    featured: true,
    tags: ['Steel', 'Rebar', 'Reinforcement', 'Structural', 'Weight', 'Kg', 'Tons'],
    formulaSummary: 'Weight per meter (kg/m) = D² / 162.2 | Total Weight = Weight per meter × Length × Quantity',
    seoTitle: 'Steel Rebar Weight Calculator - Calculate Steel Weight per Meter & Tons | BuildMetric',
    seoMetaDescription: 'Calculate rebar steel bar weight using formula D²/162.2. Instant weight in kg, metric tons, and price estimation for construction projects.',
    faqs: [
      {
        question: 'How is the D²/162.2 steel bar formula derived?',
        answer: 'Steel density is ~7850 kg/m³. Area of circular rebar = (π/4) × (D/1000)². Weight per meter = Area × 7850 = π/4 × D² / 1,000,000 × 7850 ≈ D² / 162.198 (rounded to 162.2).'
      },
      {
        question: 'What is the weight of a 12mm steel bar per meter?',
        answer: '12² / 162.2 = 144 / 162.2 ≈ 0.888 kg per meter (or ~10.65 kg per standard 12m length).'
      },
      {
        question: 'What is the standard length of a factory-supplied TMT steel bar?',
        answer: 'Standard TMT reinforcement bars are manufactured in lengths of 12 meters (approx 39.37 feet).'
      },
      {
        question: 'How do I convert steel rebar weight from kilograms to metric tons?',
        answer: 'Divide total steel weight in kilograms by 1,000 (e.g. 2,500 kg = 2.5 metric tons).'
      },
      {
        question: 'What steel grade (Fe415, Fe500, Fe550D) should be used for residential buildings?',
        answer: 'Fe500 or Fe550D TMT bars offer high yield strength, superior ductility, and earthquake resistance, making them ideal for residential RCC structures.'
      }
    ]
  },

  // 8. Rebar / Steel Bar Calculator
  {
    id: 'rebar-calculator',
    title: 'Advanced Rebar Quantity Calculator',
    shortDescription: 'Estimate rebar weight for preset diameters 6mm, 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm.',
    fullDescription: 'Interactive rebar estimator with quick standard diameter buttons (6mm, 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm). Computes total length, weight per meter (D²/162.2), total kg, and metric tons.',
    categoryId: 'steel',
    iconName: 'Layers',
    popular: false,
    tags: ['Rebar', 'Steel Diameter', '12mm', '16mm', 'TMT Bar', 'Reinforcement'],
    formulaSummary: 'Unit Weight = D² / 162.2 kg/m | Total Weight = Unit Weight × Total Length',
    seoTitle: 'Rebar Steel Calculator - 8mm, 10mm, 12mm, 16mm Steel Weight | BuildMetric',
    seoMetaDescription: 'Advanced rebar calculator with preset steel diameters. Calculate weight in kg and tons for TMT bars.',
    faqs: [
      {
        question: 'What is the weight of a 12mm steel bar per meter?',
        answer: '12² / 162.2 = 144 / 162.2 ≈ 0.888 kg per meter (or ~10.65 kg per standard 12m length).'
      },
      {
        question: 'How many 12mm steel bars are in 1 metric ton?',
        answer: '1 metric ton = 1000 kg. A 12m bar of 12mm weighs 10.65 kg. Therefore, 1000 / 10.65 ≈ 93.8 bars per metric ton.'
      },
      {
        question: 'What is the weight of 16mm rebar per standard 12-meter bar?',
        answer: '16² / 162.2 = 1.578 kg/m. For a 12m bar: 1.578 × 12 = 18.94 kg per bar.'
      },
      {
        question: 'What steel diameter is typically used for main reinforcement in RCC columns?',
        answer: '12mm, 16mm, 20mm, and 25mm rebar are commonly used for main longitudinal column bars depending on building height.'
      },
      {
        question: 'How does rebar corrosion affect concrete structural durability?',
        answer: 'Corroding rebar expands up to 6 times its original volume, producing internal tensile stresses that crack and spall surrounding concrete.'
      }
    ]
  },

  // 9. Steel Bar Cutting / Length Calculator
  {
    id: 'steel-cutting-calculator',
    title: 'Steel Bar Cutting & Lap Length Calculator',
    shortDescription: 'Calculate total steel length including lap splices and total reinforcement weight.',
    fullDescription: 'Accounts for lap splice lengths and lap quantities when extending rebar cages in long columns, beams, or slabs. Computes total cut length, total kg, and metric tons.',
    categoryId: 'steel',
    iconName: 'Scissors',
    popular: false,
    tags: ['Steel Cutting', 'Lap Length', 'Rebar Lapping', 'Bar Bending Schedule', 'BBS'],
    formulaSummary: 'Total Length = Bars × (Length + Lap Length × Laps) | Total Weight = Total Length × (D² / 162.2)',
    seoTitle: 'Steel Cutting & Lap Length Calculator - Bar Schedule Tool | BuildMetric',
    seoMetaDescription: 'Calculate rebar cut length, lap splice additions, and total steel weight in kg and metric tons.',
    faqs: [
      {
        question: 'What is standard lap length in rebar construction?',
        answer: 'Standard lap length for steel rebar in tension is typically 50d (50 times bar diameter) or 40d in compression.'
      },
      {
        question: 'Why should rebar lap splices be staggered in beams and columns?',
        answer: 'Staggering lap splices prevents structural weak planes, ensuring load transfer continuity under flexural or axial forces.'
      },
      {
        question: 'What is the recommended bend deduction for 90-degree and 135-degree stirrup hooks?',
        answer: 'Standard bend deductions: 90° bend = 2d; 135° stirrup hook = 3d deduction from outer cut length.'
      },
      {
        question: 'How do I calculate total cutting length for column rebar with lap splices?',
        answer: 'Cut Length = Structural Column Height + Lap Length (50d) + Top/Bottom Anchorage Hooks (e.g. 300mm L-bends).'
      },
      {
        question: 'What is the maximum percentage of rebar lap allowed at a single column cross-section?',
        answer: 'Standard building codes dictate that no more than 50% of column bars should be spliced at the same vertical section.'
      }
    ]
  },

  // 10. Brick Wall Calculator
  {
    id: 'brick-calculator',
    title: 'Brick Wall & Mortar Calculator',
    shortDescription: 'Estimate total bricks, mortar volume, cement bags, and sand required for wall construction.',
    fullDescription: 'Calculate standard red bricks or fly ash blocks for any wall size. Deducts door and window openings automatically, incorporates mortar joint thickness, and adds a safety wastage percentage.',
    categoryId: 'masonry',
    iconName: 'Building2',
    popular: true,
    featured: true,
    tags: ['Bricks', 'Wall', 'Mortar', 'Fly Ash', 'Masonry', 'Cement', 'Sand'],
    formulaSummary: 'Wall Volume / Single Brick Volume with Mortar = Number of Bricks | Mortar Volume = Wall Volume - (Bricks × Brick Volume without Mortar)',
    seoTitle: 'Brick & Mortar Calculator - Calculate Bricks and Cement for Walls | BuildMetric',
    seoMetaDescription: 'Free wall brick calculator. Estimate total bricks required, mortar cubic feet, cement bags, and sand with door/window deductions.',
    faqs: [
      {
        question: 'What is the standard size of a construction brick?',
        answer: 'Standard brick dimensions without mortar are typically 190 mm × 90 mm × 90 mm (approx 9" × 4.25" × 2.75"). With 10 mm mortar, nominal size is 200 mm × 100 mm × 100 mm.'
      },
      {
        question: 'How many bricks are needed for a 9-inch thick wall per 100 sq ft?',
        answer: 'For a 9-inch (225mm) thick double-brick wall, approx 1,000 to 1,100 standard bricks are required per 100 sq ft of wall area.'
      },
      {
        question: 'How do I deduct door and window openings in brick wall estimations?',
        answer: 'Calculate total face area of doors/windows (Width × Height), subtract from gross wall area, and multiply net wall area by wall thickness.'
      },
      {
        question: 'What mortar joint thickness should be assumed for brick masonry?',
        answer: 'Standard mortar joint thickness ranges between 10 mm and 12 mm (3/8" to 1/2").'
      },
      {
        question: 'What percentage of brick wastage should be allowed on construction sites?',
        answer: 'Allow 5% wastage for standard straight walls and 7% to 10% for intricate walls with frequent corner cuts.'
      }
    ]
  },

  // 11. Concrete Block Calculator
  {
    id: 'block-calculator',
    title: 'Concrete Block Calculator',
    shortDescription: 'Compute solid/hollow concrete blocks, mortar volume, and wastage for masonry walls.',
    fullDescription: 'Calculate concrete blocks (CMU) for exterior or boundary walls. Supports custom block lengths and heights, mortar joints, and wastage buffers.',
    categoryId: 'masonry',
    iconName: 'Building2',
    popular: false,
    tags: ['Concrete Block', 'CMU', 'Hollow Block', 'Masonry Wall', 'Mortar'],
    formulaSummary: 'Block Module Vol = (Length + Mortar) × (Height + Mortar) × Width | Total Blocks = Wall Vol / Module Vol + Wastage',
    seoTitle: 'Concrete Block Calculator - Estimate CMU Blocks & Mortar | BuildMetric',
    seoMetaDescription: 'Free concrete block wall calculator. Find exact hollow or solid block counts and mortar cubic feet for wall building.',
    faqs: [
      {
        question: 'What is the standard size of a concrete hollow block?',
        answer: 'Standard CMU block dimensions are 400 mm × 200 mm × 200 mm (approx 16" × 8" × 8").'
      },
      {
        question: 'How many concrete blocks are required per 100 sq ft of wall?',
        answer: 'For standard 16" × 8" CMU blocks with 10mm mortar joints, approximately 1125 blocks are needed per 1000 sq ft (~113 blocks per 100 sq ft).'
      },
      {
        question: 'What are the structural benefits of hollow concrete blocks over solid red bricks?',
        answer: 'CMU hollow blocks speed up wall construction, reduce dead load on foundations, improve thermal/acoustic insulation, and require less mortar.'
      },
      {
        question: 'How much mortar is required to lay 100 concrete blocks?',
        answer: 'Laying 100 standard CMU blocks requires approximately 3.5 to 4.5 CFT of wet mortar.'
      },
      {
        question: 'Should CMU block walls be reinforced with horizontal steel rebar ladder mesh?',
        answer: 'Yes, ladder mesh or rebar joint reinforcement every 2-3 courses prevents cracking from thermal expansion and foundation settlement.'
      }
    ]
  },

  // 12. Plaster Calculator
  {
    id: 'plaster-calculator',
    title: 'Wall Plaster Cement & Sand Calculator',
    shortDescription: 'Calculate cement bags and sand CFT for wall plastering (12mm, 15mm, 20mm thickness).',
    fullDescription: 'Accurately estimate cement bags and sand required for single or double coat wall plastering. Supports 1:3, 1:4, 1:5, 1:6 mix ratios with 1.33 dry mortar factor.',
    categoryId: 'masonry',
    iconName: 'Building2',
    popular: true,
    tags: ['Plaster', 'Wall Plastering', 'Cement Bags', 'Sand CFT', '12mm Plaster'],
    formulaSummary: 'Wet Vol = Area × Thickness | Dry Vol = Wet Vol × 1.33 | Cement = Dry Vol × (1 / Ratio Sum) / 1.226',
    seoTitle: 'Plaster Calculator - Find Cement Bags & Sand for Wall Plaster | BuildMetric',
    seoMetaDescription: 'Calculate cement bags and sand CFT for 12mm, 15mm, or 20mm wall plastering with 1:4 mix ratio.',
    faqs: [
      {
        question: 'What is the standard plaster thickness for internal walls?',
        answer: 'Internal wall plaster is typically 12 mm thick, while external wall double-coat plaster ranges from 18 mm to 20 mm.'
      },
      {
        question: 'What mix ratio is best for ceiling plastering?',
        answer: 'A rich 1:3 or 1:4 cement-sand mix ratio at 6mm thickness is recommended for smooth ceiling plastering.'
      },
      {
        question: 'How many bags of cement are needed for 100 sq ft of 12mm wall plaster?',
        answer: 'For 100 sq ft of 12mm wall plaster with a 1:4 mix ratio, approximately 0.85 to 0.90 bags of 50 kg cement and 4.2 CFT of sand are required.'
      },
      {
        question: 'Why do cracks appear in wall plaster, and how can they be prevented?',
        answer: 'Cracks occur due to high water-cement ratio, rapid drying in sunlight, or poor sand grading. Prevent by curing with water for 7 days.'
      },
      {
        question: 'How many days of water curing are required for fresh wall plaster?',
        answer: 'Freshly applied cement wall plaster requires 7 to 10 days of continuous water curing to achieve maximum durability.'
      }
    ]
  },

  // 13. Floor & Wall Tile Calculator
  {
    id: 'tile-calculator',
    title: 'Floor & Wall Tile Calculator',
    shortDescription: 'Calculate total floor and wall tiles, wastage buffer, and box quantities.',
    fullDescription: 'Estimate ceramic, vitrified, or marble tiles for living rooms, bathrooms, kitchens, and wall cladding. Includes room perimeter skirting calculations and box packaging limits.',
    categoryId: 'flooring',
    iconName: 'Grid',
    popular: true,
    featured: true,
    tags: ['Tile', 'Flooring', 'Vitrified Tiles', 'Ceramic', 'Bathroom', 'Boxes', 'Wastage'],
    formulaSummary: 'Total Area = Room Area + Skirting Area | Total Tiles = (Total Area / Single Tile Area) × (1 + Wastage %)',
    seoTitle: 'Tile Calculator - Calculate Floor & Wall Tiles Needed | BuildMetric',
    seoMetaDescription: 'Free tile calculator for room floors and walls. Calculates exact tile count, wastage percentage, box counts, and adhesive requirement.',
    faqs: [
      {
        question: 'What percentage of tile wastage should I assume?',
        answer: 'Standard straight pattern tiles require 5% to 10% wastage buffer. For diagonal or complex herringbone cuts, allow 12% to 15% wastage.'
      },
      {
        question: 'How do I calculate floor area and skirting tile requirements?',
        answer: 'Multiply room length by width for floor area. For skirting, multiply room perimeter by 4 inches (0.33 ft) and add to total tile square footage.'
      },
      {
        question: 'How many square feet of tile coverage are in a standard box?',
        answer: 'Standard boxes typically contain 4 pieces of 2ft×2ft tiles, offering 16 sq ft of coverage per box.'
      },
      {
        question: 'What is the difference between vitrified tiles and ceramic tiles?',
        answer: 'Vitrified tiles are less porous (<0.5% water absorption), highly durable, and ideal for heavy traffic floor areas compared to ceramic tiles.'
      },
      {
        question: 'How much tile adhesive or cement mortar is required per square foot of flooring?',
        answer: 'Pre-mixed polymer tile adhesive requires approx 0.5 to 0.8 lbs per sq ft at a 3mm to 6mm notched trowel thickness.'
      }
    ]
  },

  // 14. Flooring Calculator
  {
    id: 'flooring-calculator',
    title: 'Flooring Material Piece Calculator',
    shortDescription: 'Compute total flooring pieces, wastage, and sq ft area for hardwood, laminate, or vinyl.',
    fullDescription: 'Universal flooring quantity calculator for wood planks, laminate, vinyl tiles, and stone slabs. Computes net floor area, piece counts, and total square footage with wastage.',
    categoryId: 'flooring',
    iconName: 'Grid',
    popular: false,
    tags: ['Flooring', 'Laminate', 'Hardwood', 'Vinyl Plank', 'Floor Area'],
    formulaSummary: 'Floor Area = Length × Width | Total Pieces = (Floor Area / Piece Area) × (1 + Wastage %)',
    seoTitle: 'Flooring Calculator - Hardwood, Vinyl Plank & Tile Pieces | BuildMetric',
    seoMetaDescription: 'Calculate required flooring material pieces and square footage including wastage for any room.',
    faqs: [
      {
        question: 'How do I measure room area for flooring?',
        answer: 'Multiply room length by room width in feet or meters. For L-shaped rooms, split into two rectangular sections and sum their areas.'
      },
      {
        question: 'What wastage allowance is required for hardwood plank vs laminate flooring?',
        answer: 'Standard laminate installation requires 5% to 8% wastage, whereas hardwood planks require 10% to 12% due to end-matching trim cuts.'
      },
      {
        question: 'What underlayment is required beneath floating laminate or SPC vinyl flooring?',
        answer: 'A 2mm to 3mm foam underlayment with moisture vapor barrier is recommended to cushion planks and block ground moisture.'
      },
      {
        question: 'How do I convert room dimensions in feet into total square meters?',
        answer: 'Multiply room length in feet by width in feet to get sq ft, then divide by 10.764 to convert to square meters.'
      },
      {
        question: 'Should flooring planks be laid parallel or perpendicular to windows?',
        answer: 'Flooring planks are generally installed parallel to the main light source (windows) to minimize shadow lines at plank joints.'
      }
    ]
  },

  // 15. Paint Calculator
  {
    id: 'paint-calculator',
    title: 'Wall Paint & Coverage Calculator',
    shortDescription: 'Estimate paint liters, primer coats, and bucket sizes for internal and external walls.',
    fullDescription: 'Calculate exact liters of paint needed to paint interior or exterior walls. Deducts doors, windows, and accounts for multiple coats and primer base layer.',
    categoryId: 'painting',
    iconName: 'Paintbrush',
    popular: true,
    tags: ['Paint', 'Wall Paint', 'Emulsion', 'Primer', 'Coverage', 'Liters', 'Coats'],
    formulaSummary: 'Net Area = (Wall Area × Number of Walls) - Deductions | Paint Liters = (Net Area × Number of Coats) / Coverage per Liter',
    seoTitle: 'Paint Calculator - Calculate Wall Paint Liters & Coverage | BuildMetric',
    seoMetaDescription: 'Accurate wall paint quantity calculator. Find total liters of interior or exterior emulsion paint and primer needed for your home.',
    faqs: [
      {
        question: 'How many square feet does 1 liter of wall paint cover?',
        answer: '1 liter of standard interior emulsion paint typically covers 100 to 140 sq ft for 1 coat (or 60-70 sq ft for 2 coats on fresh wall surface).'
      },
      {
        question: 'Is 1 coat of primer necessary before applying interior wall paint?',
        answer: 'Yes, primer seals porous fresh plaster or dry wall, prevents uneven paint absorption, and improves topcoat adhesion.'
      },
      {
        question: 'How do I calculate paint liters for exterior weather-proof coating?',
        answer: 'Calculate exterior wall net area, allow for 2 finish coats (coverage ~50-60 sq ft per liter for 2 coats), and add 1 coat of exterior primer.'
      },
      {
        question: 'Should doors and windows be deducted when calculating wall painting area?',
        answer: 'Yes, subtract the total surface area of all doors and window openings from the gross wall area for accurate paint estimation.'
      },
      {
        question: 'How long should you wait between applying the first and second coats of wall paint?',
        answer: 'Wait 3 to 4 hours for interior acrylic emulsion paint to dry completely before applying the second coat.'
      }
    ]
  },

  // 16. Excavation Calculator
  {
    id: 'excavation-calculator',
    title: 'Earth Excavation Volume Calculator',
    shortDescription: 'Compute trench and footing pit excavation cubic volume in CFT and m³.',
    fullDescription: 'Calculate total soil volume to be excavated for column footings, foundation trenches, and underground tanks. Supports multiple excavation pits with CFT and m³ conversions.',
    categoryId: 'earthwork',
    iconName: 'Shovel',
    popular: false,
    tags: ['Excavation', 'Earthwork', 'Trenching', 'Footing Pit', 'CFT', 'CUM'],
    formulaSummary: 'Total Volume = Length × Width × Depth × Number of Pits',
    seoTitle: 'Excavation Calculator - Calculate Earthwork Volume in CFT & m³ | BuildMetric',
    seoMetaDescription: 'Free excavation volume calculator. Find soil cubic feet (CFT) and cubic meters (m³) for foundations and trenches.',
    faqs: [
      {
        question: 'What is swell factor in earth excavation?',
        answer: 'Excavated soil expands when removed from the ground; this swell factor typically adds 15% to 30% to the loose soil volume.'
      },
      {
        question: 'How do I calculate trench excavation volume in cubic feet (CFT)?',
        answer: 'Multiply trench length (ft) × width (ft) × depth (ft). Example: 50 ft × 3 ft × 4 ft = 600 CFT.'
      },
      {
        question: 'What safety angle of repose slope should be used for deep foundation excavation?',
        answer: 'For pit excavations deeper than 1.5 meters (5 ft), cut sides back at a 1:1 or 1:1.5 side slope to prevent trench collapse.'
      },
      {
        question: 'How do I estimate soil volume for isolated square footing pits?',
        answer: 'Multiply pit length × width × depth × total number of footing pits across the building footprint.'
      },
      {
        question: 'How is excavated soil converted from bank cubic meters to loose cubic meters?',
        answer: 'Bank volume is multiplied by the soil swell factor (approx 1.20 for cohesive clay, 1.15 for sand) to get loose truck haul volume.'
      }
    ]
  },

  // 17. Backfill Calculator
  {
    id: 'backfill-calculator',
    title: 'Soil Backfill & Compaction Calculator',
    shortDescription: 'Estimate loose soil required to backfill foundation pits with compaction allowance.',
    fullDescription: 'Determines the volume of backfill soil or gravel required to fill foundation trenches around footings. Includes compaction and shrinkage percentages.',
    categoryId: 'earthwork',
    iconName: 'Shovel',
    popular: false,
    tags: ['Backfill', 'Compaction', 'Trench Backfilling', 'Soil Volume', 'Foundation'],
    formulaSummary: 'Required Backfill = Void Volume × (1 + Compaction %)',
    seoTitle: 'Backfill Calculator - Calculate Soil Quantity for Backfilling | BuildMetric',
    seoMetaDescription: 'Calculate loose soil and gravel required for foundation backfilling including compaction shrinkage.',
    faqs: [
      {
        question: 'Why do we add a compaction percentage to backfill soil?',
        answer: 'Compacting loose soil into foundation trenches reduces air voids, requiring 15% to 20% more loose soil to achieve solid compacted volume.'
      },
      {
        question: 'What is the best material for foundation trench backfilling?',
        answer: 'Granular soils, coarse sand, or crushed gravel are best because they compact easily and drain water away from footings.'
      },
      {
        question: 'How many inches of soil layer thickness should be compacted at one time?',
        answer: 'Backfill soil should be placed and compacted in horizontal layers (lifts) no thicker than 6 to 8 inches (150-200mm).'
      },
      {
        question: 'What is the difference between loose backfill volume and compacted backfill volume?',
        answer: 'Loose soil volume occupies more space due to air pockets. Upon mechanical tamping, it shrinks by 15% to 25% to reach maximum dry density.'
      },
      {
        question: 'How do I calculate net backfill volume around foundation footings?',
        answer: 'Subtract total concrete footing and column stub volume from the gross pit excavation volume, then apply the compaction shrinkage factor.'
      }
    ]
  },

  // 18. Footing Calculator
  {
    id: 'footing-calculator',
    title: 'Footing Concrete & Mix Calculator',
    shortDescription: 'Compute concrete volume, cement bags, sand, and aggregate for foundation footings.',
    fullDescription: 'Structural footing estimator for isolated or combined column pads. Calculates wet/dry volume, cement bags, sand CFT, and coarse aggregate for M15, M20, M25 concrete.',
    categoryId: 'structural',
    iconName: 'Boxes',
    popular: false,
    tags: ['Footing', 'Foundation', 'Concrete', 'Cement Bags', 'Structural'],
    formulaSummary: 'Total Wet Vol = Footing Vol × Count × (1 + Wastage %) | Dry Vol = Wet Vol × 1.54',
    seoTitle: 'Footing Concrete Calculator - Foundation Materials Estimator | BuildMetric',
    seoMetaDescription: 'Calculate concrete volume, cement bags, sand, and aggregate required for building footings.',
    faqs: [
      {
        question: 'What grade of concrete is recommended for house footings?',
        answer: 'M20 (1:1.5:3) or M25 (1:1:2) concrete grade is standard for structural foundation footings.'
      },
      {
        question: 'How do I calculate concrete volume for sloped or trapezoidal footings?',
        answer: 'Split the footing into a bottom rectangular prism (L × W × h1) and a top trapezoidal frustum prism, calculate both volumes, and sum them.'
      },
      {
        question: 'What is clear concrete cover for underground foundation footings?',
        answer: 'A minimum clear cover of 50mm (2 inches) is required for footing reinforcement to protect rebar from ground moisture corrosion.'
      },
      {
        question: 'How many cement bags are required for 1 cubic meter of footing concrete?',
        answer: '1 cubic meter of M20 footing concrete requires approx 8.2 bags of 50kg cement.'
      },
      {
        question: 'Why is a PCC (Plain Cement Concrete) levelling layer required under footings?',
        answer: 'A 3" to 4" PCC bed (M7.5 or M10 grade) provides a clean, flat, level surface and prevents structural RCC footing concrete from mixing with soil.'
      }
    ]
  },

  // 19. Column Calculator
  {
    id: 'column-calculator',
    title: 'Column Concrete & Mix Calculator',
    shortDescription: 'Estimate concrete volume, cement bags, sand, and aggregate for RCC columns.',
    fullDescription: 'Calculate concrete materials required for casting rectangular or square reinforced concrete columns. Computes wet volume, dry volume (1.54 factor), cement bags, and aggregate.',
    categoryId: 'structural',
    iconName: 'Boxes',
    popular: true,
    tags: ['Column', 'RCC Column', 'Concrete', 'Cement Bags', 'Structural Engineering'],
    formulaSummary: 'Column Vol = Width × Length × Height | Dry Vol = Vol × 1.54',
    seoTitle: 'Column Concrete Calculator - Calculate Materials for RCC Columns | BuildMetric',
    seoMetaDescription: 'Calculate concrete volume, cement bags, sand, and aggregate required for reinforced concrete columns.',
    faqs: [
      {
        question: 'Why is M25 grade concrete used in column construction?',
        answer: 'Columns bear heavy axial compressive loads; M25 (25 N/mm² compressive strength) ensures higher structural load bearing safety.'
      },
      {
        question: 'How do I calculate wet concrete volume for rectangular columns?',
        answer: 'Multiply Column Width (ft) × Column Length (ft) × Height (ft) × Number of Columns.'
      },
      {
        question: 'What clear cover is required for structural RCC columns?',
        answer: 'Standard minimum clear cover for longitudinal reinforcement in RCC columns is 40 mm (1.5 inches).'
      },
      {
        question: 'How many columns can be poured with 1 cubic meter of M25 concrete?',
        answer: 'For a standard 9"×12" (0.225m × 0.3m) column 10 ft (3m) high (vol = 0.2025 m³), 1 cubic meter pours approximately 4.9 columns.'
      },
      {
        question: 'Why must mechanical vibrators be used during RCC column concrete compaction?',
        answer: 'Internal needle vibrators remove trapped air pockets (honeycombing) around dense steel rebar cages, ensuring dense concrete compaction.'
      }
    ]
  },

  // 20. Beam Calculator
  {
    id: 'beam-calculator',
    title: 'Beam Concrete & Material Calculator',
    shortDescription: 'Calculate wet & dry concrete, cement, sand, and stone for tie and plinth beams.',
    fullDescription: 'Estimate concrete volume and raw material quantities required for plinth beams, tie beams, and roof beams. Supports inches, feet, or meters with wastage buffers.',
    categoryId: 'structural',
    iconName: 'Boxes',
    popular: false,
    tags: ['Beam', 'Plinth Beam', 'Roof Beam', 'Concrete Volume', 'Structural'],
    formulaSummary: 'Beam Vol = Width × Depth × Length | Cement Bags = Dry Vol × (Cement / Total Parts) / 1.226',
    seoTitle: 'Beam Concrete Calculator - Plinth Beam & Roof Beam Estimator | BuildMetric',
    seoMetaDescription: 'Calculate concrete volume, cement bags, sand, and coarse aggregate for building beams.',
    faqs: [
      {
        question: 'What is the standard concrete mix for plinth beams?',
        answer: 'M20 grade concrete (1 part cement, 1.5 parts sand, 3 parts aggregate) is standard for plinth beam casting.'
      },
      {
        question: 'How do I calculate concrete volume for a T-beam or rectangular tie beam?',
        answer: 'Multiply Beam Width × Beam Depth × Total Beam Span Length. Example: 0.75 ft × 1.25 ft × 20 ft = 18.75 CFT.'
      },
      {
        question: 'What clear cover is recommended for roof and plinth beams?',
        answer: 'A minimum clear cover of 25 mm (1 inch) is specified for beam reinforcement bars according to IS 456.'
      },
      {
        question: 'How much aggregate and sand are required for 100 CFT of beam concrete?',
        answer: 'For 100 CFT of M20 beam concrete: approx 42 CFT sand (~1.9 tons) and 84 CFT aggregate (~3.6 tons).'
      },
      {
        question: 'When can beam bottom formwork shuttering be safely removed?',
        answer: 'Beam side props can be removed after 16-24 hours; beam soffit props for spans up to 6m must remain for 14 days.'
      }
    ]
  },

  // 21. Slab Calculator
  {
    id: 'slab-calculator',
    title: 'Slab Concrete & Material Calculator',
    shortDescription: 'Calculate concrete volume, cement bags, sand, and aggregate for roof slabs.',
    fullDescription: 'Calculate RCC roof slab casting materials based on length, width, and thickness (4", 5", 6"). Includes dry volume expansion factor 1.54 and wastage buffers.',
    categoryId: 'structural',
    iconName: 'Boxes',
    popular: true,
    featured: true,
    tags: ['Slab', 'Roof Slab', 'Concrete', 'Cement Bags', 'RCC Slab'],
    formulaSummary: 'Slab Vol = Area × Thickness | Dry Vol = Wet Vol × 1.54 | Cement = Dry Vol × (1 / Ratio Sum) / 1.226',
    seoTitle: 'Roof Slab Concrete Calculator - Cement Bags & Aggregate | BuildMetric',
    seoMetaDescription: 'Calculate cement bags, sand CFT, and aggregate for roof slabs. Free RCC slab concrete estimator.',
    faqs: [
      {
        question: 'How many bags of cement are needed for a 1000 sq ft slab of 5 inches thickness?',
        answer: 'For a 1000 sq ft slab with 5" thickness using M20 mix, approx 85 to 90 bags of cement are required including wastage.'
      },
      {
        question: 'What is the standard slab thickness for residential house floors?',
        answer: 'Residential RCC roof slabs are typically 4.5 to 6 inches (115mm to 150mm) thick based on structural load design.'
      },
      {
        question: 'What mix grade of concrete is best for casting RCC roof slabs?',
        answer: 'M20 grade (1:1.5:3) or M25 grade (1:1:2) is recommended for all residential RCC suspended roof slabs.'
      },
      {
        question: 'How do I account for concrete wastage during pump pouring on roof slabs?',
        answer: 'Add a 5% wastage margin to cover pump hopper residues and slab formwork level tolerances.'
      },
      {
        question: 'How many days must a roof slab be water pond cured after casting?',
        answer: 'Continuous water pond curing should be maintained on freshly cast roof slabs for at least 10 to 14 days.'
      }
    ]
  },

  // 22. Construction Cost Calculator
  {
    id: 'construction-cost-calculator',
    title: 'Building Construction Cost Estimator',
    shortDescription: 'Estimate total residential construction cost, material breakdown & labor expenses.',
    fullDescription: 'All-in-one total project budget calculator based on built-up area and quality tier (Basic, Standard, Premium). Provides itemized cost share for cement, steel, sand, aggregate, bricks, labor, and finishing.',
    categoryId: 'cost',
    iconName: 'Calculator',
    popular: true,
    featured: true,
    tags: ['Construction Cost', 'Building Estimator', 'Budget', 'House Cost', 'Labor Cost', 'Material Share'],
    formulaSummary: 'Total Budget = Built-up Area × Cost per Sq Ft | Material Breakdown based on Standard Civil Engineering Percentage Shares',
    seoTitle: 'Construction Cost Calculator - Estimate House Building Cost | BuildMetric',
    seoMetaDescription: 'Calculate complete house construction cost by built-up square footage. Detailed breakdown of cement, steel, bricks, labor, and finishing budget.',
    faqs: [
      {
        question: 'What is the average construction cost per sq ft for a house?',
        answer: 'Depending on location and specifications, basic structure costs ~$15-$25/sq ft, standard quality ~$25-$40/sq ft, and premium luxury finishing $45+/sq ft.'
      },
      {
        question: 'What percentage of total construction budget goes to material vs labor?',
        answer: 'Typically, building materials account for 60% to 70% of total budget, while labor and supervision account for 30% to 40%.'
      },
      {
        question: 'How does built-up area affect overall building project expenses?',
        answer: 'Built-up area includes all floor slab spaces, outer walls, and balconies; multiplying total built-up sq ft by unit cost provides the core structural budget.'
      },
      {
        question: 'What is the cost share allocation between foundation, RCC frame, masonry, and finishing?',
        answer: 'Rough breakdown: Foundation & Structure ~45%, Masonry & Plaster ~15%, Flooring & Tiles ~10%, Plumbing & Electrical ~12%, Painting & Finishing ~18%.'
      },
      {
        question: 'How can home builders reduce construction costs without sacrificing structural safety?',
        answer: 'Optimize room structural layout, buy cement and steel directly in bulk from distributors, and avoid late design changes mid-construction.'
      }
    ]
  },

  // 23. BOQ / Quantity Estimator
  {
    id: 'boq-estimator',
    title: 'BOQ & Quantity Bill Estimator',
    shortDescription: 'Interactive Bill of Quantities generator for project estimation and contractor bids.',
    fullDescription: 'Create custom BOQ estimates with line items, descriptions, units, quantities, and rates. Automatically calculates subtotal, tax/contingency, and generates print-ready professional PDF reports.',
    categoryId: 'boq',
    iconName: 'FileSpreadsheet',
    popular: true,
    featured: true,
    tags: ['BOQ', 'Bill of Quantities', 'Contractor Rate', 'Project Estimate', 'Costing'],
    formulaSummary: 'Item Amount = Quantity × Rate | Grand Total = Subtotal + Tax/Contingency',
    seoTitle: 'BOQ Calculator - Online Bill of Quantities & Rate Analysis Tool | BuildMetric',
    seoMetaDescription: 'Free online BOQ generator. Add construction items, quantity, rate per unit, and print formal cost estimates.',
    faqs: [
      {
        question: 'What is a Bill of Quantities (BOQ)?',
        answer: 'A BOQ is a detailed document prepared by quantity surveyors listing material quantities, labor items, and unit rates for construction tendering.'
      },
      {
        question: 'Why is a BOQ essential for contractor bidding and tender management?',
        answer: 'A BOQ ensures all bidding contractors quote rates on identical itemized quantities, creating transparent cost comparisons.'
      },
      {
        question: 'What contingency percentage should be added to a construction BOQ?',
        answer: 'A 5% to 10% contingency buffer is recommended to cover unforeseen ground condition variations or price escalation.'
      },
      {
        question: 'How do unit rates differ between labor-only contracts and full material contracts?',
        answer: 'Labor-only rates cover worker wages and equipment tools, whereas full item contracts include material procurement, freight, and tax.'
      },
      {
        question: 'How can I export my BOQ calculation into a print-ready PDF or client proposal?',
        answer: 'Click the "Print BOQ Report" button on BuildMetric to generate a formatted PDF summary or clean printed report.'
      }
    ]
  },

  // 24. Geometric Area Calculator
  {
    id: 'area-calculator',
    title: 'Geometric Area Calculator',
    shortDescription: 'Compute shape area for Rectangle, Square, Triangle, Circle, and Trapezoid.',
    fullDescription: 'Geometrical surface area calculator for plot layouts, slab geometry, and wall areas. Supports rectangle, square, triangle, circle, and trapezoid with multiple unit outputs.',
    categoryId: 'converters',
    iconName: 'Ruler',
    popular: false,
    tags: ['Area', 'Rectangle', 'Circle', 'Triangle', 'Trapezoid', 'Plot Area'],
    formulaSummary: 'Rectangle = L × W | Circle = π × r² | Triangle = 0.5 × Base × Height',
    seoTitle: 'Geometric Area Calculator - Rectangles, Circles, Triangles | BuildMetric',
    seoMetaDescription: 'Calculate surface area for plot boundaries, slabs, and walls with instant unit conversion.',
    faqs: [
      {
        question: 'How do I calculate the area of an irregular plot?',
        answer: 'Divide the irregular shape into smaller regular triangles and rectangles, calculate each sub-area, and sum them together.'
      },
      {
        question: 'What is the formula for trapezoid area calculation?',
        answer: 'Trapezoid Area = 0.5 × (Parallel Side A + Parallel Side B) × Height.'
      },
      {
        question: 'How do I convert square feet into square meters?',
        answer: 'Divide total square feet by 10.7639 (e.g. 100 sq ft / 10.7639 = 9.29 sq meters).'
      },
      {
        question: 'How do I calculate circle area for round column formwork or well excavation?',
        answer: 'Multiply π (~3.14159) by the radius squared (r²), or use π × (Diameter / 2)².'
      },
      {
        question: 'Why is accurate 2D area measurement crucial for material estimation?',
        answer: 'Surface area directly determines required quantities for floor tiles, wall plaster, paint coats, and waterproofing membranes.'
      }
    ]
  },

  // 25. Geometric Volume Calculator
  {
    id: 'volume-calculator',
    title: '3D Geometric Volume Calculator',
    shortDescription: 'Compute volume in CFT and m³ for Cuboid, Cube, Cylinder, Cone, and Sphere.',
    fullDescription: 'Calculate 3D cubic volume for concrete structures, water tanks, columns, and earthwork pits. Supports cuboid, cube, cylinder, cone, and sphere.',
    categoryId: 'converters',
    iconName: 'Ruler',
    popular: false,
    tags: ['Volume', 'Cuboid', 'Cylinder', 'Cone', 'Sphere', 'CFT', 'CUM'],
    formulaSummary: 'Cuboid = L × W × H | Cylinder = π × r² × H | Sphere = (4/3) × π × r³',
    seoTitle: '3D Geometric Volume Calculator - Cuboid, Cylinder, Cone | BuildMetric',
    seoMetaDescription: 'Calculate cubic volume in CFT and m³ for structural concrete shapes and tanks.',
    faqs: [
      {
        question: 'How do I calculate water tank volume in liters?',
        answer: 'Calculate tank volume in cubic meters and multiply by 1,000 (1 CUM = 1,000 Liters) or in CFT and multiply by 28.317 (1 CFT = 28.317 Liters).'
      },
      {
        question: 'What is the cubic meter to cubic feet (CFT) conversion factor?',
        answer: '1 cubic meter (CUM) equals 35.3147 cubic feet (CFT).'
      },
      {
        question: 'How do I calculate 3D volume for a cylindrical concrete column?',
        answer: 'Volume = π × Radius² × Column Height = 3.14159 × (Diameter/2)² × Height.'
      },
      {
        question: 'What is the volume formula for a cone or frustum earth heap?',
        answer: 'Cone Volume = (1/3) × π × Radius² × Height.'
      },
      {
        question: 'Why is 3D volume calculation the foundation of quantity surveying?',
        answer: 'Volumetric measurements drive concrete batching, earthwork excavation, concrete block counts, and tank capacity calculations.'
      }
    ]
  },

  // 26. Length Unit Converter
  {
    id: 'length-converter',
    title: 'Length Unit Converter',
    shortDescription: 'Convert between mm, cm, m, inch, feet, and yard.',
    fullDescription: 'Instant conversion between standard construction length units: millimeters, centimeters, meters, inches, feet, and yards.',
    categoryId: 'converters',
    iconName: 'ArrowRightLeft',
    popular: false,
    tags: ['Length Converter', 'Feet to Meters', 'Inches to Cm', 'Mm to Inches'],
    formulaSummary: '1 Meter = 3.28084 Feet | 1 Inch = 25.4 Mm | 1 Yard = 3 Feet',
    seoTitle: 'Length Unit Converter - Feet, Meters, Inches, Cm, Yard | BuildMetric',
    seoMetaDescription: 'Convert architectural and engineering length measurements instantly online.',
    faqs: [
      {
        question: 'How many meters are in 1 foot?',
        answer: '1 foot equals 0.3048 meters.'
      },
      {
        question: 'How do I convert millimeters to fractional inches for rebar drawings?',
        answer: 'Divide millimeters by 25.4 to get decimal inches. Example: 12mm / 25.4 = 0.472 inches (~1/2 inch).'
      },
      {
        question: 'What is 1 yard in feet and meters?',
        answer: '1 yard equals 3 feet or 0.9144 meters.'
      },
      {
        question: 'Why do site drawings mix imperial (feet-inches) and metric (mm-meters) units?',
        answer: 'Architectural floor plans often use feet/inches, while structural engineering detail drawings specify steel rebar and concrete in mm/meters.'
      },
      {
        question: 'How do I convert 100 feet to meters accurately?',
        answer: 'Multiply 100 by 0.3048 = 30.48 meters.'
      }
    ]
  },

  // 27. Area Unit Converter
  {
    id: 'area-converter',
    title: 'Area Unit Converter',
    shortDescription: 'Convert sq mm, sq cm, sq m, sq inch, sq ft, sq yard, acre, and hectare.',
    fullDescription: 'Convert land plot and building surface areas across square feet, square meters, square yards, acres, and hectares.',
    categoryId: 'converters',
    iconName: 'ArrowRightLeft',
    popular: false,
    tags: ['Area Converter', 'Sq Ft to Sq M', 'Acres to Hectares', 'Sq Yard'],
    formulaSummary: '1 Sq Meter = 10.7639 Sq Feet | 1 Acre = 43,560 Sq Feet | 1 Hectare = 2.471 Acres',
    seoTitle: 'Area Unit Converter - Sq Ft, Sq M, Acres, Hectares | BuildMetric',
    seoMetaDescription: 'Convert land and floor area measurements across sq ft, sq m, acres, and hectares.',
    faqs: [
      {
        question: 'How many sq ft are in 1 acre?',
        answer: '1 acre equals 43,560 square feet.'
      },
      {
        question: 'How do I convert square meters to square feet?',
        answer: 'Multiply square meters by 10.7639. Example: 50 sq meters × 10.7639 = 538.2 sq ft.'
      },
      {
        question: 'What is 1 hectare in acres and square feet?',
        answer: '1 hectare equals 2.471 acres or 107,639 square feet (10,000 square meters).'
      },
      {
        question: 'How many square feet make 1 square yard?',
        answer: '1 square yard equals 9 square feet (3 ft × 3 ft).'
      },
      {
        question: 'How do land surveyors convert Guntha or Marla to square feet?',
        answer: '1 Guntha = 1,089 sq ft; 1 Marla (standard) = 272.25 sq ft.'
      }
    ]
  },

  // 28. Volume Unit Converter
  {
    id: 'volume-converter',
    title: 'Volume Unit Converter',
    shortDescription: 'Convert cubic mm, cubic cm, cubic m, cubic inch, cubic feet, and liters.',
    fullDescription: 'Convert fluid and solid material volumes across CFT, CUM, liters, cubic inches, and cubic centimeters.',
    categoryId: 'converters',
    iconName: 'ArrowRightLeft',
    popular: false,
    tags: ['Volume Converter', 'CFT to CUM', 'Liters to CFT', 'Cubic Meters'],
    formulaSummary: '1 CUM = 35.3147 CFT | 1 CUM = 1,000 Liters | 1 CFT = 28.317 Liters',
    seoTitle: 'Volume Unit Converter - CFT, CUM, Liters, Cubic Inches | BuildMetric',
    seoMetaDescription: 'Convert construction volume measurements between CFT, cubic meters, and liters.',
    faqs: [
      {
        question: 'How many liters are in 1 cubic foot (CFT)?',
        answer: '1 cubic foot (CFT) equals 28.3168 liters.'
      },
      {
        question: 'How many CFT are in 1 cubic meter (CUM)?',
        answer: '1 cubic meter (CUM) equals 35.3147 cubic feet (CFT).'
      },
      {
        question: 'How do I convert gallons to liters for mixing water calculations?',
        answer: '1 US gallon equals 3.7854 liters; 1 Imperial (UK) gallon equals 4.546 liters.'
      },
      {
        question: 'How do I convert cubic yards to cubic feet?',
        answer: 'Multiply cubic yards by 27 (1 yd³ = 3 ft × 3 ft × 3 ft = 27 ft³).'
      },
      {
        question: 'What is the volume of 1 metric ton of water in liters and m³?',
        answer: '1 metric ton (1000 kg) of pure water equals 1,000 liters or exactly 1 cubic meter (CUM).'
      }
    ]
  },

  // 29. Generic Unit Converter
  {
    id: 'unit-converter',
    title: 'Construction Unit Converter',
    shortDescription: 'Convert length, area, volume, weight, and density units instantly.',
    fullDescription: 'Essential unit conversion utility for civil site engineers, architects, and contractors. Easily convert feet to meters, CFT to CUM, kg to lbs, sq ft to sq meters, and metric tons.',
    categoryId: 'converters',
    iconName: 'ArrowRightLeft',
    popular: false,
    tags: ['Unit Converter', 'CFT to CUM', 'Feet to Meters', 'Sq Ft to Sq M', 'Kg to Tons'],
    formulaSummary: 'Standard conversion ratios: 1 Meter = 3.28084 Feet | 1 CUM = 35.3147 CFT | 1 Metric Ton = 1000 Kg',
    seoTitle: 'Construction Unit Converter - Feet, Meters, CFT, CUM, Tons | BuildMetric',
    seoMetaDescription: 'Online civil engineering unit converter. Convert length, square area, cubic volume, steel weight, and sand CFT to CUM.',
    faqs: [
      {
        question: 'How many cubic feet (CFT) are in 1 cubic meter (CUM)?',
        answer: '1 cubic meter (CUM) equals approximately 35.3147 cubic feet (CFT).'
      },
      {
        question: 'How do I convert steel bar weight from kg/m to lbs/ft?',
        answer: 'Multiply kg/m by 0.67197 to convert directly to lbs/ft.'
      },
      {
        question: 'What is the density conversion from kg/m³ to lbs/ft³?',
        answer: 'Divide density in kg/m³ by 16.0185 to get lbs/ft³.'
      },
      {
        question: 'How do I convert land measurement units on site?',
        answer: 'Use BuildMetric’s Area and Volume unit selectors to switch instantly between Feet/Inches and Meters/Centimeters.'
      },
      {
        question: 'Why is a reliable unit converter essential for civil engineers?',
        answer: 'Construction site plans, structural specs, and material vendor supplies frequently alternate between imperial and metric systems.'
      }
    ]
  }
];

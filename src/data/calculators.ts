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
        answer: '20mm down aggregates (mixed with 10mm aggregates) are standard for Reinforced Cement Concrete (RCC) slabs and beams.'
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
        answer: 'Standard straight pattern tiles require 5% to 10% wastage buffer. For diagonal or complex herring-bone cuts, allow 12% to 15% wastage.'
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
      }
    ]
  },

  // 29. Generic Unit Converter (backward compatibility)
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
      }
    ]
  }
];

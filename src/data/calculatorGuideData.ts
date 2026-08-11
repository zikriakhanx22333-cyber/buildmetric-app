import { CalculatorId } from '../types';

export interface CalculatorGuide {
  explanation: string;
  howToUseSteps: string[];
  whatYouNeed: string[];
  formulaTitle: string;
  formulaDetails: string[];
  formulaExplanation: string;
  exampleTitle: string;
  exampleText: string;
  tips: string[];
  workflowGroup: 'concrete' | 'steel' | 'masonry' | 'finishing' | 'earthwork' | 'cost' | 'converters';
}

export const CALCULATOR_GUIDES: Record<CalculatorId, CalculatorGuide> = {
  'concrete-calculator': {
    explanation: `Accurate concrete volume and mix ratio estimation is the foundational starting point for structural civil engineering and residential building projects. Whether you are pouring a reinforced concrete (RCC) roof slab, casting foundation footings, or molding structural columns, determining exact quantities of cement, sand, and coarse aggregates prevents expensive site delays and material waste. When dry ingredients—cement powder, fine sand, and stone gravel—are mixed with water, fine particles settle into the void spaces between coarse aggregates. Civil engineers account for this 54% void volume reduction by applying a standard dry volume factor of 1.54 to the net wet concrete volume.

Using this construction calculator, builders can select nominal concrete mix grades ranging from M5 (for mass lean concrete beds) to M20 and M25 (for heavy load-bearing structural members) or specify custom volumetric batching ratios. The tool automatically converts total cubic feet (CFT) or cubic meters (m³) into the number of 50 kg cement bags required (using the standard 1.226 CFT volume per bag), sand tonnage, and coarse aggregate volumes. Incorporating a 3% to 5% site wastage buffer guarantees that field pouring operations proceed smoothly without mid-pour material shortages.`,
    howToUseSteps: [
      'Enter the structural dimensions: length, width, and depth/thickness.',
      'Select your preferred measurement unit (Feet or Meters).',
      'Choose the concrete mix grade (e.g., M15, M20, M25) or custom ratio.',
      'Adjust dry volume factor (default 1.54) and wastage margin if necessary.',
      'Review output: total wet/dry volume, 50kg cement bags, sand CFT/tons, and coarse aggregate CFT/tons.'
    ],
    whatYouNeed: [
      'Structure Length, Width, and Thickness / Depth',
      'Desired Concrete Mix Grade (M5 to M25) or Custom Ratio',
      'Measurement Units (Imperial Feet or Metric Meters)',
      'Estimated Wastage Allowance (typically 3% to 5%)'
    ],
    formulaTitle: 'Concrete Volume & Mix Ratio Formulas',
    formulaDetails: [
      'Wet Volume = Length × Width × Thickness',
      'Dry Concrete Volume = Wet Volume × 1.54 (54% dry void expansion factor)',
      'Total Proportional Parts = Cement Ratio + Sand Ratio + Aggregate Ratio',
      'Cement Bags (50kg) = Dry Volume × (Cement Part / Total Parts) / 1.226 CFT',
      'Sand Volume (CFT) = Dry Volume × (Sand Part / Total Parts)',
      'Aggregate Volume (CFT) = Dry Volume × (Aggregate Part / Total Parts)'
    ],
    formulaExplanation: 'The formula converts net wet molded volume to expanded dry loose bulk volume by multiplying by 1.54. Each constituent material is then calculated according to its proportional share in the total mix ratio, and cement volume is divided by 1.226 CFT to find the required count of 50 kg cement bags.',
    exampleTitle: 'Step-by-Step Worked Example (RCC Roof Slab)',
    exampleText: 'Consider a concrete roof slab 20 ft long, 15 ft wide, and 5 inches (0.4167 ft) thick using M20 grade concrete (1 : 1.5 : 3):\n1. Wet Volume = 20 × 15 × 0.4167 = 125 CFT\n2. Dry Volume = 125 × 1.54 = 192.5 CFT\n3. Sum of Ratio Parts = 1 + 1.5 + 3 = 5.5 parts\n4. Cement Bags = (192.5 × 1 / 5.5) / 1.226 = 28.55 bags (~29 bags of 50kg cement)\n5. Sand Volume = 192.5 × (1.5 / 5.5) = 52.5 CFT (~2.37 metric tons at 1600 kg/m³)\n6. Coarse Aggregate = 192.5 × (3 / 5.5) = 105.0 CFT (~4.46 metric tons at 1500 kg/m³)',
    tips: [
      'Always add 3% to 5% extra material to cover formwork deflection, ground absorption, and spillage.',
      'Maintain a controlled water-cement ratio (~0.45 to 0.50) to prevent segregation and honeycombing.',
      'Ensure continuous water curing for a minimum of 7 to 10 days post-pouring to achieve full 28-day design strength.'
    ],
    workflowGroup: 'concrete'
  },

  'cement-calculator': {
    explanation: `Cement is the primary hydraulic binder in modern civil engineering construction. Calculating the exact number of 50 kg cement bags needed for a given volume of concrete, mortar, or plaster is vital for cost control and material inventory management. Because dry cement powder loses loose bulk volume when hydrated and mixed with aggregates, quantity calculations must account for dry shrinkage factors—1.54 for concrete mixes and 1.33 for masonry mortars.

This cement calculator allows quantity surveyors and site supervisors to convert wet cubic volume into exact 50 kg bag counts. Standard industrial cement bags weigh 50 kg and occupy 1.226 cubic feet (0.0347 cubic meters). By providing instant outputs for nominal concrete mix grades (M5 through M25) and brickwork mortar ratios (1:3 through 1:6), this tool ensures accurate procurement orders directly from suppliers.`,
    howToUseSteps: [
      'Input the total wet volume of concrete or mortar.',
      'Select the volume unit (Cubic Feet or Cubic Meters).',
      'Choose the concrete grade or mortar mix ratio.',
      'Inspect total required 50 kg cement bags, total weight in kg/tons, and dry expanded volume.'
    ],
    whatYouNeed: [
      'Total Wet Volume of Concrete or Mortar',
      'Target Mix Grade or Volumetric Proportion',
      'Volume Unit (CFT or CUM)'
    ],
    formulaTitle: 'Cement Bag Requirement Formula',
    formulaDetails: [
      'Dry Volume = Wet Volume × 1.54 (for concrete) or 1.33 (for mortar)',
      'Cement Volume (CFT) = Dry Volume × (Cement Part / Total Mix Parts)',
      'Total Cement Bags = Cement Volume (CFT) / 1.226 CFT'
    ],
    formulaExplanation: 'The wet structural volume is expanded to loose dry volume using the appropriate dry multiplier. The cement share is determined from the volumetric mix ratio sum, and divided by 1.226 CFT (the volume of one 50 kg cement bag).',
    exampleTitle: 'Step-by-Step Worked Example (M20 Concrete)',
    exampleText: 'For 100 CFT of wet concrete using M20 mix (1 : 1.5 : 3):\n1. Dry Volume = 100 × 1.54 = 154 CFT\n2. Sum of Parts = 1 + 1.5 + 3 = 5.5\n3. Cement Volume = 154 × (1 / 5.5) = 28.0 CFT\n4. Total 50kg Bags = 28.0 / 1.226 = 22.83 bags (~23 bags)',
    tips: [
      'Store cement bags on raised wooden pallets in dry, covered sheds to prevent moisture lumps.',
      'Use cement within 90 days of manufacturing to ensure full hydraulic strength.',
      'Maintain fresh water quality—water fit for drinking is suitable for mixing cement.'
    ],
    workflowGroup: 'concrete'
  },

  'sand-calculator': {
    explanation: `Fine aggregate, commonly river sand or manufactured sand (M-Sand), forms the core body of concrete paste, brick mortar, and wall plastering. Sand fills the void spaces between coarse stone aggregates and binds with cement to produce a durable matrix. Accurate sand estimation is essential to ensure workability and avoid costly site shortages or excess stockpiling.

This sand calculator computes fine aggregate requirements in cubic feet (CFT), cubic meters (m³), metric tons, and traditional brass units (1 Brass = 100 CFT). By incorporating standard bulk densities (~1,600 kg/m³ for natural river sand and ~1,700 kg/m³ for crushed M-Sand), builders can calculate exact truckloads and bulk delivery requirements for concrete casting, masonry, or plastering.`,
    howToUseSteps: [
      'Enter the required concrete or mortar volume.',
      'Select the target mix ratio or concrete grade.',
      'Specify sand type/density (River Sand ~1600 kg/m³ or M-Sand ~1700 kg/m³).',
      'Get instant output in CFT, m³, Metric Tons, and Brass.'
    ],
    whatYouNeed: [
      'Total Concrete or Mortar Volume',
      'Mix Proportions (e.g., M20 1:1.5:3 or Mortar 1:4)',
      'Sand Bulk Density (kg/m³ or lbs/ft³)'
    ],
    formulaTitle: 'Sand Volume & Weight Formula',
    formulaDetails: [
      'Dry Volume = Wet Volume × 1.54 (Concrete) or 1.33 (Mortar)',
      'Sand Volume (CFT) = Dry Volume × (Sand Part / Total Mix Parts)',
      'Sand Volume (m³) = Sand Volume (CFT) / 35.315',
      'Sand Weight (Tons) = Sand Volume (m³) × Density (kg/m³) / 1000'
    ],
    formulaExplanation: 'The required wet volume is converted to dry bulk volume. The proportion of sand is extracted based on the mix ratio, converted to cubic meters, and multiplied by the bulk density to calculate total weight in metric tons.',
    exampleTitle: 'Step-by-Step Worked Example (River Sand for Concrete)',
    exampleText: 'For 100 CFT wet concrete with M20 mix (1 : 1.5 : 3):\n1. Dry Volume = 100 × 1.54 = 154 CFT\n2. Sand Volume = 154 × (1.5 / 5.5) = 42.0 CFT\n3. Sand in m³ = 42.0 / 35.315 = 1.189 m³\n4. Sand Weight = 1.189 m³ × 1600 kg/m³ / 1000 = 1.90 Metric Tons\n5. Sand in Brass = 42.0 / 100 = 0.42 Brass',
    tips: [
      'Test river sand for silt content on site; silt should not exceed 8% by volume.',
      'Account for sand bulking when sand is moist; wet sand expands up to 20-30% in volume.',
      'Prefer Zone II graded M-Sand for structural RCC members to ensure uniform strength.'
    ],
    workflowGroup: 'concrete'
  },

  'aggregate-calculator': {
    explanation: `Coarse aggregate (crushed stone, gravel, or granite ballast) forms 60% to 75% of the total concrete volume. It provides structural compressive strength, rigidity, and abrasion resistance in foundations, footings, columns, beams, and roof slabs. Selecting and estimating the right aggregate volume and weight is essential for proper concrete batching.

This coarse aggregate calculator estimates aggregate quantities in cubic feet (CFT), cubic meters (m³), metric tons, and brass units. It supports standard size selections—10mm down for thin reinforced sections, 20mm down for standard RCC elements, and 40mm down for mass foundation beds—with realistic bulk densities ranging from 1,450 to 1,600 kg/m³.`,
    howToUseSteps: [
      'Enter wet concrete volume in CFT or cubic meters.',
      'Choose concrete grade (M5 through M25).',
      'Input coarse aggregate bulk density (default 1,500 kg/m³).',
      'Obtain aggregate volume in CFT, m³, metric tons, and brass.'
    ],
    whatYouNeed: [
      'Wet Concrete Volume',
      'Target Concrete Grade or Custom Ratio',
      'Aggregate Bulk Density (~1,450 to 1,600 kg/m³)'
    ],
    formulaTitle: 'Coarse Aggregate Quantity Formula',
    formulaDetails: [
      'Dry Concrete Volume = Wet Volume × 1.54',
      'Aggregate Volume (CFT) = Dry Volume × (Aggregate Part / Total Mix Parts)',
      'Aggregate Weight (Tons) = (Aggregate CFT / 35.315) × Density (kg/m³) / 1000'
    ],
    formulaExplanation: 'Dry volume expansion factor (1.54) is multiplied by wet concrete volume. The coarse aggregate fraction is extracted using the mix ratio sum and converted into weight via bulk density.',
    exampleTitle: 'Step-by-Step Worked Example (20mm Coarse Stone)',
    exampleText: 'For 100 CFT wet concrete with M20 grade (1 : 1.5 : 3):\n1. Dry Volume = 100 × 1.54 = 154 CFT\n2. Aggregate CFT = 154 × (3 / 5.5) = 84.0 CFT\n3. Aggregate m³ = 84.0 / 35.315 = 2.378 m³\n4. Aggregate Weight = 2.378 × 1500 / 1000 = 3.57 Metric Tons',
    tips: [
      'Use clean, angular, well-graded crushed stone free from dust coating or organic matter.',
      'Combine 20mm and 10mm aggregates in a 60:40 ratio for dense RCC compaction.',
      'Ensure aggregates are saturated surface-dry (SSD) prior to mixing so they do not absorb mixing water.'
    ],
    workflowGroup: 'concrete'
  },

  'concrete-mix-calculator': {
    explanation: `Proportioning concrete correctly ensures that structural members attain their characteristic design compressive strength after 28 days of water curing. Standard nominal concrete mix grades include M5 (1:5:10), M7.5 (1:4:8), M10 (1:3:6), M15 (1:2:4), M20 (1:1.5:3), and M25 (1:1:2). The number represents the characteristic 28-day compressive cube strength in N/mm² (MPa).

This general concrete mix calculator provides a complete batching breakdown for any wet concrete volume. It computes expanded dry volume (using the 1.54 multiplier), 50 kg cement bags, fine aggregate (sand) volume, coarse aggregate volume, and total water requirements based on the chosen water-cement ratio (~0.45 to 0.50). It enables site engineers and batching plant operators to order precise raw materials.`,
    howToUseSteps: [
      'Select concrete grade (M5, M7.5, M10, M15, M20, M25).',
      'Enter total wet concrete volume required.',
      'Specify water-cement ratio (default 0.45).',
      'View itemized summary: cement bags, sand CFT, aggregate CFT, and water in liters.'
    ],
    whatYouNeed: [
      'Target Concrete Grade (M5 to M25)',
      'Total Wet Concrete Volume (CFT or m³)',
      'Water-Cement Ratio (~0.45 to 0.50)'
    ],
    formulaTitle: 'Nominal Mix Proportion Formulas',
    formulaDetails: [
      'M5 = 1:5:10 | M7.5 = 1:4:8 | M10 = 1:3:6 | M15 = 1:2:4 | M20 = 1:1.5:3 | M25 = 1:1:2',
      'Dry Volume = Wet Volume × 1.54',
      'Cement Bags = Dry Vol × (1 / Ratio Sum) / 1.226 CFT',
      'Water (Liters) = Cement Weight (kg) × Water-Cement Ratio'
    ],
    formulaExplanation: 'The selected nominal mix ratio determines the proportional distribution of dry ingredients. Dry volume factor 1.54 expands the net volume, and water-cement ratio converts cement weight into total water liters.',
    exampleTitle: 'Step-by-Step Worked Example (M20 Grade Batching)',
    exampleText: 'For 10 cubic meters (m³) of M20 (1 : 1.5 : 3) concrete:\n1. Dry Volume = 10 × 1.54 = 15.4 m³ = 543.8 CFT\n2. Cement Vol = 15.4 × (1 / 5.5) = 2.8 m³ = 98.88 CFT -> 80.6 bags of 50kg cement\n3. Total Cement Weight = 80.6 × 50 = 4,030 kg\n4. Sand Vol = 15.4 × (1.5 / 5.5) = 4.2 m³ = 148.3 CFT (~6.7 metric tons)\n5. Aggregate Vol = 15.4 × (3 / 5.5) = 8.4 m³ = 296.6 CFT (~12.6 metric tons)\n6. Mixing Water = 4030 kg × 0.45 = 1,813.5 Liters',
    tips: [
      'Do not add excess water beyond the specified water-cement ratio; extra water drastically reduces 28-day strength.',
      'For heavy structural columns and beams, prefer M20 or M25 grade concrete.',
      'Use mechanical needle vibrators to compact fresh concrete thoroughly and eliminate air voids.'
    ],
    workflowGroup: 'concrete'
  },

  'mortar-calculator': {
    explanation: `Cement mortar is the binding slurry used to lay bricks, concrete blocks, stone masonry, and render surface plastering. Mortar consists of cement, fine sand, and water mixed in specific volumetric ratios—typically 1:3 or 1:4 for structural load-bearing brickwork and 1:5 or 1:6 for partition walls and plastering.

When dry cement and sand are mixed with water, fine cement particles hydrate and fill the void spaces between sand grains. To account for this shrinkage, civil engineers apply a dry mortar factor of 1.33 (33% void volume expansion). This mortar calculator computes exact wet and dry mortar volumes, required 50 kg cement bags, and sand volume in cubic feet (CFT) and tons.`,
    howToUseSteps: [
      'Enter wet mortar volume or masonry wall area with joint thickness.',
      'Select mortar mix ratio (1:3, 1:4, 1:5, 1:6).',
      'Review dry mortar volume (using 1.33 multiplier).',
      'Obtain total cement bags and sand CFT/tons.'
    ],
    whatYouNeed: [
      'Wet Mortar Volume (CFT or m³)',
      'Mortar Ratio (1:3 to 1:6)',
      'Sand Bulk Density (~1600 kg/m³)'
    ],
    formulaTitle: 'Mortar Volume & Material Formulas',
    formulaDetails: [
      'Dry Mortar Volume = Wet Mortar Volume × 1.33',
      'Cement Volume (CFT) = Dry Mortar Volume × (1 / Total Ratio Parts)',
      'Cement Bags = Cement Volume (CFT) / 1.226 CFT',
      'Sand Volume (CFT) = Dry Mortar Volume × (Sand Ratio / Total Ratio Parts)'
    ],
    formulaExplanation: 'The wet mortar volume is multiplied by 1.33 to convert to dry loose material volume. Cement and sand quantities are separated according to the mix ratio parts and converted to bags and CFT.',
    exampleTitle: 'Step-by-Step Worked Example (1:4 Mortar)',
    exampleText: 'For 100 CFT of wet mortar at 1:4 ratio:\n1. Dry Mortar Volume = 100 × 1.33 = 133 CFT\n2. Total Parts = 1 + 4 = 5\n3. Cement Volume = 133 × (1 / 5) = 26.6 CFT\n4. Cement Bags = 26.6 / 1.226 = 21.7 bags of 50kg cement\n5. Sand Volume = 133 × (4 / 5) = 106.4 CFT (~4.8 metric tons)',
    tips: [
      'Use mortar within 30 to 45 minutes of adding water before initial cement setting.',
      'Ensure sand is clean and sieved through a 4.75mm mesh screen to remove coarse stones.',
      'Soak red clay bricks in water prior to laying so they do not absorb moisture from the mortar.'
    ],
    workflowGroup: 'masonry'
  },

  'steel-weight-calculator': {
    explanation: `Steel reinforcement rebar provides essential tensile strength to concrete structures. Concrete possesses high compressive strength but relatively low tensile strength; thermo-mechanically treated (TMT) steel bars absorb flexural and shear stresses in footings, columns, beams, and slabs. Determining steel reinforcement weight is a core task in structural estimation and bar bending schedules (BBS).

The unit weight of circular steel rebar is derived mathematically from the density of mild steel (7,850 kg/m³). The standard civil engineering formula D²/162.2 computes weight in kilograms per meter, where D is bar diameter in millimeters. This calculator allows users to select standard rebar sizes (6mm to 40mm), specify lengths in meters or feet, and compute single bar weights, total kilogram weight, and metric tonnage.`,
    howToUseSteps: [
      'Select rebar diameter in mm (6mm, 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm).',
      'Enter bar length (meters or feet) and total quantity of bars.',
      'Inspect unit weight per meter (D²/162.2) and per foot (D²/533).',
      'View total steel weight in kilograms and metric tons.'
    ],
    whatYouNeed: [
      'Bar Diameter in mm (D)',
      'Length per Bar (Meters or Feet)',
      'Total Number of Steel Bars'
    ],
    formulaTitle: 'Standard Rebar Weight Formulas',
    formulaDetails: [
      'Weight per meter (kg/m) = D² / 162.2',
      'Weight per foot (kg/ft) = D² / 533',
      'Single Bar Weight (kg) = Weight per meter × Length (m)',
      'Total Steel Weight (kg) = Single Bar Weight × Quantity',
      'Total Tonnage = Total Weight (kg) / 1000'
    ],
    formulaExplanation: 'Derivation: Circular cross-sectional area = (π/4) × (D/1000)². Multiplying by steel density 7850 kg/m³ yields Area × 7850 = π/4 × D² / 1,000,000 × 7850 ≈ D² / 162.198 (rounded to 162.2 kg/m).',
    exampleTitle: 'Step-by-Step Worked Example (12mm Rebar)',
    exampleText: 'Calculate weight of 50 steel bars of 12mm diameter, each 12 meters long:\n1. Unit Weight = 12² / 162.2 = 144 / 162.2 = 0.8878 kg/m\n2. Single 12m Bar Weight = 0.8878 × 12 = 10.65 kg\n3. Total Steel Weight = 10.65 × 50 = 532.5 kg\n4. Weight in Metric Tons = 532.5 / 1000 = 0.5325 Tons',
    tips: [
      'Standard factory TMT rebar bundles are delivered in 12-meter (39.37 ft) straight lengths.',
      'Verify manufacturer rolling margins on site; steel weight should stay within ±5% of theoretical formula weight.',
      'Use Fe500 or Fe550D grade TMT steel bars for superior earthquake ductility.'
    ],
    workflowGroup: 'steel'
  },

  'rebar-calculator': {
    explanation: `Estimating rebar quantities across different structural elements requires fast, preset access to standard steel bar sizes. Rebar sizes—ranging from 6mm stirrup ties up to 32mm column bars—have distinct unit weights and structural applications. 

This advanced rebar quantity calculator provides one-click selection for preset diameters (6mm, 8mm, 10mm, 12mm, 16mm, 20mm, 25mm, 32mm). By entering total length or bar counts, builders receive instant unit weight calculations, total weight in kg and metric tons, and estimated total material procurement cost.`,
    howToUseSteps: [
      'Click on a preset diameter button (e.g., 8mm, 12mm, 16mm, 20mm).',
      'Enter length per bar and number of bars.',
      'Adjust unit price per kg/ton if doing budget estimates.',
      'Review total length, total weight in kg/tons, and estimated cost.'
    ],
    whatYouNeed: [
      'Rebar Preset Diameter (mm)',
      'Bar Length and Total Count',
      'Optional Unit Price per Kg or Ton'
    ],
    formulaTitle: 'Rebar Unit Weight & Tonnage Formulas',
    formulaDetails: [
      'Unit Mass (kg/m) = D² / 162.2',
      'Total Weight (kg) = Total Meters × Unit Mass (kg/m)',
      'Total Tonnage = Total Weight (kg) / 1000'
    ],
    formulaExplanation: 'Preset bar diameter selects the corresponding theoretical weight factor. Multiplying total linear meters by unit mass yields total weight in kg and metric tons.',
    exampleTitle: 'Step-by-Step Worked Example (16mm Column Bars)',
    exampleText: 'For 20 column bars of 16mm diameter, each 10 meters long:\n1. Unit Weight = 16² / 162.2 = 256 / 162.2 = 1.578 kg/m\n2. Total Length = 20 × 10 = 200 meters\n3. Total Weight = 200 × 1.578 = 315.6 kg (0.3156 Metric Tons)',
    tips: [
      'Store steel rebar off the ground on timber sleepers and cover with tarpaulins to prevent surface rust.',
      '8mm rebar is typically used for beam/column stirrups (ties), while 12mm-25mm bars serve as main longitudinal reinforcement.',
      'Maintain required clear concrete cover (25mm for beams, 40mm for columns, 50mm for footings) using concrete cover blocks.'
    ],
    workflowGroup: 'steel'
  },

  'steel-cutting-calculator': {
    explanation: `When continuous steel rebar runs exceed standard factory supply lengths (12 meters), bars must be spliced together using lap splices. A lap splice overlaps two rebar ends so that tensile or compressive forces transfer safely from one bar to the next through the surrounding concrete paste.

Calculating exact cutting lengths—including lap lengths (typically 40d to 50d, where d is bar diameter)—prevents material wastage during rebar cutting and bending operations. This calculator computes cut lengths per bar, total rebar length, total kilograms, and metric tons while incorporating lap allowances and stirrup hook bent deductions.`,
    howToUseSteps: [
      'Enter total structural member span length and number of bars.',
      'Select bar diameter and lap multiplier (default 50d for tension laps).',
      'Specify number of lap splices per bar.',
      'View total cutting length per bar, overall total steel length, and total weight.'
    ],
    whatYouNeed: [
      'Base Member Length (Meters or Feet)',
      'Bar Diameter (mm)',
      'Lap Splice Ratio (e.g., 50d)',
      'Number of Laps per Bar'
    ],
    formulaTitle: 'Lap Length & Cutting Length Formulas',
    formulaDetails: [
      'Lap Length (m) = (Lap Multiplier × Diameter in mm) / 1000',
      'Cut Length per Bar = Base Length + (Lap Length × Number of Laps)',
      'Total Steel Weight (kg) = Cut Length × Quantity × (D² / 162.2)'
    ],
    formulaExplanation: 'The lap splice allowance (50 times bar diameter) is added for each splice point along the bar run. Total cut length is multiplied by the unit bar weight (D²/162.2) to find total steel tonnage.',
    exampleTitle: 'Step-by-Step Worked Example (Column Lap Length)',
    exampleText: 'For 4 column main bars of 20mm diameter spanning 15 meters with 1 lap splice of 50d:\n1. Lap Length = 50 × 20mm = 1000mm = 1.0 meter\n2. Cut Length per Bar = 15.0 + 1.0 = 16.0 meters\n3. Total Length = 4 × 16.0 = 64.0 meters\n4. Unit Weight = 20² / 162.2 = 2.466 kg/m\n5. Total Weight = 64.0 × 2.466 = 157.8 kg (0.1578 Metric Tons)',
    tips: [
      'Stagger rebar lap splices across adjacent bars; never lap 100% of column bars at the same vertical section.',
      'Avoid placing lap splices in high-stress zones such as beam-column joints or mid-span flexural zones.',
      'Bind lap splices firmly with 18-gauge annealed binding wire at 100mm intervals.'
    ],
    workflowGroup: 'steel'
  },

  'brick-calculator': {
    explanation: `Brick masonry wall construction requires calculating required bricks, mortar volume, cement bags, and sand. Whether building exterior load-bearing walls, interior half-brick partition walls, or boundary wall fencing, accurate material estimates prevent project delays and control budget expenses.

This brick calculator automatically deducts door and window openings from gross wall dimensions. It accounts for nominal brick dimensions with mortar joints (typically 10mm thick) versus actual brick unit dimensions. It calculates net brick counts, wet and dry mortar volume (using dry factor 1.33), cement bags, and sand CFT with an adjustable wastage margin (typically 5%).`,
    howToUseSteps: [
      'Enter wall length, wall height, and wall thickness (e.g., 9 inches or 4.5 inches).',
      'Select brick type (Standard Modular 190x90x90mm, Non-modular 9"x4.25"x2.75", or custom).',
      'Input door/window opening areas for automatic deduction.',
      'Set mortar joint thickness (10mm standard) and wastage buffer (5%).',
      'Review total bricks, mortar volume, cement bags, and sand CFT.'
    ],
    whatYouNeed: [
      'Wall Length, Height, and Thickness',
      'Brick Unit Dimensions (Length, Width, Height)',
      'Door & Window Opening Dimensions for Deduction',
      'Mortar Joint Thickness and Wastage Margin'
    ],
    formulaTitle: 'Brickwork & Mortar Estimation Formulas',
    formulaDetails: [
      'Net Wall Area = (Wall Length × Height) - Door/Window Opening Deductions',
      'Wall Volume = Net Wall Area × Wall Thickness',
      'Nominal Brick Volume = (Brick Length + Joint) × (Width + Joint) × (Height + Joint)',
      'Number of Bricks = (Wall Volume / Nominal Brick Volume) × (1 + Wastage %)',
      'Mortar Volume = Wall Volume - (Number of Bricks × Actual Single Brick Volume without Mortar)'
    ],
    formulaExplanation: 'Gross wall volume is adjusted for openings. Bricks are estimated using nominal dimensions (including mortar joint). Actual brick unit volume is subtracted from total wall volume to determine net mortar required.',
    exampleTitle: 'Step-by-Step Worked Example (9" Brick Wall)',
    exampleText: 'For a wall 10 ft long, 10 ft high, and 9 inches (0.75 ft) thick with 1 door (3ft × 7ft = 21 sq ft):\n1. Gross Wall Area = 10 × 10 = 100 sq ft\n2. Net Wall Area = 100 - 21 = 79 sq ft\n3. Net Wall Volume = 79 × 0.75 = 59.25 CFT\n4. Standard Bricks with Mortar (9" × 4.25" × 2.75" + 0.39" joint):\n5. Total Bricks required = ~820 + 5% wastage = 861 bricks\n6. Mortar Volume = ~14.2 CFT -> Cement = 2.3 bags -> Sand = 11.3 CFT',
    tips: [
      'Soak red clay bricks in water tanks for at least 1 hour before laying to prevent mortar desiccation.',
      'Rake mortar joints to 10mm depth while fresh to provide mechanical key for plastering.',
      'Provide horizontal concrete sill bands at window opening levels in earthquake-prone zones.'
    ],
    workflowGroup: 'masonry'
  },

  'block-calculator': {
    explanation: `Concrete masonry units (CMU)—both solid and hollow concrete blocks—are widely used for commercial and residential boundary walls, exterior partitions, and structural masonry. Due to their larger unit size compared to traditional clay bricks, concrete blocks allow faster wall construction, reduce total mortar consumption, and decrease overall wall dead load on foundations.

This concrete block calculator determines exact block counts, mortar volume, cement bags, and sand required for any wall area. It supports standard CMU block sizes (such as 16" × 8" × 8" or 400 × 200 × 200 mm) and custom dimensions, while accounting for mortar joint thickness (10mm) and wastage margins.`,
    howToUseSteps: [
      'Enter wall length and height to compute total wall surface area.',
      'Select block dimensions (e.g., 16"×8"×8" or 400x200x200mm).',
      'Input mortar joint gap (default 10mm) and wastage percentage.',
      'Obtain total block count, wet mortar volume, cement bags, and sand.'
    ],
    whatYouNeed: [
      'Wall Length and Height',
      'Block Length, Height, and Thickness',
      'Mortar Joint Gap (10mm) and Wastage Percentage'
    ],
    formulaTitle: 'Concrete Block Masonry Formulas',
    formulaDetails: [
      'Single Block Face Area = (Block Length + Joint) × (Block Height + Joint)',
      'Base Block Count = Wall Area / Single Block Face Area',
      'Total Blocks = Base Block Count × (1 + Wastage %)'
    ],
    formulaExplanation: 'The frontal face area of a single block (including mortar joint) is divided into the net wall area. Wastage percentage is added to derive total procurement quantity.',
    exampleTitle: 'Step-by-Step Worked Example (CMU Boundary Wall)',
    exampleText: 'For a boundary wall 50 ft long and 6 ft high (300 sq ft area) using standard 16" × 8" × 8" CMU blocks:\n1. Single Block Face Area = (16 + 0.4)/12 × (8 + 0.4)/12 = 1.367 ft × 0.70 ft = 0.957 sq ft\n2. Base Block Count = 300 / 0.957 = 313.5 blocks\n3. Total Blocks with 5% Wastage = 313.5 × 1.05 = 329 blocks',
    tips: [
      'In hollow block construction, fill block cores with thin concrete grout and vertical rebar at corners for structural stability.',
      'Cure concrete block walls with water spray for at least 7 days after laying.',
      'Use ladder-type joint reinforcement steel every 3 courses to prevent wall shrinkage cracking.'
    ],
    workflowGroup: 'masonry'
  },

  'plaster-calculator': {
    explanation: `Plastering renders interior and exterior brick or block wall surfaces smooth, durable, and weather-resistant. Plaster mortar consists of Portland cement, fine sand, and water mixed in ratios such as 1:3 or 1:4 for ceilings and exterior walls, and 1:5 or 1:6 for interior walls. Standard plaster thickness is 12mm for internal brick walls, 6mm for concrete ceiling slabs, and 18mm to 20mm (double coat) for exterior surfaces exposed to weather.

Because dry cement and sand lose volume when mixed with water, civil engineers apply a dry mortar factor of 1.33 (33% dry expansion factor) to net wet plaster volume. This plaster calculator estimates wet/dry mortar volume, required 50 kg cement bags, and sand volume in CFT and metric tons for single or double-coat wall rendering.`,
    howToUseSteps: [
      'Enter wall length and height to calculate total wall area.',
      'Select plaster thickness (12mm, 15mm, 18mm, 20mm).',
      'Choose mortar mix ratio (1:3, 1:4, 1:5, 1:6).',
      'Review net wet volume, dry volume (1.33 multiplier), cement bags, and sand CFT/tons.'
    ],
    whatYouNeed: [
      'Total Wall Surface Area (sq ft or sq meters)',
      'Plaster Layer Thickness (mm or inches)',
      'Mortar Ratio (1:3 to 1:6)'
    ],
    formulaTitle: 'Wall Plastering Material Formulas',
    formulaDetails: [
      'Plaster Surface Area = Length × Height',
      'Wet Volume = Surface Area × Thickness',
      'Dry Mortar Volume = Wet Volume × 1.33 (33% void factor)',
      'Cement Bags = Dry Volume × (1 / Ratio Sum) / 1.226 CFT',
      'Sand Volume (CFT) = Dry Volume × (Sand Ratio / Ratio Sum)'
    ],
    formulaExplanation: 'Plaster surface area multiplied by thickness gives wet volume. Multiplying by 1.33 converts to dry loose material volume. Cement and sand fractions are calculated using the ratio sum.',
    exampleTitle: 'Step-by-Step Worked Example (12mm Internal Plaster)',
    exampleText: 'For a 500 sq ft interior wall area with 12mm (0.03937 ft) plaster at 1:4 mix ratio:\n1. Wet Volume = 500 × 0.03937 = 19.68 CFT\n2. Dry Volume = 19.68 × 1.33 = 26.17 CFT\n3. Ratio Sum = 1 + 4 = 5\n4. Cement Bags = (26.17 × 1 / 5) / 1.226 = 4.27 bags (~5 bags of 50kg cement)\n5. Sand Volume = 26.17 × (4 / 5) = 20.94 CFT (~0.95 metric tons)',
    tips: [
      'Apply chicken wire mesh or fiber mesh over brick-concrete joints before plastering to prevent stress cracks.',
      'Maintain continuous water curing on fresh plaster for at least 7 days.',
      'Ensure sand is sieved through fine screens to remove pebbles that mar plaster surface finish.'
    ],
    workflowGroup: 'masonry'
  },

  'tile-calculator': {
    explanation: `Floor and wall tiling adds aesthetic value, water resistance, and hygiene to living spaces, kitchens, and bathrooms. Calculating required tile quantities requires evaluating net room floor area, wall elevation cladding area, room perimeter skirting strips, tile dimensions, and wastage buffers.

Tile cuts at corners and room edges produce off-cut trim loss. Straight tiling layouts typically require a 5% to 8% wastage buffer, whereas diagonal or herringbone patterns require 10% to 15%. This tile calculator computes total coverage square footage, exact tile counts, box packaging counts, and required polymer tile adhesive or cement bedding mortar.`,
    howToUseSteps: [
      'Enter room length and width for floor area (or wall dimensions for wall tiles).',
      'Specify tile dimensions (length and width in inches, feet, or cm).',
      'Toggle perimeter skirting calculations if doing room floor tiling.',
      'Set wastage allowance (5% straight layout, 10% diagonal layout).',
      'Input tiles per box to calculate required box packaging counts.'
    ],
    whatYouNeed: [
      'Room Length and Width (or Wall Dimensions)',
      'Tile Length and Width',
      'Skirting Height Option',
      'Wastage Percentage and Box Package Limit'
    ],
    formulaTitle: 'Floor & Wall Tile Formulas',
    formulaDetails: [
      'Floor Area = Room Length × Room Width',
      'Skirting Area = Room Perimeter × Skirting Height',
      'Total Net Area = Floor Area + Skirting Area',
      'Single Tile Area = Tile Length × Tile Width',
      'Total Tiles = (Total Net Area / Single Tile Area) × (1 + Wastage %)',
      'Total Boxes = Total Tiles / Tiles per Box'
    ],
    formulaExplanation: 'Net tiling coverage area is combined with perimeter skirting area. Total required area is divided by single tile surface area, expanded by the wastage factor, and rounded up to box package multiples.',
    exampleTitle: 'Step-by-Step Worked Example (Vitrified Living Room Flooring)',
    exampleText: 'For a living room 15 ft long and 12 ft wide (180 sq ft) using 2ft × 2ft (4 sq ft) tiles with 4" skirting:\n1. Floor Area = 15 × 12 = 180 sq ft\n2. Room Perimeter = 2 × (15 + 12) = 54 ft\n3. Skirting Area = 54 × (4/12) = 18 sq ft\n4. Total Area = 180 + 18 = 198 sq ft\n5. Base Tile Count = 198 / 4 = 49.5 tiles\n6. Total Tiles with 8% Wastage = 49.5 × 1.08 = 53.46 (~54 tiles)\n7. At 4 tiles per box = 54 / 4 = 13.5 -> 14 boxes',
    tips: [
      'Buy 1 extra box of tiles from the same batch number to keep as matching spares for future repairs.',
      'Use 2mm to 3mm tile spacers to maintain uniform grout line spacing.',
      'Ensure floor sub-base screed is completely level before laying tiles with polymer adhesive.'
    ],
    workflowGroup: 'finishing'
  },

  'flooring-calculator': {
    explanation: `Flooring installations—including solid hardwood, engineered wood, laminate planks, luxury vinyl (LVT/SPC), and stone slabs—require precise surface area measurement and material piece planning. Accurate estimations prevent project slowdowns caused by missing plank quantities while keeping material inventory lean.

This flooring material calculator determines net room surface area, computes total material piece counts based on individual plank dimensions, applies selected wastage allowances (typically 5% to 10%), and converts outputs across square feet and square meters.`,
    howToUseSteps: [
      'Enter room length and width.',
      'Specify individual flooring plank/tile length and width.',
      'Set wastage allowance (5% straight, 10% diagonal or complex pattern).',
      'View total floor area, required material piece counts, and square footage.'
    ],
    whatYouNeed: [
      'Room Length and Width',
      'Flooring Plank / Piece Dimensions',
      'Wastage Percentage Allowance'
    ],
    formulaTitle: 'Flooring Material Formulas',
    formulaDetails: [
      'Floor Area = Length × Width',
      'Single Plank Area = Plank Length × Plank Width',
      'Base Pieces = Floor Area / Single Plank Area',
      'Total Pieces = Base Pieces × (1 + Wastage %)'
    ],
    formulaExplanation: 'Total room surface area is divided by the area of an individual flooring plank. The resulting plank count is multiplied by the wastage factor to account for wall cuts.',
    exampleTitle: 'Step-by-Step Worked Example (Laminate Wood Planks)',
    exampleText: 'For a bedroom 14 ft long and 12 ft wide (168 sq ft) using laminate planks 4 ft long and 0.5 ft wide (2 sq ft per plank):\n1. Floor Area = 14 × 12 = 168 sq ft\n2. Single Plank Area = 4 × 0.5 = 2 sq ft\n3. Base Pieces = 168 / 2 = 84 planks\n4. Total Pieces with 8% Wastage = 84 × 1.08 = 90.72 (~91 planks)',
    tips: [
      'Acclimate hardwood and laminate flooring planks in the room for 48 hours prior to installation.',
      'Install a damp-proof 2mm foam underlayment beneath floating laminate or SPC vinyl floors.',
      'Leave a 10mm expansion gap around room perimeters beneath skirting baseboards.'
    ],
    workflowGroup: 'finishing'
  },

  'paint-calculator': {
    explanation: `Calculating wall paint requirements involves determining total paintable wall surface area, deducting door and window openings, factoring in the number of finishing coats (typically 2 coats), and adding primer base layers. Coverage rates vary by paint type: interior emulsion paint covers ~100-140 sq ft per liter per coat, while exterior weather-proof paint covers ~80-100 sq ft per liter per coat.

This wall paint calculator computes net wall square footage, deducts non-painted opening areas, and calculates required paint liters, primer volume, and standard bucket package sizes (1L, 4L, 10L, 20L drums).`,
    howToUseSteps: [
      'Enter total wall length and height (or room perimeter and height).',
      'Specify number of walls and enter door/window opening areas for deduction.',
      'Select number of paint coats (1, 2, or 3) and primer option.',
      'Choose paint coverage rate (default 120 sq ft / liter per coat).',
      'Inspect required paint liters, primer liters, and bucket packaging breakdown.'
    ],
    whatYouNeed: [
      'Wall Dimensions (Length and Height)',
      'Door and Window Deductions',
      'Number of Finishing Paint Coats (1, 2, or 3)',
      'Paint Coverage Rate (sq ft or sq meters per liter)'
    ],
    formulaTitle: 'Wall Paint & Coverage Formulas',
    formulaDetails: [
      'Gross Wall Area = Total Wall Length × Height',
      'Net Paintable Area = Gross Wall Area - Opening Deductions',
      'Total Coverage Area = Net Area × Number of Coats',
      'Total Paint Liters = Total Coverage Area / Coverage per Liter'
    ],
    formulaExplanation: 'Opening deductions are subtracted from gross wall area. Net area is multiplied by the number of coats and divided by manufacturer coverage per liter to obtain paint volume.',
    exampleTitle: 'Step-by-Step Worked Example (Interior Wall Painting)',
    exampleText: 'For a room with 4 walls each 12 ft long and 10 ft high (gross 480 sq ft) with 1 door (21 sq ft) and 2 windows (30 sq ft total) using 2 coats of emulsion paint (120 sq ft/L coverage):\n1. Gross Area = 480 sq ft\n2. Opening Deductions = 21 + 30 = 51 sq ft\n3. Net Area = 480 - 51 = 429 sq ft\n4. Total Coverage Area (2 coats) = 429 × 2 = 858 sq ft\n5. Total Paint Liters = 858 / 120 = 7.15 Liters (~1 x 4L bucket + 4 x 1L cans)',
    tips: [
      'Apply 1 coat of wall sealer or acrylic primer on fresh plaster before applying topcoat emulsion.',
      'Sand wall putty smooth with 220-grit sandpaper for an even, flawless paint sheen.',
      'Allow 3 to 4 hours drying time between successive paint coat applications.'
    ],
    workflowGroup: 'finishing'
  },

  'excavation-calculator': {
    explanation: `Earth excavation is the initial physical phase of building construction. Calculating soil excavation volume for foundation trenches, isolated column footing pits, basements, and underground water tanks provides the basis for earthwork cost estimation, equipment selection (excavator backhoes vs manual labor), and soil disposal logistics.

Excavated soil expands when disturbed due to air void incorporation; this is known as the soil swell factor (typically 15% to 30%). This excavation volume calculator computes net bank in-situ soil volume in cubic feet (CFT) and cubic meters (m³), while providing loose haulage volume estimations for truck transport planning.`,
    howToUseSteps: [
      'Enter pit/trench length, width, and depth.',
      'Specify total number of footing pits across the building layout.',
      'Adjust soil swell factor percentage if planning truck transport.',
      'Obtain total in-situ volume in CFT and m³, plus loose truck haul volume.'
    ],
    whatYouNeed: [
      'Pit or Trench Length, Width, and Depth',
      'Number of Identical Excavation Pits',
      'Soil Swell Factor (15% to 30%)'
    ],
    formulaTitle: 'Earth Excavation Volume Formulas',
    formulaDetails: [
      'Single Pit Volume = Length × Width × Depth',
      'Total In-situ Volume = Single Pit Volume × Number of Pits',
      'Volume in m³ = Volume in CFT / 35.315',
      'Loose Haulage Volume = Total In-situ Volume × (1 + Swell %)'
    ],
    formulaExplanation: 'Length, width, and depth are multiplied to calculate in-situ cubic volume. Applying the soil swell percentage yields loose volume for truck hauling.',
    exampleTitle: 'Step-by-Step Worked Example (Footing Pit Excavation)',
    exampleText: 'For 10 column footing pits, each 5 ft long, 5 ft wide, and 6 ft deep with 20% soil swell:\n1. Single Pit In-situ Vol = 5 × 5 × 6 = 150 CFT\n2. Total In-situ Volume = 150 × 10 = 1,500 CFT (42.47 m³)\n3. Loose Haulage Volume = 1,500 × 1.20 = 1,800 CFT (50.96 m³)',
    tips: [
      'Excavate pit beds 6 inches wider on all sides to allow formwork installation and clear working space.',
      'Slope trench sides at a safe angle of repose (1:1 slope) for excavations deeper than 5 feet to prevent wall collapse.',
      'Stockpile reusable topsoil separately away from pit edges for future backfilling.'
    ],
    workflowGroup: 'earthwork'
  },

  'backfill-calculator': {
    explanation: `Foundation trench backfilling fills void spaces around poured concrete footings and column stubs with soil, sand, or gravel. Proper backfilling and mechanical compaction prevent post-construction soil settlement, pavement sinking, and water pooling around building foundations.

Because loose backfill soil shrinks and consolidates upon mechanical tamping, civil engineers add a compaction shrinkage allowance (typically 15% to 20%) to net void volume. This backfill calculator computes net void volume by subtracting structural concrete volume from gross pit volume, and calculates required loose soil quantities.`,
    howToUseSteps: [
      'Enter gross pit excavation dimensions (length, width, depth).',
      'Input total concrete volume occupied by footings and columns.',
      'Set compaction shrinkage allowance percentage (15% to 20%).',
      'Review required net backfill soil volume in CFT, m³, and metric tons.'
    ],
    whatYouNeed: [
      'Gross Excavation Pit Volume',
      'Occupied Concrete Structure Volume',
      'Compaction Shrinkage Allowance (%)'
    ],
    formulaTitle: 'Soil Backfill Volume Formulas',
    formulaDetails: [
      'Net Backfill Void Volume = Gross Excavation Volume - Occupied Concrete Volume',
      'Required Loose Soil Volume = Net Void Volume × (1 + Compaction %)',
      'Soil Weight (Tons) = (Loose Soil Volume in m³) × Soil Bulk Density (~1600 kg/m³) / 1000'
    ],
    formulaExplanation: 'Occupied structural volume is subtracted from gross excavation volume to determine net void space. Applying the compaction shrinkage percentage yields the required loose soil volume to order.',
    exampleTitle: 'Step-by-Step Worked Example (Foundation Backfill)',
    exampleText: 'For a foundation pit with gross excavation volume of 1,500 CFT containing 400 CFT of poured concrete footings and columns, with 15% compaction factor:\n1. Net Void Volume = 1,500 - 400 = 1,100 CFT\n2. Required Loose Soil Volume = 1,100 × 1.15 = 1,265 CFT (35.82 m³)\n3. Total Soil Weight = 35.82 m³ × 1600 kg/m³ / 1000 = 57.3 Metric Tons',
    tips: [
      'Place backfill soil in horizontal layers (lifts) no thicker than 6 to 8 inches (150-200mm).',
      'Moisten soil slightly to achieve optimum moisture content (OMC) before mechanical plate compaction.',
      'Use clean granular soil or coarse sand; avoid organic topsoil or heavy uncompactable clay.'
    ],
    workflowGroup: 'earthwork'
  },

  'footing-calculator': {
    explanation: `Foundation footings transfer vertical structural building loads safely into underlying load-bearing soil strata. Isolated pad footings, sloped trapezoidal footings, and continuous strip footings require concrete estimation to ensure structural integrity and control foundation budgets.

This footing concrete calculator computes wet concrete volume, applies dry volume expansion (1.54 factor), and calculates required 50 kg cement bags, sand CFT/tons, and coarse aggregate for structural concrete grades (M15, M20, M25).`,
    howToUseSteps: [
      'Enter footing length, width, and height/thickness.',
      'Enter total number of footing pads in the foundation layout.',
      'Select concrete grade (e.g., M20 or M25).',
      'View total wet/dry concrete volume, 50kg cement bags, sand, and aggregate.'
    ],
    whatYouNeed: [
      'Footing Pad Dimensions (Length, Width, Height)',
      'Total Number of Footings',
      'Concrete Mix Grade (M15 to M25)'
    ],
    formulaTitle: 'Footing Concrete Formulas',
    formulaDetails: [
      'Single Footing Volume = Length × Width × Height',
      'Total Wet Volume = Single Footing Volume × Number of Footings',
      'Dry Concrete Volume = Total Wet Volume × 1.54',
      'Cement Bags = Dry Volume × (Cement Part / Total Mix Parts) / 1.226 CFT'
    ],
    formulaExplanation: 'Pad dimensions are multiplied to find net wet volume. Applying the 1.54 dry factor and mix ratio distribution yields cement bag counts and aggregate quantities.',
    exampleTitle: 'Step-by-Step Worked Example (Isolated Column Footings)',
    exampleText: 'For 12 isolated footings each 6 ft long, 6 ft wide, and 1.5 ft thick using M20 concrete (1 : 1.5 : 3):\n1. Single Footing Vol = 6 × 6 × 1.5 = 54 CFT\n2. Total Wet Vol = 54 × 12 = 648 CFT\n3. Dry Vol = 648 × 1.54 = 997.9 CFT\n4. Sum of Parts = 1 + 1.5 + 3 = 5.5\n5. Cement Bags = (997.9 × 1 / 5.5) / 1.226 = 147.9 bags (~148 bags of 50kg cement)',
    tips: [
      'Pour a 3" to 4" Plain Cement Concrete (PCC) bed under footings before installing steel rebar cages.',
      'Maintain a minimum clear concrete cover of 50mm (2 inches) on footing bottom and sides to prevent rebar corrosion.',
      'Vibrate concrete thoroughly during pouring to eliminate voids beneath rebar mats.'
    ],
    workflowGroup: 'concrete'
  },

  'column-calculator': {
    explanation: `Reinforced concrete (RCC) columns are vertical structural members subjected primarily to axial compressive loads and bending moments. Because columns carry building loads down to foundations, casting quality and concrete mix proportions (typically M20 or M25 grade) are critical to structural safety.

This column concrete calculator estimates required concrete volume for rectangular or square columns. It calculates expanded dry volume (1.54 multiplier), required 50 kg cement bags, sand CFT/tons, and coarse aggregate quantities.`,
    howToUseSteps: [
      'Enter column cross-sectional width, length, and floor-to-ceiling height.',
      'Input total number of columns.',
      'Select concrete mix grade (M20 or M25).',
      'Inspect total wet/dry concrete volume, cement bags, sand, and aggregate.'
    ],
    whatYouNeed: [
      'Column Cross-Sectional Width and Length',
      'Column Floor-to-Ceiling Height',
      'Total Number of Columns',
      'Concrete Grade (M20 or M25)'
    ],
    formulaTitle: 'Column Concrete Formulas',
    formulaDetails: [
      'Single Column Vol = Width × Length × Height',
      'Total Wet Volume = Single Column Vol × Number of Columns',
      'Dry Volume = Total Wet Volume × 1.54',
      'Cement Bags = Dry Volume × (1 / Ratio Sum) / 1.226 CFT'
    ],
    formulaExplanation: 'Column dimensions are multiplied by height and column count. The wet volume is expanded by 1.54 to compute required raw batching materials.',
    exampleTitle: 'Step-by-Step Worked Example (RCC Columns)',
    exampleText: 'For 8 columns of 9" × 12" (0.75 ft × 1.0 ft) cross-section and 10 ft height using M25 concrete (1 : 1 : 2):\n1. Single Column Vol = 0.75 × 1.0 × 10 = 7.5 CFT\n2. Total Wet Vol = 7.5 × 8 = 60 CFT\n3. Dry Vol = 60 × 1.54 = 92.4 CFT\n4. Ratio Sum = 1 + 1 + 2 = 4\n5. Cement Bags = (92.4 × 1 / 4) / 1.226 = 18.8 bags (~19 bags of 50kg cement)',
    tips: [
      'Maintain a 40mm (1.5 inch) clear cover for column longitudinal rebar using concrete cover blocks.',
      'Pour column concrete in vertical lifts not exceeding 1.5 meters to prevent aggregate segregation.',
      'Keep column formwork moist and cure stripped concrete columns continuously for 14 days.'
    ],
    workflowGroup: 'concrete'
  },

  'beam-calculator': {
    explanation: `Reinforced concrete (RCC) beams—including plinth tie beams, floor beams, and roof lintels—are horizontal flexural members that support slab loads and transfer them vertically to columns. Accurately estimating concrete volume and raw material quantities for beams ensures smooth continuous pouring operations on site.

This beam concrete calculator determines wet and dry concrete volumes, 50 kg cement bags, fine sand, and coarse aggregate required for any beam dimensions and total beam span lengths, with built-in wastage allowances.`,
    howToUseSteps: [
      'Enter beam width, depth, and total linear span length.',
      'Input total number of identical beams.',
      'Choose concrete grade (M15, M20, M25).',
      'Review total wet/dry volume, cement bags, sand, and aggregate.'
    ],
    whatYouNeed: [
      'Beam Cross-Sectional Width and Depth',
      'Total Beam Span Length',
      'Concrete Mix Grade (M15 to M25)'
    ],
    formulaTitle: 'Beam Concrete Formulas',
    formulaDetails: [
      'Beam Volume = Width × Depth × Span Length × Beam Count',
      'Dry Volume = Beam Volume × 1.54',
      'Cement Bags = Dry Volume × (Cement Part / Mix Sum) / 1.226 CFT'
    ],
    formulaExplanation: 'Beam cross-sectional dimensions and total span length yield wet volume. Multiplying by dry factor 1.54 converts to loose batching materials.',
    exampleTitle: 'Step-by-Step Worked Example (Plinth Beam Concrete)',
    exampleText: 'For a plinth beam 9" wide (0.75 ft), 12" deep (1.0 ft), and 120 ft total running length using M20 concrete (1 : 1.5 : 3):\n1. Wet Volume = 0.75 × 1.0 × 120 = 90 CFT\n2. Dry Volume = 90 × 1.54 = 138.6 CFT\n3. Ratio Sum = 1 + 1.5 + 3 = 5.5\n4. Cement Bags = (138.6 × 1 / 5.5) / 1.226 = 20.5 bags (~21 bags of 50kg cement)',
    tips: [
      'Ensure beam bottom shuttering props are rigid and braced to avoid sag during concrete pouring.',
      'Maintain a 25mm clear concrete cover on beam top, bottom, and side reinforcement.',
      'Vibrate fresh concrete thoroughly around dense rebar stirrup zones.'
    ],
    workflowGroup: 'concrete'
  },

  'slab-calculator': {
    explanation: `RCC roof slabs are the largest single concrete pour in residential and commercial building construction. Slabs distribute live floor loads to supporting beams and columns. Standard residential slab thicknesses range from 4.5 inches to 6 inches (115mm to 150mm).

A mid-pour concrete shortage on a roof slab creates dangerous cold joints that compromise structural integrity and water tightness. This slab concrete calculator computes exact wet volume, expanded dry volume (1.54 factor), 50 kg cement bags, sand CFT/tons, coarse aggregate, and mixing water with an adjustable 5% wastage buffer.`,
    howToUseSteps: [
      'Enter slab length, width, and thickness (e.g., 4.5", 5", 6").',
      'Select concrete grade (M20 or M25 recommended).',
      'Adjust wastage margin (default 5%).',
      'Review total wet/dry concrete volume, cement bags, sand, aggregate, and water.'
    ],
    whatYouNeed: [
      'Slab Length and Width',
      'Slab Thickness (Inches or Meters)',
      'Concrete Grade (M20 or M25)',
      'Wastage Margin Allowance (%)'
    ],
    formulaTitle: 'Roof Slab Concrete Formulas',
    formulaDetails: [
      'Wet Volume = Length × Width × Thickness',
      'Total Wet Vol with Wastage = Wet Volume × (1 + Wastage %)',
      'Dry Volume = Total Wet Volume with Wastage × 1.54',
      'Cement Bags = Dry Volume × (1 / Ratio Sum) / 1.226 CFT'
    ],
    formulaExplanation: 'Slab area multiplied by thickness gives net wet volume. Wastage buffer and dry volume multiplier (1.54) are applied to calculate raw materials.',
    exampleTitle: 'Step-by-Step Worked Example (1,000 sq ft Roof Slab)',
    exampleText: 'For a 1,000 sq ft roof slab of 5 inches (0.4167 ft) thickness using M20 concrete (1 : 1.5 : 3) with 5% wastage:\n1. Net Wet Vol = 1000 × 0.4167 = 416.7 CFT\n2. Wet Vol with 5% Wastage = 416.7 × 1.05 = 437.5 CFT\n3. Dry Vol = 437.5 × 1.54 = 673.8 CFT\n4. Cement Bags = (673.8 × 1 / 5.5) / 1.226 = 99.9 bags (~100 bags of 50kg cement)\n5. Sand Vol = 673.8 × (1.5 / 5.5) = 183.8 CFT (~8.3 metric tons)\n6. Aggregate Vol = 673.8 × (3 / 5.5) = 367.5 CFT (~15.6 metric tons)',
    tips: [
      'Check formwork shuttering levels and support props thoroughly before authorizing slab pour.',
      'Build earth or sand mortar bunds on the cast slab after 24 hours to maintain 14 days of water pond curing.',
      'Keep extra standby vibrators and crew on site during slab casting day.'
    ],
    workflowGroup: 'concrete'
  },

  'construction-cost-calculator': {
    explanation: `Estimating total building construction costs is essential for homeowners, property developers, and civil contractors before groundbreaking. Total project costs depend on total built-up square footage, structural complexity, local material prices, and chosen finishing quality tier (Basic, Standard, Premium).

This construction cost calculator provides comprehensive project budget estimations based on built-up area. It breaks down total capital expenditure into standard civil engineering cost shares: cement (~16%), rebar steel (~15%), sand (~8%), coarse aggregate (~5%), bricks/blocks (~10%), labor (~25%), and finishing/fixtures (~21%).`,
    howToUseSteps: [
      'Enter total building built-up area in square feet or square meters.',
      'Select construction quality tier (Basic, Standard, Premium).',
      'Input local estimated rate per sq ft (or use default benchmarks).',
      'Obtain grand total building budget and itemized material/labor cost breakdown.'
    ],
    whatYouNeed: [
      'Total Built-up Area (sq ft or sq meters)',
      'Quality Tier (Basic, Standard, Premium)',
      'Estimated Unit Construction Rate per Sq Ft'
    ],
    formulaTitle: 'Building Construction Cost Formulas',
    formulaDetails: [
      'Grand Total Budget = Built-up Area × Cost per Sq Ft',
      'Cement Share (~16%) | Steel Share (~15%) | Sand Share (~8%)',
      'Aggregate Share (~5%) | Bricks/Blocks Share (~10%)',
      'Labor Share (~25%) | Finishing & Fixtures (~21%)'
    ],
    formulaExplanation: 'Built-up area is multiplied by unit rate to determine grand total budget. Civil engineering benchmark percentages are applied to generate itemized spending allocations.',
    exampleTitle: 'Step-by-Step Worked Example (1,500 sq ft Home Budget)',
    exampleText: 'For a 1,500 sq ft home at $30/sq ft standard construction rate:\n1. Total Construction Cost = 1,500 × $30 = $45,000\n2. Cement Budget (16%) = $7,200\n3. Steel Rebar Budget (15%) = $6,750\n4. Labor Charges (25%) = $11,250\n5. Finishing & Fixtures (21%) = $9,450',
    tips: [
      'Reserve a 10% contingency buffer for unforeseen ground condition variations or material price changes.',
      'Finalize architectural and structural drawings before starting construction to avoid late revision costs.',
      'Procure primary structural materials (cement, steel) directly in bulk from authorized distributors.'
    ],
    workflowGroup: 'cost'
  },

  'boq-estimator': {
    explanation: `A Bill of Quantities (BOQ) is a formal itemized financial document prepared in quantity surveying to list all materials, labor operations, plant equipment, and unit rates required for a construction project. BOQs serve as the standard basis for contractor bidding, tender evaluation, progress payments, and final cost accounting.

This interactive BOQ calculator allows users to add custom line items (e.g. excavation, concrete casting, brick masonry, plastering, tiling, painting), specify item descriptions, measurement units, quantities, and unit rates. It computes line totals, subtotal, taxes/contingencies, and produces a print-ready project cost report.`,
    howToUseSteps: [
      'Add construction line items (e.g., Excavation, RCC Concrete, Brickwork).',
      'Specify unit of measure (CFT, m³, sq ft, tons, bags) for each item.',
      'Enter estimated item quantity and unit rate.',
      'Adjust tax/contingency percentage if applicable.',
      'Review grand total cost and click "Print BOQ Report" to export a printable PDF sheet.'
    ],
    whatYouNeed: [
      'Itemized List of Construction Tasks',
      'Quantities and Units of Measure',
      'Contractor Unit Rates per Item',
      'Tax / Contingency Buffer %'
    ],
    formulaTitle: 'Bill of Quantities Formulas',
    formulaDetails: [
      'Line Item Amount = Quantity × Unit Rate',
      'Subtotal = Sum of All Line Item Amounts',
      'Tax / Contingency Amount = Subtotal × (Tax % / 100)',
      'Grand Total BOQ Cost = Subtotal + Tax / Contingency'
    ],
    formulaExplanation: 'Each item quantity is multiplied by its unit rate to compute line cost. Line costs are summed into subtotal, adjusted for tax/contingencies, yielding grand total estimate.',
    exampleTitle: 'Step-by-Step Worked Example (Sample BOQ Line Items)',
    exampleText: 'Sample BOQ Schedule:\n1. Excavation: 1,000 CFT @ $0.50/CFT = $500\n2. M20 Concrete: 500 CFT @ $4.00/CFT = $2,000\n3. Steel Rebar: 1.5 Tons @ $800/Ton = $1,200\n4. Subtotal = $3,700\n5. Add 5% Contingency = $185 -> Grand Total = $3,885',
    tips: [
      'Standardize unit descriptions (e.g. CUM, CFT, Sq Ft) so contractor quotes can be compared directly.',
      'Include clear specification notes detailing material grades (e.g., M20 concrete, Fe500 steel).',
      'Keep signed BOQ records for evaluating monthly contractor progress billing.'
    ],
    workflowGroup: 'cost'
  },

  'area-calculator': {
    explanation: `Geometrical 2D surface area calculation is a basic requirement for land surveying, architectural floor planning, and material estimation. Accurately measuring surface area determines required quantities for floor tiles, wall plastering, roof membrane waterproofing, and wall paint.

This geometric area calculator supports multiple 2D shapes: Rectangles, Squares, Triangles, Circles, and Trapezoids. By entering dimensions in feet, inches, or meters, users receive instant surface area calculations with automatic conversions across sq ft, sq meters, sq yards, and acres.`,
    howToUseSteps: [
      'Select shape type (Rectangle, Square, Triangle, Circle, Trapezoid).',
      'Enter required dimensional inputs.',
      'Select measurement units (Feet, Inches, Meters, CM).',
      'View calculated area in sq ft, sq m, sq yards, and acres.'
    ],
    whatYouNeed: [
      'Shape Type Selection',
      'Corresponding Linear Dimensions (Length, Width, Radius, Base, Height)',
      'Measurement Unit Choice'
    ],
    formulaTitle: 'Geometric Surface Area Formulas',
    formulaDetails: [
      'Rectangle Area = Length × Width',
      'Square Area = Side²',
      'Triangle Area = 0.5 × Base × Height',
      'Circle Area = π × Radius²',
      'Trapezoid Area = 0.5 × (Side A + Side B) × Height'
    ],
    formulaExplanation: 'Standard geometric area equations calculate surface coverage based on input shape dimensions.',
    exampleTitle: 'Step-by-Step Worked Example (Trapezoidal Plot Area)',
    exampleText: 'For a trapezoidal land plot with parallel front side = 40 ft, back side = 60 ft, and perpendicular depth = 50 ft:\n1. Area = 0.5 × (40 + 60) × 50 = 0.5 × 100 × 50 = 2,500 sq ft\n2. Convert to sq meters = 2,500 / 10.7639 = 232.26 sq m',
    tips: [
      'Divide complex irregular land boundaries into combinations of regular triangles and rectangles.',
      'Double check linear dimension measurements on site using laser distance meters.',
      'Convert all dimensions to identical units before multiplying.'
    ],
    workflowGroup: 'converters'
  },

  'volume-calculator': {
    explanation: `Calculating 3D cubic volume is essential in civil engineering for concrete batching, earthwork excavation, water tank storage capacity, and foundation pit volume. Accurate volumetric analysis ensures proper material procurement and structural design.

This 3D geometric volume calculator computes volume for Cuboids, Cubes, Cylinders, Cones, and Spheres. It converts cubic measurements across cubic feet (CFT), cubic meters (m³), liters, and gallons.`,
    howToUseSteps: [
      'Select 3D shape (Cuboid, Cube, Cylinder, Cone, Sphere).',
      'Enter shape dimensions (Length, Width, Height, Radius).',
      'Choose dimensional measurement unit.',
      'View total volume in CFT, m³, Liters, and US Gallons.'
    ],
    whatYouNeed: [
      '3D Shape Type Selection',
      'Shape Linear Dimensions',
      'Desired Output Units'
    ],
    formulaTitle: '3D Volume Formulas',
    formulaDetails: [
      'Cuboid Volume = Length × Width × Height',
      'Cube Volume = Side³',
      'Cylinder Volume = π × Radius² × Height',
      'Cone Volume = (1/3) × π × Radius² × Height',
      'Sphere Volume = (4/3) × π × Radius³'
    ],
    formulaExplanation: 'Geometric 3D volume equations determine total cubic space enclosed by shape boundaries.',
    exampleTitle: 'Step-by-Step Worked Example (Cylindrical Water Tank Volume)',
    exampleText: 'For a cylindrical concrete water tank with radius = 3 ft and height = 8 ft:\n1. Volume = π × 3² × 8 = 3.14159 × 9 × 8 = 226.19 CFT\n2. Volume in m³ = 226.19 / 35.315 = 6.405 m³\n3. Storage Capacity in Liters = 6.405 × 1,000 = 6,405 Liters',
    tips: [
      '1 cubic meter of water equals 1,000 liters (or ~264.17 US gallons).',
      '1 cubic foot of water equals 28.317 liters (or ~6.24 Imperial gallons).',
      'Ensure clear internal dimensions (excluding wall thickness) when calculating tank fluid capacity.'
    ],
    workflowGroup: 'converters'
  },

  'length-converter': {
    explanation: `Architectural floor plans and structural engineering detail drawings often mix imperial units (feet, inches, yards) and metric units (millimeters, centimeters, meters). Rapid length conversion prevents site misinterpretations during rebar layout and formwork framing.

This construction length converter provides bidirectional conversions across millimeters, centimeters, meters, inches, feet, and yards.`,
    howToUseSteps: [
      'Enter length value to convert.',
      'Select source unit (e.g., Feet or Meters).',
      'Select target conversion unit (e.g., Inches or Millimeters).',
      'View instant conversion output.'
    ],
    whatYouNeed: [
      'Input Numerical Length Value',
      'Source Length Unit',
      'Target Output Unit'
    ],
    formulaTitle: 'Length Unit Conversion Factors',
    formulaDetails: [
      '1 Meter = 3.28084 Feet = 39.3701 Inches = 1,000 Millimeters',
      '1 Foot = 12 Inches = 0.3048 Meters = 304.8 Millimeters',
      '1 Inch = 25.4 Millimeters = 2.54 Centimeters',
      '1 Yard = 3 Feet = 0.9144 Meters'
    ],
    formulaExplanation: 'Input value is multiplied or divided by standard international metric-imperial conversion ratios.',
    exampleTitle: 'Step-by-Step Worked Example (Feet to Meters Conversion)',
    exampleText: 'Convert 100 feet to meters:\n1. Conversion factor: 1 foot = 0.3048 meters\n2. Calculation: 100 × 0.3048 = 30.48 meters',
    tips: [
      'Use millimeters (mm) for rebar diameters and steel detail drawings for high precision.',
      'Double check unit selectors when transferring dimensions from drawings to site tape measures.'
    ],
    workflowGroup: 'converters'
  },

  'area-converter': {
    explanation: `Land surveying and building floor plans utilize various land measurement units. Converting land plot areas accurately between square feet, square meters, square yards, acres, and hectares is essential for land purchasing and building coverage ratio (FAR/FSI) calculations.

This area unit converter enables instant conversion across all standard civil and land surveying area units.`,
    howToUseSteps: [
      'Enter surface area numerical value.',
      'Select source area unit (e.g., Square Feet or Acres).',
      'Select target conversion unit (e.g., Square Meters or Hectares).',
      'Read converted surface area result.'
    ],
    whatYouNeed: [
      'Numerical Surface Area Value',
      'Source Area Unit',
      'Target Conversion Area Unit'
    ],
    formulaTitle: 'Area Unit Conversion Ratios',
    formulaDetails: [
      '1 Square Meter = 10.7639 Square Feet = 1.19599 Square Yards',
      '1 Acre = 43,560 Square Feet = 4,046.86 Square Meters = 0.4047 Hectares',
      '1 Hectare = 2.47105 Acres = 107,639 Square Feet = 10,000 Square Meters',
      '1 Square Yard = 9 Square Feet = 0.836127 Square Meters'
    ],
    formulaExplanation: 'Input area is scaled using standard international area unit conversion ratios.',
    exampleTitle: 'Step-by-Step Worked Example (Acres to Sq Ft Conversion)',
    exampleText: 'Convert 0.5 acres to square feet:\n1. Conversion factor: 1 acre = 43,560 sq ft\n2. Calculation: 0.5 × 43,560 = 21,780 square feet',
    tips: [
      '1 acre equals 43,560 square feet (approx 208.71 ft × 208.71 ft square plot).',
      'Always verify local land survey unit definitions when evaluating property boundaries.'
    ],
    workflowGroup: 'converters'
  },

  'volume-converter': {
    explanation: `Converting material volume measurements between cubic feet (CFT), cubic meters (m³), liters, US gallons, and cubic yards is a daily requirement on construction sites. Ready-mix concrete trucks, sand suppliers, and water tankers supply materials in varying volumetric units.

This volume unit converter provides instant conversion across all fluid and solid construction volume units.`,
    howToUseSteps: [
      'Enter volume value.',
      'Choose source volume unit (e.g., CFT, CUM, Liters).',
      'Choose target output unit.',
      'Obtain converted volumetric output.'
    ],
    whatYouNeed: [
      'Numerical Volume Value',
      'Source Volume Unit',
      'Target Conversion Volume Unit'
    ],
    formulaTitle: 'Volume Conversion Ratios',
    formulaDetails: [
      '1 Cubic Meter (CUM) = 35.3147 Cubic Feet (CFT) = 1,000 Liters',
      '1 Cubic Foot (CFT) = 28.3168 Liters = 0.028317 CUM',
      '1 US Gallon = 3.78541 Liters | 1 UK Imperial Gallon = 4.54609 Liters',
      '1 Cubic Yard = 27 Cubic Feet = 0.764555 CUM'
    ],
    formulaExplanation: 'Input volume is multiplied or divided by international volumetric conversion factors.',
    exampleTitle: 'Step-by-Step Worked Example (CFT to Cubic Meters)',
    exampleText: 'Convert 500 CFT of concrete to cubic meters:\n1. Conversion factor: 1 CUM = 35.3147 CFT\n2. Calculation: 500 / 35.3147 = 14.158 cubic meters (CUM)',
    tips: [
      '1 CUM of concrete equals 35.315 CFT.',
      'When ordering ready-mix concrete (RMC), specify orders in cubic meters (m³).'
    ],
    workflowGroup: 'converters'
  },

  'unit-converter': {
    explanation: `Civil site engineers, quantity surveyors, and building contractors require a universal conversion tool to handle dimensional, weight, volume, and area units across metric and imperial systems. 

This multi-purpose construction unit converter handles length (feet, meters, inches, mm), area (sq ft, sq m, acres), volume (CFT, CUM, liters), and mass (kg, metric tons, lbs) with precision.`,
    howToUseSteps: [
      'Select conversion category (Length, Area, Volume, Weight).',
      'Enter value and select input unit.',
      'Select target output unit.',
      'View converted result.'
    ],
    whatYouNeed: [
      'Category Selection (Length, Area, Volume, Weight)',
      'Input Numerical Value',
      'Source and Target Units'
    ],
    formulaTitle: 'Universal Conversion Factors',
    formulaDetails: [
      'Length: 1 m = 3.28084 ft | 1 in = 25.4 mm',
      'Area: 1 m² = 10.7639 ft² | 1 acre = 43,560 ft²',
      'Volume: 1 m³ = 35.3147 CFT | 1 CFT = 28.317 Liters',
      'Weight: 1 Metric Ton = 1000 kg = 2204.62 lbs'
    ],
    formulaExplanation: 'Standard conversion factors convert values across metric and imperial systems.',
    exampleTitle: 'Step-by-Step Worked Example (Kilograms to Metric Tons)',
    exampleText: 'Convert 3,500 kg of rebar steel to metric tons:\n1. Calculation: 3,500 / 1,000 = 3.5 Metric Tons',
    tips: [
      'Verify whether US or UK imperial units are specified when converting liquid volumes.',
      'Keep unit references handy on site for checking vendor material receipts.'
    ],
    workflowGroup: 'converters'
  }
};

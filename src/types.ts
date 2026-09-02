export type CategoryId = 
  | 'concrete'
  | 'steel'
  | 'masonry'
  | 'flooring'
  | 'painting'
  | 'earthwork'
  | 'structural'
  | 'cost'
  | 'boq'
  | 'converters';

export type CalculatorId =
  | 'concrete-calculator'
  | 'steel-weight-calculator'
  | 'brick-calculator'
  | 'cement-calculator'
  | 'sand-calculator'
  | 'aggregate-calculator'
  | 'tile-calculator'
  | 'paint-calculator'
  | 'plaster-calculator'
  | 'flooring-calculator'
  | 'block-calculator'
  | 'excavation-calculator'
  | 'backfill-calculator'
  | 'footing-calculator'
  | 'column-calculator'
  | 'beam-calculator'
  | 'slab-calculator'
  | 'rebar-calculator'
  | 'steel-cutting-calculator'
  | 'area-calculator'
  | 'volume-calculator'
  | 'length-converter'
  | 'area-converter'
  | 'volume-converter'
  | 'construction-cost-calculator'
  | 'boq-estimator'
  | 'mortar-calculator'
  | 'concrete-mix-calculator'
  | 'unit-converter'
  | 'gfrc-mix-calculator'
  | 'ytong-aac-calculator'
  | 'staircase-calculator'
  | 'building-quantity-estimator'
  | 'saudi-cost-calculator'
  | 'retaining-wall-calculator';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  description: string;
  iconName: string;
  color: string;
  count: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorMeta {
  id: CalculatorId;
  title: string;
  shortDescription: string;
  fullDescription: string;
  categoryId: CategoryId;
  iconName: string;
  popular?: boolean;
  featured?: boolean;
  tags: string[];
  formulaSummary: string;
  faqs: FAQItem[];
  seoTitle: string;
  seoMetaDescription: string;
}

export interface ConcreteInputs {
  length: number;
  width: number;
  depth: number;
  unit: 'feet' | 'meters';
  mixRatio: 'M5' | 'M7.5' | 'M10' | 'M15' | 'M20' | 'M25' | 'custom';
  customCement: number;
  customSand: number;
  customAggregate: number;
  dryMultiplier: number;
  bagWeightKg: number; // 50kg standard
  wastagePercent?: number;
}

export interface ConcreteResults {
  wetVolumeCft: number;
  wetVolumeCum: number;
  dryVolumeCft: number;
  dryVolumeCum: number;
  cementBags: number;
  cementKg: number;
  cementCft: number;
  sandCft: number;
  sandCum?: number;
  sandKg: number;
  sandTons: number;
  aggregateCft: number;
  aggregateCum?: number;
  aggregateKg: number;
  aggregateTons: number;
  waterLitersEstimate: number;
  mixRatioLabel: string;
  mixRatioUsed?: string;
  steps: string[];
}

export interface SteelInputs {
  diameterMm: number;
  lengthMeters: number;
  quantity: number;
  steelType: 'Fe415' | 'Fe500' | 'Fe550' | 'Stainless';
}

export interface SteelResults {
  weightPerMeterKg: number;
  singleBarWeightKg: number;
  totalWeightKg: number;
  totalWeightTons: number;
  totalLengthMeters: number;
  steps: string[];
}

export interface BrickInputs {
  wallLength: number;
  wallHeight: number;
  wallThickness: number;
  wallUnit: 'feet' | 'inches' | 'meters' | 'cm';
  brickLength: number;
  brickWidth: number;
  brickHeight: number;
  brickUnit: 'mm' | 'inches' | 'cm';
  mortarThicknessMm: number;
  wastagePercent: number;
  deductDoorsWindowsSqFt?: number;
  presetSize?: string;
  wallThicknessUnit?: 'single' | 'double' | 'custom';
  wallThicknessMm?: number;
  brickLengthMm?: number;
  brickWidthMm?: number;
  brickHeightMm?: number;
}

export interface BrickResults {
  wallAreaSqFt: number;
  wallAreaSqM: number;
  wallVolumeCft: number;
  wallVolumeCum: number;
  brickModuleVolumeCm3: number;
  brickModuleVolumeCft: number;
  baseBricksRequired: number;
  wastageBricks: number;
  totalBricksRequired: number;
  actualBrickVolumeCft: number;
  mortarVolumeCft: number;
  mortarVolumeCum: number;
  cementBagsMortar: number;
  sandCftMortar: number;
  bricksWithoutMortar?: number;
  totalBricksWithWastage?: number;
  steps: string[];
}

export interface CementInputs {
  concreteVolume: number;
  volumeUnit: 'cft' | 'cum';
  mixRatio: 'M5' | 'M7.5' | 'M10' | 'M15' | 'M20' | 'M25';
}

export interface CementResults {
  cementBags: number;
  cementKg: number;
  dryVolume: number;
  sandCft: number;
  aggregateCft: number;
  steps: string[];
}

export interface SandInputs {
  concreteVolume: number;
  volumeUnit: 'cft' | 'cum';
  mixRatio: 'M5' | 'M7.5' | 'M10' | 'M15' | 'M20' | 'M25' | 'mortar-1:3' | 'mortar-1:4' | 'mortar-1:6';
  sandDensityKgCum: number;
}

export interface SandResults {
  sandCft: number;
  sandCum: number;
  sandKg: number;
  sandTons: number;
  sandBrass: number;
  steps: string[];
}

export interface AggregateInputs {
  concreteVolume: number;
  volumeUnit: 'cft' | 'cum';
  mixRatio: 'M5' | 'M7.5' | 'M10' | 'M15' | 'M20' | 'M25';
  aggregateDensityKgCum: number;
}

export interface AggregateResults {
  aggregateCft: number;
  aggregateCum: number;
  aggregateKg: number;
  aggregateTons: number;
  aggregateBrass: number;
  steps: string[];
}

export interface TileInputs {
  roomLength: number;
  roomWidth: number;
  roomUnit: 'feet' | 'meters';
  tileLength: number;
  tileWidth: number;
  tileUnit: 'inches' | 'feet' | 'cm';
  wastagePercent: number;
  tilesPerBox: number;
  skirtingIncluded: boolean;
  skirtingHeightInches: number;
}

export interface TileResults {
  roomAreaSqFt: number;
  roomAreaSqM: number;
  tileAreaSqFt: number;
  skirtingAreaSqFt: number;
  totalAreaToCoverSqFt: number;
  exactTilesNeeded: number;
  tilesWithWastage: number;
  totalBoxesNeeded: number;
  groutKgEstimate: number;
  steps: string[];
}

export interface PaintInputs {
  wallLength: number;
  wallHeight: number;
  numberOfWalls: number;
  wallUnit: 'feet' | 'meters';
  deductionAreaSqFt: number;
  coverageSqFtPerLiter: number;
  numberOfCoats: number;
  primerCoats: number;
}

export interface PaintResults {
  totalGrossWallAreaSqFt: number;
  netPaintAreaSqFt: number;
  netPaintAreaSqM: number;
  paintRequiredLiters: number;
  primerRequiredLiters: number;
  estimated15LBuckets: number;
  estimated4LBuckets: number;
  estimated1LBuckets: number;
  steps: string[];
}

export interface ConstructionCostInputs {
  currency: string;
  builtUpAreaM2: number;
  builtUpAreaSqFt?: number;
  qualityGrade?: 'basic' | 'standard' | 'premium';
  unitCostPerSqFt?: number;
  cementPricePerBag: number;
  sandPricePerM3: number;
  aggregatePricePerM3: number;
  brickPricePerPiece: number;
  steelPricePerKg: number;
  tilePricePerM2: number;
  paintPricePerLiter: number;
  masonDailyWage: number;
  masonDaysCount?: number;
  helperDailyWage: number;
  helperDaysCount?: number;
  transportation: number;
  otherExpenses: number;
  contingencyPercent: number;
  sandPricePerCft?: number;
  aggregatePricePerCft?: number;
  laborCostPerSqFt?: number;
}

export interface ConstructionCostResults {
  currency: string;
  builtUpAreaM2: number;
  builtUpAreaSqFt: number;
  materialCost: number;
  laborCost: number;
  transportation: number;
  otherExpenses: number;
  contingency: number;
  grandTotal: number;
  costPerM2: number;
  costPerSqFt: number;
  materialBreakdown: {
    cementCost: number;
    cementBags: number;
    sandCost: number;
    sandM3: number;
    aggregateCost: number;
    aggregateM3: number;
    brickCost: number;
    brickPieces: number;
    steelCost: number;
    steelKg: number;
    tileCost: number;
    tileM2: number;
    paintCost: number;
    paintLiters: number;
  };
  laborBreakdown: {
    masonCost: number;
    masonDays: number;
    helperCost: number;
    helperDays: number;
  };
  totalEstimatedCost: number;
  cementCost: number;
  sandCost: number;
  aggregateCost: number;
  steelCost: number;
  brickCost: number;
  finishingCost: number;
  fittingsCost: number;
  contractorMarginCost: number;
  breakdown: { item: string; cost: number; percentage: number; color: string }[];
  steps: string[];
}

export interface AreaVolumeInputs {
  shape: 'rectangle' | 'square' | 'triangle' | 'circle' | 'cuboid' | 'cylinder' | 'trapezoid';
  dimA: number;
  dimB: number;
  dimC: number;
  dimHeight: number;
  dimRadius: number;
  unit: 'meters' | 'feet' | 'inches' | 'cm';
}

export interface AreaVolumeResults {
  areaSqUnits: number;
  volumeCuUnits: number;
  perimeterUnits: number;
  formulaUsed: string;
  steps: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
  imageTag: string;
}

export interface PlasterInputs {
  wallLength: number;
  wallHeight: number;
  thicknessMm: number;
  mixRatio: '1:3' | '1:4' | '1:5' | '1:6';
  wastagePercent: number;
  unit: 'feet' | 'meters';
}

export interface PlasterResults {
  plasterAreaSqFt: number;
  plasterAreaSqM: number;
  wetMortarVolumeCft: number;
  dryMortarVolumeCft: number;
  cementBags: number;
  sandCft: number;
  sandTons: number;
  steps: string[];
}

export interface FlooringInputs {
  roomLength: number;
  roomWidth: number;
  roomUnit: 'ft' | 'm';
  pieceLength: number;
  pieceWidth: number;
  pieceUnit: 'in' | 'cm' | 'ft' | 'm';
  wastagePercent: number;
}

export interface FlooringResults {
  floorAreaSqFt: number;
  floorAreaSqM: number;
  singlePieceAreaSqFt: number;
  rawPiecesNeeded: number;
  wastagePieces: number;
  totalPiecesRequired: number;
  totalAreaWithWastageSqFt: number;
  steps: string[];
}

export interface BlockInputs {
  wallLength: number;
  wallHeight: number;
  wallThickness: number;
  wallUnit: 'ft' | 'm';
  blockLength: number;
  blockHeight: number;
  blockWidth: number;
  blockUnit: 'mm' | 'cm' | 'in';
  mortarJointMm: number;
  wastagePercent: number;
}

export interface BlockResults {
  wallAreaSqFt: number;
  wallVolumeCft: number;
  wallVolumeCum: number;
  blocksRequired: number;
  wastageBlocks: number;
  totalBlocksRequired: number;
  approxMortarVolumeCft: number;
  steps: string[];
}

export interface ExcavationInputs {
  length: number;
  width: number;
  depth: number;
  numberOfPits: number;
  unit: 'ft' | 'm';
}

export interface ExcavationResults {
  singlePitVolumeCft: number;
  totalVolumeCft: number;
  totalVolumeCum: number;
  formulaUsed: string;
  steps: string[];
}

export interface BackfillInputs {
  length: number;
  width: number;
  depth: number;
  compactionPercent: number;
  unit: 'ft' | 'm';
}

export interface BackfillResults {
  rawVolumeCft: number;
  rawVolumeCum: number;
  compactedVolumeCft: number;
  compactedVolumeCum: number;
  requiredBackfillCft: number;
  requiredBackfillCum: number;
  steps: string[];
}

export interface FootingInputs {
  numberOfFootings: number;
  length: number;
  width: number;
  depth: number;
  unit: 'ft' | 'm';
  mixRatio: 'M5' | 'M7.5' | 'M10' | 'M15' | 'M20' | 'M25';
  wastagePercent: number;
}

export interface FootingResults {
  volumePerFootingCft: number;
  totalWetVolumeCft: number;
  totalWetVolumeCum: number;
  dryVolumeCft: number;
  cementBags: number;
  sandCft: number;
  aggregateCft: number;
  steps: string[];
}

export interface ColumnInputs {
  numberOfColumns: number;
  width: number;
  length: number;
  height: number;
  unit: 'ft' | 'm' | 'in';
  mixRatio: 'M5' | 'M7.5' | 'M10' | 'M15' | 'M20' | 'M25';
  wastagePercent: number;
}

export interface ColumnResults {
  volumePerColumnCft: number;
  totalWetVolumeCft: number;
  totalWetVolumeCum: number;
  dryVolumeCft: number;
  cementBags: number;
  sandCft: number;
  aggregateCft: number;
  steps: string[];
}

export interface BeamInputs {
  numberOfBeams: number;
  width: number;
  depth: number;
  length: number;
  unit: 'ft' | 'm' | 'in';
  mixRatio: 'M5' | 'M7.5' | 'M10' | 'M15' | 'M20' | 'M25';
  wastagePercent: number;
}

export interface BeamResults {
  volumePerBeamCft: number;
  totalWetVolumeCft: number;
  totalWetVolumeCum: number;
  dryVolumeCft: number;
  cementBags: number;
  sandCft: number;
  aggregateCft: number;
  steps: string[];
}

export interface SlabInputs {
  length: number;
  width: number;
  thickness: number;
  lengthUnit: 'ft' | 'm';
  thicknessUnit: 'in' | 'cm' | 'mm';
  mixRatio: 'M5' | 'M7.5' | 'M10' | 'M15' | 'M20' | 'M25';
  wastagePercent: number;
}

export interface SlabResults {
  wetVolumeCft: number;
  wetVolumeCum: number;
  dryVolumeCft: number;
  cementBags: number;
  sandCft: number;
  aggregateCft: number;
  steps: string[];
}

export interface SteelCuttingInputs {
  numberOfBars: number;
  barLengthMeters: number;
  diameterMm: number;
  lapLengthMeters: number;
  numberOfLaps: number;
}

export interface SteelCuttingResults {
  totalBarLengthMeters: number;
  weightPerMeterKg: number;
  totalWeightKg: number;
  totalWeightTons: number;
  steps: string[];
}

export interface MortarInputs {
  length: number;
  width: number;
  thickness: number;
  unit: 'ft' | 'm' | 'in';
  mixRatio: '1:3' | '1:4' | '1:5' | '1:6';
  wastagePercent: number;
}

export interface MortarResults {
  wetMortarVolumeCft: number;
  dryMortarVolumeCft: number;
  cementBags: number;
  sandCft: number;
  steps: string[];
}

export interface ConcreteMixInputs {
  mixGrade: 'M5' | 'M7.5' | 'M10' | 'M15' | 'M20' | 'M25';
  requiredWetVolume: number;
  volumeUnit: 'cft' | 'cum';
  wastagePercent: number;
  // Options used by ConcreteMixCalculator
  volume?: number;
  unit?: 'cft' | 'cum';
  waterCementRatio?: number;
}

export interface ConcreteMixResults {
  wetVolumeCft: number;
  dryVolumeCft: number;
  cementBags: number;
  sandCft: number;
  aggregateCft: number;
  waterLiters: number;
  cementWeightKg?: number;
  sandWeightKg?: number;
  aggregateWeightKg?: number;
  proportions?: { cement: number; sand: number; aggregate: number };
  steps: string[];
}

export interface AreaInputs {
  shape: 'rectangle' | 'square' | 'triangle' | 'circle';
  param1: number;
  param2?: number;
  unit: 'ft' | 'm' | 'yd';
}

export interface AreaResults {
  squareFeet: number;
  squareMeters: number;
  squareYards: number;
  steps: string[];
}

export interface VolumeInputs {
  shape: 'cuboid' | 'cylinder';
  param1: number;
  param2?: number;
  param3?: number;
  unit: 'ft' | 'm' | 'in';
}

export interface VolumeResults {
  cubicFeet: number;
  cubicMeters: number;
  cubicYards: number;
  steps: string[];
}

export interface UnitConverterInputs {
  value: number;
  fromUnit: string;
  toUnit: string;
}

export interface UnitConverterResults {
  convertedValue: number;
  unit: string;
}

export interface BOQItem {
  id: string;
  itemNo: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
  sectionId?: string;
  costComposition?: {
    materialRate?: number;
    labourRate?: number;
    equipmentRate?: number;
    overheadRate?: number;
    profitPercent?: number;
  };
  notes?: string;
}

export type ProjectType = 'Residential' | 'Commercial' | 'Industrial' | 'Infrastructure' | 'Other';
export type UnitSystem = 'Metric' | 'Imperial';
export type CurrencyCode = 'SAR' | 'AED' | 'USD' | 'EUR' | 'PKR' | 'GBP' | 'INR' | 'CAD' | 'QAR' | 'KWD' | 'OMR' | 'BHD';

export interface MaterialQuantityRollup {
  cementBags: number;
  steelKg: number;
  steelTons: number;
  concreteCum: number;
  concreteCft: number;
  sandCum: number;
  sandCft: number;
  sandTons: number;
  aggregateCum: number;
  aggregateCft: number;
  aggregateTons: number;
  bricksCount: number;
  blocksCount: number;
  tilesSqM: number;
  paintLiters: number;
}

export interface SavedCalculation {
  id: string;
  projectId: string;
  calculatorId: CalculatorId;
  calculatorTitle: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  category: CategoryId;
  inputs: Record<string, any>;
  results: Record<string, any>;
  primaryQuantity: number;
  primaryUnit: string;
  materialsRollup?: Partial<MaterialQuantityRollup>;
  notes?: string;
  addedToBOQ?: boolean;
}

export interface BOQSection {
  id: string;
  code: string;
  title: string;
  items: BOQItem[];
}

export interface ProjectBOQ {
  id: string;
  projectId: string;
  name: string;
  currency: CurrencyCode;
  unitSystem: UnitSystem;
  sections: BOQSection[];
  taxPercent: number; // VAT or local tax
  contingencyPercent: number;
  discountPercent?: number;
  lastUpdated: string;
}

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  location: string;
  clientName?: string;
  areaSqM?: number;
  areaSqFt?: number;
  numberOfFloors?: number;
  currency: CurrencyCode;
  unitSystem: UnitSystem;
  status: 'Planning' | 'In Progress' | 'Under Review' | 'Completed' | 'Archived';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  calculations: SavedCalculation[];
  boq: ProjectBOQ;
  estimatedCost: number;
  materialsCost?: number;
  labourCost?: number;
  equipmentCost?: number;
  otherCost?: number;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: 'Cement' | 'Steel' | 'Sand' | 'Aggregate' | 'Bricks' | 'Blocks' | 'Tiles' | 'Paint' | 'Electrical' | 'Plumbing' | 'Other';
  unit: string;
  defaultRate: number;
  currency: CurrencyCode;
  supplier?: string;
  gradeOrSpec?: string;
  densityKgCum?: number;
  notes?: string;
  isCustom?: boolean;
  lastUpdated: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  role?: string;
  defaultCurrency: CurrencyCode;
  defaultUnitSystem: UnitSystem;
  isGuest: boolean;
}

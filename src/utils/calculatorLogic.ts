import {
  ConcreteInputs,
  ConcreteResults,
  SteelInputs,
  SteelResults,
  BrickInputs,
  BrickResults,
  CementInputs,
  CementResults,
  SandInputs,
  SandResults,
  AggregateInputs,
  AggregateResults,
  TileInputs,
  TileResults,
  PaintInputs,
  PaintResults,
  ConstructionCostInputs,
  ConstructionCostResults,
  AreaVolumeInputs,
  AreaVolumeResults,
  PlasterInputs,
  PlasterResults,
  FlooringInputs,
  FlooringResults,
  BlockInputs,
  BlockResults,
  ExcavationInputs,
  ExcavationResults,
  BackfillInputs,
  BackfillResults,
  FootingInputs,
  FootingResults,
  ColumnInputs,
  ColumnResults,
  BeamInputs,
  BeamResults,
  SlabInputs,
  SlabResults,
  SteelCuttingInputs,
  SteelCuttingResults,
  MortarInputs,
  MortarResults,
  ConcreteMixInputs,
  ConcreteMixResults,
  AreaInputs,
  AreaResults,
  VolumeInputs,
  VolumeResults,
  UnitConverterInputs,
  UnitConverterResults
} from '../types';

// Standard Mix Ratios (Cement : Sand : Aggregate)
export const MIX_RATIOS = {
  M5: { cement: 1, sand: 5, aggregate: 10, label: '1 : 5 : 10' },
  'M7.5': { cement: 1, sand: 4, aggregate: 8, label: '1 : 4 : 8' },
  M10: { cement: 1, sand: 3, aggregate: 6, label: '1 : 3 : 6' },
  M15: { cement: 1, sand: 2, aggregate: 4, label: '1 : 2 : 4' },
  M20: { cement: 1, sand: 1.5, aggregate: 3, label: '1 : 1.5 : 3' },
  M25: { cement: 1, sand: 1, aggregate: 2, label: '1 : 1 : 2' }
};

// Helper rounding function
export const round = (num: number, decimals: number = 2): number => {
  const p = Math.pow(10, decimals);
  return Math.round((num + Number.EPSILON) * p) / p;
};

// 1. CONCRETE CALCULATOR
export function calculateConcrete(inputs: ConcreteInputs): ConcreteResults {
  const { length, width, depth, unit, mixRatio, wastagePercent } = inputs;

  let lengthFt = length;
  let widthFt = width;
  let depthFt = depth;

  const u = inputs.unit as string;
  if (u === 'm' || u === 'meters') {
    lengthFt = length * 3.28084;
    widthFt = width * 3.28084;
    depthFt = depth * 3.28084;
  } else if (u === 'cm') {
    lengthFt = length / 30.48;
    widthFt = width / 30.48;
    depthFt = depth / 30.48;
  } else if (u === 'mm') {
    lengthFt = length / 304.8;
    widthFt = width / 304.8;
    depthFt = depth / 304.8;
  } else if (u === 'in' || u === 'inches') {
    lengthFt = length / 12;
    widthFt = width / 12;
    depthFt = depth / 12;
  }

  const baseWetVolCft = lengthFt * widthFt * depthFt;
  const wetVolCft = baseWetVolCft * (1 + (wastagePercent || 0) / 100);
  const wetVolCum = wetVolCft / 35.3147;

  // Dry Volume Factor for Concrete = 1.54
  const dryVolCft = wetVolCft * 1.54;
  const dryVolCum = dryVolCft / 35.3147;

  const mix = MIX_RATIOS[mixRatio] || MIX_RATIOS.M20;
  const totalParts = mix.cement + mix.sand + mix.aggregate;

  const cementVolCft = (dryVolCft * mix.cement) / totalParts;
  const cementBags = cementVolCft / 1.226; // 1 Bag = 1.226 CFT
  const cementKg = cementBags * 50;

  const sandVolCft = (dryVolCft * mix.sand) / totalParts;
  const sandVolCum = sandVolCft / 35.3147;
  const sandKg = sandVolCum * 1600; // ~1600 kg/m3 density

  const aggregateVolCft = (dryVolCft * mix.aggregate) / totalParts;
  const aggregateVolCum = aggregateVolCft / 35.3147;
  const aggregateKg = aggregateVolCum * 1500; // ~1500 kg/m3 density

  const waterLiters = cementBags * 27.5; // ~27.5L per 50kg bag

  const steps = [
    `1. Wet Volume = ${round(baseWetVolCft, 2)} CFT | With Wastage (${wastagePercent || 0}%) = ${round(wetVolCft, 2)} CFT (${round(wetVolCum, 3)} m³)`,
    `2. Dry Volume (1.54 factor) = ${round(wetVolCft, 2)} × 1.54 = ${round(dryVolCft, 2)} CFT (${round(dryVolCum, 3)} m³)`,
    `3. Mix Grade ${mixRatio} Ratio (${mix.label}) -> Total Parts = ${totalParts}`,
    `4. Cement Volume = (${round(dryVolCft, 2)} × ${mix.cement}/${totalParts}) = ${round(cementVolCft, 2)} CFT`,
    `5. Cement Bags = ${round(cementVolCft, 2)} / 1.226 = ${round(cementBags, 2)} Bags (${round(cementKg, 1)} kg)`,
    `6. Sand Volume = (${round(dryVolCft, 2)} × ${mix.sand}/${totalParts}) = ${round(sandVolCft, 2)} CFT (${round(sandKg, 1)} kg)`,
    `7. Aggregate Volume = (${round(dryVolCft, 2)} × ${mix.aggregate}/${totalParts}) = ${round(aggregateVolCft, 2)} CFT (${round(aggregateKg, 1)} kg)`,
    `8. Water Volume = ${round(cementBags, 2)} bags × 27.5 L = ${round(waterLiters, 1)} Liters`
  ];

  return {
    wetVolumeCft: round(wetVolCft, 2),
    wetVolumeCum: round(wetVolCum, 3),
    dryVolumeCft: round(dryVolCft, 2),
    dryVolumeCum: round(dryVolCum, 3),
    cementBags: round(cementBags, 2),
    cementKg: round(cementKg, 1),
    cementCft: round(cementVolCft, 2),
    sandCft: round(sandVolCft, 2),
    sandCum: round(sandVolCum, 3),
    sandKg: round(sandKg, 1),
    aggregateCft: round(aggregateVolCft, 2),
    aggregateCum: round(aggregateVolCum, 3),
    aggregateKg: round(aggregateKg, 1),
    aggregateTons: round(aggregateVolCum * 1.5, 2),
    sandTons: round(sandVolCum * 1.6, 2),
    waterLitersEstimate: round(waterLiters, 1),
    mixRatioLabel: mix.label,
    mixRatioUsed: mix.label,
    steps
  };
}

// 2. STEEL WEIGHT CALCULATOR
export function calculateSteel(inputs: SteelInputs): SteelResults {
  const { diameterMm, lengthMeters, quantity } = inputs;

  const wtPerMeter = (diameterMm * diameterMm) / 162.2;
  const singleBarWeight = wtPerMeter * lengthMeters;
  const totalWeightKg = singleBarWeight * quantity;
  const totalWeightTons = totalWeightKg / 1000;
  const totalLengthMeters = lengthMeters * quantity;

  const steps = [
    `1. Weight per meter formula = D² / 162.2 = (${diameterMm}²) / 162.2 = ${round(wtPerMeter, 3)} kg/m`,
    `2. Single bar weight (${lengthMeters}m) = ${round(wtPerMeter, 3)} × ${lengthMeters} = ${round(singleBarWeight, 2)} kg`,
    `3. Total Steel Weight for ${quantity} bar(s) = ${round(singleBarWeight, 2)} × ${quantity} = ${round(totalWeightKg, 2)} kg (${round(totalWeightTons, 3)} Metric Tons)`
  ];

  return {
    weightPerMeterKg: round(wtPerMeter, 3),
    singleBarWeightKg: round(singleBarWeight, 2),
    totalWeightKg: round(totalWeightKg, 2),
    totalWeightTons: round(totalWeightTons, 3),
    totalLengthMeters: round(totalLengthMeters, 2),
    steps
  };
}

// 3. BRICK CALCULATOR
export function calculateBricks(inputs: BrickInputs): BrickResults {
  const wallUnit = inputs.wallUnit || 'feet';
  const wallLength = inputs.wallLength || 0;
  const wallHeight = inputs.wallHeight || 0;

  let wallThickness = inputs.wallThickness;
  if (!wallThickness && inputs.wallThicknessMm) {
    wallThickness = inputs.wallThicknessMm;
  }
  if (!wallThickness && inputs.wallThicknessUnit) {
    if (inputs.wallThicknessUnit === 'single') wallThickness = 4.5;
    else if (inputs.wallThicknessUnit === 'double') wallThickness = 9;
    else wallThickness = 9;
  }
  if (!wallThickness) wallThickness = 9;

  const brickUnit = inputs.brickUnit || 'mm';
  const brickLength = inputs.brickLength || inputs.brickLengthMm || 190;
  const brickWidth = inputs.brickWidth || inputs.brickWidthMm || 90;
  const brickHeight = inputs.brickHeight || inputs.brickHeightMm || 90;

  const mortarThicknessMm = inputs.mortarThicknessMm ?? 10;
  const wastagePercent = inputs.wastagePercent ?? 5;
  const deductDoorsWindowsSqFt = inputs.deductDoorsWindowsSqFt || 0;

  if (wallLength <= 0 || wallHeight <= 0 || wallThickness <= 0 || brickLength <= 0 || brickWidth <= 0 || brickHeight <= 0) {
    return {
      wallAreaSqFt: 0,
      wallAreaSqM: 0,
      wallVolumeCft: 0,
      wallVolumeCum: 0,
      brickModuleVolumeCm3: 0,
      brickModuleVolumeCft: 0,
      baseBricksRequired: 0,
      wastageBricks: 0,
      totalBricksRequired: 0,
      actualBrickVolumeCft: 0,
      mortarVolumeCft: 0,
      mortarVolumeCum: 0,
      cementBagsMortar: 0,
      sandCftMortar: 0,
      bricksWithoutMortar: 0,
      totalBricksWithWastage: 0,
      steps: ['Invalid dimensions provided. Please enter positive non-zero values.']
    };
  }

  let lengthM = 0;
  let heightM = 0;
  let thicknessM = 0;

  if (wallUnit === 'feet') {
    lengthM = wallLength * 0.3048;
    heightM = wallHeight * 0.3048;
    thicknessM = (inputs.wallThicknessUnit ? (wallThickness / 1000) : (wallThickness * 0.0254));
  } else if (wallUnit === 'inches') {
    lengthM = wallLength * 0.0254;
    heightM = wallHeight * 0.0254;
    thicknessM = wallThickness * 0.0254;
  } else if (wallUnit === 'meters') {
    lengthM = wallLength;
    heightM = wallHeight;
    thicknessM = inputs.wallThicknessUnit && inputs.wallThicknessMm ? inputs.wallThicknessMm / 1000 : wallThickness;
  } else if (wallUnit === 'cm') {
    lengthM = wallLength / 100;
    heightM = wallHeight / 100;
    thicknessM = wallThickness / 100;
  }

  if (thicknessM <= 0) thicknessM = 0.2286;

  const grossWallAreaSqM = lengthM * heightM;
  const grossWallAreaSqFt = grossWallAreaSqM * 10.7639;

  const netWallAreaSqFt = Math.max(0, grossWallAreaSqFt - deductDoorsWindowsSqFt);
  const netWallAreaSqM = netWallAreaSqFt / 10.7639;

  const wallVolCum = netWallAreaSqM * thicknessM;
  const wallVolCft = wallVolCum * 35.3147;

  let bLengthM = 0;
  let bWidthM = 0;
  let bHeightM = 0;

  if (brickUnit === 'mm') {
    bLengthM = brickLength / 1000;
    bWidthM = brickWidth / 1000;
    bHeightM = brickHeight / 1000;
  } else if (brickUnit === 'cm') {
    bLengthM = brickLength / 100;
    bWidthM = brickWidth / 100;
    bHeightM = brickHeight / 100;
  } else if (brickUnit === 'inches') {
    bLengthM = brickLength * 0.0254;
    bWidthM = brickWidth * 0.0254;
    bHeightM = brickHeight * 0.0254;
  }

  const singleBrickVolNoMortarM3 = bLengthM * bWidthM * bHeightM;

  const mortarThicknessM = mortarThicknessMm / 1000;
  const modLengthM = bLengthM + mortarThicknessM;
  const modWidthM = bWidthM + mortarThicknessM;
  const modHeightM = bHeightM + mortarThicknessM;

  const brickModuleVolM3 = modLengthM * modWidthM * modHeightM;
  const brickModuleVolCm3 = brickModuleVolM3 * 1_000_000;
  const brickModuleVolCft = brickModuleVolM3 * 35.3147;

  const baseBricksRaw = wallVolCum / brickModuleVolM3;
  const baseBricksRequired = Math.ceil(baseBricksRaw);
  const wastageBricks = Math.ceil(baseBricksRequired * (wastagePercent / 100));
  const totalBricksRequired = baseBricksRequired + wastageBricks;

  const totalBricksVolCum = baseBricksRequired * singleBrickVolNoMortarM3;
  const totalBricksVolCft = totalBricksVolCum * 35.3147;

  const mortarVolCum = Math.max(0, wallVolCum - totalBricksVolCum);
  const mortarVolCft = mortarVolCum * 35.3147;

  const dryMortarVolCft = mortarVolCft * 1.33;
  const cementBagsMortar = (dryMortarVolCft * (1 / 7)) / 1.226;
  const sandCftMortar = dryMortarVolCft * (6 / 7);

  const steps = [
    `1. Gross Wall Area = ${round(grossWallAreaSqFt, 2)} sq ft | Net Area = ${round(netWallAreaSqFt, 2)} sq ft (${round(netWallAreaSqM, 2)} m²)`,
    `2. Wall Volume = Wall Length × Height × Thickness = ${round(wallVolCft, 2)} CFT (${round(wallVolCum, 3)} m³)`,
    `3. Brick Module Volume (with ${mortarThicknessMm}mm mortar) = ${round(brickModuleVolCm3, 1)} cm³ (${round(brickModuleVolCft, 5)} CFT)`,
    `4. Base Bricks Required = Wall Volume / Brick Module Volume = ${baseBricksRequired} Bricks`,
    `5. Additional Bricks for Wastage (${wastagePercent}%) = ${wastageBricks} Bricks`,
    `6. Total Bricks Required = Base Bricks + Wastage = ${totalBricksRequired} Bricks`,
    `7. Actual Brick Net Volume = ${round(totalBricksVolCft, 2)} CFT (${round(totalBricksVolCum, 3)} m³)`,
    `8. Estimated Mortar Volume = Wall Volume - Actual Brick Volume = ${round(mortarVolCft, 2)} CFT (${round(mortarVolCum, 3)} m³)`
  ];

  return {
    wallAreaSqFt: round(netWallAreaSqFt, 2),
    wallAreaSqM: round(netWallAreaSqM, 2),
    wallVolumeCft: round(wallVolCft, 2),
    wallVolumeCum: round(wallVolCum, 3),
    brickModuleVolumeCm3: round(brickModuleVolCm3, 1),
    brickModuleVolumeCft: round(brickModuleVolCft, 5),
    baseBricksRequired,
    wastageBricks,
    totalBricksRequired,
    actualBrickVolumeCft: round(totalBricksVolCft, 2),
    mortarVolumeCft: round(mortarVolCft, 2),
    mortarVolumeCum: round(mortarVolCum, 3),
    cementBagsMortar: round(cementBagsMortar, 2),
    sandCftMortar: round(sandCftMortar, 2),
    bricksWithoutMortar: baseBricksRequired,
    totalBricksWithWastage: totalBricksRequired,
    steps
  };
}

// 4. CEMENT CALCULATOR
export function calculateCement(inputs: CementInputs): CementResults {
  const { concreteVolume, volumeUnit, mixRatio } = inputs;
  
  const volCft = volumeUnit === 'cft' ? concreteVolume : concreteVolume * 35.3147;
  const dryVolCft = volCft * 1.54;

  const mix = MIX_RATIOS[mixRatio] || MIX_RATIOS.M20;
  const totalParts = mix.cement + mix.sand + mix.aggregate;

  const cementCft = (dryVolCft * mix.cement) / totalParts;
  const cementBags = cementCft / 1.226;
  const cementKg = cementBags * 50;

  const sandCft = (dryVolCft * mix.sand) / totalParts;
  const aggregateCft = (dryVolCft * mix.aggregate) / totalParts;

  const steps = [
    `1. Input Concrete Volume = ${concreteVolume} ${volumeUnit.toUpperCase()} (${round(volCft, 2)} CFT)`,
    `2. Dry Volume (1.54 multiplier) = ${round(dryVolCft, 2)} CFT`,
    `3. Cement proportion for ${mixRatio} (${mix.cement}/${totalParts}) = ${round(cementCft, 2)} CFT`,
    `4. Total Cement Bags = ${round(cementCft, 2)} / 1.226 = ${round(cementBags, 2)} Bags (${round(cementKg, 1)} kg)`
  ];

  return {
    cementBags: round(cementBags, 2),
    cementKg: round(cementKg, 1),
    dryVolume: round(dryVolCft, 2),
    sandCft: round(sandCft, 2),
    aggregateCft: round(aggregateCft, 2),
    steps
  };
}

// 5. SAND CALCULATOR
export function calculateSand(inputs: SandInputs): SandResults {
  const { concreteVolume, volumeUnit, mixRatio, sandDensityKgCum } = inputs;

  const volCft = volumeUnit === 'cft' ? concreteVolume : concreteVolume * 35.3147;
  const dryVolCft = volCft * 1.54;

  let sRatio = 1.5;
  let totalParts = 5.5;

  if (mixRatio.startsWith('mortar-')) {
    if (mixRatio === 'mortar-1:3') { sRatio = 3; totalParts = 4; }
    else if (mixRatio === 'mortar-1:4') { sRatio = 4; totalParts = 5; }
    else { sRatio = 6; totalParts = 7; }
  } else if (MIX_RATIOS[mixRatio as keyof typeof MIX_RATIOS]) {
    const m = MIX_RATIOS[mixRatio as keyof typeof MIX_RATIOS];
    sRatio = m.sand;
    totalParts = m.cement + m.sand + m.aggregate;
  }

  const sandCft = (dryVolCft * sRatio) / totalParts;
  const sandCum = sandCft / 35.3147;
  const sandKg = sandCum * (sandDensityKgCum || 1600);
  const sandTons = sandKg / 1000;
  const sandBrass = sandCft / 100;

  const steps = [
    `1. Dry Volume = ${round(dryVolCft, 2)} CFT`,
    `2. Sand Volume = (${round(dryVolCft, 2)} × ${sRatio} / ${totalParts}) = ${round(sandCft, 2)} CFT`,
    `3. Sand Weight in Metric Tons = ${round(sandCum, 2)} m³ × ${sandDensityKgCum} kg/m³ = ${round(sandTons, 2)} Tons`,
    `4. Sand in Brass units = ${round(sandCft, 2)} / 100 = ${round(sandBrass, 2)} Brass`
  ];

  return {
    sandCft: round(sandCft, 2),
    sandCum: round(sandCum, 3),
    sandKg: round(sandKg, 1),
    sandTons: round(sandTons, 2),
    sandBrass: round(sandBrass, 2),
    steps
  };
}

// 6. AGGREGATE CALCULATOR
export function calculateAggregate(inputs: AggregateInputs): AggregateResults {
  const { concreteVolume, volumeUnit, mixRatio, aggregateDensityKgCum } = inputs;

  const volCft = volumeUnit === 'cft' ? concreteVolume : concreteVolume * 35.3147;
  const dryVolCft = volCft * 1.54;

  const mix = MIX_RATIOS[mixRatio] || MIX_RATIOS.M20;
  const totalParts = mix.cement + mix.sand + mix.aggregate;

  const aggCft = (dryVolCft * mix.aggregate) / totalParts;
  const aggCum = aggCft / 35.3147;
  const aggKg = aggCum * (aggregateDensityKgCum || 1500);
  const aggTons = aggKg / 1000;
  const aggBrass = aggCft / 100;

  const steps = [
    `1. Dry Volume = ${round(dryVolCft, 2)} CFT`,
    `2. Aggregate CFT = (${round(dryVolCft, 2)} × ${mix.aggregate} / ${totalParts}) = ${round(aggCft, 2)} CFT`,
    `3. Aggregate Weight = ${round(aggCum, 2)} m³ × ${aggregateDensityKgCum} kg/m³ = ${round(aggTons, 2)} Tons`,
    `4. Aggregate in Brass = ${round(aggCft, 2)} / 100 = ${round(aggBrass, 2)} Brass`
  ];

  return {
    aggregateCft: round(aggCft, 2),
    aggregateCum: round(aggCum, 3),
    aggregateKg: round(aggKg, 1),
    aggregateTons: round(aggTons, 2),
    aggregateBrass: round(aggBrass, 2),
    steps
  };
}

// 7. TILE CALCULATOR
export function calculateTiles(inputs: TileInputs): TileResults {
  const {
    roomLength,
    roomWidth,
    roomUnit,
    tileLength,
    tileWidth,
    tileUnit,
    wastagePercent,
    tilesPerBox,
    skirtingIncluded,
    skirtingHeightInches
  } = inputs;

  let roomAreaSqFt = roomUnit === 'feet' ? roomLength * roomWidth : (roomLength * 3.28084) * (roomWidth * 3.28084);
  const roomAreaSqM = roomAreaSqFt / 10.7639;

  let tileLengthFt = tileLength;
  let tileWidthFt = tileWidth;

  if (tileUnit === 'inches') {
    tileLengthFt = tileLength / 12;
    tileWidthFt = tileWidth / 12;
  } else if (tileUnit === 'cm') {
    tileLengthFt = tileLength / 30.48;
    tileWidthFt = tileWidth / 30.48;
  }

  const singleTileAreaSqFt = tileLengthFt * tileWidthFt;

  let skirtingAreaSqFt = 0;
  if (skirtingIncluded) {
    const perimeterFt = roomUnit === 'feet' ? (2 * (roomLength + roomWidth)) : (2 * (roomLength + roomWidth) * 3.28084);
    skirtingAreaSqFt = perimeterFt * (skirtingHeightInches / 12);
  }

  const totalAreaToCoverSqFt = roomAreaSqFt + skirtingAreaSqFt;
  const exactTilesNeeded = totalAreaToCoverSqFt / singleTileAreaSqFt;
  const tilesWithWastage = exactTilesNeeded * (1 + wastagePercent / 100);

  const boxesNeeded = tilesPerBox > 0 ? Math.ceil(tilesWithWastage / tilesPerBox) : 1;
  const groutKgEstimate = totalAreaToCoverSqFt * 0.08;

  const steps = [
    `1. Net Floor Area = ${round(roomAreaSqFt, 2)} sq ft (${round(roomAreaSqM, 2)} sq m)`,
    skirtingIncluded ? `2. Skirting Area = ${round(skirtingAreaSqFt, 2)} sq ft` : `2. Skirting Area = 0 sq ft`,
    `3. Single Tile Area = ${round(tileLengthFt, 2)} ft × ${round(tileWidthFt, 2)} ft = ${round(singleTileAreaSqFt, 3)} sq ft`,
    `4. Exact Tile Count = ${round(exactTilesNeeded, 1)} tiles`,
    `5. Tiles required with ${wastagePercent}% wastage = ${Math.ceil(tilesWithWastage)} tiles`,
    `6. Total Box Count (${tilesPerBox} tiles/box) = ${boxesNeeded} Boxes`
  ];

  return {
    roomAreaSqFt: round(roomAreaSqFt, 2),
    roomAreaSqM: round(roomAreaSqM, 2),
    tileAreaSqFt: round(singleTileAreaSqFt, 3),
    skirtingAreaSqFt: round(skirtingAreaSqFt, 2),
    totalAreaToCoverSqFt: round(totalAreaToCoverSqFt, 2),
    exactTilesNeeded: Math.ceil(exactTilesNeeded),
    tilesWithWastage: Math.ceil(tilesWithWastage),
    totalBoxesNeeded: boxesNeeded,
    groutKgEstimate: round(groutKgEstimate, 1),
    steps
  };
}

// 8. PAINT CALCULATOR
export function calculatePaint(inputs: PaintInputs): PaintResults {
  const {
    wallLength,
    wallHeight,
    numberOfWalls,
    wallUnit,
    deductionAreaSqFt,
    coverageSqFtPerLiter,
    numberOfCoats,
    primerCoats
  } = inputs;

  let singleWallAreaSqFt = wallUnit === 'feet' ? wallLength * wallHeight : (wallLength * 3.28084) * (wallHeight * 3.28084);
  const grossAreaSqFt = singleWallAreaSqFt * numberOfWalls;
  const netAreaSqFt = Math.max(0, grossAreaSqFt - deductionAreaSqFt);
  const netAreaSqM = netAreaSqFt / 10.7639;

  const totalPaintSquareFeetJob = netAreaSqFt * numberOfCoats;
  const paintLiters = totalPaintSquareFeetJob / (coverageSqFtPerLiter || 100);

  const totalPrimerSquareFeetJob = netAreaSqFt * primerCoats;
  const primerLiters = primerCoats > 0 ? totalPrimerSquareFeetJob / 120 : 0;

  let remainingLiters = Math.ceil(paintLiters);
  const b15 = Math.floor(remainingLiters / 15);
  remainingLiters %= 15;
  const b4 = Math.floor(remainingLiters / 4);
  remainingLiters %= 4;
  const b1 = Math.ceil(remainingLiters);

  const steps = [
    `1. Gross Wall Area = ${numberOfWalls} wall(s) × ${round(singleWallAreaSqFt, 2)} sq ft = ${round(grossAreaSqFt, 2)} sq ft`,
    `2. Net Area after doors/windows deductions = ${round(netAreaSqFt, 2)} sq ft`,
    `3. Total Surface Area to Paint (${numberOfCoats} coats) = ${round(totalPaintSquareFeetJob, 2)} sq ft`,
    `4. Paint Liters Required = ${round(totalPaintSquareFeetJob, 2)} / ${coverageSqFtPerLiter} sq ft/L = ${round(paintLiters, 2)} Liters`,
    primerCoats > 0 ? `5. Primer Liters (${primerCoats} coat) = ${round(primerLiters, 2)} Liters` : `5. Primer = Not selected`
  ];

  return {
    totalGrossWallAreaSqFt: round(grossAreaSqFt, 2),
    netPaintAreaSqFt: round(netAreaSqFt, 2),
    netPaintAreaSqM: round(netAreaSqM, 2),
    paintRequiredLiters: round(paintLiters, 2),
    primerRequiredLiters: round(primerLiters, 2),
    estimated15LBuckets: b15,
    estimated4LBuckets: b4,
    estimated1LBuckets: b1,
    steps
  };
}

// 9. CONSTRUCTION COST CALCULATOR
export function calculateConstructionCost(inputs: ConstructionCostInputs): ConstructionCostResults {
  const currency = inputs.currency || 'SAR';

  // Area conversions
  let areaM2 = inputs.builtUpAreaM2 || 0;
  if (areaM2 <= 0 && inputs.builtUpAreaSqFt && inputs.builtUpAreaSqFt > 0) {
    areaM2 = inputs.builtUpAreaSqFt / 10.7639;
  }
  if (areaM2 <= 0) areaM2 = 150; // default 150 m2
  const areaSqFt = areaM2 * 10.7639;

  // Material Quantity Estimates based on Civil Norms per m2
  const cementBags = round(areaM2 * 4.3, 1);
  const sandM3 = round(areaM2 * 0.55, 2);
  const aggregateM3 = round(areaM2 * 0.41, 2);
  const brickPieces = round(areaM2 * 194, 0);
  const steelKg = round(areaM2 * 43, 1);
  const tileM2 = round(areaM2 * 1.1, 1);
  const paintLiters = round(areaM2 * 0.35, 1);

  // Material Costs
  const cementCost = round(cementBags * (inputs.cementPricePerBag || 0), 2);
  const sandCost = round(sandM3 * (inputs.sandPricePerM3 || 0), 2);
  const aggregateCost = round(aggregateM3 * (inputs.aggregatePricePerM3 || 0), 2);
  const brickCost = round(brickPieces * (inputs.brickPricePerPiece || 0), 2);
  const steelCost = round(steelKg * (inputs.steelPricePerKg || 0), 2);
  const tileCost = round(tileM2 * (inputs.tilePricePerM2 || 0), 2);
  const paintCost = round(paintLiters * (inputs.paintPricePerLiter || 0), 2);

  const materialCost = round(
    cementCost + sandCost + aggregateCost + brickCost + steelCost + tileCost + paintCost,
    2
  );

  // Labor Costs
  const masonDays = inputs.masonDaysCount && inputs.masonDaysCount > 0 
    ? inputs.masonDaysCount 
    : Math.ceil(areaM2 * 0.25);
  const helperDays = inputs.helperDaysCount && inputs.helperDaysCount > 0 
    ? inputs.helperDaysCount 
    : Math.ceil(areaM2 * 0.35);

  const masonCost = round(masonDays * (inputs.masonDailyWage || 0), 2);
  const helperCost = round(helperDays * (inputs.helperDailyWage || 0), 2);
  const laborCost = round(masonCost + helperCost, 2);

  // Logistics & Other
  const transportCost = round(inputs.transportation || 0, 2);
  const otherCost = round(inputs.otherExpenses || 0, 2);

  // Subtotal & Contingency
  const subtotal = round(materialCost + laborCost + transportCost + otherCost, 2);
  const contingencyPct = inputs.contingencyPercent ?? 5;
  const contingency = round(subtotal * (contingencyPct / 100), 2);
  const grandTotal = round(subtotal + contingency, 2);

  const costPerM2 = round(grandTotal / areaM2, 2);
  const costPerSqFt = round(grandTotal / areaSqFt, 2);

  // Percentage Visualizer Breakdown
  const totalForShare = grandTotal || 1;
  const breakdown = [
    { item: 'Materials', cost: materialCost, percentage: round((materialCost / totalForShare) * 100, 1), color: '#0F2D5C' },
    { item: 'Labor', cost: laborCost, percentage: round((laborCost / totalForShare) * 100, 1), color: '#3B82F6' },
    { item: 'Transportation', cost: transportCost, percentage: round((transportCost / totalForShare) * 100, 1), color: '#D97706' },
    { item: 'Other Expenses', cost: otherCost, percentage: round((otherCost / totalForShare) * 100, 1), color: '#059669' },
    { item: `Contingency (${contingencyPct}%)`, cost: contingency, percentage: round((contingency / totalForShare) * 100, 1), color: '#F4B400' },
  ];

  const steps = [
    `1. Built-up Area = ${round(areaM2, 1)} m² (${round(areaSqFt, 0)} Sq Ft)`,
    `2. Material Cost = Cement (${currency} ${cementCost}) + Sand (${currency} ${sandCost}) + Aggregates (${currency} ${aggregateCost}) + Bricks (${currency} ${brickCost}) + Steel (${currency} ${steelCost}) + Tiles (${currency} ${tileCost}) + Paint (${currency} ${paintCost}) = ${currency} ${materialCost}`,
    `3. Labor Cost = Mason (${masonDays} days @ ${currency} ${inputs.masonDailyWage}) + Helper (${helperDays} days @ ${currency} ${inputs.helperDailyWage}) = ${currency} ${laborCost}`,
    `4. Logistics & Other = Transport (${currency} ${transportCost}) + Other (${currency} ${otherCost}) = ${currency} ${transportCost + otherCost}`,
    `5. Subtotal = ${currency} ${subtotal} | Contingency (${contingencyPct}%) = ${currency} ${contingency}`,
    `6. Grand Total Project Cost = ${currency} ${grandTotal}`,
    `7. Unit Cost Rates = ${currency} ${costPerM2} / m² | ${currency} ${costPerSqFt} / Sq Ft`
  ];

  return {
    currency,
    builtUpAreaM2: round(areaM2, 1),
    builtUpAreaSqFt: round(areaSqFt, 0),
    materialCost,
    laborCost,
    transportation: transportCost,
    otherExpenses: otherCost,
    contingency,
    grandTotal,
    costPerM2,
    costPerSqFt,
    materialBreakdown: {
      cementCost,
      cementBags,
      sandCost,
      sandM3,
      aggregateCost,
      aggregateM3,
      brickCost,
      brickPieces,
      steelCost,
      steelKg,
      tileCost,
      tileM2,
      paintCost,
      paintLiters,
    },
    laborBreakdown: {
      masonCost,
      masonDays,
      helperCost,
      helperDays,
    },
    totalEstimatedCost: grandTotal,
    cementCost,
    sandCost,
    aggregateCost,
    steelCost,
    brickCost,
    finishingCost: tileCost + paintCost,
    fittingsCost: otherCost,
    contractorMarginCost: contingency,
    breakdown,
    steps
  };
}

// 10. AREA & VOLUME CALCULATOR
export function calculateAreaVolume(inputs: AreaVolumeInputs): AreaVolumeResults {
  const { shape, dimA, dimB, dimHeight, dimRadius, unit } = inputs;

  let area = 0;
  let volume = 0;
  let perimeter = 0;
  let formula = '';

  if (shape === 'rectangle') {
    area = dimA * dimB;
    perimeter = 2 * (dimA + dimB);
    formula = 'Area = Length × Width | Perimeter = 2 × (L + W)';
  } else if (shape === 'square') {
    area = dimA * dimA;
    perimeter = 4 * dimA;
    formula = 'Area = Side² | Perimeter = 4 × Side';
  } else if (shape === 'triangle') {
    area = 0.5 * dimA * dimHeight;
    formula = 'Area = 0.5 × Base × Height';
  } else if (shape === 'circle') {
    area = Math.PI * dimRadius * dimRadius;
    perimeter = 2 * Math.PI * dimRadius;
    formula = 'Area = π × r² | Circumference = 2 × π × r';
  } else if (shape === 'cuboid') {
    area = dimA * dimB;
    volume = dimA * dimB * dimHeight;
    formula = 'Area = L × W | Volume = L × W × H';
  } else if (shape === 'cylinder') {
    area = Math.PI * dimRadius * dimRadius;
    volume = Math.PI * dimRadius * dimRadius * dimHeight;
    formula = 'Base Area = π × r² | Volume = π × r² × H';
  } else if (shape === 'trapezoid') {
    area = 0.5 * (dimA + dimB) * dimHeight;
    formula = 'Area = 0.5 × (a + b) × Height';
  }

  const steps = [
    `1. Shape selected = ${shape.toUpperCase()}`,
    `2. Formula used = ${formula}`,
    area > 0 ? `3. Computed Area = ${round(area, 3)} sq ${unit}` : ``,
    volume > 0 ? `4. Computed Volume = ${round(volume, 3)} cubic ${unit}` : ``,
    perimeter > 0 ? `5. Perimeter / Circumference = ${round(perimeter, 3)} ${unit}` : ``
  ].filter(Boolean);

  return {
    areaSqUnits: round(area, 3),
    volumeCuUnits: round(volume, 3),
    perimeterUnits: round(perimeter, 3),
    formulaUsed: formula,
    steps
  };
}

// 11. PLASTER CALCULATOR
export function calculatePlaster(inputs: PlasterInputs): PlasterResults {
  const { wallLength, wallHeight, thicknessMm, mixRatio, wastagePercent, unit } = inputs;
  
  const areaSqFt = unit === 'feet' ? wallLength * wallHeight : (wallLength * 3.28084) * (wallHeight * 3.28084);
  const areaSqM = areaSqFt / 10.7639;

  const thickM = (thicknessMm || 12) / 1000;
  const wetVolCum = areaSqM * thickM;
  const wetVolCft = wetVolCum * 35.3147;

  const dryVolCft = wetVolCft * 1.33;

  let cementRatio = 1;
  let sandRatio = 4;
  if (mixRatio === '1:3') sandRatio = 3;
  if (mixRatio === '1:5') sandRatio = 5;
  if (mixRatio === '1:6') sandRatio = 6;

  const totalParts = cementRatio + sandRatio;
  const cementVolCft = (dryVolCft * cementRatio) / totalParts;
  const cementBagsBase = cementVolCft / 1.226;
  const cementBagsWithWastage = cementBagsBase * (1 + (wastagePercent || 0) / 100);

  const sandVolCftBase = (dryVolCft * sandRatio) / totalParts;
  const sandVolCftWithWastage = sandVolCftBase * (1 + (wastagePercent || 0) / 100);
  const sandVolCumWithWastage = sandVolCftWithWastage / 35.3147;
  const sandTons = (sandVolCumWithWastage * 1600) / 1000;

  const steps = [
    `1. Plaster Wall Area = ${round(areaSqFt, 2)} sq ft (${round(areaSqM, 2)} sq m)`,
    `2. Wet Mortar Volume (${thicknessMm}mm thickness) = ${round(wetVolCft, 2)} CFT (${round(wetVolCum, 3)} m³)`,
    `3. Dry Volume (1.33 factor) = ${round(wetVolCft, 2)} × 1.33 = ${round(dryVolCft, 2)} CFT`,
    `4. Mix Ratio ${mixRatio} -> Cement = (${dryVolCft.toFixed(2)} × 1/${totalParts}) / 1.226 = ${round(cementBagsBase, 2)} Bags`,
    `5. Cement Bags including ${wastagePercent}% wastage = ${round(cementBagsWithWastage, 2)} Bags`,
    `6. Sand Required = ${round(sandVolCftWithWastage, 2)} CFT (~${round(sandTons, 2)} Tons)`
  ];

  return {
    plasterAreaSqFt: round(areaSqFt, 2),
    plasterAreaSqM: round(areaSqM, 2),
    wetMortarVolumeCft: round(wetVolCft, 2),
    dryMortarVolumeCft: round(dryVolCft, 2),
    cementBags: round(cementBagsWithWastage, 2),
    sandCft: round(sandVolCftWithWastage, 2),
    sandTons: round(sandTons, 2),
    steps
  };
}

// 12. FLOORING CALCULATOR
export function calculateFlooring(inputs: FlooringInputs): FlooringResults {
  const { roomLength, roomWidth, roomUnit, pieceLength, pieceWidth, pieceUnit, wastagePercent } = inputs;

  const roomAreaSqFt = roomUnit === 'ft' ? roomLength * roomWidth : (roomLength * 3.28084) * (roomWidth * 3.28084);
  const roomAreaSqM = roomAreaSqFt / 10.7639;

  let pieceLenFt = pieceLength;
  let pieceWidFt = pieceWidth;
  if (pieceUnit === 'in') { pieceLenFt = pieceLength / 12; pieceWidFt = pieceWidth / 12; }
  else if (pieceUnit === 'cm') { pieceLenFt = pieceLength / 30.48; pieceWidFt = pieceWidth / 30.48; }
  else if (pieceUnit === 'm') { pieceLenFt = pieceLength * 3.28084; pieceWidFt = pieceWidth * 3.28084; }

  const singlePieceAreaSqFt = pieceLenFt * pieceWidFt;
  const rawPieces = roomAreaSqFt / singlePieceAreaSqFt;
  const wastagePieces = rawPieces * ((wastagePercent || 5) / 100);
  const totalPieces = Math.ceil(rawPieces + wastagePieces);

  const totalAreaWithWastageSqFt = roomAreaSqFt * (1 + (wastagePercent || 5) / 100);

  const steps = [
    `1. Total Room Floor Area = ${round(roomAreaSqFt, 2)} sq ft (${round(roomAreaSqM, 2)} m²)`,
    `2. Single Piece Surface Area = ${round(pieceLenFt, 2)} ft × ${round(pieceWidFt, 2)} ft = ${round(singlePieceAreaSqFt, 3)} sq ft`,
    `3. Net Pieces Count = ${round(rawPieces, 1)} pieces`,
    `4. Wastage Buffer (${wastagePercent}%) = +${round(wastagePieces, 1)} pieces`,
    `5. Total Flooring Pieces Required = ${totalPieces} pieces`
  ];

  return {
    floorAreaSqFt: round(roomAreaSqFt, 2),
    floorAreaSqM: round(roomAreaSqM, 2),
    singlePieceAreaSqFt: round(singlePieceAreaSqFt, 3),
    rawPiecesNeeded: Math.ceil(rawPieces),
    wastagePieces: Math.ceil(wastagePieces),
    totalPiecesRequired: totalPieces,
    totalAreaWithWastageSqFt: round(totalAreaWithWastageSqFt, 2),
    steps
  };
}

// 13. CONCRETE BLOCK CALCULATOR
export function calculateBlock(inputs: BlockInputs): BlockResults {
  const { wallLength, wallHeight, wallThickness, wallUnit, blockLength, blockHeight, blockWidth, blockUnit, mortarJointMm, wastagePercent } = inputs;

  const wallLengthFt = wallUnit === 'ft' ? wallLength : wallLength * 3.28084;
  const wallHeightFt = wallUnit === 'ft' ? wallHeight : wallHeight * 3.28084;
  const wallThicknessFt = wallUnit === 'ft' ? wallThickness : wallThickness * 3.28084;

  const wallAreaSqFt = wallLengthFt * wallHeightFt;
  const wallVolCft = wallLengthFt * wallHeightFt * wallThicknessFt;
  const wallVolCum = wallVolCft / 35.3147;

  let bLenM = blockLength / 1000;
  let bHgtM = blockHeight / 1000;
  let bWidM = blockWidth / 1000;
  if (blockUnit === 'cm') { bLenM = blockLength / 100; bHgtM = blockHeight / 100; bWidM = blockWidth / 100; }
  else if (blockUnit === 'in') { bLenM = blockLength * 0.0254; bHgtM = blockHeight * 0.0254; bWidM = blockWidth * 0.0254; }

  const mortarM = (mortarJointMm || 10) / 1000;
  const moduleVolM3 = (bLenM + mortarM) * (bHgtM + mortarM) * (bWidM + mortarM);

  const rawBlocks = wallVolCum / moduleVolM3;
  const baseBlocks = Math.ceil(rawBlocks);
  const wastageBlocks = Math.ceil(baseBlocks * ((wastagePercent || 5) / 100));
  const totalBlocks = baseBlocks + wastageBlocks;

  const singleBlockVolM3 = bLenM * bHgtM * bWidM;
  const netBlocksVolCum = baseBlocks * singleBlockVolM3;
  const mortarVolCum = Math.max(0, wallVolCum - netBlocksVolCum);
  const mortarVolCft = mortarVolCum * 35.3147;

  const steps = [
    `1. Gross Wall Volume = ${round(wallVolCft, 2)} CFT (${round(wallVolCum, 3)} m³)`,
    `2. Block Module Vol (with ${mortarJointMm}mm mortar) = ${round(moduleVolM3 * 1e6, 1)} cm³`,
    `3. Base Blocks Required = ${baseBlocks} pcs`,
    `4. Wastage (${wastagePercent}%) = +${wastageBlocks} pcs`,
    `5. Total Concrete Blocks Required = ${totalBlocks} pcs`,
    `6. Estimated Mortar Volume = ${round(mortarVolCft, 2)} CFT (${round(mortarVolCum, 3)} m³)`
  ];

  return {
    wallAreaSqFt: round(wallAreaSqFt, 2),
    wallVolumeCft: round(wallVolCft, 2),
    wallVolumeCum: round(wallVolCum, 3),
    blocksRequired: baseBlocks,
    wastageBlocks,
    totalBlocksRequired: totalBlocks,
    approxMortarVolumeCft: round(mortarVolCft, 2),
    steps
  };
}

// 14. EXCAVATION CALCULATOR
export function calculateExcavation(inputs: ExcavationInputs): ExcavationResults {
  const { length, width, depth, numberOfPits, unit } = inputs;

  let singleVolCft = 0;
  if (unit === 'ft') {
    singleVolCft = length * width * depth;
  } else {
    const singleVolCum = length * width * depth;
    singleVolCft = singleVolCum * 35.3147;
  }

  const totalVolCft = singleVolCft * (numberOfPits || 1);
  const totalVolCum = totalVolCft / 35.3147;
  const formulaUsed = 'Excavation Volume = Length × Width × Depth × Number of Pits';

  const steps = [
    `1. Dimensions per Pit = ${length} × ${width} × ${depth} ${unit}`,
    `2. Single Pit Volume = ${round(singleVolCft, 2)} CFT`,
    `3. Total Volume for ${numberOfPits || 1} Pit(s) = ${round(totalVolCft, 2)} CFT (${round(totalVolCum, 2)} m³)`
  ];

  return {
    singlePitVolumeCft: round(singleVolCft, 2),
    totalVolumeCft: round(totalVolCft, 2),
    totalVolumeCum: round(totalVolCum, 2),
    formulaUsed,
    steps
  };
}

// 15. BACKFILL CALCULATOR
export function calculateBackfill(inputs: BackfillInputs): BackfillResults {
  const { length, width, depth, compactionPercent, unit } = inputs;

  let rawVolCft = 0;
  if (unit === 'ft') {
    rawVolCft = length * width * depth;
  } else {
    rawVolCft = (length * width * depth) * 35.3147;
  }

  const rawVolCum = rawVolCft / 35.3147;
  const extraMultiplier = 1 + (compactionPercent || 15) / 100;
  const requiredCft = rawVolCft * extraMultiplier;
  const requiredCum = requiredCft / 35.3147;

  const steps = [
    `1. Trench/Pit Void Volume = ${round(rawVolCft, 2)} CFT (${round(rawVolCum, 2)} m³)`,
    `2. Compaction & Shrinkage Allowance = +${compactionPercent}%`,
    `3. Total Required Loose Soil / Backfill Material = ${round(requiredCft, 2)} CFT (${round(requiredCum, 2)} m³)`
  ];

  return {
    rawVolumeCft: round(rawVolCft, 2),
    rawVolumeCum: round(rawVolCum, 2),
    compactedVolumeCft: round(rawVolCft, 2),
    compactedVolumeCum: round(rawVolCum, 2),
    requiredBackfillCft: round(requiredCft, 2),
    requiredBackfillCum: round(requiredCum, 2),
    steps
  };
}

// 16. FOOTING CONCRETE CALCULATOR
export function calculateFooting(inputs: FootingInputs): FootingResults {
  const { numberOfFootings, length, width, depth, unit, mixRatio, wastagePercent } = inputs;

  let singleWetCft = unit === 'ft' ? length * width * depth : (length * width * depth) * 35.3147;
  const totalWetCft = singleWetCft * (numberOfFootings || 1) * (1 + (wastagePercent || 0) / 100);
  const totalWetCum = totalWetCft / 35.3147;

  const dryVolCft = totalWetCft * 1.54;

  const mix = MIX_RATIOS[mixRatio] || MIX_RATIOS.M20;
  const totalParts = mix.cement + mix.sand + mix.aggregate;

  const cementCft = (dryVolCft * mix.cement) / totalParts;
  const cementBags = cementCft / 1.226;
  const sandCft = (dryVolCft * mix.sand) / totalParts;
  const aggregateCft = (dryVolCft * mix.aggregate) / totalParts;

  const steps = [
    `1. Single Footing Volume = ${round(singleWetCft, 2)} CFT`,
    `2. Total Wet Concrete for ${numberOfFootings} footing(s) (incl. ${wastagePercent}% wastage) = ${round(totalWetCft, 2)} CFT (${round(totalWetCum, 2)} m³)`,
    `3. Dry Volume (1.54 factor) = ${round(dryVolCft, 2)} CFT`,
    `4. Mix Proportions for ${mixRatio} = ${mix.label}`,
    `5. Cement Bags = ${round(cementBags, 2)} Bags`,
    `6. Sand Quantity = ${round(sandCft, 2)} CFT`,
    `7. Coarse Aggregate = ${round(aggregateCft, 2)} CFT`
  ];

  return {
    volumePerFootingCft: round(singleWetCft, 2),
    totalWetVolumeCft: round(totalWetCft, 2),
    totalWetVolumeCum: round(totalWetCum, 2),
    dryVolumeCft: round(dryVolCft, 2),
    cementBags: round(cementBags, 2),
    sandCft: round(sandCft, 2),
    aggregateCft: round(aggregateCft, 2),
    steps
  };
}

// 17. COLUMN CONCRETE CALCULATOR
export function calculateColumn(inputs: ColumnInputs): ColumnResults {
  const { numberOfColumns, width, length, height, unit, mixRatio, wastagePercent } = inputs;

  let singleWetCft = 0;
  if (unit === 'ft') {
    singleWetCft = width * length * height;
  } else if (unit === 'in') {
    singleWetCft = (width / 12) * (length / 12) * (height / 12);
  } else {
    singleWetCft = (width * length * height) * 35.3147;
  }

  const totalWetCft = singleWetCft * (numberOfColumns || 1) * (1 + (wastagePercent || 0) / 100);
  const totalWetCum = totalWetCft / 35.3147;
  const dryVolCft = totalWetCft * 1.54;

  const mix = MIX_RATIOS[mixRatio] || MIX_RATIOS.M25;
  const totalParts = mix.cement + mix.sand + mix.aggregate;

  const cementCft = (dryVolCft * mix.cement) / totalParts;
  const cementBags = cementCft / 1.226;
  const sandCft = (dryVolCft * mix.sand) / totalParts;
  const aggregateCft = (dryVolCft * mix.aggregate) / totalParts;

  const steps = [
    `1. Single Column Volume = ${round(singleWetCft, 3)} CFT`,
    `2. Total Wet Concrete for ${numberOfColumns} column(s) = ${round(totalWetCft, 2)} CFT (${round(totalWetCum, 2)} m³)`,
    `3. Dry Volume (1.54 multiplier) = ${round(dryVolCft, 2)} CFT`,
    `4. Cement Bags = ${round(cementBags, 2)} Bags`,
    `5. Sand Quantity = ${round(sandCft, 2)} CFT`,
    `6. Coarse Aggregate = ${round(aggregateCft, 2)} CFT`
  ];

  return {
    volumePerColumnCft: round(singleWetCft, 3),
    totalWetVolumeCft: round(totalWetCft, 2),
    totalWetVolumeCum: round(totalWetCum, 2),
    dryVolumeCft: round(dryVolCft, 2),
    cementBags: round(cementBags, 2),
    sandCft: round(sandCft, 2),
    aggregateCft: round(aggregateCft, 2),
    steps
  };
}

// 18. BEAM CONCRETE CALCULATOR
export function calculateBeam(inputs: BeamInputs): BeamResults {
  const { numberOfBeams, width, depth, length, unit, mixRatio, wastagePercent } = inputs;

  let singleWetCft = 0;
  if (unit === 'ft') {
    singleWetCft = width * depth * length;
  } else if (unit === 'in') {
    singleWetCft = (width / 12) * (depth / 12) * (length / 12);
  } else {
    singleWetCft = (width * depth * length) * 35.3147;
  }

  const totalWetCft = singleWetCft * (numberOfBeams || 1) * (1 + (wastagePercent || 0) / 100);
  const totalWetCum = totalWetCft / 35.3147;
  const dryVolCft = totalWetCft * 1.54;

  const mix = MIX_RATIOS[mixRatio] || MIX_RATIOS.M20;
  const totalParts = mix.cement + mix.sand + mix.aggregate;

  const cementCft = (dryVolCft * mix.cement) / totalParts;
  const cementBags = cementCft / 1.226;
  const sandCft = (dryVolCft * mix.sand) / totalParts;
  const aggregateCft = (dryVolCft * mix.aggregate) / totalParts;

  const steps = [
    `1. Single Beam Volume = ${round(singleWetCft, 3)} CFT`,
    `2. Total Wet Volume for ${numberOfBeams} beam(s) = ${round(totalWetCft, 2)} CFT (${round(totalWetCum, 2)} m³)`,
    `3. Dry Volume (1.54 multiplier) = ${round(dryVolCft, 2)} CFT`,
    `4. Cement Bags = ${round(cementBags, 2)} Bags`,
    `5. Sand Quantity = ${round(sandCft, 2)} CFT`,
    `6. Coarse Aggregate = ${round(aggregateCft, 2)} CFT`
  ];

  return {
    volumePerBeamCft: round(singleWetCft, 3),
    totalWetVolumeCft: round(totalWetCft, 2),
    totalWetVolumeCum: round(totalWetCum, 2),
    dryVolumeCft: round(dryVolCft, 2),
    cementBags: round(cementBags, 2),
    sandCft: round(sandCft, 2),
    aggregateCft: round(aggregateCft, 2),
    steps
  };
}

// 19. SLAB CONCRETE CALCULATOR
export function calculateSlab(inputs: SlabInputs): SlabResults {
  const { length, width, thickness, lengthUnit, thicknessUnit, mixRatio, wastagePercent } = inputs;

  const lenFt = lengthUnit === 'ft' ? length : length * 3.28084;
  const widFt = lengthUnit === 'ft' ? width : width * 3.28084;

  let thickFt = thickness;
  if (thicknessUnit === 'in') thickFt = thickness / 12;
  else if (thicknessUnit === 'cm') thickFt = thickness / 30.48;
  else if (thicknessUnit === 'mm') thickFt = thickness / 304.8;

  const rawWetCft = lenFt * widFt * thickFt;
  const wetVolCft = rawWetCft * (1 + (wastagePercent || 0) / 100);
  const wetVolCum = wetVolCft / 35.3147;
  const dryVolCft = wetVolCft * 1.54;

  const mix = MIX_RATIOS[mixRatio] || MIX_RATIOS.M20;
  const totalParts = mix.cement + mix.sand + mix.aggregate;

  const cementCft = (dryVolCft * mix.cement) / totalParts;
  const cementBags = cementCft / 1.226;
  const sandCft = (dryVolCft * mix.sand) / totalParts;
  const aggregateCft = (dryVolCft * mix.aggregate) / totalParts;

  const steps = [
    `1. Slab Surface Area = ${round(lenFt * widFt, 2)} sq ft`,
    `2. Slab Thickness = ${thickness} ${thicknessUnit} (${round(thickFt, 3)} ft)`,
    `3. Net Wet Concrete Volume = ${round(wetVolCft, 2)} CFT (${round(wetVolCum, 2)} m³)`,
    `4. Dry Volume (1.54 factor) = ${round(dryVolCft, 2)} CFT`,
    `5. Cement Bags required = ${round(cementBags, 2)} Bags`,
    `6. Sand Quantity = ${round(sandCft, 2)} CFT`,
    `7. Coarse Aggregate = ${round(aggregateCft, 2)} CFT`
  ];

  return {
    wetVolumeCft: round(wetVolCft, 2),
    wetVolumeCum: round(wetVolCum, 2),
    dryVolumeCft: round(dryVolCft, 2),
    cementBags: round(cementBags, 2),
    sandCft: round(sandCft, 2),
    aggregateCft: round(aggregateCft, 2),
    steps
  };
}

// 20. STEEL BAR CUTTING / LENGTH CALCULATOR
export function calculateSteelCutting(inputs: SteelCuttingInputs): SteelCuttingResults {
  const { numberOfBars, barLengthMeters, diameterMm, lapLengthMeters, numberOfLaps } = inputs;

  const singleBarLen = barLengthMeters + (lapLengthMeters * numberOfLaps);
  const totalLenMeters = singleBarLen * numberOfBars;

  const wtPerMeter = (diameterMm * diameterMm) / 162.2;
  const totalWeightKg = totalLenMeters * wtPerMeter;
  const totalWeightTons = totalWeightKg / 1000;

  const steps = [
    `1. Length per bar (including ${numberOfLaps} lap(s) @ ${lapLengthMeters}m) = ${round(singleBarLen, 2)} m`,
    `2. Total Reinforcement Length = ${numberOfBars} bars × ${round(singleBarLen, 2)} m = ${round(totalLenMeters, 2)} m`,
    `3. Unit Weight (D²/162.2) for ${diameterMm}mm bar = ${round(wtPerMeter, 3)} kg/m`,
    `4. Total Weight = ${round(totalLenMeters, 2)} m × ${round(wtPerMeter, 3)} kg/m = ${round(totalWeightKg, 2)} kg (${round(totalWeightTons, 3)} Tons)`
  ];

  return {
    totalBarLengthMeters: round(totalLenMeters, 2),
    weightPerMeterKg: round(wtPerMeter, 3),
    totalWeightKg: round(totalWeightKg, 2),
    totalWeightTons: round(totalWeightTons, 3),
    steps
  };
}

// 21. MORTAR CALCULATOR
export function calculateMortar(inputs: MortarInputs): MortarResults {
  const { length, width, thickness, unit, mixRatio, wastagePercent } = inputs;

  let wetCft = 0;
  if (unit === 'ft') wetCft = length * width * thickness;
  else if (unit === 'in') wetCft = (length / 12) * (width / 12) * (thickness / 12);
  else wetCft = (length * width * thickness) * 35.3147;

  const wetWithWastageCft = wetCft * (1 + (wastagePercent || 0) / 100);
  const dryCft = wetWithWastageCft * 1.33;

  let sRatio = 4;
  if (mixRatio === '1:3') sRatio = 3;
  if (mixRatio === '1:5') sRatio = 5;
  if (mixRatio === '1:6') sRatio = 6;

  const totalParts = 1 + sRatio;
  const cementCft = (dryCft * 1) / totalParts;
  const cementBags = cementCft / 1.226;
  const sandCft = (dryCft * sRatio) / totalParts;

  const steps = [
    `1. Wet Mortar Volume = ${round(wetCft, 2)} CFT`,
    `2. Dry Volume (1.33 factor + ${wastagePercent}% wastage) = ${round(dryCft, 2)} CFT`,
    `3. Mix Ratio ${mixRatio} -> Cement = ${round(cementCft, 2)} CFT = ${round(cementBags, 2)} Bags`,
    `4. Sand Required = ${round(sandCft, 2)} CFT`
  ];

  return {
    wetMortarVolumeCft: round(wetWithWastageCft, 2),
    dryMortarVolumeCft: round(dryCft, 2),
    cementBags: round(cementBags, 2),
    sandCft: round(sandCft, 2),
    steps
  };
}

// 22. CONCRETE MIX CALCULATOR
export function calculateConcreteMix(inputs: ConcreteMixInputs): ConcreteMixResults {
  const { volume, unit, mixGrade, waterCementRatio, wastagePercent } = inputs;

  const wetCft = unit === 'cft' ? volume : volume * 35.3147;
  const wetWithWastage = wetCft * (1 + (wastagePercent || 0) / 100);
  const dryCft = wetWithWastage * 1.54;

  const mix = MIX_RATIOS[mixGrade as keyof typeof MIX_RATIOS] || MIX_RATIOS.M20;
  const totalParts = mix.cement + mix.sand + mix.aggregate;

  const cementCft = (dryCft * mix.cement) / totalParts;
  const cementBags = cementCft / 1.226;
  const cementWeightKg = cementBags * 50;
  const sandCft = (dryCft * mix.sand) / totalParts;
  const sandWeightKg = (sandCft / 35.3147) * 1600;
  const aggregateCft = (dryCft * mix.aggregate) / totalParts;
  const aggregateWeightKg = (aggregateCft / 35.3147) * 1500;
  const waterLiters = cementWeightKg * (waterCementRatio || 0.5);

  const steps = [
    `1. Selected Concrete Grade = ${mixGrade} (${mix.label})`,
    `2. Net Wet Volume = ${round(wetCft, 2)} CFT | Dry Volume (1.54 factor) = ${round(dryCft, 2)} CFT`,
    `3. Cement Required = ${round(cementCft, 2)} CFT = ${round(cementBags, 2)} Bags (${round(cementWeightKg, 1)} kg)`,
    `4. Sand Quantity = ${round(sandCft, 2)} CFT (${round(sandWeightKg, 1)} kg)`,
    `5. Coarse Aggregate = ${round(aggregateCft, 2)} CFT (${round(aggregateWeightKg, 1)} kg)`,
    `6. Water Requirement (${waterCementRatio} W/C ratio) = ~${round(waterLiters, 1)} Liters`
  ];

  return {
    wetVolumeCft: round(wetWithWastage, 2),
    dryVolumeCft: round(dryCft, 2),
    cementBags: round(cementBags, 2),
    cementWeightKg: round(cementWeightKg, 1),
    sandCft: round(sandCft, 2),
    sandWeightKg: round(sandWeightKg, 1),
    aggregateCft: round(aggregateCft, 2),
    aggregateWeightKg: round(aggregateWeightKg, 1),
    waterLiters: round(waterLiters, 1),
    proportions: {
      cement: mix.cement,
      sand: mix.sand,
      aggregate: mix.aggregate
    },
    steps
  };
}

// 23. AREA GEOMETRY CALCULATOR
export function calculateArea(inputs: AreaInputs): AreaResults {
  const { shape, param1, param2, unit } = inputs;
  let sqFt = 0;

  if (shape === 'rectangle') {
    let p1Ft = param1;
    let p2Ft = param2 || 0;
    if (unit === 'm') { p1Ft *= 3.28084; p2Ft *= 3.28084; }
    else if (unit === 'yd') { p1Ft *= 3; p2Ft *= 3; }
    sqFt = p1Ft * p2Ft;
  } else if (shape === 'triangle') {
    let p1Ft = param1;
    let p2Ft = param2 || 0;
    if (unit === 'm') { p1Ft *= 3.28084; p2Ft *= 3.28084; }
    else if (unit === 'yd') { p1Ft *= 3; p2Ft *= 3; }
    sqFt = 0.5 * p1Ft * p2Ft;
  } else if (shape === 'circle') {
    let rFt = param1;
    if (unit === 'm') rFt *= 3.28084;
    else if (unit === 'yd') rFt *= 3;
    sqFt = Math.PI * rFt * rFt;
  }

  const sqM = sqFt / 10.7639;
  const sqYd = sqFt / 9;

  const steps = [
    `1. Shape = ${shape.toUpperCase()} in ${unit.toUpperCase()}`,
    `2. Calculated Area = ${round(sqFt, 2)} Sq Ft`,
    `3. Area in Sq Meters = ${round(sqM, 2)} Sq M`,
    `4. Area in Sq Yards = ${round(sqYd, 2)} Sq Yd`
  ];

  return {
    squareFeet: round(sqFt, 2),
    squareMeters: round(sqM, 2),
    squareYards: round(sqYd, 2),
    steps
  };
}

// 24. VOLUME GEOMETRY CALCULATOR
export function calculateVolume(inputs: VolumeInputs): VolumeResults {
  const { shape, param1, param2, param3, unit } = inputs;
  let cft = 0;

  if (shape === 'cuboid') {
    let p1Ft = param1;
    let p2Ft = param2 || 0;
    let p3Ft = param3 || 0;
    if (unit === 'm') { p1Ft *= 3.28084; p2Ft *= 3.28084; p3Ft *= 3.28084; }
    else if (unit === 'in') { p1Ft /= 12; p2Ft /= 12; p3Ft /= 12; }
    cft = p1Ft * p2Ft * p3Ft;
  } else if (shape === 'cylinder') {
    let rFt = param1;
    let hFt = param2 || 0;
    if (unit === 'm') { rFt *= 3.28084; hFt *= 3.28084; }
    else if (unit === 'in') { rFt /= 12; hFt /= 12; }
    cft = Math.PI * rFt * rFt * hFt;
  }

  const cum = cft / 35.3147;
  const cuyd = cft / 27;

  const steps = [
    `1. 3D Shape = ${shape.toUpperCase()} in ${unit.toUpperCase()}`,
    `2. Cubic Feet (CFT) = ${round(cft, 2)} CFT`,
    `3. Cubic Meters (m³) = ${round(cum, 2)} m³`,
    `4. Cubic Yards (yd³) = ${round(cuyd, 2)} yd³`
  ];

  return {
    cubicFeet: round(cft, 2),
    cubicMeters: round(cum, 2),
    cubicYards: round(cuyd, 2),
    steps
  };
}

// 25. UNIT CONVERTERS
export function convertLength(inputs: UnitConverterInputs): UnitConverterResults {
  const { value, fromUnit, toUnit } = inputs;
  if (fromUnit === toUnit) {
    return { convertedValue: value, unit: toUnit };
  }

  let meters = value;
  if (fromUnit === 'ft') meters = value * 0.3048;
  else if (fromUnit === 'in') meters = value * 0.0254;
  else if (fromUnit === 'yd') meters = value * 0.9144;
  else if (fromUnit === 'mm') meters = value / 1000;

  let result = meters;
  if (toUnit === 'ft') result = meters / 0.3048;
  else if (toUnit === 'in') result = meters / 0.0254;
  else if (toUnit === 'yd') result = meters / 0.9144;
  else if (toUnit === 'mm') result = meters * 1000;

  return {
    convertedValue: round(result, 4),
    unit: toUnit
  };
}

export function convertArea(inputs: UnitConverterInputs): UnitConverterResults {
  const { value, fromUnit, toUnit } = inputs;
  if (fromUnit === toUnit) {
    return { convertedValue: value, unit: toUnit };
  }

  let sqM = value;
  if (fromUnit === 'sqft') sqM = value * 0.092903;
  else if (fromUnit === 'sqyd') sqM = value * 0.836127;
  else if (fromUnit === 'acre') sqM = value * 4046.86;
  else if (fromUnit === 'hectare') sqM = value * 10000;

  let result = sqM;
  if (toUnit === 'sqft') result = sqM / 0.092903;
  else if (toUnit === 'sqyd') result = sqM / 0.836127;
  else if (toUnit === 'acre') result = sqM / 4046.86;
  else if (toUnit === 'hectare') result = sqM / 10000;

  return {
    convertedValue: round(result, 4),
    unit: toUnit
  };
}

export function convertVolume(inputs: UnitConverterInputs): UnitConverterResults {
  const { value, fromUnit, toUnit } = inputs;
  if (fromUnit === toUnit) {
    return { convertedValue: value, unit: toUnit };
  }

  let cum = value;
  if (fromUnit === 'cft') cum = value / 35.3147;
  else if (fromUnit === 'cuyd') cum = value * 0.764555;
  else if (fromUnit === 'liter') cum = value / 1000;

  let result = cum;
  if (toUnit === 'cft') result = cum * 35.3147;
  else if (toUnit === 'cuyd') result = cum / 0.764555;
  else if (toUnit === 'liter') result = cum * 1000;

  return {
    convertedValue: round(result, 4),
    unit: toUnit
  };
}

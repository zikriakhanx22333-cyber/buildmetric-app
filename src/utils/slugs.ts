import { CalculatorId } from '../types';
import { CALCULATORS } from '../data/calculators';

export const SLUG_TO_CALCULATOR_ID: Record<string, CalculatorId> = {
  'concrete': 'concrete-calculator',
  'steel-weight': 'steel-weight-calculator',
  'brick': 'brick-calculator',
  'cement': 'cement-calculator',
  'sand': 'sand-calculator',
  'aggregate': 'aggregate-calculator',
  'tile': 'tile-calculator',
  'paint': 'paint-calculator',
  'plaster': 'plaster-calculator',
  'construction-cost': 'construction-cost-calculator',
  'boq': 'boq-estimator',
  'concrete-mix': 'concrete-mix-calculator',
  'mortar': 'mortar-calculator',
  'rebar': 'rebar-calculator',
  'steel-cutting': 'steel-cutting-calculator',
  'block': 'block-calculator',
  'flooring': 'flooring-calculator',
  'excavation': 'excavation-calculator',
  'backfill': 'backfill-calculator',
  'footing': 'footing-calculator',
  'column': 'column-calculator',
  'beam': 'beam-calculator',
  'slab': 'slab-calculator',
  'area': 'area-calculator',
  'volume': 'volume-calculator',
  'length-converter': 'length-converter',
  'area-converter': 'area-converter',
  'volume-converter': 'volume-converter',
  'unit-converter': 'unit-converter',
};

export const CALCULATOR_ID_TO_SLUG: Record<CalculatorId, string> = {
  'concrete-calculator': 'concrete',
  'steel-weight-calculator': 'steel-weight',
  'brick-calculator': 'brick',
  'cement-calculator': 'cement',
  'sand-calculator': 'sand',
  'aggregate-calculator': 'aggregate',
  'tile-calculator': 'tile',
  'paint-calculator': 'paint',
  'plaster-calculator': 'plaster',
  'construction-cost-calculator': 'construction-cost',
  'boq-estimator': 'boq',
  'concrete-mix-calculator': 'concrete-mix',
  'mortar-calculator': 'mortar',
  'rebar-calculator': 'rebar',
  'steel-cutting-calculator': 'steel-cutting',
  'block-calculator': 'block',
  'flooring-calculator': 'flooring',
  'excavation-calculator': 'excavation',
  'backfill-calculator': 'backfill',
  'footing-calculator': 'footing',
  'column-calculator': 'column',
  'beam-calculator': 'beam',
  'slab-calculator': 'slab',
  'area-calculator': 'area',
  'volume-calculator': 'volume',
  'length-converter': 'length-converter',
  'area-converter': 'area-converter',
  'volume-converter': 'volume-converter',
  'unit-converter': 'unit-converter',
};

export function getSlugFromId(id: CalculatorId): string {
  return CALCULATOR_ID_TO_SLUG[id] || id;
}

export function getIdFromSlug(slug: string): CalculatorId | null {
  if (SLUG_TO_CALCULATOR_ID[slug]) {
    return SLUG_TO_CALCULATOR_ID[slug];
  }
  const found = CALCULATORS.find(c => c.id === slug);
  if (found) {
    return found.id;
  }
  return null;
}

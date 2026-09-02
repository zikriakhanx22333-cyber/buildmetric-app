import { CalculatorId } from '../types';
import { CALCULATORS } from '../data/calculators';

export const SLUG_TO_CALCULATOR_ID: Record<string, CalculatorId> = {
  // Short slugs
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

  // Full SEO Slugs (Hierarchical Directory Architecture)
  'concrete-volume-calculator': 'concrete-calculator',
  'beam-volume-calculator': 'beam-calculator',
  'steel-weight-calculator': 'steel-weight-calculator',
  'rebar-weight-calculator': 'rebar-calculator',
  'gfrc-mix-calculator': 'gfrc-mix-calculator',
  'gfrc-mix': 'gfrc-mix-calculator',
  'ytong-aac-calculator': 'ytong-aac-calculator',
  'ytong-aac': 'ytong-aac-calculator',
  'staircase-calculator': 'staircase-calculator',
  'staircase': 'staircase-calculator',
  'building-quantity-estimator': 'building-quantity-estimator',
  'building-quantity-calculator': 'building-quantity-estimator',
  'saudi-cost-calculator': 'saudi-cost-calculator',
  'saudi-material-calculator': 'saudi-cost-calculator',
  'cement-quantity-calculator': 'cement-calculator',
  'sand-calculator': 'sand-calculator',
  'aggregate-calculator': 'aggregate-calculator',
  'excavation-calculator': 'excavation-calculator',
  'backfill-calculator': 'backfill-calculator',
  'brick-quantity-calculator': 'brick-calculator',
  'block-quantity-calculator': 'block-calculator',
  'plaster-mortar-calculator': 'plaster-calculator',
  'tile-flooring-calculator': 'tile-calculator',
  'paint-quantity-calculator': 'paint-calculator',
  'retaining-wall-calculator': 'retaining-wall-calculator',
};

export const CALCULATOR_ID_TO_SLUG: Record<CalculatorId, string> = {
  'concrete-calculator': 'concrete-volume-calculator',
  'steel-weight-calculator': 'steel-weight-calculator',
  'brick-calculator': 'brick-quantity-calculator',
  'cement-calculator': 'cement-quantity-calculator',
  'sand-calculator': 'sand-calculator',
  'aggregate-calculator': 'aggregate-calculator',
  'tile-calculator': 'tile-flooring-calculator',
  'paint-calculator': 'paint-quantity-calculator',
  'plaster-calculator': 'plaster-mortar-calculator',
  'construction-cost-calculator': 'construction-cost',
  'boq-estimator': 'boq',
  'concrete-mix-calculator': 'concrete-mix',
  'mortar-calculator': 'mortar',
  'rebar-calculator': 'rebar-weight-calculator',
  'steel-cutting-calculator': 'steel-cutting',
  'block-calculator': 'block-quantity-calculator',
  'flooring-calculator': 'flooring',
  'excavation-calculator': 'excavation-calculator',
  'backfill-calculator': 'backfill-calculator',
  'footing-calculator': 'footing',
  'column-calculator': 'column',
  'beam-calculator': 'beam-volume-calculator',
  'slab-calculator': 'slab',
  'area-calculator': 'area',
  'volume-calculator': 'volume',
  'length-converter': 'length-converter',
  'area-converter': 'area-converter',
  'volume-converter': 'volume-converter',
  'unit-converter': 'unit-converter',
  'gfrc-mix-calculator': 'gfrc-mix-calculator',
  'ytong-aac-calculator': 'ytong-aac-calculator',
  'staircase-calculator': 'staircase-calculator',
  'building-quantity-estimator': 'building-quantity-estimator',
  'saudi-cost-calculator': 'saudi-cost-calculator',
  'retaining-wall-calculator': 'retaining-wall-calculator',
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

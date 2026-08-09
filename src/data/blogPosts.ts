import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'How to Calculate Concrete Mix Ratios (M15, M20, M25) Like a Civil Engineer',
    slug: 'concrete-mix-ratio-calculation-guide',
    summary: 'A complete step-by-step guide to calculating cement bags, sand volume, and coarse aggregate for RCC structural casting.',
    category: 'Concrete & Engineering',
    author: 'Eng. Marcus Vance, PE',
    date: 'August 2, 2026',
    readTime: '6 min read',
    imageTag: 'concrete-guide',
    content: `
      ## Understanding Concrete Mix Ratios
      Concrete is a composite material formed by mixing cement, fine aggregate (sand), coarse aggregate (gravel), and water in specified proportions.

      The grade of concrete (like M20 or M25) indicates its Characteristic Compressive Strength in N/mm² after 28 days of curing.
      - **M10 (1 : 3 : 6)** - Non-structural leveling layers & PCC beds.
      - **M15 (1 : 2 : 4)** - Plain cement concrete, driveways, boundary walls.
      - **M20 (1 : 1.5 : 3)** - Standard reinforced cement concrete (RCC) for slabs, beams, and columns.
      - **M25 (1 : 1 : 2)** - Heavy structural foundations, columns, and retaining walls.

      ## Why We Use the 1.54 Dry Volume Factor
      When dry cement, sand, and aggregates are mixed with water, the dry voids collapse. Fine sand grains fill the spaces between large stones.
      To produce **1.0 cubic meter of wet concrete**, you need **1.54 cubic meters of dry materials**.

      ### Formula Step-by-Step
      1. Calculate Wet Volume = Length × Width × Depth
      2. Calculate Dry Volume = Wet Volume × 1.54
      3. Sum of Mix Parts = (Cement Part + Sand Part + Aggregate Part)
      4. Cement Volume = Dry Volume × (Cement Part / Sum of Mix Parts)
      5. Number of Bags = Cement Volume (in CFT) / 1.226 CFT (per 50kg bag)
    `
  },
  {
    id: '2',
    title: 'The Steel Rebar Weight Formula (D²/162.2) Explained with Examples',
    slug: 'steel-rebar-weight-formula-explained',
    summary: 'Learn how civil engineers quickly estimate steel reinforcement tonnage without a weighing scale on site.',
    category: 'Steel & Structural',
    author: 'Sarah Jenkins, Structural Architect',
    date: 'July 28, 2026',
    readTime: '4 min read',
    imageTag: 'steel-guide',
    content: `
      ## The Famous D²/162.2 Equation
      On any active construction site, calculating rebar weight per meter is crucial for material delivery verification and cost control.

      The shortcut formula is:
      $$\\text{Weight (kg/m)} = \\frac{D^2}{162.2}$$
      where $D$ is the bar diameter in millimeters.

      ### Quick Reference Table
      - **8 mm rebar:** 0.395 kg/m
      - **10 mm rebar:** 0.617 kg/m
      - **12 mm rebar:** 0.888 kg/m
      - **16 mm rebar:** 1.580 kg/m
      - **20 mm rebar:** 2.469 kg/m
      - **25 mm rebar:** 3.858 kg/m
    `
  },
  {
    id: '3',
    title: 'How to Prevent Tile Wastage: Complete Estimation & Layout Guide',
    slug: 'tile-wastage-calculation-guide',
    summary: 'Avoid buying extra tile boxes or running short during floor installation with standard wastage margins.',
    category: 'Flooring & Finishes',
    author: 'David Ross, Interior Contractor',
    date: 'July 15, 2026',
    readTime: '5 min read',
    imageTag: 'tile-guide',
    content: `
      ## Tile Estimation Best Practices
      Whether tiling a small bathroom floor or a 2,000 sq ft hall, proper tile estimation saves money and prevents project delays.

      ### Key Factors to Consider
      1. **Net Floor Area:** Room Length × Room Width
      2. **Perimeter Skirting:** Add perimeter length multiplied by 4-inch or 6-inch skirting height.
      3. **Wastage Margin:**
         - Straight Grid Layout: **5% to 8%**
         - Diagonal/Herringbone Layout: **12% to 15%**
         - Large Format Vitrified Slabs: **10%**
    `
  }
];

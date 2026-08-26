import {
  Project,
  SavedCalculation,
  ProjectBOQ,
  BOQSection,
  BOQItem,
  MaterialItem,
  UserProfile,
  CurrencyCode,
  UnitSystem,
  ProjectType,
  MaterialQuantityRollup
} from '../types';

const STORAGE_KEYS = {
  PROJECTS: 'buildmetric_projects_v2',
  MATERIALS: 'buildmetric_materials_v2',
  USER_PROFILE: 'buildmetric_user_profile_v2',
  ACTIVE_PROJECT_ID: 'buildmetric_active_project_id_v2'
};

// Initial Seed Materials
export const DEFAULT_MATERIALS: MaterialItem[] = [
  {
    id: 'mat-1',
    name: 'Ordinary Portland Cement (Type I)',
    category: 'Cement',
    unit: 'Bag (50kg)',
    defaultRate: 23.5,
    currency: 'SAR',
    supplier: 'Yamama Cement / Saudi Cement',
    gradeOrSpec: 'OPC 42.5N / ASTM C150',
    densityKgCum: 1440,
    lastUpdated: '2026-08-20'
  },
  {
    id: 'mat-2',
    name: 'Sulphate Resistant Cement (SRC)',
    category: 'Cement',
    unit: 'Bag (50kg)',
    defaultRate: 26.0,
    currency: 'SAR',
    supplier: 'Saudi Cement Co.',
    gradeOrSpec: 'Type V / ASTM C150',
    densityKgCum: 1440,
    lastUpdated: '2026-08-20'
  },
  {
    id: 'mat-3',
    name: 'Deformed Steel Rebar (Fe 500 / Grade 60)',
    category: 'Steel',
    unit: 'Ton',
    defaultRate: 2450,
    currency: 'SAR',
    supplier: 'SABIC Steel / Al-Ittefaq',
    gradeOrSpec: 'ASTM A615 / SASO ISO 6935-2',
    densityKgCum: 7850,
    lastUpdated: '2026-08-20'
  },
  {
    id: 'mat-4',
    name: 'High Tensile Steel Rebar (Fe 550D)',
    category: 'Steel',
    unit: 'Ton',
    defaultRate: 2580,
    currency: 'SAR',
    supplier: 'SABIC Steel',
    gradeOrSpec: 'ASTM A706 / High Ductility',
    densityKgCum: 7850,
    lastUpdated: '2026-08-20'
  },
  {
    id: 'mat-5',
    name: 'Washed Concrete Coarse Sand',
    category: 'Sand',
    unit: 'm³',
    defaultRate: 45.0,
    currency: 'SAR',
    supplier: 'Local Quarry Jeddah/Riyadh',
    gradeOrSpec: 'Zone II River/Pit Sand',
    densityKgCum: 1600,
    lastUpdated: '2026-08-20'
  },
  {
    id: 'mat-6',
    name: 'Fine Plaster Sand (Dune Sand)',
    category: 'Sand',
    unit: 'm³',
    defaultRate: 38.0,
    currency: 'SAR',
    supplier: 'Red Sand Quarry',
    gradeOrSpec: 'Zone IV Plaster Sand',
    densityKgCum: 1550,
    lastUpdated: '2026-08-20'
  },
  {
    id: 'mat-7',
    name: 'Crushed Coarse Aggregate (20mm)',
    category: 'Aggregate',
    unit: 'm³',
    defaultRate: 52.0,
    currency: 'SAR',
    supplier: 'Crusher Plants',
    gradeOrSpec: 'Graded 20mm Granite/Limestone',
    densityKgCum: 1550,
    lastUpdated: '2026-08-20'
  },
  {
    id: 'mat-8',
    name: 'Crushed Coarse Aggregate (10mm)',
    category: 'Aggregate',
    unit: 'm³',
    defaultRate: 56.0,
    currency: 'SAR',
    supplier: 'Crusher Plants',
    gradeOrSpec: 'Graded 10mm Aggregate',
    densityKgCum: 1500,
    lastUpdated: '2026-08-20'
  },
  {
    id: 'mat-9',
    name: 'Standard Red Clay Bricks (220×105×65mm)',
    category: 'Bricks',
    unit: 'Pcs',
    defaultRate: 1.85,
    currency: 'SAR',
    supplier: 'Saudi Red Brick Co.',
    gradeOrSpec: 'Class A Burnt Clay Brick',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'mat-10',
    name: 'Hollow Concrete Blocks (400×200×200mm)',
    category: 'Blocks',
    unit: 'Pcs',
    defaultRate: 4.20,
    currency: 'SAR',
    supplier: 'Bina Precast / National Block Factory',
    gradeOrSpec: 'Load Bearing CMU 7.5 MPa',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'mat-11',
    name: 'Porcelain Floor Tiles (60×60 cm)',
    category: 'Tiles',
    unit: 'm²',
    defaultRate: 68.0,
    currency: 'SAR',
    supplier: 'Saudi Ceramic Co.',
    gradeOrSpec: 'First Choice Matte Finish R10',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'mat-12',
    name: 'Interior Acrylic Emulsion Paint',
    category: 'Paint',
    unit: 'Liter',
    defaultRate: 18.5,
    currency: 'SAR',
    supplier: 'Jotun / Berger / Jazeera',
    gradeOrSpec: 'Fenomastic Pure Colors Eggshell',
    lastUpdated: '2026-08-20'
  }
];

// Initial Seed Projects
export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-villa-jeddah',
    name: 'Villa Construction — Jeddah',
    type: 'Residential',
    location: 'Jeddah, Saudi Arabia',
    clientName: 'Al-Amoudi Properties',
    areaSqM: 450,
    areaSqFt: 4844,
    numberOfFloors: 2,
    currency: 'SAR',
    unitSystem: 'Metric',
    status: 'In Progress',
    notes: 'Luxury residential villa with 2 floors, roof annex, basement water tank and boundary wall.',
    createdAt: '2026-08-01T09:00:00.000Z',
    updatedAt: '2026-08-25T14:30:00.000Z',
    estimatedCost: 428500,
    materialsCost: 312400,
    labourCost: 86000,
    equipmentCost: 20100,
    otherCost: 10000,
    calculations: [
      {
        id: 'calc-1',
        projectId: 'proj-villa-jeddah',
        calculatorId: 'concrete-calculator',
        calculatorTitle: 'Concrete Volume & Mix Calculator',
        name: 'Foundation Raft & Footings Concrete',
        createdAt: '2026-08-02T10:15:00.000Z',
        updatedAt: '2026-08-02T10:15:00.000Z',
        category: 'concrete',
        inputs: { length: 18, width: 14, depth: 0.6, unit: 'meters', mixRatio: 'M25', dryMultiplier: 1.54 },
        results: { wetVolumeCum: 151.2, wetVolumeCft: 5339.6, cementBags: 1618, sandCum: 66.8, aggregateCum: 133.6, cementKg: 80900 },
        primaryQuantity: 151.2,
        primaryUnit: 'm³',
        materialsRollup: {
          concreteCum: 151.2,
          cementBags: 1618,
          sandCum: 66.8,
          aggregateCum: 133.6
        },
        addedToBOQ: true
      },
      {
        id: 'calc-2',
        projectId: 'proj-villa-jeddah',
        calculatorId: 'steel-weight-calculator',
        calculatorTitle: 'Steel Rebar Weight Calculator',
        name: 'Substructure Reinforcement Steel (16mm & 20mm)',
        createdAt: '2026-08-03T11:45:00.000Z',
        updatedAt: '2026-08-03T11:45:00.000Z',
        category: 'steel',
        inputs: { diameterMm: 16, lengthMeters: 12, quantity: 380, steelType: 'Fe500' },
        results: { weightPerMeterKg: 1.578, totalWeightKg: 7195.7, totalWeightTons: 7.2, totalLengthMeters: 4560 },
        primaryQuantity: 7.2,
        primaryUnit: 'Ton',
        materialsRollup: {
          steelKg: 7195.7,
          steelTons: 7.2
        },
        addedToBOQ: true
      },
      {
        id: 'calc-3',
        projectId: 'proj-villa-jeddah',
        calculatorId: 'block-calculator',
        calculatorTitle: 'Concrete Block Calculator',
        name: 'Ground Floor External Walls Blockwork (200mm)',
        createdAt: '2026-08-05T14:20:00.000Z',
        updatedAt: '2026-08-05T14:20:00.000Z',
        category: 'masonry',
        inputs: { wallLength: 72, wallHeight: 3.4, wallThickness: 0.2, wallUnit: 'm', blockLength: 400, blockHeight: 200, blockWidth: 200, blockUnit: 'mm', mortarJointMm: 10, wastagePercent: 5 },
        results: { wallAreaSqFt: 2635, blocksRequired: 2938, wastageBlocks: 147, totalBlocksRequired: 3085, wallVolumeCum: 48.96 },
        primaryQuantity: 3085,
        primaryUnit: 'Blocks',
        materialsRollup: {
          blocksCount: 3085
        },
        addedToBOQ: true
      },
      {
        id: 'calc-4',
        projectId: 'proj-villa-jeddah',
        calculatorId: 'tile-calculator',
        calculatorTitle: 'Floor & Wall Tile Calculator',
        name: 'Ground & First Floor Living Porcelain Tiles',
        createdAt: '2026-08-08T16:00:00.000Z',
        updatedAt: '2026-08-08T16:00:00.000Z',
        category: 'flooring',
        inputs: { roomLength: 18, roomWidth: 15, roomUnit: 'meters', tileLength: 60, tileWidth: 60, tileUnit: 'cm', wastagePercent: 7, tilesPerBox: 4, skirtingIncluded: true, skirtingHeightInches: 4 },
        results: { roomAreaSqM: 270, totalAreaToCoverSqFt: 3050, exactTilesNeeded: 750, tilesWithWastage: 803, totalBoxesNeeded: 201 },
        primaryQuantity: 289,
        primaryUnit: 'm²',
        materialsRollup: {
          tilesSqM: 289
        },
        addedToBOQ: true
      }
    ],
    boq: {
      id: 'boq-villa-jeddah',
      projectId: 'proj-villa-jeddah',
      name: 'Full Villa Bill of Quantities',
      currency: 'SAR',
      unitSystem: 'Metric',
      taxPercent: 15,
      contingencyPercent: 5,
      lastUpdated: '2026-08-25T14:30:00.000Z',
      sections: [
        {
          id: 'sec-1',
          code: '1.0',
          title: 'EARTHWORK & SUBSTRUCTURE',
          items: [
            {
              id: 'item-1-1',
              itemNo: '1.1',
              description: 'Site clearance, leveling and bulk earth excavation in all soil types to foundation depth',
              unit: 'm³',
              quantity: 260,
              rate: 35,
              amount: 9100,
              costComposition: { materialRate: 0, labourRate: 20, equipmentRate: 15, overheadRate: 0, profitPercent: 10 }
            },
            {
              id: 'item-1-2',
              itemNo: '1.2',
              description: 'Plain Cement Concrete (PCC M10 / 1:3:6) 100mm blinding under footings and ground tie beams',
              unit: 'm³',
              quantity: 28,
              rate: 220,
              amount: 6160,
              costComposition: { materialRate: 180, labourRate: 30, equipmentRate: 10, overheadRate: 0, profitPercent: 10 }
            },
            {
              id: 'item-1-3',
              itemNo: '1.3',
              description: 'Reinforced Concrete (RCC C25/30) in foundation raft, isolated footings and neck columns',
              unit: 'm³',
              quantity: 151,
              rate: 285,
              amount: 43035,
              costComposition: { materialRate: 230, labourRate: 40, equipmentRate: 15, overheadRate: 0, profitPercent: 10 }
            }
          ]
        },
        {
          id: 'sec-2',
          code: '2.0',
          title: 'SUPERSTRUCTURE CONCRETE & REBAR',
          items: [
            {
              id: 'item-2-1',
              itemNo: '2.1',
              description: 'High yield deformed rebar (Fe500 / Grade 60) cut, bent and tied in place',
              unit: 'Ton',
              quantity: 18.5,
              rate: 3200,
              amount: 59200,
              costComposition: { materialRate: 2450, labourRate: 550, equipmentRate: 100, overheadRate: 100, profitPercent: 10 }
            },
            {
              id: 'item-2-2',
              itemNo: '2.2',
              description: 'RCC C30 Ready-mix concrete in columns, core walls, beams and solid slabs',
              unit: 'm³',
              quantity: 185,
              rate: 310,
              amount: 57350,
              costComposition: { materialRate: 250, labourRate: 45, equipmentRate: 15, overheadRate: 0, profitPercent: 10 }
            }
          ]
        },
        {
          id: 'sec-3',
          code: '3.0',
          title: 'MASONRY & PLASTERWORK',
          items: [
            {
              id: 'item-3-1',
              itemNo: '3.1',
              description: '200mm Hollow concrete block masonry in cement sand mortar (1:4)',
              unit: 'm²',
              quantity: 680,
              rate: 55,
              amount: 37400,
              costComposition: { materialRate: 35, labourRate: 16, equipmentRate: 4, overheadRate: 0, profitPercent: 10 }
            },
            {
              id: 'item-3-2',
              itemNo: '3.2',
              description: '15mm Internal wall cement sand plastering (1:4) sponge finish',
              unit: 'm²',
              quantity: 1450,
              rate: 26,
              amount: 37700,
              costComposition: { materialRate: 12, labourRate: 12, equipmentRate: 2, overheadRate: 0, profitPercent: 10 }
            }
          ]
        },
        {
          id: 'sec-4',
          code: '4.0',
          title: 'FLOORING & FINISHING',
          items: [
            {
              id: 'item-4-1',
              itemNo: '4.1',
              description: '600×600mm Porcelain floor tiling with adhesive and grout including 100mm skirting',
              unit: 'm²',
              quantity: 420,
              rate: 110,
              amount: 46200,
              costComposition: { materialRate: 75, labourRate: 30, equipmentRate: 5, overheadRate: 0, profitPercent: 10 }
            },
            {
              id: 'item-4-2',
              itemNo: '4.2',
              description: 'Internal acrylic emulsion painting 3 coats over 2 coats putty and primer',
              unit: 'm²',
              quantity: 1450,
              rate: 22,
              amount: 31900,
              costComposition: { materialRate: 10, labourRate: 10, equipmentRate: 2, overheadRate: 0, profitPercent: 10 }
            }
          ]
        }
      ]
    }
  },
  {
    id: 'proj-commercial-riyadh',
    name: 'Commercial Plaza & Offices — Riyadh',
    type: 'Commercial',
    location: 'Riyadh, Saudi Arabia',
    clientName: 'Al-Faisaliah Development',
    areaSqM: 1200,
    areaSqFt: 12916,
    numberOfFloors: 4,
    currency: 'SAR',
    unitSystem: 'Metric',
    status: 'Planning',
    notes: 'Multi-tenant commercial retail and office building with underground parking.',
    createdAt: '2026-08-10T08:00:00.000Z',
    updatedAt: '2026-08-22T17:00:00.000Z',
    estimatedCost: 1250000,
    materialsCost: 890000,
    labourCost: 260000,
    equipmentCost: 75000,
    otherCost: 25000,
    calculations: [
      {
        id: 'calc-comm-1',
        projectId: 'proj-commercial-riyadh',
        calculatorId: 'column-calculator',
        calculatorTitle: 'Column Concrete & Mix Calculator',
        name: 'Basement & Ground Heavy Columns (24 Nos)',
        createdAt: '2026-08-12T10:00:00.000Z',
        updatedAt: '2026-08-12T10:00:00.000Z',
        category: 'structural',
        inputs: { numberOfColumns: 24, width: 0.6, length: 0.6, height: 4.2, unit: 'm', mixRatio: 'M25', wastagePercent: 5 },
        results: { totalWetVolumeCum: 38.1, totalWetVolumeCft: 1345.5, cementBags: 408, sandCft: 403, aggregateCft: 807 },
        primaryQuantity: 38.1,
        primaryUnit: 'm³',
        materialsRollup: {
          concreteCum: 38.1,
          cementBags: 408
        },
        addedToBOQ: true
      }
    ],
    boq: {
      id: 'boq-commercial-riyadh',
      projectId: 'proj-commercial-riyadh',
      name: 'Plaza Structural Phase 1 BOQ',
      currency: 'SAR',
      unitSystem: 'Metric',
      taxPercent: 15,
      contingencyPercent: 5,
      lastUpdated: '2026-08-22T17:00:00.000Z',
      sections: [
        {
          id: 'sec-comm-1',
          code: '1.0',
          title: 'SUBSTRUCTURE & EXCAVATION',
          items: [
            {
              id: 'item-c1',
              itemNo: '1.1',
              description: 'Deep basement rock and soil excavation with shoring',
              unit: 'm³',
              quantity: 3600,
              rate: 45,
              amount: 162000
            }
          ]
        }
      ]
    }
  }
];

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'user-guest',
  name: 'Engineer Workspace',
  email: 'engineer@buildmetric.app',
  companyName: 'Apex Construction & Engineering',
  role: 'Senior Project Estimator',
  defaultCurrency: 'SAR',
  defaultUnitSystem: 'Metric',
  isGuest: true
};

// Event listener for store reactivity across components
type StoreListener = () => void;
const listeners = new Set<StoreListener>();

const notifyListeners = () => {
  listeners.forEach(fn => fn());
};

export const subscribeToStore = (listener: StoreListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const projectStore = {
  // Get all projects
  getProjects(): Project[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(DEFAULT_PROJECTS));
        return DEFAULT_PROJECTS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_PROJECTS;
    }
  },

  // Get single project
  getProject(id: string): Project | null {
    const projects = this.getProjects();
    return projects.find(p => p.id === id) || null;
  },

  // Save/Update full project list
  saveProjects(projects: Project[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      notifyListeners();
    } catch (e) {
      console.error('Failed to save projects to localStorage', e);
    }
  },

  // Create a new project
  createProject(params: {
    name: string;
    type: ProjectType;
    location: string;
    clientName?: string;
    areaSqM?: number;
    areaSqFt?: number;
    numberOfFloors?: number;
    currency?: CurrencyCode;
    unitSystem?: UnitSystem;
    notes?: string;
  }): Project {
    const projects = this.getProjects();
    const newId = 'proj-' + Date.now();
    const currency = params.currency || 'SAR';
    const unitSystem = params.unitSystem || 'Metric';

    const newBOQ: ProjectBOQ = {
      id: 'boq-' + newId,
      projectId: newId,
      name: `${params.name} BOQ`,
      currency,
      unitSystem,
      taxPercent: 15,
      contingencyPercent: 5,
      lastUpdated: new Date().toISOString(),
      sections: [
        {
          id: 'sec-init-1',
          code: '1.0',
          title: 'GENERAL & SUBSTRUCTURE',
          items: []
        }
      ]
    };

    const newProject: Project = {
      id: newId,
      name: params.name.trim(),
      type: params.type,
      location: params.location.trim(),
      clientName: params.clientName?.trim() || '',
      areaSqM: params.areaSqM || 0,
      areaSqFt: params.areaSqFt || (params.areaSqM ? params.areaSqM * 10.764 : 0),
      numberOfFloors: params.numberOfFloors || 1,
      currency,
      unitSystem,
      status: 'Planning',
      notes: params.notes?.trim() || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      calculations: [],
      boq: newBOQ,
      estimatedCost: 0,
      materialsCost: 0,
      labourCost: 0,
      equipmentCost: 0,
      otherCost: 0
    };

    const updated = [newProject, ...projects];
    this.saveProjects(updated);
    this.setActiveProjectId(newId);
    return newProject;
  },

  // Update a project
  updateProject(id: string, updates: Partial<Project>): Project | null {
    const projects = this.getProjects();
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1) return null;

    // Recalculate financial rollups if BOQ exists
    let estimatedCost = updates.estimatedCost !== undefined ? updates.estimatedCost : projects[idx].estimatedCost;
    if (updates.boq) {
      let subtotal = 0;
      updates.boq.sections.forEach(sec => {
        sec.items.forEach(it => {
          subtotal += Number(it.quantity || 0) * Number(it.rate || 0);
        });
      });
      const tax = (subtotal * (updates.boq.taxPercent || 0)) / 100;
      const cont = (subtotal * (updates.boq.contingencyPercent || 0)) / 100;
      estimatedCost = subtotal + tax + cont;
    }

    const updatedProject: Project = {
      ...projects[idx],
      ...updates,
      estimatedCost,
      updatedAt: new Date().toISOString()
    };

    projects[idx] = updatedProject;
    this.saveProjects(projects);
    return updatedProject;
  },

  // Delete a project
  deleteProject(id: string): boolean {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    if (filtered.length === projects.length) return false;
    this.saveProjects(filtered);
    return true;
  },

  // Add Calculation to Project
  addCalculationToProject(projectId: string, calcData: {
    calculatorId: any;
    calculatorTitle: string;
    name: string;
    category: any;
    inputs: Record<string, any>;
    results: Record<string, any>;
    primaryQuantity: number;
    primaryUnit: string;
    materialsRollup?: Partial<MaterialQuantityRollup>;
    notes?: string;
    autoAddToBOQ?: boolean;
  }): SavedCalculation | null {
    const project = this.getProject(projectId);
    if (!project) return null;

    const calcId = 'calc-' + Date.now();
    const newCalc: SavedCalculation = {
      id: calcId,
      projectId,
      calculatorId: calcData.calculatorId,
      calculatorTitle: calcData.calculatorTitle,
      name: calcData.name.trim() || `${calcData.calculatorTitle} Calculation`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: calcData.category,
      inputs: calcData.inputs,
      results: calcData.results,
      primaryQuantity: calcData.primaryQuantity,
      primaryUnit: calcData.primaryUnit,
      materialsRollup: calcData.materialsRollup,
      notes: calcData.notes,
      addedToBOQ: calcData.autoAddToBOQ || false
    };

    const updatedCalculations = [newCalc, ...project.calculations];

    // If autoAddToBOQ is true, also push as a line item into matching BOQ section
    let updatedBOQ = { ...project.boq };
    if (calcData.autoAddToBOQ) {
      const boqItem: BOQItem = {
        id: 'boq-item-' + Date.now(),
        itemNo: `${updatedBOQ.sections.length}.1`,
        description: newCalc.name,
        unit: newCalc.primaryUnit,
        quantity: newCalc.primaryQuantity,
        rate: this.getSuggestedRate(newCalc.category, newCalc.primaryUnit),
        amount: newCalc.primaryQuantity * this.getSuggestedRate(newCalc.category, newCalc.primaryUnit)
      };

      if (updatedBOQ.sections.length === 0) {
        updatedBOQ.sections.push({
          id: 'sec-' + Date.now(),
          code: '1.0',
          title: 'ESTIMATED WORKS',
          items: [boqItem]
        });
      } else {
        updatedBOQ.sections[0].items.push(boqItem);
      }
    }

    this.updateProject(projectId, {
      calculations: updatedCalculations,
      boq: updatedBOQ
    });

    return newCalc;
  },

  // Helper: Suggested rate based on trade
  getSuggestedRate(category: string, unit: string): number {
    const u = (unit || '').toLowerCase();
    if (u.includes('m³') || u.includes('cum')) return 280;
    if (u.includes('ton')) return 2600;
    if (u.includes('kg')) return 4.5;
    if (u.includes('bag')) return 24;
    if (u.includes('block') || u.includes('pcs')) return 4.5;
    if (u.includes('sq ft') || u.includes('cft')) return 25;
    if (u.includes('m²') || u.includes('sqm')) return 85;
    return 100;
  },

  // Remove calculation from project
  removeCalculation(projectId: string, calculationId: string): boolean {
    const project = this.getProject(projectId);
    if (!project) return false;
    const filtered = project.calculations.filter(c => c.id !== calculationId);
    this.updateProject(projectId, { calculations: filtered });
    return true;
  },

  // Active Project ID for persistent workflow
  getActiveProjectId(): string {
    const id = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROJECT_ID);
    if (id && this.getProject(id)) return id;
    const projects = this.getProjects();
    return projects[0]?.id || '';
  },

  setActiveProjectId(id: string) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROJECT_ID, id);
    notifyListeners();
  },

  // Materials Database
  getMaterials(): MaterialItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MATERIALS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(DEFAULT_MATERIALS));
        return DEFAULT_MATERIALS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_MATERIALS;
    }
  },

  saveMaterials(materials: MaterialItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials));
      notifyListeners();
    } catch (e) {
      console.error('Failed to save materials to localStorage', e);
    }
  },

  addMaterial(material: Omit<MaterialItem, 'id' | 'lastUpdated'>): MaterialItem {
    const materials = this.getMaterials();
    const newMat: MaterialItem = {
      ...material,
      id: 'mat-' + Date.now(),
      isCustom: true,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    this.saveMaterials([newMat, ...materials]);
    return newMat;
  },

  updateMaterial(id: string, updates: Partial<MaterialItem>): MaterialItem | null {
    const materials = this.getMaterials();
    const idx = materials.findIndex(m => m.id === id);
    if (idx === -1) return null;
    const updated = {
      ...materials[idx],
      ...updates,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    materials[idx] = updated;
    this.saveMaterials(materials);
    return updated;
  },

  deleteMaterial(id: string): boolean {
    const materials = this.getMaterials();
    const filtered = materials.filter(m => m.id !== id);
    this.saveMaterials(filtered);
    return true;
  },

  // User Workspace Profile
  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_USER_PROFILE));
        return DEFAULT_USER_PROFILE;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  },

  saveUserProfile(profile: UserProfile) {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      notifyListeners();
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  },

  // Reset entire workspace to pristine demo state
  resetToDefault() {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(DEFAULT_PROJECTS));
    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(DEFAULT_MATERIALS));
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(DEFAULT_USER_PROFILE));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROJECT_ID, DEFAULT_PROJECTS[0].id);
    notifyListeners();
  }
};
